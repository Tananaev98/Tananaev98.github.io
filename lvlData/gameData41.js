// Уровень 41 «Двор и ворота» — первый уровень области V «Беспокойная деревня».
// Баланс (HP боссов, damageMultiplier, фазы) НЕ пересчитывался заново — он уже
// был посчитан для этой точки кампании по формулам проекта (см. историю в
// прежней версии этого файла, ревизия-заглушка), тема/расстановка атак ниже
// просто заменяет собой уровень-1-заглушку на настоящее наполнение области.
//
// НОВОЕ: этот уровень — первая демонстрация региональной механики «Атакующая
// цепь» (bossCombatConfig.attackChains, реализация в game.js —
// linkAttackChain/syncChainLink/resolveChainMember). Когда босс спавнит комбо
// длиной 3-7 атак (см. индексAbilities ниже, помечены «← цепь»), все они
// связываются в цепь: убить можно только голову (самое раннее живое звено),
// остальные временно неуязвимы для удара игрока, но всё ещё могут сами
// долететь до героя — если долетает не голова, цепь рвётся в этой точке на
// два самостоятельных куска. Каждая атака по-прежнему умирает ровно с одного
// удара, когда бьётся именно голова — никакая другая часть боевой формулы не
// менялась ради этого.
//
// Роспись персонажей (images/enemies/regions/5_dom_dvor/lvl41/) подобрана по
// РЕАЛЬНО сгенерированному арту, а не 1:1 по черновому списку из "идеи по
// уровням.txt" — там перечислена "Воротная цепь" отдельным персонажем, но
// готовой картинки именно самостоятельного цепного монстра в папке нет (есть
// цепь как аксессуар у пса). Вместо неё использован драчливый селезень (не
// гусь — зелёная голова, белое кольцо на шее, плоский клюв, как у кряквы) —
// тоже готовый арт в этой же папке, тематически двор/птичник ничуть не хуже.
let lvlNumber = 41;

// Полный профиль боя уровня: движок только исполняет эти настройки.
const bossCombatConfig = {
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 1.00,
	damageMultiplier: 1.782,
	minWaveDelay: 2600,
	minShotDelay: 175,
	minTelegraphMs: 600,
	// Область V целиком: см. game.js executeBossEvent — комбо длиной 3-7 атак
	// на этом уровне автоматически становятся «атакующей цепью».
	attackChains: true,
	phases: [
		{ phase: 1, minHp: 0.66, cadence: 1.00, speed: 0.94, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.06, maxActiveAttacks: 11, excludedDangerousCombos: 2 },
		{ phase: 2, minHp: 0.31, cadence: 0.88, speed: 1.03, damage: 1.07, telegraphMultiplier: 0.96, surpriseChance: 0.12, maxActiveAttacks: 13 },
		{ phase: 3, minHp: 0.00, cadence: 0.76, speed: 1.10, damage: 1.14, telegraphMultiplier: 0.90, surpriseChance: 0.20, maxActiveAttacks: 15 }
	],
	bosses: {
		enem1: { movementStyle: 'lateRush',   cadence: 1.03, telegraphMs: 920, speedMultiplier: 0.94, damageMultiplier: 0.92, speedVariance: [0.78, 0.88, 0.98, 1.08, 1.18] }, // Бобик: спокойное натяжение цепи → внезапный рывок
		enem2: { movementStyle: 'weave',      cadence: 1.00, telegraphMs: 860, speedMultiplier: 0.98, damageMultiplier: 0.97, speedVariance: [0.90, 0.96, 1.02, 1.08, 1.14] }, // Клевач: мечется из стороны в сторону
		enem3: { movementStyle: 'accelerate', cadence: 1.18, telegraphMs: 1080, speedMultiplier: 0.78, damageMultiplier: 1.18, speedVariance: [0.80, 0.86, 0.93, 1.00, 1.08] }, // Растрёпа: набирает мах, будто разгоняя пыль
		enem4: { movementStyle: 'pause',      cadence: 0.90, telegraphMs: 720, speedMultiplier: 1.08, damageMultiplier: 1.02, speedVariance: [0.88, 0.98, 1.08, 1.16, 1.22] }, // Фонарница: мерные обходы дозором, со стоп-кадром на фонаре
		enem5: { movementStyle: 'drift',      cadence: 0.82, telegraphMs: 780, speedMultiplier: 1.05, damageMultiplier: 1.10, speedVariance: [0.86, 0.94, 1.03, 1.12, 1.20] } // Коряга: неспешно, но неотвратимо идёт по периметру
	}
};

