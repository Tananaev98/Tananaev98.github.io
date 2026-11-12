// Уровень 56 «Прачечный двор» — семнадцатый уровень области V, обычный
// (пять разных монстров, как 41-44/46-49/51-54).
//
// ДВОЙНАЯ ПРОВЕРКА УНИКАЛЬНОСТИ (раздел 1.2) — ШАГ 1 выполнен 2026-09-12 по
// admin-boss-pattern-panel.html, 275 строк, уровни 1-55.
//
// АРТ (images/enemies/regions/5_dom_dvor/lvl56/) — все 5 картинок открыты и
// сверены лично:
// 1.webp — серый брусок мыла, оставляет за собой шлейф пены, низкая
//   скользящая поза. Архетип — атаки скользят низко по одной непрерывной
//   линии в одну сторону, спокойно и предсказуемо, как мыло по мокрому
//   полу (роль enem1, знакомство) — сверено: SUDS_SLIDE новый.
// 2.webp — мокрая простыня с прищепкой наверху, летит и норовит НАКРЫТЬ.
//   Архетип — частые быстрые падения-накрытия СВЕРХУ вниз, а не сбоку —
//   простыня пытается опуститься на цель заново и заново (роль enem2,
//   быстрые серии) — сверено: SHROUD_DROP новый.
// 3.webp — резной рубель с ребристой поверхностью для стирки. Архетип —
//   долгий трущий телеграф из повторяющихся мелких импульсов в ОДНОЙ точке
//   (трение о рёбра), затем один тяжёлый финальный хруст — редкое и
//   тяжёлое (роль enem3) — сверено: SCRUB_GRIND новый.
// 4.webp — липовая лохань с мыльной пеной, выплёскивающейся через край.
//   Архетип — частые непредсказуемые всплески-пузыри из случайных точек
//   по краю лохани, вода бурлит нервно (роль enem4, нервный) — сверено:
//   BUBBLE_BURST новый, отличен от POLTERGEIST_FRENZY Взъерошенного (55) —
//   там хаотично летят ПРЕДМЕТЫ по всему дому, здесь именно ВОДА бурлит
//   локально у края лохани.
// 5.webp — сильная прачка, держит туго натянутое мокрое полотно между
//   обеими руками, поза выкручивания. Архетип — редкий тяжёлый хлёсткий
//   щелчок полотенцем после явного закручивания-натяжения — то самое
//   реальное физическое действие «щёлкнуть мокрым полотенцем» (роль enem5,
//   финал) — сверено: TOWEL_SNAP новый.
//
// ДВИЖЕНИЕ (movementStyle) — сверено с полным распределением 1-55 (все роли
// ≤27% до этого уровня): Скользель — drift (непрерывное скольжение) 16%→18%;
// Полотнище — lateRush (внезапный рывок вниз для накрытия) 16%→18%;
// Рубчак — straight (прямое неотвратимое трение) 15%→17%; Лоханыч — wave
// (вода плещется в такт) 13%→15%; Скрутиха — accelerate (закручивание
// набирает темп перед щелчком) 13%→15%.
//
// ЦЕПИ (13.6/13.7) — форма спроектирована из образа, окончательно сверена
// ЖИВЫМ классификатором панели (verify56.js, точная копия classifyChainShape)
// в ДВА прохода: первый эскиз разошёлся с ручной классификацией на трёх
// боссах (та же поправимая неточность, что уже фиксировалась на уровнях
// 50/55), а STEP 2 (после первой записи файла) вскрыл ВТОРУЮ проблему —
// панель хранит историю не только отдельных форм, но и ТОЧНЫХ ПАР форм
// (chain-A+chain-B) на роль, и три из пяти пар совпали с уже использованными
// у уровней 52/54 (num-bad в колонке «ЦЕПЬ: ФОРМА») — геометрия этих трёх
// была пересчитана ещё раз под пары с нулевой историей. Итоговые формы:
// Скользель — vertical(3)+zigzag(4): мыло скользит прямо вниз, затем виляет
// юзом; Полотнище — diagonal(3)+irregular(5) [было diagonal+zigzag,
// столкнулось с уровнем 52 — irregular тематически даже точнее: простыня
// падает по диагонали, затем треплется на ветру НЕПРЕДСКАЗУЕМО, не мерным
// зигзагом]; Рубчак — vertical(4)+arc(4) [было vertical+zigzag, столкнулось
// с уровнями 52/54 — переписано под изначальный план: трение по одной оси,
// затем дугой довершающий хруст]; Лоханыч — vertical(3)+zigzag(4) [было
// vertical+diagonal, столкнулось с уровнем 52 — zigzag тематически даже
// точнее BUBBLE_BURST: всплеск вверх, затем нервные скачки пены вдоль края,
// а не ровный диагональный плевок]; Скрутиха — vertical(4)+irregular(6):
// щелчок прямо вниз, затем хаотичный широкий хлёст (случайная область
// поражения щёлкающего мокрого полотенца). Итоговое распределение (обе
// проверки — по одиночным формам И по точным парам) подтверждено панелью:
// ни один бакет форм не превышает 25%, и НИ ОДНА пара форм не повторяет
// использованную ранее ни у одного из пяти боссов этого уровня.
let lvlNumber = 56;

