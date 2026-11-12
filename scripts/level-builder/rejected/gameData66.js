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
	attackChains: true,
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.729, damageMultiplier: 1.866, minWaveDelay: 5700, minShotDelay: 121, minTelegraphMs: 593,
	phases: [
		{ phase: 1, minHp: 0.701, cadence: 0.958, speed: 1.059, damage: 1.022, telegraphMultiplier: 1.05, surpriseChance: 0.129, maxActiveAttacks: 43 },
		{ phase: 2, minHp: 0.345, cadence: 0.764, speed: 1.201, damage: 1.126, telegraphMultiplier: 0.894, surpriseChance: 0.228, maxActiveAttacks: 47 },
		{ phase: 3, minHp: 0, cadence: 0.608, speed: 1.322, damage: 1.166, telegraphMultiplier: 0.785, surpriseChance: 0.329, maxActiveAttacks: 51 }
	],
	bosses: {
		enem1: { combatIdentity: "Раздвоенный хлёст вокруг завала", combatTrick: "Сначала закончить видимые взмахи ветвей, затем разбить стоящий сбоку завал. Ошибка — держать прицел на завале под хлёстом.", signatureEvery: 3, movementStyle: 'weave', cadence: 0.982, telegraphMs: 953, speedMultiplier: 1.013, damageMultiplier: 0.895, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem2: { combatIdentity: "Отложенная капля после липкой россыпи", combatTrick: "Смоляная приманка переживает первую россыпь. Ошибка — переключиться на завал, оставив последнюю каплю.", signatureEvery: 3, movementStyle: 'pause', cadence: 0.96, telegraphMs: 913, speedMultiplier: 1.02, damageMultiplier: 1.035, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem3: { combatIdentity: "Наскок с повторным притопом", combatTrick: "После наскока остаётся короткий повтор. Ошибка — счесть первую перебежку концом тока и начать долбить завал.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 0.937, telegraphMs: 887, speedMultiplier: 0.953, damageMultiplier: 1.235, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem4: { combatIdentity: "Подрубка опоры и обратный топор", combatTrick: "Развести удары топора и разбор завала. Ошибка — после первого скола бросить обратный удар или принять стоящий завал за безопасное окно.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 0.916, telegraphMs: 863, speedMultiplier: 1.031, damageMultiplier: 1.065, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem5: { combatIdentity: "Дымная крона оставляет корень", combatTrick: "За дымной верхушкой остаётся тяжёлый корень. Ошибка — решить, что поле очищено после первой пачки или что завал можно оставить до следующей волны.", signatureEvery: 3, movementStyle: 'drift', cadence: 0.893, telegraphMs: 839, speedMultiplier: 1.037, damageMultiplier: 1.215, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] }
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
 let timeNextBoss = 29;
 const bossInterval = 32;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
 // speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Хлестуница =====
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.321 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.121 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.521 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.721 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.321 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.322 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.122 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.522 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.722 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.322 }, // 9 b
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.722 }, // 10 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.323 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.123 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.523 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.723 }, // 14 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.323 }, // 15 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.324 }, // 16 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.124 }, // 17 d
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.524 }, // 18 d
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.724 }, // 19 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.324 }, // 20 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.724 }, // 21 d
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.325 }, // 22 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.125 }, // 23 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.525 }, // 24 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.725 }, // 25 e
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.325 }, // 26 e
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.725 }, // 27 e
	{ boss: 'enem1', type: 'enem11', xPos: 4, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.821 }, // 28 f
	{ boss: 'enem1', type: 'enem11', xPos: 94, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.571 }, // 29 f
	{ boss: 'enem1', type: 'enem11', xPos: 4, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.321 }, // 30 f
	{ boss: 'enem1', type: 'enem11', xPos: 94, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.071 }, // 31 f
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.327 }, // 32 g
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.127 }, // 33 g
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.527 }, // 34 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.727 }, // 35 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.327 }, // 36 g
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.727 }, // 37 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.328 }, // 38 h
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.128 }, // 39 h
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.528 }, // 40 h
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.728 }, // 41 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.328 }, // 42 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.728 }, // 43 h
	{ boss: 'enem1', type: 'enem11', xPos: 94, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.921 }, // 44 i
	{ boss: 'enem1', type: 'enem11', xPos: 4, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.671 }, // 45 i
	{ boss: 'enem1', type: 'enem11', xPos: 94, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.421 }, // 46 i
	{ boss: 'enem1', type: 'enem11', xPos: 4, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.171 }, // 47 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.921 }, // 48 i
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 8.111, barricadeHits: 3, barricadePauseMs: 1200, barricadeRushSpeedMultiplier: 2.2 }, // 49 j
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.411 }, // 50 j
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.111 }, // 51 j
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.611 }, // 52 j

	// ===== Смоляк =====
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.441 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.441 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.941 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.441 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.741 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.241 }, // 5 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.442 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.442 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.942 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.442 }, // 9 b
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.742 }, // 10 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.242 }, // 11 b
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.443 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.443 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.943 }, // 14 c
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.443 }, // 15 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.743 }, // 16 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.243 }, // 17 c
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.444 }, // 18 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.444 }, // 19 d
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.944 }, // 20 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.444 }, // 21 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.744 }, // 22 d
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.244 }, // 23 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.445 }, // 24 e
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.445 }, // 25 e
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.945 }, // 26 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.445 }, // 27 e
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.745 }, // 28 e
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.245 }, // 29 e
	{ boss: 'enem2', type: 'enem22', xPos: 94, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.831 }, // 30 f
	{ boss: 'enem2', type: 'enem22', xPos: 4, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.581 }, // 31 f
	{ boss: 'enem2', type: 'enem22', xPos: 94, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.331 }, // 32 f
	{ boss: 'enem2', type: 'enem22', xPos: 4, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.081 }, // 33 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.831 }, // 34 f
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.447 }, // 35 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.447 }, // 36 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.947 }, // 37 g
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.447 }, // 38 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.747 }, // 39 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.247 }, // 40 g
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 25, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.448 }, // 41 h
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.448 }, // 42 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.948 }, // 43 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.448 }, // 44 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.748 }, // 45 h
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.248 }, // 46 h
	{ boss: 'enem2', type: 'enem22', xPos: 4, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.931 }, // 47 i
	{ boss: 'enem2', type: 'enem22', xPos: 94, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.681 }, // 48 i
	{ boss: 'enem2', type: 'enem22', xPos: 4, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.431 }, // 49 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.181 }, // 50 i
	{ boss: 'enem2', type: 'enem22', xPos: 4, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.931 }, // 51 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.681 }, // 52 i
	{ boss: 'enem2', type: 'enem22', xPos: 94, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8.128, barricadeHits: 4, barricadePauseMs: 1600, barricadeRushSpeedMultiplier: 2.3 }, // 53 j
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.124 }, // 54 j
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.624 }, // 55 j
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.424 }, // 56 j

	// ===== Токовик =====
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23.161 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23.661 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23.361 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23.861 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23.162 }, // 4 b
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23.662 }, // 5 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23.362 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23.862 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23.163 }, // 8 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23.663 }, // 9 c
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23.363 }, // 10 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23.863 }, // 11 c
	{ boss: 'enem3', type: 'enem33', xPos: 94, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23.164 }, // 12 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23.664 }, // 13 d
	{ boss: 'enem3', type: 'enem33', xPos: 94, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23.364 }, // 14 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23.864 }, // 15 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23.564 }, // 16 d
	{ boss: 'enem3', type: 'enem33', xPos: 94, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23.165 }, // 17 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23.665 }, // 18 e
	{ boss: 'enem3', type: 'enem33', xPos: 94, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23.365 }, // 19 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23.865 }, // 20 e
	{ boss: 'enem3', type: 'enem33', xPos: 94, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23.565 }, // 21 e
	{ boss: 'enem3', type: 'enem33', xPos: 94, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.841 }, // 22 f
	{ boss: 'enem3', type: 'enem33', xPos: 4, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.591 }, // 23 f
	{ boss: 'enem3', type: 'enem33', xPos: 94, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.341 }, // 24 f
	{ boss: 'enem3', type: 'enem33', xPos: 4, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.091 }, // 25 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23.167 }, // 26 g
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23.667 }, // 27 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23.367 }, // 28 g
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23.867 }, // 29 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23.567 }, // 30 g
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23.767 }, // 31 g
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23.168 }, // 32 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23.668 }, // 33 h
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23.368 }, // 34 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23.868 }, // 35 h
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23.568 }, // 36 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 23.768 }, // 37 h
	{ boss: 'enem3', type: 'enem33', xPos: 4, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.941 }, // 38 i
	{ boss: 'enem3', type: 'enem33', xPos: 94, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.691 }, // 39 i
	{ boss: 'enem3', type: 'enem33', xPos: 4, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.441 }, // 40 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.191 }, // 41 i
	{ boss: 'enem3', type: 'enem33', xPos: 4, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.941 }, // 42 i
	{ boss: 'enem3', type: 'enem33', xPos: 4, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8.145, barricadeHits: 5, barricadePauseMs: 2000, barricadeRushSpeedMultiplier: 2.4 }, // 43 j
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22.237 }, // 44 j
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22.737 }, // 45 j
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22.537 }, // 46 j
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22.937 }, // 47 j
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22.837 }, // 48 j

	// ===== Засечень =====
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16.271 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.271 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.771 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.571 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.071 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16.272 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.272 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.772 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.572 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.072 }, // 9 b
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16.273 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.273 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.773 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.573 }, // 13 c
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.073 }, // 14 c
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.873 }, // 15 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16.274 }, // 16 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.274 }, // 17 d
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.774 }, // 18 d
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.574 }, // 19 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.074 }, // 20 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.874 }, // 21 d
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16.275 }, // 22 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.275 }, // 23 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.775 }, // 24 e
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.575 }, // 25 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.075 }, // 26 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.875 }, // 27 e
	{ boss: 'enem4', type: 'enem44', xPos: 4, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.851 }, // 28 f
	{ boss: 'enem4', type: 'enem44', xPos: 94, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.601 }, // 29 f
	{ boss: 'enem4', type: 'enem44', xPos: 4, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.351 }, // 30 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.101 }, // 31 f
	{ boss: 'enem4', type: 'enem44', xPos: 4, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.851 }, // 32 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16.277 }, // 33 g
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.277 }, // 34 g
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.777 }, // 35 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.577 }, // 36 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.077 }, // 37 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.877 }, // 38 g
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16.278 }, // 39 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.278 }, // 40 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.778 }, // 41 h
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.578 }, // 42 h
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.078 }, // 43 h
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.878 }, // 44 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.278 }, // 45 h
	{ boss: 'enem4', type: 'enem44', xPos: 94, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.951 }, // 46 i
	{ boss: 'enem4', type: 'enem44', xPos: 4, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.701 }, // 47 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.451 }, // 48 i
	{ boss: 'enem4', type: 'enem44', xPos: 4, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.201 }, // 49 i
	{ boss: 'enem4', type: 'enem44', xPos: 94, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.951 }, // 50 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.701 }, // 51 i
	{ boss: 'enem4', type: 'enem44', xPos: 94, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8.5, barricadeHits: 6, barricadePauseMs: 2400, barricadeRushSpeedMultiplier: 2.5 }, // 52 j
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.15 }, // 53 j
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.65 }, // 54 j
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.45 }, // 55 j
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.95 }, // 56 j

	// ===== Дымокор =====
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.451 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.651 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.451 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.951 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.651 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22.151 }, // 5 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.452 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.652 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.452 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.952 }, // 9 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.652 }, // 10 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22.152 }, // 11 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.453 }, // 12 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.653 }, // 13 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.453 }, // 14 c
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.953 }, // 15 c
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.653 }, // 16 c
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22.153 }, // 17 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.454 }, // 18 d
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.654 }, // 19 d
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.454 }, // 20 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.954 }, // 21 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.654 }, // 22 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22.154 }, // 23 d
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.455 }, // 24 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.655 }, // 25 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.455 }, // 26 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.955 }, // 27 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.655 }, // 28 e
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22.155 }, // 29 e
	{ boss: 'enem5', type: 'enem55', xPos: 4, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.761 }, // 30 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.511 }, // 31 f
	{ boss: 'enem5', type: 'enem55', xPos: 4, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.261 }, // 32 f
	{ boss: 'enem5', type: 'enem55', xPos: 94, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.011 }, // 33 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.761 }, // 34 f
	{ boss: 'enem5', type: 'enem55', xPos: 4, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.511 }, // 35 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.457 }, // 36 g
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.657 }, // 37 g
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.457 }, // 38 g
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.957 }, // 39 g
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.657 }, // 40 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22.157 }, // 41 g
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.458 }, // 42 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.658 }, // 43 h
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.458 }, // 44 h
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.958 }, // 45 h
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.658 }, // 46 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22.158 }, // 47 h
	{ boss: 'enem5', type: 'enem55', xPos: 94, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.771 }, // 48 i
	{ boss: 'enem5', type: 'enem55', xPos: 4, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.521 }, // 49 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.271 }, // 50 i
	{ boss: 'enem5', type: 'enem55', xPos: 4, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.021 }, // 51 i
	{ boss: 'enem5', type: 'enem55', xPos: 94, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.771 }, // 52 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.521 }, // 53 i
	{ boss: 'enem5', type: 'enem55', xPos: 4, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.271 }, // 54 i
	{ boss: 'enem5', type: 'enem55', xPos: 4, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.5, barricadeHits: 7, barricadePauseMs: 2800, barricadeRushSpeedMultiplier: 2.6 }, // 55 j
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.163 }, // 56 j
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.663 }, // 57 j
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.463 }, // 58 j
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.963 }, // 59 j
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.763 }, // 60 j

];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 194, bossDelayAbDop: 11100, firstWaveDelayMs: 2910 }, // Раздвоенный хлёст вокруг завала
	{ boss: 'enem2', bossDelayAb: 195, bossDelayAbDop: 13400, firstWaveDelayMs: 2910 }, // Отложенная капля после липкой россыпи
	{ boss: 'enem3', bossDelayAb: 197, bossDelayAbDop: 10201, firstWaveDelayMs: 2910 }, // Наскок с повторным притопом
	{ boss: 'enem4', bossDelayAb: 154, bossDelayAbDop: 13500, firstWaveDelayMs: 2910 }, // Подрубка опоры и обратный топор
	{ boss: 'enem5', bossDelayAb: 147, bossDelayAbDop: 16100, firstWaveDelayMs: 2910 }, // Дымная крона оставляет корень
];

 const bossAbilitiesDop = [
	// Хлестуница
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 0, 250, 250], openingOrder: 0 },
	{ boss: 'enem1', indexAbilities: [5, 6, 7, 8, 9, 10], shotGapsMs: [0, 0, 250, 250, 0] },
	{ boss: 'enem1', indexAbilities: [11, 12, 13, 14, 15], shotGapsMs: [0, 250, 250, 250] },
	{ boss: 'enem1', indexAbilities: [16, 17, 18, 19, 20, 21], shotGapsMs: [0, 0, 250, 250, 0] },
	{ boss: 'enem1', indexAbilities: [22, 23, 24, 25, 26, 27], shotGapsMs: [0, 0, 250, 250, 0] },
	{ boss: 'enem1', indexAbilities: [28, 29, 30, 31], signature: true, isChain: true, shotDelayMs: 361, shotGapsMs: [0, 500, 500], openingOrder: 1 },
	{ boss: 'enem1', indexAbilities: [32, 33, 34, 35, 36, 37], minPhase: 2, shotGapsMs: [0, 0, 0, 250, 250] },
	{ boss: 'enem1', indexAbilities: [38, 39, 40, 41, 42, 43], minPhase: 3, shotGapsMs: [0, 0, 250, 250, 0] },
	{ boss: 'enem1', indexAbilities: [44, 45, 46, 47, 48], signature: true, isChain: true, minPhase: 3, shotDelayMs: 393, shotGapsMs: [500, 500, 500, 500] },
	{ boss: 'enem1', indexAbilities: [49, 50, 51, 52], barricade: true, shotGapsMs: [0, 250, 0], openingOrder: 2, label: "Завал: сначала срочные угрозы, затем полный разбор" },

	// Смоляк
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [0, 0, 500, 0, 500], openingOrder: 0 },
	{ boss: 'enem2', indexAbilities: [6, 7, 8, 9, 10, 11], shotGapsMs: [250, 0, 0, 0, 250] },
	{ boss: 'enem2', indexAbilities: [12, 13, 14, 15, 16, 17], shotGapsMs: [650, 650, 0, 250, 0] },
	{ boss: 'enem2', indexAbilities: [18, 19, 20, 21, 22, 23], shotGapsMs: [250, 0, 0, 0, 250] },
	{ boss: 'enem2', indexAbilities: [24, 25, 26, 27, 28, 29], shotGapsMs: [650, 650, 250, 250, 250] },
	{ boss: 'enem2', indexAbilities: [30, 31, 32, 33, 34], signature: true, isChain: true, shotDelayMs: 361, shotGapsMs: [0, 0, 500, 500], openingOrder: 1 },
	{ boss: 'enem2', indexAbilities: [35, 36, 37, 38, 39, 40], minPhase: 2, shotGapsMs: [250, 250, 0, 250, 650] },
	{ boss: 'enem2', indexAbilities: [41, 42, 43, 44, 45, 46], minPhase: 3, shotGapsMs: [250, 0, 250, 500, 250] },
	{ boss: 'enem2', indexAbilities: [47, 48, 49, 50, 51, 52], signature: true, isChain: true, minPhase: 3, shotDelayMs: 393, shotGapsMs: [0, 0, 0, 500, 500] },
	{ boss: 'enem2', indexAbilities: [53, 54, 55, 56], barricade: true, shotGapsMs: [0, 250, 250], openingOrder: 2, label: "Завал: сначала срочные угрозы, затем полный разбор" },

	// Токовик
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3], shotGapsMs: [500, 250, 0], openingOrder: 0 },
	{ boss: 'enem3', indexAbilities: [4, 5, 6, 7], shotGapsMs: [0, 650, 0] },
	{ boss: 'enem3', indexAbilities: [8, 9, 10, 11], shotGapsMs: [0, 650, 0] },
	{ boss: 'enem3', indexAbilities: [12, 13, 14, 15, 16], shotGapsMs: [0, 0, 0, 0] },
	{ boss: 'enem3', indexAbilities: [17, 18, 19, 20, 21], shotGapsMs: [0, 0, 0, 0] },
	{ boss: 'enem3', indexAbilities: [22, 23, 24, 25], signature: true, isChain: true, shotDelayMs: 361, shotGapsMs: [0, 0, 650], openingOrder: 1 },
	{ boss: 'enem3', indexAbilities: [26, 27, 28, 29, 30, 31], minPhase: 2, shotGapsMs: [0, 0, 0, 0, 0] },
	{ boss: 'enem3', indexAbilities: [32, 33, 34, 35, 36, 37], minPhase: 3, shotGapsMs: [0, 0, 0, 0, 0] },
	{ boss: 'enem3', indexAbilities: [38, 39, 40, 41, 42], signature: true, isChain: true, minPhase: 3, shotDelayMs: 393, shotGapsMs: [0, 0, 650, 0] },
	{ boss: 'enem3', indexAbilities: [43, 44, 45, 46, 47, 48], barricade: true, shotGapsMs: [0, 0, 500, 0, 500], openingOrder: 2, label: "Завал: сначала срочные угрозы, затем полный разбор" },

	// Засечень
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 0, 0, 0], openingOrder: 0 },
	{ boss: 'enem4', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [0, 0, 0, 650] },
	{ boss: 'enem4', indexAbilities: [10, 11, 12, 13, 14, 15], shotGapsMs: [250, 500, 0, 0, 0] },
	{ boss: 'enem4', indexAbilities: [16, 17, 18, 19, 20, 21], shotGapsMs: [250, 500, 0, 0, 0] },
	{ boss: 'enem4', indexAbilities: [22, 23, 24, 25, 26, 27], shotGapsMs: [0, 0, 250, 250, 0] },
	{ boss: 'enem4', indexAbilities: [28, 29, 30, 31, 32], signature: true, isChain: true, shotDelayMs: 361, shotGapsMs: [500, 500, 500, 500], openingOrder: 1 },
	{ boss: 'enem4', indexAbilities: [33, 34, 35, 36, 37, 38], minPhase: 2, shotGapsMs: [0, 0, 0, 0, 0] },
	{ boss: 'enem4', indexAbilities: [39, 40, 41, 42, 43, 44, 45], minPhase: 3, shotGapsMs: [0, 0, 0, 0, 0, 500] },
	{ boss: 'enem4', indexAbilities: [46, 47, 48, 49, 50, 51], signature: true, isChain: true, minPhase: 3, shotDelayMs: 393, shotGapsMs: [500, 500, 500, 500, 0] },
	{ boss: 'enem4', indexAbilities: [52, 53, 54, 55, 56], barricade: true, shotGapsMs: [0, 250, 0, 500], openingOrder: 2, label: "Завал: сначала срочные угрозы, затем полный разбор" },

	// Дымокор
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [0, 650, 650, 650, 0], openingOrder: 0 },
	{ boss: 'enem5', indexAbilities: [6, 7, 8, 9, 10, 11], shotGapsMs: [0, 650, 650, 650, 0] },
	{ boss: 'enem5', indexAbilities: [12, 13, 14, 15, 16, 17], shotGapsMs: [0, 0, 250, 500, 650] },
	{ boss: 'enem5', indexAbilities: [18, 19, 20, 21, 22, 23], shotGapsMs: [0, 0, 250, 500, 650] },
	{ boss: 'enem5', indexAbilities: [24, 25, 26, 27, 28, 29], shotGapsMs: [0, 500, 0, 650, 650] },
	{ boss: 'enem5', indexAbilities: [30, 31, 32, 33, 34, 35], signature: true, isChain: true, shotDelayMs: 361, shotGapsMs: [0, 0, 500, 500, 500], openingOrder: 1 },
	{ boss: 'enem5', indexAbilities: [36, 37, 38, 39, 40, 41], minPhase: 2, shotGapsMs: [0, 500, 0, 650, 650] },
	{ boss: 'enem5', indexAbilities: [42, 43, 44, 45, 46, 47], minPhase: 3, shotGapsMs: [0, 650, 250, 0, 250] },
	{ boss: 'enem5', indexAbilities: [48, 49, 50, 51, 52, 53, 54], signature: true, isChain: true, minPhase: 3, shotDelayMs: 393, shotGapsMs: [500, 500, 500, 500, 500, 500] },
	{ boss: 'enem5', indexAbilities: [55, 56, 57, 58, 59, 60], barricade: true, shotGapsMs: [0, 500, 0, 500, 0], openingOrder: 2, label: "Завал: сначала срочные угрозы, затем полный разбор" },

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
