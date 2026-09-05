// Уровень 46 «Погреб» — первый уровень области V, следующий за многофазным
// уровнем 45 (Банник). Обычный уровень с пятью РАЗНЫМИ монстрами (как 41-44),
// не персонаж-в-обликах.
//
// ДВОЙНАЯ ПРОВЕРКА УНИКАЛЬНОСТИ (раздел 1.2) — ШАГ 1 выполнен 2026-09-06 по
// admin-boss-pattern-panel.html, 225 строк, уровни 1-45, обе таблицы
// распределения (movementStyle и форма цепи) плюс колонка «Архетип» по всем
// пяти ролям целиком (не только последние уровни). Архетипы/movementStyle/
// цепи ниже выбраны ИЗ конкретной детали каждого арта, ЗАТЕМ сверены с
// полной историей той же роли — см. обоснование у каждого босса ниже.
//
// АРТ (images/enemies/regions/5_dom_dvor/lvl46/) — все 5 картинок открыты и
// сверены лично:
// 1.webp — упитанная крыса, одной лапой прижимает к животу украденный
//   хлеб (эта лапа занята и не атакует), вторая лапа — раскрытый когтистый
//   выпад. Настоящая асимметрия «лево не равно право» прямо из позы, не из
//   шаблона роли — сверено: enem1 ни разу не использовал «асимметрию» за всю
//   историю (было LEFT/RIGHT_COLUMN — ровное давление одной стороной, это
//   другое: там столб давления с одной стороны, тут — одна сторона активна,
//   другая занята хлебом и лишь изредка роняет крошки).
// 2.webp — луковая косица: длинные сухие перья-хлысты расходятся от тела
//   в стороны как руки, самих «рук» две, зловещая улыбка внутри луковиц.
//   Архетип — точные хлёсткие удары поочерёдно с обеих сторон (быстрая
//   серия, роль enem2) — сверено: TWIN_LASH новый, у enem2 был ALT-подобный
//   Клевач (41, «мечется из стороны в сторону», не хлёсткие уколы) и
//   ЩЕКАН/ТРОЙЧАТКА и другие — ни один не совпадает по механике.
// 3.webp — деревянная кадка, рассол и соленья бьют вверх фонтаном из
//   открытой крышки, одна лапа отведена в сторону — швыряет всплеск.
//   Архетип — редкий, тяжёлый, широкий веерный всплеск после долгого
//   «бурления» (роль enem3, тяжёлые редкие) — сверено: FOUNTAIN_ARC новый,
//   не совпадает с СТОЛБИК/ЧЕСАЛКА/ГОРЧАК/КОПНУША/БОДЕНЬ и другими редкими
//   архетипами enem3 (все они — давление с одной стороны или зигзаг, не
//   широкий веерный всплеск).
// 4.webp — ВАЖНО: документ-идея называл этот слот «Погребной работник,
//   сутулый, с масляной лампой» (человек), но реально сгенерированная
//   картинка — существо с лицом-картофелиной (кожура, глазки картофеля),
//   в мешковине, с фонарём в одной руке и свободной когтистой лапой с
//   корешками. Картинка признана истиной (раздел 12, случай уровня 28) —
//   названо и спроектировано как картофельно-корневой дух, не человек.
//   Архетип — нервные, хаотично разбросанные броски мелких клубней с
//   меняющихся точек (роль enem4, самый нервный) — сверено: TUBER_SCATTER
//   новый. ВАЖНО: enem4 уровня 41 (Фонарница) уже занял «мерные обходы
//   дозором со стоп-кадром на фонаре» — та же деталь арта (фонарь), но
//   Фонарница делала РАЗМЕРЕННЫЙ дозор, а этот персонаж — НЕРВНЫЙ хаотичный
//   разброс, полностью противоположный характер движения, не повтор.
// 5.webp — исполинская квасная бочка, пена фонтаном бьёт вверх из
//   пробитой крышки, кулаки подняты. Архетип — растущий по фазам
//   центральный столб пены (шире и выше к поздним фазам) плюс в поздней
//   фазе — короткие узнаваемые отсылки к почерку четырёх предыдущих боссов
//   уровня (крошки/хлыст/всплеск/клубни), сваренные заодно в кваснице —
//   тестирует навык всех четырёх (правило K) НОВЫМ способом, отличным от
//   REVERSE_ECHO Черпака (43, повтор в обратном порядке) или CROW_HERALD
//   Кукарекала (44, честный долгий телеграф перед сигнатурной) — сверено:
//   FOAM_COLUMN новый.
//
// ДВИЖЕНИЕ (movementStyle) — сверено с полным распределением 1-45 (все
// роли ≤20% до этого уровня, с запасом до 30%): Крохобор — pause (замирает,
// прижимая хлеб, боится расстаться с добычей, потом бьёт) 13%→после 15.2%;
// Косохлёст — accelerate (хлыст-лист набирает скорость к кончику) 16%→17.4%;
// Рассольник — pause (долгое бурление перед всплеском) 11%→13%;
// Клубнеглаз — drift (нервное шарканье корнями из стороны в сторону) 11%→13%;
// Пенодуй — straight (прямая, неприкрытая сила великанской бочки) 13%→15.2%.
// Все — далеко от 30%, ни одна роль не выбрала уже доминирующий стиль.
//
// ЦЕПИ (13.6/13.7, обязательны — уровень в диапазоне 41-65) — форма каждой
// цепи выбрана ИЗ образа И явно сверена с полным распределением формы цепи
// по роли (панель, шаг 1): Крохобор — zigzag(4)+arc(3): мечется, утаскивая
// добычу зигзагом, затем короткий рывковый разворот (у enem1 zigzag было
// 0%, arc 10% — обе ниже уже раздутого vertical 60%, не усугубляют его);
// Косохлёст — irregular(5)+vertical(3): хаотичные лёту хлыстов вперемешку
// с одним прямым уколом (у enem2 irregular было 0%, vertical 20% — ни то,
// ни другое не добавляет к уже занятым zigzag/arc по 30%); Рассольник —
// vertical(4)+irregular(5): капли рассола падают прямо вниз, второй заход —
// хаотичные брызги (у enem3 vertical было 0%, irregular 20% — не усугубляют
// уже раздутый diagonal 60%); Клубнеглаз — irregular(5)+vertical(4): корни
// падают то тут, то там, второй заход — ровный дождь клубней (у enem4
// irregular было 0%, vertical 10% — не усугубляют уже раздутый zigzag 40%,
// который и без того чуть выше цели чисто из-за того, что общий знаменатель
// вырос — доля САМОГО zigzag не увеличена ни на одно новое звено, это
// разбавление, а не усиление, тот же принцип, что уже применялся на
// уровне 45 для enem2); Пенодуй — zigzag(4)+vertical(6): пена плещет
// зигзагом по краям кадки, кульминация — сплошной прямой столб пены (у
// enem5 zigzag было 0%, vertical 20% — не усугубляют уже раздутый diagonal
// 40%, тем же способом разбавления).
//
// БОЕВЫЕ ТЕКСТЫ (appearMessage/phaseMessages) — НЕ используются на этом
// уровне (правка 2026-09-06): раздел 12 буквально говорит «касаются всех
// боссов», но пользователь прямо уточнил, что это относится только к
// персонажам-в-пяти-обликах (Банник и подобные), а не к обычным уровням с
// пятью разными монстрами — этот уровень, как и 41-44/47-49, полей не
// содержит, как и было изначально.
let lvlNumber = 46;

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
			// Крохобор: ASYM_GUARD — правая лапа (свободная) бьёт, левая
			// (держит хлеб) молчит и лишь изредка роняет крошки
			movementStyle: 'pause', cadence: 1.02, telegraphMs: 900, speedMultiplier: 0.94, damageMultiplier: 0.90,
			speedVariance: [0.82, 0.92, 1.00, 1.08, 1.16]
		}, // Крохобор: ASYM_GUARD — асимметрия, свободная лапа бьёт, занятая хлебом молчит
		enem2: {
			// Косохлёст: TWIN_LASH — точные хлёсткие удары поочерёдно
			movementStyle: 'accelerate', cadence: 0.92, telegraphMs: 780, speedMultiplier: 1.05, damageMultiplier: 1.00,
			speedVariance: [0.86, 0.95, 1.05, 1.14, 1.22]
		}, // Косохлёст: TWIN_LASH — точные хлёсткие удары поочерёдно с обеих сторон
		enem3: {
			// Рассольник: FOUNTAIN_ARC — долгое бурление, редкий тяжёлый веерный всплеск
			movementStyle: 'pause', cadence: 1.15, telegraphMs: 1020, speedMultiplier: 0.82, damageMultiplier: 1.18,
			speedVariance: [0.80, 0.88, 0.96, 1.04, 1.12]
		}, // Рассольник: FOUNTAIN_ARC — долгое бурление, редкий тяжёлый веерный всплеск
		enem4: {
			// Клубнеглаз: TUBER_SCATTER — нервный хаотичный разброс клубней
			movementStyle: 'drift', cadence: 0.85, telegraphMs: 680, speedMultiplier: 1.14, damageMultiplier: 1.05,
			speedVariance: [0.88, 0.98, 1.08, 1.18, 1.26]
		}, // Клубнеглаз: TUBER_SCATTER — нервный хаотичный разброс клубней с меняющихся точек
		enem5: {
			// Пенодуй: FOAM_COLUMN — растущий столб пены + поздний отголосок почерка всех четверых
			movementStyle: 'straight', cadence: 0.80, telegraphMs: 980, speedMultiplier: 1.06, damageMultiplier: 1.14,
			speedVariance: [0.86, 0.94, 1.03, 1.12, 1.20]
		} // Пенодуй: FOAM_COLUMN — растущий центральный столб пены, поздний отголосок почерка четырёх предыдущих
	}
};

