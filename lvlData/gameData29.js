let lvlNumber = 29;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 29 — «Господский сад» (см. lvlData/areas.js/LEVEL_WORKING_TITLES и
// description/идеи по уровням.txt), Область III «Плодородные земли», предпоследний
// уровень региона перед финалом на 30-м. Картинки — садовые фрукты (груша/слива/
// вишнёвая гроздь/айва/чудовищная многоротая яблоня-финал), не огурец/квас/пирог/
// каша/стол из старого плана — тот план окончательно устарел для 27-29.
//
// РЕГИОНАЛЬНАЯ МЕХАНИКА «синхронный рывок» здесь достигает кульминации региона —
// несёт сам финальный босс enem5 Червоточец (ротация носителя: enem1→26, enem3→27,
// enem4→28, enem5→29). Цепочка нарастала 5→6→7 синхронных ударов на предыдущих
// уровнях; здесь she растёт до 8 — самая длинная и самая честная (телеграф не
// укорачивается) синхронная связка региона, достойная роли финала перед 30-м.
//
// Пять архетипов (movementStyle подобраны так, чтобы не повторять то, чем та же
// роль была на 28-м уровне, сверено с admin-boss-pattern-panel.html):
// enem1 Грушак     — drift. Груша мягко скатывается вбок, тяжёлый неторопливый бок.
// enem2 Синячок     — weave. Слива с побитым боком уходит рваными зигзагами.
// enem3 Троячок    — straight. Вишнёвая гроздь бьёт тройными очередями без трюка.
// enem4 Кисляк     — lateRush. Айва терпит-терпит и вдруг кисло срывается на рывок.
// enem5 Червоточец — pause, несёт синхронный рывок (8-sync, кульминация региона),
//                  финал смешивает почерк четырёх плодов на свой гротескный лад.
const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 0.86, damageMultiplier: 1.88, minWaveDelay: 2050, minShotDelay: 142, minTelegraphMs: 535,
	phases: [
		{ phase: 1, minHp: 0.65, cadence: 1.00, speed: 1.00, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.15, maxActiveAttacks: 14 },
		{ phase: 2, minHp: 0.30, cadence: 0.84, speed: 1.11, damage: 1.15, telegraphMultiplier: 0.92, surpriseChance: 0.25, maxActiveAttacks: 18 },
		{ phase: 3, minHp: 0.00, cadence: 0.70, speed: 1.22, damage: 1.29, telegraphMultiplier: 0.84, surpriseChance: 0.37, maxActiveAttacks: 22 }
	],
	bosses: {
		enem1: { movementStyle: 'drift',      cadence: 1.15, telegraphMs: 980,  speedMultiplier: 0.87, damageMultiplier: 1.18, speedVariance: [0.79, 0.88, 0.98, 1.08, 1.18] }, // Грушак: мягкий тяжёлый бок
		enem2: { movementStyle: 'weave',      cadence: 1.00, telegraphMs: 820,  speedMultiplier: 0.99, damageMultiplier: 1.00, speedVariance: [0.85, 0.93, 1.02, 1.11, 1.20] }, // Синячок: рваные зигзаги
		enem3: { movementStyle: 'straight',   cadence: 0.90, telegraphMs: 745,  speedMultiplier: 1.05, damageMultiplier: 0.94, speedVariance: [0.88, 0.97, 1.06, 1.15, 1.24] }, // Троячок: тройные очереди
		enem4: { movementStyle: 'lateRush',   cadence: 1.02, telegraphMs: 795,  speedMultiplier: 0.95, damageMultiplier: 0.92, speedVariance: [0.86, 0.95, 1.03, 1.11, 1.19] }, // Кисляк: терпит и срывается
		enem5: { movementStyle: 'pause',      cadence: 0.86, telegraphMs: 690,  speedMultiplier: 1.12, damageMultiplier: 0.82, speedVariance: [0.84, 0.97, 1.10, 1.23, 1.36], minFastSideSwitchMs: 800 } // Червоточец: несёт синхронный рывок (8-sync, кульминация)
	}
};