const bossCombatConfig = {
	attackChains: true,
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.743, damageMultiplier: 1.782, minWaveDelay: 4850, minShotDelay: 104, minTelegraphMs: 548,
	phases: [
		{ phase: 1, minHp: 0.694, cadence: 0.966, speed: 1.044, damage: 1, telegraphMultiplier: 1.038, surpriseChance: 0.114, maxActiveAttacks: 33 },
		{ phase: 2, minHp: 0.344, cadence: 0.795, speed: 1.178, damage: 1.12, telegraphMultiplier: 0.864, surpriseChance: 0.214, maxActiveAttacks: 37 },
		{ phase: 3, minHp: 0, cadence: 0.616, speed: 1.292, damage: 1.22, telegraphMultiplier: 0.764, surpriseChance: 0.314, maxActiveAttacks: 41 }
	],
	bosses: {
		enem1: { combatIdentity: "Дорожка мыла с поперечной пеной у конца", combatTrick: "Мыло ведёт несколько точек дорожки; поперечная пена не даёт уйти после первого скольжения. Ошибка — возвращаться к началу вместо завершения конца.", signatureEvery: 3, movementStyle: 'drift', cadence: 0.997, telegraphMs: 947, speedMultiplier: 1.025, damageMultiplier: 0.9, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem2: { combatIdentity: "Два накрывающих края и оставшаяся складка", combatTrick: "Два края полотна падают с разгоном по очереди, внутренняя складка остаётся после раскрытия. Ошибка — уйти после первого края, пропустив складку.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 0.992, telegraphMs: 858, speedMultiplier: 1.054, damageMultiplier: 1, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem3: { combatIdentity: "Трение одного участка рёбер и смещённый хруст", combatTrick: "Несколько прямых рёбер трут одну полосу, затем тяжёлый хруст смещается к другому краю. Ошибка — уйти после мелкого стука до хруста или метаться на каждый импульс.", signatureEvery: 3, movementStyle: 'straight', cadence: 0.823, telegraphMs: 1067, speedMultiplier: 1.02, damageMultiplier: 1.17, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem4: { combatIdentity: "Локальные всплески и перелив через борт", combatTrick: "Пузырчатые всплески держатся у края, отдельный перелив меняет полосу. Ошибка — гоняться за каждым всплеском широким переводом или забыть перелив после близкой группы. Точки заданы данными.", signatureEvery: 3, movementStyle: 'wave', cadence: 0.964, telegraphMs: 827, speedMultiplier: 1.078, damageMultiplier: 1.04, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem5: { combatIdentity: "Натяжение двух концов, щелчок и отскок полотна", combatTrick: "Оба конца мокрого полотна натягиваются перед щелчком, после него остаётся отскок свободного конца. Ошибка — бить после натяжения либо после первого щелчка, не закончив отскок.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 0.945, telegraphMs: 997, speedMultiplier: 1.091, damageMultiplier: 1.15, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] }
	}
};

