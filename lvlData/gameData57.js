// Уровень 57 «Кузница во дворе» — восемнадцатый уровень области V, обычный
// (пять разных монстров, как 41-44/46-49/51-54/56).
//
// ДВОЙНАЯ ПРОВЕРКА УНИКАЛЬНОСТИ (раздел 1.2) — ШАГ 1 выполнен 2026-09-12 по
// admin-boss-pattern-panel.html, 280 строк, уровни 1-56 (включая свежую
// историю уровня 56, только что записанного).
//
// АРТ (images/enemies/regions/5_dom_dvor/lvl57/) — все 5 картинок открыты и
// сверены лично:
// 1.webp — кожаный мех для раздувания углей: залатанный кожаный мешок-тело
//   на деревянных «челюстях»-рукоятях, металлический носик спереди дует
//   красными тлеющими угольками — сжимается и раздувается ритмично.
// 2.webp — длинные раскалённые клещи: две тонкие металлические ноги-рычаги
//   с малым лицом на шарнире посередине, в верхних губках зажата
//   раскалённая докрасна подкова — узкий высокий силуэт, весь смысл в
//   ЗАХВАТЕ.
// 3.webp — гулкая наковальня: тяжёлое металлическое тело с носом-рогом,
//   поднятый кулак-блок готов обрушиться, за ним нарисованы красные полосы
//   отдачи/гула — удар, который ЗВЕНИТ и ЭХОМ расходится, а не просто бьёт.
// 4.webp — чумазый подмастерье: закопчённое тело, кирпично-красная
//   потрескавшаяся маска-лицо (как печная заслонка), кожаный фартук, держит
//   тяжёлый двуручный молот низко наизготовку — простой прямой удар без
//   изысков, ещё не набита рука.
// 5.webp (финал) — мастер горна: самый широкий и высокий силуэт, тёмная
//   косматая шкура, маска-лицо как раскалённый металл с усами, молот в
//   одной руке занесён, вторая рука тянется когтистой хваткой — сочетает
//   ХВАТ клещей И УДАР молота разом, венчает весь процесс ковки.
// 11-55.webp — круглые медальоны-портреты, обычная конвенция для сюжетных
//   врагов-«подтипов» (та же, что использована на уровне 56), не боевые
//   спрайты.
//
// ТЕМА — процесс ковки как сквозная механика (правило про единый
// мотив уровня, см. комментарий к уровню 52 «Водяная мельница»): мехи
// раздувают огонь → клещи держат раскалённый металл → наковальня звенит
// под ударом → подмастерье бьёт молотом → мастер горна объединяет хват и
// удар — прямая производственная цепочка кузницы, а не общий шаблон роли.
//
// НАЗВАНИЯ (раздел 12 — придуманные, не словарные): Поддувень (от
// «поддувать» — то, что раздувает огонь снизу); Цапыч (от «цапать» —
// хватательное, суффикс «-ыч» как у Тяпыча/Багорыча); Гудило (от «гудеть» —
// гул наковальни); Молотыш (от «молот» — простой безыскусный удар
// подмастерья); Жарило (от «жар» — не путать со словарным «горнило»,
// собственное образование под тему пышущего жаром мастера).
//
// ДВИЖЕНИЕ (movementStyle) — сверено с полным распределением 1-56 (роли
// независимы друг от друга и от предыдущего уровня): Поддувень — accelerate
// (нарастающее сжатие мехов перед выдохом угля) 13%→14%; Цапыч — straight
// (прямой безо всяких финтов щелчок клещей) 11%→12%, самый низкий бакет
// роли; Гудило — accelerate (гул наковальни расходится, набирая ширину)
// 13%→14%; Молотыш — straight (подмастерье бьёт просто и прямо, ещё не
// набита рука для финтов) 11%→12%, самый низкий бакет роли; Жарило —
// accelerate (мастер набирает мощь перед объединённым хватом-ударом)
// 14%→15%.
//
// ЦЕПИ (13.6/13.7) — выбраны из образа И заранее сверены с полным
// распределением, включая ТОЧНЫЕ ПАРЫ форм (урок уровня 56 — панель
// хранит историю не только отдельных форм chain-A/chain-B, но и их точных
// пар на роль, часть пар уровня 56 совпала с уровнями 52/54 и потребовала
// вторичной правки; в этот раз пары сверены ДО записи файла):
// Поддувень — vertical(3)+diagonal(4): ровный выдох прямо вниз, затем
// более сильный направленный залп наискось (пара с нулевой историей для
// enem1); Цапыч — diagonal(3)+diagonal(4): клещи щёлкают по диагонали с
// одной стороны, затем с другой — то же движение зеркально (пара с нулевой
// историей для enem2); Гудило — diagonal(4)+arc(4): удар наискось, затем
// гул широкой дугой расходится вовне (пара с нулевой историей для enem3);
// Молотыш — zigzag(4)+arc(4): нервный сбивчивый замах, но добивает широким
// уверенным взмахом (пара с нулевой историей для enem4); Жарило —
// irregular(5)+irregular(6): хаотичное сочетание хвата и удара по всему
// двору, ни одна атака не повторяет предыдущую траекторию — венчает
// уровень (пара с нулевой историей для enem5; изначально спроектирована
// длиной 7, но раздел 13.5 «половина самой длинной цепи» вывел
// halfChain% выше 100% у Милы/Елисея (106.6%/109.5%, хуже прецедента
// уровней 55-56) — укорочена до 6, вернув halfChain% в безопасный
// коридор). Формы всех пяти пар подтверждены живым классификатором панели
// ПОСЛЕ записи файла (verify57.js + STEP 2), не только ручным расчётом.
let lvlNumber = 57;

