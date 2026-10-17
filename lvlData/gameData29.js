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
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.859, damageMultiplier: 1.88, minWaveDelay: 2050, minShotDelay: 128, minTelegraphMs: 537,
	phases: [
		{ phase: 1, minHp: 0.644, cadence: 1.013, speed: 0.989, damage: 1, telegraphMultiplier: 0.987, surpriseChance: 0.152, maxActiveAttacks: 16 },
		{ phase: 2, minHp: 0.294, cadence: 0.842, speed: 1.11, damage: 1.15, telegraphMultiplier: 0.92, surpriseChance: 0.25, maxActiveAttacks: 18 },
		{ phase: 3, minHp: 0, cadence: 0.699, speed: 1.22, damage: 1.29, telegraphMultiplier: 0.797, surpriseChance: 0.369, maxActiveAttacks: 23 }
	],
	bosses: {
		enem1: { combatIdentity: "Груша роняет плод", combatTrick: "удары справа и слева сменяют друг друга быстрыми заходами, а у края висит медленный плод", signatureEvery: 4, movementStyle: 'drift', cadence: 1.151, telegraphMs: 980, speedMultiplier: 0.999, damageMultiplier: 1.18, speedVariance: [1.03, 1.055, 1.08, 1.105, 1.13] },
		enem2: { combatIdentity: "Синяк расползается", combatTrick: "быстрые удары центра и левого края перемежаются, а в завершении два удара подряд приходят в одно место", signatureEvery: 4, movementStyle: 'weave', cadence: 0.998, telegraphMs: 821, speedMultiplier: 1.198, damageMultiplier: 1, speedVariance: [1, 1.03, 1.06, 1.09, 1.12] },
		enem3: { combatIdentity: "Тройная завязь", combatTrick: "центр, левый край и снова центр складываются в тройку, а справа остаётся висеть медленный плод", signatureEvery: 4, movementStyle: 'straight', cadence: 0.899, telegraphMs: 745, speedMultiplier: 1.2, damageMultiplier: 0.94, speedVariance: [1.05, 1.065, 1.08, 1.095, 1.11] },
		enem4: { combatIdentity: "Кислота подкатывает", combatTrick: "быстрый заход левого края, затем центр и снова левый край, пока справа висит медленный плод", signatureEvery: 4, movementStyle: 'lateRush', cadence: 1.02, telegraphMs: 795, speedMultiplier: 1.203, damageMultiplier: 0.92, speedVariance: [0.97, 1, 1.03, 1.06, 1.09] },
		enem5: { combatIdentity: "Червь выедает середину", combatTrick: "центр бьёт дважды подряд с быстрым левым ударом между ними, а медленный плод справа не даёт отвлечься", signatureEvery: 4, movementStyle: 'pause', cadence: 0.859, telegraphMs: 691, speedMultiplier: 1.251, damageMultiplier: 0.82, speedVariance: [1.02, 1.045, 1.07, 1.095, 1.12] }
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
let timeNextBoss = 9;
const bossInterval = 6;

const bossAbilities = [
	// ===== Грушак =====
	{ boss: 'enem1', type: 'enem11', xPos: 93, yPos: 42, customHP: 1, customDamage: 27, customSpeed: 5 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 75, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 12 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 11 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 77, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 13 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 4, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 12 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 94, yPos: 42, customHP: 1, customDamage: 27, customSpeed: 5 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 81, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 12 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 11 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 83, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 13 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 42, customHP: 1, customDamage: 27, customSpeed: 5 }, // 9 c
	{ boss: 'enem1', type: 'enem11', xPos: 87, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 12 }, // 10 c
	{ boss: 'enem1', type: 'enem11', xPos: 13, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 11 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 75, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 13 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 19, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 12 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 95, yPos: 42, customHP: 1, customDamage: 27, customSpeed: 5 }, // 14 d
	{ boss: 'enem1', type: 'enem11', xPos: 79, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 12 }, // 15 d
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 11 }, // 16 d
	{ boss: 'enem1', type: 'enem11', xPos: 81, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 13 }, // 17 d
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 42, customHP: 1, customDamage: 27, customSpeed: 5 }, // 18 e
	{ boss: 'enem1', type: 'enem11', xPos: 85, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 12 }, // 19 e
	{ boss: 'enem1', type: 'enem11', xPos: 5, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 11 }, // 20 e
	{ boss: 'enem1', type: 'enem11', xPos: 87, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 13 }, // 21 e
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 12 }, // 22 e
	{ boss: 'enem1', type: 'enem11', xPos: 96, yPos: 42, customHP: 1, customDamage: 27, customSpeed: 5 }, // 23 f
	{ boss: 'enem1', type: 'enem11', xPos: 77, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 12 }, // 24 f
	{ boss: 'enem1', type: 'enem11', xPos: 4, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 11 }, // 25 f
	{ boss: 'enem1', type: 'enem11', xPos: 79, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 13 }, // 26 f
	{ boss: 'enem1', type: 'enem11', xPos: 21, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 12 }, // 27 f
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 42, customHP: 1, customDamage: 27, customSpeed: 5 }, // 28 g
	{ boss: 'enem1', type: 'enem11', xPos: 83, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 12 }, // 29 g
	{ boss: 'enem1', type: 'enem11', xPos: 17, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 11 }, // 30 g
	{ boss: 'enem1', type: 'enem11', xPos: 85, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 13 }, // 31 g
	{ boss: 'enem1', type: 'enem11', xPos: 89, yPos: 42, customHP: 1, customDamage: 27, customSpeed: 5 }, // 32 h
	{ boss: 'enem1', type: 'enem11', xPos: 75, yPos: 6, customHP: 1, customDamage: 23, customSpeed: 12 }, // 33 h
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 11 }, // 34 h
	{ boss: 'enem1', type: 'enem11', xPos: 77, yPos: 6, customHP: 1, customDamage: 23, customSpeed: 13 }, // 35 h
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 12 }, // 36 h

	// ===== Синячок =====
	{ boss: 'enem2', type: 'enem22', xPos: 95, yPos: 35, customHP: 1, customDamage: 27, customSpeed: 5 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 12 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 63, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 16 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 13 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 12 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 96, yPos: 35, customHP: 1, customDamage: 27, customSpeed: 5 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 12 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 62, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 16 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 7, customHP: 1, customDamage: 19, customSpeed: 17 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 94, yPos: 35, customHP: 1, customDamage: 27, customSpeed: 5 }, // 9 c
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 13 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 8, customHP: 1, customDamage: 19, customSpeed: 17 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 6, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 12 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 13 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 93, yPos: 35, customHP: 1, customDamage: 27, customSpeed: 5 }, // 14 d
	{ boss: 'enem2', type: 'enem22', xPos: 17, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 12 }, // 15 d
	{ boss: 'enem2', type: 'enem22', xPos: 61, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 16 }, // 16 d
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 13 }, // 17 d
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 9, customHP: 1, customDamage: 19, customSpeed: 17 }, // 18 d
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 17 }, // 19 d
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 35, customHP: 1, customDamage: 27, customSpeed: 5 }, // 20 e
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 16 }, // 21 e
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 6, customHP: 1, customDamage: 19, customSpeed: 17 }, // 22 e
	{ boss: 'enem2', type: 'enem22', xPos: 5, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 12 }, // 23 e
	{ boss: 'enem2', type: 'enem22', xPos: 91, yPos: 35, customHP: 1, customDamage: 27, customSpeed: 5 }, // 24 f
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 13 }, // 25 f
	{ boss: 'enem2', type: 'enem22', xPos: 59, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 16 }, // 26 f
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 12 }, // 27 f
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 13 }, // 28 f
	{ boss: 'enem2', type: 'enem22', xPos: 89, yPos: 35, customHP: 1, customDamage: 27, customSpeed: 5 }, // 29 g
	{ boss: 'enem2', type: 'enem22', xPos: 17, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 13 }, // 30 g
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 7, customHP: 1, customDamage: 19, customSpeed: 17 }, // 31 g
	{ boss: 'enem2', type: 'enem22', xPos: 58, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 16 }, // 32 g
	{ boss: 'enem2', type: 'enem22', xPos: 87, yPos: 35, customHP: 1, customDamage: 27, customSpeed: 5 }, // 33 h
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 11 }, // 34 h
	{ boss: 'enem2', type: 'enem22', xPos: 59, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 15 }, // 35 h
	{ boss: 'enem2', type: 'enem22', xPos: 4, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 12 }, // 36 h
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: 19, customSpeed: 11 }, // 37 h

	// ===== Троячок =====
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 35, customHP: 1, customDamage: 26, customSpeed: 5 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: 16, customSpeed: 11 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 13, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 6, customHP: 1, customDamage: 16, customSpeed: 17 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 19, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 35, customHP: 1, customDamage: 26, customSpeed: 5 }, // 5 b
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 8, customHP: 1, customDamage: 16, customSpeed: 17 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: 16, customSpeed: 11 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 35, customHP: 1, customDamage: 26, customSpeed: 5 }, // 9 c
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 17 }, // 10 c
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11 }, // 11 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: 16, customSpeed: 11 }, // 12 c
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12 }, // 13 c
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 6, customHP: 1, customDamage: 16, customSpeed: 17 }, // 14 c
	{ boss: 'enem3', type: 'enem33', xPos: 87, yPos: 35, customHP: 1, customDamage: 26, customSpeed: 5 }, // 15 d
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11 }, // 16 d
	{ boss: 'enem3', type: 'enem33', xPos: 16, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11 }, // 17 d
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 7, customHP: 1, customDamage: 16, customSpeed: 17 }, // 18 d
	{ boss: 'enem3', type: 'enem33', xPos: 21, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12 }, // 19 d
	{ boss: 'enem3', type: 'enem33', xPos: 83, yPos: 35, customHP: 1, customDamage: 26, customSpeed: 5 }, // 20 e
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 8, customHP: 1, customDamage: 16, customSpeed: 17 }, // 21 e
	{ boss: 'enem3', type: 'enem33', xPos: 17, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11 }, // 22 e
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 6, customHP: 1, customDamage: 16, customSpeed: 11 }, // 23 e
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 12 }, // 24 e
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 35, customHP: 1, customDamage: 26, customSpeed: 5 }, // 25 f
	{ boss: 'enem3', type: 'enem33', xPos: 68, yPos: 6, customHP: 1, customDamage: 16, customSpeed: 17 }, // 26 f
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11 }, // 27 f
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 7, customHP: 1, customDamage: 16, customSpeed: 11 }, // 28 f
	{ boss: 'enem3', type: 'enem33', xPos: 82, yPos: 35, customHP: 1, customDamage: 26, customSpeed: 5 }, // 29 g
	{ boss: 'enem3', type: 'enem33', xPos: 68, yPos: 6, customHP: 1, customDamage: 16, customSpeed: 12 }, // 30 g
	{ boss: 'enem3', type: 'enem33', xPos: 19, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11 }, // 31 g
	{ boss: 'enem3', type: 'enem33', xPos: 67, yPos: 6, customHP: 1, customDamage: 16, customSpeed: 17 }, // 32 g
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 8, customHP: 1, customDamage: 16, customSpeed: 11 }, // 33 g
	{ boss: 'enem3', type: 'enem33', xPos: 89, yPos: 35, customHP: 1, customDamage: 26, customSpeed: 5 }, // 34 h
	{ boss: 'enem3', type: 'enem33', xPos: 66, yPos: 6, customHP: 1, customDamage: 16, customSpeed: 17 }, // 35 h
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 5, customHP: 1, customDamage: 16, customSpeed: 11 }, // 36 h
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 9, customHP: 1, customDamage: 16, customSpeed: 11 }, // 37 h

	// ===== Кисляк =====
	{ boss: 'enem4', type: 'enem44', xPos: 89, yPos: 30, customHP: 1, customDamage: 34, customSpeed: 5 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 14 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 7, customHP: 1, customDamage: 23, customSpeed: 14 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 15 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 68, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 15 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 30, customHP: 1, customDamage: 34, customSpeed: 5 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 14 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: 23, customSpeed: 18 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 15 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 91, yPos: 30, customHP: 1, customDamage: 34, customSpeed: 5 }, // 9 c
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 14 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 68, yPos: 7, customHP: 1, customDamage: 23, customSpeed: 14 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 15 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 87, yPos: 30, customHP: 1, customDamage: 34, customSpeed: 5 }, // 13 d
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 6, customHP: 1, customDamage: 23, customSpeed: 13 }, // 14 d
	{ boss: 'enem4', type: 'enem44', xPos: 67, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 15 }, // 15 d
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 14 }, // 16 d
	{ boss: 'enem4', type: 'enem44', xPos: 67, yPos: 7, customHP: 1, customDamage: 23, customSpeed: 14 }, // 17 d
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 6, customHP: 1, customDamage: 23, customSpeed: 15 }, // 18 d
	{ boss: 'enem4', type: 'enem44', xPos: 5, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 14 }, // 19 e
	{ boss: 'enem4', type: 'enem44', xPos: 66, yPos: 7, customHP: 1, customDamage: 23, customSpeed: 14 }, // 20 e
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 15 }, // 21 e
	{ boss: 'enem4', type: 'enem44', xPos: 66, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 15 }, // 22 e
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 30, customHP: 1, customDamage: 34, customSpeed: 5 }, // 23 f
	{ boss: 'enem4', type: 'enem44', xPos: 4, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 14 }, // 24 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: 23, customSpeed: 18 }, // 25 f
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 15 }, // 26 f
	{ boss: 'enem4', type: 'enem44', xPos: 93, yPos: 30, customHP: 1, customDamage: 34, customSpeed: 5 }, // 27 g
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 14 }, // 28 g
	{ boss: 'enem4', type: 'enem44', xPos: 65, yPos: 7, customHP: 1, customDamage: 23, customSpeed: 14 }, // 29 g
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 15 }, // 30 g
	{ boss: 'enem4', type: 'enem44', xPos: 65, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 15 }, // 31 g
	{ boss: 'enem4', type: 'enem44', xPos: 85, yPos: 30, customHP: 1, customDamage: 34, customSpeed: 5 }, // 32 h
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 16 }, // 33 h
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 9, customHP: 1, customDamage: 23, customSpeed: 16 }, // 34 h
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: 23, customSpeed: 15 }, // 35 h

	// ===== Червоточец =====
	{ boss: 'enem5', type: 'enem55', xPos: 91, yPos: 32, customHP: 1, customDamage: 40, customSpeed: 5 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: 29, customSpeed: 11 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 4, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 11 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 6, customHP: 1, customDamage: 29, customSpeed: 12 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 9, customHP: 1, customDamage: 29, customSpeed: 16 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 32, customHP: 1, customDamage: 40, customSpeed: 5 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: 29, customSpeed: 11 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 6, customHP: 1, customDamage: 29, customSpeed: 12 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 32, customHP: 1, customDamage: 40, customSpeed: 5 }, // 8 c
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 11 }, // 9 c
	{ boss: 'enem5', type: 'enem55', xPos: 68, yPos: 9, customHP: 1, customDamage: 29, customSpeed: 16 }, // 10 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: 29, customSpeed: 17 }, // 11 c
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 6, customHP: 1, customDamage: 29, customSpeed: 12 }, // 12 c
	{ boss: 'enem5', type: 'enem55', xPos: 93, yPos: 32, customHP: 1, customDamage: 40, customSpeed: 5 }, // 13 d
	{ boss: 'enem5', type: 'enem55', xPos: 67, yPos: 9, customHP: 1, customDamage: 29, customSpeed: 16 }, // 14 d
	{ boss: 'enem5', type: 'enem55', xPos: 5, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 13 }, // 15 d
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 14 }, // 16 d
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 32, customHP: 1, customDamage: 40, customSpeed: 5 }, // 17 e
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 6, customHP: 1, customDamage: 29, customSpeed: 12 }, // 18 e
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 6, customHP: 1, customDamage: 29, customSpeed: 11 }, // 19 e
	{ boss: 'enem5', type: 'enem55', xPos: 94, yPos: 32, customHP: 1, customDamage: 40, customSpeed: 5 }, // 20 f
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 17 }, // 21 f
	{ boss: 'enem5', type: 'enem55', xPos: 4, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 13 }, // 22 f
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 14 }, // 23 f
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 15 }, // 24 f
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 32, customHP: 1, customDamage: 40, customSpeed: 5 }, // 25 g
	{ boss: 'enem5', type: 'enem55', xPos: 59, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 15 }, // 26 g
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 7, customHP: 1, customDamage: 29, customSpeed: 11 }, // 27 g
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 6, customHP: 1, customDamage: 29, customSpeed: 17 }, // 28 g
	{ boss: 'enem5', type: 'enem55', xPos: 19, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 14 }, // 29 g
	{ boss: 'enem5', type: 'enem55', xPos: 95, yPos: 32, customHP: 1, customDamage: 40, customSpeed: 5 }, // 30 h
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 7, customHP: 1, customDamage: 29, customSpeed: 17 }, // 31 h
	{ boss: 'enem5', type: 'enem55', xPos: 4, yPos: 5, customHP: 1, customDamage: 29, customSpeed: 14 }, // 32 h

];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 150, bossDelayAbDop: 6500, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem2', bossDelayAb: 171, bossDelayAbDop: 6700, firstWaveDelayMs: 2256 }, // 
	{ boss: 'enem3', bossDelayAb: 161, bossDelayAbDop: 5999, firstWaveDelayMs: 2016 }, // 
	{ boss: 'enem4', bossDelayAb: 160, bossDelayAbDop: 5600, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem5', bossDelayAb: 165, bossDelayAbDop: 7100, firstWaveDelayMs: 2400 }, // 
];