const ENEMY_TYPES = {

	enem11: { name: 'enem11', image: 'images/enemies/regions/5_dom_dvor/lvl56/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { name: 'enem22', image: 'images/enemies/regions/5_dom_dvor/lvl56/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { name: 'enem33', image: 'images/enemies/regions/5_dom_dvor/lvl56/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { name: 'enem44', image: 'images/enemies/regions/5_dom_dvor/lvl56/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { name: 'enem55', image: 'images/enemies/regions/5_dom_dvor/lvl56/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
        name: 'enem1',
		dispName: 'Скользель',
        image: 'images/enemies/regions/5_dom_dvor/lvl56/1.webp',
        baseHP: 14139,
        baseSpeed: 0,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 250,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem2: {
        name: 'enem2',
		dispName: 'Полотнище',
        image: 'images/enemies/regions/5_dom_dvor/lvl56/2.webp',
        baseHP: 35347,
        baseSpeed: 0,
        baseDamage: 22,
        spawnWeight: 15,
		baseExp: 400,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem3: {
        name: 'enem3',
		dispName: 'Рубчак',
        image: 'images/enemies/regions/5_dom_dvor/lvl56/3.webp',
        baseHP: 62536,
        baseSpeed: 0,
        baseDamage: 24,
        spawnWeight: 20,
		baseExp: 600,
        size: '29%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem4: {
        name: 'enem4',
		dispName: 'Лоханыч',
        image: 'images/enemies/regions/5_dom_dvor/lvl56/4.webp',
        baseHP: 100602,
        baseSpeed: 0,
        baseDamage: 26,
        spawnWeight: 10,
		baseExp: 800,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem5: {
        name: 'enem5',
		dispName: 'Скрутиха',
        image: 'images/enemies/regions/5_dom_dvor/lvl56/5.webp',
        baseHP: 152262,
        baseSpeed: 0,
        baseDamage: 28,
        spawnWeight: 5,
		baseExp: 0,
        size: '32%',
        deathAnimation: { preset: 'default', durationMs: 1000 }
    },


};

 let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
 let timeNextBoss = 19;
 const bossInterval = 22;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
 // speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Скользель =====
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.37 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.37 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.37 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.87 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.87 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.57 }, // 5 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.37 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.37 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.37 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.87 }, // 9 b
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.87 }, // 10 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.57 }, // 11 b
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.93 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.37 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.37 }, // 14 c
	{ boss: 'enem1', type: 'enem11', xPos: 5, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.37 }, // 15 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.87 }, // 16 c
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.57 }, // 17 c
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.93 }, // 18 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.37 }, // 19 d
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.37 }, // 20 d
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.37 }, // 21 d
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.87 }, // 22 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.57 }, // 23 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.93 }, // 24 e
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.37 }, // 25 e
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.37 }, // 26 e
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.37 }, // 27 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.87 }, // 28 e
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.57 }, // 29 e
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.73 }, // 30 f
	{ boss: 'enem1', type: 'enem11', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.48 }, // 31 f
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.23 }, // 32 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.98 }, // 33 f
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.93 }, // 34 g
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.37 }, // 35 g
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.37 }, // 36 g
	{ boss: 'enem1', type: 'enem11', xPos: 4, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.37 }, // 37 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.87 }, // 38 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.87 }, // 39 g
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.57 }, // 40 g
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.93 }, // 41 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 16.37 }, // 42 h
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.37 }, // 43 h
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.87 }, // 44 h
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.87 }, // 45 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.57 }, // 46 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.83 }, // 47 i
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.58 }, // 48 i
	{ boss: 'enem1', type: 'enem11', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.33 }, // 49 i
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.08 }, // 50 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.83 }, // 51 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.58 }, // 52 i

	// ===== Полотнище =====
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.37 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.37 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.87 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.87 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.67 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.37 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.37 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.87 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.87 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.67 }, // 9 b
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.95 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.37 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.37 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.87 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.87 }, // 14 c
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.67 }, // 15 c
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.95 }, // 16 d
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.37 }, // 17 d
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.37 }, // 18 d
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.87 }, // 19 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.87 }, // 20 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.67 }, // 21 d
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.95 }, // 22 e
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.37 }, // 23 e
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.37 }, // 24 e
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.87 }, // 25 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.87 }, // 26 e
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.67 }, // 27 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.69 }, // 28 f
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.44 }, // 29 f
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.19 }, // 30 f
	{ boss: 'enem2', type: 'enem22', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.94 }, // 31 f
	{ boss: 'enem2', type: 'enem22', xPos: 91, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.95 }, // 32 g
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.37 }, // 33 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.37 }, // 34 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.87 }, // 35 g
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.87 }, // 36 g
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.67 }, // 37 g
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.17 }, // 38 g
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.95 }, // 39 h
	{ boss: 'enem2', type: 'enem22', xPos: 69, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.37 }, // 40 h
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.37 }, // 41 h
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.87 }, // 42 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.87 }, // 43 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.67 }, // 44 h
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.17 }, // 45 h
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.79 }, // 46 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.54 }, // 47 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.29 }, // 48 i
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.04 }, // 49 i
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.79 }, // 50 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.54 }, // 51 i

	// ===== Рубчак =====
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.97 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.57 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.57 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.57 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.07 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.07 }, // 5 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.07 }, // 6 a
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.97 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.57 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.57 }, // 9 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.57 }, // 10 b
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.07 }, // 11 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.07 }, // 12 b
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.07 }, // 13 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.97 }, // 14 c
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.57 }, // 15 c
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.57 }, // 16 c
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.57 }, // 17 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.07 }, // 18 c
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.07 }, // 19 c
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.07 }, // 20 c
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.97 }, // 21 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.57 }, // 22 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.57 }, // 23 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.57 }, // 24 d
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.07 }, // 25 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.07 }, // 26 d
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.07 }, // 27 d
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.97 }, // 28 e
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.57 }, // 29 e
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.57 }, // 30 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.57 }, // 31 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.07 }, // 32 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.07 }, // 33 e
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.07 }, // 34 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.77 }, // 35 e
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.63 }, // 36 f
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.38 }, // 37 f
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.13 }, // 38 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.88 }, // 39 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.63 }, // 40 f
	{ boss: 'enem3', type: 'enem33', xPos: 89, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.97 }, // 41 g
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.57 }, // 42 g
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.57 }, // 43 g
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.57 }, // 44 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.07 }, // 45 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.07 }, // 46 g
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.07 }, // 47 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.27 }, // 48 g
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6.97 }, // 49 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.57 }, // 50 h
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.17 }, // 51 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.77 }, // 52 h
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.07 }, // 53 h
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.07 }, // 54 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.07 }, // 55 h
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.27 }, // 56 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.73 }, // 57 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.48 }, // 58 i
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.23 }, // 59 i
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.98 }, // 60 i
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.73 }, // 61 i
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.48 }, // 62 i

	// ===== Лоханыч =====
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6.99, waveAmplitude: 2.73, waveFrequency: 1.27, wavePhase: 0.23 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.17, waveAmplitude: 3.73, waveFrequency: 1.77, wavePhase: 1.23 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.37, waveAmplitude: 4.73, waveFrequency: 2.27, wavePhase: 2.23 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.37, waveAmplitude: 2.73, waveFrequency: 1.27, wavePhase: 0.23 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.87, waveAmplitude: 3.73, waveFrequency: 1.77, wavePhase: 1.23 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.87, waveAmplitude: 4.73, waveFrequency: 2.27, wavePhase: 2.23 }, // 5 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.07, waveAmplitude: 2.73, waveFrequency: 1.27, wavePhase: 0.23 }, // 6 a
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6.99, waveAmplitude: 2.73, waveFrequency: 1.27, wavePhase: 0.23 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.17, waveAmplitude: 3.73, waveFrequency: 1.77, wavePhase: 1.23 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.37, waveAmplitude: 4.73, waveFrequency: 2.27, wavePhase: 2.23 }, // 9 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.37, waveAmplitude: 2.73, waveFrequency: 1.27, wavePhase: 0.23 }, // 10 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.87, waveAmplitude: 3.73, waveFrequency: 1.77, wavePhase: 1.23 }, // 11 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.87, waveAmplitude: 4.73, waveFrequency: 2.27, wavePhase: 2.23 }, // 12 b
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.07, waveAmplitude: 2.73, waveFrequency: 1.27, wavePhase: 0.23 }, // 13 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6.99, waveAmplitude: 2.73, waveFrequency: 1.27, wavePhase: 0.23 }, // 14 c
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.17, waveAmplitude: 3.73, waveFrequency: 1.77, wavePhase: 1.23 }, // 15 c
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.67, waveAmplitude: 4.73, waveFrequency: 2.27, wavePhase: 2.23 }, // 16 c
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.37, waveAmplitude: 2.73, waveFrequency: 1.27, wavePhase: 0.23 }, // 17 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.87, waveAmplitude: 3.73, waveFrequency: 1.77, wavePhase: 1.23 }, // 18 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.87, waveAmplitude: 4.73, waveFrequency: 2.27, wavePhase: 2.23 }, // 19 c
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.07, waveAmplitude: 2.73, waveFrequency: 1.27, wavePhase: 0.23 }, // 20 c
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6.99, waveAmplitude: 2.73, waveFrequency: 1.27, wavePhase: 0.23 }, // 21 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.17, waveAmplitude: 3.73, waveFrequency: 1.77, wavePhase: 1.23 }, // 22 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.67, waveAmplitude: 4.73, waveFrequency: 2.27, wavePhase: 2.23 }, // 23 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.57, waveAmplitude: 2.73, waveFrequency: 1.27, wavePhase: 0.23 }, // 24 d
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.87, waveAmplitude: 3.73, waveFrequency: 1.77, wavePhase: 1.23 }, // 25 d
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.87, waveAmplitude: 4.73, waveFrequency: 2.27, wavePhase: 2.23 }, // 26 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.07, waveAmplitude: 2.73, waveFrequency: 1.27, wavePhase: 0.23 }, // 27 d
	{ boss: 'enem4', type: 'enem44', xPos: 91, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6.99, waveAmplitude: 2.73, waveFrequency: 1.27, wavePhase: 0.23 }, // 28 e
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.17, waveAmplitude: 3.73, waveFrequency: 1.77, wavePhase: 1.23 }, // 29 e
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.37, waveAmplitude: 4.73, waveFrequency: 2.27, wavePhase: 2.23 }, // 30 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.37, waveAmplitude: 2.73, waveFrequency: 1.27, wavePhase: 0.23 }, // 31 e
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.87, waveAmplitude: 3.73, waveFrequency: 1.77, wavePhase: 1.23 }, // 32 e
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.87, waveAmplitude: 4.73, waveFrequency: 2.27, wavePhase: 2.23 }, // 33 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.07, waveAmplitude: 2.73, waveFrequency: 1.27, wavePhase: 0.23 }, // 34 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.41, waveAmplitude: 2.73, waveFrequency: 1.27, wavePhase: 0.23 }, // 35 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.16, waveAmplitude: 3.73, waveFrequency: 1.77, wavePhase: 1.23 }, // 36 f
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.91, waveAmplitude: 4.73, waveFrequency: 2.27, wavePhase: 2.23 }, // 37 f
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.66, waveAmplitude: 2.73, waveFrequency: 1.27, wavePhase: 0.23 }, // 38 f
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6.99, waveAmplitude: 2.73, waveFrequency: 1.27, wavePhase: 0.23 }, // 39 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.17, waveAmplitude: 3.73, waveFrequency: 1.77, wavePhase: 1.23 }, // 40 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.37, waveAmplitude: 4.73, waveFrequency: 2.27, wavePhase: 2.23 }, // 41 g
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.37, waveAmplitude: 2.73, waveFrequency: 1.27, wavePhase: 0.23 }, // 42 g
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.87, waveAmplitude: 3.73, waveFrequency: 1.77, wavePhase: 1.23 }, // 43 g
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.87, waveAmplitude: 4.73, waveFrequency: 2.27, wavePhase: 2.23 }, // 44 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.07, waveAmplitude: 2.73, waveFrequency: 1.27, wavePhase: 0.23 }, // 45 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.27, waveAmplitude: 3.73, waveFrequency: 1.77, wavePhase: 1.23 }, // 46 g
	{ boss: 'enem4', type: 'enem44', xPos: 89, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6.99, waveAmplitude: 2.73, waveFrequency: 1.27, wavePhase: 0.23 }, // 47 h
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.17, waveAmplitude: 3.73, waveFrequency: 1.77, wavePhase: 1.23 }, // 48 h
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.37, waveAmplitude: 4.73, waveFrequency: 2.27, wavePhase: 2.23 }, // 49 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.37, waveAmplitude: 2.73, waveFrequency: 1.27, wavePhase: 0.23 }, // 50 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.87, waveAmplitude: 3.73, waveFrequency: 1.77, wavePhase: 1.23 }, // 51 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.87, waveAmplitude: 4.73, waveFrequency: 2.27, wavePhase: 2.23 }, // 52 h
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.07, waveAmplitude: 2.73, waveFrequency: 1.27, wavePhase: 0.23 }, // 53 h
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.27, waveAmplitude: 3.73, waveFrequency: 1.77, wavePhase: 1.23 }, // 54 h
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.51, waveAmplitude: 2.73, waveFrequency: 1.27, wavePhase: 0.23 }, // 55 i
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.26, waveAmplitude: 3.73, waveFrequency: 1.77, wavePhase: 1.23 }, // 56 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.01, waveAmplitude: 4.73, waveFrequency: 2.27, wavePhase: 2.23 }, // 57 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.76, waveAmplitude: 2.73, waveFrequency: 1.27, wavePhase: 0.23 }, // 58 i
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.51, waveAmplitude: 3.73, waveFrequency: 1.77, wavePhase: 1.23 }, // 59 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.26, waveAmplitude: 4.73, waveFrequency: 2.27, wavePhase: 2.23 }, // 60 i

	// ===== Скрутиха =====
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.01 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.37 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.87 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.37 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.37 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.37 }, // 5 a
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.87 }, // 6 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.07 }, // 7 a
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.01 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.37 }, // 9 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.87 }, // 10 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.37 }, // 11 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.37 }, // 12 b
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.37 }, // 13 b
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.87 }, // 14 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.07 }, // 15 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.09 }, // 16 c
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.37 }, // 17 c
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.87 }, // 18 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.37 }, // 19 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.37 }, // 20 c
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.37 }, // 21 c
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.87 }, // 22 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.07 }, // 23 c
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.01 }, // 24 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.37 }, // 25 d
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.87 }, // 26 d
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.37 }, // 27 d
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.37 }, // 28 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.37 }, // 29 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.87 }, // 30 d
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.07 }, // 31 d
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.01 }, // 32 e
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.37 }, // 33 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.87 }, // 34 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.37 }, // 35 e
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.37 }, // 36 e
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.37 }, // 37 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.27 }, // 38 e
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.07 }, // 39 e
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.29 }, // 40 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.04 }, // 41 f
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.79 }, // 42 f
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.54 }, // 43 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.29 }, // 44 f
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 14, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.01 }, // 45 g
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.37 }, // 46 g
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.87 }, // 47 g
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.37 }, // 48 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.37 }, // 49 g
	{ boss: 'enem5', type: 'enem55', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.37 }, // 50 g
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.87 }, // 51 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.07 }, // 52 g
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.57 }, // 53 g
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7.01 }, // 54 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.37 }, // 55 h
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.87 }, // 56 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.37 }, // 57 h
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.37 }, // 58 h
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.37 }, // 59 h
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.87 }, // 60 h
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.07 }, // 61 h
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.493 }, // 62 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.39 }, // 63 i
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.14 }, // 64 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.89 }, // 65 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.64 }, // 66 i
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.39 }, // 67 i
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.14 }, // 68 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.89 }, // 69 i

];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 184, bossDelayAbDop: 12500, firstWaveDelayMs: 2710 }, // Дорожка мыла с поперечной пеной у конца
	{ boss: 'enem2', bossDelayAb: 185, bossDelayAbDop: 11350, firstWaveDelayMs: 2710 }, // Два накрывающих края и оставшаяся складка
	{ boss: 'enem3', bossDelayAb: 183, bossDelayAbDop: 17100, firstWaveDelayMs: 2710 }, // Трение одного участка рёбер и смещённый хруст
	{ boss: 'enem4', bossDelayAb: 174, bossDelayAbDop: 13200, firstWaveDelayMs: 2710 }, // Локальные всплески и перелив через борт
	{ boss: 'enem5', bossDelayAb: 180, bossDelayAbDop: 16600, firstWaveDelayMs: 2710 }, // Натяжение двух концов, щелчок и отскок полотна
];

 const bossAbilitiesDop = [
	// Скользель
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [0, 0, 250, 250, 250], openingOrder: 0 },
	{ boss: 'enem1', indexAbilities: [6, 7, 8, 9, 10, 11], shotGapsMs: [0, 0, 250, 250, 250] },
	{ boss: 'enem1', indexAbilities: [12, 13, 14, 15, 16, 17], shotGapsMs: [500, 250, 250, 500, 500] },
	{ boss: 'enem1', indexAbilities: [18, 19, 20, 21, 22, 23], shotGapsMs: [500, 500, 0, 250, 500] },
	{ boss: 'enem1', indexAbilities: [24, 25, 26, 27, 28, 29], shotGapsMs: [500, 0, 500, 0, 500] },
	{ boss: 'enem1', indexAbilities: [30, 31, 32, 33], signature: true, isChain: true, shotDelayMs: 343, shotGapsMs: [0, 0, 0], openingOrder: 1, label: "Дорожка мыла с поперечной пеной у конца — знакомство" },
	{ boss: 'enem1', indexAbilities: [34, 35, 36, 37, 38, 39, 40], minPhase: 2, shotGapsMs: [0, 0, 250, 250, 500, 500] },
	{ boss: 'enem1', indexAbilities: [41, 42, 43, 8, 44, 45, 46], minPhase: 3, shotGapsMs: [500, 0, 0, 250, 250, 500] },
	{ boss: 'enem1', indexAbilities: [47, 48, 49, 50, 51, 52], signature: true, isChain: true, minPhase: 3, shotDelayMs: 373, shotGapsMs: [0, 0, 0, 0, 0], label: "Дорожка мыла с поперечной пеной у конца — завершение" },

	// Полотнище
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 0, 0, 0], openingOrder: 0 },
	{ boss: 'enem2', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [250, 0, 250, 0] },
	{ boss: 'enem2', indexAbilities: [10, 11, 12, 13, 14, 15], shotGapsMs: [500, 0, 0, 0, 250] },
	{ boss: 'enem2', indexAbilities: [16, 17, 18, 19, 20, 21], shotGapsMs: [0, 0, 500, 0, 0] },
	{ boss: 'enem2', indexAbilities: [22, 23, 24, 25, 26, 27], shotGapsMs: [250, 0, 500, 0, 500] },
	{ boss: 'enem2', indexAbilities: [28, 29, 30, 31], signature: true, isChain: true, shotDelayMs: 351, shotGapsMs: [0, 0, 0], openingOrder: 1, label: "Два накрывающих края и оставшаяся складка — знакомство" },
	{ boss: 'enem2', indexAbilities: [32, 33, 34, 35, 36, 37, 38], minPhase: 2, shotGapsMs: [500, 500, 0, 500, 0, 250] },
	{ boss: 'enem2', indexAbilities: [39, 40, 41, 42, 43, 44, 45], minPhase: 3, shotGapsMs: [250, 500, 0, 500, 0, 250] },
	{ boss: 'enem2', indexAbilities: [46, 47, 48, 49, 50, 51], signature: true, isChain: true, minPhase: 3, shotDelayMs: 389, shotGapsMs: [0, 0, 0, 0, 0], label: "Два накрывающих края и оставшаяся складка — завершение" },

	// Рубчак
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5, 6], shotGapsMs: [500, 0, 0, 0, 500, 500], openingOrder: 0 },
	{ boss: 'enem3', indexAbilities: [7, 8, 9, 10, 11, 12, 13], shotGapsMs: [500, 0, 0, 0, 500, 250] },
	{ boss: 'enem3', indexAbilities: [14, 15, 16, 17, 18, 19, 20], shotGapsMs: [0, 0, 250, 0, 250, 500] },
	{ boss: 'enem3', indexAbilities: [21, 22, 23, 24, 25, 26, 27], shotGapsMs: [250, 0, 250, 0, 500, 0] },
	{ boss: 'enem3', indexAbilities: [28, 29, 30, 31, 32, 33, 34, 35], shotGapsMs: [0, 0, 0, 250, 250, 500, 500] },
	{ boss: 'enem3', indexAbilities: [36, 37, 38, 39, 40], signature: true, isChain: true, shotDelayMs: 401, shotGapsMs: [0, 0, 0, 0], openingOrder: 1, label: "Трение одного участка рёбер и смещённый хруст — знакомство" },
	{ boss: 'enem3', indexAbilities: [41, 42, 43, 44, 45, 46, 47, 48], minPhase: 2, shotGapsMs: [0, 0, 250, 0, 250, 500, 250] },
	{ boss: 'enem3', indexAbilities: [49, 50, 51, 52, 53, 54, 55, 56], minPhase: 3, shotGapsMs: [0, 0, 0, 0, 0, 500, 500] },
	{ boss: 'enem3', indexAbilities: [57, 58, 59, 60, 61, 62], signature: true, isChain: true, minPhase: 3, shotDelayMs: 413, shotGapsMs: [0, 0, 0, 0, 0], label: "Трение одного участка рёбер и смещённый хруст — завершение" },

	// Лоханыч
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4, 5, 6], shotGapsMs: [500, 500, 250, 0, 250, 500], openingOrder: 0 },
	{ boss: 'enem4', indexAbilities: [7, 8, 9, 10, 11, 12, 13], shotGapsMs: [0, 500, 250, 0, 250, 500] },
	{ boss: 'enem4', indexAbilities: [14, 15, 16, 17, 18, 19, 20], shotGapsMs: [250, 0, 500, 0, 0, 500] },
	{ boss: 'enem4', indexAbilities: [21, 22, 23, 24, 25, 26, 27], shotGapsMs: [500, 0, 500, 0, 0, 250] },
	{ boss: 'enem4', indexAbilities: [28, 29, 30, 31, 32, 33, 34], shotGapsMs: [0, 500, 500, 500, 0, 500] },
	{ boss: 'enem4', indexAbilities: [35, 36, 37, 38], signature: true, isChain: true, shotDelayMs: 359, shotGapsMs: [0, 0, 0], openingOrder: 1, label: "Локальные всплески и перелив через борт — знакомство" },
	{ boss: 'enem4', indexAbilities: [39, 40, 41, 42, 43, 44, 45, 46], minPhase: 2, shotGapsMs: [500, 250, 500, 0, 250, 250, 0] },
	{ boss: 'enem4', indexAbilities: [47, 48, 49, 50, 51, 52, 53, 54], minPhase: 3, shotGapsMs: [0, 0, 0, 0, 0, 500, 0] },
	{ boss: 'enem4', indexAbilities: [55, 56, 57, 58, 59, 60], signature: true, isChain: true, minPhase: 3, shotDelayMs: 383, shotGapsMs: [0, 0, 0, 0, 0], label: "Локальные всплески и перелив через борт — завершение" },

	// Скрутиха
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5, 6, 7], shotGapsMs: [500, 0, 500, 0, 500, 0, 250], openingOrder: 0 },
	{ boss: 'enem5', indexAbilities: [8, 9, 10, 11, 12, 13, 14, 15], shotGapsMs: [0, 0, 250, 0, 500, 0, 500] },
	{ boss: 'enem5', indexAbilities: [16, 17, 18, 19, 20, 21, 22, 23], shotGapsMs: [0, 0, 0, 0, 500, 0, 500] },
	{ boss: 'enem5', indexAbilities: [24, 25, 26, 27, 28, 29, 30, 31], shotGapsMs: [0, 0, 500, 0, 500, 0, 500] },
	{ boss: 'enem5', indexAbilities: [32, 33, 34, 35, 36, 37, 38, 39], shotGapsMs: [500, 0, 500, 250, 500, 0, 500] },
	{ boss: 'enem5', indexAbilities: [40, 41, 42, 43, 44], signature: true, isChain: true, shotDelayMs: 371, shotGapsMs: [0, 0, 0, 0], openingOrder: 1, label: "Натяжение двух концов, щелчок и отскок полотна — знакомство" },
	{ boss: 'enem5', indexAbilities: [45, 46, 47, 48, 49, 50, 51, 52, 53], minPhase: 2, shotGapsMs: [500, 0, 500, 0, 500, 0, 500, 250] },
	{ boss: 'enem5', indexAbilities: [54, 55, 56, 57, 58, 59, 60, 61, 62], minPhase: 3, shotGapsMs: [250, 250, 250, 0, 500, 0, 500, 250] },
	{ boss: 'enem5', indexAbilities: [63, 64, 65, 66, 67, 68, 69], signature: true, isChain: true, minPhase: 3, shotDelayMs: 397, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Натяжение двух концов, щелчок и отскок полотна — завершение" },

];

