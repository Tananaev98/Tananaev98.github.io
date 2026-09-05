// Уровень 42 «Сени» — второй уровень области V «Беспокойная деревня».
// Роспись персонажей подобрана по РЕАЛЬНО сгенерированному арту
// (images/enemies/regions/5_dom_dvor/lvl42/), а не 1:1 по черновому списку из
// "идеи по уровням.txt" — там на пятом месте значился "Сквозняк из щелей", но
// готовая картинка вместо этого показывает ожившую замочную щеколду; остальные
// четыре (половик, тулуп, ключница, привратник) совпали с описанием точно.
// Правило 12 lvlData/Правила создания уровня.txt: картинка — истина, документ
// сверяется под неё, не наоборот.
//
// Область V ЦЕЛИКОМ завязана на «Атакующей цепи» (правило 13.6 того же файла) —
// у КАЖДОГО из пяти противников этого уровня есть минимум 2 isChain-комбо,
// ни один не пропущен (см. bossAbilitiesDop ниже, отмечены «← цепь»).
//
// Баланс (damageMultiplier, фазы) унаследован от уровня 41 без изменений —
// campaignProgress между 41 и 42 меняется незначительно, а значения уровня 41
// уже проверены реальными расчётами (см. историю правок этого файла в чате) и
// безопасны. baseHP у ENEMY_TYPES.enemN — не финальное значение, движок считает
// HP централизованно по кривой кампании (раздел 13.1 правил уровня, game.js
// calculateBossMaxHealth) — здесь только для читаемости данных.
//
// movementStyle подобран по РЕАЛЬНОМУ живому архиву паттернов
// (admin-boss-pattern-panel.html, снят 2026-09-05, кампания 1-41): для каждой
// роли выбран стиль НЕ являющийся текущим лидером по проценту использования —
// сознательная коррекция, а не совпадение (например enem4 у уровня 41 был на
// 'pause', который на тот момент уже лидировал 22% — здесь взят 'weave', 12%).
let lvlNumber = 42;

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
		{ phase: 1, minHp: 0.66, cadence: 1.00, speed: 0.94, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.06, maxActiveAttacks: 11, excludedDangerousCombos: 2 },
		{ phase: 2, minHp: 0.31, cadence: 0.88, speed: 1.03, damage: 1.07, telegraphMultiplier: 0.96, surpriseChance: 0.12, maxActiveAttacks: 13 },
		{ phase: 3, minHp: 0.00, cadence: 0.76, speed: 1.10, damage: 1.14, telegraphMultiplier: 0.90, surpriseChance: 0.20, maxActiveAttacks: 15 }
	],
	bosses: {
		enem1: { movementStyle: 'straight',   cadence: 1.02, telegraphMs: 860,  speedMultiplier: 0.96, damageMultiplier: 0.94, speedVariance: [0.80, 0.90, 1.00, 1.10, 1.20] }, // Щёлкан: CORNERS_ONLY — щёлкает строго по углам дверной коробки
		enem2: { movementStyle: 'wave',       cadence: 0.96, telegraphMs: 800,  speedMultiplier: 1.04, damageMultiplier: 0.98, speedVariance: [0.85, 0.95, 1.05, 1.12, 1.20] }, // Шлёпик: ZIGZAG_NO_WALL — мокрый зигзаг без сплошной стены
		enem3: { movementStyle: 'drift',      cadence: 1.16, telegraphMs: 1020, speedMultiplier: 0.80, damageMultiplier: 1.20, speedVariance: [0.78, 0.88, 0.98, 1.08, 1.16] }, // Тулупыч: BOTTOM_PRESSURE — тяжёлое давление понизу, редкие взмахи рукавов сверху
		enem4: { movementStyle: 'weave',      cadence: 0.86, telegraphMs: 680,  speedMultiplier: 1.14, damageMultiplier: 1.05, speedVariance: [0.88, 0.98, 1.08, 1.16, 1.24] }, // Бренчиха: ASYMMETRY — почти всё с левой (ключевой) руки, редкие уколы справа
		enem5: { movementStyle: 'accelerate', cadence: 0.80, telegraphMs: 700,  speedMultiplier: 1.08, damageMultiplier: 1.14, speedVariance: [0.86, 0.96, 1.06, 1.14, 1.22] }  // Притворник: SEQUENTIAL_CLOSE — зоны закрываются одна за другой, в финале разом
	}
};