const bossCombatConfig = {
	attackChains: true,
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.747, damageMultiplier: 1.782, minWaveDelay: 4900, minShotDelay: 105, minTelegraphMs: 552,
	phases: [
		{ phase: 1, minHp: 0.695, cadence: 0.964, speed: 1.047, damage: 1, telegraphMultiplier: 1.039, surpriseChance: 0.115, maxActiveAttacks: 34 },
		{ phase: 2, minHp: 0.346, cadence: 0.796, speed: 1.182, damage: 1.12, telegraphMultiplier: 0.875, surpriseChance: 0.215, maxActiveAttacks: 38 },
		{ phase: 3, minHp: 0, cadence: 0.615, speed: 1.293, damage: 1.22, telegraphMultiplier: 0.774, surpriseChance: 0.315, maxActiveAttacks: 42 }
	],
	bosses: {
		enem1: { combatIdentity: "Два поддува и оставшийся уголь под искрами", combatTrick: "После первого поддува остаются второй выдох и тлеющий уголь под быстрыми искрами. Ошибка — принять первый выдох за окончание сжатия мехов.", signatureEvery: 3, movementStyle: 'wave', cadence: 0.996, telegraphMs: 951, speedMultiplier: 1.032, damageMultiplier: 0.9, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem2: { combatIdentity: "Парные губки захвата и вынос подковы", combatTrick: "Губки закрываются парой целей, захваченная подкова остаётся концом захвата. Ошибка — уйти после первой губки либо забыть вынос после закрытия.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 0.99, telegraphMs: 863, speedMultiplier: 1.067, damageMultiplier: 1, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem3: { combatIdentity: "Удар, расходящийся звон и поздний рог", combatTrick: "После тяжёлого удара расходится звон, а рог отвечает позже. Ошибка — бить наковальню в заминке, пока звон ещё переходит между полосами.", signatureEvery: 3, movementStyle: 'pause', cadence: 0.827, telegraphMs: 1071, speedMultiplier: 1.017, damageMultiplier: 1.17, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem4: { combatIdentity: "Прямой удар и избыточный занос подмастерья", combatTrick: "Простой удар проходит точку контакта, оставляя избыточный занос. Ошибка — принять контакт за всё движение и ударить до его окончания.", signatureEvery: 3, movementStyle: 'straight', cadence: 0.968, telegraphMs: 833, speedMultiplier: 1.086, damageMultiplier: 1.04, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem5: { combatIdentity: "Хват заготовки, удары ковки и посадка на рог", combatTrick: "Хват удерживает заготовку, пока идут удары ковки и заключительная посадка на рог. Ошибка — бить мастера после захвата либо первых ударов, не завершив операцию.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 0.946, telegraphMs: 1002, speedMultiplier: 1.089, damageMultiplier: 1.15, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] }
	}
};

