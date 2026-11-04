// Уровень 47 «Амбар» — седьмой уровень области V, обычный (пять разных
// монстров, как 41-44/46).
//
// ДВОЙНАЯ ПРОВЕРКА УНИКАЛЬНОСТИ (раздел 1.2) — ШАГ 1 выполнен 2026-09-06 по
// admin-boss-pattern-panel.html, 230 строк, уровни 1-46, обе таблицы
// распределения (movementStyle И форма цепи) плюс колонка «Архетип» по всем
// пяти ролям целиком.
//
// АРТ (images/enemies/regions/5_dom_dvor/lvl47/) — все 5 картинок открыты и
// сверены лично:
// 1.webp — жук-долгоносик с длинным хоботом-снаружей, одной лапой прижимает
//   зерно к брюху, другой — когтистый выпад, роняет зёрна. Архетип — точные
//   редкие уколы хоботом на расстоянии, спокойный темп (роль enem1,
//   знакомство) — сверено: PROBOSCIS_JAB новый, НЕ повторяет асимметрию
//   Крохобора (46, тот держит хлеб и совсем не бьёт занятой лапой) — здесь
//   акцент на ДАЛЬНОСТЬ и точность одиночного укола хоботом, а не на
//   бездействии одной стороны.
// 2.webp — раздувшийся мешок сам разрывает себе заплату на животе, зерно
//   сыплется наружу, свободная лапа тянется когтями. Архетип — зерно
//   сыплется из растущей дыры всё чаще (эскалация серии, роль enem2,
//   быстрые серии) — сверено: SELF_TEAR новый, ни один из архетипов Клевача/
//   Шлёпика/Рогатеня/Квочки/Ошпаренного/Косохлёста не завязан на
//   саморазрывающийся источник атаки.
// 3.webp — деревянный совок, зерно бьёт широким горизонтальным веером
//   вбок из раструба. Архетип — редкий тяжёлый веерный залп после видимого
//   замаха (роль enem3, тяжёлые редкие) — сверено: SCOOP_FAN новый, отличен
//   от Рассольника (46, FOUNTAIN_ARC — там один widearc-всплеск из бочки) —
//   здесь именно веерный ЗАЛП НЕСКОЛЬКИХ зёрен разом широким фронтом, а не
//   один снаряд по дуге.
// 4.webp — суровый кладовщик-старичок: меловая грифельная доска с
//   насечками-подсчётами в одной руке, мел в другой, связка ключей на
//   поясе. Картинка совпадает с документом-идеей. Архетип — нервные ПАРНЫЕ
//   удары-«галочки» (считает вслух, бьёт по два подряд), ускоряющиеся, как
//   будто спешит закончить подсчёт (роль enem4, нервный) — сверено:
//   TALLY_MARKS новый, отличен от Фонарницы (41, мерный дозор), Бренчихи
//   (42, асимметрия), Скалкиной (43, зигзаг), Пыхтуна (44, скрещённые
//   высоты), Обугленного (45, агония-зигзаг), Клубнеглаза (46, хаотичный
//   разброс) — ни один не завязан на парный счётный ритм.
// 5.webp — исполинский голем из зёрен, вылезающий из мешка, ОБЕ когтистые
//   лапы подняты симметрично и агрессивно (не асимметрично, в отличие от
//   Хоботня уровня 47 самого же и Бренчихи 42). Архетип — тело голема
//   постоянно осыпает редкие слабые зёрна фоном (дробный урон по правилу
//   11), поверх — тяжёлые симметричные удары ОБЕИХ лап разом (роль enem5,
//   финал) — сверено: GRAIN_SHOWER_SLAM новый, отличен от REVERSE_ECHO
//   Черпака (43) и FOAM_COLUMN Пенодуя (46, оба про «собрать почерк
//   предыдущих», этот — про постоянное фоновое давление плюс симметричный
//   тяжёлый удар, без цитирования чужого почерка).
//
// ДВИЖЕНИЕ (movementStyle) — сверено с полным распределением 1-46 (все роли
// ≤33% до этого уровня, ни одна уже занятая категория не усилена сверх
// разумного): Хоботень — straight (прямой точный укол хоботом) 13%→14.9%;
// Прорёха — accelerate (разрыв нарастает быстрее и быстрее) 17%→19.1%;
// Зерномёт — pause (долгий замах перед веерным залпом) 13%→14.9%;
// Бирюк — drift (нетерпеливо покачивается, считая) 13%→14.9%;
// Урожаище — lateRush (набирает массу и обрушивается тяжёлым рывком) 15%→17%.
//
// ЦЕПИ (13.6/13.7) — форма каждой цепи выбрана ИЗ образа И сверена с полным
// распределением формы цепи по роли: Хоботень — zigzag(4)+irregular(5):
// хобот дёргается из стороны в сторону, зёрна падают вразброс (у enem1
// zigzag/irregular были по 8% — самые низкие, не усугубляют раздутый
// vertical 50%); Прорёха — irregular(5)+diagonal(3): дыра рвётся хаотично,
// затем один решительный рывок в сторону (у enem2 irregular было 8% —
// самое низкое, diagonal 17% — тоже не самое высокое, а вместе с уже
// раздутыми zigzag/arc по 25% не усиливают их); Зерномёт — arc(3)+vertical(4):
// веер расходится дугой, затем один прямой досыпающий поток (у enem3 arc и
// vertical были по 8% — самые низкие, не усугубляют раздутый diagonal 50%);
// Бирюк — irregular(5)+diagonal(3): хаотичные меловые засечки, затем одна
// решительная подчёркивающая черта (у enem4 irregular было 8% — самое
// низкое, что ЧИНИТ уже раздутый zigzag 33% простым неучастием в нём,
// доля zigzag падает до 29% после добавления двух чужих категорий);
// Урожаище — zigzag(4)+irregular(5): зёрна каскадом сыплются вразнобой при
// каждом шаге голема (у enem5 zigzag и irregular были по 8% — самые низкие,
// что ЧИНИТ уже раздутый diagonal 33%, доля падает до 29%).
//
// БОЕВЫЕ ТЕКСТЫ (appearMessage/phaseMessages) — НЕ используются на этом
// уровне (правка 2026-09-06): пользователь уточнил, что раздел 12 в этой
// части касается только персонажей-в-пяти-обликах, а не обычных уровней с
// пятью разными монстрами.
let lvlNumber = 47;