const ENEMY_TYPES = {

	enem11: { image: 'images/enemies/regions/3_plod_zemli/lvl29/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { image: 'images/enemies/regions/3_plod_zemli/lvl29/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { image: 'images/enemies/regions/3_plod_zemli/lvl29/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { image: 'images/enemies/regions/3_plod_zemli/lvl29/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { image: 'images/enemies/regions/3_plod_zemli/lvl29/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
		name: 'enem1', dispName: 'Грушак', image: 'images/enemies/regions/3_plod_zemli/lvl29/1.webp',
		baseHP: 2600 + (2600 * factorChar), baseSpeed: 0, baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5, baseExp: 230, xPos: 50, size: '23%',
		deathAnimation: { preset: 'juiceSquash', durationMs: 1150 }
	},
	enem2: {
		name: 'enem2', dispName: 'Синячок', image: 'images/enemies/regions/3_plod_zemli/lvl29/2.webp',
		baseHP: 6500 + (6500 * factorChar), baseSpeed: 0, baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15, baseExp: 360, xPos: 50, size: '22%',
		deathAnimation: { preset: 'bruiseSplat', durationMs: 1100 }
	},
	enem3: {
		name: 'enem3', dispName: 'Троячок', image: 'images/enemies/regions/3_plod_zemli/lvl29/3.webp',
		baseHP: 11500 + (11500 * factorChar), baseSpeed: 0, baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20, baseExp: 480, xPos: 50, size: '25%',
		deathAnimation: { preset: 'clusterScatter', durationMs: 1350 }
	},
	enem4: {
		name: 'enem4', dispName: 'Кисляк', image: 'images/enemies/regions/3_plod_zemli/lvl29/4.webp',
		baseHP: 18500 + (18500 * factorChar), baseSpeed: 0, baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10, baseExp: 620, xPos: 50, size: '25%',
		deathAnimation: { preset: 'sourPucker', durationMs: 1050 }
	},
	enem5: {
		name: 'enem5', dispName: 'Червоточец', image: 'images/enemies/regions/3_plod_zemli/lvl29/5.webp',
		baseHP: 28000 + (28000 * factorChar), baseSpeed: 0, baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5, baseExp: 0, xPos: 50, size: '30%',
		deathAnimation: { preset: 'wormrotCollapse', durationMs: 1600 }
	}
};

const attackDamage = {
	enem1: { light: Math.round(ENEMY_TYPES.enem1.baseDamage * 0.30), medium: Math.round(ENEMY_TYPES.enem1.baseDamage * 0.42), heavy: Math.round(ENEMY_TYPES.enem1.baseDamage * 0.56) },
	enem2: { light: Math.round(ENEMY_TYPES.enem2.baseDamage * 0.26), medium: Math.round(ENEMY_TYPES.enem2.baseDamage * 0.38), heavy: Math.round(ENEMY_TYPES.enem2.baseDamage * 0.50) },
	enem3: { light: Math.round(ENEMY_TYPES.enem3.baseDamage * 0.22), medium: Math.round(ENEMY_TYPES.enem3.baseDamage * 0.32), heavy: Math.round(ENEMY_TYPES.enem3.baseDamage * 0.44) },
	enem4: { light: Math.round(ENEMY_TYPES.enem4.baseDamage * 0.28), medium: Math.round(ENEMY_TYPES.enem4.baseDamage * 0.40), heavy: Math.round(ENEMY_TYPES.enem4.baseDamage * 0.54) },
	enem5: { light: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.24), medium: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.34), heavy: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.58) }
};

let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
let timeNextBoss = 5;
const bossInterval = 5;

