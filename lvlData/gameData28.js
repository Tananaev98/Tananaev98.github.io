let lvlNumber = 28;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 28 — «Ягодная поляна» (см. lvlData/areas.js/LEVEL_WORKING_TITLES и
// description/идеи по уровням.txt — сверять именно с ними перед правкой, не по памяти).
// Область III «Плодородные земли».
// Картинки — ягоды/бахча (клубника/малина/смородина/дыня/арбуз), не пчёлы/пасечник
// из старого плана — тот план устарел (см. также расхождение по 27/29).
//
// РЕГИОНАЛЬНАЯ МЕХАНИКА «синхронный рывок» на этом уровне несёт Сеточка (enem4) —
// намеренная смена роли-носителя (enem1→26, enem3→27, enem4→28, следующий enem5→29):
// «кто несёт приём» тоже не должно стать новым клише. Интересный поворот: обычно
// enem4 — самый нервный и быстрый архетип, а тут его нервная энергия выражается
// именно через синхронный рывок — сеть дынных плетей натягивается и лопается разом.
//
// Пять архетипов (movementStyle — по наименее используемым для роли на момент
// написания, сверено с admin-boss-pattern-panel.html):
// enem1 Алевка     — lateRush. Клубника: спокойный наплыв, поздний рывок на середине.
// enem2 Колючница  — straight. Малиновые шипы без движкового трюка, быстрые серии.
// enem3 Гроздяна   — drift. Смородиновая гроздь сносится вбок тяжёлыми ягодами.
// enem4 Сеточка    — pause, несёт синхронный рывок («плети натягиваются и лопаются»).
// enem5 Полосатень — accelerate. Арбуз медленно раскатывается, набирая ход к удару —
//                  финал смешивает четырёх предыдущих по-своему.
const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 0.88, damageMultiplier: 1.83, minWaveDelay: 2100, minShotDelay: 146, minTelegraphMs: 545,
	phases: [
		{ phase: 1, minHp: 0.65, cadence: 1.00, speed: 1.00, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.14, maxActiveAttacks: 14 },
		{ phase: 2, minHp: 0.31, cadence: 0.86, speed: 1.10, damage: 1.14, telegraphMultiplier: 0.93, surpriseChance: 0.24, maxActiveAttacks: 17 },
		{ phase: 3, minHp: 0.00, cadence: 0.72, speed: 1.20, damage: 1.27, telegraphMultiplier: 0.85, surpriseChance: 0.35, maxActiveAttacks: 21 }
	],
	bosses: {
		enem1: { movementStyle: 'lateRush',   cadence: 1.03, telegraphMs: 800, speedMultiplier: 0.94, damageMultiplier: 0.90, speedVariance: [0.86, 0.94, 1.02, 1.10, 1.18] }, // Алевка: спокойный наплыв, поздний рывок
		enem2: { movementStyle: 'straight',   cadence: 0.94, telegraphMs: 760, speedMultiplier: 1.03, damageMultiplier: 0.98, speedVariance: [0.87, 0.96, 1.05, 1.14, 1.23] }, // Колючница: шипы без трюка, быстрые серии
		enem3: { movementStyle: 'drift',      cadence: 1.17, telegraphMs: 1000, speedMultiplier: 0.85, damageMultiplier: 1.21, speedVariance: [0.77, 0.86, 0.96, 1.06, 1.16] }, // Гроздяна: тяжёлая гроздь сносится вбок
		enem4: { movementStyle: 'pause',      cadence: 0.90, telegraphMs: 700, speedMultiplier: 1.10, damageMultiplier: 0.80, speedVariance: [0.85, 0.96, 1.07, 1.18, 1.29], minFastSideSwitchMs: 830 }, // Сеточка: несёт синхронный рывок (7-sync)
		enem5: { movementStyle: 'accelerate', cadence: 0.87, telegraphMs: 715, speedMultiplier: 1.07, damageMultiplier: 1.11, speedVariance: [0.83, 0.94, 1.05, 1.16, 1.27] }  // Полосатень: медленный раскат, разгон к удару
	}
};

