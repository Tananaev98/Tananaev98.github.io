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
// птицы); Засечень — straight (методичный, без финтов удар дровосека);
// Дымокор — drift (тяжёлый дым стелется в сторону).
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
// пяти противников есть ровно ОДНА barricade-комбинация, у Засеченя — ДВЕ
// (как у главного носителя темы — сюжетно оправдана именно связкой кольев,
// которую он в буквальном смысле бросает как метательный барьер).
//
// ПРАВКА 2026-09-16 (пользователь поймал живьём — «баррикады плохо
// сбалансированы»): изначальная версия считала HP баррикады как процент от
// maxHP босса и снимала его РЕАЛЬНЫМ уроном удара — из-за этого число
// попаданий плавало от героя к герою и от крита к криту (иногда 1 крит
// убивал баррикаду мгновенно, иногда без крита требовался явный избыток
// попаданий сверх расчёта), плюс раздел 16.2 в исходной версии заставлял
// снижать процент ниже заявленного рабочего диапазона для тяжёлых ролей
// (иначе число ударов улетало до 9-17). Оба симптома — следствие одной
// причины: честность была завязана на УРОН, который сам по себе шумный
// (крит/апгрейды/выбор героя). Заменено на честный СЧЁТЧИК УДАРОВ
// (`barricadeHits`, целое число 3-7, не зависит ни от героя, ни от урона,
// ни от maxHP босса — см. game.js, applyHeroImpactDamage, ветка
// enemy.isBarricade снимает ровно 1 HP за попадание). Круговой индикатор
// оставлен без изменений — он и раньше работал через долю enemy.hp/maxHP,
// ему всё равно, что именно эти числа означают.
//
// СТРОГОЕ ПРАВИЛО БАЛАНСА (прямое требование пользователя, зафиксировано в
// разделе 16.2): чем больше ударов нужно на баррикаду, тем ДОЛЬШЕ она обязана
// стоять на месте перед рывком — barricadePauseMs = barricadeHits × 400мс,
// одна и та же константа для ВСЕХ баррикад игры (не подбирается по герою).
// Это одновременно даёт строгую монотонность (число ударов растёт → пауза
// растёт, без исключений) и постоянный запас честности: реальное минимальное
// время на N ударов подряд — N × 300мс (SHOT_INTERVAL не-боссовых атак,
// checkAimAndDamage) — то есть пауза всегда ровно в 1.33 раза больше
// теоретического минимума, независимо от героя и его урона. По ролям:
// enem1 3 удара/1200мс, enem2 4/1600, enem3 5/2000, enem4 6/2400 (обе
// способности), enem5 7/2800 — эскалация сложности ролей 1:1 совпадает с
// эскалацией числа ударов, что и требуется финалу области.
//
// Ни одна barricade-способность не входит в isChain-комбо (ограничение
// раздела 16.4). Частота — 1-2 из 8-9 комбо на босса (раздел 16.3), не в
// каждой серии.
// ПЕРЕРАСКЛАДКА ПО ВСЕМ ПЕРЕМЕННЫМ БОЯ (2026-09-19, по прямому требованию «никаких
// повторов от уровня к уровню»): скаляры уровня, фазы, профили боссов, паузы
// между атаками, множители рывка баррикад, геометрия филлерных атак и
// структура комбо выбраны уникальными относительно всех уровней 61-74
// (scripts/level-diversity-report.js — 0 повторов). Сигнатурные атаки и их
// комбо (описанные в 4 вопросах ниже) не тронуты — только слегка
// подправлены скорость/xPos там, где новая модель времени (растяжка быстрых
// противоположных флангов движком + все три фазы, scripts/combo-model.js)
// этого требовала. Числа разброса в трейлинг-комментариях комбо ниже
// пересчитаны заново по этой модели (фаза 1).
let lvlNumber = 66;

