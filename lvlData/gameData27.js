let lvlNumber = 27;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 27 — «Огородная гряда» (см. lvlData/areas.js/LEVEL_WORKING_TITLES и
// description/идеи по уровням.txt), Область III «Плодородные земли», продолжение.
// Картинки — огородные овощи (не гусеница/скворец/сторож из старого плана в
// «идеи по уровням.txt» — тот план устарел, реальные ассеты другие; см. также
// расхождение по 28/29). Сверено с admin-boss-pattern-panel.html перед написанием.
//
// РЕГИОНАЛЬНАЯ МЕХАНИКА «синхронный рывок» на этом уровне несёт Кочерыжка (enem3,
// была на enem1 в 26-м) — по плану region-signature намеренно кочует по ролям
// (enem1→26, enem3→27, enem4→28, enem5→29), чтобы «кто несёт приём» тоже не стало
// новым клише. Сигнатурная серия длиннее, чем на 26-м (6 синхронных вместо 5) —
// нарастание цепочки к концу региона, как и задумано.
//
// Пять архетипов (movementStyle взят по наименее используемым для роли — сверено
// с живой таблицей на момент написания):
// enem1 Пупырчик — accelerate. Огуречные усики медленно раскручиваются и
//                  разгоняются — спокойное начало без явной угрозы в старте.
// enem2 Сочень    — drift. Томатный сок расползается вбок, быстрые серии.
// enem3 Кочерыжка — pause, несёт синхронный рывок («листья разворачиваются разом»).
// enem4 Дёргач    — straight. Морковь без движкового трюка — нервность идёт через
//                  ритм (самый короткий bossDelayAb на уровне), не через траекторию.
// enem5 Пустоглав — weave. Пустая тыква-фонарь мотается непредсказуемо, финал
//                  смешивает четырёх предыдущих по-своему (без клише «впервые
//                  перекрывает низ поля разом»).
const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 0.89, damageMultiplier: 1.78, minWaveDelay: 2120, minShotDelay: 148, minTelegraphMs: 550,
	phases: [
		{ phase: 1, minHp: 0.65, cadence: 1.00, speed: 1.00, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.14, maxActiveAttacks: 14 },
		{ phase: 2, minHp: 0.31, cadence: 0.86, speed: 1.10, damage: 1.14, telegraphMultiplier: 0.93, surpriseChance: 0.24, maxActiveAttacks: 17 },
		{ phase: 3, minHp: 0.00, cadence: 0.73, speed: 1.19, damage: 1.26, telegraphMultiplier: 0.86, surpriseChance: 0.34, maxActiveAttacks: 20 }
	],
	bosses: {
		enem1: { movementStyle: 'accelerate', cadence: 1.06, telegraphMs: 890, speedMultiplier: 0.90, damageMultiplier: 0.88, speedVariance: [0.80, 0.90, 1.00, 1.10, 1.20] }, // Пупырчик: TENDRIL_CREEP — усики раскручиваются и разгоняются
		enem2: { movementStyle: 'drift',      cadence: 0.96, telegraphMs: 770, speedMultiplier: 1.01, damageMultiplier: 0.97, speedVariance: [0.86, 0.95, 1.04, 1.13, 1.22] }, // Сочень: BURST_SPILL — сок расползается вбок
		enem3: { movementStyle: 'pause',      cadence: 1.16, telegraphMs: 990, speedMultiplier: 0.86, damageMultiplier: 1.20, speedVariance: [0.78, 0.87, 0.97, 1.07, 1.17], minFastSideSwitchMs: 860 }, // Кочерыжка: LEAF_UNFURL — синхронный рывок (6-sync)
		enem4: { movementStyle: 'straight',   cadence: 0.78, telegraphMs: 630, speedMultiplier: 1.19, damageMultiplier: 0.76, speedVariance: [0.90, 1.02, 1.14, 1.26, 1.38] }, // Дёргач: YANK_PULL — без трюка движения, нервность через ритм
		enem5: { movementStyle: 'weave',      cadence: 0.86, telegraphMs: 710, speedMultiplier: 1.06, damageMultiplier: 1.10, speedVariance: [0.84, 0.95, 1.06, 1.17, 1.28] }  // Пустоглав: HOLLOW_SWAY — непредсказуемое мотание пустого фонаря
	}
};

