// Уровень 66 «Дымная опушка» — ПЕРВЫЙ уровень области VI «Глухой край»
// (рабочее название «Засечный лес»), обычный уровень (пять разных
// монстров). Первый уровень области, где вводится механика «Баррикада»
// (раздел 16 lvlData/Правила создания уровня.txt) — сквозная для ВСЕЙ
// области VI, как «Атакующая цепь» была сквозной для области V.
//
// ДВОЙНАЯ ПРОВЕРКА УНИКАЛЬНОСТИ (раздел 1.2) — ШАГ 1 выполнен 2026-09-15 по
// admin-boss-pattern-panel.html, 325 строк, уровни 1-65 (панель общая для
// всей игры, не по областям — новая область не создаёт отдельной таблицы).
//
// АРТ (images/enemies/regions/6_zasech_les/lvl66/) — все 5 картинок открыты
// и сверены лично:
// 1.webp — белая берёза с тёмными подпалинами коры, длинные гибкие ветви-
//   руки с листвой и мелкими цветками, одна рука когтистая — суть в
//   ГИБКОМ ХЛЁСТКОМ ударе, а не в жёстком ударе дерева.
// 2.webp — сосна с хвойными пучками и шишками, на коре видны капли
//   янтарной смолы, крупные когтистые руки — суть в ЛИПКОМ БРОСКЕ смолы,
//   идея-документ прямо говорит «бросается липкими каплями смолы».
// 3.webp — чёрный тетерев с красной бровью, важно шагает, одна лапа
//   поднята на полушаге — суть в ГОРДОЙ ТОКУЮЩЕЙ поступи (реальное
//   поведение тетерева на току — не просто «птица», а конкретный брачный
//   ритуал вида).
// 4.webp — фигура из связанных брёвен с настоящим топором в одной руке и
//   СВЯЗКОЙ ЗАОСТРЁННЫХ КОЛЬЕВ вместо другой руки — прямая, буквальная
//   деталь настоящей засечной черты (историческая система обороны из
//   поваленных деревьев и кольев), главный носитель темы баррикад уровня.
// 5.webp (финал) — исполинский выворотень (вывернутый с корнем пень) с
//   сизым дымом, идущим из полого нутра, спутанные корни-щупальца — самая
//   массивная фигура, буквально «завал» леса.
// 11-55.webp — круглые медальоны-портреты, обычная конвенция.
//
// ТЕМА ОБЛАСТИ VI — реальная историческая «засечная черта» (система обороны
// южных и юго-восточных границ Руси из поваленных деревьев, заострённых
// кольев и лесных завалов) даёт ПРЯМОЕ обоснование механике «Баррикада»:
// не абстрактная механика ради механики, а буквально то, из чего строили
// засеку — ветви, смола-клей, комья земли/подстилки, вязанки кольев,
// вывороченные корни. Тема уровня — реальное поведение/материал каждого
// лесного жителя опушки, где рубят/валят лес под засеку.
//
// НАЗВАНИЯ (раздел 12 — придуманные, не словарные названия животных/
// растений): Хлестуница (от «хлестать» — гибкий удар ветвью, не словарное
// «берёза»); Смоляк (от «смола» — не словарное «сосна»); Токовик (от
// «токовать» — реальное брачное поведение тетерева, не словарное
// «тетерев»); Засечень (от «засека» — суть засечного рубщика, не словарное
// «рубщик»/«дровосек»); Дымокор (составное изобретённое слово — дым+корень,
// не словарное «выворотень»).
//
// ДВИЖЕНИЕ (movementStyle) — сверено с полным распределением 1-65:
// Хлестуница — weave (гибкое покачивание и хлёст ветвей) 9%→10%, самый
// низкий бакет роли; Смоляк — pause (капля смолы копится и срывается)
// 17%→18%; Токовик — lateRush (внезапный агрессивный наскок токующей
// птицы) 12%→13%, низкий бакет роли; Засечень — straight (методичный,
// без финтов удар дровосека) 15%→16%; Дымокор — drift (тяжёлый дым стелется
// в сторону) 8%→9%, самый низкий бакет роли.
//
// ЦЕПИ (13.6/13.7) — выбраны из образа И заранее сверены с полным
// распределением, включая ТОЧНЫЕ ПАРЫ форм на роль (метод закреплён на
// уровнях 57-65 — пары проверяются ДО записи файла): Хлестуница — arc(3)+
// diagonal(4): широкий хлёст веткой по дуге, затем прямой лёгкий удар
// наискось (пара с нулевой историей для enem1); Смоляк — arc(4)+
// vertical(3): бросок смолы широкой дугой, затем капля падает прямо вниз
// (пара с нулевой историей для enem2); Токовик — diagonal(3)+vertical(4):
// наступающий шаг по диагонали, затем прямой клевок вниз (пара с нулевой
// историей для enem3); Засечень — vertical(4)+vertical(4): два одинаковых
// прямых удара топором подряд — методичный рубящий ритм дровосека, повтор
// формы оправдан самой сутью рубки (пара с нулевой историей для enem4);
// Дымокор — diagonal(4)+diagonal(6): два решительных броска корнем с
// нарастающей длиной — самая длинная цепь уровня (пара с нулевой историей
// для enem5). Формы всех пяти пар подтверждены живым классификатором
// панели ПОСЛЕ записи файла (verify66.js + STEP 2).
//
// БАРРИКАДЫ (раздел 16 lvlData/Правила создания уровня.txt) — у КАЖДОГО из
// пяти противников есть ровно ОДНА barricade-комбинация (у Засеченя — как
// у главного носителя темы — сюжетно оправдана именно связкой кольев,
// которую он в буквальном смысле бросает как метательный барьер).
// Проценты/паузы посчитаны и ПРОВЕРЕНЫ реальным расчётом раздела 16.2
// (barricade66.js, три контрольных героя на опорной прокачке кампании 66 —
// герой-уровень 84 по интерполяции таблицы раздела 13 CLAUDE.md; худший
// урон отбоя — Лука, 391): enem1 6% (barricadeHP≈1030, 3 удара, 900мс на
// уничтожение, пауза 1200мс, запас ×1.33); enem2 5% (≈2145, 6 ударов,
// 1800мс, пауза 2000мс, запас ×1.11); enem3 3% (≈2277, 6 ударов, 1800мс,
// пауза 2200мс, запас ×1.22); enem4 2.2% (≈2687, 7 ударов, 2100мс, пауза
// 2600мс, запас ×1.24); enem5 1.8% (≈3327, 9 ударов, 2700мс, пауза 3200мс,
// запас ×1.19). У enem3-enem5 процент СОЗНАТЕЛЬНО ниже общего рабочего
// диапазона 3-6% (раздел 16.1) — при буквальных 3-6% для этих ролей число
// ударов улетало до 9-17 при том же HP отбоя (см. первый прогон
// barricade66.js), это уже не «несколько секунд», а неоправданно долгий
// разбор одной атаки; раздел 16.1 прямо разрешает выходить за диапазон
// «после отдельного расчёта по разделу 16.2» — расчёт сделан, оставлен
// здесь как след проверки. Ни одна barricade-способность не входит в
// isChain-комбо (ограничение раздела 16.4). Частота — 1-2 из 8-9 комбо на
// босса (раздел 16.3), не в каждой серии.
let lvlNumber = 66;

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
		{ phase: 1, minHp: 0.65, cadence: 1.00, speed: 0.95, damage: 1.00, telegraphMultiplier: 1.00, surpriseChance: 0.06, maxActiveAttacks: 10 },
		{ phase: 2, minHp: 0.31, cadence: 0.90, speed: 1.05, damage: 1.12, telegraphMultiplier: 0.95, surpriseChance: 0.12, maxActiveAttacks: 12 },
		{ phase: 3, minHp: 0.00, cadence: 0.80, speed: 1.12, damage: 1.22, telegraphMultiplier: 0.90, surpriseChance: 0.18, maxActiveAttacks: 14 }
	],
	bosses: {
		enem1: {
			// Хлестуница: WHIP_LASH — гибкое покачивание, хлёст ветвей
			movementStyle: 'weave', cadence: 1.02, telegraphMs: 900, speedMultiplier: 0.94, damageMultiplier: 0.90,
			speedVariance: [0.82, 0.92, 1.00, 1.08, 1.16]
		}, // Хлестуница: WHIP_LASH — гибкое покачивание, хлёст ветвей
		enem2: {
			// Смоляк: RESIN_DRIP — капля смолы копится и срывается
			movementStyle: 'pause', cadence: 0.90, telegraphMs: 760, speedMultiplier: 1.06, damageMultiplier: 1.00,
			speedVariance: [0.86, 0.95, 1.05, 1.14, 1.22]
		}, // Смоляк: RESIN_DRIP — капля смолы копится и срывается
		enem3: {
			// Токовик: LEK_CHARGE — внезапный агрессивный наскок токующей птицы
			movementStyle: 'lateRush', cadence: 1.17, telegraphMs: 1050, speedMultiplier: 0.80, damageMultiplier: 1.19,
			speedVariance: [0.80, 0.88, 0.96, 1.04, 1.12]
		}, // Токовик: LEK_CHARGE — внезапный агрессивный наскок токующей птицы
		enem4: {
			// Засечень: STAKE_CHOP — методичный, без финтов удар дровосека
			movementStyle: 'straight', cadence: 0.86, telegraphMs: 690, speedMultiplier: 1.13, damageMultiplier: 1.04,
			speedVariance: [0.88, 0.98, 1.08, 1.16, 1.24]
		}, // Засечень: STAKE_CHOP — методичный, без финтов удар дровосека
		enem5: {
			// Дымокор: ROOT_SMOTHER — тяжёлый дым стелется в сторону
			movementStyle: 'drift', cadence: 0.81, telegraphMs: 970, speedMultiplier: 1.07, damageMultiplier: 1.15,
			speedVariance: [0.86, 0.94, 1.03, 1.12, 1.20]
		} // Дымокор: ROOT_SMOTHER — тяжёлый дым стелется в сторону
	}
};

