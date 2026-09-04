// Данные режима «Манекен» — вечный тренировочный бой с одним неубиваемым боссом,
// используются ТОЛЬКО из dummy.html (см. window.DUMMY_MODE в game.js). Полностью
// скопированы из lvlData/gameData17.js (та же «пятёрка» Золотых полей, тот же босс
// «Шуршало» — по лору уже пугало/чучело, см. UPGRADE_VARIANT_NAMES.enem5 ниже), чтобы
// не дублировать и не изобретать заново форму gameData-файла — единственное смысловое
// отличие от оригинала: bossM ниже укорочен до одной фазы (enem5), реальные HP/атаки
// этой фазы всё равно полностью переопределяются в game.js под DUMMY_MODE
// (calculateBossMaxHealth даёт фиксированные 100 млрд HP + регенерацию, startBossEvents
// отключает атаки целиком) — bossCombatConfig/bossAbilities/mBossDelayAb/attackDamage
// ниже остаются НЕИСПОЛЬЗУЕМЫМИ по факту, но нужны как валидные объекты, потому что
// getLevelCombatConfig()/buildBattleMusicContext() бросают исключение при их отсутствии
// (см. их комментарии в game.js) — это единственная причина, почему они здесь есть.
let lvlNumber = 17;
let factorChar = (lvlNumber * 5) / 100;

const bossCombatConfig = {
	levelCadence: 0.92, damageMultiplier: 1.960, minWaveDelay: 2150, minShotDelay: 152, minTelegraphMs: 550,
	phases: [
		{ phase: 1, minHp: 0.65, cadence: 1.00, speed: 1.00, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.13, maxActiveAttacks: 13 },
		{ phase: 2, minHp: 0.31, cadence: 0.85, speed: 1.09, damage: 1.13, telegraphMultiplier: 0.92, surpriseChance: 0.23, maxActiveAttacks: 16 },
		{ phase: 3, minHp: 0.00, cadence: 0.72, speed: 1.18, damage: 1.25, telegraphMultiplier: 0.85, surpriseChance: 0.33, maxActiveAttacks: 19 }
	],
	bosses: {
		enem1: { movementStyle: 'weave',    cadence: 1.05, telegraphMs: 900, speedMultiplier: 0.90, damageMultiplier: 0.93, speedVariance: [0.88, 0.95, 1.02, 1.09, 1.16] },
		enem2: { movementStyle: 'accelerate',    cadence: 0.85, telegraphMs: 720, speedMultiplier: 1.08, damageMultiplier: 0.88, speedVariance: [0.84, 0.94, 1.04, 1.14, 1.24] },
		enem3: { movementStyle: 'lateRush', cadence: 1.25, telegraphMs: 980, speedMultiplier: 0.82, damageMultiplier: 1.15, speedVariance: [0.78, 0.88, 0.98, 1.08, 1.18] },
		enem4: { movementStyle: 'drift', cadence: 0.75, telegraphMs: 600, speedMultiplier: 1.22, damageMultiplier: 0.62, speedVariance: [0.90, 1.02, 1.14, 1.26, 1.38] },
		enem5: { movementStyle: 'straight',    cadence: 0.72, telegraphMs: 620, speedMultiplier: 1.10, damageMultiplier: 1.05, speedVariance: [0.86, 0.97, 1.09, 1.21, 1.33] }
	}
};

const ENEMY_TYPES = {

	enem11: {
        image: 'images/enemies/regions/2_zolot_polya/lvl17/11.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem22: {
        image: 'images/enemies/regions/2_zolot_polya/lvl17/22.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem33: {
        image: 'images/enemies/regions/2_zolot_polya/lvl17/33.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem44: {
        image: 'images/enemies/regions/2_zolot_polya/lvl17/44.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem55: {
        image: 'images/enemies/regions/2_zolot_polya/lvl17/55.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem1: {
		name: 'enem1',
		dispName: 'Притайка',
		image: 'images/enemies/regions/2_zolot_polya/lvl17/1.webp',
		baseHP: 2600 + (2600 * factorChar),
		baseSpeed: 0,
		baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5,
		baseExp: 200,
		xPos: 50,
		size: '26%',
        deathAnimation: { preset: 'dissolveRise', durationMs: 1400 }
	},

	enem2: {
		name: 'enem2',
		dispName: 'Щекан',
		image: 'images/enemies/regions/2_zolot_polya/lvl17/2.webp',
		baseHP: 6500 + (6500 * factorChar),
		baseSpeed: 0,
		baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15,
		baseExp: 320,
		xPos: 65,
		size: '26%',
        deathAnimation: { preset: 'ashFade', durationMs: 1250 }
	},

	enem3: {
		name: 'enem3',
		dispName: 'Столбик',
		image: 'images/enemies/regions/2_zolot_polya/lvl17/3.webp',
		baseHP: 11500 + (11500 * factorChar),
		baseSpeed: 0,
		baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20,
		baseExp: 430,
		xPos: 50,
		size: '26%',
        deathAnimation: { preset: 'spinAway', durationMs: 1200 }
	},

	enem4: {
		name: 'enem4',
		dispName: 'Трещотник',
		image: 'images/enemies/regions/2_zolot_polya/lvl17/4.webp',
		baseHP: 18500 + (18500 * factorChar),
		baseSpeed: 0,
		baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10,
		baseExp: 560,
		xPos: 50,
		size: '26%',
        deathAnimation: { preset: 'crumbleShake', durationMs: 1550 }
	},

	enem5: {
		name: 'enem5',
		dispName: 'Шуршало',
		image: 'images/enemies/regions/2_zolot_polya/lvl17/5.webp',
		baseHP: 28000 + (28000 * factorChar),
		baseSpeed: 0,
		baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5,
		baseExp: 0,
		xPos: 50,
		size: '30%',
        deathAnimation: { preset: 'heavySink', durationMs: 1550 }
	}
};

