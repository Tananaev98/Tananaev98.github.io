let lvlNumber = 26;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 26 — «Корнеплодное царство», ОТКРЫТИЕ Области III «Плодородные земли».
// ВТОРАЯ версия (первая ощущалась «как всё остальное» — игрок прошёл и не заметил
// ничего нового, хотя формально была новая механика). Причина разобрана и записана в
// lvlData/Правила создания уровня.txt §1.1: движение боссов статистически прибито к
// роли на всей кампании (enem3 почти всегда pause, enem4 почти всегда lateRush/
// accelerate) — первая версия ровно в эту колею и попала. См. также
// lvlData/АРХИВ ПАТТЕРНОВ БОССОВ.md — таблица по всем уровням, свериться перед
// написанием следующего.
//
// РЕГИОНАЛЬНАЯ МЕХАНИКА — «синхронный рывок» (теперь несёт Чернавка, enem1, а не
// enem3 как в первой версии): несколько атак с ОДИНАКОВЫМ стартовым yPos и ОДИНАКОВЫМ
// customSpeed у босса с movementStyle:'pause' замирают в один и тот же момент полёта
// и срываются с места ОДНОВРЕМЕННО. Перенесено на ПЕРВОГО босса намеренно — в первой
// версии приём висел на 3-м боссе и мог вообще не попасться игроку (бой заканчивался
// раньше, чем движок выбирал нужную комбинацию из bossAbilitiesDop). На первом боссе,
// с длинным телеграфом и умеренным уроном, приём гарантированно виден с первой же
// смерти уровня — учить механику лучше на самом безопасном противнике, не на третьем.
//
// ПРИЁМЫ ИЗ DARK SOULS (см. §1.1 правил, коротко — что применено здесь):
// 1) «Одинаковое начало — разный конец»: у КАЖДОГО из 5 боссов есть пара комбинаций,
//    начинающихся одним и тем же префиксом indexAbilities, но расходящихся дальше —
//    отмечено комментарием «same-start».
// 2) «Разбитый чанк»: у каждого босса есть комбинация, которая начинается как уже
//    выученная игроком (тот же префикс), но обрывается РАНЬШЕ — отмечено «chunk-break».
// 3) Телеграф на сигнатурных атаках не срезан — наоборот, самые опасные боссы (Белобока)
//    получили самый длинный telegraphMs на уровне.
// 4) Ритм пауз (bossDelayAbDop) различается осознанно, не «примерно как у соседей».
//
// Пять архетипов (movementStyle намеренно НЕ те, что обычно достаются этим ролям —
// сверено с архивом паттернов):
// enem1 Чернавка — pause, несёт синхронный рывок («Дедка тянет» → «Бабка подмогает»).
//                  У роли enem1 pause встречался только 3 раза из 25 уровней.
// enem2 Ботвинья — lateRush (у роли enem2 встречался только 1 раз из 25). Спокойный
//                  снос листвы, который на середине пути внезапно ускоряется.
// enem3 Белобока — accelerate (у роли enem3 встречался только 2 раза из 25 — там почти
//                  всегда pause). Обманчиво медленный старт, разгоняется к удару —
//                  «корень наливается силой».
// enem4 Кругляш  — weave (у роли enem4 встречался только 3 раза из 25 — там почти
//                  всегда lateRush/accelerate, 72% уровней). Нервная змейка из углов,
//                  а не рывок по прямой.
// enem5 Спасовка — straight (у роли enem5 НИ РАЗУ не встречался за 25 уровней). Финал
//                  без движковых трюков — честная геометрия, асимметрия лево/право,
//                  тихий парный отголосок рывка Белобоки (совпадающий yPos/speed, но
//                  без паузы — тень приёма без самого приёма).
const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 0.90, damageMultiplier: 1.732, minWaveDelay: 2150, minShotDelay: 150, minTelegraphMs: 555,
	phases: [
		{ phase: 1, minHp: 0.65, cadence: 1.00, speed: 1.00, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.13, maxActiveAttacks: 14 },
		{ phase: 2, minHp: 0.31, cadence: 0.87, speed: 1.09, damage: 1.13, telegraphMultiplier: 0.94, surpriseChance: 0.23, maxActiveAttacks: 17 },
		{ phase: 3, minHp: 0.00, cadence: 0.74, speed: 1.18, damage: 1.25, telegraphMultiplier: 0.87, surpriseChance: 0.33, maxActiveAttacks: 20 }
	],
	bosses: {
		enem1: { movementStyle: 'pause',    cadence: 1.05, telegraphMs: 900, speedMultiplier: 0.90, damageMultiplier: 0.88, speedVariance: [0.82, 0.90, 0.98, 1.06, 1.14], minFastSideSwitchMs: 850 }, // Чернавка: SYNC_PULL — синхронный рывок, «Дедка тянет»
		enem2: { movementStyle: 'lateRush', cadence: 0.95, telegraphMs: 780, speedMultiplier: 1.00, damageMultiplier: 0.96, speedVariance: [0.86, 0.95, 1.04, 1.13, 1.22] }, // Ботвинья: LEAF_SURGE — спокойный снос листвы, поздний рывок
		enem3: { movementStyle: 'accelerate', cadence: 1.10, telegraphMs: 980, speedMultiplier: 0.86, damageMultiplier: 1.18, speedVariance: [0.78, 0.88, 0.98, 1.08, 1.18] }, // Белобока: TAPROOT_SURGE — обманчиво медленный старт, разгон к удару
		enem4: { movementStyle: 'weave',    cadence: 0.82, telegraphMs: 650, speedMultiplier: 1.16, damageMultiplier: 0.78, speedVariance: [0.90, 1.02, 1.14, 1.26, 1.38] }, // Кругляш: SKITTER_CORNERS — нервная змейка из четырёх углов
		enem5: { movementStyle: 'straight', cadence: 0.85, telegraphMs: 700, speedMultiplier: 1.05, damageMultiplier: 1.08, speedVariance: [0.84, 0.95, 1.06, 1.17, 1.28] }  // Спасовка: PLAIN_RECKONING — без движкового трюка, честная геометрия
	}
};

