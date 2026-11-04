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
//
// ПРАВКА 2026-09-16: живая проверка вскрыла, что форма «атакующей цепи» у
// ВСЕХ пяти боссов была буквальной копией уровня 41 (100% совпадение) —
// геометрия обеих цепей каждого босса переписана на новые формы/длины,
// подобранные так, чтобы не повторять ни один из уже сущeствующих 65
// уровней (проверено скриптом через реальный classifyChainShape). Остальная
// геометрия и архетипы НЕ трогались — у Шлёпика/Тулупыча/Бренчихи/Притворника
// уже была настоящая, обоснованная образом хитрость. Исключение — Щёлкан
// (CORNERS_ONLY): у него не было НИ ОДНОЙ атаки, нарушающей собственное
// правило «только по углам», так что вся серия по факту била туда, где
// игрок и так ждал угрозу — добавлена редкая ЦЕНТРАЛЬНАЯ атака и нежданчик,
// который выученное правило прямо нарушает.
let lvlNumber = 42;

const bossCombatConfig = {
	attackChains: true,
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.783, damageMultiplier: 1.782, minWaveDelay: 3301, minShotDelay: 160, minTelegraphMs: 511,
	phases: [
		{ phase: 1, minHp: 0.673, cadence: 1.022, speed: 1.04, damage: 1, telegraphMultiplier: 0.978, surpriseChance: 0.091, maxActiveAttacks: 19 },
		{ phase: 2, minHp: 0.323, cadence: 0.783, speed: 1.138, damage: 1.07, telegraphMultiplier: 0.849, surpriseChance: 0.19, maxActiveAttacks: 23 },
		{ phase: 3, minHp: 0, cadence: 0.621, speed: 1.242, damage: 1.14, telegraphMultiplier: 0.75, surpriseChance: 0.29, maxActiveAttacks: 27 }
	],
	bosses: {
		enem1: { combatIdentity: "Щеколда меняет край", combatTrick: "Щелчки проходят между левым краем и правой серединой, но последний срыв достигает дальнего правого угла. Цепь соединяет углы с внутренним возвратом. Ошибка — ждать только два края и пропустить внутреннее звено.", signatureEvery: 3, movementStyle: 'straight', cadence: 1.014, telegraphMs: 878, speedMultiplier: 1.015, damageMultiplier: 0.94, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem2: { combatIdentity: "Половик возвращается складкой", combatTrick: "Волнистый край половика выдаёт правую пару, затем разворачивается к левой складке. Медленный мокрый ком остаётся под активным ударом. Ошибка — считать правую пару окончанием шлепка.", signatureEvery: 3, movementStyle: 'wave', cadence: 1.025, telegraphMs: 851, speedMultiplier: 1.106, damageMultiplier: 0.98, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem3: { combatIdentity: "Рукав задерживает удар", combatTrick: "Тяжёлые рукава замирают, затем доводят замах; за левыми парами следует правый вынос. Цепь сначала собирается слева и вытягивается вправо. Ошибка — уйти с замершего рукава.", signatureEvery: 3, movementStyle: 'pause', cadence: 0.985, telegraphMs: 825, speedMultiplier: 1.055, damageMultiplier: 1.2, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem4: { combatIdentity: "Ключи скрывают правый ответ", combatTrick: "Левый веер быстрых ключей прикрывает поздний укол правой середины. Цепь начинается справа и требует вернуться после левого обхода. Ошибка — держать прицел только у ключевой руки.", signatureEvery: 3, movementStyle: 'weave', cadence: 0.975, telegraphMs: 791, speedMultiplier: 1.106, damageMultiplier: 1.05, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem5: { combatIdentity: "Дверь захлопывается повторно", combatTrick: "Ускоряющиеся удары закрывают левую тройку, возвращают защиту в правую середину и снова захлопывают левый проход. Цепь меняет направление после каждой пары. Ошибка — закончить блок после первого закрытия.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 0.955, telegraphMs: 760, speedMultiplier: 1.136, damageMultiplier: 1.14, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] }
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
 let timeNextBoss = 13;
 const bossInterval = 9;

 // Атаки по краям (x≤18 / x≥78) или ниже босса; быстрые (speed≥18) — y≤12
 // (раздел 5 правил уровня). Позиции спроектированы под свой архетип у каждого
 // босса (раздел 1) — см. комментарии-заголовки блоков ниже.

 const bossAbilities = [
	// ===== Щёлкан =====
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5.17 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.17 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.67 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 14, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.67 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.17 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.67 }, // 5 a
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5.17 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.67 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.17 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.67 }, // 9 b
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.67 }, // 10 b
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.67 }, // 11 b
	{ boss: 'enem1', type: 'enem11', xPos: 89, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5.17 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.17 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.67 }, // 14 c
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.67 }, // 15 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.17 }, // 16 c
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.67 }, // 17 c
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5.17 }, // 18 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.17 }, // 19 d
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.67 }, // 20 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.67 }, // 21 d
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.17 }, // 22 d
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.67 }, // 23 d
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5.17 }, // 24 e
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.67 }, // 25 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.17 }, // 26 e
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.67 }, // 27 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.67 }, // 28 e
	{ boss: 'enem1', type: 'enem11', xPos: 94, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.67 }, // 29 e
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.47 }, // 30 f
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.22 }, // 31 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.97 }, // 32 f
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.72 }, // 33 f
	{ boss: 'enem1', type: 'enem11', xPos: 93, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5.17 }, // 34 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.67 }, // 35 g
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.17 }, // 36 g
	{ boss: 'enem1', type: 'enem11', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.67 }, // 37 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.67 }, // 38 g
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.17 }, // 39 g
	{ boss: 'enem1', type: 'enem11', xPos: 87, yPos: 39, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5.17 }, // 40 h
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.17 }, // 41 h
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.67 }, // 42 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.67 }, // 43 h
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.17 }, // 44 h
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.67 }, // 45 h
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.37 }, // 46 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.12 }, // 47 i
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.87 }, // 48 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.62 }, // 49 i
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.37 }, // 50 i

	// ===== Шлёпик =====
	{ boss: 'enem2', type: 'enem22', xPos: 19, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5.11, waveAmplitude: 2.17, waveFrequency: 1.11, wavePhase: 0 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.61, waveAmplitude: 3.19, waveFrequency: 1.73, wavePhase: 0.4 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16.61, waveAmplitude: 4.21, waveFrequency: 2.13, wavePhase: 0.9 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.61, waveAmplitude: 2.17, waveFrequency: 1.11, wavePhase: 0 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.61, waveAmplitude: 3.19, waveFrequency: 1.73, wavePhase: 0.4 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16.61, waveAmplitude: 4.21, waveFrequency: 2.13, wavePhase: 0.9 }, // 5 a
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5.11, waveAmplitude: 2.17, waveFrequency: 1.11, wavePhase: 0 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16.61, waveAmplitude: 3.19, waveFrequency: 1.73, wavePhase: 0.4 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.61, waveAmplitude: 4.21, waveFrequency: 2.13, wavePhase: 0.9 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.61, waveAmplitude: 2.17, waveFrequency: 1.11, wavePhase: 0 }, // 9 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16.61, waveAmplitude: 3.19, waveFrequency: 1.73, wavePhase: 0.4 }, // 10 b
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.61, waveAmplitude: 4.21, waveFrequency: 2.13, wavePhase: 0.9 }, // 11 b
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5.11, waveAmplitude: 2.17, waveFrequency: 1.11, wavePhase: 0 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.61, waveAmplitude: 3.19, waveFrequency: 1.73, wavePhase: 0.4 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16.61, waveAmplitude: 4.21, waveFrequency: 2.13, wavePhase: 0.9 }, // 14 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.61, waveAmplitude: 2.17, waveFrequency: 1.11, wavePhase: 0 }, // 15 c
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.61, waveAmplitude: 3.19, waveFrequency: 1.73, wavePhase: 0.4 }, // 16 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16.61, waveAmplitude: 4.21, waveFrequency: 2.13, wavePhase: 0.9 }, // 17 c
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5.11, waveAmplitude: 2.17, waveFrequency: 1.11, wavePhase: 0 }, // 18 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.61, waveAmplitude: 3.19, waveFrequency: 1.73, wavePhase: 0.4 }, // 19 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16.61, waveAmplitude: 4.21, waveFrequency: 2.13, wavePhase: 0.9 }, // 20 d
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.61, waveAmplitude: 2.17, waveFrequency: 1.11, wavePhase: 0 }, // 21 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.61, waveAmplitude: 3.19, waveFrequency: 1.73, wavePhase: 0.4 }, // 22 d
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16.61, waveAmplitude: 4.21, waveFrequency: 2.13, wavePhase: 0.9 }, // 23 d
	{ boss: 'enem2', type: 'enem22', xPos: 17, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5.11, waveAmplitude: 2.17, waveFrequency: 1.11, wavePhase: 0 }, // 24 e
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.61, waveAmplitude: 3.19, waveFrequency: 1.73, wavePhase: 0.4 }, // 25 e
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16.61, waveAmplitude: 4.21, waveFrequency: 2.13, wavePhase: 0.9 }, // 26 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.61, waveAmplitude: 2.17, waveFrequency: 1.11, wavePhase: 0 }, // 27 e
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.61, waveAmplitude: 3.19, waveFrequency: 1.73, wavePhase: 0.4 }, // 28 e
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16.61, waveAmplitude: 4.21, waveFrequency: 2.13, wavePhase: 0.9 }, // 29 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.31, waveAmplitude: 2.17, waveFrequency: 1.11, wavePhase: 0 }, // 30 f
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.06, waveAmplitude: 3.19, waveFrequency: 1.73, wavePhase: 0.4 }, // 31 f
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.81, waveAmplitude: 4.21, waveFrequency: 2.13, wavePhase: 0.9 }, // 32 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.56, waveAmplitude: 2.17, waveFrequency: 1.11, wavePhase: 0 }, // 33 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.31, waveAmplitude: 3.19, waveFrequency: 1.73, wavePhase: 0.4 }, // 34 f
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5.11, waveAmplitude: 2.17, waveFrequency: 1.11, wavePhase: 0 }, // 35 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16.61, waveAmplitude: 3.19, waveFrequency: 1.73, wavePhase: 0.4 }, // 36 g
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.61, waveAmplitude: 4.21, waveFrequency: 2.13, wavePhase: 0.9 }, // 37 g
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.61, waveAmplitude: 2.17, waveFrequency: 1.11, wavePhase: 0 }, // 38 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16.61, waveAmplitude: 3.19, waveFrequency: 1.73, wavePhase: 0.4 }, // 39 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.61, waveAmplitude: 4.21, waveFrequency: 2.13, wavePhase: 0.9 }, // 40 g
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.61, waveAmplitude: 2.17, waveFrequency: 1.11, wavePhase: 0 }, // 41 g
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 36, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5.11, waveAmplitude: 2.17, waveFrequency: 1.11, wavePhase: 0 }, // 42 h
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.61, waveAmplitude: 3.19, waveFrequency: 1.73, wavePhase: 0.4 }, // 43 h
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16.61, waveAmplitude: 4.21, waveFrequency: 2.13, wavePhase: 0.9 }, // 44 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.61, waveAmplitude: 2.17, waveFrequency: 1.11, wavePhase: 0 }, // 45 h
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14.61, waveAmplitude: 3.19, waveFrequency: 1.73, wavePhase: 0.4 }, // 46 h
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15.61, waveAmplitude: 4.21, waveFrequency: 2.13, wavePhase: 0.9 }, // 47 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 16.61, waveAmplitude: 2.17, waveFrequency: 1.11, wavePhase: 0 }, // 48 h
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.21, waveAmplitude: 2.17, waveFrequency: 1.11, wavePhase: 0 }, // 49 i
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.96, waveAmplitude: 3.19, waveFrequency: 1.73, wavePhase: 0.4 }, // 50 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.71, waveAmplitude: 4.21, waveFrequency: 2.13, wavePhase: 0.9 }, // 51 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.46, waveAmplitude: 2.17, waveFrequency: 1.11, wavePhase: 0 }, // 52 i
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.21, waveAmplitude: 3.19, waveFrequency: 1.73, wavePhase: 0.4 }, // 53 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.96, waveAmplitude: 4.21, waveFrequency: 2.13, wavePhase: 0.9 }, // 54 i

	// ===== Тулупыч =====
	{ boss: 'enem3', type: 'enem33', xPos: 88, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.13 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18.21 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.21 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 19.21 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.21 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 89, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.13 }, // 5 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 19.21 }, // 6 b
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.21 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18.21 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.21 }, // 9 b
	{ boss: 'enem3', type: 'enem33', xPos: 87, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.13 }, // 10 c
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18.21 }, // 11 c
	{ boss: 'enem3', type: 'enem33', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.21 }, // 12 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 19.21 }, // 13 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.21 }, // 14 c
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18.21 }, // 15 c
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.13 }, // 16 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18.21 }, // 17 d
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.21 }, // 18 d
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 19.21 }, // 19 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.21 }, // 20 d
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18.21 }, // 21 d
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.13 }, // 22 e
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18.21 }, // 23 e
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 19.21 }, // 24 e
	{ boss: 'enem3', type: 'enem33', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.21 }, // 25 e
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.21 }, // 26 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18.61 }, // 27 e
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.41 }, // 28 f
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.16 }, // 29 f
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.91 }, // 30 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.66 }, // 31 f
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.41 }, // 32 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.16 }, // 33 f
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.13 }, // 34 g
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.21 }, // 35 g
	{ boss: 'enem3', type: 'enem33', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18.21 }, // 36 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 19.21 }, // 37 g
	{ boss: 'enem3', type: 'enem33', xPos: 13, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.21 }, // 38 g
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18.21 }, // 39 g
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.13 }, // 40 h
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 19.21 }, // 41 h
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.21 }, // 42 h
	{ boss: 'enem3', type: 'enem33', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18.21 }, // 43 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.21 }, // 44 h
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 19.21 }, // 45 h
	{ boss: 'enem3', type: 'enem33', xPos: 13, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18.21 }, // 46 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.51 }, // 47 i
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.26 }, // 48 i
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.01 }, // 49 i
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.76 }, // 50 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.51 }, // 51 i

	// ===== Бренчиха =====
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.11 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.11 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.11 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.11 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.11 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.17 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.17 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.17 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.17 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.17 }, // 9 b
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.11 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.11 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.11 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.11 }, // 13 c
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.11 }, // 14 c
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.11 }, // 15 d
	{ boss: 'enem4', type: 'enem44', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.11 }, // 16 d
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.11 }, // 17 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.11 }, // 18 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.11 }, // 19 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.11 }, // 20 e
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.11 }, // 21 e
	{ boss: 'enem4', type: 'enem44', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.11 }, // 22 e
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.11 }, // 23 e
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.11 }, // 24 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.29 }, // 25 f
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.04 }, // 26 f
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.79 }, // 27 f
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.54 }, // 28 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.29 }, // 29 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.11 }, // 30 g
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.11 }, // 31 g
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.11 }, // 32 g
	{ boss: 'enem4', type: 'enem44', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.11 }, // 33 g
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.11 }, // 34 g
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.17 }, // 35 h
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.17 }, // 36 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.17 }, // 37 h
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.17 }, // 38 h
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.17 }, // 39 h
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.39 }, // 40 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.14 }, // 41 i
	{ boss: 'enem4', type: 'enem44', xPos: 14, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.89 }, // 42 i
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.64 }, // 43 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.39 }, // 44 i
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.14 }, // 45 i

	// ===== Притворник =====
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.81 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.81 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.81 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.81 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.81 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.81 }, // 5 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.81 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.81 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.81 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.81 }, // 9 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.81 }, // 10 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.81 }, // 11 b
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5.19 }, // 12 c
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.81 }, // 13 c
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.81 }, // 14 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.81 }, // 15 c
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.81 }, // 16 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.81 }, // 17 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.81 }, // 18 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.81 }, // 19 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.81 }, // 20 d
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.81 }, // 21 d
	{ boss: 'enem5', type: 'enem55', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.81 }, // 22 d
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.81 }, // 23 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.81 }, // 24 d
	{ boss: 'enem5', type: 'enem55', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.81 }, // 25 e
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.81 }, // 26 e
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.81 }, // 27 e
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.81 }, // 28 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.81 }, // 29 e
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.11 }, // 30 f
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.86 }, // 31 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.61 }, // 32 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.36 }, // 33 f
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.11 }, // 34 f
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.86 }, // 35 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.61 }, // 36 f
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5.19 }, // 37 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.81 }, // 38 g
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.81 }, // 39 g
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.81 }, // 40 g
	{ boss: 'enem5', type: 'enem55', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.81 }, // 41 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.81 }, // 42 g
	{ boss: 'enem5', type: 'enem55', xPos: 91, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5.19 }, // 43 h
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.81 }, // 44 h
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.81 }, // 45 h
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.81 }, // 46 h
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.81 }, // 47 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.81 }, // 48 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.21 }, // 49 i
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.96 }, // 50 i
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.71 }, // 51 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.46 }, // 52 i
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.21 }, // 53 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.96 }, // 54 i

];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 155, bossDelayAbDop: 8800, firstWaveDelayMs: 2300 }, // Щеколда меняет край
	{ boss: 'enem2', bossDelayAb: 155, bossDelayAbDop: 9800, firstWaveDelayMs: 2300 }, // Половик возвращается складкой
	{ boss: 'enem3', bossDelayAb: 156, bossDelayAbDop: 10200, firstWaveDelayMs: 2300 }, // Рукав задерживает удар
	{ boss: 'enem4', bossDelayAb: 181, bossDelayAbDop: 6200, firstWaveDelayMs: 2300 }, // Ключи скрывают правый ответ
	{ boss: 'enem5', bossDelayAb: 155, bossDelayAbDop: 9700, firstWaveDelayMs: 2300 }, // Дверь захлопывается повторно
];

 const bossAbilitiesDop = [
	// Щёлкан
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [0, 0, 300, 300, 0], openingOrder: 0, label: "Щелчок к внутреннему краю" },
	{ boss: 'enem1', indexAbilities: [6, 7, 8, 9, 10, 11], shotGapsMs: [0, 600, 300, 0, 300], label: "Щеколда срывается вправо" },
	{ boss: 'enem1', indexAbilities: [12, 13, 14, 15, 16, 17], shotGapsMs: [0, 0, 300, 300, 300], label: "Неполный обход коробки" },
	{ boss: 'enem1', indexAbilities: [18, 19, 20, 21, 22, 23], shotGapsMs: [0, 0, 600, 0, 600], label: "Двойное закрытие" },
	{ boss: 'enem1', indexAbilities: [24, 25, 26, 27, 28, 29], shotGapsMs: [0, 300, 0, 0, 300], label: "Угол за возвратом" },
	{ boss: 'enem1', indexAbilities: [30, 31, 32, 33], signature: true, isChain: true, shotDelayMs: 310, shotGapsMs: [0, 0, 0], openingOrder: 1, label: "Цепь внутренних петель" },
	{ boss: 'enem1', indexAbilities: [34, 35, 36, 37, 38, 39], minPhase: 2, shotGapsMs: [0, 300, 600, 0, 300], label: "Последний щелчок меняет край" },
	{ boss: 'enem1', indexAbilities: [40, 41, 42, 43, 44, 45], minPhase: 3, shotGapsMs: [0, 0, 0, 0, 0], label: "Петля с правым срывом" },
	{ boss: 'enem1', indexAbilities: [46, 47, 48, 49, 50], signature: true, isChain: true, minPhase: 3, shotDelayMs: 310, shotGapsMs: [0, 0, 0, 0], label: "Обратная цепь щеколды" },

	// Шлёпик
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [600, 300, 0, 0, 300], openingOrder: 0, label: "Складка после правой пары" },
	{ boss: 'enem2', indexAbilities: [6, 7, 8, 9, 10, 11], shotGapsMs: [0, 0, 0, 600, 0], label: "Половик не закончил шлепок" },
	{ boss: 'enem2', indexAbilities: [12, 13, 14, 15, 16, 17], shotGapsMs: [300, 600, 0, 600, 0], label: "Край захлёстывает обратно" },
	{ boss: 'enem2', indexAbilities: [18, 19, 20, 21, 22, 23], shotGapsMs: [0, 0, 300, 300, 600], label: "Правый шлепок с левым концом" },
	{ boss: 'enem2', indexAbilities: [24, 25, 26, 27, 28, 29], shotGapsMs: [600, 0, 0, 300, 0], label: "Мокрая складка возвращается" },
	{ boss: 'enem2', indexAbilities: [30, 31, 32, 33, 34], signature: true, isChain: true, shotDelayMs: 310, shotGapsMs: [0, 0, 0, 0], openingOrder: 1, label: "Цепь мокрых складок" },
	{ boss: 'enem2', indexAbilities: [35, 36, 37, 38, 39, 40, 41], minPhase: 2, shotGapsMs: [0, 0, 0, 300, 0, 300], label: "Двойной правый залом" },
	{ boss: 'enem2', indexAbilities: [42, 43, 44, 45, 46, 47, 48], minPhase: 3, shotGapsMs: [0, 300, 600, 0, 0, 300], label: "Третий шлепок из складки" },
	{ boss: 'enem2', indexAbilities: [49, 50, 51, 52, 53, 54], signature: true, isChain: true, minPhase: 3, shotDelayMs: 310, shotGapsMs: [0, 0, 0, 0, 0], label: "Цепь с обратным заломом" },

	// Тулупыч
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 600, 0, 600], openingOrder: 0, label: "Рукав висит над проходом" },
	{ boss: 'enem3', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [300, 300, 600, 0], label: "Правый замах и левая тяжесть" },
	{ boss: 'enem3', indexAbilities: [10, 11, 12, 13, 14, 15], shotGapsMs: [0, 300, 0, 300, 600], label: "Подол следует за рукавом" },
	{ boss: 'enem3', indexAbilities: [16, 17, 18, 19, 20, 21], shotGapsMs: [0, 300, 600, 0, 0], label: "Два рукава и поздний подол" },
	{ boss: 'enem3', indexAbilities: [22, 23, 24, 25, 26, 27], shotGapsMs: [0, 300, 600, 300, 0], label: "Возврат тяжёлой полы" },
	{ boss: 'enem3', indexAbilities: [28, 29, 30, 31, 32, 33], signature: true, isChain: true, shotDelayMs: 310, shotGapsMs: [0, 0, 0, 0, 0], openingOrder: 1, label: "Цепь рукавов и подола" },
	{ boss: 'enem3', indexAbilities: [34, 35, 36, 37, 38, 39], minPhase: 2, shotGapsMs: [600, 0, 300, 300, 300], label: "Левый замах не окончен" },
	{ boss: 'enem3', indexAbilities: [40, 41, 42, 43, 44, 45, 46], minPhase: 3, shotGapsMs: [0, 600, 0, 0, 300, 0], label: "Рукава смыкаются дважды" },
	{ boss: 'enem3', indexAbilities: [47, 48, 49, 50, 51], signature: true, isChain: true, minPhase: 3, shotDelayMs: 310, shotGapsMs: [0, 0, 0, 0], label: "Цепь тяжёлого разворота" },

	// Бренчиха
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [300, 0, 0, 300], openingOrder: 0, label: "Три ключа и ответ справа" },
	{ boss: 'enem4', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [180, 180, 180, 400], label: "Звон возвращается к связке" },
	{ boss: 'enem4', indexAbilities: [10, 11, 12, 13, 14], shotGapsMs: [0, 250, 250, 250], label: "Укол внутри левого веера" },
	{ boss: 'enem4', indexAbilities: [15, 16, 17, 18, 19], shotGapsMs: [0, 0, 0, 0], label: "Правый ключ остаётся" },
	{ boss: 'enem4', indexAbilities: [20, 21, 22, 23, 24], shotGapsMs: [0, 0, 0, 0], label: "Левые ключи закрывают след" },
	{ boss: 'enem4', indexAbilities: [25, 26, 27, 28, 29], signature: true, isChain: true, shotDelayMs: 310, shotGapsMs: [0, 0, 0, 0], openingOrder: 1, label: "Цепь ключей вокруг руки" },
	{ boss: 'enem4', indexAbilities: [30, 31, 32, 33, 34], minPhase: 2, shotGapsMs: [0, 0, 0, 0], label: "Четвёртый ключ за уколом" },
	{ boss: 'enem4', indexAbilities: [35, 36, 37, 38, 39], minPhase: 3, shotGapsMs: [250, 250, 250, 250], label: "Последний ключ после возврата" },
	{ boss: 'enem4', indexAbilities: [40, 41, 42, 43, 44, 45], signature: true, isChain: true, minPhase: 3, shotDelayMs: 310, shotGapsMs: [0, 0, 0, 0, 0], label: "Цепь с оборотом связки" },

	// Притворник
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [0, 300, 0, 0, 0], openingOrder: 0, label: "Левая створка и правый засов" },
	{ boss: 'enem5', indexAbilities: [6, 7, 8, 9, 10, 11], shotGapsMs: [0, 0, 0, 0, 0], label: "Створки закрывают по очереди" },
	{ boss: 'enem5', indexAbilities: [12, 13, 14, 15, 16, 17, 18], shotGapsMs: [0, 0, 0, 600, 600, 0], label: "Правый засов после левого удара" },
	{ boss: 'enem5', indexAbilities: [19, 20, 21, 22, 23, 24], shotGapsMs: [0, 0, 0, 0, 0], label: "Дверь отвечает левой створкой" },
	{ boss: 'enem5', indexAbilities: [25, 26, 27, 28, 29], shotGapsMs: [0, 0, 0, 0], label: "Поздний удар в левый проход" },
	{ boss: 'enem5', indexAbilities: [30, 31, 32, 33, 34, 35, 36], signature: true, isChain: true, shotDelayMs: 310, shotGapsMs: [0, 0, 0, 0, 0, 0], openingOrder: 1, label: "Цепь дверных засовов" },
	{ boss: 'enem5', indexAbilities: [37, 38, 39, 40, 41, 42], minPhase: 2, shotGapsMs: [300, 0, 0, 0, 300], label: "Дверь закрывается повторно" },
	{ boss: 'enem5', indexAbilities: [43, 44, 45, 46, 47, 48], minPhase: 3, shotGapsMs: [600, 300, 300, 0, 0], label: "Третье закрытие прохода" },
	{ boss: 'enem5', indexAbilities: [49, 50, 51, 52, 53, 54], signature: true, isChain: true, minPhase: 3, shotDelayMs: 310, shotGapsMs: [0, 0, 0, 0, 0], label: "Обратная цепь привратника" },

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