const attackDamage = {
	enem1: {
		light: Math.round(ENEMY_TYPES.enem1.baseDamage * 0.34),
		medium: Math.round(ENEMY_TYPES.enem1.baseDamage * 0.46),
		heavy: Math.round(ENEMY_TYPES.enem1.baseDamage * 0.58)
	},
	enem2: {
		light: Math.round(ENEMY_TYPES.enem2.baseDamage * 0.28),
		medium: Math.round(ENEMY_TYPES.enem2.baseDamage * 0.38),
		heavy: Math.round(ENEMY_TYPES.enem2.baseDamage * 0.50)
	},
	enem3: {
		light: Math.round(ENEMY_TYPES.enem3.baseDamage * 0.30),
		medium: Math.round(ENEMY_TYPES.enem3.baseDamage * 0.40),
		heavy: Math.round(ENEMY_TYPES.enem3.baseDamage * 0.48)
	},
	enem4: {
		light: Math.round(ENEMY_TYPES.enem4.baseDamage * 0.24),
		medium: Math.round(ENEMY_TYPES.enem4.baseDamage * 0.33),
		heavy: Math.round(ENEMY_TYPES.enem4.baseDamage * 0.42)
	},
	enem5: {
		light: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.26),
		medium: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.36),
		heavy: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.48)
	}
};

// Единственное смысловое отличие от gameData17.js — одна фаза вместо пяти:
// манекен всегда «Шуршало», без смены боссов по ходу боя.
let bossM = ['enem5'];
let timeNextBoss = 5;
const bossInterval = 5;

const bossAbilities = [
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 44, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 5 },
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 38, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 7 }
];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 400, bossDelayAbDop: 6400 },
	{ boss: 'enem2', bossDelayAb: 300, bossDelayAbDop: 4700 },
	{ boss: 'enem3', bossDelayAb: 460, bossDelayAbDop: 7000 },
	{ boss: 'enem4', bossDelayAb: 240, bossDelayAbDop: 4600 },
	{ boss: 'enem5', bossDelayAb: 260, bossDelayAbDop: 4300 },
];

const bossAbilitiesDop = [
	{ boss: 'enem5', indexAbilities: [0] },
];

