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
	attackChains: true,
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.757, damageMultiplier: 1.782, minWaveDelay: 4400, minShotDelay: 125, minTelegraphMs: 512,
	phases: [
		{ phase: 1, minHp: 0.678, cadence: 1.027, speed: 1.019, damage: 1, telegraphMultiplier: 1.026, surpriseChance: 0.093, maxActiveAttacks: 23 },
		{ phase: 2, minHp: 0.328, cadence: 0.775, speed: 1.147, damage: 1.12, telegraphMultiplier: 0.858, surpriseChance: 0.193, maxActiveAttacks: 27 },
		{ phase: 3, minHp: 0, cadence: 0.619, speed: 1.277, damage: 1.22, telegraphMultiplier: 0.758, surpriseChance: 0.293, maxActiveAttacks: 31 }
	],
	bosses: {
		enem1: { combatIdentity: "Крошки отвлекают от свободной лапы", combatTrick: "Крыса задерживает бросок, прижимая хлеб, затем бьёт свободной лапой. Крошка у края прикрыта левыми когтями; за коротким правым уколом остаётся левый ответ. Ошибка — охотиться только за крошкой и забыть о свободной лапе.", signatureEvery: 3, movementStyle: 'pause', cadence: 1.028, telegraphMs: 916, speedMultiplier: 1.038, damageMultiplier: 0.9, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem2: { combatIdentity: "Кончик листа догоняет первый хлыст", combatTrick: "Разгоняющиеся перья луковой косицы бьют парой, возвращаются в прежний проход и оставляют кончик с другой стороны. Ошибка — после первого хлыста перевести прицел на босса; добивает конец листа.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 1.003, telegraphMs: 856, speedMultiplier: 1.063, damageMultiplier: 1, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem3: { combatIdentity: "Всплеск оставляет тяжёлую каплю", combatTrick: "Рассол переливается через края кадки. Под медленной каплей идёт широкий веер солений; после его правого края приходится вернуться к левому всплеску. Ошибка — следить только за последним появившимся овощем.", signatureEvery: 3, movementStyle: 'wave', cadence: 0.983, telegraphMs: 1025, speedMultiplier: 1.043, damageMultiplier: 1.18, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem4: { combatIdentity: "Клубни выскакивают из прежнего следа", combatTrick: "Корневой сторож перебрасывает клубни между точками, возвращаясь к уже пройденному следу. Поздние броски повторяют левую россыпь за правым уколом. Ошибка — принять фонарь за начало размеренного дозора: корни бьют рывком.", signatureEvery: 3, movementStyle: 'lateRush', cadence: 0.963, telegraphMs: 806, speedMultiplier: 1.089, damageMultiplier: 1.05, speedVariance: [1, 1.0004, 1.0008, 1.0012, 1.0016] },
		enem5: { combatIdentity: "Короткий выброс перебивает длинный перелив", combatTrick: "Короткий плевок пены проходит левую пару, правое смыкание и быстрый ответ слева. Между такими выбросами идут длинные переливы; последняя серия разливается по левым точкам и замыкается справа дважды. Ошибка — ждать одинаково долгого подлёта после каждого бурления или уйти после первой шапки пены.", signatureEvery: 3, movementStyle: 'straight', cadence: 0.943, telegraphMs: 986, speedMultiplier: 1.079, damageMultiplier: 1.14, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] }
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
 let timeNextBoss = 18;
 const bossInterval = 12;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
 // speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Крохобор =====
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5.81 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.23 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.23 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.23 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.23 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.23 }, // 5 a
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5.81 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.23 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.23 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.23 }, // 9 b
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.23 }, // 10 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.23 }, // 11 b
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5.81 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.23 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.23 }, // 14 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.23 }, // 15 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.23 }, // 16 c
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.23 }, // 17 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.23 }, // 18 c
	{ boss: 'enem1', type: 'enem11', xPos: 89, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5.81 }, // 19 d
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.23 }, // 20 d
	{ boss: 'enem1', type: 'enem11', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.23 }, // 21 d
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.23 }, // 22 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.23 }, // 23 d
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.23 }, // 24 d
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.23 }, // 25 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.23 }, // 26 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.23 }, // 27 e
	{ boss: 'enem1', type: 'enem11', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.23 }, // 28 e
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.23 }, // 29 e
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.73 }, // 30 f
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.48 }, // 31 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.23 }, // 32 f
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.98 }, // 33 f
	{ boss: 'enem1', type: 'enem11', xPos: 92, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5.81 }, // 34 g
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.23 }, // 35 g
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.23 }, // 36 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.23 }, // 37 g
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.23 }, // 38 g
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.23 }, // 39 g
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.23 }, // 40 g
	{ boss: 'enem1', type: 'enem11', xPos: 88, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5.81 }, // 41 h
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.23 }, // 42 h
	{ boss: 'enem1', type: 'enem11', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.23 }, // 43 h
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.23 }, // 44 h
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.23 }, // 45 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.23 }, // 46 h
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.23 }, // 47 h
	{ boss: 'enem1', type: 'enem11', xPos: 93, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5.81 }, // 48 i
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.23 }, // 49 i
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.23 }, // 50 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.23 }, // 51 i
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.23 }, // 52 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.23 }, // 53 i
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.23 }, // 54 i
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.83 }, // 55 j
	{ boss: 'enem1', type: 'enem11', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.58 }, // 56 j
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.33 }, // 57 j
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.08 }, // 58 j
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.83 }, // 59 j
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.58 }, // 60 j

	// ===== Косохлёст =====
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5.83 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.37 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.37 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.37 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.37 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.37 }, // 5 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.37 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.37 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.37 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.37 }, // 9 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.37 }, // 10 b
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.37 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.37 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.37 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.37 }, // 14 c
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.37 }, // 15 c
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5.83 }, // 16 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.37 }, // 17 d
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.37 }, // 18 d
	{ boss: 'enem2', type: 'enem22', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.37 }, // 19 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.37 }, // 20 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.37 }, // 21 d
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5.83 }, // 22 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.37 }, // 23 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.37 }, // 24 e
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.37 }, // 25 e
	{ boss: 'enem2', type: 'enem22', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.37 }, // 26 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.37 }, // 27 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.83 }, // 28 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.58 }, // 29 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.33 }, // 30 f
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.08 }, // 31 f
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.83 }, // 32 f
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5.83 }, // 33 g
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.37 }, // 34 g
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.37 }, // 35 g
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.37 }, // 36 g
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.37 }, // 37 g
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.37 }, // 38 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.37 }, // 39 g
	{ boss: 'enem2', type: 'enem22', xPos: 14, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5.83 }, // 40 h
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.37 }, // 41 h
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.37 }, // 42 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.37 }, // 43 h
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.37 }, // 44 h
	{ boss: 'enem2', type: 'enem22', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.37 }, // 45 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.37 }, // 46 h
	{ boss: 'enem2', type: 'enem22', xPos: 91, yPos: 24, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5.83 }, // 47 i
	{ boss: 'enem2', type: 'enem22', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.37 }, // 48 i
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.37 }, // 49 i
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.37 }, // 50 i
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.37 }, // 51 i
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.37 }, // 52 i
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.37 }, // 53 i
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.93 }, // 54 j
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.68 }, // 55 j
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.43 }, // 56 j
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12.18 }, // 57 j
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.93 }, // 58 j
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.68 }, // 59 j
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11.43 }, // 60 j

	// ===== Рассольник =====
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.85, waveAmplitude: 2.19, waveFrequency: 1.29, wavePhase: 0 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.17, waveAmplitude: 3.29, waveFrequency: 1.79, wavePhase: 0.4 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.17, waveAmplitude: 4.19, waveFrequency: 2.29, wavePhase: 0.9 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.17, waveAmplitude: 2.19, waveFrequency: 1.29, wavePhase: 0 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.17, waveAmplitude: 3.29, waveFrequency: 1.79, wavePhase: 0.4 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.17, waveAmplitude: 4.19, waveFrequency: 2.29, wavePhase: 0.9 }, // 5 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.17, waveAmplitude: 2.19, waveFrequency: 1.29, wavePhase: 0 }, // 6 a
	{ boss: 'enem3', type: 'enem33', xPos: 12, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.85, waveAmplitude: 2.19, waveFrequency: 1.29, wavePhase: 0 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.17, waveAmplitude: 3.29, waveFrequency: 1.79, wavePhase: 0.4 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.17, waveAmplitude: 4.19, waveFrequency: 2.29, wavePhase: 0.9 }, // 9 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.17, waveAmplitude: 2.19, waveFrequency: 1.29, wavePhase: 0 }, // 10 b
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.17, waveAmplitude: 3.29, waveFrequency: 1.79, wavePhase: 0.4 }, // 11 b
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.17, waveAmplitude: 4.19, waveFrequency: 2.29, wavePhase: 0.9 }, // 12 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.17, waveAmplitude: 2.19, waveFrequency: 1.29, wavePhase: 0 }, // 13 b
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.85, waveAmplitude: 2.19, waveFrequency: 1.29, wavePhase: 0 }, // 14 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.17, waveAmplitude: 3.29, waveFrequency: 1.79, wavePhase: 0.4 }, // 15 c
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.17, waveAmplitude: 4.19, waveFrequency: 2.29, wavePhase: 0.9 }, // 16 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.17, waveAmplitude: 2.19, waveFrequency: 1.29, wavePhase: 0 }, // 17 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.17, waveAmplitude: 3.29, waveFrequency: 1.79, wavePhase: 0.4 }, // 18 c
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.17, waveAmplitude: 4.19, waveFrequency: 2.29, wavePhase: 0.9 }, // 19 c
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.17, waveAmplitude: 2.19, waveFrequency: 1.29, wavePhase: 0 }, // 20 c
	{ boss: 'enem3', type: 'enem33', xPos: 13, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.85, waveAmplitude: 2.19, waveFrequency: 1.29, wavePhase: 0 }, // 21 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.17, waveAmplitude: 3.29, waveFrequency: 1.79, wavePhase: 0.4 }, // 22 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.17, waveAmplitude: 4.19, waveFrequency: 2.29, wavePhase: 0.9 }, // 23 d
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.17, waveAmplitude: 2.19, waveFrequency: 1.29, wavePhase: 0 }, // 24 d
	{ boss: 'enem3', type: 'enem33', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.17, waveAmplitude: 3.29, waveFrequency: 1.79, wavePhase: 0.4 }, // 25 d
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.17, waveAmplitude: 4.19, waveFrequency: 2.29, wavePhase: 0.9 }, // 26 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.17, waveAmplitude: 2.19, waveFrequency: 1.29, wavePhase: 0 }, // 27 d
	{ boss: 'enem3', type: 'enem33', xPos: 89, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.85, waveAmplitude: 2.19, waveFrequency: 1.29, wavePhase: 0 }, // 28 e
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.17, waveAmplitude: 3.29, waveFrequency: 1.79, wavePhase: 0.4 }, // 29 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.17, waveAmplitude: 4.19, waveFrequency: 2.29, wavePhase: 0.9 }, // 30 e
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.17, waveAmplitude: 2.19, waveFrequency: 1.29, wavePhase: 0 }, // 31 e
	{ boss: 'enem3', type: 'enem33', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.17, waveAmplitude: 3.29, waveFrequency: 1.79, wavePhase: 0.4 }, // 32 e
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.17, waveAmplitude: 4.19, waveFrequency: 2.29, wavePhase: 0.9 }, // 33 e
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.17, waveAmplitude: 2.19, waveFrequency: 1.29, wavePhase: 0 }, // 34 e
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.87, waveAmplitude: 2.19, waveFrequency: 1.29, wavePhase: 0 }, // 35 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.62, waveAmplitude: 3.29, waveFrequency: 1.79, wavePhase: 0.4 }, // 36 f
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.37, waveAmplitude: 4.19, waveFrequency: 2.29, wavePhase: 0.9 }, // 37 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.12, waveAmplitude: 2.19, waveFrequency: 1.29, wavePhase: 0 }, // 38 f
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.87, waveAmplitude: 3.29, waveFrequency: 1.79, wavePhase: 0.4 }, // 39 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.62, waveAmplitude: 4.19, waveFrequency: 2.29, wavePhase: 0.9 }, // 40 f
	{ boss: 'enem3', type: 'enem33', xPos: 11, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.85, waveAmplitude: 2.19, waveFrequency: 1.29, wavePhase: 0 }, // 41 g
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.17, waveAmplitude: 3.29, waveFrequency: 1.79, wavePhase: 0.4 }, // 42 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.17, waveAmplitude: 4.19, waveFrequency: 2.29, wavePhase: 0.9 }, // 43 g
	{ boss: 'enem3', type: 'enem33', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.17, waveAmplitude: 2.19, waveFrequency: 1.29, wavePhase: 0 }, // 44 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.17, waveAmplitude: 3.29, waveFrequency: 1.79, wavePhase: 0.4 }, // 45 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.17, waveAmplitude: 4.19, waveFrequency: 2.29, wavePhase: 0.9 }, // 46 g
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.17, waveAmplitude: 2.19, waveFrequency: 1.29, wavePhase: 0 }, // 47 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.17, waveAmplitude: 3.29, waveFrequency: 1.79, wavePhase: 0.4 }, // 48 g
	{ boss: 'enem3', type: 'enem33', xPos: 92, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.85, waveAmplitude: 2.19, waveFrequency: 1.29, wavePhase: 0 }, // 49 h
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.17, waveAmplitude: 3.29, waveFrequency: 1.79, wavePhase: 0.4 }, // 50 h
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.17, waveAmplitude: 4.19, waveFrequency: 2.29, wavePhase: 0.9 }, // 51 h
	{ boss: 'enem3', type: 'enem33', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.17, waveAmplitude: 2.19, waveFrequency: 1.29, wavePhase: 0 }, // 52 h
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.17, waveAmplitude: 3.29, waveFrequency: 1.79, wavePhase: 0.4 }, // 53 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.17, waveAmplitude: 4.19, waveFrequency: 2.29, wavePhase: 0.9 }, // 54 h
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.17, waveAmplitude: 2.19, waveFrequency: 1.29, wavePhase: 0 }, // 55 h
	{ boss: 'enem3', type: 'enem33', xPos: 14, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5.85, waveAmplitude: 2.19, waveFrequency: 1.29, wavePhase: 0 }, // 56 i
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.17, waveAmplitude: 3.29, waveFrequency: 1.79, wavePhase: 0.4 }, // 57 i
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.17, waveAmplitude: 4.19, waveFrequency: 2.29, wavePhase: 0.9 }, // 58 i
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.17, waveAmplitude: 2.19, waveFrequency: 1.29, wavePhase: 0 }, // 59 i
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.17, waveAmplitude: 3.29, waveFrequency: 1.79, wavePhase: 0.4 }, // 60 i
	{ boss: 'enem3', type: 'enem33', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.17, waveAmplitude: 4.19, waveFrequency: 2.29, wavePhase: 0.9 }, // 61 i
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.17, waveAmplitude: 2.19, waveFrequency: 1.29, wavePhase: 0 }, // 62 i
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.17, waveAmplitude: 3.29, waveFrequency: 1.79, wavePhase: 0.4 }, // 63 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.77, waveAmplitude: 2.19, waveFrequency: 1.29, wavePhase: 0 }, // 64 j
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.52, waveAmplitude: 3.29, waveFrequency: 1.79, wavePhase: 0.4 }, // 65 j
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.27, waveAmplitude: 4.19, waveFrequency: 2.29, wavePhase: 0.9 }, // 66 j
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.02, waveAmplitude: 2.19, waveFrequency: 1.29, wavePhase: 0 }, // 67 j
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.77, waveAmplitude: 3.29, waveFrequency: 1.79, wavePhase: 0.4 }, // 68 j
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.52, waveAmplitude: 4.19, waveFrequency: 2.29, wavePhase: 0.9 }, // 69 j
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.27, waveAmplitude: 2.19, waveFrequency: 1.29, wavePhase: 0 }, // 70 j

	// ===== Клубнеглаз =====
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.43 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.43 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.43 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.43 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.43 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.43 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.43 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.43 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.43 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.43 }, // 9 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.43 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.43 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.43 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.43 }, // 13 c
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.43 }, // 14 c
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5.87 }, // 15 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.43 }, // 16 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.43 }, // 17 d
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.43 }, // 18 d
	{ boss: 'enem4', type: 'enem44', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.43 }, // 19 d
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.43 }, // 20 d
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5.87 }, // 21 e
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.43 }, // 22 e
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.43 }, // 23 e
	{ boss: 'enem4', type: 'enem44', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.43 }, // 24 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.43 }, // 25 e
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.43 }, // 26 e
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10.7 }, // 27 f
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10.66 }, // 28 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10.62 }, // 29 f
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10.58 }, // 30 f
	{ boss: 'enem4', type: 'enem44', xPos: 91, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5.87 }, // 31 g
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.43 }, // 32 g
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.43 }, // 33 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.43 }, // 34 g
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.43 }, // 35 g
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.43 }, // 36 g
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.43 }, // 37 g
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5.87 }, // 38 h
	{ boss: 'enem4', type: 'enem44', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.43 }, // 39 h
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.43 }, // 40 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.43 }, // 41 h
	{ boss: 'enem4', type: 'enem44', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.43 }, // 42 h
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.43 }, // 43 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.43 }, // 44 h
	{ boss: 'enem4', type: 'enem44', xPos: 89, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5.87 }, // 45 i
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.43 }, // 46 i
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.43 }, // 47 i
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.43 }, // 48 i
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.43 }, // 49 i
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.43 }, // 50 i
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.43 }, // 51 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10.7 }, // 52 j
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10.66 }, // 53 j
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10.62 }, // 54 j
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10.58 }, // 55 j
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10.54 }, // 56 j
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10.5 }, // 57 j

	// ===== Пенодуй =====
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.91 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.71 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.71 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.71 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.91 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5.89 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.71 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.71 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.71 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.71 }, // 9 b
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.71 }, // 10 b
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.71 }, // 11 b
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5.89 }, // 12 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.57 }, // 13 c
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.57 }, // 14 c
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.57 }, // 15 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.57 }, // 16 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.57 }, // 17 c
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.57 }, // 18 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.57 }, // 19 c
	{ boss: 'enem5', type: 'enem55', xPos: 91, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5.89 }, // 20 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.71 }, // 21 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.71 }, // 22 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.71 }, // 23 d
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.71 }, // 24 d
	{ boss: 'enem5', type: 'enem55', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.71 }, // 25 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.71 }, // 26 d
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5.89 }, // 27 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.57 }, // 28 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.57 }, // 29 e
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.57 }, // 30 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.57 }, // 31 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.57 }, // 32 e
	{ boss: 'enem5', type: 'enem55', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.57 }, // 33 e
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.57 }, // 34 e
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.41 }, // 35 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.16 }, // 36 f
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.91 }, // 37 f
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.66 }, // 38 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.41 }, // 39 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.16 }, // 40 f
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.91 }, // 41 f
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5.89 }, // 42 g
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.57 }, // 43 g
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.57 }, // 44 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.57 }, // 45 g
	{ boss: 'enem5', type: 'enem55', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.57 }, // 46 g
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.57 }, // 47 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.57 }, // 48 g
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.57 }, // 49 g
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5.89 }, // 50 h
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.57 }, // 51 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.57 }, // 52 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.57 }, // 53 h
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.57 }, // 54 h
	{ boss: 'enem5', type: 'enem55', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.57 }, // 55 h
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.57 }, // 56 h
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.57 }, // 57 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.57 }, // 58 h
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5.89 }, // 59 i
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.57 }, // 60 i
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.57 }, // 61 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.57 }, // 62 i
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.57 }, // 63 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.57 }, // 64 i
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.57 }, // 65 i
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.57 }, // 66 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.51 }, // 67 j
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.26 }, // 68 j
	{ boss: 'enem5', type: 'enem55', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.01 }, // 69 j
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.76 }, // 70 j
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.51 }, // 71 j
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.26 }, // 72 j
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.01 }, // 73 j

];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 171, bossDelayAbDop: 10800, firstWaveDelayMs: 2350 }, // Крошки отвлекают от свободной лапы
	{ boss: 'enem2', bossDelayAb: 181, bossDelayAbDop: 11000, firstWaveDelayMs: 2350 }, // Кончик листа догоняет первый хлыст
	{ boss: 'enem3', bossDelayAb: 152, bossDelayAbDop: 13400, firstWaveDelayMs: 2350 }, // Всплеск оставляет тяжёлую каплю
	{ boss: 'enem4', bossDelayAb: 179, bossDelayAbDop: 10001, firstWaveDelayMs: 2350 }, // Клубни выскакивают из прежнего следа
	{ boss: 'enem5', bossDelayAb: 156, bossDelayAbDop: 15000, firstWaveDelayMs: 2350 }, // Пена переливается поверх трёх проходов
];

 const bossAbilitiesDop = [
	// Крохобор
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [0, 300, 0, 300, 300], openingOrder: 0, label: "Лапа бьёт, хлеб прижат" },
	{ boss: 'enem1', indexAbilities: [6, 7, 8, 9, 10, 11], shotGapsMs: [0, 600, 600, 0, 0], label: "Крошка за свободной лапой" },
	{ boss: 'enem1', indexAbilities: [12, 13, 14, 15, 16, 17, 18], shotGapsMs: [0, 0, 0, 600, 0, 300], label: "Крыса толкает добычу к камню" },
	{ boss: 'enem1', indexAbilities: [19, 20, 21, 22, 23, 24], shotGapsMs: [300, 300, 0, 0, 300], label: "Крошка не отменяет левый захват" },
	{ boss: 'enem1', indexAbilities: [25, 26, 27, 28, 29], shotGapsMs: [300, 0, 0, 300], label: "Коготь возвращается к хлебу" },
	{ boss: 'enem1', indexAbilities: [30, 31, 32, 33], signature: true, isChain: true, shotDelayMs: 311, shotGapsMs: [0, 0, 0], openingOrder: 1, label: "Цепь украденной краюхи" },
	{ boss: 'enem1', indexAbilities: [34, 35, 36, 37, 38, 39, 40], minPhase: 2, shotGapsMs: [600, 0, 0, 0, 300, 0], label: "Крошки за тройным правым уколом" },
	{ boss: 'enem1', indexAbilities: [41, 42, 43, 44, 45, 46, 47], minPhase: 3, shotGapsMs: [600, 0, 300, 0, 0, 300], label: "Лапа прикрывает падающий хлеб" },
	{ boss: 'enem1', indexAbilities: [48, 49, 50, 51, 52, 53, 54], minPhase: 2, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Коготь после последней крошки" },
	{ boss: 'enem1', indexAbilities: [55, 56, 57, 58, 59, 60], signature: true, isChain: true, minPhase: 3, shotDelayMs: 311, shotGapsMs: [0, 0, 0, 0, 0], label: "Цепь побега с добычей" },

	// Косохлёст
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [600, 0, 350, 600, 300], openingOrder: 0, label: "Кончик правого листа возвращается" },
	{ boss: 'enem2', indexAbilities: [6, 7, 8, 9, 10], shotGapsMs: [0, 0, 300, 300], label: "Двойной хлыст и обратный кончик" },
	{ boss: 'enem2', indexAbilities: [11, 12, 13, 14, 15], shotGapsMs: [0, 0, 300, 0], label: "Левое перо хлещет повторно" },
	{ boss: 'enem2', indexAbilities: [16, 17, 18, 19, 20, 21], shotGapsMs: [0, 0, 300, 300, 0], label: "Сухое перо прячет обратный хлыст" },
	{ boss: 'enem2', indexAbilities: [22, 23, 24, 25, 26, 27], shotGapsMs: [600, 600, 0, 0, 600], label: "Кончик между двумя правыми хлыстами" },
	{ boss: 'enem2', indexAbilities: [28, 29, 30, 31, 32], signature: true, isChain: true, shotDelayMs: 311, shotGapsMs: [0, 0, 0, 0], openingOrder: 1, label: "Цепь трёх сухих перьев" },
	{ boss: 'enem2', indexAbilities: [33, 34, 35, 36, 37, 38, 39], minPhase: 2, shotGapsMs: [600, 0, 0, 300, 300, 300], label: "Лист распускается с новым концом" },
	{ boss: 'enem2', indexAbilities: [40, 41, 42, 43, 44, 45, 46], minPhase: 3, shotGapsMs: [300, 0, 0, 0, 0, 600], label: "Обратный кончик после левой пары" },
	{ boss: 'enem2', indexAbilities: [47, 48, 49, 50, 51, 52, 53], minPhase: 2, shotGapsMs: [600, 300, 600, 0, 0, 300], label: "Два листа расходятся и сходятся" },
	{ boss: 'enem2', indexAbilities: [54, 55, 56, 57, 58, 59, 60], signature: true, isChain: true, minPhase: 3, shotDelayMs: 311, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Цепь связанных луковых листьев" },

	// Рассольник
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5, 6], shotGapsMs: [0, 300, 0, 0, 300, 600], openingOrder: 0, label: "Веер рассола оставляет левую каплю" },
	{ boss: 'enem3', indexAbilities: [7, 8, 9, 10, 11, 12, 13], shotGapsMs: [0, 0, 0, 300, 300, 0], label: "Обратный перелив кадки" },
	{ boss: 'enem3', indexAbilities: [14, 15, 16, 17, 18, 19, 20], shotGapsMs: [300, 300, 0, 600, 300, 0], label: "Капля между двумя правыми брызгами" },
	{ boss: 'enem3', indexAbilities: [21, 22, 23, 24, 25, 26, 27], shotGapsMs: [0, 300, 0, 300, 300, 600], label: "Тройной всплеск через край" },
	{ boss: 'enem3', indexAbilities: [28, 29, 30, 31, 32, 33, 34], shotGapsMs: [300, 300, 600, 0, 300, 0], label: "Рассол возвращается к кадке" },
	{ boss: 'enem3', indexAbilities: [35, 36, 37, 38, 39, 40], signature: true, isChain: true, shotDelayMs: 311, shotGapsMs: [0, 0, 0, 0, 0], openingOrder: 1, label: "Цепь разлетающихся солений" },
	{ boss: 'enem3', indexAbilities: [41, 42, 43, 44, 45, 46, 47, 48], minPhase: 2, shotGapsMs: [600, 0, 300, 300, 300, 300, 300], label: "Второй веер из-под капли" },
	{ boss: 'enem3', indexAbilities: [49, 50, 51, 52, 53, 54, 55], minPhase: 3, shotGapsMs: [300, 300, 300, 300, 600, 0], label: "Рассольный веер не заканчивается слева" },
	{ boss: 'enem3', indexAbilities: [56, 57, 58, 59, 60, 61, 62, 63], minPhase: 2, shotGapsMs: [600, 0, 600, 0, 0, 0, 300], label: "Тяжёлая капля после широкого веера" },
	{ boss: 'enem3', indexAbilities: [64, 65, 66, 67, 68, 69, 70], signature: true, isChain: true, minPhase: 3, shotDelayMs: 311, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Цепь трёх правых переливов" },

	// Клубнеглаз
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 0, 0, 300], openingOrder: 0, label: "Клубень возвращается в прежний след" },
	{ boss: 'enem4', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [0, 0, 0, 300], label: "Корни выбрасывают клубни назад" },
	{ boss: 'enem4', indexAbilities: [10, 11, 12, 13, 14], shotGapsMs: [0, 0, 0, 0], label: "Россыпь перебегает между следами" },
	{ boss: 'enem4', indexAbilities: [15, 16, 17, 18, 19, 20], shotGapsMs: [300, 0, 0, 0, 0], label: "Клубень под двойным правым броском" },
	{ boss: 'enem4', indexAbilities: [21, 22, 23, 24, 25, 26], shotGapsMs: [600, 0, 0, 600, 0], label: "Корень замыкает правую россыпь" },
	{ boss: 'enem4', indexAbilities: [27, 28, 29, 30], signature: true, isChain: true, shotDelayMs: 311, openingOrder: 1, label: "Цепь клубней из корневого следа" },
	{ boss: 'enem4', indexAbilities: [31, 32, 33, 34, 35, 36, 37], minPhase: 2, shotGapsMs: [600, 300, 300, 300, 0, 0], label: "Клубни повторяют левый след" },
	{ boss: 'enem4', indexAbilities: [38, 39, 40, 41, 42, 43, 44], minPhase: 3, shotGapsMs: [0, 0, 300, 300, 300, 300], label: "Россыпь остаётся за фонарём" },
	{ boss: 'enem4', indexAbilities: [45, 46, 47, 48, 49, 50, 51], minPhase: 2, shotGapsMs: [300, 0, 0, 0, 0, 0], label: "Последний клубень из старого следа" },
	{ boss: 'enem4', indexAbilities: [52, 53, 54, 55, 56, 57], signature: true, isChain: true, minPhase: 3, shotDelayMs: 311, label: "Цепь клубней с двойным возвратом" },

	// Пенодуй
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 0, 0, 0], openingOrder: 0, label: "Короткий плевок пены возвращается влево" },
	{ boss: 'enem5', indexAbilities: [5, 6, 7, 8, 9, 10, 11], shotGapsMs: [600, 300, 300, 300, 300, 300], label: "Пена смыкается за левым переливом" },
	{ boss: 'enem5', indexAbilities: [12, 13, 14, 15, 16, 17, 18, 19], shotGapsMs: [300, 0, 300, 300, 300, 0, 0], label: "Шапка пены закрывает обратный проход" },
	{ boss: 'enem5', indexAbilities: [20, 21, 22, 23, 24, 25, 26], shotGapsMs: [600, 0, 0, 600, 0, 300], label: "Пена прикрывает двойную левую каплю" },
	{ boss: 'enem5', indexAbilities: [27, 28, 29, 30, 31, 32, 33, 34], shotGapsMs: [0, 0, 0, 0, 0, 600, 0], label: "Два правых столба и левый перелив" },
	{ boss: 'enem5', indexAbilities: [35, 36, 37, 38, 39, 40, 41], signature: true, isChain: true, shotDelayMs: 311, shotGapsMs: [0, 0, 0, 0, 0, 0], openingOrder: 1, label: "Цепь переливов квасной пены" },
	{ boss: 'enem5', indexAbilities: [42, 43, 44, 45, 46, 47, 48, 49], minPhase: 2, shotGapsMs: [600, 600, 0, 0, 0, 300, 0], label: "Второй столб из-за левого края" },
	{ boss: 'enem5', indexAbilities: [50, 51, 52, 53, 54, 55, 56, 57, 58], minPhase: 3, shotGapsMs: [300, 0, 0, 0, 0, 0, 0, 300], label: "Девять капель последнего фонтана" },
	{ boss: 'enem5', indexAbilities: [59, 60, 61, 62, 63, 64, 65, 66], minPhase: 2, shotGapsMs: [0, 300, 300, 0, 300, 300, 300], label: "Пена переваливает через крышку снова" },
	{ boss: 'enem5', indexAbilities: [67, 68, 69, 70, 71, 72, 73], signature: true, isChain: true, minPhase: 3, shotDelayMs: 311, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Цепь обратного пенного столба" },

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