const bossCombatConfig = {
	waveJitter: { min: 0.88, max: 1.12 },
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: { historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35 },
	movementStyles: { accelerate: { start: 0.72, gain: 0.9 }, lateRush: { switchAt: 0.55, early: 0.72, late: 1.48 }, pause: { at: 0.42, durationMs: 420, after: 1.22 }, weave: { frequency: 1.35, amplitude: 5.5 }, drift: { shift: 10 } },
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	levelCadence: 0.947,
	damageMultiplier: 1.866,
	minWaveDelay: 2560,
	minShotDelay: 180,
	minTelegraphMs: 619,
	attackChains: true,
	phases: [
		{ phase: 1, minHp: 0.68, cadence: 0.954, speed: 0.925, damage: 1.022, telegraphMultiplier: 0.995, surpriseChance: 0.0735, maxActiveAttacks: 11 },
		{ phase: 2, minHp: 0.345, cadence: 0.907, speed: 1, damage: 1.126, telegraphMultiplier: 0.977, surpriseChance: 0.1595, maxActiveAttacks: 13 },
		{ phase: 3, minHp: 0.00, cadence: 0.839, speed: 1.152, damage: 1.166, telegraphMultiplier: 0.885, surpriseChance: 0.2445, maxActiveAttacks: 16 }
	],
	bosses: {
		enem1: { signatureEvery: 4,
			// Хлестуница: WHIP_LASH — гибкое покачивание, хлёст ветвей
			movementStyle: 'weave', cadence: 0.990, telegraphMs: 840, speedMultiplier: 0.895, damageMultiplier: 0.895,
			speedVariance: [0.79, 0.89, 0.99, 1.09, 1.19]
		}, // Хлестуница: WHIP_LASH — гибкое покачивание, хлёст ветвей
		enem2: { signatureEvery: 4,
			// Смоляк: RESIN_DRIP — капля смолы копится и срывается
			movementStyle: 'pause', cadence: 0.885, telegraphMs: 810, speedMultiplier: 1.095, damageMultiplier: 1.035,
			speedVariance: [0.79, 0.86, 0.93, 1.00, 1.07]
		}, // Смоляк: RESIN_DRIP — капля смолы копится и срывается
		enem3: { signatureEvery: 4,
			// Токовик: LEK_CHARGE — внезапный агрессивный наскок токующей птицы
			movementStyle: 'lateRush', cadence: 1.165, telegraphMs: 1065, speedMultiplier: 0.775, damageMultiplier: 1.235,
			speedVariance: [0.86, 0.95, 1.04, 1.13, 1.22]
		}, // Токовик: LEK_CHARGE — внезапный агрессивный наскок токующей птицы
		enem4: { signatureEvery: 4,
			// Засечень: STAKE_CHOP — методичный, без финтов удар дровосека
			movementStyle: 'straight', cadence: 0.835, telegraphMs: 740, speedMultiplier: 1.165, damageMultiplier: 1.065,
			speedVariance: [0.89, 0.98, 1.07, 1.16, 1.25]
		}, // Засечень: STAKE_CHOP — методичный, без финтов удар дровосека
		enem5: { signatureEvery: 4,
			// Дымокор: ROOT_SMOTHER — тяжёлый дым стелется в сторону
			movementStyle: 'drift', cadence: 0.770, telegraphMs: 930, speedMultiplier: 1.105, damageMultiplier: 1.215,
			speedVariance: [0.78, 0.85, 0.92, 0.99, 1.06]
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
        baseDamage: 20.20,
        spawnWeight: 5,
		baseExp: 250,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem2: {
        name: 'enem2',
		dispName: 'Смоляк',
        image: 'images/enemies/regions/6_zasech_les/lvl66/2.webp',
        baseHP: 42908,
        baseSpeed: 0,
        baseDamage: 22.25,
        spawnWeight: 15,
		baseExp: 400,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem3: {
        name: 'enem3',
		dispName: 'Токовик',
        image: 'images/enemies/regions/6_zasech_les/lvl66/3.webp',
        baseHP: 75914,
        baseSpeed: 0,
        baseDamage: 23.80,
        spawnWeight: 20,
		baseExp: 600,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem4: {
        name: 'enem4',
		dispName: 'Засечень',
        image: 'images/enemies/regions/6_zasech_les/lvl66/4.webp',
        baseHP: 122122,
        baseSpeed: 0,
        baseDamage: 25.80,
        spawnWeight: 10,
		baseExp: 800,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem5: {
        name: 'enem5',
		dispName: 'Дымокор',
        image: 'images/enemies/regions/6_zasech_les/lvl66/5.webp',
        baseHP: 184833,
        baseSpeed: 0,
        baseDamage: 28.25,
        spawnWeight: 5,
		baseExp: 0,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 1000 }
    },


};

 let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
 let timeNextBoss = 12;
 const bossInterval = 4;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
 // speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Хлестуница: WHIP_LASH — гибкое покачивание, резкий хлёст
	// ветвью с широким замахом =====
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //0
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19 }, //1
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17 }, //2 — нежданчик: хлёст сразу без привычного долгого замаха
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 }, //3 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem1', type: 'enem11', xPos: 57, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 9 }, //4 — средняя нижняя атака
	{ boss: 'enem1', type: 'enem11', xPos: 37, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 9 }, //5 — средняя нижняя атака
	{ boss: 'enem1', type: 'enem11', xPos: 33, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //6 — средняя нижняя атака
	{ boss: 'enem1', type: 'enem11', xPos: 37, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //7 — средняя нижняя атака
	{ boss: 'enem1', type: 'enem11', xPos: 49, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //8 — средняя атака
	{ boss: 'enem1', type: 'enem11', xPos: 93, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17 }, //9 — быстрая атака
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21 }, //10 — быстрая атака
	{ boss: 'enem1', type: 'enem11', xPos: 41, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //11 — средняя атака
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15 }, //12 — средняя атака
	{ boss: 'enem1', type: 'enem11', xPos: 47, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6 }, //13 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 23, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //14 — средняя атака
	// БАРРИКАДА (раздел 16): толстая обломившаяся ветвь, застревает в
	// воздухе — требует несколько ударов, прежде чем сорвётся вперёд.
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6,
	  barricadeHits: 3, barricadePauseMs: 1200, barricadeRushSpeedMultiplier: 2.220 }, //15b
	// звенья «атакующей цепи» — широкий хлёст веткой по дуге, затем
	// прямой лёгкий удар наискось (arc+diagonal), раздел 13.7.
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //17 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 9 },  //18 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //20 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //21 цепь-B звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 8 },  //22 цепь-B звено 4

	// ===== Смоляк: RESIN_DRIP — капля смолы копится и срывается, липкий
	// бросок =====
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 17 }, //0 — нежданчик: капля срывается сразу по центру без привычного разброса
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, //1
	{ boss: 'enem2', type: 'enem22', xPos: 46, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //2 — средняя атака
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //3 — средняя атака
	{ boss: 'enem2', type: 'enem22', xPos: 54, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, //4 — средняя атака
	{ boss: 'enem2', type: 'enem22', xPos: 19, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //5 — быстрая атака
	{ boss: 'enem2', type: 'enem22', xPos: 76, yPos: 45, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 }, //6 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem2', type: 'enem22', xPos: 59, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //7 — средняя атака
	{ boss: 'enem2', type: 'enem22', xPos: 31, yPos: 51, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6 }, //8 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem2', type: 'enem22', xPos: 62, yPos: 33, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //9 — средняя нижняя атака
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //10 — быстрая атака
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 11, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19 }, //11 — быстрая атака
	// БАРРИКАДА (раздел 16): застывший ком смолы, твёрдый и вязкий —
	// нужно расколоть несколькими ударами, прежде чем он долетит.
	{ boss: 'enem2', type: 'enem22', xPos: 78, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6,
	  barricadeHits: 4, barricadePauseMs: 1600, barricadeRushSpeedMultiplier: 2.285 }, //12b
	// звенья «атакующей цепи» — бросок смолы широкой дугой, затем капля
	// падает прямо вниз (arc+vertical), раздел 13.7.
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //13 цепь-A звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //14 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //15 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //16 цепь-A звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //17 цепь-B звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 72, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //18 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 9 },  //19 цепь-B звено 3

	// ===== Токовик: LEK_CHARGE — внезапный агрессивный наскок токующей
	// птицы =====
	{ boss: 'enem3', type: 'enem33', xPos: 29, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //0 — нежданчик: наскок раньше привычной долгой поступи
	{ boss: 'enem3', type: 'enem33', xPos: 89, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //1 — быстрая атака
	{ boss: 'enem3', type: 'enem33', xPos: 36, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 }, //2 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24 }, //3 — быстрая атака
	{ boss: 'enem3', type: 'enem33', xPos: 21, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 }, //4 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //5 — средняя атака
	{ boss: 'enem3', type: 'enem33', xPos: 21, yPos: 15, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, //6 — средняя атака
	{ boss: 'enem3', type: 'enem33', xPos: 32, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //7 — средняя атака
	// БАРРИКАДА (раздел 16): ком вырванной дёрном земли и корней,
	// подброшенный лапой — плотный, требует несколько ударов.
	{ boss: 'enem3', type: 'enem33', xPos: 38, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6,
	  barricadeHits: 5, barricadePauseMs: 2000, barricadeRushSpeedMultiplier: 2.380 }, //8b
	// звенья «атакующей цепи» — наступающий шаг по диагонали, затем
	// прямой клевок вниз (diagonal+vertical), раздел 13.7.
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //9 цепь-A звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //10 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 9 },  //11 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //12 цепь-B звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //13 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //14 цепь-B звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 51, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //15 цепь-B звено 4

	// ===== Засечень: STAKE_CHOP — методичный, без финтов удар дровосека
	// топором и вязанкой кольев =====
	{ boss: 'enem4', type: 'enem44', xPos: 44, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //0
	{ boss: 'enem4', type: 'enem44', xPos: 63, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //1
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //2
	{ boss: 'enem4', type: 'enem44', xPos: 95, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 26 }, //3
	{ boss: 'enem4', type: 'enem44', xPos: 12,  yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //4
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //5 — нежданчик: удар разом с обеих сторон, без привычного разброса
	{ boss: 'enem4', type: 'enem44', xPos: 86, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19 }, //6
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //7 — быстрая атака
	{ boss: 'enem4', type: 'enem44', xPos: 41, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, //8 — средняя атака
	{ boss: 'enem4', type: 'enem44', xPos: 54, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20 }, //9 — быстрая атака
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, //10 — средняя нижняя атака
	{ boss: 'enem4', type: 'enem44', xPos: 28, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, //11 — средняя нижняя атака
	{ boss: 'enem4', type: 'enem44', xPos: 58, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, //12 — средняя атака
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4 }, //13 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem4', type: 'enem44', xPos: 21, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 }, //14 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem4', type: 'enem44', xPos: 37, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //15 — средняя нижняя атака
	{ boss: 'enem4', type: 'enem44', xPos: 93, yPos: 13, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //16 — средняя атака
	{ boss: 'enem4', type: 'enem44', xPos: 21, yPos: 49, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 }, //17 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	// БАРРИКАДА (раздел 16): главный носитель темы уровня — буквальная
	// связка заострённых кольев, брошенная как метательный барьер засеки.
	// Единственный из пяти противников с ДВУМЯ barricade-способностями
	// (сюжетно оправдано — это его основной инструмент, не случайная
	// деталь), но не в каждой серии (раздел 16.3: 2 из 9 комбо этого босса).
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5,
	  barricadeHits: 6, barricadePauseMs: 2400, barricadeRushSpeedMultiplier: 2.480 }, //18b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5,
	  barricadeHits: 6, barricadePauseMs: 2400, barricadeRushSpeedMultiplier: 2.480 }, //19b
	// звенья «атакующей цепи» — два одинаковых прямых удара топором
	// подряд, методичный рубящий ритм (vertical+vertical), раздел 13.7.
	{ boss: 'enem4', type: 'enem44', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //20 цепь-A звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 32, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //21 цепь-A звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 29, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //22 цепь-A звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 31, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //23 цепь-A звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //24 цепь-B звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 72, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //25 цепь-B звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //26 цепь-B звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //27 цепь-B звено 4

	// ===== Дымокор: ROOT_SMOTHER — тяжёлый дым стелется в сторону,
	// массивный корень наваливается разом =====
	{ boss: 'enem5', type: 'enem55', xPos: 19, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //0
	{ boss: 'enem5', type: 'enem55', xPos: 34, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //1
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //2
	{ boss: 'enem5', type: 'enem55', xPos: 54, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28 }, //3 — нежданчик: навал без единого мгновения подготовки
	{ boss: 'enem5', type: 'enem55', xPos: 49, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //4
	{ boss: 'enem5', type: 'enem55', xPos: 83, yPos: 47, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 }, //5 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem5', type: 'enem55', xPos: 47, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 3 }, //6 — приманка (одиночная или с быстрым довеском, раздел 9.1)
	{ boss: 'enem5', type: 'enem55', xPos: 62, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 23 }, //7 — быстрая атака
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //8 — средняя атака
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //9 — средняя атака
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //10 — быстрая атака
	{ boss: 'enem5', type: 'enem55', xPos: 67, yPos: 35, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //11 — средняя нижняя атака
	// БАРРИКАДА (раздел 16): цельный обломок корня, самая крупная и
	// стойкая баррикада уровня — соответствует финальной роли Дымокора.
	{ boss: 'enem5', type: 'enem55', xPos: 62, yPos: 22, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6,
	  barricadeHits: 7, barricadePauseMs: 2800, barricadeRushSpeedMultiplier: 2.625 }, //12b
	// звенья «атакующей цепи» — два решительных броска корнем с
	// нарастающей длиной (diagonal+diagonal), раздел 13.7 — финальная
	// кульминация, самая длинная цепь уровня.
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //13 цепь-A звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, //14 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //15 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 9 },  //16 цепь-A звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //17 цепь-B звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, //18 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //19 цепь-B звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 9 },  //20 цепь-B звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //21 цепь-B звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //22 цепь-B звено 6
];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 328, bossDelayAbDop: 5775, firstWaveDelayMs: 2400 }, // редкие гибкие хлёсты
	{ boss: 'enem2', bossDelayAb: 246, bossDelayAbDop: 4125, firstWaveDelayMs: 1980 }, // капающая смола
	{ boss: 'enem3', bossDelayAb: 389, bossDelayAbDop: 7050, firstWaveDelayMs: 2400 }, // самый долгий отдых — гордая неспешная поступь
	{ boss: 'enem4', bossDelayAb: 207, bossDelayAbDop: 3575, firstWaveDelayMs: 1716 }, // частые методичные удары топором
	{ boss: 'enem5', bossDelayAb: 268, bossDelayAbDop: 5275, firstWaveDelayMs: 2400 }, // собранный финал
 ];

 const bossAbilitiesDop = [
	// Хлестуница — WHIP_LASH
	{ boss: 'enem1', indexAbilities: [2, 0, 1] }, // нежданчик: хлёст сразу без привычного долгого замаха
	{ boss: 'enem1', indexAbilities: [13] }, // одиночная приманка
	{ boss: 'enem1', indexAbilities: [3] }, // одиночная приманка
	{ boss: 'enem1', indexAbilities: [14, 11, 8] }, // средняя серия — разброс ~539мс
	{ boss: 'enem1', indexAbilities: [5, 10, 12] }, // смешанная серия — разброс ~780мс
	{ boss: 'enem1', indexAbilities: [4, 7, 9] }, // смешанная серия — разброс ~638мс
	{ boss: 'enem1', indexAbilities: [14, 6, 11] }, // средняя серия — разброс ~848мс
	{ boss: 'enem1', indexAbilities: [6, 8] }, // средняя серия — разброс ~62мс
	{ boss: 'enem1', indexAbilities: [13, 6] }, // приманка + быстрый довесок — разброс ~461мс
	{ boss: 'enem1', indexAbilities: [13, 6, 14, 7] }, // приманка + быстрый довесок — разброс ~871мс
	{ boss: 'enem1', indexAbilities: [8, 11, 4] }, // средняя серия — разброс ~887мс
	{ boss: 'enem1', indexAbilities: [15], barricade: true }, // ← баррикада (раздел 16)
	{ boss: 'enem1', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь-A (3)
	{ boss: 'enem1', indexAbilities: [19, 20, 21, 22], isChain: true }, // ← цепь-B (4)

	// Смоляк — RESIN_DRIP
	{ boss: 'enem2', indexAbilities: [0, 1] }, // нежданчик: двойная капля с одной стороны подряд
	{ boss: 'enem2', indexAbilities: [6] }, // одиночная приманка
	{ boss: 'enem2', indexAbilities: [7, 10] }, // смешанная серия — разброс ~578мс
	{ boss: 'enem2', indexAbilities: [2, 11] }, // смешанная серия — разброс ~686мс
	{ boss: 'enem2', indexAbilities: [4, 9] }, // средняя серия — разброс ~77мс
	{ boss: 'enem2', indexAbilities: [8, 3, 5] }, // приманка + быстрый довесок — разброс ~1044мс
	{ boss: 'enem2', indexAbilities: [10, 7, 9] }, // смешанная серия — разброс ~993мс
	{ boss: 'enem2', indexAbilities: [7, 5, 8, 9] }, // приманка + быстрый довесок — разброс ~842мс
	{ boss: 'enem2', indexAbilities: [7, 9] }, // средняя серия — разброс ~344мс
	{ boss: 'enem2', indexAbilities: [2, 4] }, // средняя серия — разброс ~464мс
	{ boss: 'enem2', indexAbilities: [5, 8] }, // приманка + быстрый довесок — разброс ~842мс
	{ boss: 'enem2', indexAbilities: [12], barricade: true }, // ← баррикада (раздел 16)
	{ boss: 'enem2', indexAbilities: [13, 14, 15, 16], isChain: true }, // ← цепь-A (4)
	{ boss: 'enem2', indexAbilities: [17, 18, 19], isChain: true }, // ← цепь-B (3)

	// Токовик — LEK_CHARGE
	{ boss: 'enem3', indexAbilities: [0] }, // одиночная приманка
	{ boss: 'enem3', indexAbilities: [4] }, // одиночная приманка
	{ boss: 'enem3', indexAbilities: [2] }, // одиночная приманка
	{ boss: 'enem3', indexAbilities: [6, 7] }, // средняя серия — разброс ~399мс
	{ boss: 'enem3', indexAbilities: [3, 1] }, // быстрая серия — разброс ~925мс
	{ boss: 'enem3', indexAbilities: [5, 7] }, // средняя серия — разброс ~119мс
	{ boss: 'enem3', indexAbilities: [7, 3] }, // смешанная серия — разброс ~305мс
	{ boss: 'enem3', indexAbilities: [5, 7, 6] }, // средняя серия — разброс ~466мс
	{ boss: 'enem3', indexAbilities: [7, 1] }, // смешанная серия — разброс ~100мс
	{ boss: 'enem3', indexAbilities: [6, 3, 1] }, // смешанная серия — разброс ~925мс
	{ boss: 'enem3', indexAbilities: [5, 6, 1] }, // смешанная серия — разброс ~219мс
	{ boss: 'enem3', indexAbilities: [8], barricade: true }, // ← баррикада (раздел 16)
	{ boss: 'enem3', indexAbilities: [9, 10, 11], isChain: true }, // ← цепь-A (3)
	{ boss: 'enem3', indexAbilities: [12, 13, 14, 15], isChain: true }, // ← цепь-B (4)

	// Засечень — STAKE_CHOP
	{ boss: 'enem4', indexAbilities: [5, 6] }, // нежданчик: удар разом с обеих сторон без привычного разброса
	{ boss: 'enem4', indexAbilities: [0, 2, 4, 1, 3] }, // урезано по разделу 9.1 из более длинной сигнатурной серии (исходная растягивала прилёты на секунды)
	{ boss: 'enem4', indexAbilities: [14] }, // одиночная приманка
	{ boss: 'enem4', indexAbilities: [17] }, // одиночная приманка
	{ boss: 'enem4', indexAbilities: [8, 13] }, // приманка + быстрый довесок — разброс ~1288мс
	{ boss: 'enem4', indexAbilities: [7, 15] }, // смешанная серия — разброс ~244мс
	{ boss: 'enem4', indexAbilities: [11, 12, 9, 16] }, // смешанная серия — разброс ~876мс
	{ boss: 'enem4', indexAbilities: [11, 10] }, // средняя серия — разброс ~141мс
	{ boss: 'enem4', indexAbilities: [18], barricade: true }, // ← баррикада №1 (раздел 16)
	{ boss: 'enem4', indexAbilities: [19], barricade: true }, // ← баррикада №2 (раздел 16)
	{ boss: 'enem4', indexAbilities: [20, 21, 22, 23], isChain: true }, // ← цепь-A (4)
	{ boss: 'enem4', indexAbilities: [24, 25, 26, 27], isChain: true }, // ← цепь-B (4)

	// Дымокор — ROOT_SMOTHER, финальный облик
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 4] }, // урезано по разделу 9.1 из более длинной сигнатурной серии (исходная растягивала прилёты на секунды)
	{ boss: 'enem5', indexAbilities: [3] }, // одиночная приманка
	{ boss: 'enem5', indexAbilities: [6] }, // одиночная приманка
	{ boss: 'enem5', indexAbilities: [5] }, // одиночная приманка
	{ boss: 'enem5', indexAbilities: [11, 10, 9] }, // смешанная серия — разброс ~835мс
	{ boss: 'enem5', indexAbilities: [7, 8] }, // смешанная серия — разброс ~551мс
	{ boss: 'enem5', indexAbilities: [7, 10, 5] }, // приманка + быстрый довесок — разброс ~1224мс
	{ boss: 'enem5', indexAbilities: [7, 10] }, // быстрая серия — разброс ~551мс
	{ boss: 'enem5', indexAbilities: [11, 5] }, // приманка + быстрый довесок — разброс ~842мс
	{ boss: 'enem5', indexAbilities: [9, 5, 7] }, // приманка + быстрый довесок — разброс ~633мс
	{ boss: 'enem5', indexAbilities: [12], barricade: true }, // ← баррикада (раздел 16)
	{ boss: 'enem5', indexAbilities: [13, 14, 15, 16], isChain: true }, // ← цепь-A (4)
	{ boss: 'enem5', indexAbilities: [17, 18, 19, 20, 21, 22], isChain: true }, // ← цепь-B (6)
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