// Лорные названия связок — нужны getAvailableUpgradeBundles() для карточек апгрейдов
// (см. её комментарий в game.js), берутся по типу текущего босса (enem5 = Шуршало).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Затаившийся удар', variant2: 'Клюв из борозды', variant3: 'Затаившаяся сила',
        variant4: 'Пёстрая защита', variant5: 'Меткая вылазка', variant6: 'Укол из укрытия',
        variant7: 'Затаившаяся мощь', variant8: 'Плотное оперение', variant9: 'Редкая точная вылазка',
        variant10: 'Живучая Притайка', variant11: 'Цепкий коготок', variant12: 'Вылазка и в борозду',
        variant13: 'Крепкое оперение', variant14: 'Ожидание в борозде', variant15: 'Пружинистый выскок',
        variant16: 'Меткий выскок', variant17: 'Затаившаяся хватка', variant18: 'Взгляд из борозды',
        variant19: 'Мгновенная вылазка', variant20: 'Полевой дух', variant21: 'Стойкое оперение',
        variant22: 'Юркая Притайка', variant23: 'Затаившаяся стойкость', variant24: 'Ухо в борозде',
        variant25: 'Ускользающая в борозду', variant26: 'Дикая вылазка', variant27: 'Мощь укола',
        variant28: 'Внезапная вылазка', variant29: 'Каменное терпение', variant30: 'Разросшееся укрытие',
        variant31: 'Затаившийся рывок', variant32: 'Живучее оперение', variant33: 'Неутомимая вылазка',
        variant34: 'Затаившаяся прыть', variant35: 'Затаившаяся выносливость'
    },
    enem2: {
        variant1: 'Мешковый удар', variant2: 'Острый резец', variant3: 'Хомячья сила',
        variant4: 'Мешковатая защита', variant5: 'Бросок мешка', variant6: 'Пыль зерна',
        variant7: 'Хомячья мощь', variant8: 'Плотный мешок', variant9: 'Колонна волочения',
        variant10: 'Живучий Щекан', variant11: 'Лапки-мешочки', variant12: 'Бросок и в нору',
        variant13: 'Щёки-мешки', variant14: 'Неутомимый хомяк', variant15: 'Рывок с мешком',
        variant16: 'Меткий резец', variant17: 'Хомячья хватка', variant18: 'Жадный взгляд',
        variant19: 'Мгновенный бросок мешка', variant20: 'Зерновой дух', variant21: 'Стойкие щёки',
        variant22: 'Юркий Щекан', variant23: 'Хомячья стойкость', variant24: 'Чуткие щёки',
        variant25: 'Ускользающий с добычей', variant26: 'Дикая жадность', variant27: 'Мощь пыли',
        variant28: 'Внезапный бросок', variant29: 'Каменные закрома', variant30: 'Разросшиеся закрома',
        variant31: 'Хомячий рывок', variant32: 'Живучие щёки', variant33: 'Неутомимая колонна',
        variant34: 'Хомячья прыть', variant35: 'Хомячья выносливость'
    },
    enem3: {
        variant1: 'Стоечный удар', variant2: 'Резец суслика', variant3: 'Стоечная сила',
        variant4: 'Защита норы', variant5: 'Удар из стойки', variant6: 'Писк тревоги',
        variant7: 'Стоечная мощь', variant8: 'Нора-щит', variant9: 'Давление снизу',
        variant10: 'Живучий Столбик', variant11: 'Цепкие коготки', variant12: 'Удар и в нору',
        variant13: 'Крепкая нора', variant14: 'Неутомимая стойка', variant15: 'Стойка столбиком',
        variant16: 'Меткий резец', variant17: 'Стоечная хватка', variant18: 'Взгляд с холмика',
        variant19: 'Удар из стойки вмиг', variant20: 'Дух норы', variant21: 'Стойкая нора',
        variant22: 'Юркий Столбик', variant23: 'Стоечная стойкость', variant24: 'Чуткий писк',
        variant25: 'Ускользающий в нору', variant26: 'Дикий писк', variant27: 'Мощь резца',
        variant28: 'Внезапный удар снизу', variant29: 'Каменная нора', variant30: 'Разросшаяся нора',
        variant31: 'Стоечный рывок', variant32: 'Живучая нора', variant33: 'Неутомимое давление',
        variant34: 'Стоечная прыть', variant35: 'Стоечная выносливость'
    },
    enem4: {
        variant1: 'Трещащий удар', variant2: 'Щепка трещотки', variant3: 'Трещащая сила',
        variant4: 'Деревянная защита', variant5: 'Меткий треск', variant6: 'Едкий скрип',
        variant7: 'Трещащая мощь', variant8: 'Дерево трещотки', variant9: 'Щелчок из угла',
        variant10: 'Живучий Трещотник', variant11: 'Цепкая щепка', variant12: 'Треск и в угол',
        variant13: 'Толстое дерево', variant14: 'Неутомимый треск', variant15: 'Пружинистая трещотка',
        variant16: 'Меткая щепка', variant17: 'Трещащая хватка', variant18: 'Дребезжащий взгляд',
        variant19: 'Мгновенный треск', variant20: 'Деревянный дух', variant21: 'Стойкое дерево',
        variant22: 'Юркий Трещотник', variant23: 'Трещащая стойкость', variant24: 'Чуткий скрип',
        variant25: 'Ускользающий треск', variant26: 'Треск из всех углов', variant27: 'Мощь скрипа',
        variant28: 'Внезапный треск', variant29: 'Каменная трещотка', variant30: 'Разросшийся треск',
        variant31: 'Трещащий рывок', variant32: 'Живучее дерево', variant33: 'Неутомимый щелчок',
        variant34: 'Трещащая прыть', variant35: 'Трещащая выносливость'
    },
    enem5: {
        variant1: 'Шуршащий удар', variant2: 'Острая солома', variant3: 'Шуршащая сила',
        variant4: 'Мешковинная защита', variant5: 'Взмах рукава', variant6: 'Запах гнилой соломы',
        variant7: 'Шуршащая мощь', variant8: 'Плотная мешковина', variant9: 'Закрытие зоны',
        variant10: 'Живучее Шуршало', variant11: 'Цепкая солома', variant12: 'Взмах и в поле',
        variant13: 'Толстая мешковина', variant14: 'Неутомимое Шуршало', variant15: 'Пружинистый шест',
        variant16: 'Меткая солома', variant17: 'Шуршащая хватка', variant18: 'Взгляд из-под шляпы',
        variant19: 'Мгновенное закрытие', variant20: 'Соломенный дух', variant21: 'Стойкая мешковина',
        variant22: 'Юркое Шуршало', variant23: 'Шуршащая стойкость', variant24: 'Чуткий шелест',
        variant25: 'Ускользающее в поле', variant26: 'Дикий шелест', variant27: 'Мощь гнили',
        variant28: 'Закрытие зоны вмиг', variant29: 'Каменный шест', variant30: 'Разросшаяся солома',
        variant31: 'Шуршащий рывок', variant32: 'Живучая мешковина', variant33: 'Неутомимое закрытие',
        variant34: 'Шуршащая прыть', variant35: 'Шуршащая выносливость'
    }
};