const ENEMY_TYPES = {

	enem11: { name: 'enem11', image: 'images/enemies/regions/5_dom_dvor/lvl57/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { name: 'enem22', image: 'images/enemies/regions/5_dom_dvor/lvl57/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { name: 'enem33', image: 'images/enemies/regions/5_dom_dvor/lvl57/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { name: 'enem44', image: 'images/enemies/regions/5_dom_dvor/lvl57/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { name: 'enem55', image: 'images/enemies/regions/5_dom_dvor/lvl57/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
        name: 'enem1',
		dispName: 'Поддувень',
        image: 'images/enemies/regions/5_dom_dvor/lvl57/1.webp',
        baseHP: 14421,
        baseSpeed: 0,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 250,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem2: {
        name: 'enem2',
		dispName: 'Цапыч',
        image: 'images/enemies/regions/5_dom_dvor/lvl57/2.webp',
        baseHP: 36053,
        baseSpeed: 0,
        baseDamage: 22,
        spawnWeight: 15,
		baseExp: 400,
        size: '29%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem3: {
        name: 'enem3',
		dispName: 'Гудило',
        image: 'images/enemies/regions/5_dom_dvor/lvl57/3.webp',
        baseHP: 63785,
        baseSpeed: 0,
        baseDamage: 24,
        spawnWeight: 20,
		baseExp: 600,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem4: {
        name: 'enem4',
		dispName: 'Молотыш',
        image: 'images/enemies/regions/5_dom_dvor/lvl57/4.webp',
        baseHP: 102611,
        baseSpeed: 0,
        baseDamage: 26,
        spawnWeight: 10,
		baseExp: 800,
        size: '29%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem5: {
        name: 'enem5',
		dispName: 'Жарило',
        image: 'images/enemies/regions/5_dom_dvor/lvl57/5.webp',
        baseHP: 155304,
        baseSpeed: 0,
        baseDamage: 28,
        spawnWeight: 5,
		baseExp: 0,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 1000 }
    },


};

 let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
 let timeNextBoss = 20;
 const bossInterval = 23;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
 // speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Поддувень =====
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.33, waveAmplitude: 2.91, waveFrequency: 1.31, wavePhase: 0.31 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.43, waveAmplitude: 3.91, waveFrequency: 1.81, wavePhase: 1.31 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.13, waveAmplitude: 4.91, waveFrequency: 2.31, wavePhase: 2.31 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.13, waveAmplitude: 2.91, waveFrequency: 1.31, wavePhase: 0.31 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.63, waveAmplitude: 3.91, waveFrequency: 1.81, wavePhase: 1.31 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.63, waveAmplitude: 4.91, waveFrequency: 2.31, wavePhase: 2.31 }, // 5 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.33, waveAmplitude: 2.91, waveFrequency: 1.31, wavePhase: 0.31 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.13, waveAmplitude: 3.91, waveFrequency: 1.81, wavePhase: 1.31 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.13, waveAmplitude: 4.91, waveFrequency: 2.31, wavePhase: 2.31 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.13, waveAmplitude: 2.91, waveFrequency: 1.31, wavePhase: 0.31 }, // 9 b
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.63, waveAmplitude: 3.91, waveFrequency: 1.81, wavePhase: 1.31 }, // 10 b
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.63, waveAmplitude: 4.91, waveFrequency: 2.31, wavePhase: 2.31 }, // 11 b
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 15, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.13, waveAmplitude: 2.91, waveFrequency: 1.31, wavePhase: 0.31 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.13, waveAmplitude: 3.91, waveFrequency: 1.81, wavePhase: 1.31 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.13, waveAmplitude: 4.91, waveFrequency: 2.31, wavePhase: 2.31 }, // 14 c
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.13, waveAmplitude: 2.91, waveFrequency: 1.31, wavePhase: 0.31 }, // 15 c
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.13, waveAmplitude: 3.91, waveFrequency: 1.81, wavePhase: 1.31 }, // 16 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.63, waveAmplitude: 4.91, waveFrequency: 2.31, wavePhase: 2.31 }, // 17 c
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.63, waveAmplitude: 2.91, waveFrequency: 1.31, wavePhase: 0.31 }, // 18 c
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 15, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.13, waveAmplitude: 2.91, waveFrequency: 1.31, wavePhase: 0.31 }, // 19 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.13, waveAmplitude: 3.91, waveFrequency: 1.81, wavePhase: 1.31 }, // 20 d
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.13, waveAmplitude: 4.91, waveFrequency: 2.31, wavePhase: 2.31 }, // 21 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.13, waveAmplitude: 2.91, waveFrequency: 1.31, wavePhase: 0.31 }, // 22 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.13, waveAmplitude: 3.91, waveFrequency: 1.81, wavePhase: 1.31 }, // 23 d
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.63, waveAmplitude: 4.91, waveFrequency: 2.31, wavePhase: 2.31 }, // 24 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.63, waveAmplitude: 2.91, waveFrequency: 1.31, wavePhase: 0.31 }, // 25 d
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 15, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.13, waveAmplitude: 2.91, waveFrequency: 1.31, wavePhase: 0.31 }, // 26 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.13, waveAmplitude: 3.91, waveFrequency: 1.81, wavePhase: 1.31 }, // 27 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.13, waveAmplitude: 4.91, waveFrequency: 2.31, wavePhase: 2.31 }, // 28 e
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.13, waveAmplitude: 2.91, waveFrequency: 1.31, wavePhase: 0.31 }, // 29 e
	{ boss: 'enem1', type: 'enem11', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.13, waveAmplitude: 3.91, waveFrequency: 1.81, wavePhase: 1.31 }, // 30 e
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.63, waveAmplitude: 4.91, waveFrequency: 2.31, wavePhase: 2.31 }, // 31 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.63, waveAmplitude: 2.91, waveFrequency: 1.31, wavePhase: 0.31 }, // 32 e
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.81, waveAmplitude: 2.91, waveFrequency: 1.31, wavePhase: 0.31 }, // 33 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.56, waveAmplitude: 3.91, waveFrequency: 1.81, wavePhase: 1.31 }, // 34 f
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.31, waveAmplitude: 4.91, waveFrequency: 2.31, wavePhase: 2.31 }, // 35 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.06, waveAmplitude: 2.91, waveFrequency: 1.31, wavePhase: 0.31 }, // 36 f
	{ boss: 'enem1', type: 'enem11', xPos: 89, yPos: 15, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.13, waveAmplitude: 2.91, waveFrequency: 1.31, wavePhase: 0.31 }, // 37 g
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.13, waveAmplitude: 3.91, waveFrequency: 1.81, wavePhase: 1.31 }, // 38 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.13, waveAmplitude: 4.91, waveFrequency: 2.31, wavePhase: 2.31 }, // 39 g
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.13, waveAmplitude: 2.91, waveFrequency: 1.31, wavePhase: 0.31 }, // 40 g
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.13, waveAmplitude: 3.91, waveFrequency: 1.81, wavePhase: 1.31 }, // 41 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.63, waveAmplitude: 4.91, waveFrequency: 2.31, wavePhase: 2.31 }, // 42 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.63, waveAmplitude: 2.91, waveFrequency: 1.31, wavePhase: 0.31 }, // 43 g
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.83, waveAmplitude: 3.91, waveFrequency: 1.81, wavePhase: 1.31 }, // 44 g
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 15, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 7.13, waveAmplitude: 2.91, waveFrequency: 1.31, wavePhase: 0.31 }, // 45 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.13, waveAmplitude: 3.91, waveFrequency: 1.81, wavePhase: 1.31 }, // 46 h
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.13, waveAmplitude: 4.91, waveFrequency: 2.31, wavePhase: 2.31 }, // 47 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.13, waveAmplitude: 2.91, waveFrequency: 1.31, wavePhase: 0.31 }, // 48 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.13, waveAmplitude: 3.91, waveFrequency: 1.81, wavePhase: 1.31 }, // 49 h
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.63, waveAmplitude: 4.91, waveFrequency: 2.31, wavePhase: 2.31 }, // 50 h
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.63, waveAmplitude: 2.91, waveFrequency: 1.31, wavePhase: 0.31 }, // 51 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.83, waveAmplitude: 3.91, waveFrequency: 1.81, wavePhase: 1.31 }, // 52 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.91, waveAmplitude: 2.91, waveFrequency: 1.31, wavePhase: 0.31 }, // 53 i
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.66, waveAmplitude: 3.91, waveFrequency: 1.81, wavePhase: 1.31 }, // 54 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.41, waveAmplitude: 4.91, waveFrequency: 2.31, wavePhase: 2.31 }, // 55 i
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.16, waveAmplitude: 2.91, waveFrequency: 1.31, wavePhase: 0.31 }, // 56 i
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.91, waveAmplitude: 3.91, waveFrequency: 1.81, wavePhase: 1.31 }, // 57 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.66, waveAmplitude: 4.91, waveFrequency: 2.31, wavePhase: 2.31 }, // 58 i

	// ===== Цапыч =====
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.43 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.03 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.93 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.93 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.73 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.43 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.03 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.93 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.93 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.73 }, // 9 b
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.15 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.43 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.03 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.93 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 4, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.93 }, // 14 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.73 }, // 15 c
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.15 }, // 16 d
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.43 }, // 17 d
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.03 }, // 18 d
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.93 }, // 19 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.93 }, // 20 d
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.73 }, // 21 d
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.15 }, // 22 e
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.43 }, // 23 e
	{ boss: 'enem2', type: 'enem22', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.03 }, // 24 e
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.93 }, // 25 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.93 }, // 26 e
	{ boss: 'enem2', type: 'enem22', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.73 }, // 27 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.67 }, // 28 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.42 }, // 29 f
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.17 }, // 30 f
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.92 }, // 31 f
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.67 }, // 32 f
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.15 }, // 33 g
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.43 }, // 34 g
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.03 }, // 35 g
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.93 }, // 36 g
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.93 }, // 37 g
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.73 }, // 38 g
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.97 }, // 39 g
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.15 }, // 40 h
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.43 }, // 41 h
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.03 }, // 42 h
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.93 }, // 43 h
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.93 }, // 44 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.73 }, // 45 h
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.97 }, // 46 h
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.77 }, // 47 i
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.52 }, // 48 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.27 }, // 49 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.02 }, // 50 i
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.77 }, // 51 i
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.52 }, // 52 i

	// ===== Гудило =====
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.17 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.79 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.79 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.79 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.29 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.29 }, // 5 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.39 }, // 6 a
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.17 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.79 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.79 }, // 9 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.79 }, // 10 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.29 }, // 11 b
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.29 }, // 12 b
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.39 }, // 13 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.17 }, // 14 c
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.79 }, // 15 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.79 }, // 16 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.79 }, // 17 c
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.29 }, // 18 c
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.29 }, // 19 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.39 }, // 20 c
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.17 }, // 21 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.79 }, // 22 d
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.79 }, // 23 d
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.79 }, // 24 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.29 }, // 25 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.29 }, // 26 d
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.39 }, // 27 d
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.17 }, // 28 e
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.79 }, // 29 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.79 }, // 30 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.79 }, // 31 e
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.29 }, // 32 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.29 }, // 33 e
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.39 }, // 34 e
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.59 }, // 35 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.34 }, // 36 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.09 }, // 37 f
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.84 }, // 38 f
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.59 }, // 39 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.34 }, // 40 f
	{ boss: 'enem3', type: 'enem33', xPos: 89, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.17 }, // 41 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.79 }, // 42 g
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.79 }, // 43 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.79 }, // 44 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.29 }, // 45 g
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.29 }, // 46 g
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.39 }, // 47 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.99 }, // 48 g
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 7.17 }, // 49 h
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.79 }, // 50 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.79 }, // 51 h
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.79 }, // 52 h
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.29 }, // 53 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.29 }, // 54 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.39 }, // 55 h
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.99 }, // 56 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.69 }, // 57 i
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.44 }, // 58 i
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.19 }, // 59 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.94 }, // 60 i
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.69 }, // 61 i
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.44 }, // 62 i

	// ===== Молотыш =====
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.19 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.531 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.49 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.49 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.99 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.99 }, // 5 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.19 }, // 6 a
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.19 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.49 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.49 }, // 9 b
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.49 }, // 10 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.99 }, // 11 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.99 }, // 12 b
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.19 }, // 13 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.19 }, // 14 c
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.573 }, // 15 c
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.49 }, // 16 c
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.49 }, // 17 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.99 }, // 18 c
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.99 }, // 19 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.19 }, // 20 c
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.19 }, // 21 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.49 }, // 22 d
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.49 }, // 23 d
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.49 }, // 24 d
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.99 }, // 25 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.99 }, // 26 d
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.19 }, // 27 d
	{ boss: 'enem4', type: 'enem44', xPos: 91, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.19 }, // 28 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.49 }, // 29 e
	{ boss: 'enem4', type: 'enem44', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.49 }, // 30 e
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.49 }, // 31 e
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.99 }, // 32 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.99 }, // 33 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.19 }, // 34 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.39 }, // 35 f
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.14 }, // 36 f
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.89 }, // 37 f
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.64 }, // 38 f
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.39 }, // 39 f
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.19 }, // 40 g
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.619 }, // 41 g
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.49 }, // 42 g
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.49 }, // 43 g
	{ boss: 'enem4', type: 'enem44', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.99 }, // 44 g
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.99 }, // 45 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.19 }, // 46 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.39 }, // 47 g
	{ boss: 'enem4', type: 'enem44', xPos: 89, yPos: 17, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7.19 }, // 48 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.49 }, // 49 h
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.49 }, // 50 h
	{ boss: 'enem4', type: 'enem44', xPos: 69, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.49 }, // 51 h
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.99 }, // 52 h
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.99 }, // 53 h
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.19 }, // 54 h
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.39 }, // 55 h
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.49 }, // 56 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.24 }, // 57 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.99 }, // 58 i
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.74 }, // 59 i
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.49 }, // 60 i
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.24 }, // 61 i
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10.99 }, // 62 i

	// ===== Жарило =====
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.21 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.49 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.49 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.49 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.49 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.49 }, // 5 a
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.99 }, // 6 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.19 }, // 7 a
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.21 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.49 }, // 9 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.49 }, // 10 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.49 }, // 11 b
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.49 }, // 12 b
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.49 }, // 13 b
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.99 }, // 14 b
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.63 }, // 15 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.21 }, // 16 c
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.49 }, // 17 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.49 }, // 18 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.49 }, // 19 c
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.49 }, // 20 c
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.49 }, // 21 c
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.99 }, // 22 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.19 }, // 23 c
	{ boss: 'enem5', type: 'enem55', xPos: 91, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.21 }, // 24 d
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.49 }, // 25 d
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.49 }, // 26 d
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.49 }, // 27 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.49 }, // 28 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.49 }, // 29 d
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.99 }, // 30 d
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.19 }, // 31 d
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.21 }, // 32 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.49 }, // 33 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.49 }, // 34 e
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.49 }, // 35 e
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.49 }, // 36 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.49 }, // 37 e
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.99 }, // 38 e
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.19 }, // 39 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.27 }, // 40 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.02 }, // 41 f
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.77 }, // 42 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.52 }, // 43 f
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.27 }, // 44 f
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.02 }, // 45 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 20, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.21 }, // 46 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.49 }, // 47 g
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.49 }, // 48 g
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.49 }, // 49 g
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.49 }, // 50 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.49 }, // 51 g
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.99 }, // 52 g
	{ boss: 'enem5', type: 'enem55', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.19 }, // 53 g
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.39 }, // 54 g
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.21 }, // 55 h
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.49 }, // 56 h
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.49 }, // 57 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.49 }, // 58 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.49 }, // 59 h
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.49 }, // 60 h
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.99 }, // 61 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.19 }, // 62 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.39 }, // 63 h
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.37 }, // 64 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.12 }, // 65 i
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.87 }, // 66 i
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.62 }, // 67 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.37 }, // 68 i
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.12 }, // 69 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.87 }, // 70 i

];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 185, bossDelayAbDop: 12900, firstWaveDelayMs: 2730 }, // Два поддува и оставшийся уголь под искрами
	{ boss: 'enem2', bossDelayAb: 186, bossDelayAbDop: 11400, firstWaveDelayMs: 2730 }, // Парные губки захвата и вынос подковы
	{ boss: 'enem3', bossDelayAb: 184, bossDelayAbDop: 17400, firstWaveDelayMs: 2730 }, // Удар, расходящийся звон и поздний рог
	{ boss: 'enem4', bossDelayAb: 193, bossDelayAbDop: 13400, firstWaveDelayMs: 2730 }, // Прямой удар и избыточный занос подмастерья
	{ boss: 'enem5', bossDelayAb: 182, bossDelayAbDop: 16900, firstWaveDelayMs: 2730 }, // Хват заготовки, удары ковки и посадка на рог
];

 const bossAbilitiesDop = [
	// Поддувень
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [0, 500, 250, 0, 0], openingOrder: 0 },
	{ boss: 'enem1', indexAbilities: [6, 7, 8, 9, 10, 11], shotGapsMs: [0, 250, 500, 0, 250] },
	{ boss: 'enem1', indexAbilities: [12, 13, 14, 15, 16, 17, 18], shotGapsMs: [500, 250, 250, 0, 500, 500] },
	{ boss: 'enem1', indexAbilities: [19, 20, 21, 22, 23, 24, 25], shotGapsMs: [250, 500, 250, 0, 0, 500] },
	{ boss: 'enem1', indexAbilities: [26, 27, 28, 29, 30, 31, 32], shotGapsMs: [500, 500, 0, 0, 0, 500] },
	{ boss: 'enem1', indexAbilities: [33, 34, 35, 36], signature: true, isChain: true, shotDelayMs: 347, shotGapsMs: [0, 0, 0], openingOrder: 1, label: "Два поддува и оставшийся уголь под искрами — знакомство" },
	{ boss: 'enem1', indexAbilities: [37, 38, 39, 40, 41, 42, 43, 44], minPhase: 2, shotGapsMs: [250, 0, 500, 0, 500, 0, 500] },
	{ boss: 'enem1', indexAbilities: [45, 46, 47, 48, 49, 50, 51, 52], minPhase: 3, shotGapsMs: [0, 500, 0, 0, 250, 0, 500] },
	{ boss: 'enem1', indexAbilities: [53, 54, 55, 56, 57, 58], signature: true, isChain: true, minPhase: 3, shotDelayMs: 379, shotGapsMs: [0, 0, 0, 0, 0], label: "Два поддува и оставшийся уголь под искрами — завершение" },

	// Цапыч
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 250, 0, 250], openingOrder: 0 },
	{ boss: 'enem2', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [0, 0, 0, 500] },
	{ boss: 'enem2', indexAbilities: [10, 11, 12, 13, 14, 15], shotGapsMs: [500, 0, 500, 0, 500] },
	{ boss: 'enem2', indexAbilities: [16, 17, 18, 19, 20, 21], shotGapsMs: [250, 0, 500, 0, 500] },
	{ boss: 'enem2', indexAbilities: [22, 23, 24, 25, 26, 27], shotGapsMs: [500, 500, 0, 500, 250] },
	{ boss: 'enem2', indexAbilities: [28, 29, 30, 31, 32], signature: true, isChain: true, shotDelayMs: 353, shotGapsMs: [0, 0, 0, 0], openingOrder: 1, label: "Парные губки захвата и вынос подковы — знакомство" },
	{ boss: 'enem2', indexAbilities: [33, 34, 35, 36, 37, 38, 39], minPhase: 2, shotGapsMs: [0, 0, 500, 0, 500, 0] },
	{ boss: 'enem2', indexAbilities: [40, 41, 42, 43, 44, 45, 46], minPhase: 3, shotGapsMs: [500, 0, 500, 0, 500, 250] },
	{ boss: 'enem2', indexAbilities: [47, 48, 49, 50, 51, 52], signature: true, isChain: true, minPhase: 3, shotDelayMs: 391, shotGapsMs: [0, 0, 0, 0, 0], label: "Парные губки захвата и вынос подковы — завершение" },

	// Гудило
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5, 6], shotGapsMs: [250, 500, 0, 0, 0, 0], openingOrder: 0 },
	{ boss: 'enem3', indexAbilities: [7, 8, 9, 10, 11, 12, 13], shotGapsMs: [500, 250, 0, 0, 0, 0] },
	{ boss: 'enem3', indexAbilities: [14, 15, 16, 17, 18, 19, 20], shotGapsMs: [500, 0, 500, 0, 500, 0] },
	{ boss: 'enem3', indexAbilities: [21, 22, 23, 24, 25, 26, 27], shotGapsMs: [500, 250, 250, 0, 250, 0] },
	{ boss: 'enem3', indexAbilities: [28, 29, 30, 31, 32, 33, 34], shotGapsMs: [0, 250, 500, 0, 0, 0] },
	{ boss: 'enem3', indexAbilities: [35, 36, 37, 38, 39, 40], signature: true, isChain: true, shotDelayMs: 403, shotGapsMs: [0, 0, 0, 0, 0], openingOrder: 1, label: "Удар, расходящийся звон и поздний рог — знакомство" },
	{ boss: 'enem3', indexAbilities: [41, 42, 43, 44, 45, 46, 47, 48], minPhase: 2, shotGapsMs: [0, 250, 250, 0, 500, 0, 250] },
	{ boss: 'enem3', indexAbilities: [49, 50, 51, 52, 53, 54, 55, 56], minPhase: 3, shotGapsMs: [500, 0, 250, 0, 250, 0, 0] },
	{ boss: 'enem3', indexAbilities: [57, 58, 59, 60, 61, 62], signature: true, isChain: true, minPhase: 3, shotDelayMs: 417, shotGapsMs: [0, 0, 0, 0, 0], label: "Удар, расходящийся звон и поздний рог — завершение" },

	// Молотыш
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4, 5, 6], shotGapsMs: [500, 250, 250, 0, 0, 500], openingOrder: 0 },
	{ boss: 'enem4', indexAbilities: [7, 8, 9, 10, 11, 12, 13], shotGapsMs: [250, 0, 500, 0, 0, 500] },
	{ boss: 'enem4', indexAbilities: [14, 15, 16, 17, 18, 19, 20], shotGapsMs: [0, 0, 0, 250, 500, 250] },
	{ boss: 'enem4', indexAbilities: [21, 22, 23, 24, 25, 26, 27], shotGapsMs: [250, 0, 0, 0, 500, 500] },
	{ boss: 'enem4', indexAbilities: [28, 29, 30, 31, 32, 33, 34], shotGapsMs: [250, 0, 0, 0, 250, 0] },
	{ boss: 'enem4', indexAbilities: [35, 36, 37, 38, 39], signature: true, isChain: true, shotDelayMs: 361, shotGapsMs: [0, 0, 0, 0], openingOrder: 1, label: "Прямой удар и избыточный занос подмастерья — знакомство" },
	{ boss: 'enem4', indexAbilities: [40, 41, 42, 43, 44, 45, 46, 47], minPhase: 2, shotGapsMs: [500, 500, 0, 0, 0, 500, 0] },
	{ boss: 'enem4', indexAbilities: [48, 49, 50, 51, 52, 53, 54, 55], minPhase: 3, shotGapsMs: [250, 0, 0, 500, 0, 0, 0] },
	{ boss: 'enem4', indexAbilities: [56, 57, 58, 59, 60, 61, 62], signature: true, isChain: true, minPhase: 3, shotDelayMs: 387, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Прямой удар и избыточный занос подмастерья — завершение" },

	// Жарило
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7], shotGapsMs: [0, 500, 0, 0, 500, 0, 500], openingOrder: 0 },
	{ boss: 'enem5', indexAbilities: [8, 9, 10, 11, 12, 13, 14, 15], shotGapsMs: [500, 0, 0, 500, 500, 250, 250] },
	{ boss: 'enem5', indexAbilities: [16, 17, 18, 19, 20, 21, 22, 23], shotGapsMs: [250, 250, 0, 250, 0, 500, 0] },
	{ boss: 'enem5', indexAbilities: [24, 25, 26, 27, 28, 29, 30, 31], shotGapsMs: [500, 250, 0, 0, 500, 0, 500] },
	{ boss: 'enem5', indexAbilities: [32, 33, 34, 35, 36, 37, 38, 39], shotGapsMs: [0, 0, 250, 500, 0, 0, 500] },
	{ boss: 'enem5', indexAbilities: [40, 41, 42, 43, 44, 45], signature: true, isChain: true, shotDelayMs: 373, shotGapsMs: [0, 0, 0, 0, 0], openingOrder: 1, label: "Хват заготовки, удары ковки и посадка на рог — знакомство" },
	{ boss: 'enem5', indexAbilities: [46, 47, 48, 49, 50, 51, 52, 53, 54], minPhase: 2, shotGapsMs: [0, 250, 0, 500, 250, 0, 250, 0] },
	{ boss: 'enem5', indexAbilities: [55, 56, 57, 58, 59, 60, 61, 62, 63], minPhase: 3, shotGapsMs: [0, 500, 0, 0, 500, 0, 250, 0] },
	{ boss: 'enem5', indexAbilities: [64, 65, 66, 67, 68, 69, 70], signature: true, isChain: true, minPhase: 3, shotDelayMs: 399, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Хват заготовки, удары ковки и посадка на рог — завершение" },

];