const ENEMY_TYPES = {

	enem11: { image: 'images/enemies/regions/3_plod_zemli/lvl27/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { image: 'images/enemies/regions/3_plod_zemli/lvl27/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { image: 'images/enemies/regions/3_plod_zemli/lvl27/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { image: 'images/enemies/regions/3_plod_zemli/lvl27/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { image: 'images/enemies/regions/3_plod_zemli/lvl27/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
		name: 'enem1', dispName: 'Пупырчик', image: 'images/enemies/regions/3_plod_zemli/lvl27/1.webp',
		baseHP: 2600 + (2600 * factorChar), baseSpeed: 0, baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5, baseExp: 220, xPos: 50, size: '23%',
		deathAnimation: { preset: 'curlWither', durationMs: 1200 }
	},
	enem2: {
		name: 'enem2', dispName: 'Сочень', image: 'images/enemies/regions/3_plod_zemli/lvl27/2.webp',
		baseHP: 6500 + (6500 * factorChar), baseSpeed: 0, baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15, baseExp: 350, xPos: 50, size: '25%',
		deathAnimation: { preset: 'splatBurst', durationMs: 1100 }
	},
	enem3: {
		name: 'enem3', dispName: 'Кочерыжка', image: 'images/enemies/regions/3_plod_zemli/lvl27/3.webp',
		baseHP: 11500 + (11500 * factorChar), baseSpeed: 0, baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20, baseExp: 470, xPos: 50, size: '28%',
		deathAnimation: { preset: 'leafPeelSink', durationMs: 1400 }
	},
	enem4: {
		name: 'enem4', dispName: 'Дёргач', image: 'images/enemies/regions/3_plod_zemli/lvl27/4.webp',
		baseHP: 18500 + (18500 * factorChar), baseSpeed: 0, baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10, baseExp: 610, xPos: 50, size: '24%',
		deathAnimation: { preset: 'yankSnap', durationMs: 1000 }
	},
	enem5: {
		name: 'enem5', dispName: 'Пустоглав', image: 'images/enemies/regions/3_plod_zemli/lvl27/5.webp',
		baseHP: 28000 + (28000 * factorChar), baseSpeed: 0, baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5, baseExp: 0, xPos: 50, size: '28%',
		deathAnimation: { preset: 'hollowCollapse', durationMs: 1500 }
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
	// ===== Пупырчик: TENDRIL_CREEP — усики раскручиваются, разгоняясь (accelerate) =====
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 48, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 4 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 50, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 5 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 64, yPos: 48, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 4 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 50, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 5 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 26, yPos: 40, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 7 },  //4
	{ boss: 'enem1', type: 'enem11', xPos: 74, yPos: 40, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 7 },  //5
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 26, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 10 }, //6
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 26, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 10 }, //7
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 12, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 16 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 11, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 17 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 45, yPos: 8,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 20 }, //10
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 7,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 21 }, //11
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 44, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 6 },  //12
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 46, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 5 },  //13
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 46, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 5 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 6,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 23 }, //15 нежданчик: акцент высоко

	// ===== Сочень: BURST_SPILL — томатный сок расползается вбок (drift) =====
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

	// ===== Кочерыжка: LEAF_UNFURL — синхронный рывок из середины (pause), 6-sync сигнатура =====
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 30, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 6 },  //0  Row A (2-sync): «Дедка тянет»
	{ boss: 'enem3', type: 'enem33', xPos: 32, yPos: 30, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 6 },  //1  Row A (2-sync)
	{ boss: 'enem3', type: 'enem33', xPos: 58, yPos: 32, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 5 },  //2  Row B (4-sync): «Бабка да внучка подмогают»
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 32, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 5 },  //3  Row B (4-sync)
	{ boss: 'enem3', type: 'enem33', xPos: 82, yPos: 32, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 5 },  //4  Row B (4-sync)
	{ boss: 'enem3', type: 'enem33', xPos: 94, yPos: 32, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 5 },  //5  Row B (4-sync)
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 34, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 5 },  //6  Row C (6-sync, сигнатура): «Мышка тоже пришла!»
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 34, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 5 },  //7  Row C (6-sync)
	{ boss: 'enem3', type: 'enem33', xPos: 36, yPos: 34, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 5 },  //8  Row C (6-sync)
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 34, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 5 },  //9  Row C (6-sync)
	{ boss: 'enem3', type: 'enem33', xPos: 64, yPos: 34, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 5 },  //10 Row C (6-sync)
	{ boss: 'enem3', type: 'enem33', xPos: 78, yPos: 34, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 5 },  //11 Row C (6-sync)
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 46, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 3 },  //12 solo медленный
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 12, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 16 }, //13
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 11, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 17 }, //14
	{ boss: 'enem3', type: 'enem33', xPos: 45, yPos: 8,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 20 }, //15

	// ===== Дёргач: YANK_PULL — без трюка движения, только ритм и геометрия (straight) =====
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
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 45, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 5 },  //12 редкий контраст: центр
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 13, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 17 }, //13
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 12, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 16 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 25 }, //15 нежданчик: второй центральный выпад

	// ===== Пустоглав: HOLLOW_SWAY — непредсказуемое мотание (weave), финал-микс =====
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 44, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 5 },  //0
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 38, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 7 },  //1
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 28, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 10 }, //2
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 22, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 13 }, //3
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 14, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 16 }, //4
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 9,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 20 }, //5
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 7,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 23 }, //6
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 8,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 24 }, //7 асимметрия
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 46, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 4 },  //8
	{ boss: 'enem5', type: 'enem55', xPos: 36, yPos: 34, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 9 },  //9
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 18, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 15 }, //10
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 11, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 18 }, //11
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 45, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 6 },  //12
	{ boss: 'enem5', type: 'enem55', xPos: 6,  yPos: 6,  customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 26 }, //13 самый быстрый — отголосок Дёргача
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 32, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 8 },  //14 тихая пара — отголосок рывка Кочерыжки (без паузы)
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 32, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 8 }   //15 тихая пара — отголосок рывка Кочерыжки (без паузы)
];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 330, bossDelayAbDop: 5700 }, // спокойный разгон, не вялый
	{ boss: 'enem2', bossDelayAb: 290, bossDelayAbDop: 5100 }, // сок держит ритм
	{ boss: 'enem3', bossDelayAb: 440, bossDelayAbDop: 6800 }, // самая долгая пауза — «тянут-потянут», цепочка длиннее чем на 26-м
	{ boss: 'enem4', bossDelayAb: 190, bossDelayAbDop: 4000 }, // нервность через ритм — самый частый на уровне
	{ boss: 'enem5', bossDelayAb: 255, bossDelayAbDop: 4600 }, // финал плотнее среднего, но честный
];