const ENEMY_TYPES = {

	enem11: {
        name: 'enem11',
        image: 'images/enemies/regions/5_dom_dvor/lvl41/11.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem22: {
        name: 'enem22',
        image: 'images/enemies/regions/5_dom_dvor/lvl41/22.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem33: {
        name: 'enem33',
        image: 'images/enemies/regions/5_dom_dvor/lvl41/33.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem44: {
        name: 'enem44',
        image: 'images/enemies/regions/5_dom_dvor/lvl41/44.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

	enem55: {
        name: 'enem55',
        image: 'images/enemies/regions/5_dom_dvor/lvl41/55.webp',
        baseHP: 100,
        baseSpeed: 0.020,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 0,
        size: '6%'
    },

    enem1: {
        name: 'enem1',
		dispName: 'Бобик',
        image: 'images/enemies/regions/5_dom_dvor/lvl41/1.webp',
        baseHP: 7124,
        baseSpeed: 0,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 250,
        size: '25%',
        deathAnimation: { preset: 'chainCollapse', durationMs: 1100 }
    },
    enem2: {
        name: 'enem2',
		dispName: 'Клевач',
        image: 'images/enemies/regions/5_dom_dvor/lvl41/2.webp',
        baseHP: 42747,
        baseSpeed: 0,
        baseDamage: 22,
        spawnWeight: 15,
		baseExp: 400,
        size: '25%',
        deathAnimation: { preset: 'featherBurst', durationMs: 1000 }
    },
    enem3: {
        name: 'enem3',
		dispName: 'Растрёпа',
        image: 'images/enemies/regions/5_dom_dvor/lvl41/3.webp',
        baseHP: 56995,
        baseSpeed: 0,
        baseDamage: 24,
        spawnWeight: 20,
		baseExp: 600,
        size: '25%',
        deathAnimation: { preset: 'strawScatter', durationMs: 1400 }
    },

	enem4: {
        name: 'enem4',
		dispName: 'Фонарница',
        image: 'images/enemies/regions/5_dom_dvor/lvl41/4.webp',
        baseHP: 170986,
        baseSpeed: 0,
        baseDamage: 26,
        spawnWeight: 10,
		baseExp: 800,
        size: '25%',
        deathAnimation: { preset: 'lanternDrop', durationMs: 1200 }
    },

	enem5: {
        name: 'enem5',
		dispName: 'Коряга',
        image: 'images/enemies/regions/5_dom_dvor/lvl41/5.webp',
        baseHP: 213733,
        baseSpeed: 0,
        baseDamage: 28,
        spawnWeight: 5,
		baseExp: 0,
        size: '25%',
        deathAnimation: { preset: 'timberFall', durationMs: 1300 }
    },


};

 let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
 let timeNextBoss = 5;
 const bossInterval = 5;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Уровень 41 — расстановка атак унаследована от уже проверенной (безопасной по
 // экрану) схемы предыдущей версии этого файла, только имена/образы сменены на
 // деревенские — сами xPos/yPos/customSpeed не трогались, чтобы не тащить за
 // собой новый непроверенный баланс сложности вместе с новой темой и новой
 // механикой связанных пар одновременно.
 // Атаки по краям (x≤18 / x≥78) или ниже босса; быстрые (speed≥16) — y≤12.

 const bossAbilities = [
	// ===== Бобик: рывки на цепи с краёв двора =====
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //4
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //5
	// рывки цепи — быстрые скачки сверху
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //6
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 26 }, //7
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 28 }, //10
	// микс: натяжение + рывок
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //11
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //12
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //13
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //14
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //15
	// звенья «атакующей цепи» — раздел 13.7 lvlData/Правила создания уровня.txt:
	// своя xPos на цепь, yPos у самого верха поля, скорость строго невозрастающая
	// вдоль цепи (дублирует клампы game.js CHAIN_MAX_HEAD_SPEED/CHAIN_MAX_SPAWN_Y —
	// сами данные написаны так, чтобы кламп в норме ничего не менял).
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //17 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //18 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //20 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //21 цепь-B звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //22 цепь-B звено 4
	{ boss: 'enem1', type: 'enem11', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //23 цепь-B звено 5

	// ===== Клевач: мечется парами туда-сюда =====
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //2
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //3
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //4
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //5
	{ boss: 'enem2', type: 'enem22', xPos: 8,  yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //6
	{ boss: 'enem2', type: 'enem22', xPos: 92, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //7
	// хлопанье крыльями — рывок с обоих краёв
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 26 }, //9
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //10
	// микс: пара + рывок
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //12
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //14
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //15
	// звенья «атакующей цепи» — раздел 13.7 lvlData/Правила создания уровня.txt.
	// Зигзаг — xPos качается вокруг центра (звенья временно разнесены, поэтому
	// разная xPos не создаёт наложения, см. раздел 13.7); лёгкое падение скорости.
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16 }, //17 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //18 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 42, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17 }, //20 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, //21 цепь-B звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 42, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //22 цепь-B звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //23 цепь-B звено 5

	// ===== Растрёпа: гонит пыль снизу, редкий взмах сверху =====
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 28, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 44, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //3
	{ boss: 'enem3', type: 'enem33', xPos: 76, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //4
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //5
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //6
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //7
	// взмах — два быстрых сверху (естественная 2-sync пара этого уровня, см. bossAbilitiesDop)
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20 }, //8
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24 }, //9
	// микс: гонит пыль + взмах
	{ boss: 'enem3', type: 'enem33', xPos: 36, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //10
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //11
	{ boss: 'enem3', type: 'enem33', xPos: 72, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //12
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //13
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //14
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — раздел 13.7 lvlData/Правила создания уровня.txt.
	// Диагональ — xPos ползёт в одну сторону (тяжёлый сметающий след), скорость
	// заметно падает к хвосту (тяжесть, а не рывок).
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, //20 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //21 цепь-B звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 9 },  //22 цепь-B звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 },  //23 цепь-B звено 5

	// ===== Фонарница: дозор с фонарём и связкой ключей =====
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //2
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //3
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //4
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //5
	// обход заглядывает и на другую сторону двора
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //6
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //7
	// резкий оклик — 4 справа сверху
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //8
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 28 }, //9
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //10
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 26 }, //11
	// микс: левый обход + правый оклик
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //12
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //13
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //14
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20 }, //15
	// звенья «атакующей цепи» — раздел 13.7 lvlData/Правила создания уровня.txt.
	// Нервные скачки — крупные непредсказуемые прыжки xPos (дозорная мечется),
	// скорость почти не падает (не даёт выдохнуть).
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 17 }, //17 цепь-A звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, //18 цепь-A звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 75, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 17 }, //20 цепь-B звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, //21 цепь-B звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //22 цепь-B звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //23 цепь-B звено 5

	// ===== Коряга: неспешный, но неотвратимый обход периметра =====
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //0
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //1
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //2
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //3
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //4
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //5
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //6
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //7
	// решительный шаг — 3 быстрых сверху
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //9
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //10
	// микс: обход + рывок оглоблей
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //11
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //12
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20 }, //13
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //14
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //15
	// звенья «атакующей цепи» — раздел 13.7 lvlData/Правила создания уровня.txt.
	// Широкая дуга финального босса — плавный размашистый след через почти всё
	// поле, у самой длинной (7) цепи — ещё и обратный крюк в конце (разворот).
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16 }, //17 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //18 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //19 цепь-A звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова, максимум длины 7)
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17 }, //21 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, //22 цепь-B звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //23 цепь-B звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //24 цепь-B звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 9 },  //25 цепь-B звено 6
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7 },  //26 цепь-B звено 7
];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 280, bossDelayAbDop: 5200 }, // рвётся с цепи часто
	{ boss: 'enem2', bossDelayAb: 320, bossDelayAbDop: 5600 }, // мечется ритмично
	{ boss: 'enem3', bossDelayAb: 380, bossDelayAbDop: 6400 }, // тяжёлая, долгая пауза между взмахами
	{ boss: 'enem4', bossDelayAb: 260, bossDelayAbDop: 5000 }, // резкий оклик дозорной
	{ boss: 'enem5', bossDelayAb: 240, bossDelayAbDop: 4800 }, // идёт без остановки
];

 const bossAbilitiesDop = [
	// Бобик — включая 2 «атакующие цепи»: выделенные звенья (16-23, см.
	// bossAbilities выше) — своя xPos на цепь, невозрастающая скорость, появление
	// у самого верха поля (раздел 13.7 lvlData/Правила создания уровня.txt).
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem1', indexAbilities: [6, 7, 8, 9, 10] },
	{ boss: 'enem1', indexAbilities: [6, 8, 10, 7, 9] },
	{ boss: 'enem1', indexAbilities: [0, 6, 2, 9] },
	{ boss: 'enem1', indexAbilities: [4, 5, 13, 14] },
	{ boss: 'enem1', indexAbilities: [11, 13, 12, 14, 15] },
	{ boss: 'enem1', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь (3)
	{ boss: 'enem1', indexAbilities: [19, 20, 21, 22, 23], isChain: true }, // ← цепь (5)

	// Клевач — 2 цепи (у этого босса раньше не было вообще никакого
	// парного/цепного комбо — механика физически не могла сработать в бою с ним).
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4, 5] },
	{ boss: 'enem2', indexAbilities: [0, 1, 6, 7] },
	{ boss: 'enem2', indexAbilities: [8, 9, 10] },
	{ boss: 'enem2', indexAbilities: [8, 10, 9] },
	{ boss: 'enem2', indexAbilities: [2, 8, 3, 9] },
	{ boss: 'enem2', indexAbilities: [11, 13, 12, 14, 15] },
	{ boss: 'enem2', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь (3)
	{ boss: 'enem2', indexAbilities: [19, 20, 21, 22, 23], isChain: true }, // ← цепь (5)

	// Растрёпа — 2 цепи
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4] },
	{ boss: 'enem3', indexAbilities: [0, 2, 4, 5, 6] },
	{ boss: 'enem3', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь (3)
	{ boss: 'enem3', indexAbilities: [5, 8, 6, 9] },
	{ boss: 'enem3', indexAbilities: [10, 11, 12, 13] },
	{ boss: 'enem3', indexAbilities: [1, 7, 11, 14, 15] },
	{ boss: 'enem3', indexAbilities: [0, 2, 4] },
	{ boss: 'enem3', indexAbilities: [19, 20, 21, 22, 23], isChain: true }, // ← цепь (5)

	// Фонарница — 2 цепи
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4, 5] },
	{ boss: 'enem4', indexAbilities: [0, 2, 4, 6] },
	{ boss: 'enem4', indexAbilities: [8, 9, 10, 11] },
	{ boss: 'enem4', indexAbilities: [8, 10, 9, 11] },
	{ boss: 'enem4', indexAbilities: [1, 8, 5, 11] },
	{ boss: 'enem4', indexAbilities: [12, 13, 14, 15] },
	{ boss: 'enem4', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь (3)
	{ boss: 'enem4', indexAbilities: [19, 20, 21, 22, 23], isChain: true }, // ← цепь (5)

	// Коряга — финальный босс уровня: одна цепь-зигзаг через оба фланга
	// (4 звена) и одна на весь допустимый максимум (7 звеньев) — самый длинный
	// и самый запоминающийся бой уровня получает и самую длинную цепь игры.
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem5', indexAbilities: [4, 5, 6, 7] },
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7] },
	{ boss: 'enem5', indexAbilities: [8, 9, 10] },
	{ boss: 'enem5', indexAbilities: [0, 8, 4, 9] },
	{ boss: 'enem5', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь (4)
	{ boss: 'enem5', indexAbilities: [20, 21, 22, 23, 24, 25, 26], isChain: true }, // ← цепь (7, максимум)
	{ boss: 'enem5', indexAbilities: [11, 13, 12, 14, 15] },
];