const ENEMY_TYPES = {

	enem11: {
        image: 'images/enemies/regions/3_plod_zemli/lvl26/11.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem22: {
        image: 'images/enemies/regions/3_plod_zemli/lvl26/22.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem33: {
        image: 'images/enemies/regions/3_plod_zemli/lvl26/33.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem44: {
        image: 'images/enemies/regions/3_plod_zemli/lvl26/44.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem55: {
        image: 'images/enemies/regions/3_plod_zemli/lvl26/55.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem1: {
		name: 'enem1',
		dispName: 'Чернавка',
		image: 'images/enemies/regions/3_plod_zemli/lvl26/1.webp',
		baseHP: 2600 + (2600 * factorChar),
		baseSpeed: 0,
		baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5,
		baseExp: 210,
		xPos: 50,
		size: '24%',
        deathAnimation: { preset: 'unearthTumble', durationMs: 1200 }
	},

	enem2: {
		name: 'enem2',
		dispName: 'Ботвинья',
		image: 'images/enemies/regions/3_plod_zemli/lvl26/2.webp',
		baseHP: 6500 + (6500 * factorChar),
		baseSpeed: 0,
		baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15,
		baseExp: 340,
		xPos: 50,
		size: '25%',
        deathAnimation: { preset: 'leavesScatter', durationMs: 1100 }
	},

	enem3: {
		name: 'enem3',
		dispName: 'Белобока',
		image: 'images/enemies/regions/3_plod_zemli/lvl26/3.webp',
		baseHP: 11500 + (11500 * factorChar),
		baseSpeed: 0,
		baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20,
		baseExp: 460,
		xPos: 50,
		size: '28%',
        deathAnimation: { preset: 'rootSnapSink', durationMs: 1400 }
	},

	enem4: {
		name: 'enem4',
		dispName: 'Кругляш',
		image: 'images/enemies/regions/3_plod_zemli/lvl26/4.webp',
		baseHP: 18500 + (18500 * factorChar),
		baseSpeed: 0,
		baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10,
		baseExp: 600,
		xPos: 50,
		size: '24%',
        deathAnimation: { preset: 'quickSpin', durationMs: 1000 }
	},

	enem5: {
		name: 'enem5',
		dispName: 'Спасовка',
		image: 'images/enemies/regions/3_plod_zemli/lvl26/5.webp',
		baseHP: 28000 + (28000 * factorChar),
		baseSpeed: 0,
		baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5,
		baseExp: 0,
		xPos: 50,
		size: '27%',
        deathAnimation: { preset: 'ripeCollapse', durationMs: 1500 }
	}
};