// Лорные названия связок временных улучшений — пять разных монстров одной
// кузницы, словарь каждого строго завязан на его реальный предмет и его
// конкретное действие (правило 12.1): мех дует и раздувает угли, клещи
// хватают и держат раскалённое, наковальня гудит и звенит, молот бьёт
// прямо и просто, а мастер горна крутит клещи и обрушивает удар разом.
// Полных совпадений фраз между монстрами нет (проверено вручную построчно).
const UPGRADE_VARIANT_NAMES = {
    // Поддувень — кожаный мех: угли, дутьё, кожа, ритм.
    enem1: {
        variant1: 'Угольный кураж', variant2: 'Кожаная хватка', variant3: 'Мех-таран',
        variant4: 'Дутьевой напор', variant5: 'Меткий выдох', variant6: 'Бешеный выдох',
        variant7: 'Угольный норов', variant8: 'Крепкая кожа', variant9: 'Ударный выдох',
        variant10: 'Живучий мех', variant11: 'Колючая искра', variant12: 'Выдох и в темноту',
        variant13: 'Толстая кожа', variant14: 'Неутомимый выдох', variant15: 'Пружинистый выдох',
        variant16: 'Тлеющий уголь, зоркий глаз', variant17: 'Угольная удача', variant18: 'Верный выдох',
        variant19: 'Молниеносный выдох', variant20: 'Угольный нюх', variant21: 'Цепкий носик',
        variant22: 'Юркий, несмотря на мех', variant23: 'Угольная стойкость', variant24: 'Долгий выдох, зоркий глаз',
        variant25: 'Ускользающий выдох', variant26: 'Дикий выдох', variant27: 'Стойкая кожа',
        variant28: 'Выдох наповал', variant29: 'Крепкий поддувень', variant30: 'Дутьевая мощь',
        variant31: 'Выдох с оглядкой', variant32: 'Живучая кожа', variant33: 'Юркий и угольный',
        variant34: 'Угольная прыть', variant35: 'Быстрый выдох, крепкая кожа'
    },
    // Цапыч — раскалённые клещи: хват, подкова, шарнир, жар.
    enem2: {
        variant1: 'Клещевой кураж', variant2: 'Шарнирная хватка', variant3: 'Клещи-таран',
        variant4: 'Хватательный напор', variant5: 'Меткий щелчок', variant6: 'Бешеный щелчок',
        variant7: 'Клещевой норов', variant8: 'Крепкий шарнир', variant9: 'Ударный щелчок',
        variant10: 'Живучая подкова', variant11: 'Колючий жар', variant12: 'Щелчок и в темноту',
        variant13: 'Толстая губка', variant14: 'Неутомимый щелчок', variant15: 'Пружинистый щелчок',
        variant16: 'Раскалённая подкова, зоркий глаз', variant17: 'Клещевая удача', variant18: 'Верный щелчок',
        variant19: 'Молниеносный щелчок', variant20: 'Клещевой нюх', variant21: 'Цепкий шарнир',
        variant22: 'Юркий, несмотря на длину', variant23: 'Клещевая стойкость', variant24: 'Долгий хват, зоркий глаз',
        variant25: 'Ускользающий щелчок', variant26: 'Дикий щелчок', variant27: 'Стойкая губка',
        variant28: 'Щелчок наповал', variant29: 'Крепкий цапыч', variant30: 'Хватательная мощь',
        variant31: 'Щелчок с оглядкой', variant32: 'Живучий шарнир', variant33: 'Юркий и клещевой',
        variant34: 'Клещевая прыть', variant35: 'Быстрый щелчок, крепкий шарнир'
    },
    // Гудило — гулкая наковальня: гул, рог, отдача, звон.
    enem3: {
        variant1: 'Гулкий кураж', variant2: 'Роговая хватка', variant3: 'Рог-таран',
        variant4: 'Звонкий напор', variant5: 'Меткий гул', variant6: 'Бешеный гул',
        variant7: 'Гулкий норов', variant8: 'Крепкий рог', variant9: 'Ударный гул',
        variant10: 'Живучая отдача', variant11: 'Колючий рог', variant12: 'Гул и в темноту',
        variant13: 'Толстый рог', variant14: 'Неутомимый гул', variant15: 'Пружинистый гул',
        variant16: 'Звонкий рог, зоркий глаз', variant17: 'Гулкая удача', variant18: 'Верный гул',
        variant19: 'Молниеносный гул', variant20: 'Гулкий нюх', variant21: 'Цепкая отдача',
        variant22: 'Юркий, несмотря на вес', variant23: 'Гулкая стойкость', variant24: 'Долгий гул, зоркий глаз',
        variant25: 'Ускользающий гул', variant26: 'Дикий гул', variant27: 'Стойкий рог',
        variant28: 'Гул наповал', variant29: 'Крепкое гудило', variant30: 'Звонкая мощь',
        variant31: 'Гул с оглядкой', variant32: 'Живучий рог', variant33: 'Юркий и гулкий',
        variant34: 'Гулкая прыть', variant35: 'Быстрый гул, крепкий рог'
    },
    // Молотыш — чумазый подмастерье: молот, копоть, фартук, рукоять.
    enem4: {
        variant1: 'Молотовый кураж', variant2: 'Копотная хватка', variant3: 'Рукоять-таран',
        variant4: 'Кузнечный напор', variant5: 'Меткий удар', variant6: 'Бешеный удар',
        variant7: 'Молотовый норов', variant8: 'Крепкий фартук', variant9: 'Ударный размах',
        variant10: 'Живучая копоть', variant11: 'Колючая заклёпка', variant12: 'Удар и в темноту',
        variant13: 'Толстый фартук', variant14: 'Неутомимый удар', variant15: 'Пружинистый удар',
        variant16: 'Закопчённый взгляд, зоркий глаз', variant17: 'Молотовая удача', variant18: 'Верный удар',
        variant19: 'Молниеносный удар', variant20: 'Молотовый нюх', variant21: 'Цепкая рукоять',
        variant22: 'Юркий, несмотря на молот', variant23: 'Молотовая стойкость', variant24: 'Долгий замах, зоркий глаз',
        variant25: 'Ускользающий удар', variant26: 'Дикий удар', variant27: 'Стойкий фартук',
        variant28: 'Удар наповал', variant29: 'Крепкий молотыш', variant30: 'Кузнечная мощь',
        variant31: 'Удар с оглядкой', variant32: 'Живучий фартук', variant33: 'Юркий и молотовый',
        variant34: 'Молотовая прыть', variant35: 'Быстрый удар, крепкий фартук'
    },
    // Жарило — мастер горна: жар, хват и удар разом, усы, шкура.
    enem5: {
        variant1: 'Жаркий кураж', variant2: 'Косматая хватка', variant3: 'Молот-таран',
        variant4: 'Мастеровой напор', variant5: 'Меткий разом', variant6: 'Бешеный разом',
        variant7: 'Жаркий норов', variant8: 'Крепкая шкура', variant9: 'Ударный разом',
        variant10: 'Живучий хват', variant11: 'Колючий ус', variant12: 'Разом и в темноту',
        variant13: 'Толстая шкура', variant14: 'Неутомимый разом', variant15: 'Пружинистый разом',
        variant16: 'Раскалённый взгляд, зоркий глаз', variant17: 'Жаркая удача', variant18: 'Верный разом',
        variant19: 'Молниеносный разом', variant20: 'Жаркий нюх', variant21: 'Цепкий коготь',
        variant22: 'Юркий, несмотря на массу', variant23: 'Жаркая стойкость', variant24: 'Долгий замах, раскалённый взор',
        variant25: 'Ускользающий разом', variant26: 'Дикий разом', variant27: 'Стойкая шкура',
        variant28: 'Разом наповал', variant29: 'Крепкий жарило', variant30: 'Мастеровая мощь',
        variant31: 'Разом с оглядкой', variant32: 'Живучая шкура', variant33: 'Юркий и жаркий',
        variant34: 'Жаркая прыть', variant35: 'Быстрый разом, крепкая шкура'
    }
};