const ENEMY_TYPES = {

	enem11: { image: 'images/enemies/regions/3_plod_zemli/lvl28/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { image: 'images/enemies/regions/3_plod_zemli/lvl28/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { image: 'images/enemies/regions/3_plod_zemli/lvl28/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { image: 'images/enemies/regions/3_plod_zemli/lvl28/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { image: 'images/enemies/regions/3_plod_zemli/lvl28/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
		name: 'enem1', dispName: 'Алевка', image: 'images/enemies/regions/3_plod_zemli/lvl28/1.webp',
		baseHP: 2600 + (2600 * factorChar), baseSpeed: 0, baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5, baseExp: 230, xPos: 50, size: '22%',
		deathAnimation: { preset: 'juiceSquash', durationMs: 1100 }
	},
	enem2: {
		name: 'enem2', dispName: 'Колючница', image: 'images/enemies/regions/3_plod_zemli/lvl28/2.webp',
		baseHP: 6500 + (6500 * factorChar), baseSpeed: 0, baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15, baseExp: 360, xPos: 50, size: '24%',
		deathAnimation: { preset: 'thornCurlWither', durationMs: 1150 }
	},
	enem3: {
		name: 'enem3', dispName: 'Гроздяна', image: 'images/enemies/regions/3_plod_zemli/lvl28/3.webp',
		baseHP: 11500 + (11500 * factorChar), baseSpeed: 0, baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20, baseExp: 480, xPos: 50, size: '27%',
		deathAnimation: { preset: 'clusterScatter', durationMs: 1400 }
	},
	enem4: {
		name: 'enem4', dispName: 'Сеточка', image: 'images/enemies/regions/3_plod_zemli/lvl28/4.webp',
		baseHP: 18500 + (18500 * factorChar), baseSpeed: 0, baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10, baseExp: 620, xPos: 50, size: '25%',
		deathAnimation: { preset: 'netSnap', durationMs: 1050 }
	},
	enem5: {
		name: 'enem5', dispName: 'Полосатень', image: 'images/enemies/regions/3_plod_zemli/lvl28/5.webp',
		baseHP: 28000 + (28000 * factorChar), baseSpeed: 0, baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5, baseExp: 0, xPos: 50, size: '29%',
		deathAnimation: { preset: 'rindCrack', durationMs: 1550 }
	}
};

const attackDamage = {
	enem1: { light: Math.round(ENEMY_TYPES.enem1.baseDamage * 0.28), medium: Math.round(ENEMY_TYPES.enem1.baseDamage * 0.40), heavy: Math.round(ENEMY_TYPES.enem1.baseDamage * 0.52) },
	enem2: { light: Math.round(ENEMY_TYPES.enem2.baseDamage * 0.26), medium: Math.round(ENEMY_TYPES.enem2.baseDamage * 0.36), heavy: Math.round(ENEMY_TYPES.enem2.baseDamage * 0.48) },
	enem3: { light: Math.round(ENEMY_TYPES.enem3.baseDamage * 0.30), medium: Math.round(ENEMY_TYPES.enem3.baseDamage * 0.42), heavy: Math.round(ENEMY_TYPES.enem3.baseDamage * 0.58) },
	enem4: { light: Math.round(ENEMY_TYPES.enem4.baseDamage * 0.22), medium: Math.round(ENEMY_TYPES.enem4.baseDamage * 0.30), heavy: Math.round(ENEMY_TYPES.enem4.baseDamage * 0.40) },
	enem5: { light: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.24), medium: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.34), heavy: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.56) }
};

let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
let timeNextBoss = 5;
const bossInterval = 5;