const attackDamage = {
	enem1: {
		light: Math.round(ENEMY_TYPES.enem1.baseDamage * 0.28),
		medium: Math.round(ENEMY_TYPES.enem1.baseDamage * 0.40),
		heavy: Math.round(ENEMY_TYPES.enem1.baseDamage * 0.52)
	},
	enem2: {
		light: Math.round(ENEMY_TYPES.enem2.baseDamage * 0.26),
		medium: Math.round(ENEMY_TYPES.enem2.baseDamage * 0.36),
		heavy: Math.round(ENEMY_TYPES.enem2.baseDamage * 0.48)
	},
	enem3: {
		light: Math.round(ENEMY_TYPES.enem3.baseDamage * 0.30),
		medium: Math.round(ENEMY_TYPES.enem3.baseDamage * 0.42),
		heavy: Math.round(ENEMY_TYPES.enem3.baseDamage * 0.58)
	},
	enem4: {
		light: Math.round(ENEMY_TYPES.enem4.baseDamage * 0.22),
		medium: Math.round(ENEMY_TYPES.enem4.baseDamage * 0.30),
		heavy: Math.round(ENEMY_TYPES.enem4.baseDamage * 0.40)
	},
	enem5: {
		light: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.24),
		medium: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.34),
		heavy: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.56)
	}
};

let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
let timeNextBoss = 5;
const bossInterval = 5;