const ENEMY_TYPES = {

	enem11: { name: 'enem11', image: 'images/enemies/regions/6_zasech_les/lvl66/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { name: 'enem22', image: 'images/enemies/regions/6_zasech_les/lvl66/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { name: 'enem33', image: 'images/enemies/regions/6_zasech_les/lvl66/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { name: 'enem44', image: 'images/enemies/regions/6_zasech_les/lvl66/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { name: 'enem55', image: 'images/enemies/regions/6_zasech_les/lvl66/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
        name: 'enem1',
		dispName: 'Хлестуница',
        image: 'images/enemies/regions/6_zasech_les/lvl66/1.webp',
        baseHP: 17163,
        baseSpeed: 0,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 250,
        size: '20%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem2: {
        name: 'enem2',
		dispName: 'Смоляк',
        image: 'images/enemies/regions/6_zasech_les/lvl66/2.webp',
        baseHP: 42908,
        baseSpeed: 0,
        baseDamage: 22,
        spawnWeight: 15,
		baseExp: 400,
        size: '23%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem3: {
        name: 'enem3',
		dispName: 'Токовик',
        image: 'images/enemies/regions/6_zasech_les/lvl66/3.webp',
        baseHP: 75914,
        baseSpeed: 0,
        baseDamage: 24,
        spawnWeight: 20,
		baseExp: 600,
        size: '22%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem4: {
        name: 'enem4',
		dispName: 'Засечень',
        image: 'images/enemies/regions/6_zasech_les/lvl66/4.webp',
        baseHP: 122122,
        baseSpeed: 0,
        baseDamage: 26,
        spawnWeight: 10,
		baseExp: 800,
        size: '25%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem5: {
        name: 'enem5',
		dispName: 'Дымокор',
        image: 'images/enemies/regions/6_zasech_les/lvl66/5.webp',
        baseHP: 184833,
        baseSpeed: 0,
        baseDamage: 28,
        spawnWeight: 5,
		baseExp: 0,
        size: '28%',
        deathAnimation: { preset: 'default', durationMs: 1000 }
    },


};

 let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
 let timeNextBoss = 5;
 const bossInterval = 5;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
 // speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Хлестуница: WHIP_LASH — гибкое покачивание, резкий хлёст
	// ветвью с широким замахом =====
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //1
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //2
	{ boss: 'enem1', type: 'enem11', xPos: 65, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //3
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //4
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //5
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //6
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //7
	{ boss: 'enem1', type: 'enem11', xPos: 85, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //8
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //9
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //10
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //11
	{ boss: 'enem1', type: 'enem11', xPos: 75, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //12
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //13 — нежданчик: хлёст сразу без привычного долгого замаха
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //15
	// БАРРИКАДА (раздел 16): толстая обломившаяся ветвь, застревает в
	// воздухе — требует несколько ударов, прежде чем сорвётся вперёд.
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6,
	  barricadeHpPercent: 6, barricadePauseMs: 1200, barricadeRushSpeedMultiplier: 2.2 }, //16b
	// звенья «атакующей цепи» — широкий хлёст веткой по дуге, затем
	// прямой лёгкий удар наискось (arc+diagonal), раздел 13.7.
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //17 цепь-A звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //18 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 9 },  //19 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //21 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //22 цепь-B звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 8 },  //23 цепь-B звено 4

	// ===== Смоляк: RESIN_DRIP — капля смолы копится и срывается, липкий
	// бросок =====
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //2
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //3
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //4
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //5
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //6
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //7
	{ boss: 'enem2', type: 'enem22', xPos: 75, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 26 }, //8
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //9
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //10
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //12 — нежданчик: капля срывается сразу по центру без привычного разброса
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //15
	// БАРРИКАДА (раздел 16): застывший ком смолы, твёрдый и вязкий —
	// нужно расколоть несколькими ударами, прежде чем он долетит.
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6,
	  barricadeHpPercent: 5, barricadePauseMs: 2000, barricadeRushSpeedMultiplier: 2.3 }, //16b
	// звенья «атакующей цепи» — бросок смолы широкой дугой, затем капля
	// падает прямо вниз (arc+vertical), раздел 13.7.
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //17 цепь-A звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //18 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //19 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //20 цепь-A звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //21 цепь-B звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 72, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //22 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 9 },  //23 цепь-B звено 3

	// ===== Токовик: LEK_CHARGE — внезапный агрессивный наскок токующей
	// птицы =====
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 31, yPos: 11, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //3
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //4
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //5
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //6
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //7
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20 }, //8
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //9
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //10
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24 }, //11
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //12
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //13
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //14 — нежданчик: наскок раньше привычной долгой поступи
	{ boss: 'enem3', type: 'enem33', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //15
	// БАРРИКАДА (раздел 16): ком вырванной дёрном земли и корней,
	// подброшенный лапой — плотный, требует несколько ударов.
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6,
	  barricadeHpPercent: 3, barricadePauseMs: 2200, barricadeRushSpeedMultiplier: 2.4 }, //16b
	// звенья «атакующей цепи» — наступающий шаг по диагонали, затем
	// прямой клевок вниз (diagonal+vertical), раздел 13.7.
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //17 цепь-A звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //18 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 9 },  //19 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //21 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //22 цепь-B звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 51, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //23 цепь-B звено 4

	// ===== Засечень: STAKE_CHOP — методичный, без финтов удар дровосека
	// топором и вязанкой кольев =====
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 },  //0
	{ boss: 'enem4', type: 'enem44', xPos: 85, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 },  //1
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //2
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //3
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //4
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 26 }, //5
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, //6
	{ boss: 'enem4', type: 'enem44', xPos: 75, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //7
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20 }, //9
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7 },  //10
	{ boss: 'enem4', type: 'enem44', xPos: 35, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //11
	{ boss: 'enem4', type: 'enem44', xPos: 65, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 },  //12
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //13 — нежданчик: удар разом с обеих сторон, без привычного разброса
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //15
	// БАРРИКАДА (раздел 16): главный носитель темы уровня — буквальная
	// связка заострённых кольев, брошенная как метательный барьер засеки.
	// Единственный из пяти противников с ДВУМЯ barricade-способностями
	// (сюжетно оправдано — это его основной инструмент, не случайная
	// деталь), но не в каждой серии (раздел 16.3: 2 из 9 комбо этого босса).
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5,
	  barricadeHpPercent: 2.2, barricadePauseMs: 2600, barricadeRushSpeedMultiplier: 2.5 }, //16b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5,
	  barricadeHpPercent: 2.2, barricadePauseMs: 2600, barricadeRushSpeedMultiplier: 2.5 }, //17b
	// звенья «атакующей цепи» — два одинаковых прямых удара топором
	// подряд, методичный рубящий ритм (vertical+vertical), раздел 13.7.
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //18 цепь-A звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 32, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //19 цепь-A звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 29, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //20 цепь-A звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 31, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //21 цепь-A звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //22 цепь-B звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 72, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //23 цепь-B звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //24 цепь-B звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //25 цепь-B звено 4

	// ===== Дымокор: ROOT_SMOTHER — тяжёлый дым стелется в сторону,
	// массивный корень наваливается разом =====
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //0
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //1
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //2
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //3
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //4
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //5
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //6
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //7
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //8
	{ boss: 'enem5', type: 'enem55', xPos: 35, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //9
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //10
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //11
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28 }, //12 — нежданчик: навал без единого мгновения подготовки
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //14
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //15
	// БАРРИКАДА (раздел 16): цельный обломок корня, самая крупная и
	// стойкая баррикада уровня — соответствует финальной роли Дымокора.
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6,
	  barricadeHpPercent: 1.8, barricadePauseMs: 3200, barricadeRushSpeedMultiplier: 2.6 }, //16b
	// звенья «атакующей цепи» — два решительных броска корнем с
	// нарастающей длиной (diagonal+diagonal), раздел 13.7 — финальная
	// кульминация, самая длинная цепь уровня.
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //17 цепь-A звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, //18 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //19 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 9 },  //20 цепь-A звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //21 цепь-B звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, //22 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //23 цепь-B звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 9 },  //24 цепь-B звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //25 цепь-B звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //26 цепь-B звено 6
];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 310, bossDelayAbDop: 5700 }, // редкие гибкие хлёсты
	{ boss: 'enem2', bossDelayAb: 220, bossDelayAbDop: 4200 }, // самый частый — капающая смола
	{ boss: 'enem3', bossDelayAb: 415, bossDelayAbDop: 6900 }, // самый долгий отдых — гордая неспешная поступь
	{ boss: 'enem4', bossDelayAb: 195, bossDelayAbDop: 3500 }, // частые методичные удары топором
	{ boss: 'enem5', bossDelayAb: 255, bossDelayAbDop: 5100 }, // собранный финал
 ];

 const bossAbilitiesDop = [
	// Хлестуница — WHIP_LASH
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4] },
	{ boss: 'enem1', indexAbilities: [5, 6] },
	{ boss: 'enem1', indexAbilities: [7, 8] },
	{ boss: 'enem1', indexAbilities: [9, 10] },
	{ boss: 'enem1', indexAbilities: [0, 1, 5] }, // same-start с [0,1], расходится резким хлёстом
	{ boss: 'enem1', indexAbilities: [16], barricade: true }, // ← баррикада (раздел 16)
	{ boss: 'enem1', indexAbilities: [17, 18, 19], isChain: true }, // ← цепь-A (3)
	{ boss: 'enem1', indexAbilities: [20, 21, 22, 23], isChain: true }, // ← цепь-B (4)
	{ boss: 'enem1', indexAbilities: [13, 6, 7] }, // нежданчик: хлёст сразу без привычного долгого замаха
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 14] }, // сигнатурная: хлёст через всё поле разом

	// Смоляк — RESIN_DRIP
	{ boss: 'enem2', indexAbilities: [0] },
	{ boss: 'enem2', indexAbilities: [1] },
	{ boss: 'enem2', indexAbilities: [2] },
	{ boss: 'enem2', indexAbilities: [3, 4] },
	{ boss: 'enem2', indexAbilities: [8, 9] },
	{ boss: 'enem2', indexAbilities: [0, 1] }, // same-start-стиль пара двух одиночных капель подряд
	{ boss: 'enem2', indexAbilities: [16], barricade: true }, // ← баррикада (раздел 16)
	{ boss: 'enem2', indexAbilities: [17, 18, 19, 20], isChain: true }, // ← цепь-A (4)
	{ boss: 'enem2', indexAbilities: [21, 22, 23], isChain: true }, // ← цепь-B (3)
	{ boss: 'enem2', indexAbilities: [12, 13] }, // нежданчик: двойная капля с одной стороны подряд
	{ boss: 'enem2', indexAbilities: [0, 2, 1, 10, 6, 14] }, // сигнатурная: серия капель по всему полю подряд

	// Токовик — LEK_CHARGE
	{ boss: 'enem3', indexAbilities: [0, 1, 2] },
	{ boss: 'enem3', indexAbilities: [3, 4] },
	{ boss: 'enem3', indexAbilities: [5, 6] },
	{ boss: 'enem3', indexAbilities: [7, 8] },
	{ boss: 'enem3', indexAbilities: [9, 10] },
	{ boss: 'enem3', indexAbilities: [0, 1, 7] }, // same-start с [0,1], расходится дальним наскоком
	{ boss: 'enem3', indexAbilities: [16], barricade: true }, // ← баррикада (раздел 16)
	{ boss: 'enem3', indexAbilities: [17, 18, 19], isChain: true }, // ← цепь-A (3)
	{ boss: 'enem3', indexAbilities: [20, 21, 22, 23], isChain: true }, // ← цепь-B (4)
	{ boss: 'enem3', indexAbilities: [14] }, // нежданчик: наскок раньше привычной долгой поступи
	{ boss: 'enem3', indexAbilities: [3, 11, 4, 12] }, // сигнатурная: наскок с обеих сторон разом

	// Засечень — STAKE_CHOP
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [2, 3] },
	{ boss: 'enem4', indexAbilities: [6, 7] },
	{ boss: 'enem4', indexAbilities: [10, 11] },
	{ boss: 'enem4', indexAbilities: [9, 10, 11] },
	{ boss: 'enem4', indexAbilities: [0, 1, 6] }, // same-start с [0,1], расходится дальним ударом
	{ boss: 'enem4', indexAbilities: [16], barricade: true }, // ← баррикада №1 (раздел 16)
	{ boss: 'enem4', indexAbilities: [17], barricade: true }, // ← баррикада №2 (раздел 16)
	{ boss: 'enem4', indexAbilities: [18, 19, 20, 21], isChain: true }, // ← цепь-A (4)
	{ boss: 'enem4', indexAbilities: [22, 23, 24, 25], isChain: true }, // ← цепь-B (4)
	{ boss: 'enem4', indexAbilities: [13, 14] }, // нежданчик: удар разом с обеих сторон без привычного разброса
	{ boss: 'enem4', indexAbilities: [0, 2, 4, 8, 1, 3, 5, 9] }, // сигнатурная: методичная рубка через всё поле

	// Дымокор — ROOT_SMOTHER, финальный облик
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [3, 4] },
	{ boss: 'enem5', indexAbilities: [5, 6] },
	{ boss: 'enem5', indexAbilities: [7, 8] },
	{ boss: 'enem5', indexAbilities: [9, 10, 11] },
	{ boss: 'enem5', indexAbilities: [0, 1, 3] }, // same-start с [0,1], расходится дальним навалом
	{ boss: 'enem5', indexAbilities: [16], barricade: true }, // ← баррикада (раздел 16)
	{ boss: 'enem5', indexAbilities: [17, 18, 19, 20], isChain: true }, // ← цепь-A (4)
	{ boss: 'enem5', indexAbilities: [21, 22, 23, 24, 25, 26], isChain: true }, // ← цепь-B (6)
	{ boss: 'enem5', indexAbilities: [12, 13] }, // нежданчик: навал без единого мгновения подготовки
	{ boss: 'enem5', indexAbilities: [0, 3, 5, 7, 9, 15] }, // сигнатурная кульминация: навал через весь двор разом
 ];