const bossAbilities = [
	// ===== Алевка: спокойный наплыв, поздний рывок на середине пути (lateRush) =====
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 38, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 6 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 36, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 7 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 28, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 9 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 26, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 10 }, //3
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 20, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 13 }, //4
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 18, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 14 }, //5
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 11, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 16 }, //6
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 10, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 17 }, //7
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 8,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 20 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 7,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 21 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 45, yPos: 16, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 14 }, //10
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 14, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 14 }, //11
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 24, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 8 },  //12
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 22, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 8 },  //13
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 6,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 22 }, //14 нежданчик
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 44, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 5 },  //15

	// ===== Колючница: шипы без движкового трюка (straight), быстрые серии =====
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 9,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 22 }, //0
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 8,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 23 }, //1
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 12, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 18 }, //2
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 11, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 19 }, //3
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 20, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 14 }, //4
	{ boss: 'enem2', type: 'enem22', xPos: 78, yPos: 20, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 14 }, //5
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 46, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 5 },  //6
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 47, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 5 },  //7
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 6,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 24 }, //8
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 26 }, //9
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 30, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 9 },  //10
	{ boss: 'enem2', type: 'enem22', xPos: 82, yPos: 30, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 9 },  //11
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 46, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 4 },  //12 контраст: центр
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 14, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 17 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 13, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 17 }, //14
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 6,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 25 }, //15 нежданчик: второй центр

	// ===== Гроздяна: тяжёлая гроздь сносится вбок (drift), редкие удары =====
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 46, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 3 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 48, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 4 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 64, yPos: 46, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 3 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 48, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 4 },  //3
	{ boss: 'enem3', type: 'enem33', xPos: 26, yPos: 34, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 6 },  //4
	{ boss: 'enem3', type: 'enem33', xPos: 74, yPos: 34, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 6 },  //5
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 20, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 10 }, //6
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 20, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 10 }, //7
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 12, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 17 }, //8
	{ boss: 'enem3', type: 'enem33', xPos: 78, yPos: 11, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 18 }, //9
	{ boss: 'enem3', type: 'enem33', xPos: 45, yPos: 8,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 21 }, //10
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 7,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 22 }, //11
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 44, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 5 },  //12
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 44, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 5 },  //13
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 44, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 6 },  //14
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 6,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 24 }, //15 нежданчик высоко

	// ===== Сеточка: плети натягиваются и лопаются разом — синхронный рывок (pause), 7-sync =====
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 28, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 6 },  //0  Row A (2-sync): «Дедка тянет»
	{ boss: 'enem4', type: 'enem44', xPos: 32, yPos: 28, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 6 },  //1  Row A (2-sync)
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 34, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 5 },  //2  Row C (7-sync, сигнатура): «Вся деревня собралась!»
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 34, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 5 },  //3  Row C (7-sync)
	{ boss: 'enem4', type: 'enem44', xPos: 32, yPos: 34, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 5 },  //4  Row C (7-sync)
	{ boss: 'enem4', type: 'enem44', xPos: 44, yPos: 34, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 5 },  //5  Row C (7-sync)
	{ boss: 'enem4', type: 'enem44', xPos: 56, yPos: 34, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 5 },  //6  Row C (7-sync)
	{ boss: 'enem4', type: 'enem44', xPos: 68, yPos: 34, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 5 },  //7  Row C (7-sync)
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 34, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 5 },  //8  Row C (7-sync)
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 46, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 3 },  //9  solo медленный
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 12, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 16 }, //10
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 11, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 17 }, //11
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 8,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 20 }, //12
	{ boss: 'enem4', type: 'enem44', xPos: 55, yPos: 7,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 21 }, //13
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 47, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 4 },  //14
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 48, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 4 },  //15

	// ===== Полосатень: медленный раскат, разгон к удару (accelerate), финал-микс =====
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 46, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 4 },  //0
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 40, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 6 },  //1
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 28, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 9 },  //2
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 22, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 12 }, //3
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 14, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 15 }, //4
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 9,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 19 }, //5
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 7,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 22 }, //6
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 8,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 23 }, //7 асимметрия
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 46, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 4 },  //8
	{ boss: 'enem5', type: 'enem55', xPos: 36, yPos: 34, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 8 },  //9
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 18, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 14 }, //10
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 11, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 17 }, //11
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 45, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 5 },  //12
	{ boss: 'enem5', type: 'enem55', xPos: 6,  yPos: 6,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 25 }, //13 самый быстрый — отголосок Колючницы
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 32, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 7 },  //14 тихая пара — отголосок рывка Сеточки
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 32, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 7 }   //15 тихая пара — отголосок рывка Сеточки
];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 320, bossDelayAbDop: 5600 }, // спокойный наплыв
	{ boss: 'enem2', bossDelayAb: 220, bossDelayAbDop: 4400 }, // быстрые серии шипов
	{ boss: 'enem3', bossDelayAb: 400, bossDelayAbDop: 6500 }, // тяжёлая гроздь, долгая пауза
	{ boss: 'enem4', bossDelayAb: 460, bossDelayAbDop: 7100 }, // самая долгая на уровне — «вся деревня собралась»
	{ boss: 'enem5', bossDelayAb: 250, bossDelayAbDop: 4500 }, // финал плотнее среднего, но честный
];