// Лорные названия связок временных улучшений — пять разных монстров одного
// прачечного двора, словарь каждого строго завязан на его реальный предмет
// и его конкретное действие (правило 12.1): мыло скользит и оставляет
// пенный след, простыня хлопает и накрывает, рубель трётся рёбрами, лохань
// плещет и брызжет, прачка крутит и хлещет полотенцем. Полных совпадений
// фраз между монстрами нет (проверено вручную построчно).
const UPGRADE_VARIANT_NAMES = {
    // Скользель — брусок мыла: пена, скольжение, занос, гладкий след.
    enem1: {
        variant1: 'Мыльный кураж', variant2: 'Пенная хватка', variant3: 'Брусок-таран',
        variant4: 'Скользкий напор', variant5: 'Меткий занос', variant6: 'Бешеный занос',
        variant7: 'Скользкий норов', variant8: 'Крепкий брусок', variant9: 'Ударный занос',
        variant10: 'Живучая пена', variant11: 'Колючая корка', variant12: 'Занос и в темноту',
        variant13: 'Толстый брусок', variant14: 'Неутомимый занос', variant15: 'Пружинистый занос',
        variant16: 'Скользкий след, зоркий глаз', variant17: 'Мыльная удача', variant18: 'Верный занос',
        variant19: 'Молниеносный занос', variant20: 'Мыльный нюх', variant21: 'Цепкая пена',
        variant22: 'Юркий, несмотря на вес', variant23: 'Мыльная стойкость', variant24: 'Долгий след, зоркий глаз',
        variant25: 'Ускользающий занос', variant26: 'Дикий занос', variant27: 'Стойкий брусок',
        variant28: 'Занос наповал', variant29: 'Крепкий скользель', variant30: 'Мыльная мощь',
        variant31: 'Занос с оглядкой', variant32: 'Живучий брусок', variant33: 'Юркий и мыльный',
        variant34: 'Мыльная прыть', variant35: 'Быстрый занос, крепкий брусок'
    },
    // Полотнище — мокрая простыня: прищепка, хлопок, накрытие, подол.
    enem2: {
        variant1: 'Простынный кураж', variant2: 'Прищепочная хватка', variant3: 'Хлопок-таран',
        variant4: 'Накрывной напор', variant5: 'Меткий хлопок', variant6: 'Бешеный хлопок',
        variant7: 'Простынный норов', variant8: 'Крепкая прищепка', variant9: 'Ударный хлопок',
        variant10: 'Живучий подол', variant11: 'Колючий край', variant12: 'Хлопок и в темноту',
        variant13: 'Толстая ткань', variant14: 'Неутомимый хлопок', variant15: 'Пружинистый хлопок',
        variant16: 'Острый угол, зоркий глаз', variant17: 'Простынная удача', variant18: 'Верный хлопок',
        variant19: 'Молниеносный хлопок', variant20: 'Простынный нюх', variant21: 'Цепкая прищепка',
        variant22: 'Юркий, несмотря на подол', variant23: 'Простынная стойкость', variant24: 'Долгий полёт, зоркий глаз',
        variant25: 'Ускользающий хлопок', variant26: 'Дикий хлопок', variant27: 'Стойкая ткань',
        variant28: 'Хлопок наповал', variant29: 'Крепкое полотнище', variant30: 'Накрывная мощь',
        variant31: 'Хлопок с оглядкой', variant32: 'Живучая ткань', variant33: 'Юркий и простынный',
        variant34: 'Простынная прыть', variant35: 'Быстрый хлопок, крепкая ткань'
    },
    // Рубчак — резной рубель: ребро, нажим, доска, трение.
    enem3: {
        variant1: 'Рубчатый кураж', variant2: 'Двуручная хватка', variant3: 'Ребро-таран',
        variant4: 'Трущий напор', variant5: 'Меткий нажим', variant6: 'Бешеный нажим',
        variant7: 'Рубчатый норов', variant8: 'Крепкое ребро', variant9: 'Ударный нажим',
        variant10: 'Живучий хват', variant11: 'Колючее ребро', variant12: 'Нажим и в темноту',
        variant13: 'Толстая доска', variant14: 'Неутомимый нажим', variant15: 'Пружинистый нажим',
        variant16: 'Острое ребро, зоркий глаз', variant17: 'Рубчатая удача', variant18: 'Верный нажим',
        variant19: 'Молниеносный нажим', variant20: 'Рубчатый нюх', variant21: 'Цепкое ребро',
        variant22: 'Юркий, несмотря на доску', variant23: 'Рубчатая стойкость', variant24: 'Долгий нажим, зоркий глаз',
        variant25: 'Ускользающий нажим', variant26: 'Дикий нажим', variant27: 'Стойкая доска',
        variant28: 'Нажим наповал', variant29: 'Крепкий рубчак', variant30: 'Трущая мощь',
        variant31: 'Нажим с оглядкой', variant32: 'Живучая доска', variant33: 'Юркий и рубчатый',
        variant34: 'Рубчатая прыть', variant35: 'Быстрый нажим, крепкое ребро'
    },
    // Лоханыч — липовая лохань: пена, плеск, брызги, обод.
    enem4: {
        variant1: 'Лоханный кураж', variant2: 'Плесковая хватка', variant3: 'Брызг-таран',
        variant4: 'Пенный напор', variant5: 'Меткий плеск', variant6: 'Бешеный плеск',
        variant7: 'Лоханный норов', variant8: 'Крепкий обод', variant9: 'Ударный плеск',
        variant10: 'Живучая струя', variant11: 'Колючая щётка', variant12: 'Плеск и в темноту',
        variant13: 'Толстый обод', variant14: 'Неутомимый плеск', variant15: 'Пружинистый плеск',
        variant16: 'Острая щётка, зоркий глаз', variant17: 'Лоханная удача', variant18: 'Верный плеск',
        variant19: 'Молниеносный плеск', variant20: 'Лоханный нюх', variant21: 'Цепкая щётка',
        variant22: 'Юркий, несмотря на обод', variant23: 'Лоханная стойкость', variant24: 'Долгий плеск, зоркий глаз',
        variant25: 'Ускользающий плеск', variant26: 'Дикий плеск', variant27: 'Стойкий обод',
        variant28: 'Плеск наповал', variant29: 'Крепкий лоханыч', variant30: 'Пенная мощь',
        variant31: 'Плеск с оглядкой', variant32: 'Живучий обод', variant33: 'Юркий и лоханный',
        variant34: 'Лоханная прыть', variant35: 'Быстрый плеск, крепкий обод'
    },
    // Скрутиха — сильная прачка: полотенце, узел, закрутка, хлёст.
    enem5: {
        variant1: 'Прачкин кураж', variant2: 'Полотенечная хватка', variant3: 'Хлёст-таран',
        variant4: 'Крутящий напор', variant5: 'Меткий хлёст', variant6: 'Бешеный хлёст',
        variant7: 'Прачкин норов', variant8: 'Крепкий узел', variant9: 'Ударный хлёст',
        variant10: 'Живучая хватка', variant11: 'Колючая прищепка', variant12: 'Хлёст и в темноту',
        variant13: 'Толстое полотенце', variant14: 'Неутомимый хлёст', variant15: 'Пружинистый хлёст',
        variant16: 'Острый узел, зоркий глаз', variant17: 'Прачкина удача', variant18: 'Верный хлёст',
        variant19: 'Молниеносный хлёст', variant20: 'Прачкин нюх', variant21: 'Цепкая закрутка',
        variant22: 'Юркая, несмотря на полотенце', variant23: 'Прачкина стойкость', variant24: 'Долгий замах, зоркий глаз',
        variant25: 'Ускользающий хлёст', variant26: 'Дикий хлёст', variant27: 'Стойкое полотенце',
        variant28: 'Хлёст наповал', variant29: 'Крепкая скрутиха', variant30: 'Крутящая мощь',
        variant31: 'Хлёст с оглядкой', variant32: 'Живучее полотенце', variant33: 'Юркая и прачкина',
        variant34: 'Прачкина прыть', variant35: 'Быстрый хлёст, крепкий узел'
    }
};