const bossAbilities = [
	// ===== Грушак: мягкий тяжёлый бок, скатывается вбок (drift) =====
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 46, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 3 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 38, yPos: 48, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 4 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 62, yPos: 46, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 3 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 48, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 4 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 32, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 6 },  //4
	{ boss: 'enem1', type: 'enem11', xPos: 76, yPos: 32, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 6 },  //5
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 18, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 11 }, //6
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 18, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 11 }, //7
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 9,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 17 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 8,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 18 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 46, yPos: 7,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 21 }, //10
	{ boss: 'enem1', type: 'enem11', xPos: 54, yPos: 6,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 22 }, //11
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 24, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 8 },  //12
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 24, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 8 },  //13
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 46, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 4 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 8,  customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 23 }, //15 нежданчик

	// ===== Синячок: побитый бок, рваные зигзаги (weave) =====
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 22, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 9 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 22, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 9 },  //1
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 12, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 14 }, //2
	{ boss: 'enem2', type: 'enem22', xPos: 76, yPos: 12, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 14 }, //3
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 44, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 5 },  //4
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 45, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 5 },  //5
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 6,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 20 }, //6
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 21 }, //7
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 32, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 7 },  //8
	{ boss: 'enem2', type: 'enem22', xPos: 82, yPos: 32, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 7 },  //9
	{ boss: 'enem2', type: 'enem22', xPos: 45, yPos: 16, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 13 }, //10
	{ boss: 'enem2', type: 'enem22', xPos: 55, yPos: 15, customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 13 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 47, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 4 },  //12
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 9,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 22 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 8,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 23 }, //14
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 6,  customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 24 }, //15 нежданчик — третий центр-верх подряд по региону

	// ===== Троячок: вишнёвая гроздь, тройные очереди без трюка (straight) =====
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 18 }, //0  Row A (тройка)
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 9,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 18 }, //1  Row A (тройка)
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 10, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 18 }, //2  Row A (тройка)
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 22, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, //3  Row B (тройка ниже)
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 21, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, //4  Row B
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 22, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 12 }, //5  Row B
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 46, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 5 },  //6
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 46, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 5 },  //7
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 34, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 9 },  //8
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 34, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 9 },  //9
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 7,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 24 }, //10
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 7,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 24 }, //11
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 30, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 8 },  //12
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 30, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 8 },  //13
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 44, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 6 },  //14
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 8,  customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 25 }, //15 нежданчик четвёртая в очереди

	// ===== Кисляк: терпит-терпит и срывается на рывок (lateRush) =====
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 40, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 5 },  //0
	{ boss: 'enem4', type: 'enem44', xPos: 84, yPos: 40, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 5 },  //1
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 26, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 8 },  //2
	{ boss: 'enem4', type: 'enem44', xPos: 78, yPos: 26, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 8 },  //3
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 15, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 13 }, //4
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 15, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 13 }, //5
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 7,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 22 }, //6
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 7,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 23 }, //7
	{ boss: 'enem4', type: 'enem44', xPos: 46, yPos: 18, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 12 }, //8
	{ boss: 'enem4', type: 'enem44', xPos: 54, yPos: 17, customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 12 }, //9
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 46, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 4 },  //10
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 47, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 4 },  //11
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 8,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 24 }, //12
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 32, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 7 },  //13
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 32, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 7 },  //14
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 26 }, //15 нежданчик — самый резкий срыв на уровне

	// ===== Червоточец: 8-sync «Тянут-потянут — и выдернули!» — кульминация региона (pause) =====
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 30, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 6 },  //0  Row A (2-sync): «Дедка тянет»
	{ boss: 'enem5', type: 'enem55', xPos: 26, yPos: 30, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 6 },  //1  Row A (2-sync)
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 30, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 6 },  //2  Row B (4-sync промежуточная)
	{ boss: 'enem5', type: 'enem55', xPos: 54, yPos: 30, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 6 },  //3  Row B (4-sync)
	{ boss: 'enem5', type: 'enem55', xPos: 6,  yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 5 },  //4  Row C (8-sync, сигнатура): «Вытянули репку!»
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 5 },  //5  Row C (8-sync)
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 5 },  //6  Row C (8-sync)
	{ boss: 'enem5', type: 'enem55', xPos: 42, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 5 },  //7  Row C (8-sync)
	{ boss: 'enem5', type: 'enem55', xPos: 54, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 5 },  //8  Row C (8-sync)
	{ boss: 'enem5', type: 'enem55', xPos: 66, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 5 },  //9  Row C (8-sync)
	{ boss: 'enem5', type: 'enem55', xPos: 78, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 5 },  //10 Row C (8-sync)
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 36, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 5 },  //11 Row C (8-sync)
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 47, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 3 },  //12 solo медленный — контраст без синхронии
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 12, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 15 }, //13
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 11, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 16 }, //14
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 8,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 19 }  //15
];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 340, bossDelayAbDop: 5800 }, // мягкий тяжёлый бок
	{ boss: 'enem2', bossDelayAb: 260, bossDelayAbDop: 4700 }, // рваные зигзаги
	{ boss: 'enem3', bossDelayAb: 230, bossDelayAbDop: 4200 }, // тройные очереди, самая частая на уровне
	{ boss: 'enem4', bossDelayAb: 300, bossDelayAbDop: 5300 }, // терпит-терпит
	{ boss: 'enem5', bossDelayAb: 480, bossDelayAbDop: 7500 }, // кульминация региона — самая долгая пауза во всей области III
];