// Лорные названия связок временных улучшений (см. UPGRADE_VARIANTS/
// getUpgradeVariantDisplayName в game.js) — «игрок забирает часть силы побеждённого
// босса», поэтому названия это свойства/черты, а не предметы. variantN — стабильный id
// из движка (порядок комбинаторного перебора статов: damage, critChance, critMultiplier,
// woundChance, heroHP, heroDefense, fireRate — i<j<k). Полностью авторский список на
// каждого из 5 боссов по отдельности (не общий трейт-список с падежом, по правилу
// проекта) — свой словарь образов на боссу (цепь/ошейник у пса, клюв/перо у селезня,
// прут/черенок у метлы, ключи/фонарь у сторожихи, кора/оглобля у хозяина), при этом
// адъектив на одной и той же позиции у всех пятерых может рифмоваться (как и в
// gameData1.js между зайцем/волком) — это ЖЕЛАТЕЛЬНО, отражает семантику одного и
// того же combo статов, а не шаблонность.
const UPGRADE_VARIANT_NAMES = {
    // Бобик — сторожевой зверь: цепь, ошейник, клык, загривок, рывок.
    enem1: {
        variant1: 'Цепной кураж', variant2: 'Стальная хватка', variant3: 'Ошейник-страж',
        variant4: 'Рваная цепь', variant5: 'Меткий бросок', variant6: 'Бешеный оскал',
        variant7: 'Цепной норов', variant8: 'Крепкий загривок', variant9: 'Ударный рывок',
        variant10: 'Живучий клык', variant11: 'Колючий загривок', variant12: 'Кусь и на цепь',
        variant13: 'Толстый загривок', variant14: 'Неутомимый рывок', variant15: 'Пружинистый скачок',
        variant16: 'Острый клык, зоркий нюх', variant17: 'Цепная удача', variant18: 'Верный прицел',
        variant19: 'Молниеносный бросок', variant20: 'Живучий нюх', variant21: 'Мёртвая хватка',
        variant22: 'Юркий укус', variant23: 'Цепная стойкость', variant24: 'Длинная цепь, зоркий глаз',
        variant25: 'Ускользающий рывок', variant26: 'Дикий норов', variant27: 'Стойкий укус',
        variant28: 'Укусил и на цепь', variant29: 'Крепкий пёс', variant30: 'Рвущая мощь',
        variant31: 'Рывок с оглядкой', variant32: 'Живучая шкура', variant33: 'Юркий и цепкий',
        variant34: 'Цепная прыть', variant35: 'Быстрые лапы, крепкий загривок'
    },
    // Клевач — драчливый селезень (кряква): клюв, крыло, перо, кряканье, щип.
    enem2: {
        variant1: 'Утиный кураж', variant2: 'Клювастый удар', variant3: 'Стальные крылья',
        variant4: 'Шипящий наскок', variant5: 'Меткий щип', variant6: 'Бешеное кряканье',
        variant7: 'Утиное сердце', variant8: 'Крепкое перо', variant9: 'Крылатый удар',
        variant10: 'Живучий забияка', variant11: 'Колючее перо', variant12: 'Щип и в кусты',
        variant13: 'Толстые перья', variant14: 'Неутомимое кряканье', variant15: 'Пружинистый наскок',
        variant16: 'Острый клюв, зоркий глаз', variant17: 'Утиная удача', variant18: 'Верный щип',
        variant19: 'Молниеносный клюв', variant20: 'Чуткий слух', variant21: 'Цепкий коготь',
        variant22: 'Юркий щип', variant23: 'Утиная стойкость', variant24: 'Длинная шея, зоркий глаз',
        variant25: 'Ускользающий наскок', variant26: 'Дикое кряканье', variant27: 'Стойкий клюв',
        variant28: 'Щип и в пруд', variant29: 'Утиный напор', variant30: 'Хлопковая мощь',
        variant31: 'Наскок с оглядкой', variant32: 'Живучее перо', variant33: 'Юркий и шипящий',
        variant34: 'Утиная прыть', variant35: 'Быстрые крылья, крепкое перо'
    },
    // Растрёпа — ожившая утварь: прутья, черенок, пыль, взмах, вихрь.
    enem3: {
        variant1: 'Метельный кураж', variant2: 'Хлёсткий взмах', variant3: 'Прутяная хватка',
        variant4: 'Пыльный вихрь', variant5: 'Меткий мазок', variant6: 'Бешеный замах',
        variant7: 'Метельный норов', variant8: 'Крепкий черенок', variant9: 'Ударный взмах',
        variant10: 'Живучий прут', variant11: 'Колючая солома', variant12: 'Взмах и в пыль',
        variant13: 'Толстый черенок', variant14: 'Неутомимый взмах', variant15: 'Пружинистый мазок',
        variant16: 'Острый прут, меткий глаз', variant17: 'Метельная удача', variant18: 'Верный мазок',
        variant19: 'Молниеносный взмах', variant20: 'Живучая солома', variant21: 'Цепкий прут',
        variant22: 'Юркий мазок', variant23: 'Метельная стойкость', variant24: 'Длинный черенок, меткий глаз',
        variant25: 'Ускользающий взмах', variant26: 'Дикий вихрь', variant27: 'Стойкий прут',
        variant28: 'Взмах и след пылью', variant29: 'Крепкая метла', variant30: 'Пыльная мощь',
        variant31: 'Замах с оглядкой', variant32: 'Живучий черенок', variant33: 'Юркая и хлёсткая',
        variant34: 'Метельная прыть', variant35: 'Быстрые прутья, крепкий черенок'
    },
    // Фонарница — дозорная с фонарём и ключами: обход, оклик, дубинка.
    enem4: {
        variant1: 'Дозорный кураж', variant2: 'Меткий оклик', variant3: 'Связка ключей',
        variant4: 'Фонарный блеск', variant5: 'Меткий удар', variant6: 'Бешеный оклик',
        variant7: 'Дозорный норов', variant8: 'Крепкая хватка', variant9: 'Ударная дубинка',
        variant10: 'Живучий дозор', variant11: 'Колючий взгляд', variant12: 'Оклик и в тень',
        variant13: 'Толстый плащ', variant14: 'Неутомимый дозор', variant15: 'Пружинистый обход',
        variant16: 'Острый взгляд, зоркий глаз', variant17: 'Дозорная удача', variant18: 'Верный оклик',
        variant19: 'Молниеносный оклик', variant20: 'Дозорный нюх', variant21: 'Цепкая хватка ключей',
        variant22: 'Юркий обход', variant23: 'Дозорная стойкость', variant24: 'Долгий обход, зоркий глаз',
        variant25: 'Ускользающий шаг', variant26: 'Дикий оклик', variant27: 'Стойкий дозор',
        variant28: 'Оклик и в дверь', variant29: 'Крепкая сторожиха', variant30: 'Фонарная мощь',
        variant31: 'Обход с оглядкой', variant32: 'Живучий плащ', variant33: 'Юркая и зоркая',
        variant34: 'Дозорная прыть', variant35: 'Быстрый шаг, крепкая хватка'
    },
    // Коряга — статный великан из коры и дерева: оглобля, кряж, поступь.
    enem5: {
        variant1: 'Хозяйский кураж', variant2: 'Дубовая хватка', variant3: 'Оглобля-таран',
        variant4: 'Кряжистый напор', variant5: 'Меткий замах', variant6: 'Бешеный рык',
        variant7: 'Хозяйский норов', variant8: 'Крепкая кора', variant9: 'Ударный замах',
        variant10: 'Живучий хозяин', variant11: 'Колючая кора', variant12: 'Замах наповал',
        variant13: 'Толстая кора', variant14: 'Неутомимый замах', variant15: 'Пружинистый шаг',
        variant16: 'Острый взгляд, тяжёлая рука', variant17: 'Хозяйская удача', variant18: 'Верный замах',
        variant19: 'Молниеносный удар', variant20: 'Хозяйский нюх', variant21: 'Кряжистая хватка',
        variant22: 'Юркий для своих габаритов', variant23: 'Хозяйская стойкость', variant24: 'Тяжёлый шаг, зоркий глаз',
        variant25: 'Ускользающий манёвр', variant26: 'Дикий рык', variant27: 'Стойкий хозяин',
        variant28: 'Замах наповал дважды', variant29: 'Крепкий хозяин', variant30: 'Дубовая мощь',
        variant31: 'Удар с оглядкой', variant32: 'Живучая кора', variant33: 'Неутомимый и грозный',
        variant34: 'Хозяйская прыть', variant35: 'Тяжёлая поступь, крепкая хватка'
    }
};