const bossAbilities = [
	// ===== Чернавка: SYNC_PULL — синхронный рывок из середины поля =====
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 30, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 6 },  //0  Row A (2-sync): «Дедка тянет»
	{ boss: 'enem1', type: 'enem11', xPos: 34, yPos: 30, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 6 },  //1  Row A (2-sync)
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 32, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 5 },  //2  Row B (3-sync): «Бабка подмогает»
	{ boss: 'enem1', type: 'enem11', xPos: 74, yPos: 32, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 5 },  //3  Row B (3-sync)
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 32, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 5 },  //4  Row B (3-sync)
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 48, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 3 },  //5  solo медленный (контраст, без синхронии)
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 50, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 4 },  //6  solo медленный
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 44, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 7 },  //7  центр — тоже не безопасен
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 12, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 16 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 11, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 17 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 45, yPos: 8,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 20 }, //10
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 7,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 21 }, //11
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 46, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 4 },  //12
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 47, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 4 },  //13
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 6,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 22 }, //14 быстрый акцент высоко
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 50, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 3 },  //15 доп. медленный центр

	// ===== Ботвинья: LEAF_SURGE — спокойный снос листвы, поздний рывок на середине пути =====
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 36, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 7 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 34, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 8 },  //1
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 28, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 10 }, //2
	{ boss: 'enem2', type: 'enem22', xPos: 78, yPos: 26, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 11 }, //3
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 20, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 14 }, //4
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 18, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 15 }, //5
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 11, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 17 }, //6
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 10, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 18 }, //7
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 8,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 21 }, //8
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 7,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 22 }, //9
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 6,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 24 }, //10
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 26 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 45, yPos: 16, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 15 }, //12
	{ boss: 'enem2', type: 'enem22', xPos: 55, yPos: 14, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 15 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 24, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 9 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 22, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 9 },  //15

	// ===== Белобока: TAPROOT_SURGE — обманчиво медленный старт, разгон к удару (accelerate) =====
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 48, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 4 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 50, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 5 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 64, yPos: 48, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 4 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 50, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 5 },  //3
	{ boss: 'enem3', type: 'enem33', xPos: 28, yPos: 40, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 7 },  //4
	{ boss: 'enem3', type: 'enem33', xPos: 72, yPos: 40, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 7 },  //5
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 26, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 10 }, //6
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 26, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 10 }, //7
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 12, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 17 }, //8
	{ boss: 'enem3', type: 'enem33', xPos: 78, yPos: 11, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 18 }, //9
	{ boss: 'enem3', type: 'enem33', xPos: 45, yPos: 8,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 21 }, //10
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 7,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 22 }, //11
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 44, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 6 },  //12
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 46, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 5 },  //13
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 46, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 5 },  //14
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 6,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 24 }, //15 нежданчик: акцент высоко

	// ===== Кругляш: SKITTER_CORNERS — нервная змейка из четырёх углов (weave) =====
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 9,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 22 }, //0
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 8,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 23 }, //1
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 12, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 18 }, //2
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 11, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 19 }, //3
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 47, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 5 },  //4
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 46, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 6 },  //5
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 44, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 9 },  //6
	{ boss: 'enem4', type: 'enem44', xPos: 84, yPos: 45, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 9 },  //7
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 26 }, //8
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 5,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 27 }, //9
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 10, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 20 }, //10
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 9,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 21 }, //11
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 45, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 5 },  //12 редкий контраст: центр вместо угла
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 13, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 17 }, //13
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 12, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 16 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 25 }, //15 нежданчик: второй центральный выпад

	// ===== Спасовка: PLAIN_RECKONING — без движкового трюка, асимметричный микс всех четырёх =====
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 44, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 5 },  //0
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 38, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 7 },  //1
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 28, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 10 }, //2
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 22, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 13 }, //3
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 14, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 16 }, //4
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 9,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 20 }, //5
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 7,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 23 }, //6
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 8,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 24 }, //7 неожиданный правый акцент — асимметрия
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 46, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 4 },  //8
	{ boss: 'enem5', type: 'enem55', xPos: 36, yPos: 34, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 9 },  //9
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 18, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 15 }, //10
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 11, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 18 }, //11
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 45, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 6 },  //12
	{ boss: 'enem5', type: 'enem55', xPos: 6,  yPos: 6,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 26 }, //13 самый быстрый — отголосок Кругляша
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 32, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 8 },  //14 тихая пара — отголосок рывка Белобоки (без паузы)
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 32, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 8 }   //15 тихая пара — отголосок рывка Белобоки (без паузы)
];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 420, bossDelayAbDop: 6600 }, // самая долгая пауза — награда за терпение, «тянут-потянут»
	{ boss: 'enem2', bossDelayAb: 300, bossDelayAbDop: 5200 }, // спокойный снос листвы держит ритм
	{ boss: 'enem3', bossDelayAb: 360, bossDelayAbDop: 6000 }, // разгон требует места между сериями
	{ boss: 'enem4', bossDelayAb: 200, bossDelayAbDop: 4100 }, // самый нервный, самый частый на уровне
	{ boss: 'enem5', bossDelayAb: 260, bossDelayAbDop: 4700 }, // финал плотнее среднего, но честный
];

