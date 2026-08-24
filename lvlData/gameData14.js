let lvlNumber = 14;
let factorChar = (lvlNumber * 5) / 100;

// Уровень 14 переосмыслен: перед Бабой-ягой (уровень 15) игрок встречает её домашнюю
// свору — Кот-Баюн, Ворон, цепной Пёс, Ступа и, наконец, сама Избушка на курьих ножках
// как хранитель порога. Архетипы Баюнища/Каркуна/Ступолёта унаследованы с прежнего
// уровня 15 (тот же персонаж — тот же почерк), Цепняк и Избач спроектированы заново.
const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 0.72, damageMultiplier: 1.760, minWaveDelay: 2000, minShotDelay: 135, minTelegraphMs: 470,
	phases: [
		{ phase: 1, minHp: 0.66, cadence: 1.00, speed: 1.00, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.14, maxActiveAttacks: 15 },
		{ phase: 2, minHp: 0.31, cadence: 0.77, speed: 1.13, damage: 1.15, telegraphMultiplier: 0.90, surpriseChance: 0.27, maxActiveAttacks: 19 },
		{ phase: 3, minHp: 0.00, cadence: 0.63, speed: 1.25, damage: 1.30, telegraphMultiplier: 0.83, surpriseChance: 0.38, maxActiveAttacks: 22 }
	],
	bosses: {
		enem1: { movementStyle: 'pause',    cadence: 1.02, telegraphMs: 820, speedMultiplier: 1.02, damageMultiplier: 0.96, speedVariance: [0.84, 0.94, 1.02, 1.10, 1.18] }, // БАЮНИЩЕ: CENTER_OUT_BELLS — круги расходятся из центра
		enem2: { movementStyle: 'drift',    cadence: 0.92, telegraphMs: 720, speedMultiplier: 1.08, damageMultiplier: 0.84, speedVariance: [0.86, 0.96, 1.06, 1.16, 1.24] }, // КАРКУН-ВЕЩУН: PERIMETER_FLIGHT — одна дуга поля за серию
		enem3: { movementStyle: 'straight', cadence: 1.05, telegraphMs: 780, speedMultiplier: 0.98, damageMultiplier: 1.10, speedVariance: [0.82, 0.92, 1.02, 1.12, 1.22] }, // ЦЕПНЯК: CHAIN_CHARGE — низкий забег с одного бока, редкий центр
		enem4: { movementStyle: 'accelerate', cadence: 0.84, telegraphMs: 650, speedMultiplier: 1.12, damageMultiplier: 0.68, speedVariance: [0.88, 0.98, 1.08, 1.18, 1.26] }, // СТУПОЛЁТ: BROOM_SWEEP — направленный пролёт метлы
		enem5: { movementStyle: 'lateRush',    cadence: 0.75, telegraphMs: 640, speedMultiplier: 1.14, damageMultiplier: 1.08, speedVariance: [0.80, 0.94, 1.08, 1.22, 1.36] }  // ИЗБАЧ: HOUSE_CONVERGE — хранитель порога, смешивает почерк всех четверых и впервые перекрывает низ поля разом
	}
};