const bossAbilitiesDop = [
	// Грушак
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [6, 7] },
	{ boss: 'enem1', indexAbilities: [2, 3, 12] },
	{ boss: 'enem1', indexAbilities: [4, 5, 13] },
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3] }, // ритмическая
	{ boss: 'enem1', indexAbilities: [0, 1, 10, 11] }, // опасная сигнатурная — same-start с [0,1]
	{ boss: 'enem1', indexAbilities: [0, 1] }, // chunk-break
	{ boss: 'enem1', indexAbilities: [12, 13, 14, 15] }, // смешанная поздняя

	// Синячок
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [2, 3] },
	{ boss: 'enem2', indexAbilities: [4, 5, 12] },
	{ boss: 'enem2', indexAbilities: [8, 9, 10, 11] },
	{ boss: 'enem2', indexAbilities: [0, 1, 8, 9] }, // ритмическая
	{ boss: 'enem2', indexAbilities: [0, 1, 6, 7] }, // опасная сигнатурная — same-start с [0,1]
	{ boss: 'enem2', indexAbilities: [0, 1] }, // chunk-break
	{ boss: 'enem2', indexAbilities: [13, 14, 15, 12] }, // смешанная поздняя

	// Троячок
	{ boss: 'enem3', indexAbilities: [0, 1, 2] }, // тройка A
	{ boss: 'enem3', indexAbilities: [3, 4, 5] }, // тройка B
	{ boss: 'enem3', indexAbilities: [6, 7] },
	{ boss: 'enem3', indexAbilities: [8, 9, 12, 13] },
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5] }, // ритмическая: обе тройки подряд
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 10, 11] }, // опасная сигнатурная — same-start с тройкой A
	{ boss: 'enem3', indexAbilities: [0, 1, 2] }, // chunk-break
	{ boss: 'enem3', indexAbilities: [14, 15, 10, 11] }, // смешанная поздняя

	// Кисляк
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [2, 3] },
	{ boss: 'enem4', indexAbilities: [4, 5, 8, 9] },
	{ boss: 'enem4', indexAbilities: [10, 11, 13, 14] },
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3] }, // ритмическая
	{ boss: 'enem4', indexAbilities: [0, 1, 6, 7] }, // опасная сигнатурная — same-start с [0,1]
	{ boss: 'enem4', indexAbilities: [0, 1] }, // chunk-break
	{ boss: 'enem4', indexAbilities: [12, 13, 14, 15] }, // смешанная поздняя, самый резкий срыв

	// Червоточец — «Тянут-потянут — и выдернули!» (нарастает 2→4→8, кульминация региона)
	{ boss: 'enem5', indexAbilities: [0, 1] }, // Дедка тянет (2-sync)
	{ boss: 'enem5', indexAbilities: [12] }, // solo — контраст без синхронии
	{ boss: 'enem5', indexAbilities: [13, 14, 15] },
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3] }, // Бабка на помощь (4-sync, промежуточная)
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 12] }, // ритмическая: 4-sync → соло-передышка
	{ boss: 'enem5', indexAbilities: [4, 5, 6, 7, 8, 9, 10, 11] }, // Вытянули репку! (8-sync, опасная сигнатурная, кульминация всей области III)
	{ boss: 'enem5', indexAbilities: [4, 5, 6] }, // chunk-break: обрывается на трети сигнатурной
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }, // смешанная поздняя: полная 4→8 цепочка целиком, редчайшая во всей области
];

