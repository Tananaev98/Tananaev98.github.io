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
			// Хоботень: PROBOSCIS_JAB — точные редкие уколы хоботом на расстоянии
			movementStyle: 'straight', cadence: 1.05, telegraphMs: 920, speedMultiplier: 0.93, damageMultiplier: 0.91,
			speedVariance: [0.82, 0.92, 1.00, 1.08, 1.16]
		}, // Хоботень: PROBOSCIS_JAB — точные редкие уколы хоботом на расстоянии
		enem2: {
			// Прорёха: SELF_TEAR — зерно сыплется из растущей дыры всё чаще
			movementStyle: 'accelerate', cadence: 0.90, telegraphMs: 760, speedMultiplier: 1.06, damageMultiplier: 1.00,
			speedVariance: [0.86, 0.95, 1.05, 1.14, 1.22]
		}, // Прорёха: SELF_TEAR — зерно сыплется из растущей дыры всё чаще
		enem3: {
			// Зерномёт: SCOOP_FAN — редкий тяжёлый веерный залп после замаха
			movementStyle: 'pause', cadence: 1.16, telegraphMs: 1010, speedMultiplier: 0.83, damageMultiplier: 1.17,
			speedVariance: [0.80, 0.88, 0.96, 1.04, 1.12]
		}, // Зерномёт: SCOOP_FAN — редкий тяжёлый веерный залп после замаха
		enem4: {
			// Бирюк: TALLY_MARKS — нервные парные удары-«галочки», ускоряющиеся
			movementStyle: 'drift', cadence: 0.86, telegraphMs: 690, speedMultiplier: 1.13, damageMultiplier: 1.04,
			speedVariance: [0.88, 0.98, 1.08, 1.18, 1.26]
		}, // Бирюк: TALLY_MARKS — нервные парные удары-«галочки», ускоряющиеся
		enem5: {
			// Урожаище: GRAIN_SHOWER_SLAM — фоновый дождь зёрен + тяжёлые симметричные удары
			movementStyle: 'lateRush', cadence: 0.81, telegraphMs: 970, speedMultiplier: 1.07, damageMultiplier: 1.15,
			speedVariance: [0.86, 0.94, 1.03, 1.12, 1.20]
		} // Урожаище: GRAIN_SHOWER_SLAM — фоновый дождь зёрен + тяжёлые симметричные удары
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
 let timeNextBoss = 5;
 const bossInterval = 5;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
 // speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Хоботень: PROBOSCIS_JAB — точные редкие уколы хоботом на
	// расстоянии, спокойный темп знакомства =====
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //3
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //4
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //5
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //6
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //7
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //8
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 85, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 26 }, //10
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //11
	{ boss: 'enem1', type: 'enem11', xPos: 65, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //12
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //13 — нежданчик: два укола подряд с одной стороны вместо одиночного
	{ boss: 'enem1', type: 'enem11', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //15
	// звенья «атакующей цепи» — хобот дёргается зигзагом, затем зёрна падают
	// вразброс (zigzag+irregular), раздел 13.7.
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15 }, //21 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //22 цепь-B звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //23 цепь-B звено 4
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 8 },  //24 цепь-B звено 5

	// ===== Прорёха: SELF_TEAR — зерно сыплется из растущей дыры всё чаще =====
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //2
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //3
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //4
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //5
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //6
	{ boss: 'enem2', type: 'enem22', xPos: 75, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 26 }, //7
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //8
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //9
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //10
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //12 — нежданчик: дыра рвётся сразу вдвое шире, двойной поток
	{ boss: 'enem2', type: 'enem22', xPos: 78, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //15
	// звенья «атакующей цепи» — дыра рвётся хаотично, затем один решительный
	// рывок в сторону (irregular+diagonal), раздел 13.7.
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, //17 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //18 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //19 цепь-A звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //20 цепь-A звено 5
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //21 цепь-B звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //22 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //23 цепь-B звено 3

	// ===== Зерномёт: SCOOP_FAN — редкий тяжёлый веерный залп после замаха =====
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //3
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //4
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //5
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //6
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20 }, //7
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //9
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24 }, //10
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //11
	{ boss: 'enem3', type: 'enem33', xPos: 65, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //12
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //13
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //14 — нежданчик: залп раньше привычного долгого замаха
	{ boss: 'enem3', type: 'enem33', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — веер расходится дугой, затем один прямой
	// досыпающий поток (arc+vertical), раздел 13.7.
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //20 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //21 цепь-B звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 51, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 9 },  //22 цепь-B звено 4

	// ===== Бирюк: TALLY_MARKS — нервные парные удары-«галочки»,
	// ускоряющиеся, как будто спешит закончить подсчёт =====
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 },  //0
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 },  //1
	{ boss: 'enem4', type: 'enem44', xPos: 85, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 },  //2
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 11, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 },  //3
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //4
	{ boss: 'enem4', type: 'enem44', xPos: 43, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //5
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //6
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //7
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, //8
	{ boss: 'enem4', type: 'enem44', xPos: 75, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //9
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 26 }, //10
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20 }, //11
	{ boss: 'enem4', type: 'enem44', xPos: 35, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //12
	{ boss: 'enem4', type: 'enem44', xPos: 65, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //13
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //14 — нежданчик: три засечки подряд вместо привычной пары
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //15
	// звенья «атакующей цепи» — хаотичные меловые засечки, затем одна
	// решительная подчёркивающая черта (irregular+diagonal), раздел 13.7.
	{ boss: 'enem4', type: 'enem44', xPos: 75, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //17 цепь-A звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //18 цепь-A звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, //19 цепь-A звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //20 цепь-A звено 5
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //21 цепь-B звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //22 цепь-B звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //23 цепь-B звено 3

	// ===== Урожаище: GRAIN_SHOWER_SLAM — фоновый дождь зёрен + тяжёлые
	// симметричные удары обеих лап разом =====
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //0
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //2  симметричная пара с 1
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //3
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //4  симметричная пара с 3
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //5
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //6  симметричная пара с 5
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //7
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //8  симметричная пара с 7
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //9  фоновый дождь низа
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //10 фоновый дождь низа
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //11 фоновый дождь низа
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28 }, //12 — нежданчик: центральный удар на пиковой скорости без симметричной пары
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //14
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //15
	// звенья «атакующей цепи» — зёрна каскадом сыплются вразнобой при каждом
	// шаге голема (zigzag+irregular), раздел 13.7.
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, //21 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //22 цепь-B звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //23 цепь-B звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //24 цепь-B звено 5
];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 320, bossDelayAbDop: 6000 }, // спокойный точный укол
	{ boss: 'enem2', bossDelayAb: 240, bossDelayAbDop: 4400 }, // рвётся всё чаще
	{ boss: 'enem3', bossDelayAb: 410, bossDelayAbDop: 6900 }, // самый долгий отдых — награда за терпение
	{ boss: 'enem4', bossDelayAb: 185, bossDelayAbDop: 3500 }, // самый частый — нервный счёт без передышки
	{ boss: 'enem5', bossDelayAb: 255, bossDelayAbDop: 5100 }, // собранный финал
 ];

 const bossAbilitiesDop = [
	// Хоботень — PROBOSCIS_JAB
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [2, 3] },
	{ boss: 'enem1', indexAbilities: [4, 5, 6] },
	{ boss: 'enem1', indexAbilities: [7, 8] },
	{ boss: 'enem1', indexAbilities: [9, 10] },
	{ boss: 'enem1', indexAbilities: [0, 1, 5] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem1', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4, zigzag)
	{ boss: 'enem1', indexAbilities: [20, 21, 22, 23, 24], isChain: true }, // ← цепь-B (5, irregular)
	{ boss: 'enem1', indexAbilities: [13, 9] }, // нежданчик: два укола подряд с одной стороны
	{ boss: 'enem1', indexAbilities: [0, 2, 4, 11, 6, 12] }, // сигнатурная: серия уколов через всё поле подряд

	// Прорёха — SELF_TEAR
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [2, 3] },
	{ boss: 'enem2', indexAbilities: [4, 5] },
	{ boss: 'enem2', indexAbilities: [6, 7] },
	{ boss: 'enem2', indexAbilities: [8, 9, 14, 15] },
	{ boss: 'enem2', indexAbilities: [0, 1, 4] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem2', indexAbilities: [16, 17, 18, 19, 20], isChain: true }, // ← цепь-A (5, irregular)
	{ boss: 'enem2', indexAbilities: [21, 22, 23], isChain: true }, // ← цепь-B (3, diagonal)
	{ boss: 'enem2', indexAbilities: [12, 13] }, // нежданчик: дыра рвётся сразу вдвое шире
	{ boss: 'enem2', indexAbilities: [0, 2, 4, 6, 1, 3, 5, 7] }, // сигнатурная: полный разрыв с обеих сторон подряд

	// Зерномёт — SCOOP_FAN
	{ boss: 'enem3', indexAbilities: [0, 1, 2] },
	{ boss: 'enem3', indexAbilities: [3, 4] },
	{ boss: 'enem3', indexAbilities: [5, 6] },
	{ boss: 'enem3', indexAbilities: [7, 8] },
	{ boss: 'enem3', indexAbilities: [9, 10] },
	{ boss: 'enem3', indexAbilities: [0, 1, 7] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem3', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь-A (3, arc)
	{ boss: 'enem3', indexAbilities: [19, 20, 21, 22], isChain: true }, // ← цепь-B (4, vertical)
	{ boss: 'enem3', indexAbilities: [14] }, // нежданчик: залп раньше привычного долгого замаха
	{ boss: 'enem3', indexAbilities: [3, 11, 4, 12] }, // сигнатурная: широкий веерный залп с обеих сторон разом

	// Бирюк — TALLY_MARKS
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [2, 3] },
	{ boss: 'enem4', indexAbilities: [4, 5] },
	{ boss: 'enem4', indexAbilities: [6, 7] },
	{ boss: 'enem4', indexAbilities: [8, 9, 12, 13] },
	{ boss: 'enem4', indexAbilities: [0, 1, 6] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem4', indexAbilities: [16, 17, 18, 19, 20], isChain: true }, // ← цепь-A (5, irregular)
	{ boss: 'enem4', indexAbilities: [21, 22, 23], isChain: true }, // ← цепь-B (3, diagonal)
	{ boss: 'enem4', indexAbilities: [14, 10, 11] }, // нежданчик: три засечки подряд вместо привычной пары
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4, 5, 15, 8] }, // сигнатурная: полный подсчёт по всему полю на скорости

	// Урожаище — GRAIN_SHOWER_SLAM, финальный облик
	{ boss: 'enem5', indexAbilities: [1, 2] },
	{ boss: 'enem5', indexAbilities: [3, 4] },
	{ boss: 'enem5', indexAbilities: [5, 6] },
	{ boss: 'enem5', indexAbilities: [7, 8] },
	{ boss: 'enem5', indexAbilities: [9, 10, 11] },
	{ boss: 'enem5', indexAbilities: [1, 2, 3, 4] }, // same-start с [1,2] (симметричная пара), расходится быстрым акцентом
	{ boss: 'enem5', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4, zigzag)
	{ boss: 'enem5', indexAbilities: [20, 21, 22, 23, 24], isChain: true }, // ← цепь-B (5, irregular)
	{ boss: 'enem5', indexAbilities: [12] }, // нежданчик: центральный удар без симметричной пары
	{ boss: 'enem5', indexAbilities: [1, 2, 9, 10, 3, 4, 13, 14] }, // сигнатурная кульминация: симметричный дождь и удары разом по всему полю
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