const bossAbilitiesDop = [
	// Грушак
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 0, 600, 600], openingOrder: 0 },
	{ boss: 'enem1', indexAbilities: [5, 6, 7, 8], shotGapsMs: [0, 0, 600] },
	{ boss: 'enem1', indexAbilities: [9, 10, 11, 12, 13], shotGapsMs: [300, 0, 600, 0] },
	{ boss: 'enem1', indexAbilities: [14, 15, 16, 17], shotGapsMs: [0, 0, 300] },
	{ boss: 'enem1', indexAbilities: [18, 19, 20, 21, 22], shotGapsMs: [0, 300, 600, 300] },
	{ boss: 'enem1', indexAbilities: [23, 24, 25, 26, 27], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 0, 600, 600], openingOrder: 1, label: "Ягода срывается с ветки — знакомство" },
	{ boss: 'enem1', indexAbilities: [28, 29, 30, 31], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [0, 0, 300], label: "Ягода срывается с ветки — иной конец" },
	{ boss: 'enem1', indexAbilities: [32, 33, 34, 35, 36], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 0, 600, 0], label: "Ягода срывается с ветки — завершение" },

	// Синячок
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [600, 600, 0, 0], openingOrder: 0 },
	{ boss: 'enem2', indexAbilities: [5, 6, 7, 8], shotGapsMs: [300, 0, 600] },
	{ boss: 'enem2', indexAbilities: [9, 10, 11, 12, 13], shotGapsMs: [600, 600, 0, 0] },
	{ boss: 'enem2', indexAbilities: [14, 15, 16, 17, 18, 19], shotGapsMs: [300, 600, 600, 300, 300] },
	{ boss: 'enem2', indexAbilities: [20, 21, 22, 23], shotGapsMs: [0, 300, 0] },
	{ boss: 'enem2', indexAbilities: [24, 25, 26, 27, 28], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [600, 600, 0, 0], openingOrder: 1, label: "Шип после ягодки — знакомство" },
	{ boss: 'enem2', indexAbilities: [29, 30, 31, 32], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [0, 0, 600], label: "Шип после ягодки — иной конец" },
	{ boss: 'enem2', indexAbilities: [33, 34, 35, 36, 37], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [300, 600, 600, 0], label: "Шип после ягодки — завершение" },

	// Троячок
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [600, 0, 300, 0], openingOrder: 0 },
	{ boss: 'enem3', indexAbilities: [5, 6, 7, 8], shotGapsMs: [600, 0, 0] },
	{ boss: 'enem3', indexAbilities: [9, 10, 11, 12, 13, 14], shotGapsMs: [300, 0, 600, 0, 300] },
	{ boss: 'enem3', indexAbilities: [15, 16, 17, 18, 19], shotGapsMs: [600, 0, 300, 0] },
	{ boss: 'enem3', indexAbilities: [20, 21, 22, 23, 24], shotGapsMs: [300, 0, 0, 300] },
	{ boss: 'enem3', indexAbilities: [25, 26, 27, 28], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [600, 0, 0], openingOrder: 1, label: "Гроздь рассыпается — знакомство" },
	{ boss: 'enem3', indexAbilities: [29, 30, 31, 32, 4, 33], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [600, 0, 300, 0, 0], label: "Гроздь рассыпается — иной конец" },
	{ boss: 'enem3', indexAbilities: [34, 35, 36, 37, 4], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [600, 0, 300, 300], label: "Гроздь рассыпается — завершение" },

	// Кисляк
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [600, 0, 600, 600] },
	{ boss: 'enem4', indexAbilities: [5, 6, 7, 8], shotGapsMs: [0, 600, 0], openingOrder: 0 },
	{ boss: 'enem4', indexAbilities: [9, 10, 11, 12], shotGapsMs: [0, 0, 600] },
	{ boss: 'enem4', indexAbilities: [13, 14, 15, 16, 17, 18], shotGapsMs: [300, 600, 300, 300, 600] },
	{ boss: 'enem4', indexAbilities: [19, 20, 21, 22], shotGapsMs: [0, 300, 300] },
	{ boss: 'enem4', indexAbilities: [23, 24, 25, 26], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [0, 600, 0], openingOrder: 1, label: "Сетка кожуры рвётся — знакомство" },
	{ boss: 'enem4', indexAbilities: [27, 28, 29, 30, 31], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [300, 600, 300, 300], label: "Сетка кожуры рвётся — иной конец" },
	{ boss: 'enem4', indexAbilities: [32, 33, 34, 35], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [300, 300, 300], label: "Сетка кожуры рвётся — завершение" },

	// Червоточец
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [300, 300, 600, 300], openingOrder: 0 },
	{ boss: 'enem5', indexAbilities: [5, 6, 2, 7], shotGapsMs: [0, 300, 600] },
	{ boss: 'enem5', indexAbilities: [8, 9, 2, 10, 11, 12], shotGapsMs: [600, 0, 0, 300, 0] },
	{ boss: 'enem5', indexAbilities: [13, 14, 15, 16], shotGapsMs: [300, 300, 600] },
	{ boss: 'enem5', indexAbilities: [17, 2, 18, 19], shotGapsMs: [300, 600, 0] },
	{ boss: 'enem5', indexAbilities: [20, 21, 22, 23, 24], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [300, 0, 0, 600], openingOrder: 1, label: "Полосатый раскат — знакомство" },
	{ boss: 'enem5', indexAbilities: [25, 26, 15, 27, 28, 29], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [0, 0, 0, 600, 0], label: "Полосатый раскат — иной конец" },
	{ boss: 'enem5', indexAbilities: [30, 31, 15, 32], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 600, 600], label: "Полосатый раскат — завершение" },

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