const ENEMY_TYPES = {

	enem11: {
        image: 'images/enemies/regions/1_smesh_les/lvl14/11.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem22: {
        image: 'images/enemies/regions/1_smesh_les/lvl14/22.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem33: {
        image: 'images/enemies/regions/1_smesh_les/lvl14/33.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem44: {
        image: 'images/enemies/regions/1_smesh_les/lvl14/44.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem55: {
        image: 'images/enemies/regions/1_smesh_les/lvl14/55.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem1: {
		name: 'enem1',
		dispName: 'Баюнище',
		image: 'images/enemies/regions/1_smesh_les/lvl14/1.webp',
		baseHP: 2600 + (2600 * factorChar),
		baseSpeed: 0,
		baseDamage: 20 + (20 * factorChar),
		spawnWeight: 5,
		baseExp: 200,
		xPos: 36,
		size: '27%',
        deathAnimation: { preset: 'dissolveRise', durationMs: 1400 }
	},

	enem2: {
		name: 'enem2',
		dispName: 'Каркун-Вещун',
		image: 'images/enemies/regions/1_smesh_les/lvl14/2.webp',
		baseHP: 6500 + (6500 * factorChar),
		baseSpeed: 0,
		baseDamage: 22 + (22 * factorChar),
		spawnWeight: 15,
		baseExp: 320,
		xPos: 36,
		size: '25%',
        deathAnimation: { preset: 'ashFade', durationMs: 1250 }
	},

	enem3: {
		name: 'enem3',
		dispName: 'Цепняк',
		image: 'images/enemies/regions/1_smesh_les/lvl14/3.webp',
		baseHP: 11500 + (11500 * factorChar),
		baseSpeed: 0,
		baseDamage: 24 + (24 * factorChar),
		spawnWeight: 20,
		baseExp: 430,
		xPos: 50,
		size: '26%',
        deathAnimation: { preset: 'crumbleShake', durationMs: 1350 }
	},

	enem4: {
		name: 'enem4',
		dispName: 'Ступолёт',
		image: 'images/enemies/regions/1_smesh_les/lvl14/4.webp',
		baseHP: 18500 + (18500 * factorChar),
		baseSpeed: 0,
		baseDamage: 26 + (26 * factorChar),
		spawnWeight: 10,
		baseExp: 560,
		xPos: 38,
		size: '23%',
        deathAnimation: { preset: 'spinAway', durationMs: 1300 }
	},

	enem5: {
		name: 'enem5',
		dispName: 'Избач',
		image: 'images/enemies/regions/1_smesh_les/lvl14/5.webp',
		baseHP: 28000 + (28000 * factorChar),
		baseSpeed: 0,
		baseDamage: 28 + (28 * factorChar),
		spawnWeight: 5,
		baseExp: 0,
		xPos: 50,
		size: '29%',
        deathAnimation: { preset: 'heavySink', durationMs: 1550 }
	}
};

// Урон по проверенной лестнице light/medium/heavy — та же, что и на соседних уровнях.
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
		heavy: Math.round(ENEMY_TYPES.enem5.baseDamage * 0.62)
	}
};

let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
let timeNextBoss = 5;
const bossInterval = 5;