const bossCombatConfig = {
	attackChains: true,
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.769, damageMultiplier: 1.782, minWaveDelay: 4299, minShotDelay: 124, minTelegraphMs: 513,
	phases: [
		{ phase: 1, minHp: 0.679, cadence: 0.977, speed: 1.033, damage: 1, telegraphMultiplier: 1.027, surpriseChance: 0.094, maxActiveAttacks: 24 },
		{ phase: 2, minHp: 0.329, cadence: 0.784, speed: 1.158, damage: 1.12, telegraphMultiplier: 0.862, surpriseChance: 0.196, maxActiveAttacks: 28 },
		{ phase: 3, minHp: 0, cadence: 0.622, speed: 1.269, damage: 1.22, telegraphMultiplier: 0.762, surpriseChance: 0.296, maxActiveAttacks: 32 }
	],
	bosses: {
		enem1: { combatIdentity: "Хобот прокалывает край за зерном", combatTrick: "Прямой дальний укол возвращается в уже отмеченный проход, пока зерно отвлекает с края. Ошибка — считать, что длинный хобот бьёт только в ближайшую точку, или ударить жука после первого укола.", signatureEvery: 3, movementStyle: 'straight', cadence: 1.033, telegraphMs: 929, speedMultiplier: 1.027, damageMultiplier: 0.91, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem2: { combatIdentity: "Из разрыва идёт ещё одна горсть", combatTrick: "Мешок разрывает заплату и разгоняет сыпь зерна. За первой горстью идёт ответ в другом проходе, затем новый выброс из той же дыры. Ошибка — начать бить мешок, увидев первую паузу между горстями.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 1.008, telegraphMs: 831, speedMultiplier: 1.048, damageMultiplier: 1, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem3: { combatIdentity: "Залп совка меняет край веера", combatTrick: "Зёрна задерживаются в замахе, затем раскрываются широким веером. Отдельное зерно прикрывает переход к другому краю, а возвращающийся веер меняет конец. Ошибка — бить совок, пока замах ещё не выпущен, или ждать все зёрна по порядку появления.", signatureEvery: 3, movementStyle: 'pause', cadence: 0.988, telegraphMs: 1041, speedMultiplier: 1.029, damageMultiplier: 1.17, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem4: { combatIdentity: "После двух меток остаётся недосчитанная", combatTrick: "Меловые отметки идут парами, но за законченной парой остаётся новая галка в прежнем проходе. Ошибка — уходить бить кладовщика строго на каждый второй удар: счёт продолжается в другой полосе и возвращается.", signatureEvery: 3, movementStyle: 'lateRush', cadence: 0.967, telegraphMs: 781, speedMultiplier: 1.067, damageMultiplier: 1.04, speedVariance: [1, 1.0004, 1.0008, 1.0012, 1.0016] },
		enem5: { combatIdentity: "Зерновая сыпь прикрывает обе лапы", combatTrick: "Из зернового тела сыплется прикрытая россыпь, поверх которой идут парные удары двух лап. После левого удара остаётся правое смыкание, затем новый левый захват. Ошибка — считать, что вся опасность ушла вместе с фоновыми зёрнами, или уйти после первой пары лап.", signatureEvery: 3, movementStyle: 'wave', cadence: 0.948, telegraphMs: 960, speedMultiplier: 1.113, damageMultiplier: 1.15, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] }
	}
};

const ENEMY_TYPES = {

	enem11: { name: 'enem11', image: 'images/enemies/regions/5_dom_dvor/lvl47/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { name: 'enem22', image: 'images/enemies/regions/5_dom_dvor/lvl47/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { name: 'enem33', image: 'images/enemies/regions/5_dom_dvor/lvl47/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { name: 'enem44', image: 'images/enemies/regions/5_dom_dvor/lvl47/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { name: 'enem55', image: 'images/enemies/regions/5_dom_dvor/lvl47/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
        name: 'enem1',
		dispName: 'Хоботень',
        image: 'images/enemies/regions/5_dom_dvor/lvl47/1.webp',
        baseHP: 11835,
        baseSpeed: 0,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 250,
        size: '22%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem2: {
        name: 'enem2',
		dispName: 'Прорёха',
        image: 'images/enemies/regions/5_dom_dvor/lvl47/2.webp',
        baseHP: 29587,
        baseSpeed: 0,
        baseDamage: 22,
        spawnWeight: 15,
		baseExp: 400,
        size: '25%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem3: {
        name: 'enem3',
		dispName: 'Зерномёт',
        image: 'images/enemies/regions/5_dom_dvor/lvl47/3.webp',
        baseHP: 52339,
        baseSpeed: 0,
        baseDamage: 24,
        spawnWeight: 20,
		baseExp: 600,
        size: '24%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem4: {
        name: 'enem4',
		dispName: 'Бирюк',
        image: 'images/enemies/regions/5_dom_dvor/lvl47/4.webp',
        baseHP: 84195,
        baseSpeed: 0,
        baseDamage: 26,
        spawnWeight: 10,
		baseExp: 800,
        size: '23%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem5: {
        name: 'enem5',
		dispName: 'Урожаище',
        image: 'images/enemies/regions/5_dom_dvor/lvl47/5.webp',
        baseHP: 127374,
        baseSpeed: 0,
        baseDamage: 28,
        spawnWeight: 5,
		baseExp: 0,
        size: '27%',
        deathAnimation: { preset: 'default', durationMs: 1000 }
    },


};

 let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
 let timeNextBoss = 19;
 const bossInterval = 13;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
 // speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Хоботень =====
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.83 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.83 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.83 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.83 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.83 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.83 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.83 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.83 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.83 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.83 }, // 9 b
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5.91 }, // 10 c
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.83 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.83 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.83 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.83 }, // 14 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.83 }, // 15 c
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5.91 }, // 16 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.83 }, // 17 d
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.83 }, // 18 d
	{ boss: 'enem1', type: 'enem11', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.83 }, // 19 d
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.83 }, // 20 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.83 }, // 21 d
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5.91 }, // 22 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.83 }, // 23 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.83 }, // 24 e
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.83 }, // 25 e
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.83 }, // 26 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.83 }, // 27 e
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.63 }, // 28 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.38 }, // 29 f
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.13 }, // 30 f
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 31, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5.91 }, // 31 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.33 }, // 32 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.83 }, // 33 g
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.83 }, // 34 g
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.83 }, // 35 g
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.33 }, // 36 g
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.83 }, // 37 g
	{ boss: 'enem1', type: 'enem11', xPos: 13, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5.91 }, // 38 h
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.83 }, // 39 h
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.83 }, // 40 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.83 }, // 41 h
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.83 }, // 42 h
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.83 }, // 43 h
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.83 }, // 44 h
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.73 }, // 45 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.48 }, // 46 i
	{ boss: 'enem1', type: 'enem11', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.23 }, // 47 i
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.98 }, // 48 i
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.73 }, // 49 i

	// ===== Прорёха =====
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.93 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.43 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.93 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.43 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.93 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.43 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.93 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.93 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.43 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.93 }, // 9 b
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5.93 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.43 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.93 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.93 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.43 }, // 14 c
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.93 }, // 15 c
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5.93 }, // 16 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.93 }, // 17 d
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.43 }, // 18 d
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.93 }, // 19 d
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.43 }, // 20 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.93 }, // 21 d
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5.93 }, // 22 e
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.43 }, // 23 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.93 }, // 24 e
	{ boss: 'enem2', type: 'enem22', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.93 }, // 25 e
	{ boss: 'enem2', type: 'enem22', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.43 }, // 26 e
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.93 }, // 27 e
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.87 }, // 28 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.62 }, // 29 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.37 }, // 30 f
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.12 }, // 31 f
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5.93 }, // 32 g
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.93 }, // 33 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.43 }, // 34 g
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.93 }, // 35 g
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.43 }, // 36 g
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.93 }, // 37 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.93 }, // 38 g
	{ boss: 'enem2', type: 'enem22', xPos: 91, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5.93 }, // 39 h
	{ boss: 'enem2', type: 'enem22', xPos: 5, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.93 }, // 40 h
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.43 }, // 41 h
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.93 }, // 42 h
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.43 }, // 43 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.93 }, // 44 h
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.93 }, // 45 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.97 }, // 46 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.72 }, // 47 i
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.47 }, // 48 i
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.22 }, // 49 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.97 }, // 50 i
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.72 }, // 51 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.47 }, // 52 i

	// ===== Зерномёт =====
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.95 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.69 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.19 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18.19 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.19 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.69 }, // 5 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18.19 }, // 6 a
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.95 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.69 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.19 }, // 9 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18.19 }, // 10 b
	{ boss: 'enem3', type: 'enem33', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.19 }, // 11 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.69 }, // 12 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18.19 }, // 13 b
	{ boss: 'enem3', type: 'enem33', xPos: 13, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.95 }, // 14 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.19 }, // 15 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.69 }, // 16 c
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18.19 }, // 17 c
	{ boss: 'enem3', type: 'enem33', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.19 }, // 18 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.69 }, // 19 c
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18.19 }, // 20 c
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.95 }, // 21 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.19 }, // 22 d
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.69 }, // 23 d
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18.19 }, // 24 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.19 }, // 25 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.69 }, // 26 d
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18.19 }, // 27 d
	{ boss: 'enem3', type: 'enem33', xPos: 11, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.95 }, // 28 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.19 }, // 29 e
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.69 }, // 30 e
	{ boss: 'enem3', type: 'enem33', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18.19 }, // 31 e
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.19 }, // 32 e
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.69 }, // 33 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18.19 }, // 34 e
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.79 }, // 35 f
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.54 }, // 36 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.29 }, // 37 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.04 }, // 38 f
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.79 }, // 39 f
	{ boss: 'enem3', type: 'enem33', xPos: 89, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.95 }, // 40 g
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.69 }, // 41 g
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.19 }, // 42 g
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18.19 }, // 43 g
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.19 }, // 44 g
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.69 }, // 45 g
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18.19 }, // 46 g
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.19 }, // 47 g
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.95 }, // 48 h
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.19 }, // 49 h
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.69 }, // 50 h
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18.19 }, // 51 h
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.19 }, // 52 h
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.69 }, // 53 h
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18.19 }, // 54 h
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.19 }, // 55 h
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.89 }, // 56 i
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.64 }, // 57 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.39 }, // 58 i
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.14 }, // 59 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.89 }, // 60 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.64 }, // 61 i

	// ===== Бирюк =====
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.79 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.79 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.79 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.79 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.79 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.79 }, // 5 a
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.13 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.79 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.79 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.79 }, // 9 b
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.79 }, // 10 b
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5.97 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.79 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.79 }, // 13 c
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.79 }, // 14 c
	{ boss: 'enem4', type: 'enem44', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.79 }, // 15 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.79 }, // 16 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.79 }, // 17 c
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5.97 }, // 18 d
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.79 }, // 19 d
	{ boss: 'enem4', type: 'enem44', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.79 }, // 20 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.79 }, // 21 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.79 }, // 22 d
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.79 }, // 23 d
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.79 }, // 24 d
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5.97 }, // 25 e
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.79 }, // 26 e
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.79 }, // 27 e
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.79 }, // 28 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.79 }, // 29 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.79 }, // 30 e
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.79 }, // 31 e
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10.9 }, // 32 f
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10.86 }, // 33 f
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10.82 }, // 34 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10.78 }, // 35 f
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10.74 }, // 36 f
	{ boss: 'enem4', type: 'enem44', xPos: 91, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5.97 }, // 37 g
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.79 }, // 38 g
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.79 }, // 39 g
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.79 }, // 40 g
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.79 }, // 41 g
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.79 }, // 42 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.29 }, // 43 g
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5.97 }, // 44 h
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.79 }, // 45 h
	{ boss: 'enem4', type: 'enem44', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.79 }, // 46 h
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.79 }, // 47 h
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.79 }, // 48 h
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.79 }, // 49 h
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.79 }, // 50 h
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.79 }, // 51 h
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10.9 }, // 52 i
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10.86 }, // 53 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10.82 }, // 54 i
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10.78 }, // 55 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10.74 }, // 56 i
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10.7 }, // 57 i

	// ===== Урожаище =====
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.01, waveAmplitude: 2.23, waveFrequency: 1.31, wavePhase: 0 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.03, waveAmplitude: 3.23, waveFrequency: 1.81, wavePhase: 0.4 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.03, waveAmplitude: 4.23, waveFrequency: 2.31, wavePhase: 0.9 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.03, waveAmplitude: 2.23, waveFrequency: 1.31, wavePhase: 0 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.03, waveAmplitude: 3.23, waveFrequency: 1.81, wavePhase: 0.4 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.03, waveAmplitude: 4.23, waveFrequency: 2.31, wavePhase: 0.9 }, // 5 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.03, waveAmplitude: 2.23, waveFrequency: 1.31, wavePhase: 0 }, // 6 a
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.01, waveAmplitude: 2.23, waveFrequency: 1.31, wavePhase: 0 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.03, waveAmplitude: 3.23, waveFrequency: 1.81, wavePhase: 0.4 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.03, waveAmplitude: 4.23, waveFrequency: 2.31, wavePhase: 0.9 }, // 9 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.03, waveAmplitude: 2.23, waveFrequency: 1.31, wavePhase: 0 }, // 10 b
	{ boss: 'enem5', type: 'enem55', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.03, waveAmplitude: 3.23, waveFrequency: 1.81, wavePhase: 0.4 }, // 11 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.03, waveAmplitude: 4.23, waveFrequency: 2.31, wavePhase: 0.9 }, // 12 b
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.03, waveAmplitude: 2.23, waveFrequency: 1.31, wavePhase: 0 }, // 13 b
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.01, waveAmplitude: 2.23, waveFrequency: 1.31, wavePhase: 0 }, // 14 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.03, waveAmplitude: 3.23, waveFrequency: 1.81, wavePhase: 0.4 }, // 15 c
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.03, waveAmplitude: 4.23, waveFrequency: 2.31, wavePhase: 0.9 }, // 16 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.03, waveAmplitude: 2.23, waveFrequency: 1.31, wavePhase: 0 }, // 17 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.03, waveAmplitude: 3.23, waveFrequency: 1.81, wavePhase: 0.4 }, // 18 c
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.03, waveAmplitude: 4.23, waveFrequency: 2.31, wavePhase: 0.9 }, // 19 c
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.03, waveAmplitude: 2.23, waveFrequency: 1.31, wavePhase: 0 }, // 20 c
	{ boss: 'enem5', type: 'enem55', xPos: 91, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.01, waveAmplitude: 2.23, waveFrequency: 1.31, wavePhase: 0 }, // 21 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.03, waveAmplitude: 3.23, waveFrequency: 1.81, wavePhase: 0.4 }, // 22 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.03, waveAmplitude: 4.23, waveFrequency: 2.31, wavePhase: 0.9 }, // 23 d
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.03, waveAmplitude: 2.23, waveFrequency: 1.31, wavePhase: 0 }, // 24 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.03, waveAmplitude: 3.23, waveFrequency: 1.81, wavePhase: 0.4 }, // 25 d
	{ boss: 'enem5', type: 'enem55', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.03, waveAmplitude: 4.23, waveFrequency: 2.31, wavePhase: 0.9 }, // 26 d
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.03, waveAmplitude: 2.23, waveFrequency: 1.31, wavePhase: 0 }, // 27 d
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.01, waveAmplitude: 2.23, waveFrequency: 1.31, wavePhase: 0 }, // 28 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.03, waveAmplitude: 3.23, waveFrequency: 1.81, wavePhase: 0.4 }, // 29 e
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.03, waveAmplitude: 4.23, waveFrequency: 2.31, wavePhase: 0.9 }, // 30 e
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.03, waveAmplitude: 2.23, waveFrequency: 1.31, wavePhase: 0 }, // 31 e
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.03, waveAmplitude: 3.23, waveFrequency: 1.81, wavePhase: 0.4 }, // 32 e
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.03, waveAmplitude: 4.23, waveFrequency: 2.31, wavePhase: 0.9 }, // 33 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.03, waveAmplitude: 2.23, waveFrequency: 1.31, wavePhase: 0 }, // 34 e
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.37, waveAmplitude: 2.23, waveFrequency: 1.31, wavePhase: 0 }, // 35 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.12, waveAmplitude: 3.23, waveFrequency: 1.81, wavePhase: 0.4 }, // 36 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.87, waveAmplitude: 4.23, waveFrequency: 2.31, wavePhase: 0.9 }, // 37 f
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.62, waveAmplitude: 2.23, waveFrequency: 1.31, wavePhase: 0 }, // 38 f
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.37, waveAmplitude: 3.23, waveFrequency: 1.81, wavePhase: 0.4 }, // 39 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.12, waveAmplitude: 4.23, waveFrequency: 2.31, wavePhase: 0.9 }, // 40 f
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.87, waveAmplitude: 2.23, waveFrequency: 1.31, wavePhase: 0 }, // 41 f
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.01, waveAmplitude: 2.23, waveFrequency: 1.31, wavePhase: 0 }, // 42 g
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.03, waveAmplitude: 3.23, waveFrequency: 1.81, wavePhase: 0.4 }, // 43 g
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.83, waveAmplitude: 4.23, waveFrequency: 2.31, wavePhase: 0.9 }, // 44 g
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.03, waveAmplitude: 2.23, waveFrequency: 1.31, wavePhase: 0 }, // 45 g
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.03, waveAmplitude: 3.23, waveFrequency: 1.81, wavePhase: 0.4 }, // 46 g
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.03, waveAmplitude: 4.23, waveFrequency: 2.31, wavePhase: 0.9 }, // 47 g
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.03, waveAmplitude: 2.23, waveFrequency: 1.31, wavePhase: 0 }, // 48 g
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.03, waveAmplitude: 3.23, waveFrequency: 1.81, wavePhase: 0.4 }, // 49 g
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.01, waveAmplitude: 2.23, waveFrequency: 1.31, wavePhase: 0 }, // 50 h
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.03, waveAmplitude: 3.23, waveFrequency: 1.81, wavePhase: 0.4 }, // 51 h
	{ boss: 'enem5', type: 'enem55', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.83, waveAmplitude: 4.23, waveFrequency: 2.31, wavePhase: 0.9 }, // 52 h
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.03, waveAmplitude: 2.23, waveFrequency: 1.31, wavePhase: 0 }, // 53 h
	{ boss: 'enem5', type: 'enem55', xPos: 68, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.03, waveAmplitude: 3.23, waveFrequency: 1.81, wavePhase: 0.4 }, // 54 h
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.03, waveAmplitude: 4.23, waveFrequency: 2.31, wavePhase: 0.9 }, // 55 h
	{ boss: 'enem5', type: 'enem55', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.03, waveAmplitude: 2.23, waveFrequency: 1.31, wavePhase: 0 }, // 56 h
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.03, waveAmplitude: 3.23, waveFrequency: 1.81, wavePhase: 0.4 }, // 57 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.03, waveAmplitude: 4.23, waveFrequency: 2.31, wavePhase: 0.9 }, // 58 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.47, waveAmplitude: 2.23, waveFrequency: 1.31, wavePhase: 0 }, // 59 i
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.22, waveAmplitude: 3.23, waveFrequency: 1.81, wavePhase: 0.4 }, // 60 i
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.97, waveAmplitude: 4.23, waveFrequency: 2.31, wavePhase: 0.9 }, // 61 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.72, waveAmplitude: 2.23, waveFrequency: 1.31, wavePhase: 0 }, // 62 i
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.47, waveAmplitude: 3.23, waveFrequency: 1.81, wavePhase: 0.4 }, // 63 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.22, waveAmplitude: 4.23, waveFrequency: 2.31, wavePhase: 0.9 }, // 64 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.97, waveAmplitude: 2.23, waveFrequency: 1.31, wavePhase: 0 }, // 65 i

];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 172, bossDelayAbDop: 10700, firstWaveDelayMs: 2390 }, // Хобот прокалывает край за зерном
	{ boss: 'enem2', bossDelayAb: 179, bossDelayAbDop: 11300, firstWaveDelayMs: 2390 }, // Из разрыва идёт ещё одна горсть
	{ boss: 'enem3', bossDelayAb: 169, bossDelayAbDop: 13200, firstWaveDelayMs: 2390 }, // Залп совка меняет край веера
	{ boss: 'enem4', bossDelayAb: 183, bossDelayAbDop: 11400, firstWaveDelayMs: 2390 }, // После двух меток остаётся недосчитанная
	{ boss: 'enem5', bossDelayAb: 154, bossDelayAbDop: 14500, firstWaveDelayMs: 2390 }, // Зерновая сыпь прикрывает обе лапы
];

 const bossAbilitiesDop = [
	// Хоботень
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 0, 300, 0], openingOrder: 0, label: "Укол из-за дальнего зерна" },
	{ boss: 'enem1', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [0, 0, 0, 0], label: "Хобот возвращается к отметке" },
	{ boss: 'enem1', indexAbilities: [10, 11, 12, 13, 14, 15], shotGapsMs: [600, 600, 600, 0, 0], label: "Зерно не закрывает дальний укол" },
	{ boss: 'enem1', indexAbilities: [16, 17, 18, 19, 20, 21], shotGapsMs: [300, 0, 0, 300, 600], label: "Хобот через левый проход" },
	{ boss: 'enem1', indexAbilities: [22, 23, 24, 25, 26, 27], shotGapsMs: [600, 300, 0, 600, 0], label: "Жук отмечает правую середину дважды" },
	{ boss: 'enem1', indexAbilities: [28, 29, 30], signature: true, isChain: true, shotDelayMs: 312, shotGapsMs: [0, 0], openingOrder: 1, label: "Цепь длины хобота" },
	{ boss: 'enem1', indexAbilities: [31, 32, 33, 34, 35, 36, 37], minPhase: 2, shotGapsMs: [300, 300, 0, 0, 0, 0], label: "Второй укол за зерном" },
	{ boss: 'enem1', indexAbilities: [38, 39, 40, 41, 42, 43, 44], minPhase: 3, shotGapsMs: [600, 0, 300, 0, 300, 300], label: "Хобот остаётся у прежнего края" },
	{ boss: 'enem1', indexAbilities: [45, 46, 47, 48, 49], signature: true, isChain: true, minPhase: 3, shotDelayMs: 312, shotGapsMs: [0, 0, 0, 0], label: "Цепь повторных отметок хобота" },

	// Прорёха
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 300, 0, 300], openingOrder: 0, label: "Первая горсть из заплаты" },
	{ boss: 'enem2', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [0, 0, 300, 300], label: "Горсть и новый правый разрыв" },
	{ boss: 'enem2', indexAbilities: [10, 11, 12, 13, 14, 15], shotGapsMs: [600, 300, 300, 600, 300], label: "Новая сыпь после первой горсти" },
	{ boss: 'enem2', indexAbilities: [16, 17, 18, 19, 20, 21], shotGapsMs: [600, 0, 300, 600, 0], label: "Дыра расширяется у левого края" },
	{ boss: 'enem2', indexAbilities: [22, 23, 24, 25, 26, 27], shotGapsMs: [300, 0, 0, 600, 600], label: "Зерно не заканчивается правой парой" },
	{ boss: 'enem2', indexAbilities: [28, 29, 30, 31], signature: true, isChain: true, shotDelayMs: 312, shotGapsMs: [0, 0, 0], openingOrder: 1, label: "Цепь разорванной заплаты" },
	{ boss: 'enem2', indexAbilities: [32, 33, 34, 35, 36, 37, 38], minPhase: 2, shotGapsMs: [600, 0, 0, 0, 600, 0], label: "Третья горсть из новой щели" },
	{ boss: 'enem2', indexAbilities: [39, 40, 41, 42, 43, 44, 45], minPhase: 3, shotGapsMs: [600, 300, 300, 600, 0, 0], label: "Повторный выброс за левым краем" },
	{ boss: 'enem2', indexAbilities: [46, 47, 48, 49, 50, 51, 52], signature: true, isChain: true, minPhase: 3, shotDelayMs: 312, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Цепь растущего разрыва" },

	// Зерномёт
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5, 6], shotGapsMs: [600, 0, 300, 0, 600, 600], openingOrder: 0, label: "Веер выходит из раструба" },
	{ boss: 'enem3', indexAbilities: [7, 8, 9, 10, 11, 12, 13], shotGapsMs: [300, 0, 0, 300, 300, 600], label: "Веер меняет правый край" },
	{ boss: 'enem3', indexAbilities: [14, 15, 16, 17, 18, 19, 20], shotGapsMs: [600, 600, 0, 0, 300, 600], label: "Зерно за левым концом веера" },
	{ boss: 'enem3', indexAbilities: [21, 22, 23, 24, 25, 26, 27], shotGapsMs: [0, 0, 0, 0, 0, 600], label: "Совок возвращает веер влево" },
	{ boss: 'enem3', indexAbilities: [28, 29, 30, 31, 32, 33, 34], shotGapsMs: [0, 0, 300, 600, 0, 0], label: "Тройное зерно оставляет правый конец" },
	{ boss: 'enem3', indexAbilities: [35, 36, 37, 38, 39], signature: true, isChain: true, shotDelayMs: 312, shotGapsMs: [0, 0, 0, 0], openingOrder: 1, label: "Цепь тяжёлого веерного залпа" },
	{ boss: 'enem3', indexAbilities: [40, 41, 42, 43, 44, 45, 46, 47], minPhase: 2, shotGapsMs: [0, 0, 300, 0, 0, 0, 300], label: "Второй залп после первого зерна" },
	{ boss: 'enem3', indexAbilities: [48, 49, 50, 51, 52, 53, 54, 55], minPhase: 3, shotGapsMs: [0, 0, 0, 0, 0, 300, 600], label: "Замах раскрывает обратный веер" },
	{ boss: 'enem3', indexAbilities: [56, 57, 58, 59, 60, 61], signature: true, isChain: true, minPhase: 3, shotDelayMs: 312, shotGapsMs: [0, 0, 0, 0, 0], label: "Цепь двух краёв совка" },

	// Бирюк
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [300, 0, 0, 0, 0], openingOrder: 0, label: "Две левые метки не конец счёта" },
	{ boss: 'enem4', indexAbilities: [6, 7, 8, 9, 10], shotGapsMs: [600, 0, 300, 0], label: "Недосчитанная метка после двух пар" },
	{ boss: 'enem4', indexAbilities: [11, 12, 13, 14, 15, 16, 17], shotGapsMs: [600, 300, 300, 300, 0, 0], label: "Галка после меловой пыли" },
	{ boss: 'enem4', indexAbilities: [18, 19, 20, 21, 22, 23, 24], shotGapsMs: [300, 0, 300, 300, 300, 0], label: "Счёт возвращается к левому столбику" },
	{ boss: 'enem4', indexAbilities: [25, 26, 27, 28, 29, 30, 31], shotGapsMs: [0, 0, 300, 300, 600, 300], label: "Непарная галка после двух пар" },
	{ boss: 'enem4', indexAbilities: [32, 33, 34, 35, 36], signature: true, isChain: true, shotDelayMs: 312, openingOrder: 1, label: "Цепь меловой отметки и двух пар" },
	{ boss: 'enem4', indexAbilities: [37, 38, 39, 40, 41, 42, 43], minPhase: 2, shotGapsMs: [0, 0, 0, 300, 300, 300], label: "Последняя метка после трёх пар" },
	{ boss: 'enem4', indexAbilities: [44, 45, 46, 47, 48, 49, 50, 51], minPhase: 3, shotGapsMs: [0, 0, 0, 0, 0, 300, 600], label: "Бирюк дописывает правый столбик" },
	{ boss: 'enem4', indexAbilities: [52, 53, 54, 55, 56, 57], signature: true, isChain: true, minPhase: 3, shotDelayMs: 312, label: "Цепь незаконченного счёта" },

	// Урожаище
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5, 6], shotGapsMs: [0, 250, 250, 250, 250, 500], openingOrder: 0, label: "Две лапы поверх зерновой сыпи" },
	{ boss: 'enem5', indexAbilities: [7, 8, 9, 10, 11, 12, 13], shotGapsMs: [600, 0, 600, 600, 0, 300], label: "Зерновая ладонь возвращается влево" },
	{ boss: 'enem5', indexAbilities: [14, 15, 16, 17, 18, 19, 20], shotGapsMs: [600, 0, 0, 600, 0, 300], label: "Правый захват за левой россыпью" },
	{ boss: 'enem5', indexAbilities: [21, 22, 23, 24, 25, 26, 27], shotGapsMs: [0, 0, 500, 0, 500, 250], label: "Смыкание двух зерновых лап" },
	{ boss: 'enem5', indexAbilities: [28, 29, 30, 31, 32, 33, 34], shotGapsMs: [300, 300, 300, 300, 0, 600], label: "Зерно скрывает обратную ладонь" },
	{ boss: 'enem5', indexAbilities: [35, 36, 37, 38, 39, 40, 41], signature: true, isChain: true, shotDelayMs: 312, shotGapsMs: [0, 0, 0, 0, 0, 0], openingOrder: 1, label: "Цепь зернового плена" },
	{ boss: 'enem5', indexAbilities: [42, 43, 44, 45, 46, 47, 48, 49], minPhase: 2, shotGapsMs: [600, 0, 300, 0, 0, 300, 0], label: "Вторая лапа за правой шапкой зерна" },
	{ boss: 'enem5', indexAbilities: [50, 51, 52, 53, 54, 55, 56, 57, 58], minPhase: 3, shotGapsMs: [0, 0, 300, 0, 0, 300, 300, 300], label: "Осыпающийся великан бьёт обеими лапами" },
	{ boss: 'enem5', indexAbilities: [59, 60, 61, 62, 63, 64, 65], signature: true, isChain: true, minPhase: 3, shotDelayMs: 312, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Цепь замкнувшихся зерновых рук" },

];