// Лорные названия связок. Уровень 29 — сад: Грушак (груша), Синячок (слива), Троячок
// (тройная вишня), Кисляк (кислица/дичок), Червоточец (червивый плод, кульминация).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Грушевый удар', variant2: 'Черешок груши', variant3: 'Грушевая сила',
        variant4: 'Мягкая кожица', variant5: 'Тяжёлый бок', variant6: 'Грушевый сок',
        variant7: 'Грушевая мощь', variant8: 'Мякоть груши', variant9: 'Мягкий тяжёлый навал',
        variant10: 'Живучий Грушак', variant11: 'Цепкий черешок', variant12: 'Навал и в траву',
        variant13: 'Толстая мякоть', variant14: 'Неутомимый Грушак', variant15: 'Мякоть груши пружинит',
        variant16: 'Меткий бок', variant17: 'Грушевая хватка', variant18: 'Сонный взгляд груши',
        variant19: 'Тяжёлый бок вмиг', variant20: 'Грушевый дух', variant21: 'Стойкая кожица',
        variant22: 'Юркий Грушак', variant23: 'Грушевая стойкость', variant24: 'Чуткий черешок',
        variant25: 'Ускользающий бок', variant26: 'Дикий навал', variant27: 'Мощь сока',
        variant28: 'Мягкий навал внезапно', variant29: 'Каменная мякоть', variant30: 'Разросшийся бок',
        variant31: 'Грушевый рывок', variant32: 'Живучая мякоть', variant33: 'Неутомимый навал',
        variant34: 'Грушевая прыть', variant35: 'Грушевая выносливость'
    },
    enem2: {
        variant1: 'Синячковый удар', variant2: 'Косточка сливы', variant3: 'Синячковая сила',
        variant4: 'Восковой налёт', variant5: 'Рваный зигзаг', variant6: 'Сливовый сок',
        variant7: 'Синячковая мощь', variant8: 'Мякоть сливы', variant9: 'Рваный зигзаг разгона',
        variant10: 'Живучий Синячок', variant11: 'Цепкая косточка', variant12: 'Зигзаг и в траву',
        variant13: 'Толстая мякоть', variant14: 'Неутомимый Синячок', variant15: 'Веточка сливы',
        variant16: 'Меткая косточка', variant17: 'Синячковая хватка', variant18: 'Взгляд с синевой',
        variant19: 'Рваный зигзаг вмиг', variant20: 'Сливовый дух', variant21: 'Стойкий налёт',
        variant22: 'Юркий Синячок', variant23: 'Синячковая стойкость', variant24: 'Чуткая косточка',
        variant25: 'Ускользающий зигзаг', variant26: 'Дикий рваный зигзаг', variant27: 'Мощь сока',
        variant28: 'Рваный зигзаг внезапно', variant29: 'Каменная мякоть', variant30: 'Разросшийся синяк',
        variant31: 'Синячковый рывок', variant32: 'Живучий налёт', variant33: 'Неутомимый зигзаг',
        variant34: 'Синячковая прыть', variant35: 'Синячковая выносливость'
    },
    enem3: {
        variant1: 'Тройной удар вишни', variant2: 'Тройная косточка', variant3: 'Троячковая сила',
        variant4: 'Тонкая кожица', variant5: 'Тройная очередь', variant6: 'Вишнёвый сок',
        variant7: 'Троячковая мощь', variant8: 'Тройная мякоть', variant9: 'Тройная очередь подряд',
        variant10: 'Живучий Троячок', variant11: 'Тройной черешок', variant12: 'Очередь и в траву',
        variant13: 'Мякоть вишни', variant14: 'Неутомимый Троячок', variant15: 'Тройная веточка',
        variant16: 'Косточка вишни', variant17: 'Троячковая хватка', variant18: 'Тройной взгляд',
        variant19: 'Тройная очередь вмиг', variant20: 'Вишнёвый дух', variant21: 'Тройная кожица',
        variant22: 'Юркий Троячок', variant23: 'Троячковая стойкость', variant24: 'Тройная чуткость',
        variant25: 'Тройная очередь ускользает', variant26: 'Дикая тройная очередь', variant27: 'Мощь сока',
        variant28: 'Тройная очередь внезапно', variant29: 'Тройная кожица-камень', variant30: 'Разросшаяся тройка',
        variant31: 'Троячковый рывок', variant32: 'Тройная мякоть живуча', variant33: 'Неутомимая тройная очередь',
        variant34: 'Троячковая прыть', variant35: 'Троячковая выносливость'
    },
    enem4: {
        variant1: 'Кислый удар', variant2: 'Терпкий шип', variant3: 'Кислая сила',
        variant4: 'Терпкая кожица', variant5: 'Срыв после терпения', variant6: 'Едкая кислота',
        variant7: 'Кислая мощь', variant8: 'Терпкая кожица плотная', variant9: 'Терпит и срывается',
        variant10: 'Живучий Кисляк', variant11: 'Цепкий терпкий шип', variant12: 'Срыв и в траву',
        variant13: 'Толстая кожица', variant14: 'Неутомимый Кисляк', variant15: 'Терпкая веточка',
        variant16: 'Меткий шип', variant17: 'Кислая хватка', variant18: 'Терпеливый кислый взгляд',
        variant19: 'Срыв вмиг', variant20: 'Кислый дух', variant21: 'Кожица терпит',
        variant22: 'Юркий Кисляк', variant23: 'Кислая стойкость', variant24: 'Чуткий терпкий шип',
        variant25: 'Ускользающий срыв', variant26: 'Дикий срыв', variant27: 'Мощь кислоты',
        variant28: 'Срыв после терпения вмиг', variant29: 'Каменная кожица', variant30: 'Разросшаяся терпкость',
        variant31: 'Кислый рывок', variant32: 'Живучая кожица', variant33: 'Терпение-срыв вновь',
        variant34: 'Кислая прыть', variant35: 'Кислая выносливость'
    },
    enem5: {
        variant1: 'Червивый удар', variant2: 'Ход червя', variant3: 'Червоточная сила',
        variant4: 'Ходовая кожица', variant5: 'Синхронный рывок кульминации', variant6: 'Едкая гниль',
        variant7: 'Червоточная мощь', variant8: 'Прогрызенная кожица', variant9: 'Кульминационный синхронный рывок',
        variant10: 'Живучий Червоточец', variant11: 'Цепкий ход', variant12: 'Рывок и вглубь плода',
        variant13: 'Прогрызенная мякоть', variant14: 'Неутомимый Червоточец', variant15: 'Ход червя пружинит',
        variant16: 'Меткий прогрыз', variant17: 'Червоточная хватка', variant18: 'Взгляд из глубины плода',
        variant19: 'Кульминационный рывок вмиг', variant20: 'Гнилостный дух', variant21: 'Кожица стойка к порче',
        variant22: 'Юркий Червоточец', variant23: 'Червоточная стойкость', variant24: 'Чуткий ход',
        variant25: 'Ускользающий ход червя', variant26: 'Дикая порча', variant27: 'Мощь гнили',
        variant28: 'Кульминационный рывок внезапно', variant29: 'Прогрызенная кожица-камень', variant30: 'Разросшаяся порча',
        variant31: 'Червоточный рывок', variant32: 'Прогрызенная мякоть живуча', variant33: 'Кульминационный рывок вновь',
        variant34: 'Червоточная прыть', variant35: 'Червоточная выносливость'
    }
};
