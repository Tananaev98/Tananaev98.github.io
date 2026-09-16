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
			// Поддувень: EMBER_PUFF — ровные ритмичные выдохи тлеющих угольков из носика
			movementStyle: 'accelerate', cadence: 1.02, telegraphMs: 900, speedMultiplier: 0.94, damageMultiplier: 0.90,
			speedVariance: [0.82, 0.92, 1.00, 1.08, 1.16]
		}, // Поддувень: EMBER_PUFF — ровные ритмичные выдохи тлеющих угольков из носика
		enem2: {
			// Цапыч: TONG_SNAP — быстрые прямые щелчки клещей без замаха
			movementStyle: 'straight', cadence: 0.90, telegraphMs: 760, speedMultiplier: 1.06, damageMultiplier: 1.00,
			speedVariance: [0.86, 0.95, 1.05, 1.14, 1.22]
		}, // Цапыч: TONG_SNAP — быстрые прямые щелчки клещей без замаха
		enem3: {
			// Гудило: RESONANT_TOLL — редкий тяжёлый удар, за которым расходится гул
			movementStyle: 'accelerate', cadence: 1.16, telegraphMs: 1020, speedMultiplier: 0.83, damageMultiplier: 1.17,
			speedVariance: [0.80, 0.88, 0.96, 1.04, 1.12]
		}, // Гудило: RESONANT_TOLL — редкий тяжёлый удар, за которым расходится гул
		enem4: {
			// Молотыш: APPRENTICE_STRAIGHT — простой прямой удар молотом, изредка сбивается с ритма
			movementStyle: 'straight', cadence: 0.86, telegraphMs: 690, speedMultiplier: 1.13, damageMultiplier: 1.04,
			speedVariance: [0.88, 0.98, 1.08, 1.18, 1.26]
		}, // Молотыш: APPRENTICE_STRAIGHT — простой прямой удар молотом, изредка сбивается с ритма
		enem5: {
			// Жарило: FORGEMASTER_COMBO — сочетает хват клещей и удар молота, венчает всю ковку
			movementStyle: 'accelerate', cadence: 0.81, telegraphMs: 970, speedMultiplier: 1.07, damageMultiplier: 1.15,
			speedVariance: [0.86, 0.94, 1.03, 1.12, 1.20]
		} // Жарило: FORGEMASTER_COMBO — сочетает хват клещей и удар молота, венчает всю ковку
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
 let timeNextBoss = 5;
 const bossInterval = 5;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
 // speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Поддувень: EMBER_PUFF — ровные ритмичные выдохи тлеющих
	// угольков из носика меха, сжатие-пауза-выдох =====
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
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //13 — нежданчик: выдох сразу мощный, без привычного разгона
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — ровный выдох прямо вниз, затем более
	// сильный направленный залп наискось (vertical+diagonal), раздел 13.7.
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //20 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //21 цепь-B звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 8 },  //22 цепь-B звено 4

	// ===== Цапыч: TONG_SNAP — быстрые прямые щелчки клещей без замаха,
	// то с одной стороны, то с другой =====
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
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //12 — нежданчик: щелчок сразу по центру без привычного разброса
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — щёлкает по диагонали с одной стороны,
	// затем зеркально с другой (diagonal+diagonal), раздел 13.7.
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //20 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //21 цепь-B звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //22 цепь-B звено 4

	// ===== Гудило: RESONANT_TOLL — редкий тяжёлый удар, за которым
	// широкой дугой расходится гул =====
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
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //14 — нежданчик: гул раньше привычной долгой готовности
	{ boss: 'enem3', type: 'enem33', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — удар наискось, затем гул широкой дугой
	// расходится вовне (diagonal+arc), раздел 13.7.
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 75, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //21 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //22 цепь-B звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //23 цепь-B звено 4

	// ===== Молотыш: APPRENTICE_STRAIGHT — простой прямой удар молотом,
	// изредка сбивается с ритма, но добивает уверенным широким взмахом =====
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
	// звенья «атакующей цепи» — нервный сбивчивый замах, но добивает широким
	// уверенным взмахом (zigzag+arc), раздел 13.7.
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //21 цепь-B звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //22 цепь-B звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //23 цепь-B звено 4

	// ===== Жарило: FORGEMASTER_COMBO — сочетает непредсказуемый хват
	// клещей и удар молота разом, ни одна атака не повторяет предыдущую =====
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
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28 }, //12 — нежданчик: удар без единого мгновения замаха
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //14
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //15
	// звенья «атакующей цепи» — хаотичное сочетание хвата и удара, ни одна
	// атака не повторяет предыдущую траекторию (irregular+irregular),
	// раздел 13.7 — финальная кульминация уровня.
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 9 },  //19 цепь-A звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 7 },  //20 цепь-A звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //21 цепь-B звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, //22 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //23 цепь-B звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 65, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //24 цепь-B звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //25 цепь-B звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //26 цепь-B звено 6
];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 310, bossDelayAbDop: 5700 }, // ровное дыхание мехов
	{ boss: 'enem2', bossDelayAb: 220, bossDelayAbDop: 4200 }, // самый частый — быстрые щелчки клещей
	{ boss: 'enem3', bossDelayAb: 415, bossDelayAbDop: 6900 }, // самый долгий отдых — редкий тяжёлый гул
	{ boss: 'enem4', bossDelayAb: 195, bossDelayAbDop: 3500 }, // простые частые удары молотом
	{ boss: 'enem5', bossDelayAb: 255, bossDelayAbDop: 5100 }, // собранный финал
 ];

 const bossAbilitiesDop = [
	// Поддувень — EMBER_PUFF
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4] },
	{ boss: 'enem1', indexAbilities: [5, 6] },
	{ boss: 'enem1', indexAbilities: [7, 8] },
	{ boss: 'enem1', indexAbilities: [9, 10] },
	{ boss: 'enem1', indexAbilities: [0, 1, 5] }, // same-start с [0,1], расходится резким выдохом
	{ boss: 'enem1', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь-A (3)
	{ boss: 'enem1', indexAbilities: [19, 20, 21, 22], isChain: true }, // ← цепь-B (4)
	{ boss: 'enem1', indexAbilities: [13, 6, 7] }, // нежданчик: выдох сразу мощный, без привычного разгона
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 14] }, // сигнатурная: полный проход выдохов через всё поле разом

	// Цапыч — TONG_SNAP
	{ boss: 'enem2', indexAbilities: [0] },
	{ boss: 'enem2', indexAbilities: [1] },
	{ boss: 'enem2', indexAbilities: [2] },
	{ boss: 'enem2', indexAbilities: [3, 4] },
	{ boss: 'enem2', indexAbilities: [8, 9] },
	{ boss: 'enem2', indexAbilities: [0, 1] }, // same-start-стиль пара двух одиночных щелчков подряд
	{ boss: 'enem2', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь-A (3)
	{ boss: 'enem2', indexAbilities: [19, 20, 21, 22], isChain: true }, // ← цепь-B (4)
	{ boss: 'enem2', indexAbilities: [12, 13] }, // нежданчик: двойной щелчок с одной стороны подряд
	{ boss: 'enem2', indexAbilities: [0, 2, 1, 10, 6, 14] }, // сигнатурная: серия точечных щелчков по всему полю подряд

	// Гудило — RESONANT_TOLL
	{ boss: 'enem3', indexAbilities: [0, 1, 2] },
	{ boss: 'enem3', indexAbilities: [3, 4] },
	{ boss: 'enem3', indexAbilities: [5, 6] },
	{ boss: 'enem3', indexAbilities: [7, 8] },
	{ boss: 'enem3', indexAbilities: [9, 10] },
	{ boss: 'enem3', indexAbilities: [0, 1, 7] }, // same-start с [0,1], расходится дальним ударом
	{ boss: 'enem3', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4)
	{ boss: 'enem3', indexAbilities: [20, 21, 22, 23], isChain: true }, // ← цепь-B (4)
	{ boss: 'enem3', indexAbilities: [14] }, // нежданчик: гул раньше привычной долгой готовности
	{ boss: 'enem3', indexAbilities: [3, 11, 4, 12] }, // сигнатурная: широкий удар с обеих сторон разом

	// Молотыш — APPRENTICE_STRAIGHT
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [2, 3] },
	{ boss: 'enem4', indexAbilities: [6, 7] },
	{ boss: 'enem4', indexAbilities: [10, 11] },
	{ boss: 'enem4', indexAbilities: [9, 10, 11] },
	{ boss: 'enem4', indexAbilities: [0, 1, 6] }, // same-start с [0,1], расходится дальним ударом
	{ boss: 'enem4', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4)
	{ boss: 'enem4', indexAbilities: [20, 21, 22, 23], isChain: true }, // ← цепь-B (4)
	{ boss: 'enem4', indexAbilities: [13, 14] }, // нежданчик: удар разом с обеих сторон без привычного разброса
	{ boss: 'enem4', indexAbilities: [0, 2, 4, 8, 1, 3, 5, 9] }, // сигнатурная: хаотичный шквал ударов через всё поле на полной скорости

	// Жарило — FORGEMASTER_COMBO, финальный облик
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [3, 4] },
	{ boss: 'enem5', indexAbilities: [5, 6] },
	{ boss: 'enem5', indexAbilities: [7, 8] },
	{ boss: 'enem5', indexAbilities: [9, 10, 11] },
	{ boss: 'enem5', indexAbilities: [0, 1, 3] }, // same-start с [0,1], расходится дальним ударом
	{ boss: 'enem5', indexAbilities: [16, 17, 18, 19, 20], isChain: true }, // ← цепь-A (5)
	{ boss: 'enem5', indexAbilities: [21, 22, 23, 24, 25, 26], isChain: true }, // ← цепь-B (6)
	{ boss: 'enem5', indexAbilities: [12, 13] }, // нежданчик: удар без единого мгновения замаха
	{ boss: 'enem5', indexAbilities: [0, 3, 5, 7, 9, 15] }, // сигнатурная кульминация: сочетание хвата и удара через весь двор разом
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