const bossAbilitiesDop = [
	// Пупырчик
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [4, 5] },
	{ boss: 'enem1', indexAbilities: [2, 3, 12] },
	{ boss: 'enem1', indexAbilities: [6, 7, 13] },
	{ boss: 'enem1', indexAbilities: [0, 1, 8, 9] }, // ритмическая
	{ boss: 'enem1', indexAbilities: [0, 1, 10, 11] }, // опасная сигнатурная — same-start с [0,1]
	{ boss: 'enem1', indexAbilities: [0, 1] }, // chunk-break: тот же префикс, обрывается сразу
	{ boss: 'enem1', indexAbilities: [12, 14, 15] }, // смешанная поздняя

	// Сочень
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [6, 7] },
	{ boss: 'enem2', indexAbilities: [2, 3, 14] },
	{ boss: 'enem2', indexAbilities: [12, 13, 4] },
	{ boss: 'enem2', indexAbilities: [8, 10, 9, 11] }, // ритмическая
	{ boss: 'enem2', indexAbilities: [6, 7, 8, 10] }, // опасная сигнатурная — same-start с [6,7]
	{ boss: 'enem2', indexAbilities: [6, 7] }, // chunk-break
	{ boss: 'enem2', indexAbilities: [14, 15, 2, 3] }, // смешанная поздняя

	// Кочерыжка — «тянем-потянем» (длиннее, чем на 26-м уровне: до 6-sync)
	{ boss: 'enem3', indexAbilities: [0, 1] }, // Дедка тянет (2-sync)
	{ boss: 'enem3', indexAbilities: [12] }, // solo — контраст без синхронии
	{ boss: 'enem3', indexAbilities: [2, 3, 4, 5] }, // Бабка и внучка (4-sync)
	{ boss: 'enem3', indexAbilities: [13, 14, 12] }, // смена стороны/скорости
	{ boss: 'enem3', indexAbilities: [0, 1, 13, 14] }, // ритмическая: sync → соло
	{ boss: 'enem3', indexAbilities: [6, 7, 8, 9, 10, 11] }, // Мышка тоже пришла! (6-sync, опасная сигнатурная)
	{ boss: 'enem3', indexAbilities: [2, 3, 4, 5] }, // chunk-break: тот же префикс, что и 4-sync, но без продолжения
	{ boss: 'enem3', indexAbilities: [0, 1, 6, 7, 8, 9, 10, 11] }, // смешанная поздняя: полная цепочка, редчайшая

	// Дёргач
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [4, 5] },
	{ boss: 'enem4', indexAbilities: [2, 3, 10] },
	{ boss: 'enem4', indexAbilities: [6, 7, 11] },
	{ boss: 'enem4', indexAbilities: [8, 10, 9, 11] }, // ритмическая
	{ boss: 'enem4', indexAbilities: [0, 1, 8, 9] }, // опасная сигнатурная — same-start с [0,1]
	{ boss: 'enem4', indexAbilities: [0, 1] }, // chunk-break
	{ boss: 'enem4', indexAbilities: [12, 13, 14, 15] }, // смешанная поздняя

	// Пустоглав
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [8, 12] },
	{ boss: 'enem5', indexAbilities: [2, 3, 4] },
	{ boss: 'enem5', indexAbilities: [9, 10, 11] },
	{ boss: 'enem5', indexAbilities: [14, 15, 6] }, // ритмическая — тихий отголосок Кочерыжки
	{ boss: 'enem5', indexAbilities: [0, 1, 5, 6, 7] }, // опасная сигнатурная — same-start с [0,1]
	{ boss: 'enem5', indexAbilities: [0, 1, 5] }, // chunk-break
	{ boss: 'enem5', indexAbilities: [8, 9, 13, 14, 15] }, // смешанная поздняя
];
