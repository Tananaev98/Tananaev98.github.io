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
	waveJitter: { min: 0.88, max: 1.12 },
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: { historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35 },
	movementStyles: { accelerate: { start: 0.72, gain: 0.9 }, lateRush: { switchAt: 0.55, early: 0.72, late: 1.48 }, pause: { at: 0.42, durationMs: 420, after: 1.22 }, weave: { frequency: 1.35, amplitude: 5.5 }, drift: { shift: 10 } },
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
		enem1: { combatIdentity: "Мыльный скользящий след", combatTrick: "ведёт прицел вдоль прохода, затем возвращает угрозу за спину прохода", signatureEvery: 4,
			// Скользель: SUDS_SLIDE — атаки скользят низко по одной непрерывной линии в одну сторону
			movementStyle: 'drift', cadence: 1.02, telegraphMs: 900, speedMultiplier: 0.94, damageMultiplier: 0.90,
			speedVariance: [0.82, 0.92, 1.00, 1.08, 1.16]
		}, // Скользель: SUDS_SLIDE — атаки скользят низко по одной непрерывной линии в одну сторону
		enem2: { combatIdentity: "Полотно накрывает", combatTrick: "сводит угрозы с краёв к внутренним полосам, затем размыкает рисунок", signatureEvery: 4,
			// Полотнище: SHROUD_DROP — частые быстрые падения-накрытия сверху вниз
			movementStyle: 'lateRush', cadence: 0.90, telegraphMs: 760, speedMultiplier: 1.06, damageMultiplier: 1.00,
			speedVariance: [0.86, 0.95, 1.05, 1.14, 1.22]
		}, // Полотнище: SHROUD_DROP — частые быстрые падения-накрытия сверху вниз
		enem3: { combatIdentity: "Рубель трёт дважды", combatTrick: "повторяет удар в прежнем секторе вместо ожидаемого чередования", signatureEvery: 4,
			// Рубчак: SCRUB_GRIND — долгий трущий телеграф в одной точке, затем тяжёлый финальный хруст
			movementStyle: 'straight', cadence: 1.16, telegraphMs: 1020, speedMultiplier: 0.83, damageMultiplier: 1.17,
			speedVariance: [0.80, 0.88, 0.96, 1.04, 1.12]
		}, // Рубчак: SCRUB_GRIND — долгий трущий телеграф в одной точке, затем тяжёлый финальный хруст
		enem4: { combatIdentity: "Пузырь перед всплеском", combatTrick: "медленный первый снаряд остаётся фоном для более срочного второго", signatureEvery: 4,
			// Лоханыч: BUBBLE_BURST — частые непредсказуемые всплески-пузыри из случайных точек по краю
			movementStyle: 'wave', cadence: 0.86, telegraphMs: 690, speedMultiplier: 1.13, damageMultiplier: 1.04,
			speedVariance: [0.88, 0.98, 1.08, 1.18, 1.26]
		}, // Лоханыч: BUBBLE_BURST — частые непредсказуемые всплески-пузыри из случайных точек по краю
		enem5: { combatIdentity: "Полотенце хлещет обратно", combatTrick: "показывает боковой замах, но заканчивает серединой; позднее конец возвращается на край", signatureEvery: 4,
			// Скрутиха: TOWEL_SNAP — редкий тяжёлый хлёсткий щелчок полотенцем после закручивания
			movementStyle: 'accelerate', cadence: 0.81, telegraphMs: 970, speedMultiplier: 1.07, damageMultiplier: 1.15,
			speedVariance: [0.86, 0.94, 1.03, 1.12, 1.20]
		} // Скрутиха: TOWEL_SNAP — редкий тяжёлый хлёсткий щелчок полотенцем после закручивания
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
 let timeNextBoss = 5;
 const bossInterval = 5;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
 // speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Скользель: SUDS_SLIDE — атаки скользят низко по одной
	// непрерывной линии в одну сторону, спокойно и предсказуемо =====
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
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //13 — нежданчик: скольжение вдруг разворачивается в обратную сторону
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — мыло скользит прямо вниз, затем виляет юзом
	// (vertical+zigzag), раздел 13.7.
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //20 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //21 цепь-B звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 8 },  //22 цепь-B звено 4

	// ===== Полотнище: SHROUD_DROP — частые быстрые падения-накрытия сверху
	// вниз, простыня пытается опуститься на цель заново и заново =====
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
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //12 — нежданчик: накрытие сразу по центру без привычного разброса
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — простыня падает по диагонали, затем
	// треплется зигзагом на ветру (diagonal+zigzag), раздел 13.7.
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, //20 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //21 цепь-B звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //22 цепь-B звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //23 цепь-B звено 5

	// ===== Рубчак: SCRUB_GRIND — долгий трущий телеграф в одной точке
	// (трение о рёбра), затем один тяжёлый финальный хруст =====
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 31, yPos: 11, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //1  та же точка — трение
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //3  та же точка — трение
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
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //14 — нежданчик: хруст раньше привычного долгого трения
	{ boss: 'enem3', type: 'enem33', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — трение по одной оси, затем дугой
	// довершающий хруст (vertical+arc), раздел 13.7.
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 51, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //21 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //22 цепь-B звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //23 цепь-B звено 4

	// ===== Лоханыч: BUBBLE_BURST — частые непредсказуемые всплески-пузыри
	// из случайных точек по краю лохани =====
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },  //0
	{ boss: 'enem4', type: 'enem44', xPos: 85, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },  //1
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //2
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //3
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //4
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 26, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //5
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //6
	{ boss: 'enem4', type: 'enem44', xPos: 75, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //7
	{ boss: 'enem4', type: 'enem44', xPos: 8,  yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //8
	{ boss: 'enem4', type: 'enem44', xPos: 92, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //9
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },  //10
	{ boss: 'enem4', type: 'enem44', xPos: 35, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },  //11
	{ boss: 'enem4', type: 'enem44', xPos: 65, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 4, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },  //12
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //13 — нежданчик: пузыри разом с обеих сторон без привычного разброса
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //15
	// звенья «атакующей цепи» — всплеск прямо вверх, затем диагональный
	// плевок пены (vertical+diagonal), раздел 13.7.
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //17 цепь-A звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //18 цепь-A звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //20 цепь-B звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 }, //21 цепь-B звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },  //22 цепь-B звено 4

	// ===== Скрутиха: TOWEL_SNAP — редкий тяжёлый хлёсткий щелчок
	// полотенцем после явного закручивания-натяжения =====
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
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28 }, //12 — нежданчик: щелчок без единого мгновения закручивания
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //14
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //15
	// звенья «атакующей цепи» — щелчок прямо вниз, затем широкий дугой
	// хлёст на кульминации (vertical+arc), раздел 13.7.
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 51, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, //21 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //22 цепь-B звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 9 },  //23 цепь-B звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //24 цепь-B звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //25 цепь-B звено 6

    // Приёмы из scripts/combat-designs.js; индексы считаются отдельно для каждого босса.
    {boss: "enem1",type: "enem11",xPos: 14,yPos: 12,customHP: 1,customDamage: 20,customSpeed: 16},
    {boss: "enem1",type: "enem11",xPos: 34,yPos: 20,customHP: 1,customDamage: 20,customSpeed: 14},
    {boss: "enem1",type: "enem11",xPos: 60,yPos: 6,customHP: 1,customDamage: 20,customSpeed: 21},
    {boss: "enem1",type: "enem11",xPos: 14,yPos: 40,customHP: 1,customDamage: 20,customSpeed: 7},
    {boss: "enem1",type: "enem11",xPos: 14,yPos: 8,customHP: 1,customDamage: 20,customSpeed: 20},
    {boss: "enem1",type: "enem11",xPos: 84,yPos: 12,customHP: 1,customDamage: 20,customSpeed: 18},
    {boss: "enem2",type: "enem22",xPos: 86,yPos: 12,customHP: 1,customDamage: 22,customSpeed: 16},
    {boss: "enem2",type: "enem22",xPos: 72,yPos: 20,customHP: 1,customDamage: 22,customSpeed: 14},
    {boss: "enem2",type: "enem22",xPos: 16,yPos: 6,customHP: 1,customDamage: 22,customSpeed: 21},
    {boss: "enem2",type: "enem22",xPos: 86,yPos: 40,customHP: 1,customDamage: 22,customSpeed: 7},
    {boss: "enem2",type: "enem22",xPos: 86,yPos: 8,customHP: 1,customDamage: 22,customSpeed: 20},
    {boss: "enem2",type: "enem22",xPos: 30,yPos: 12,customHP: 1,customDamage: 22,customSpeed: 18},
    {boss: "enem3",type: "enem33",xPos: 24,yPos: 12,customHP: 1,customDamage: 24,customSpeed: 16},
    {boss: "enem3",type: "enem33",xPos: 32,yPos: 20,customHP: 1,customDamage: 24,customSpeed: 14},
    {boss: "enem3",type: "enem33",xPos: 78,yPos: 6,customHP: 1,customDamage: 24,customSpeed: 21},
    {boss: "enem3",type: "enem33",xPos: 24,yPos: 40,customHP: 1,customDamage: 24,customSpeed: 7},
    {boss: "enem3",type: "enem33",xPos: 24,yPos: 8,customHP: 1,customDamage: 24,customSpeed: 20},
    {boss: "enem3",type: "enem33",xPos: 88,yPos: 12,customHP: 1,customDamage: 24,customSpeed: 18},
    {boss: "enem4",type: "enem44",xPos: 18,yPos: 12,customHP: 1,customDamage: 26,customSpeed: 16, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },
    {boss: "enem4",type: "enem44",xPos: 82,yPos: 20,customHP: 1,customDamage: 26,customSpeed: 14, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },
    {boss: "enem4",type: "enem44",xPos: 38,yPos: 6,customHP: 1,customDamage: 26,customSpeed: 21, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },
    {boss: "enem4",type: "enem44",xPos: 18,yPos: 24,customHP: 1,customDamage: 26,customSpeed: 7, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },
    {boss: "enem4",type: "enem44",xPos: 18,yPos: 8,customHP: 1,customDamage: 26,customSpeed: 20, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },
    {boss: "enem4",type: "enem44",xPos: 66,yPos: 12,customHP: 1,customDamage: 26,customSpeed: 18, waveAmplitude: 6, waveFrequency: 1.2, wavePhase: 0 },
    {boss: "enem5",type: "enem55",xPos: 84,yPos: 12,customHP: 1,customDamage: 28,customSpeed: 16},
    {boss: "enem5",type: "enem55",xPos: 62,yPos: 20,customHP: 1,customDamage: 28,customSpeed: 14},
    {boss: "enem5",type: "enem55",xPos: 14,yPos: 6,customHP: 1,customDamage: 28,customSpeed: 21},
    {boss: "enem5",type: "enem55",xPos: 84,yPos: 40,customHP: 1,customDamage: 28,customSpeed: 7},
    {boss: "enem5",type: "enem55",xPos: 84,yPos: 8,customHP: 1,customDamage: 28,customSpeed: 20},
    {boss: "enem5",type: "enem55",xPos: 49,yPos: 12,customHP: 1,customDamage: 28,customSpeed: 18}
];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 310, bossDelayAbDop: 4853, firstWaveDelayMs: 2329 }, // ровное скольжение
	{ boss: 'enem2', bossDelayAb: 220, bossDelayAbDop: 4778, firstWaveDelayMs: 2293 }, // самый частый — быстрые падения-накрытия
	{ boss: 'enem3', bossDelayAb: 415, bossDelayAbDop: 5865, firstWaveDelayMs: 2400 }, // самый долгий отдых — долгое трение
	{ boss: 'enem4', bossDelayAb: 195, bossDelayAbDop: 4025, firstWaveDelayMs: 1932 }, // нервные всплески без пауз
	{ boss: 'enem5', bossDelayAb: 255, bossDelayAbDop: 5494, firstWaveDelayMs: 2400 }, // собранный финал
 ];

 const bossAbilitiesDop = [
    {boss: "enem1",indexAbilities: [0,1,2,3,4]},
    {boss: "enem1",indexAbilities: [5,6],openingOrder: 0},
    {boss: "enem1",indexAbilities: [7,8]},
    {boss: "enem1",indexAbilities: [9,10]},
    {boss: "enem1",indexAbilities: [23,24,25],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Мыльный скользящий след — знакомство",openingOrder: 1},
    {boss: "enem1",indexAbilities: [23,24,27],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Мыльный скользящий след — иной конец"},
    {boss: "enem1",indexAbilities: [28,25,24,27],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Мыльный скользящий след — завершение"},
    {boss: "enem1",indexAbilities: [16,17,18],isChain: true},
    {boss: "enem1",indexAbilities: [19,20,21,22],isChain: true},
    {boss: "enem2",indexAbilities: [0,1,2]},
    {boss: "enem2",indexAbilities: [3,4],openingOrder: 0},
    {boss: "enem2",indexAbilities: [5,6]},
    {boss: "enem2",indexAbilities: [7,8]},
    {boss: "enem2",indexAbilities: [9,10,11]},
    {boss: "enem2",indexAbilities: [24,26,25,29],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Полотно накрывает — знакомство",openingOrder: 1},
    {boss: "enem2",indexAbilities: [24,26,28],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Полотно накрывает — иной конец"},
    {boss: "enem2",indexAbilities: [25,29,24,26],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Полотно накрывает — завершение"},
    {boss: "enem2",indexAbilities: [16,17,18],isChain: true},
    {boss: "enem2",indexAbilities: [19,20,21,22,23],isChain: true},
    {boss: "enem3",indexAbilities: [0,1],openingOrder: 0},
    {boss: "enem3",indexAbilities: [2,3]},
    {boss: "enem3",indexAbilities: [4,5]},
    {boss: "enem3",indexAbilities: [6,7]},
    {boss: "enem3",indexAbilities: [8,10,9,11]},
    {boss: "enem3",indexAbilities: [24,28,25],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Рубель трёт дважды — знакомство",openingOrder: 1},
    {boss: "enem3",indexAbilities: [24,28,26],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Рубель трёт дважды — иной конец"},
    {boss: "enem3",indexAbilities: [29,26,29,25],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Рубель трёт дважды — завершение"},
    {boss: "enem3",indexAbilities: [16,17,18,19],isChain: true},
    {boss: "enem3",indexAbilities: [20,21,22,23],isChain: true},
    {boss: "enem4",indexAbilities: [0,1],openingOrder: 0},
    {boss: "enem4",indexAbilities: [2,3]},
    {boss: "enem4",indexAbilities: [4,5]},
    {boss: "enem4",indexAbilities: [6,7]},
    {boss: "enem4",indexAbilities: [8,9,10]},
    {boss: "enem4",indexAbilities: [26,25],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Пузырь перед всплеском — знакомство",openingOrder: 1},
    {boss: "enem4",indexAbilities: [26,25,27],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Пузырь перед всплеском — иной конец"},
    {boss: "enem4",indexAbilities: [26,28,25,27],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Пузырь перед всплеском — завершение"},
    {boss: "enem4",indexAbilities: [16,17,18],isChain: true},
    {boss: "enem4",indexAbilities: [19,20,21,22],isChain: true},
    {boss: "enem5",indexAbilities: [0,1],openingOrder: 0},
    {boss: "enem5",indexAbilities: [3,4]},
    {boss: "enem5",indexAbilities: [5,6]},
    {boss: "enem5",indexAbilities: [7,8]},
    {boss: "enem5",indexAbilities: [9,10,11]},
    {boss: "enem5",indexAbilities: [26,27,31],signature: true,minPhase: 1,shotDelayMs: 360,recoveryMs: 650,label: "Полотенце хлещет обратно — знакомство",openingOrder: 1},
    {boss: "enem5",indexAbilities: [26,27,30],signature: true,minPhase: 2,shotDelayMs: 360,recoveryMs: 650,label: "Полотенце хлещет обратно — иной конец"},
    {boss: "enem5",indexAbilities: [28,31,27,30],signature: true,minPhase: 3,shotDelayMs: 360,recoveryMs: 950,label: "Полотенце хлещет обратно — завершение"},
    {boss: "enem5",indexAbilities: [16,17,18,19],isChain: true},
    {boss: "enem5",indexAbilities: [20,21,22,23,24,25],isChain: true}
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