// Уровень 14 — Дозор Бабы-яги. Архетипы: круги из центра / дуга по периметру /
// низкий забег с одного бока / направленный пролёт метлы / хранитель порога,
// который впервые на уровне перекрывает всю нижнюю полосу разом.
const bossAbilities = [
	// ===== Баюнище: CENTER_OUT_BELLS — звон расходится кругами из центра =====
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 42, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 5 },  //0 центр, медленный звон
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 34, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 7 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 34, customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 8 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 26, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 11 }, //3
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 26, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 12 }, //4
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 18, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 14 }, //5
	{ boss: 'enem1', type: 'enem11', xPos: 82, yPos: 18, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 15 }, //6
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 14, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 15 }, //7 язык колокола
	{ boss: 'enem1', type: 'enem11', xPos: 36, yPos: 7,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 21 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 64, yPos: 6,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 23 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 48, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 4 },  //10
	{ boss: 'enem1', type: 'enem11', xPos: 84, yPos: 48, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 6 },  //11
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 5,  customHP: 1, customDamage: attackDamage.enem1.light,  customSpeed: 25 }, //12 быстрый бой часов
	{ boss: 'enem1', type: 'enem11', xPos: 26, yPos: 20, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 13 }, //13
	{ boss: 'enem1', type: 'enem11', xPos: 74, yPos: 20, customHP: 1, customDamage: attackDamage.enem1.medium, customSpeed: 15 }, //14
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 30, customHP: 1, customDamage: attackDamage.enem1.heavy,  customSpeed: 9 },  //15 ложный сон → удар

	// ===== Каркун-Вещун: PERIMETER_FLIGHT — одна дуга поля за серию =====
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 8,  customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 18 }, //0 верх слева
	{ boss: 'enem2', type: 'enem22', xPos: 42, yPos: 6,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 22 }, //1
	{ boss: 'enem2', type: 'enem22', xPos: 78, yPos: 7,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 24 }, //2 верх справа
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 18, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 15 }, //3
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 34, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 12 }, //4
	{ boss: 'enem2', type: 'enem22', xPos: 78, yPos: 48, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 7 },  //5
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 50, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 5 },  //6 низ центра
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 48, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 8 },  //7
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 34, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 13 }, //8
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 18, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 15 }, //9
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 9,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 20 }, //10
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 23 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 28, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 11 }, //12
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 28, customHP: 1, customDamage: attackDamage.enem2.medium, customSpeed: 14 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 5,  customHP: 1, customDamage: attackDamage.enem2.light,  customSpeed: 25 }, //14 резкий крик
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 32, customHP: 1, customDamage: attackDamage.enem2.heavy,  customSpeed: 9 },  //15

	// ===== Цепняк: CHAIN_CHARGE — низкий забег с одного бока, редкий центр =====
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 48, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 5 },  //0 выпад слева, у земли
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 42, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 7 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 34, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 9 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 26, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 12 }, //3
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 11, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 16 }, //4
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 6,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 24 }, //5 финальный бросок слева
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 48, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 5 },  //6 выпад справа, у земли
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 42, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 7 },  //7
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 34, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 9 },  //8
	{ boss: 'enem3', type: 'enem33', xPos: 78, yPos: 26, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 12 }, //9
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 11, customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 16 }, //10
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 6,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 23 }, //11 финальный бросок справа
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 44, customHP: 1, customDamage: attackDamage.enem3.heavy,  customSpeed: 4 },  //12 редкий тяжёлый бросок из центра
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 8,  customHP: 1, customDamage: attackDamage.enem3.light,  customSpeed: 21 }, //13 резкий бросок из центра
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 30, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 10 }, //14
	{ boss: 'enem3', type: 'enem33', xPos: 65, yPos: 30, customHP: 1, customDamage: attackDamage.enem3.medium, customSpeed: 10 }, //15

	// ===== Ступолёт: BROOM_SWEEP — серия имеет одно направление и выход =====
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 18, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 12 }, //0 L→R
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 15, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 14 }, //1
	{ boss: 'enem4', type: 'enem44', xPos: 48, yPos: 12, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 17 }, //2
	{ boss: 'enem4', type: 'enem44', xPos: 66, yPos: 9,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 21 }, //3
	{ boss: 'enem4', type: 'enem44', xPos: 84, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 24 }, //4
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 20, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 11 }, //5 R→L
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 16, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 15 }, //6
	{ boss: 'enem4', type: 'enem44', xPos: 52, yPos: 12, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 18 }, //7
	{ boss: 'enem4', type: 'enem44', xPos: 34, yPos: 8,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 22 }, //8
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 26 }, //9
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 46, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 5 },  //10 пыль после пролёта
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 44, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 6 },  //11
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 46, customHP: 1, customDamage: attackDamage.enem4.medium, customSpeed: 7 },  //12
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 28, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 10 }, //13 ложный старт
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 28, customHP: 1, customDamage: attackDamage.enem4.heavy,  customSpeed: 13 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 6,  customHP: 1, customDamage: attackDamage.enem4.light,  customSpeed: 25 }, //15 быстрый таран

	// ===== Избач: HOUSE_CONVERGE — хранитель порога, впервые перекрывает низ поля разом =====
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 40, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 6 },  //0 эхо Баюнища: круг из центра
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 30, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 9 },  //1 эхо Каркуна: дуга
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 30, customHP: 1, customDamage: attackDamage.enem5.medium, customSpeed: 9 },  //2
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 44, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 6 },  //3 эхо Цепняка: выпад слева
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 44, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 6 },  //4 эхо Цепняка: выпад справа
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 16, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 15 }, //5 эхо Ступолёта: пролёт
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 15, customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 16 }, //6
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 11, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 18 }, //7 тяжёлый удар двери-клюва
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 8,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 21 }, //8
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 7,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 22 }, //9
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 5,  customHP: 1, customDamage: attackDamage.enem5.light,  customSpeed: 26 }, //10 самый резкий рывок избы
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //11 нижний ряд: начало полного прохода
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //12
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //14
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 48, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 4 },  //15 конец ряда — изба протопала всю ширину поля
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: attackDamage.enem5.heavy,  customSpeed: 12 } //16 неожиданный удар из центра после прохода
];