const ENEMY_TYPES = {

	enem11: { name: 'enem11', image: 'images/enemies/regions/5_dom_dvor/lvl42/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { name: 'enem22', image: 'images/enemies/regions/5_dom_dvor/lvl42/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { name: 'enem33', image: 'images/enemies/regions/5_dom_dvor/lvl42/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { name: 'enem44', image: 'images/enemies/regions/5_dom_dvor/lvl42/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { name: 'enem55', image: 'images/enemies/regions/5_dom_dvor/lvl42/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
        name: 'enem1',
		dispName: 'Щёлкан',
        image: 'images/enemies/regions/5_dom_dvor/lvl42/1.webp',
        baseHP: 7300,
        baseSpeed: 0,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 250,
        size: '24%',
        deathAnimation: { preset: 'latchSnap', durationMs: 1000 }
    },
    enem2: {
        name: 'enem2',
		dispName: 'Шлёпик',
        image: 'images/enemies/regions/5_dom_dvor/lvl42/2.webp',
        baseHP: 43800,
        baseSpeed: 0,
        baseDamage: 22,
        spawnWeight: 15,
		baseExp: 400,
        size: '25%',
        deathAnimation: { preset: 'soggyCollapse', durationMs: 1100 }
    },
    enem3: {
        name: 'enem3',
		dispName: 'Тулупыч',
        image: 'images/enemies/regions/5_dom_dvor/lvl42/3.webp',
        baseHP: 58400,
        baseSpeed: 0,
        baseDamage: 24,
        spawnWeight: 20,
		baseExp: 600,
        size: '27%',
        deathAnimation: { preset: 'heavyDrop', durationMs: 1400 }
    },

	enem4: {
        name: 'enem4',
		dispName: 'Бренчиха',
        image: 'images/enemies/regions/5_dom_dvor/lvl42/4.webp',
        baseHP: 175200,
        baseSpeed: 0,
        baseDamage: 26,
        spawnWeight: 10,
		baseExp: 800,
        size: '24%',
        deathAnimation: { preset: 'keyScatter', durationMs: 1200 }
    },

	enem5: {
        name: 'enem5',
		dispName: 'Притворник',
        image: 'images/enemies/regions/5_dom_dvor/lvl42/5.webp',
        baseHP: 219000,
        baseSpeed: 0,
        baseDamage: 28,
        spawnWeight: 5,
		baseExp: 0,
        size: '26%',
        deathAnimation: { preset: 'doorSlam', durationMs: 1300 }
    },

};

 let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
 let timeNextBoss = 5;
 const bossInterval = 5;

 // Атаки по краям (x≤18 / x≥78) или ниже босса; быстрые (speed≥18) — y≤12
 // (раздел 5 правил уровня). Позиции спроектированы под свой архетип у каждого
 // босса (раздел 1) — см. комментарии-заголовки блоков ниже.

 const bossAbilities = [
	// ===== Щёлкан: CORNERS_ONLY — атаки строго по четырём углам дверной рамы,
	// центр и середина поля всегда свободны =====
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //0  TL
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //1  TR
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //2  BL
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //3  BR
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //4  TL
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //5  TR
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //6  BL
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //7  BR
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //8  TL fast
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 26 }, //9  TR fast
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //10 TL fast
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //11 TR fast
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //12 BL mid
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //13 BR mid
	{ boss: 'enem1', type: 'enem11', xPos: 8,  yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //14 TL deep
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //15 TR deep
	// звенья «атакующей цепи» — раздел 13.7 lvlData/Правила создания уровня.txt:
	// своя xPos на цепь, yPos у самого верха поля, скорость строго невозрастающая
	// вдоль цепи (дублирует клампы game.js CHAIN_MAX_HEAD_SPEED/CHAIN_MAX_SPAWN_Y —
	// сами данные написаны так, чтобы кламп в норме ничего не менял).
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //17 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //18 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //20 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //21 цепь-B звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //22 цепь-B звено 4
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //23 цепь-B звено 5

	// ===== Шлёпик: ZIGZAG_NO_WALL — мокрый зигзаг слева-направо без плотной
	// нижней стены, читается как змейка, а не забор =====
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //2
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //3
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //4
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //5
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //6
	{ boss: 'enem2', type: 'enem22', xPos: 84, yPos: 44, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //7
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //8  fast
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 26 }, //9  fast
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //10 fast
	{ boss: 'enem2', type: 'enem22', xPos: 86, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //11 fast
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //12
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 82, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — раздел 13.7 lvlData/Правила создания уровня.txt.
	// Зигзаг (свой рисунок, отличный от уровня 41) — xPos качается вокруг центра.
	{ boss: 'enem2', type: 'enem22', xPos: 42, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 68, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16 }, //17 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 42, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //18 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17 }, //20 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, //21 цепь-B звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //22 цепь-B звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //23 цепь-B звено 5

	// ===== Тулупыч: BOTTOM_PRESSURE — тяжёлая приземистая волна снизу почти
	// во всю ширину, редкие быстрые взмахи рукавов сверху как контраст =====
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 46, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 62, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //3
	{ boss: 'enem3', type: 'enem33', xPos: 78, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //4
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //5
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //6
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //7  rare mid-only
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20 }, //8  fast, rare сверху
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //9  fast, rare сверху
	{ boss: 'enem3', type: 'enem33', xPos: 36, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //10
	{ boss: 'enem3', type: 'enem33', xPos: 64, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //11
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //12 fast
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20 }, //13 fast
	{ boss: 'enem3', type: 'enem33', xPos: 8,  yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //14
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — раздел 13.7 lvlData/Правила создания уровня.txt.
	// Диагональ (heavy pressure) — xPos ползёт в одну сторону, скорость падает
	// к хвосту.
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 43, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 61, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 78, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 64, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, //20 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //21 цепь-B звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 36, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 9 },  //22 цепь-B звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 },  //23 цепь-B звено 5

	// ===== Бренчиха: ASYMMETRY — почти всё с левой (ключевой) руки, редкие
	// уколы справа: лево ≠ право буквально, не просто по названию =====
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //0
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //1
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //2
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //3
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 42, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //4
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 3 },  //5
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //6  fast left
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 26 }, //7  fast left
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20 }, //8  fast left
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //9  редкий укол справа
	{ boss: 'enem4', type: 'enem44', xPos: 88, yPos: 40, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //10 редкий укол справа
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //11
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, //12
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //13 редкий БЫСТРЫЙ укол справа
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //14
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //15
	// звенья «атакующей цепи» — раздел 13.7 lvlData/Правила создания уровня.txt.
	// Нервные скачки (свой рисунок прыжков, отличный от уровня 41).
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 17 }, //17 цепь-A звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, //18 цепь-A звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 17 }, //20 цепь-B звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16 }, //21 цепь-B звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //22 цепь-B звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //23 цепь-B звено 5

	// ===== Притворник: SEQUENTIAL_CLOSE — начинает с пары зон, закрывает
	// новые постепенно, в финале разом все восемь =====
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //0  L
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //1  R
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //2  BL
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //3  BR
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //4  TC редкая
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //5  L-mid
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //6  R-mid
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //7  BC редкая
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //8  fast L
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //9  fast R
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20 }, //10 fast L
	{ boss: 'enem5', type: 'enem55', xPos: 86, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //11 fast R
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //12
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //14
	{ boss: 'enem5', type: 'enem55', xPos: 88, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, //15
	// звенья «атакующей цепи» — раздел 13.7 lvlData/Правила создания уровня.txt.
	// Широкая дуга финального босса — сквозной размашистый след почти через
	// всё поле, с обратным крюком в конце длинной цепи.
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, //17 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //18 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 82, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 62, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16 }, //20 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 42, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //21 цепь-B звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 57, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //22 цепь-B звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 77, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //23 цепь-B звено 5
];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 300, bossDelayAbDop: 5400 }, // щёлкает мерно, средний ритм
	{ boss: 'enem2', bossDelayAb: 260, bossDelayAbDop: 4600 }, // плещется часто
	{ boss: 'enem3', bossDelayAb: 420, bossDelayAbDop: 6800 }, // самая долгая пауза уровня — тяжесть
	{ boss: 'enem4', bossDelayAb: 220, bossDelayAbDop: 4200 }, // самый частый ритм уровня — нервность
	{ boss: 'enem5', bossDelayAb: 250, bossDelayAbDop: 5000 }, // собранный, но не самый частый
];

 const bossAbilitiesDop = [
	// Щёлкан — CORNERS_ONLY
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [2, 3, 4, 5] },
	{ boss: 'enem1', indexAbilities: [8, 9, 10] },
	{ boss: 'enem1', indexAbilities: [6, 7, 12, 13] },
	{ boss: 'enem1', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь (3)
	{ boss: 'enem1', indexAbilities: [19, 20, 21, 22, 23], isChain: true }, // ← цепь (5)
	{ boss: 'enem1', indexAbilities: [0, 2, 1, 3] },
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7] }, // сигнатурная: все четыре угла разом

	// Шлёпик — ZIGZAG_NO_WALL
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem2', indexAbilities: [8, 9] },
	{ boss: 'enem2', indexAbilities: [4, 5, 12, 13] },
	{ boss: 'enem2', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь (3)
	{ boss: 'enem2', indexAbilities: [19, 20, 21, 22, 23], isChain: true }, // ← цепь (5)
	{ boss: 'enem2', indexAbilities: [0, 2, 1, 3] },
	{ boss: 'enem2', indexAbilities: [0, 2, 4, 6, 8, 10, 14] }, // сигнатурная: полный зигзаг-каскад

	// Тулупыч — BOTTOM_PRESSURE
	{ boss: 'enem3', indexAbilities: [0, 1] },
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4] }, // почти полная нижняя стена
	{ boss: 'enem3', indexAbilities: [8, 9] },
	{ boss: 'enem3', indexAbilities: [5, 6, 14, 15] },
	{ boss: 'enem3', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь (3)
	{ boss: 'enem3', indexAbilities: [19, 20, 21, 22, 23], isChain: true }, // ← цепь (5)
	{ boss: 'enem3', indexAbilities: [0, 7, 9] },
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 12, 13] }, // сигнатурная: стена + оба рукава разом

	// Бренчиха — ASYMMETRY
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4] },
	{ boss: 'enem4', indexAbilities: [6, 7, 8] },
	{ boss: 'enem4', indexAbilities: [11, 12, 15] },
	{ boss: 'enem4', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь (3)
	{ boss: 'enem4', indexAbilities: [19, 20, 21, 22, 23], isChain: true }, // ← цепь (5)
	{ boss: 'enem4', indexAbilities: [0, 4, 1, 5] },
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4, 5, 9, 13] }, // сигнатурная: левая колонна + оба редких укола справа разом

	// Притворник — SEQUENTIAL_CLOSE
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3] },
	{ boss: 'enem5', indexAbilities: [8, 9] },
	{ boss: 'enem5', indexAbilities: [5, 6, 14, 15] },
	{ boss: 'enem5', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь (3)
	{ boss: 'enem5', indexAbilities: [19, 20, 21, 22, 23], isChain: true }, // ← цепь (5)
	{ boss: 'enem5', indexAbilities: [0, 2, 1, 3] },
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7] }, // сигнатурная кульминация: все зоны закрываются разом
];