// Лорные названия связок временных улучшений — пять разных обитателей одной
// дымной опушки, словарь каждого строго завязан на его реальный облик и
// материал (правило 12.1): берёза хлещет гибкой веткой, сосна сочится
// смолой, тетерев токует и топочет, дровосек рубит топором и вяжет колья,
// а выворотень душит дымом из-под корней. Полных совпадений фраз между
// монстрами нет (проверено вручную построчно).
const UPGRADE_VARIANT_NAMES = {
    // Хлестуница — берёза-белоручка: ветвь, лист, кора, хлыст.
    enem1: {
        variant1: 'Берёзовый кураж', variant2: 'Ветвяная хватка', variant3: 'Хлыст-таран',
        variant4: 'Хлёсткий напор', variant5: 'Меткий хлёст', variant6: 'Бешеный хлёст',
        variant7: 'Берёзовый норов', variant8: 'Крепкая кора', variant9: 'Ударный хлёст',
        variant10: 'Живучая ветвь', variant11: 'Колючий сучок', variant12: 'Хлёст и в темноту',
        variant13: 'Толстая кора', variant14: 'Неутомимый хлёст', variant15: 'Пружинистый хлёст',
        variant16: 'Гибкая ветвь, зоркий глаз', variant17: 'Берёзовая удача', variant18: 'Верный хлёст',
        variant19: 'Молниеносный хлёст', variant20: 'Берёзовый нюх', variant21: 'Цепкий лист',
        variant22: 'Юркая, несмотря на рост', variant23: 'Берёзовая стойкость', variant24: 'Долгий замах, зоркий глаз',
        variant25: 'Ускользающий хлёст', variant26: 'Дикий хлёст', variant27: 'Стойкая кора',
        variant28: 'Хлёст наповал', variant29: 'Крепкая хлестуница', variant30: 'Хлёсткая мощь',
        variant31: 'Хлёст с оглядкой', variant32: 'Живучая кора', variant33: 'Юркая и берёзовая',
        variant34: 'Берёзовая прыть', variant35: 'Быстрый хлёст, крепкая кора'
    },
    // Смоляк — смоляная сосна: смола, хвоя, шишка, капля.
    enem2: {
        variant1: 'Смолистый кураж', variant2: 'Хвойная хватка', variant3: 'Шишка-таран',
        variant4: 'Липкий напор', variant5: 'Меткая капля', variant6: 'Бешеная капля',
        variant7: 'Смолистый норов', variant8: 'Крепкая шишка', variant9: 'Ударная капля',
        variant10: 'Живучая смола', variant11: 'Колючая хвоя', variant12: 'Капля и в темноту',
        variant13: 'Толстая смола', variant14: 'Неутомимая капля', variant15: 'Пружинистая капля',
        variant16: 'Янтарная капля, зоркий глаз', variant17: 'Смолистая удача', variant18: 'Верная капля',
        variant19: 'Молниеносная капля', variant20: 'Смолистый нюх', variant21: 'Цепкая смола',
        variant22: 'Юркий, несмотря на смолу', variant23: 'Смолистая стойкость', variant24: 'Долгое накопление, зоркий глаз',
        variant25: 'Ускользающая капля', variant26: 'Дикая капля', variant27: 'Стойкая шишка',
        variant28: 'Капля наповал', variant29: 'Крепкий смоляк', variant30: 'Липкая мощь',
        variant31: 'Капля с оглядкой', variant32: 'Живучая шишка', variant33: 'Юркий и смолистый',
        variant34: 'Липкая прыть', variant35: 'Быстрая капля, крепкая шишка'
    },
    // Токовик — сердитый тетерев: бровь, перо, ток, поступь.
    enem3: {
        variant1: 'Токовый кураж', variant2: 'Перьевая хватка', variant3: 'Клюв-таран',
        variant4: 'Гордый напор', variant5: 'Меткий наскок', variant6: 'Бешеный наскок',
        variant7: 'Токовый норов', variant8: 'Крепкая бровь', variant9: 'Ударный наскок',
        variant10: 'Живучее перо', variant11: 'Колючее перо', variant12: 'Наскок и в темноту',
        variant13: 'Толстое перо', variant14: 'Неутомимый наскок', variant15: 'Пружинистый наскок',
        variant16: 'Красная бровь, зоркий глаз', variant17: 'Токовая удача', variant18: 'Верный наскок',
        variant19: 'Молниеносный наскок', variant20: 'Токовый нюх', variant21: 'Цепкий коготь',
        variant22: 'Юркий, несмотря на вес', variant23: 'Токовая стойкость', variant24: 'Долгая поступь, зоркий глаз',
        variant25: 'Ускользающий наскок', variant26: 'Дикий наскок', variant27: 'Стойкое перо',
        variant28: 'Наскок наповал', variant29: 'Крепкий токовик', variant30: 'Гордая мощь',
        variant31: 'Наскок с оглядкой', variant32: 'Живучий коготь', variant33: 'Юркий и токовый',
        variant34: 'Гордая прыть', variant35: 'Быстрый наскок, крепкое перо'
    },
    // Засечень — засечный рубщик: топор, кол, вязь, засека.
    enem4: {
        variant1: 'Засечный кураж', variant2: 'Вязовая хватка', variant3: 'Кол-таран',
        variant4: 'Рубящий напор', variant5: 'Меткий удар топором', variant6: 'Бешеный удар топором',
        variant7: 'Засечный норов', variant8: 'Крепкая вязь', variant9: 'Ударный замах',
        variant10: 'Живучий кол', variant11: 'Колючий кол', variant12: 'Удар топором и в темноту',
        variant13: 'Толстый кол', variant14: 'Неутомимый удар топором', variant15: 'Пружинистый удар топором',
        variant16: 'Острый кол, зоркий глаз', variant17: 'Засечная удача', variant18: 'Верный удар топором',
        variant19: 'Молниеносный удар топором', variant20: 'Засечный нюх', variant21: 'Цепкая вязь',
        variant22: 'Юркий, несмотря на вязанку', variant23: 'Засечная стойкость', variant24: 'Тяжёлый замах, зоркий глаз',
        variant25: 'Ускользающий удар топором', variant26: 'Дикий удар топором', variant27: 'Стойкий кол',
        variant28: 'Удар топором наповал', variant29: 'Крепкий засечень', variant30: 'Рубящая мощь',
        variant31: 'Удар топором с оглядкой', variant32: 'Живучая вязь', variant33: 'Юркий и засечный',
        variant34: 'Рубящая прыть', variant35: 'Быстрый удар топором, крепкий кол'
    },
    // Дымокор — дымный выворотень: дым, корень, гриб, завал.
    enem5: {
        variant1: 'Дымный кураж', variant2: 'Корневая хватка', variant3: 'Корень-таран',
        variant4: 'Завальный напор', variant5: 'Меткий навал', variant6: 'Бешеный навал',
        variant7: 'Дымный норов', variant8: 'Крепкий гриб', variant9: 'Ударный навал',
        variant10: 'Живучий корень', variant11: 'Колючий корень', variant12: 'Навал и в темноту',
        variant13: 'Толстый корень', variant14: 'Неутомимый навал', variant15: 'Пружинистый навал',
        variant16: 'Сизый дым, дикий взгляд', variant17: 'Дымная удача', variant18: 'Верный навал',
        variant19: 'Молниеносный навал', variant20: 'Дымный нюх', variant21: 'Цепкий гриб',
        variant22: 'Юркий, несмотря на массу', variant23: 'Дымная стойкость', variant24: 'Долгий завал, дикий взгляд',
        variant25: 'Ускользающий навал', variant26: 'Дикий навал', variant27: 'Стойкий корень',
        variant28: 'Навал наповал', variant29: 'Крепкий дымокор', variant30: 'Завальная мощь',
        variant31: 'Навал с оглядкой', variant32: 'Живучий гриб', variant33: 'Юркий и дымный',
        variant34: 'Завальная прыть', variant35: 'Быстрый навал, крепкий корень'
    }
};