// Лорные названия связок временных улучшений — у каждого босса свой словарь
// образов конкретно ЕГО материала/повадки (раздел 12.1), полных совпадений
// фраз между боссами уровня нет (проверено программно).
const UPGRADE_VARIANT_NAMES = {
    // Хоботень — жук-долгоносик: хобот, панцирь, зерно, надкрылья, коготь.
    enem1: {
        variant1: 'Хоботный кураж', variant2: 'Панцирная хватка', variant3: 'Хобот-таран',
        variant4: 'Зерновой напор', variant5: 'Меткий укол', variant6: 'Бешеный укол',
        variant7: 'Хоботенский норов', variant8: 'Крепкое надкрылье', variant9: 'Ударный хобот',
        variant10: 'Живучий панцирь', variant11: 'Колючий коготь', variant12: 'Укол и в темноту',
        variant13: 'Толстый панцирь', variant14: 'Неутомимый укол', variant15: 'Пружинистый выпад',
        variant16: 'Острый хобот, зоркий глаз', variant17: 'Зерновая удача', variant18: 'Верный укол',
        variant19: 'Молниеносный укол', variant20: 'Хоботный нюх', variant21: 'Цепкий коготь',
        variant22: 'Юркий для своего брюха', variant23: 'Панцирная стойкость', variant24: 'Долгий прицел, зоркий глаз',
        variant25: 'Ускользающий укол', variant26: 'Дикий укол', variant27: 'Стойкое надкрылье',
        variant28: 'Укол наповал', variant29: 'Крепкий хоботень', variant30: 'Панцирная мощь',
        variant31: 'Выпад с оглядкой', variant32: 'Живучее надкрылье', variant33: 'Юркий и колючий',
        variant34: 'Хоботная прыть', variant35: 'Быстрый укол, крепкий панцирь'
    },
    // Прорёха — рваный мешок: дыра, заплата, зерно, рогожа, шов.
    enem2: {
        variant1: 'Рваный кураж', variant2: 'Заплатная хватка', variant3: 'Шов-таран',
        variant4: 'Дырявый напор', variant5: 'Меткий разрыв', variant6: 'Бешеный разрыв',
        variant7: 'Прорёшный норов', variant8: 'Крепкая рогожа', variant9: 'Ударная дыра',
        variant10: 'Живучий шов', variant11: 'Колючая заплата', variant12: 'Разрыв и в темноту',
        variant13: 'Толстая рогожа', variant14: 'Неутомимый разрыв', variant15: 'Пружинистый разрыв',
        variant16: 'Острый край, зоркий глаз', variant17: 'Дырявая удача', variant18: 'Верный разрыв',
        variant19: 'Молниеносный разрыв', variant20: 'Дырявый нюх', variant21: 'Цепкий шов',
        variant22: 'Юркий, несмотря на дыру', variant23: 'Рогожная стойкость', variant24: 'Долгий разрыв, зоркий глаз',
        variant25: 'Ускользающая заплата', variant26: 'Дикий разрыв', variant27: 'Стойкий шов',
        variant28: 'Разрыв наповал', variant29: 'Крепкая прорёха', variant30: 'Рогожная мощь',
        variant31: 'Разрыв с оглядкой', variant32: 'Живучая заплата', variant33: 'Юркий и дырявый',
        variant34: 'Рваная прыть', variant35: 'Быстрый разрыв, крепкий шов'
    },
    // Зерномёт — деревянный совок: раструб, обод, щепа, зерно, замах.
    enem3: {
        variant1: 'Совковый кураж', variant2: 'Щепная хватка', variant3: 'Раструб-таран',
        variant4: 'Веерный напор', variant5: 'Меткий залп', variant6: 'Бешеный залп',
        variant7: 'Зерномётный норов', variant8: 'Крепкий обод', variant9: 'Ударный веер',
        variant10: 'Живучая щепа', variant11: 'Колючий раструб', variant12: 'Залп и в темноту',
        variant13: 'Толстая щепа', variant14: 'Неутомимый залп', variant15: 'Пружинистый замах',
        variant16: 'Острый веер, зоркий глаз', variant17: 'Веерная удача', variant18: 'Верный залп',
        variant19: 'Молниеносный залп', variant20: 'Совковый нюх', variant21: 'Цепкий обод',
        variant22: 'Юркий, несмотря на вес', variant23: 'Совковая стойкость', variant24: 'Долгий замах, зоркий глаз',
        variant25: 'Ускользающий залп', variant26: 'Дикий залп', variant27: 'Стойкий обод',
        variant28: 'Залп наповал', variant29: 'Крепкий зерномёт', variant30: 'Веерная мощь',
        variant31: 'Замах с оглядкой', variant32: 'Живучий обод', variant33: 'Юркий и веерный',
        variant34: 'Совковая прыть', variant35: 'Быстрый залп, крепкий обод'
    },
    // Бирюк — кладовщик: мел, доска, ключи, счёт, засечка.
    enem4: {
        variant1: 'Счётный кураж', variant2: 'Ключевая хватка', variant3: 'Мел-таран',
        variant4: 'Меловой напор', variant5: 'Меткая засечка', variant6: 'Бешеная засечка',
        variant7: 'Бирючий норов', variant8: 'Крепкая доска', variant9: 'Ударный мел',
        variant10: 'Живучий ключ', variant11: 'Колючая засечка', variant12: 'Засечка и в темноту',
        variant13: 'Толстая доска', variant14: 'Неутомимая засечка', variant15: 'Пружинистая засечка',
        variant16: 'Острый мел, зоркий глаз', variant17: 'Счётная удача', variant18: 'Верная засечка',
        variant19: 'Молниеносная засечка', variant20: 'Меловой нюх', variant21: 'Цепкий ключ',
        variant22: 'Юркий, несмотря на возраст', variant23: 'Счётная стойкость', variant24: 'Долгий счёт, зоркий глаз',
        variant25: 'Ускользающая засечка', variant26: 'Дикая засечка', variant27: 'Стойкая доска',
        variant28: 'Засечка наповал', variant29: 'Крепкий бирюк', variant30: 'Меловая мощь',
        variant31: 'Засечка с оглядкой', variant32: 'Живучая доска', variant33: 'Юркий и меловой',
        variant34: 'Счётная прыть', variant35: 'Быстрая засечка, крепкий ключ'
    },
    // Урожаище — зерновой голем: зерно, колос, мешковина, урожай, ость.
    enem5: {
        variant1: 'Зерновой кураж', variant2: 'Колосовая хватка', variant3: 'Зерно-таран',
        variant4: 'Урожайный напор', variant5: 'Меткий сноп', variant6: 'Бешеный сноп',
        variant7: 'Урожаищный норов', variant8: 'Крепкая мешковина', variant9: 'Ударное зерно',
        variant10: 'Живучий колос', variant11: 'Колючая ость', variant12: 'Сноп и в темноту',
        variant13: 'Толстая мешковина', variant14: 'Неутомимый сноп', variant15: 'Пружинистый сноп',
        variant16: 'Острая ость, зоркий глаз', variant17: 'Урожайная удача', variant18: 'Верный сноп',
        variant19: 'Молниеносный сноп', variant20: 'Зерновой нюх', variant21: 'Цепкий колос',
        variant22: 'Юркий, несмотря на рост', variant23: 'Урожайная стойкость', variant24: 'Долгий налив, зоркий глаз',
        variant25: 'Ускользающий сноп', variant26: 'Дикий сноп', variant27: 'Стойкая мешковина',
        variant28: 'Сноп наповал', variant29: 'Крепкое урожаище', variant30: 'Зерновая мощь',
        variant31: 'Сноп с оглядкой', variant32: 'Живучая ость', variant33: 'Юркий и зерновой',
        variant34: 'Урожайная прыть', variant35: 'Быстрый сноп, крепкая мешковина'
    }
};