const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 340, bossDelayAbDop: 6000 }, // спокойные круги с передышкой
	{ boss: 'enem2', bossDelayAb: 300, bossDelayAbDop: 5500 }, // отдельные дуги, не весь периметр
	{ boss: 'enem3', bossDelayAb: 310, bossDelayAbDop: 5400 }, // забег и долгая пауза перед новым рывком
	{ boss: 'enem4', bossDelayAb: 290, bossDelayAbDop: 5200 }, // быстрый, но малый урон и одно направление
	{ boss: 'enem5', bossDelayAb: 250, bossDelayAbDop: 4200 }, // финал: плотнее всех, но телеграф честный
];

const bossAbilitiesDop = [
	// Баюнище — CENTER_OUT_BELLS
	{ boss: 'enem1', indexAbilities: [0, 1, 2] },
	{ boss: 'enem1', indexAbilities: [1, 2, 3, 4] },
	{ boss: 'enem1', indexAbilities: [8, 9] },
	{ boss: 'enem1', indexAbilities: [10, 11] },
	{ boss: 'enem1', indexAbilities: [15, 7, 12] }, // честный поворот: сон → язык → быстрый бой
	{ boss: 'enem1', indexAbilities: [3, 5, 8] },
	{ boss: 'enem1', indexAbilities: [4, 6, 9, 0] },
	{ boss: 'enem1', indexAbilities: [0, 3, 4, 8, 9] },

	// Каркун-Вещун — PERIMETER_FLIGHT
	{ boss: 'enem2', indexAbilities: [0, 10] },
	{ boss: 'enem2', indexAbilities: [2, 3, 4] },
	{ boss: 'enem2', indexAbilities: [5, 6, 7] },
	{ boss: 'enem2', indexAbilities: [8, 9, 0] },
	{ boss: 'enem2', indexAbilities: [10, 14] },
	{ boss: 'enem2', indexAbilities: [4, 12, 15, 14] },
	{ boss: 'enem2', indexAbilities: [7, 8, 13, 0] },
	{ boss: 'enem2', indexAbilities: [0, 1, 3, 5, 6] }, // полукруг, противоположная сторона свободна

	// Цепняк — CHAIN_CHARGE
	{ boss: 'enem3', indexAbilities: [0] },
	{ boss: 'enem3', indexAbilities: [6] },
	{ boss: 'enem3', indexAbilities: [0, 6] }, // обе стороны разом
	{ boss: 'enem3', indexAbilities: [0, 1, 2] }, // левый забег
	{ boss: 'enem3', indexAbilities: [6, 7, 8] }, // правый забег
	{ boss: 'enem3', indexAbilities: [12, 14, 15] }, // ритмическая: тяжёлый центр → два коротких боковых выпада
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5] }, // опасная сигнатурная: полный левый забег с резким финалом
	{ boss: 'enem3', indexAbilities: [9, 10, 11, 13] }, // смешанная поздняя: правый забег + резкий центр

	// Ступолёт — BROOM_SWEEP
	{ boss: 'enem4', indexAbilities: [0, 1, 2] },
	{ boss: 'enem4', indexAbilities: [5, 6, 7] },
	{ boss: 'enem4', indexAbilities: [3, 4] },
	{ boss: 'enem4', indexAbilities: [8, 9] },
	{ boss: 'enem4', indexAbilities: [10, 11, 12] },
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4] },
	{ boss: 'enem4', indexAbilities: [5, 6, 7, 8, 9] },
	{ boss: 'enem4', indexAbilities: [13, 14, 15] }, // два ложных старта → таран сверху

	// Избач — HOUSE_CONVERGE. Хранитель порога смешивает приёмы четырёх предыдущих.
	{ boss: 'enem5', indexAbilities: [0] },
	{ boss: 'enem5', indexAbilities: [7] },
	{ boss: 'enem5', indexAbilities: [0, 7] },
	{ boss: 'enem5', indexAbilities: [1, 2, 3, 4] }, // средняя: эхо дуги и боковых выпадов
	{ boss: 'enem5', indexAbilities: [5, 6] }, // средняя: пролёт слева направо
	{ boss: 'enem5', indexAbilities: [8, 9, 10] }, // ритмическая: нарастающая быстрая тройка
	{ boss: 'enem5', indexAbilities: [11, 12, 13, 14, 15, 16], damageMultiplier: 0.50 }, // сигнатура: полный проход стены → удар из центра
	{ boss: 'enem5', indexAbilities: [0, 3, 5, 8, 16] }, // смешанная поздняя: мотивы всех четырёх хранителей уровня
];