const bossAbilitiesDop = [
	// Чернавка — «тянем-потянем»: каждая следующая sync-строка длиннее предыдущей
	{ boss: 'enem1', indexAbilities: [0, 1] }, // Дедка тянет (2-sync, учебная)
	{ boss: 'enem1', indexAbilities: [5, 6] }, // Бабка смотрит (контраст: два медленных соло, без синхронии)
	{ boss: 'enem1', indexAbilities: [2, 3, 4] }, // Бабка подмогает (3-sync) — same-start база для сигнатурной
	{ boss: 'enem1', indexAbilities: [7, 12, 13] },
	{ boss: 'enem1', indexAbilities: [0, 1, 8, 9] }, // ритмическая: sync → быстрый акцент
	{ boss: 'enem1', indexAbilities: [2, 3, 4, 10, 11] }, // опасная сигнатурная — same-start с [2,3,4], другой конец
	{ boss: 'enem1', indexAbilities: [2, 3, 4] }, // chunk-break: тот же префикс сигнатурной, обрывается сразу
	{ boss: 'enem1', indexAbilities: [5, 15, 6] }, // смешанная поздняя

	// Ботвинья
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [6, 7] },
	{ boss: 'enem2', indexAbilities: [2, 3, 14] },
	{ boss: 'enem2', indexAbilities: [12, 13, 4] },
	{ boss: 'enem2', indexAbilities: [8, 10, 9, 11] }, // ритмическая
	{ boss: 'enem2', indexAbilities: [0, 1, 8, 10] }, // опасная сигнатурная — same-start с [0,1], другой конец
	{ boss: 'enem2', indexAbilities: [0, 1, 8] }, // chunk-break: тот же префикс, обрывается раньше
	{ boss: 'enem2', indexAbilities: [14, 15, 2, 3] }, // смешанная поздняя

	// Белобока
	{ boss: 'enem3', indexAbilities: [0, 2] },
	{ boss: 'enem3', indexAbilities: [4, 5] },
	{ boss: 'enem3', indexAbilities: [1, 3, 12] },
	{ boss: 'enem3', indexAbilities: [6, 7, 13] },
	{ boss: 'enem3', indexAbilities: [0, 2, 4, 5] }, // ритмическая
	{ boss: 'enem3', indexAbilities: [0, 2, 4, 5, 10, 11] }, // опасная сигнатурная — same-start с ритмической, другой конец
	{ boss: 'enem3', indexAbilities: [0, 2, 4] }, // chunk-break: короче обеих, обрывается раньше
	{ boss: 'enem3', indexAbilities: [8, 9, 14, 15] }, // смешанная поздняя

	// Кругляш
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [4, 5] },
	{ boss: 'enem4', indexAbilities: [2, 3, 10] },
	{ boss: 'enem4', indexAbilities: [6, 7, 11] },
	{ boss: 'enem4', indexAbilities: [8, 10, 9, 11] }, // ритмическая
	{ boss: 'enem4', indexAbilities: [0, 1, 8, 9] }, // опасная сигнатурная — same-start с [0,1], другой конец
	{ boss: 'enem4', indexAbilities: [0, 1, 8] }, // chunk-break: тот же префикс, обрывается раньше
	{ boss: 'enem4', indexAbilities: [12, 13, 14, 15] }, // смешанная поздняя

	// Спасовка — смешивает почерк всех четырёх предыдущих боссов уровня
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [8, 12] },
	{ boss: 'enem5', indexAbilities: [2, 3, 4] },
	{ boss: 'enem5', indexAbilities: [9, 10, 11] },
	{ boss: 'enem5', indexAbilities: [14, 15, 6] }, // ритмическая — тихий отголосок Белобоки
	{ boss: 'enem5', indexAbilities: [0, 1, 5, 6, 7] }, // опасная сигнатурная — same-start с [0,1], другой конец
	{ boss: 'enem5', indexAbilities: [0, 1, 5] }, // chunk-break: тот же префикс, обрывается раньше
	{ boss: 'enem5', indexAbilities: [8, 9, 13, 14, 15] }, // смешанная поздняя — закрывающий отголосок рывка
];