const bossAbilitiesDop = [
	// Алевка
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [6, 7] },
	{ boss: 'enem1', indexAbilities: [2, 3, 12] },
	{ boss: 'enem1', indexAbilities: [10, 11, 13] },
	{ boss: 'enem1', indexAbilities: [4, 5, 6, 7] }, // ритмическая
	{ boss: 'enem1', indexAbilities: [0, 1, 8, 9] }, // опасная сигнатурная — same-start с [0,1]
	{ boss: 'enem1', indexAbilities: [0, 1] }, // chunk-break
	{ boss: 'enem1', indexAbilities: [12, 13, 14, 15] }, // смешанная поздняя

	// Колючница
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [6, 7] },
	{ boss: 'enem2', indexAbilities: [2, 3, 10] },
	{ boss: 'enem2', indexAbilities: [4, 5, 11] },
	{ boss: 'enem2', indexAbilities: [0, 2, 1, 3] }, // ритмическая
	{ boss: 'enem2', indexAbilities: [0, 1, 8, 9] }, // опасная сигнатурная — same-start с [0,1]
	{ boss: 'enem2', indexAbilities: [0, 1] }, // chunk-break
	{ boss: 'enem2', indexAbilities: [13, 14, 15, 12] }, // смешанная поздняя

	// Гроздяна
	{ boss: 'enem3', indexAbilities: [0, 2] },
	{ boss: 'enem3', indexAbilities: [4, 5] },
	{ boss: 'enem3', indexAbilities: [1, 3, 12] },
	{ boss: 'enem3', indexAbilities: [6, 7, 13] },
	{ boss: 'enem3', indexAbilities: [0, 2, 4, 5] }, // ритмическая
	{ boss: 'enem3', indexAbilities: [0, 2, 4, 5, 10, 11] }, // опасная сигнатурная — same-start с ритмической
	{ boss: 'enem3', indexAbilities: [0, 2, 4] }, // chunk-break
	{ boss: 'enem3', indexAbilities: [8, 9, 14, 15] }, // смешанная поздняя

	// Сеточка — «вся деревня собралась» (нарастает дольше всех: 2→7 синхронных)
	{ boss: 'enem4', indexAbilities: [0, 1] }, // Дедка тянет (2-sync)
	{ boss: 'enem4', indexAbilities: [9] }, // solo — контраст без синхронии
	{ boss: 'enem4', indexAbilities: [10, 11, 12] },
	{ boss: 'enem4', indexAbilities: [13, 14, 15] },
	{ boss: 'enem4', indexAbilities: [0, 1, 10, 11] }, // ритмическая: sync → соло
	{ boss: 'enem4', indexAbilities: [2, 3, 4, 5, 6, 7, 8] }, // Вся деревня собралась! (7-sync, опасная сигнатурная)
	{ boss: 'enem4', indexAbilities: [2, 3, 4] }, // chunk-break: обрывается на трети сигнатурной
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7, 8] }, // смешанная поздняя: полная цепочка целиком, редчайшая

	// Полосатень
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [8, 12] },
	{ boss: 'enem5', indexAbilities: [2, 3, 4] },
	{ boss: 'enem5', indexAbilities: [9, 10, 11] },
	{ boss: 'enem5', indexAbilities: [14, 15, 6] }, // ритмическая — тихий отголосок Сеточки
	{ boss: 'enem5', indexAbilities: [0, 1, 5, 6, 7] }, // опасная сигнатурная — same-start с [0,1]
	{ boss: 'enem5', indexAbilities: [0, 1, 5] }, // chunk-break
	{ boss: 'enem5', indexAbilities: [8, 9, 13, 14, 15] }, // смешанная поздняя
];
