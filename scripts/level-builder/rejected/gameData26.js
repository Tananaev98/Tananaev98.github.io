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
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.898, damageMultiplier: 1.732, minWaveDelay: 2151, minShotDelay: 154, minTelegraphMs: 555,
	phases: [
		{ phase: 1, minHp: 0.647, cadence: 0.989, speed: 1.009, damage: 1, telegraphMultiplier: 1.012, surpriseChance: 0.13, maxActiveAttacks: 14 },
		{ phase: 2, minHp: 0.305, cadence: 0.822, speed: 1.142, damage: 1.13, telegraphMultiplier: 0.903, surpriseChance: 0.23, maxActiveAttacks: 16 },
		{ phase: 3, minHp: 0, cadence: 0.662, speed: 1.279, damage: 1.25, telegraphMultiplier: 0.781, surpriseChance: 0.33, maxActiveAttacks: 21 }
	],
	bosses: {
		enem1: { combatIdentity: "Корень тянет обратно", combatTrick: "показывает боковой замах, но заканчивает серединой; позднее конец возвращается на край", signatureEvery: 4, movementStyle: 'pause', cadence: 1.053, telegraphMs: 898, speedMultiplier: 1.4, damageMultiplier: 0.88, speedVariance: [0.99, 1.02, 1.05, 1.08, 1.11] },
		enem2: { combatIdentity: "Ботва распускается", combatTrick: "ведёт прицел вдоль прохода, затем возвращает угрозу за спину прохода", signatureEvery: 4, movementStyle: 'lateRush', cadence: 0.949, telegraphMs: 779, speedMultiplier: 1.201, damageMultiplier: 0.96, speedVariance: [0.9, 0.96, 1.02, 1.08, 1.14] },
		enem3: { combatIdentity: "Стержень и боковой корешок", combatTrick: "короткий первый заход продолжается более быстрым довеском с прежнего края", signatureEvery: 4, movementStyle: 'accelerate', cadence: 1.102, telegraphMs: 978, speedMultiplier: 1.099, damageMultiplier: 1.18, speedVariance: [1, 1.045, 1.09, 1.135, 1.18] },
		enem4: { combatIdentity: "Редиска возвращается", combatTrick: "повторяет удар в прежнем секторе вместо ожидаемого чередования", signatureEvery: 4, movementStyle: 'weave', cadence: 0.82, telegraphMs: 650, speedMultiplier: 1.16, damageMultiplier: 0.78, speedVariance: [1.055, 1.0875, 1.12, 1.1525, 1.185] },
		enem5: { combatIdentity: "Сбор корнеплодов", combatTrick: "разводит две цели, затем закрывает оставленную между ними полосу", signatureEvery: 4, movementStyle: 'straight', cadence: 0.847, telegraphMs: 585, speedMultiplier: 1.25, damageMultiplier: 1.08, speedVariance: [1, 1.03, 1.06, 1.09, 1.12] }
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
let timeNextBoss = 6;
const bossInterval = 5;

const bossAbilities = [
	// ===== Чернавка =====
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 89, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 }, // 4 b
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 87, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 }, // 9 c
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 10 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 }, // 12 d
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 13 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 14 d
	{ boss: 'enem1', type: 'enem11', xPos: 13, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 15 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 16 d
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 17 d
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 }, // 18 e
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 19 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 20 e
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 21 e
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 }, // 22 f
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 23 f
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 24 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 25 f
	{ boss: 'enem1', type: 'enem11', xPos: 85, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 }, // 26 g
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 27 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 28 g
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 29 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 30 g
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 31 h
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 32 h
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 33 h
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, // 34 h
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, // 35 h

	// ===== Ботвинья =====
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 }, // 4 b
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 9 b
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, // 14 d
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 15 d
	{ boss: 'enem2', type: 'enem22', xPos: 68, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16 }, // 16 d
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 17 e
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16 }, // 18 e
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 19 e
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, // 20 e
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 21 e
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, // 22 f
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 23 f
	{ boss: 'enem2', type: 'enem22', xPos: 67, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16 }, // 24 f
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 25 f
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, // 26 g
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 27 g
	{ boss: 'enem2', type: 'enem22', xPos: 66, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16 }, // 28 g
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 29 g
	{ boss: 'enem2', type: 'enem22', xPos: 87, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 }, // 30 h
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16 }, // 31 h
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 32 h
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, // 33 h
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, // 34 h
	{ boss: 'enem2', type: 'enem22', xPos: 64, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16 }, // 35 h

	// ===== Белобока =====
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 5 b
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 9 c
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 10 c
	{ boss: 'enem3', type: 'enem33', xPos: 11, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 11 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 12 c
	{ boss: 'enem3', type: 'enem33', xPos: 84, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 }, // 13 d
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 14 d
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 15 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 16 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 17 d
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 18 d
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 19 e
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 20 e
	{ boss: 'enem3', type: 'enem33', xPos: 13, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 21 e
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 22 e
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 }, // 23 f
	{ boss: 'enem3', type: 'enem33', xPos: 67, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 24 f
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 25 f
	{ boss: 'enem3', type: 'enem33', xPos: 83, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 }, // 26 g
	{ boss: 'enem3', type: 'enem33', xPos: 66, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 27 g
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 28 g
	{ boss: 'enem3', type: 'enem33', xPos: 13, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 29 g
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 30 g
	{ boss: 'enem3', type: 'enem33', xPos: 65, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 31 h
	{ boss: 'enem3', type: 'enem33', xPos: 13, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 32 h
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, // 33 h
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, // 34 h
	{ boss: 'enem3', type: 'enem33', xPos: 13, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, // 35 h

	// ===== Кругляш =====
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 4 b
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 9 c
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 13 c
	{ boss: 'enem4', type: 'enem44', xPos: 91, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 }, // 14 d
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 15 d
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 16 d
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 17 d
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 18 e
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 19 e
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 20 e
	{ boss: 'enem4', type: 'enem44', xPos: 89, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 }, // 21 f
	{ boss: 'enem4', type: 'enem44', xPos: 67, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 22 f
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 23 f
	{ boss: 'enem4', type: 'enem44', xPos: 66, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 24 f
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 25 f
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 26 g
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 27 g
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 28 g
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 29 g
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 30 g
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 31 h
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 32 h
	{ boss: 'enem4', type: 'enem44', xPos: 65, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, // 33 h
	{ boss: 'enem4', type: 'enem44', xPos: 67, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, // 34 h

	// ===== Спасовка =====
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 9 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 10 b
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 }, // 11 c
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 12 c
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 13 c
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 14 c
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 15 d
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 16 d
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 17 d
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 18 d
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 19 e
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 20 e
	{ boss: 'enem5', type: 'enem55', xPos: 68, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 21 e
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 22 e
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 }, // 23 f
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 24 f
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 25 f
	{ boss: 'enem5', type: 'enem55', xPos: 83, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 }, // 26 g
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 27 g
	{ boss: 'enem5', type: 'enem55', xPos: 67, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 28 g
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 29 g
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 30 g
	{ boss: 'enem5', type: 'enem55', xPos: 66, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 31 g
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, // 32 h
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 33 h
	{ boss: 'enem5', type: 'enem55', xPos: 64, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, // 34 h
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, // 35 h

];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 180, bossDelayAbDop: 6600, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem2', bossDelayAb: 150, bossDelayAbDop: 5200, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem3', bossDelayAb: 155, bossDelayAbDop: 6000, firstWaveDelayMs: 2400 }, // 
	{ boss: 'enem4', bossDelayAb: 150, bossDelayAbDop: 7000, firstWaveDelayMs: 1968 }, // 
	{ boss: 'enem5', bossDelayAb: 196, bossDelayAbDop: 6600, firstWaveDelayMs: 2256 }, // 
];

const bossAbilitiesDop = [
	// Чернавка
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3], shotGapsMs: [600, 0, 300], openingOrder: 0 },
	{ boss: 'enem1', indexAbilities: [4, 5, 6, 7, 8], shotGapsMs: [300, 0, 600, 300] },
	{ boss: 'enem1', indexAbilities: [9, 10, 11], shotGapsMs: [600, 300] },
	{ boss: 'enem1', indexAbilities: [12, 13, 14, 15, 16, 17], shotGapsMs: [600, 300, 300, 300, 600] },
	{ boss: 'enem1', indexAbilities: [18, 19, 20, 21], shotGapsMs: [600, 0, 0] },
	{ boss: 'enem1', indexAbilities: [22, 23, 24, 25], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [300, 600, 600], openingOrder: 1, label: "Корень тянет обратно — знакомство" },
	{ boss: 'enem1', indexAbilities: [26, 27, 28, 29, 30], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [600, 300, 300, 300], label: "Корень тянет обратно — иной конец" },
	{ boss: 'enem1', indexAbilities: [31, 32, 33, 34, 35], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 300, 300, 0], label: "Корень тянет обратно — завершение" },

	// Ботвинья
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3], shotGapsMs: [300, 300, 300], openingOrder: 0 },
	{ boss: 'enem2', indexAbilities: [4, 5, 6, 7, 8, 9], shotGapsMs: [600, 600, 0, 600, 0] },
	{ boss: 'enem2', indexAbilities: [10, 11, 12, 13], shotGapsMs: [300, 300, 300] },
	{ boss: 'enem2', indexAbilities: [14, 15, 16], shotGapsMs: [300, 0] },
	{ boss: 'enem2', indexAbilities: [17, 18, 19, 20, 21], shotGapsMs: [0, 300, 300, 0] },
	{ boss: 'enem2', indexAbilities: [22, 23, 24, 25], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [300, 300, 0], openingOrder: 1, label: "Ботва распускается — знакомство" },
	{ boss: 'enem2', indexAbilities: [26, 27, 28, 29], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [300, 300, 0], label: "Ботва распускается — иной конец" },
	{ boss: 'enem2', indexAbilities: [30, 31, 32, 33, 34, 35], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [600, 600, 600, 0, 0], label: "Ботва распускается — завершение" },

	// Белобока
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [300, 300, 0, 0], openingOrder: 0 },
	{ boss: 'enem3', indexAbilities: [5, 6, 7, 8], shotGapsMs: [600, 0, 0] },
	{ boss: 'enem3', indexAbilities: [9, 10, 11, 12], shotGapsMs: [0, 600, 0] },
	{ boss: 'enem3', indexAbilities: [13, 14, 15, 16, 17, 18], shotGapsMs: [600, 300, 0, 600, 0] },
	{ boss: 'enem3', indexAbilities: [19, 20, 21, 22], shotGapsMs: [300, 300, 0] },
	{ boss: 'enem3', indexAbilities: [23, 24, 25], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [600, 300], openingOrder: 1, label: "Стержень и боковой корешок — знакомство" },
	{ boss: 'enem3', indexAbilities: [26, 27, 28, 29, 30], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [600, 0, 600, 600], label: "Стержень и боковой корешок — иной конец" },
	{ boss: 'enem3', indexAbilities: [31, 32, 33, 34, 35], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [300, 0, 0, 0], label: "Стержень и боковой корешок — завершение" },

	// Кругляш
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3], shotGapsMs: [300, 600, 600], openingOrder: 0 },
	{ boss: 'enem4', indexAbilities: [4, 5, 6, 7, 8], shotGapsMs: [300, 0, 0, 300] },
	{ boss: 'enem4', indexAbilities: [9, 10, 11, 12, 13], shotGapsMs: [300, 300, 300, 0] },
	{ boss: 'enem4', indexAbilities: [14, 15, 16, 17], shotGapsMs: [0, 0, 0] },
	{ boss: 'enem4', indexAbilities: [18, 19, 20], shotGapsMs: [300, 0] },
	{ boss: 'enem4', indexAbilities: [21, 22, 23, 24, 25], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [300, 0, 600, 0], openingOrder: 1, label: "Редиска возвращается — знакомство" },
	{ boss: 'enem4', indexAbilities: [26, 27, 28, 29, 30], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [0, 300, 300, 0], label: "Редиска возвращается — иной конец" },
	{ boss: 'enem4', indexAbilities: [31, 32, 33, 34], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [0, 0, 0], label: "Редиска возвращается — завершение" },

	// Спасовка
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [300, 0, 0, 300], openingOrder: 0 },
	{ boss: 'enem5', indexAbilities: [5, 6, 7, 8, 9, 10], shotGapsMs: [600, 300, 300, 0, 0] },
	{ boss: 'enem5', indexAbilities: [11, 12, 13, 14], shotGapsMs: [0, 0, 0] },
	{ boss: 'enem5', indexAbilities: [15, 16, 17, 18], shotGapsMs: [0, 0, 600] },
	{ boss: 'enem5', indexAbilities: [19, 20, 21, 22], shotGapsMs: [0, 300, 300] },
	{ boss: 'enem5', indexAbilities: [23, 24, 25], signature: true, minPhase: 1, recoveryMs: 650, shotGapsMs: [300, 300], openingOrder: 1, label: "Сбор корнеплодов — знакомство" },
	{ boss: 'enem5', indexAbilities: [26, 27, 28, 29, 30, 31], signature: true, minPhase: 2, recoveryMs: 650, shotGapsMs: [0, 600, 600, 0, 0], label: "Сбор корнеплодов — иной конец" },
	{ boss: 'enem5', indexAbilities: [32, 33, 34, 35], signature: true, minPhase: 3, recoveryMs: 950, shotGapsMs: [300, 300, 0], label: "Сбор корнеплодов — завершение" },

];

// Лорные названия связок. Уровень 26 — огород (репка-мотив): Чернавка (тёмный корешок,
// «дедка тянет»), Ботвинья (ботва), Белобока (корнеплод), Кругляш (круглый овощ),
// Спасовка (честный урожай Спаса).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Тянущий удар', variant2: 'Острый корешок', variant3: 'Тянущая сила',
        variant4: 'Земляная кожура', variant5: 'Синхронный рывок', variant6: 'Земляной сок',
        variant7: 'Тянущая мощь', variant8: 'Плотная кожура', variant9: 'Дедка тянет вдвоём',
        variant10: 'Живучая Чернавка', variant11: 'Цепкий корешок', variant12: 'Рывок и в грядку',
        variant13: 'Толстая кожура', variant14: 'Неутомимая Чернавка', variant15: 'Пружинистый корешок',
        variant16: 'Меткий корешок', variant17: 'Тянущая хватка', variant18: 'Тёмный взгляд из земли',
        variant19: 'Синхронный рывок вмиг', variant20: 'Земляной дух', variant21: 'Стойкая кожура',
        variant22: 'Юркая Чернавка', variant23: 'Тянущая стойкость', variant24: 'Чуткий корешок',
        variant25: 'Ускользающий корешок', variant26: 'Дикий рывок', variant27: 'Мощь сока',
        variant28: 'Внезапный синхронный рывок', variant29: 'Каменная кожура', variant30: 'Разросшийся корешок',
        variant31: 'Тянущий рывок', variant32: 'Живучая кожура', variant33: 'Синхронный рывок снова',
        variant34: 'Тянущая прыть', variant35: 'Тянущая выносливость'
    },
    enem2: {
        variant1: 'Листовой удар', variant2: 'Острый черешок', variant3: 'Листовая сила',
        variant4: 'Зелёная защита', variant5: 'Снос листвы', variant6: 'Сок ботвы',
        variant7: 'Листовая мощь', variant8: 'Плотная ботва', variant9: 'Поздний рывок',
        variant10: 'Живучая Ботвинья', variant11: 'Цепкие листья', variant12: 'Снос и в грядку',
        variant13: 'Толстая ботва', variant14: 'Неутомимая Ботвинья', variant15: 'Пружинистый черешок',
        variant16: 'Меткий лист', variant17: 'Листовая хватка', variant18: 'Спокойный взгляд ботвы',
        variant19: 'Снос листвы вмиг', variant20: 'Зелёный дух', variant21: 'Стойкая ботва',
        variant22: 'Юркая Ботвинья', variant23: 'Листовая стойкость', variant24: 'Чуткий черешок',
        variant25: 'Ускользающий лист', variant26: 'Дикий снос', variant27: 'Мощь сока',
        variant28: 'Поздний рывок вмиг', variant29: 'Каменная ботва', variant30: 'Разросшаяся ботва',
        variant31: 'Листовой рывок', variant32: 'Живучие листья', variant33: 'Поздний рывок вновь',
        variant34: 'Листовая прыть', variant35: 'Листовая выносливость'
    },
    enem3: {
        variant1: 'Корневой удар', variant2: 'Стержневой корень', variant3: 'Корневая сила',
        variant4: 'Белая кожица', variant5: 'Обманчиво медленный удар', variant6: 'Горький сок',
        variant7: 'Корневая мощь', variant8: 'Плотная белая кожица', variant9: 'Разгон к удару',
        variant10: 'Живучая Белобока', variant11: 'Цепкий корень', variant12: 'Удар и вглубь земли',
        variant13: 'Толстая кожица', variant14: 'Неутомимая Белобока', variant15: 'Пружинистый корень',
        variant16: 'Меткий корень', variant17: 'Корневая хватка', variant18: 'Обманчивый взгляд',
        variant19: 'Разгон к удару вмиг', variant20: 'Корневой дух', variant21: 'Стойкая кожица',
        variant22: 'Юркая Белобока', variant23: 'Корневая стойкость', variant24: 'Чуткий корень',
        variant25: 'Ускользающий корень', variant26: 'Дикий разгон', variant27: 'Мощь горечи',
        variant28: 'Внезапный разгон к удару', variant29: 'Каменный корень', variant30: 'Разросшийся корень',
        variant31: 'Корневой рывок', variant32: 'Живучая кожица', variant33: 'Разгон вновь',
        variant34: 'Корневая прыть', variant35: 'Корневая выносливость'
    },
    enem4: {
        variant1: 'Круглый удар', variant2: 'Черешок кругляша', variant3: 'Круглая сила',
        variant4: 'Тугая кожица', variant5: 'Змейка из угла', variant6: 'Сок кругляша',
        variant7: 'Круглая мощь', variant8: 'Плотная кожица', variant9: 'Нервная змейка',
        variant10: 'Живучий Кругляш', variant11: 'Цепкий черешок', variant12: 'Змейка и в грядку',
        variant13: 'Толстая кожица', variant14: 'Неутомимый Кругляш', variant15: 'Пружинистый бочок',
        variant16: 'Меткий черешок', variant17: 'Круглая хватка', variant18: 'Круглый взгляд',
        variant19: 'Змейка вмиг', variant20: 'Огородный дух', variant21: 'Кожица кругляша стойка',
        variant22: 'Юркий Кругляш', variant23: 'Круглая стойкость', variant24: 'Чуткая кожица',
        variant25: 'Ускользающий кругляш', variant26: 'Дикая змейка', variant27: 'Мощь сока',
        variant28: 'Змейка из угла вмиг', variant29: 'Каменная кожица', variant30: 'Разросшийся кругляш',
        variant31: 'Круглый рывок', variant32: 'Живучая кожица', variant33: 'Неутомимая змейка',
        variant34: 'Круглая прыть', variant35: 'Круглая выносливость'
    },
    enem5: {
        variant1: 'Честный удар', variant2: 'Острый спелый шип', variant3: 'Честная сила',
        variant4: 'Защита урожая', variant5: 'Прямой удар', variant6: 'Августовский сок',
        variant7: 'Честная мощь', variant8: 'Урожайная кожура', variant9: 'Прямая честная геометрия',
        variant10: 'Живучая Спасовка', variant11: 'Цепкая веточка', variant12: 'Удар и в урожай',
        variant13: 'Толстая кожура', variant14: 'Неутомимая Спасовка', variant15: 'Ветка урожая',
        variant16: 'Меткий шип', variant17: 'Честная хватка', variant18: 'Прямой честный взгляд',
        variant19: 'Прямой удар вмиг', variant20: 'Августовский дух', variant21: 'Кожура урожая стойка',
        variant22: 'Юркая Спасовка', variant23: 'Честная стойкость', variant24: 'Чуткая ветка',
        variant25: 'Ускользающая веточка', variant26: 'Дикий урожай', variant27: 'Мощь сока',
        variant28: 'Прямой удар внезапно', variant29: 'Каменная кожура', variant30: 'Разросшийся урожай',
        variant31: 'Честный рывок', variant32: 'Живучая кожура', variant33: 'Прямая геометрия вновь',
        variant34: 'Честная прыть', variant35: 'Честная выносливость'
    }
};