const ENEMY_TYPES = {

	enem11: { name: 'enem11', image: 'images/enemies/regions/5_dom_dvor/lvl46/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { name: 'enem22', image: 'images/enemies/regions/5_dom_dvor/lvl46/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { name: 'enem33', image: 'images/enemies/regions/5_dom_dvor/lvl46/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { name: 'enem44', image: 'images/enemies/regions/5_dom_dvor/lvl46/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { name: 'enem55', image: 'images/enemies/regions/5_dom_dvor/lvl46/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
        name: 'enem1',
		dispName: 'Крохобор',
        image: 'images/enemies/regions/5_dom_dvor/lvl46/1.webp',
        baseHP: 11537,
        baseSpeed: 0,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 250,
        size: '22%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem2: {
        name: 'enem2',
		dispName: 'Косохлёст',
        image: 'images/enemies/regions/5_dom_dvor/lvl46/2.webp',
        baseHP: 28843,
        baseSpeed: 0,
        baseDamage: 22,
        spawnWeight: 15,
		baseExp: 400,
        size: '24%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem3: {
        name: 'enem3',
		dispName: 'Рассольник',
        image: 'images/enemies/regions/5_dom_dvor/lvl46/3.webp',
        baseHP: 51029,
        baseSpeed: 0,
        baseDamage: 24,
        spawnWeight: 20,
		baseExp: 600,
        size: '25%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem4: {
        name: 'enem4',
		dispName: 'Клубнеглаз',
        image: 'images/enemies/regions/5_dom_dvor/lvl46/4.webp',
        baseHP: 82090,
        baseSpeed: 0,
        baseDamage: 26,
        spawnWeight: 10,
		baseExp: 800,
        size: '24%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem5: {
        name: 'enem5',
		dispName: 'Пенодуй',
        image: 'images/enemies/regions/5_dom_dvor/lvl46/5.webp',
        baseHP: 124244,
        baseSpeed: 0,
        baseDamage: 28,
        spawnWeight: 5,
		baseExp: 0,
        size: '27%',
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
	// ===== Крохобор: ASYM_GUARD — правая (свободная) лапа бьёт разнообразно,
	// левая (держит хлеб) почти всегда молчит, редко роняет слабые крошки =====
	{ boss: 'enem1', type: 'enem11', xPos: 85, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //0  R
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //1  R
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //2  R
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //3  R
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //4  R fast accent
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //5  R fast accent
	{ boss: 'enem1', type: 'enem11', xPos: 75, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //6  R
	{ boss: 'enem1', type: 'enem11', xPos: 95, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //7  R low
	{ boss: 'enem1', type: 'enem11', xPos: 85, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //8  R fast accent
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //9  L weak crumb (guard side)
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //10 L weak crumb
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //11 L weak crumb
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 2 },  //12 L weak crumb
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //13 L rare fast — нежданчик: крыса на миг бросает хлеб
	{ boss: 'enem1', type: 'enem11', xPos: 85, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 26 }, //14 R fastest accent
	{ boss: 'enem1', type: 'enem11', xPos: 95, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //15 R
	// звенья «атакующей цепи» — мечется зигзагом, утаскивая добычу, затем
	// короткий рывковый разворот (zigzag+arc), раздел 13.7.
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem1', type: 'enem11', xPos: 85, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //21 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //22 цепь-B звено 3

	// ===== Косохлёст: TWIN_LASH — точные хлёсткие удары поочерёдно с обеих
	// сторон, тугой ритм =====
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //0  L
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //1  R
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //2  L
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //3  R
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //4  L fast
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //5  R fast
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //6  L fast
	{ boss: 'enem2', type: 'enem22', xPos: 75, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 26 }, //7  R fastest
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //8  L low
	{ boss: 'enem2', type: 'enem22', xPos: 82, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //9  R low
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //10 L
	{ boss: 'enem2', type: 'enem22', xPos: 88, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //11 R
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //12 L — нежданчик: два хлыста подряд с одной стороны вместо привычного чередования
	{ boss: 'enem2', type: 'enem22', xPos: 78, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //13 R fast
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //14 L low
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 52, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 2 },  //15 R low
	// звенья «атакующей цепи» — хаотичные броски вперемешку с одним прямым
	// уколом (irregular+vertical), раздел 13.7.
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, //17 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //18 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //19 цепь-A звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //20 цепь-A звено 5
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //21 цепь-B звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //22 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 48, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //23 цепь-B звено 3

	// ===== Рассольник: FOUNTAIN_ARC — долгое бурление, редкий тяжёлый
	// широкий веерный всплеск =====
	{ boss: 'enem3', type: 'enem33', xPos: 30, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //0
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //1
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //2
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //3
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //4
	{ boss: 'enem3', type: 'enem33', xPos: 40, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 3 },  //5
	{ boss: 'enem3', type: 'enem33', xPos: 60, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 2 },  //6
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 20 }, //7
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 22 }, //8
	{ boss: 'enem3', type: 'enem33', xPos: 15, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //9
	{ boss: 'enem3', type: 'enem33', xPos: 85, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 24 }, //10
	{ boss: 'enem3', type: 'enem33', xPos: 35, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //11
	{ boss: 'enem3', type: 'enem33', xPos: 65, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13 }, //12
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 4 },  //13
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //14 — нежданчик: всплеск начинается раньше привычного долгого бурления
	{ boss: 'enem3', type: 'enem33', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — капли рассола падают прямо вниз, второй
	// заход — хаотичные брызги (vertical+irregular), раздел 13.7.
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 51, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 9 },  //19 цепь-A звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 75, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 58, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15 }, //21 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 42, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12 }, //22 цепь-B звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 53, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //23 цепь-B звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 38, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //24 цепь-B звено 5

	// ===== Клубнеглаз: TUBER_SCATTER — нервный хаотичный разброс клубней с
	// меняющихся точек, изредка тяжёлый взмах фонарём =====
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
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //13 — нежданчик: тяжёлый взмах фонарём вместо привычного мелкого клубня
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //15
	// звенья «атакующей цепи» — корни падают то тут, то там, второй заход —
	// ровный дождь клубней (irregular+vertical), раздел 13.7.
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //17 цепь-A звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //18 цепь-A звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, //19 цепь-A звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //20 цепь-A звено 5
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //21 цепь-B звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 48, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //22 цепь-B звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //23 цепь-B звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 9 },  //24 цепь-B звено 4

	// ===== Пенодуй: FOAM_COLUMN — центральный столб пены растёт с фазами,
	// изредка короткие отголоски почерка четырёх предыдущих боссов =====
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //0  собственный: центральный сифон пены
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //1
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //2  отголосок хлыста (Косохлёст)
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //3  отголосок хлыста
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //4
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //5
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //6  отголосок всплеска (Рассольник)
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //7
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //8
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20 }, //9
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //10 отголосок клубней (Клубнеглаз)
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //11
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //12
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28 }, //13 — нежданчик: центральный гейзер бьёт на полной скорости без привычного нарастания
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //14
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //15
	// звенья «атакующей цепи» — пена плещет зигзагом по краям кадки,
	// кульминация — сплошной прямой столб пены (zigzag+vertical), раздел 13.7.
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16 }, //21 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 48, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //22 цепь-B звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 51, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //23 цепь-B звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //24 цепь-B звено 5
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //25 цепь-B звено 6
];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 310, bossDelayAbDop: 5800 }, // осторожный, охраняет добычу
	{ boss: 'enem2', bossDelayAb: 230, bossDelayAbDop: 4600 }, // тугой хлёсткий ритм
	{ boss: 'enem3', bossDelayAb: 400, bossDelayAbDop: 6800 }, // самый долгий отдых — награда за терпение
	{ boss: 'enem4', bossDelayAb: 190, bossDelayAbDop: 3600 }, // самый частый — давление без передышки
	{ boss: 'enem5', bossDelayAb: 250, bossDelayAbDop: 5000 }, // собранный финал
 ];

 const bossAbilitiesDop = [
	// Крохобор — ASYM_GUARD
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [2, 3] },
	{ boss: 'enem1', indexAbilities: [4, 5, 8] },
	{ boss: 'enem1', indexAbilities: [9, 10] },
	{ boss: 'enem1', indexAbilities: [11, 12] },
	{ boss: 'enem1', indexAbilities: [0, 1, 4] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem1', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4, zigzag)
	{ boss: 'enem1', indexAbilities: [20, 21, 22], isChain: true }, // ← цепь-B (3, arc)
	{ boss: 'enem1', indexAbilities: [13, 6, 7] }, // нежданчик: свободная лапа бьёт с фланга хлеба на миг
	{ boss: 'enem1', indexAbilities: [0, 2, 4, 6, 8, 14] }, // сигнатурная: вся правая лапа на полной скорости

	// Косохлёст — TWIN_LASH
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [2, 3] },
	{ boss: 'enem2', indexAbilities: [4, 5] },
	{ boss: 'enem2', indexAbilities: [6, 7] },
	{ boss: 'enem2', indexAbilities: [8, 9, 14, 15] },
	{ boss: 'enem2', indexAbilities: [0, 1, 4] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem2', indexAbilities: [16, 17, 18, 19, 20], isChain: true }, // ← цепь-A (5, irregular)
	{ boss: 'enem2', indexAbilities: [21, 22, 23], isChain: true }, // ← цепь-B (3, vertical)
	{ boss: 'enem2', indexAbilities: [12, 13] }, // нежданчик: два хлыста подряд с одного фланга
	{ boss: 'enem2', indexAbilities: [0, 2, 4, 6, 1, 3, 5, 7] }, // сигнатурная: полный тугой хлёст с обеих сторон подряд

	// Рассольник — FOUNTAIN_ARC
	{ boss: 'enem3', indexAbilities: [0, 1, 2] },
	{ boss: 'enem3', indexAbilities: [3, 4] },
	{ boss: 'enem3', indexAbilities: [5, 6] },
	{ boss: 'enem3', indexAbilities: [7, 8] },
	{ boss: 'enem3', indexAbilities: [9, 10] },
	{ boss: 'enem3', indexAbilities: [0, 1, 7] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem3', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4, vertical)
	{ boss: 'enem3', indexAbilities: [20, 21, 22, 23, 24], isChain: true }, // ← цепь-B (5, irregular)
	{ boss: 'enem3', indexAbilities: [14] }, // нежданчик: всплеск раньше привычного долгого бурления
	{ boss: 'enem3', indexAbilities: [3, 11, 4, 12] }, // сигнатурная: широкий веерный всплеск с обеих сторон разом

	// Клубнеглаз — TUBER_SCATTER
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [2, 3] },
	{ boss: 'enem4', indexAbilities: [4, 5] },
	{ boss: 'enem4', indexAbilities: [8, 9] },
	{ boss: 'enem4', indexAbilities: [6, 7, 11, 12] },
	{ boss: 'enem4', indexAbilities: [0, 1, 4] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem4', indexAbilities: [16, 17, 18, 19, 20], isChain: true }, // ← цепь-A (5, irregular)
	{ boss: 'enem4', indexAbilities: [21, 22, 23, 24], isChain: true }, // ← цепь-B (4, vertical)
	{ boss: 'enem4', indexAbilities: [13, 10] }, // нежданчик: тяжёлый взмах фонарём вместо привычного клубня
	{ boss: 'enem4', indexAbilities: [0, 2, 4, 8, 1, 3, 5, 9] }, // сигнатурная: хаотичный разброс на полной скорости

	// Пенодуй — FOAM_COLUMN, финальный облик
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [2, 3] },
	{ boss: 'enem5', indexAbilities: [6, 7] },
	{ boss: 'enem5', indexAbilities: [10, 11, 12] },
	{ boss: 'enem5', indexAbilities: [4, 5] },
	{ boss: 'enem5', indexAbilities: [0, 1, 4] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem5', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь (4)
	{ boss: 'enem5', indexAbilities: [20, 21, 22, 23, 24, 25], isChain: true }, // ← цепь (6)
	{ boss: 'enem5', indexAbilities: [13] }, // нежданчик: гейзер бьёт на полной скорости без нарастания
	{ boss: 'enem5', indexAbilities: [2, 6, 10, 3, 7, 11] }, // отголосок медлевого почерка предыдущих троих
	{ boss: 'enem5', indexAbilities: [0, 2, 4, 6, 8, 10, 1, 3, 5] }, // сигнатурная кульминация: столб пены поглощает почерк всего погреба разом
 ];

// Лорные названия связок временных улучшений — у каждого босса свой словарь
// образов конкретно ЕГО материала/повадки (раздел 12.1), полных совпадений
// фраз между боссами уровня нет (проверено программно).
const UPGRADE_VARIANT_NAMES = {
    // Крохобор — крыса: крошки, нора, хвост, шерсть, зубы, запасы.
    enem1: {
        variant1: 'Крысиный кураж', variant2: 'Хвостовая хватка', variant3: 'Клык-таран',
        variant4: 'Норный напор', variant5: 'Меткий укус', variant6: 'Бешеный писк',
        variant7: 'Крохоборский норов', variant8: 'Крепкая шерсть', variant9: 'Ударный клык',
        variant10: 'Живучий хвост', variant11: 'Колючие усы', variant12: 'Укус и в темноту',
        variant13: 'Толстая шкура', variant14: 'Неутомимый писк', variant15: 'Пружинистый прыжок',
        variant16: 'Острый нюх, зоркий глаз', variant17: 'Крысиная удача', variant18: 'Верный запас',
        variant19: 'Молниеносный укус', variant20: 'Крохоборский нюх', variant21: 'Цепкий коготь',
        variant22: 'Юркий для своего брюха', variant23: 'Крысиная стойкость', variant24: 'Долгая нора, зоркий глаз',
        variant25: 'Ускользающий укус', variant26: 'Дикий писк', variant27: 'Стойкая шерсть',
        variant28: 'Укус наповал', variant29: 'Крепкий крохобор', variant30: 'Норная мощь',
        variant31: 'Прыжок с оглядкой', variant32: 'Живучая шерсть', variant33: 'Юркий и запасливый',
        variant34: 'Крысиная прыть', variant35: 'Быстрый укус, крепкий хвост'
    },
    // Косохлёст — луковая косица: хлыст, перо, шелуха, слеза, горечь.
    enem2: {
        variant1: 'Хлёсткий кураж', variant2: 'Перьевая хватка', variant3: 'Хлыст-таран',
        variant4: 'Луковый напор', variant5: 'Меткий хлёст', variant6: 'Бешеный хлёст',
        variant7: 'Косохлёстский норов', variant8: 'Крепкая шелуха', variant9: 'Ударное перо',
        variant10: 'Живучая косица', variant11: 'Колючая шелуха', variant12: 'Хлёст и в темноту',
        variant13: 'Толстая шелуха', variant14: 'Неутомимый хлёст', variant15: 'Пружинистое перо',
        variant16: 'Острый хлыст, зоркий глаз', variant17: 'Луковая удача', variant18: 'Верный хлёст',
        variant19: 'Молниеносное перо', variant20: 'Горький нюх', variant21: 'Цепкая косица',
        variant22: 'Юркий, несмотря на перья', variant23: 'Луковая стойкость', variant24: 'Долгий хлёст, зоркий глаз',
        variant25: 'Ускользающее перо', variant26: 'Дикий хлёст', variant27: 'Стойкая шелуха',
        variant28: 'Хлёст наповал', variant29: 'Крепкий косохлёст', variant30: 'Слёзная мощь',
        variant31: 'Перо с оглядкой', variant32: 'Живучая шелуха', variant33: 'Юркий и хлёсткий',
        variant34: 'Луковая прыть', variant35: 'Быстрое перо, крепкий хлыст'
    },
    // Рассольник — кадка солений: рассол, дуб, обруч, огурец, соль, всплеск.
    enem3: {
        variant1: 'Рассольный кураж', variant2: 'Дубовая хватка', variant3: 'Обруч-таран',
        variant4: 'Солёный напор', variant5: 'Меткий всплеск', variant6: 'Бешеный всплеск',
        variant7: 'Рассольничий норов', variant8: 'Крепкий обруч', variant9: 'Ударный рассол',
        variant10: 'Живучий дуб', variant11: 'Колючий огурец', variant12: 'Всплеск и в темноту',
        variant13: 'Толстая кадка', variant14: 'Неутомимый всплеск', variant15: 'Пружинистый всплеск',
        variant16: 'Острая кислинка, зоркий глаз', variant17: 'Рассольная удача', variant18: 'Верный всплеск',
        variant19: 'Молниеносный всплеск', variant20: 'Солёный нюх', variant21: 'Цепкий обруч',
        variant22: 'Юркий, несмотря на вес', variant23: 'Дубовая стойкость', variant24: 'Долгое бурление, зоркий глаз',
        variant25: 'Ускользающий всплеск', variant26: 'Дикий всплеск', variant27: 'Стойкий обруч',
        variant28: 'Всплеск наповал', variant29: 'Крепкий рассольник', variant30: 'Кислая мощь',
        variant31: 'Всплеск с оглядкой', variant32: 'Живучий обруч', variant33: 'Юркий и солёный',
        variant34: 'Рассольная прыть', variant35: 'Быстрый всплеск, крепкий обруч'
    },
    // Клубнеглаз — картофельный дух: клубень, росток, мешковина, фонарь, земля.
    enem4: {
        variant1: 'Клубневый кураж', variant2: 'Ростковая хватка', variant3: 'Корень-таран',
        variant4: 'Земляной напор', variant5: 'Меткий бросок', variant6: 'Бешеный бросок',
        variant7: 'Клубнеглазый норов', variant8: 'Крепкая мешковина', variant9: 'Ударный клубень',
        variant10: 'Живучий росток', variant11: 'Колючая кожура', variant12: 'Бросок и в темноту',
        variant13: 'Толстая кожура', variant14: 'Неутомимый бросок', variant15: 'Пружинистый бросок',
        variant16: 'Острый глазок, зоркий свет', variant17: 'Земляная удача', variant18: 'Верный фонарь',
        variant19: 'Молниеносный бросок', variant20: 'Земляной нюх', variant21: 'Цепкий корешок',
        variant22: 'Юркий, несмотря на землю', variant23: 'Земляная стойкость', variant24: 'Долгий свет, зоркий глаз',
        variant25: 'Ускользающий бросок', variant26: 'Дикий бросок', variant27: 'Стойкая мешковина',
        variant28: 'Бросок наповал', variant29: 'Крепкий клубнеглаз', variant30: 'Земляная мощь',
        variant31: 'Бросок с оглядкой', variant32: 'Живучая кожура', variant33: 'Юркий и земляной',
        variant34: 'Клубневая прыть', variant35: 'Быстрый бросок, яркий фонарь'
    },
    // Пенодуй — квасная бочка: пена, хмель, обод, бочка, пузырь, брожение.
    enem5: {
        variant1: 'Пенный кураж', variant2: 'Хмельная хватка', variant3: 'Обод-таран',
        variant4: 'Квасной напор', variant5: 'Меткий пузырь', variant6: 'Бешеный пузырь',
        variant7: 'Пенодуйский норов', variant8: 'Крепкий обод', variant9: 'Ударная пена',
        variant10: 'Живучий хмель', variant11: 'Колючая пена', variant12: 'Пузырь и в темноту',
        variant13: 'Толстый обод', variant14: 'Неутомимый пузырь', variant15: 'Пружинистый пузырь',
        variant16: 'Острый хмель, зоркий глаз', variant17: 'Квасная удача', variant18: 'Верный пузырь',
        variant19: 'Молниеносный пузырь', variant20: 'Хмельной нюх', variant21: 'Цепкий обод',
        variant22: 'Юркий, несмотря на брюхо', variant23: 'Квасная стойкость', variant24: 'Долгое брожение, зоркий глаз',
        variant25: 'Ускользающий пузырь', variant26: 'Дикий пузырь', variant27: 'Стойкий обод',
        variant28: 'Пузырь наповал', variant29: 'Крепкий пенодуй', variant30: 'Хмельная мощь',
        variant31: 'Пузырь с оглядкой', variant32: 'Живучая бочка', variant33: 'Юркий и пенный',
        variant34: 'Квасная прыть', variant35: 'Быстрый пузырь, крепкий обод'
    }
};