// Лорные названия связок временных улучшений — свой словарь образов на каждого
// босса (щеколда/скрежет у замка, плеск/ворс у половика, мех/шов у тулупа,
// звон/связка у ключницы, засов/притвор у привратника), см. правило 12.1
// lvlData/Правила создания уровня.txt. Адъектив на одной позиции у нескольких
// боссов может рифмоваться (как в gameData1.js) — это отражает общий combo
// статов на этой позиции, не шаблонность; полных совпадений фраз между
// боссами нет (проверено программно).
const UPGRADE_VARIANT_NAMES = {
    // Щёлкан — оживший замок: щеколда, скрежет, хватка, петля, клацанье.
    enem1: {
        variant1: 'Щеколда-кураж', variant2: 'Ржавая хватка', variant3: 'Стальная петля',
        variant4: 'Скрипучий засов', variant5: 'Меткий щелчок', variant6: 'Бешеное клацанье',
        variant7: 'Замочный норов', variant8: 'Крепкая щеколда', variant9: 'Ударный лязг',
        variant10: 'Живучий механизм', variant11: 'Колючая ржавчина', variant12: 'Щёлк и в темноту',
        variant13: 'Толстая обшивка', variant14: 'Неутомимый лязг', variant15: 'Пружинистый взвод',
        variant16: 'Острый штифт, меткий глаз', variant17: 'Замочная удача', variant18: 'Верный прицел',
        variant19: 'Молниеносный щелчок', variant20: 'Замочный нюх', variant21: 'Мёртвая хватка',
        variant22: 'Юркий клац', variant23: 'Замочная стойкость', variant24: 'Долгий скрежет, зоркий глаз',
        variant25: 'Ускользающий взвод', variant26: 'Дикий лязг', variant27: 'Стойкий засов',
        variant28: 'Щёлкнул и затих', variant29: 'Крепкий замок', variant30: 'Ржавая мощь',
        variant31: 'Взвод с оглядкой', variant32: 'Живучая обшивка', variant33: 'Юркий и цепкий',
        variant34: 'Замочная прыть', variant35: 'Быстрый лязг, крепкая петля'
    },
    // Шлёпик — ожившая мокрая тряпица: плеск, ворс, кайма, лужа, шлепок.
    enem2: {
        variant1: 'Мокрый кураж', variant2: 'Хлёсткий плеск', variant3: 'Ворсистая хватка',
        variant4: 'Мыльный вихрь', variant5: 'Меткий шлепок', variant6: 'Бешеный плеск',
        variant7: 'Половиковый норов', variant8: 'Крепкая кайма', variant9: 'Ударный шлепок',
        variant10: 'Живучий ворс', variant11: 'Колючая кайма', variant12: 'Шлёп и в лужу',
        variant13: 'Толстый ворс', variant14: 'Неутомимый плеск', variant15: 'Пружинистый шлепок',
        variant16: 'Острый узор, меткий глаз', variant17: 'Половиковая удача', variant18: 'Верный плеск',
        variant19: 'Молниеносный шлепок', variant20: 'Влажный нюх', variant21: 'Цепкий ворс',
        variant22: 'Юркий шлепок', variant23: 'Половиковая стойкость', variant24: 'Длинная кайма, меткий глаз',
        variant25: 'Ускользающий плеск', variant26: 'Дикий вихрь', variant27: 'Стойкий узор',
        variant28: 'Шлёп и след лужей', variant29: 'Крепкий половик', variant30: 'Мыльная мощь',
        variant31: 'Плеск с оглядкой', variant32: 'Живучая нить', variant33: 'Юркая и хлёсткая',
        variant34: 'Половиковая прыть', variant35: 'Быстрый плеск, крепкая кайма'
    },
    // Тулупыч — ожившая овчина: мех, подкладка, рукав, шов, ворот.
    enem3: {
        variant1: 'Овчинный кураж', variant2: 'Меховая хватка', variant3: 'Рукав-таран',
        variant4: 'Плечистый напор', variant5: 'Меткий взмах', variant6: 'Бешеный рык',
        variant7: 'Тулупный норов', variant8: 'Крепкая подкладка', variant9: 'Ударный взмах',
        variant10: 'Живучий ворот', variant11: 'Колючая шерсть', variant12: 'Взмах наповал',
        variant13: 'Толстая овчина', variant14: 'Неутомимый взмах', variant15: 'Пружинистый рывок',
        variant16: 'Острый взгляд, тяжёлый рукав', variant17: 'Тулупная удача', variant18: 'Верный взмах',
        variant19: 'Молниеносный удар', variant20: 'Тулупный нюх', variant21: 'Стальная подкладка',
        variant22: 'Юркий для своих габаритов', variant23: 'Тулупная стойкость', variant24: 'Тяжёлый шаг, зоркий глаз',
        variant25: 'Ускользающий манёвр', variant26: 'Дикий рык', variant27: 'Стойкий ворот',
        variant28: 'Взмах наповал дважды', variant29: 'Крепкий тулуп', variant30: 'Меховая мощь',
        variant31: 'Удар с оглядкой', variant32: 'Живучая овчина', variant33: 'Неутомимый и грозный',
        variant34: 'Тулупная прыть', variant35: 'Тяжёлая поступь, крепкий шов'
    },
    // Бренчиха — старая ключница: связка, звон, бородка ключа, замочек, скважина.
    enem4: {
        variant1: 'Ключевой кураж', variant2: 'Меткий звон', variant3: 'Связка бородок',
        variant4: 'Бряцающий блеск', variant5: 'Меткий укол', variant6: 'Бешеный звон',
        variant7: 'Ключевой норов', variant8: 'Крепкая связка', variant9: 'Ударная скважина',
        variant10: 'Живучая ключница', variant11: 'Колючий взгляд', variant12: 'Звон и в тень',
        variant13: 'Толстый плащ', variant14: 'Неутомимый звон', variant15: 'Пружинистый шаг',
        variant16: 'Острый взгляд, зоркий глаз', variant17: 'Ключевая удача', variant18: 'Верный укол',
        variant19: 'Молниеносный звон', variant20: 'Бряцающий нюх', variant21: 'Цепкая хватка связки',
        variant22: 'Юркий поворот', variant23: 'Ключевая стойкость', variant24: 'Долгий обход, зоркий глаз',
        variant25: 'Ускользающий шаг', variant26: 'Дикий звон', variant27: 'Стойкая связка',
        variant28: 'Укол и в дверь', variant29: 'Крепкая ключница', variant30: 'Бронзовая мощь',
        variant31: 'Обход с оглядкой', variant32: 'Живучий плащ', variant33: 'Юркая и звонкая',
        variant34: 'Ключевая прыть', variant35: 'Быстрый шаг, крепкая связка'
    },
    // Притворник — страж порога с дверью-щитом: засов, притвор, косяк, филёнка,
    // петля, щепа, скрип дерева — намеренно СВОЙ словарь, не пересекается с
    // тулупом (мех/подкладка) даже там, где оба архетипа "тяжёлые".
    enem5: {
        variant1: 'Пороговый кураж', variant2: 'Дверная хватка', variant3: 'Засов-таран',
        variant4: 'Косячный напор', variant5: 'Меткий толчок', variant6: 'Бешеный треск',
        variant7: 'Притворный норов', variant8: 'Крепкая филёнка', variant9: 'Ударный толчок',
        variant10: 'Живучий страж', variant11: 'Колючая щепа', variant12: 'Толчок наповал',
        variant13: 'Толстая доска', variant14: 'Неутомимый толчок', variant15: 'Пружинистый выпад',
        variant16: 'Острый взгляд, дверная петля', variant17: 'Пороговая удача', variant18: 'Верный толчок',
        variant19: 'Молниеносный засов', variant20: 'Пороговый нюх', variant21: 'Дверная скоба',
        variant22: 'Юркий несмотря на дверь', variant23: 'Пороговая стойкость', variant24: 'Тяжёлая дверь, зоркий глаз',
        variant25: 'Ускользающий притвор', variant26: 'Дикий скрип', variant27: 'Стойкий притвор',
        variant28: 'Толчок наповал дважды', variant29: 'Крепкий притворник', variant30: 'Дверная мощь',
        variant31: 'Толчок с оглядкой', variant32: 'Живучая филёнка', variant33: 'Неутомимый и незыблемый',
        variant34: 'Пороговая прыть', variant35: 'Скрипучая поступь, крепкая доска'
    }
};