// Лорные названия связок. Уровень 14 — свита Бабы-Яги: Баюнище (Кот-Баюн, усыпляющий),
// Каркун-Вещун (вещий ворон), Цепняк (цепной дух), Ступолёт (ступа с метлой), Избач
// (домовой-страж порога).
const UPGRADE_VARIANT_NAMES = {
    enem1: {
        variant1: 'Мурлычущий удар', variant2: 'Гипнотический коготь', variant3: 'Баюнья сила',
        variant4: 'Сказочная шёрстка', variant5: 'Меткий мурлык', variant6: 'Едкая колыбельная',
        variant7: 'Баюнья мощь', variant8: 'Плотная шерсть', variant9: 'Круги мурлыканья',
        variant10: 'Живучий Баюн', variant11: 'Цепкий коготь', variant12: 'Мурлык и в дрёму',
        variant13: 'Толстая шерсть', variant14: 'Неутомимая колыбельная', variant15: 'Пружинистый прыжок',
        variant16: 'Меткий гипноз', variant17: 'Баюнья хватка', variant18: 'Усыпляющий взгляд',
        variant19: 'Мгновенный гипноз', variant20: 'Сказочный дух', variant21: 'Стойкая к пробуждению',
        variant22: 'Юркий Баюн', variant23: 'Баюнья стойкость', variant24: 'Чуткое мурлыканье',
        variant25: 'Ускользающий сон', variant26: 'Дикое мурлыканье', variant27: 'Мощь колыбельной',
        variant28: 'Внезапный гипноз', variant29: 'Каменный сон', variant30: 'Волны сна',
        variant31: 'Баюний рывок', variant32: 'Живучая шерсть', variant33: 'Круг сна',
        variant34: 'Баюнья прыть', variant35: 'Баюнья выносливость'
    },
    enem2: {
        variant1: 'Вещий удар', variant2: 'Пророческий клюв', variant3: 'Вещая сила',
        variant4: 'Чёрное оперение', variant5: 'Меткий облёт', variant6: 'Едкий грай',
        variant7: 'Вещая мощь', variant8: 'Плотные чёрные перья', variant9: 'Дуга полёта',
        variant10: 'Живучий Каркун', variant11: 'Цепкий клюв', variant12: 'Грай и в облёт',
        variant13: 'Толстое оперение', variant14: 'Неутомимый вещун', variant15: 'Пружинистый взлёт',
        variant16: 'Меткий грай', variant17: 'Вещая хватка', variant18: 'Всевидящий взгляд',
        variant19: 'Мгновенный облёт', variant20: 'Пророческий нюх', variant21: 'Стойкое оперение',
        variant22: 'Юркий Каркун', variant23: 'Вещая стойкость', variant24: 'Ухо к судьбе',
        variant25: 'Ускользающая дуга', variant26: 'Дикий грай', variant27: 'Мощь клюва',
        variant28: 'Внезапный облёт', variant29: 'Каменное пророчество', variant30: 'Разросшаяся дуга',
        variant31: 'Вещий рывок', variant32: 'Живучее оперение', variant33: 'Неутомимый облёт',
        variant34: 'Вещая прыть', variant35: 'Вещая выносливость'
    },
    enem3: {
        variant1: 'Цепной удар', variant2: 'Ржавое звено', variant3: 'Цепная сила',
        variant4: 'Кандальная защита', variant5: 'Рывок цепи', variant6: 'Едкая ржавчина',
        variant7: 'Цепная мощь', variant8: 'Прочные кандалы', variant9: 'Низкий забег',
        variant10: 'Живучий Цепняк', variant11: 'Цепкое звено', variant12: 'Рывок и во тьму',
        variant13: 'Толстые кандалы', variant14: 'Неутомимый Цепняк', variant15: 'Пружинистая цепь',
        variant16: 'Меткое звено', variant17: 'Цепная хватка', variant18: 'Звенящий взгляд',
        variant19: 'Рывок цепи вмиг', variant20: 'Ржавый дух', variant21: 'Стойкие кандалы',
        variant22: 'Юркий Цепняк', variant23: 'Цепная стойкость', variant24: 'Чуткое звено',
        variant25: 'Ускользающая цепь', variant26: 'Дикий рывок', variant27: 'Мощь ржавчины',
        variant28: 'Внезапный рывок', variant29: 'Каменные кандалы', variant30: 'Разросшаяся цепь',
        variant31: 'Цепной рывок', variant32: 'Живучие кандалы', variant33: 'Неутомимый забег',
        variant34: 'Цепная прыть', variant35: 'Цепная выносливость'
    },
    enem4: {
        variant1: 'Ступный удар', variant2: 'Острый край ступы', variant3: 'Ступная сила',
        variant4: 'Чугунная броня', variant5: 'Взмах метлы', variant6: 'Зола из ступы',
        variant7: 'Ступная мощь', variant8: 'Прочный чугун', variant9: 'Пролёт метлой',
        variant10: 'Живучий Ступолёт', variant11: 'Цепкая метла', variant12: 'Взмах и в облака',
        variant13: 'Толстый чугун', variant14: 'Неутомимый полёт', variant15: 'Взлёт ступы',
        variant16: 'Меткий взмах', variant17: 'Ступная хватка', variant18: 'Взгляд из ступы',
        variant19: 'Мгновенный пролёт', variant20: 'Ветреный дух', variant21: 'Стойкий чугун',
        variant22: 'Юркий Ступолёт', variant23: 'Ступная стойкость', variant24: 'Чуткая метла',
        variant25: 'Ускользающий пролёт', variant26: 'Дикий полёт', variant27: 'Мощь золы',
        variant28: 'Внезапный пролёт', variant29: 'Каменный чугун', variant30: 'Размах метлы',
        variant31: 'Ступный рывок', variant32: 'Живучий чугун', variant33: 'Неутомимый пролёт',
        variant34: 'Ступная прыть', variant35: 'Ступная выносливость'
    },
    enem5: {
        variant1: 'Топот курьих ног', variant2: 'Резной коготь', variant3: 'Избяная сила',
        variant4: 'Бревенчатая защита', variant5: 'Разворот на ногах', variant6: 'Дым из трубы',
        variant7: 'Избяная мощь', variant8: 'Прочные брёвна', variant9: 'Рывок на курьих ногах',
        variant10: 'Живучий сруб', variant11: 'Цепкий коготь', variant12: 'Топот и приседание',
        variant13: 'Толстые брёвна', variant14: 'Страж порога', variant15: 'Скрип половиц',
        variant16: 'Меткий удар крыльцом', variant17: 'Когтистая хватка', variant18: 'Взгляд окон-глаз',
        variant19: 'Мгновенный разворот', variant20: 'Домовой дух сруба', variant21: 'Стойкие брёвна',
        variant22: 'Юркий на курьих ногах', variant23: 'Избяная стойкость', variant24: 'Чуткий скрип крыльца',
        variant25: 'Ускользающий разворот', variant26: 'Дикий топот', variant27: 'Мощь дыма из трубы',
        variant28: 'Внезапный разворот', variant29: 'Каменный фундамент', variant30: 'Разросшийся сруб',
        variant31: 'Рывок на когтях', variant32: 'Живучие брёвна', variant33: 'Неутомимый топот',
        variant34: 'Избяная прыть', variant35: 'Избяная выносливость'
    }
};
