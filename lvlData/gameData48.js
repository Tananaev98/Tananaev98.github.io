// Уровень 48 «Колодец» — восьмой уровень области V, обычный (пять разных
// монстров, как 41-44/46-47).
//
// ДВОЙНАЯ ПРОВЕРКА УНИКАЛЬНОСТИ (раздел 1.2) — ШАГ 1 выполнен 2026-09-06 по
// admin-boss-pattern-panel.html, 235 строк, уровни 1-47, обе таблицы
// распределения плюс колонка «Архетип» по всем пяти ролям целиком.
//
// АРТ (images/enemies/regions/5_dom_dvor/lvl48/) — все 5 картинок открыты и
// сверены лично:
// 1.webp — жаба цепляется присосками лап за мокрое бревно сруба, одна
//   лапа держит обломок бревна как оружие. Архетип — атаки идут из
//   нескольких ПОВТОРЯЮЩИХСЯ фиксированных точек-«прилипаний», изредка
//   один большой прыжок в новую точку (роль enem1, знакомство) — сверено:
//   STICKY_CLING новый, ни один архетип enem1 не завязан на повторяющиеся
//   фиксированные точки хвата.
// 2.webp — существо из плетёной цепи с замком вместо лица, четыре
//   независимых цепких конечности с крюками-когтями. Архетип — атаки
//   вращаются по ЧЕТЫРЁМ точкам (не только двум флангам), быстро и без
//   явного порядка (роль enem2, быстрые серии) — сверено: FOUR_LIMB_LASH
//   новый, отличен от всех парных L/R и угловых архетипов enem2 до этого.
// 3.webp — окованное ведро, чья дужка переходит в длинную мокрую цепь с
//   крюком-остриём на конце — сама цепь и есть оружие дальнего хлёста.
//   Архетип — редкий, но очень ДАЛЬНИЙ одиночный хлёст цепи от ведра к
//   герою, с заметным дребезжанием-телеграфом (роль enem3, тяжёлые редкие)
//   — сверено: CHAIN_WHIP_REACH новый, отличен от Рассольника (46,
//   FOUNTAIN_ARC — веерный всплеск) и Зерномёта (47, SCOOP_FAN — веерный
//   залп): здесь это НАПРАВЛЕННЫЙ ОДИНОЧНЫЙ хлыст на большую дистанцию, не
//   веер и не залп.
// 4.webp — усатый водонос с коромыслом, два ведра по бокам, вода льётся
//   симметрично из обеих сторон уса. Архетип — рычаг коромысла жёстко
//   связывает оба ведра: они бьют строго поочерёдно, но на непривычно
//   тугом, нервном темпе, как метроном на панике (роль enem4, нервный) —
//   сверено: YOKE_SEESAW новый, отличен от всех архетипов «асимметрия»/
//   «зигзаг»/«хаотичный разброс» уже занятых enem4 (Бренчиха/Скалкина/
//   Пыхтун/Обугленный/Клубнеглаз/Бирюк) — здесь нервность в ТЕМПЕ строго
//   симметричного чередования, а не в геометрии.
// 5.webp — седой колодезный мастер: в одной руке багор (дальний точный
//   крюк), в другой — смотанный канат (широкий боковой захлёст). Архетип —
//   чередование точного дальнего укола багром и широкого бокового
//   захлёста канатом, тестирует и точность (Плескун), и ритм (Усоструй) по-
//   новому — не повторяя приём «собрать почерк всех четверых» Черпака (43)
//   или Пенодуя (46)/Урожаища (47), а предлагая собственную пару
//   инструментов (роль enem5, финал) — сверено: HOOK_AND_ROPE новый.
//
// ДВИЖЕНИЕ (movementStyle) — сверено с полным распределением 1-47 (все роли
// ≤29% до этого уровня): Жабоскок — pause (цепляется и замирает, потом
// прыжок) 15%→16.7%; Кандальник — weave (извивающаяся цепь) 17%→18.75%;
// Плескун — lateRush (задержка перед дальним хлыстом, потом рывок) 13%→14.6%;
// Усоструй — accelerate (нервный темп нарастает) 13%→14.6%; Багорыч —
// straight (прямой решительный подход мастера) 15%→16.7%.
//
// ЦЕПИ (13.6/13.7) — форма выбрана ИЗ образа и сверена с полным
// распределением: Жабоскок — arc(3)+irregular(5): прыжок по дуге, затем
// разбросанные точки хвата (у enem1 обе были по 14% — не усугубляют
// раздутый vertical 43%, доля падает до 37.5%); Кандальник —
// irregular(5)+zigzag(4): хаотичный вихрь четырёх конечностей, затем
// быстрый зигзаг звеньев (у enem2 irregular было 14% — самое низкое,
// zigzag 21% — среднее, обе доли после добавления ~19-25%, ничего не
// перекошено); Плескун — zigzag(4)+vertical(4): цепь мотается зигзагом
// перед броском, затем прямой вертикальный хлыст вниз колодца (у enem3
// zigzag было 7% — самое низкое, vertical 14% — тоже низкое, не усугубляют
// раздутый diagonal 43%, доля падает до 37.5%); Усоструй —
// vertical(4)+irregular(5): оба ведра бьют по одной вертикали, второй заход
// — нервный сбой ритма (у enem4 vertical и irregular были по 14% — самые
// низкие, что ЧИНИТ уже пограничный zigzag 29%, доля падает до 25%);
// Багорыч — zigzag(4)+irregular(5): багор дёргается зигзагом, канат метёт
// хаотичной дугой (у enem5 zigzag и irregular были по 14% — самые низкие,
// что ЧИНИТ уже пограничный diagonal 29%, доля падает до 25%).
//
// БОЕВЫЕ ТЕКСТЫ (appearMessage/phaseMessages) — НЕ используются на этом
// уровне (правка 2026-09-06): раздел 12 в этой части касается только
// персонажей-в-пяти-обликах, а не обычных уровней с пятью разными
// монстрами.
let lvlNumber = 48;

const bossCombatConfig = {
	attackChains: true,
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.775, damageMultiplier: 1.782, minWaveDelay: 4100, minShotDelay: 123, minTelegraphMs: 517,
	phases: [
		{ phase: 1, minHp: 0.682, cadence: 0.976, speed: 1.037, damage: 1, telegraphMultiplier: 1.028, surpriseChance: 0.099, maxActiveAttacks: 25 },
		{ phase: 2, minHp: 0.332, cadence: 0.785, speed: 1.163, damage: 1.12, telegraphMultiplier: 0.863, surpriseChance: 0.199, maxActiveAttacks: 29 },
		{ phase: 3, minHp: 0, cadence: 0.623, speed: 1.267, damage: 1.22, telegraphMultiplier: 0.763, surpriseChance: 0.299, maxActiveAttacks: 33 }
	],
	bosses: {
		enem1: { combatIdentity: "Прыжок возвращается к прежней присоске", combatTrick: "Жаба замирает у знакомых точек сруба и возвращается туда после большого прыжка. Прикрытая капля не завершает движение. Ошибка — оставить прежнюю точку хвата после первого прыжка или ударить жабу во время её зависания.", signatureEvery: 3, movementStyle: 'pause', cadence: 1.012, telegraphMs: 920, speedMultiplier: 1.081, damageMultiplier: 0.9, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem2: { combatIdentity: "Замок держит четыре зоны хлёста", combatTrick: "Звенья извиваются между двумя левыми точками, правой серединой и дальним правым краем. Долгое правое звено не обязательно прилетает первым, хотя появляется раньше. Ошибка — следить только за двумя краями или отвечать по порядку появления.", signatureEvery: 3, movementStyle: 'weave', cadence: 1.004, telegraphMs: 852, speedMultiplier: 1.043, damageMultiplier: 1, speedVariance: [1, 1.0004, 1.0008, 1.0012, 1.0016] },
		enem3: { combatIdentity: "Дальний хлёст проходит за ободом", combatTrick: "Дребезжание ведра предупреждает дальний хлёст мокрой цепи. Петля проходит широкий край и возвращается к уже пройденной стороне. Ошибка — считать цепь безопасной до рывка или закончить защиту после первого края петли.", signatureEvery: 3, movementStyle: 'lateRush', cadence: 0.802, telegraphMs: 1049, speedMultiplier: 0.993, damageMultiplier: 1.18, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem4: { combatIdentity: "Коромысло требует держать качание", combatTrick: "Два ведра отвечают поочерёдно. Скорость бросков нарастает, но перевод прицела остаётся мерным; вода с коромысла не заменяет очередной удар ведра. Ошибка — ускорить собственное чередование раньше времени или уйти после капли, пока второе ведро ещё идёт.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 0.962, telegraphMs: 789, speedMultiplier: 1.073, damageMultiplier: 1.05, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem5: { combatIdentity: "Багор вклинивается в долгий канат", combatTrick: "Точный укол багром приходит раньше ещё летящего захлёста каната. Затем канат заставляет вернуться к пройденной стороне. Ошибка — всегда отбивать по очереди появления или уходить бить мастера после быстрого укола, пока захлёст не завершился.", signatureEvery: 3, movementStyle: 'straight', cadence: 0.939, telegraphMs: 976, speedMultiplier: 1.096, damageMultiplier: 1.14, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] }
	}
};

const ENEMY_TYPES = {

	enem11: { name: 'enem11', image: 'images/enemies/regions/5_dom_dvor/lvl48/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { name: 'enem22', image: 'images/enemies/regions/5_dom_dvor/lvl48/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { name: 'enem33', image: 'images/enemies/regions/5_dom_dvor/lvl48/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { name: 'enem44', image: 'images/enemies/regions/5_dom_dvor/lvl48/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { name: 'enem55', image: 'images/enemies/regions/5_dom_dvor/lvl48/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
        name: 'enem1',
		dispName: 'Жабоскок',
        image: 'images/enemies/regions/5_dom_dvor/lvl48/1.webp',
        baseHP: 12137,
        baseSpeed: 0,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 250,
        size: '22%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem2: {
        name: 'enem2',
		dispName: 'Кандальник',
        image: 'images/enemies/regions/5_dom_dvor/lvl48/2.webp',
        baseHP: 30340,
        baseSpeed: 0,
        baseDamage: 22,
        spawnWeight: 15,
		baseExp: 400,
        size: '24%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem3: {
        name: 'enem3',
		dispName: 'Плескун',
        image: 'images/enemies/regions/5_dom_dvor/lvl48/3.webp',
        baseHP: 53661,
        baseSpeed: 0,
        baseDamage: 24,
        spawnWeight: 20,
		baseExp: 600,
        size: '24%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem4: {
        name: 'enem4',
		dispName: 'Усоструй',
        image: 'images/enemies/regions/5_dom_dvor/lvl48/4.webp',
        baseHP: 86307,
        baseSpeed: 0,
        baseDamage: 26,
        spawnWeight: 10,
		baseExp: 800,
        size: '24%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem5: {
        name: 'enem5',
		dispName: 'Багорыч',
        image: 'images/enemies/regions/5_dom_dvor/lvl48/5.webp',
        baseHP: 130717,
        baseSpeed: 0,
        baseDamage: 28,
        spawnWeight: 5,
		baseExp: 0,
        size: '26%',
        deathAnimation: { preset: 'default', durationMs: 1000 }
    },


};

 let bossM = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
 let timeNextBoss = 20;
 const bossInterval = 14;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
 // speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Жабоскок =====
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.47 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.47 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22.17 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.47 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.47 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.87 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.17 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.87 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14.47 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.03 }, // 9 c
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.47 }, // 10 c
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.47 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22.17 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.47 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.47 }, // 14 c
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.03 }, // 15 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22.17 }, // 16 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.47 }, // 17 d
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.47 }, // 18 d
	{ boss: 'enem1', type: 'enem11', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.47 }, // 19 d
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22.17 }, // 20 d
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.03 }, // 21 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.47 }, // 22 e
	{ boss: 'enem1', type: 'enem11', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.47 }, // 23 e
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22.17 }, // 24 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.47 }, // 25 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.47 }, // 26 e
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.57 }, // 27 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.32 }, // 28 f
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.07 }, // 29 f
	{ boss: 'enem1', type: 'enem11', xPos: 13, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.03 }, // 30 g
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.47 }, // 31 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.47 }, // 32 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22.17 }, // 33 g
	{ boss: 'enem1', type: 'enem11', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.47 }, // 34 g
	{ boss: 'enem1', type: 'enem11', xPos: 5, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.47 }, // 35 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22.17 }, // 36 g
	{ boss: 'enem1', type: 'enem11', xPos: 89, yPos: 29, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.03 }, // 37 h
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.47 }, // 38 h
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.47 }, // 39 h
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22.17 }, // 40 h
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 21.47 }, // 41 h
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20.47 }, // 42 h
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22.17 }, // 43 h
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.67 }, // 44 i
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.42 }, // 45 i
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.17 }, // 46 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.92 }, // 47 i
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.67 }, // 48 i

	// ===== Кандальник =====
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.23 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.23 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.73 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.23 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.73 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 21, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.97 }, // 5 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.23 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.73 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.23 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.23 }, // 9 b
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.23 }, // 10 c
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.23 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.73 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.23 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.23 }, // 14 d
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.23 }, // 15 d
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.73 }, // 16 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.23 }, // 17 d
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.73 }, // 18 d
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.23 }, // 19 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.23 }, // 20 e
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.73 }, // 21 e
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.23 }, // 22 e
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.73 }, // 23 e
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.8 }, // 24 f
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.76 }, // 25 f
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.72 }, // 26 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.68 }, // 27 f
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.64 }, // 28 f
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.6 }, // 29 f
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13.23 }, // 30 g
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.23 }, // 31 g
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.73 }, // 32 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.23 }, // 33 g
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.73 }, // 34 g
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.23 }, // 35 g
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 19, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7.97 }, // 36 h
	{ boss: 'enem2', type: 'enem22', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.23 }, // 37 h
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 21.73 }, // 38 h
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22.23 }, // 39 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.23 }, // 40 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.23 }, // 41 h
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.8 }, // 42 i
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.76 }, // 43 i
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.72 }, // 44 i
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.68 }, // 45 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.64 }, // 46 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.6 }, // 47 i
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.56 }, // 48 i

	// ===== Плескун =====
	{ boss: 'enem3', type: 'enem33', xPos: 78, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.67 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.17 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.67 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.17 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.17 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.67 }, // 5 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.17 }, // 6 a
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.67 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.17 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.17 }, // 9 b
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.67 }, // 10 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.17 }, // 11 b
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.67 }, // 12 b
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.67 }, // 13 b
	{ boss: 'enem3', type: 'enem33', xPos: 78, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.67 }, // 14 c
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.17 }, // 15 c
	{ boss: 'enem3', type: 'enem33', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.17 }, // 16 c
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.67 }, // 17 c
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.67 }, // 18 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.17 }, // 19 c
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.17 }, // 20 c
	{ boss: 'enem3', type: 'enem33', xPos: 18, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.67 }, // 21 d
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.17 }, // 22 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.67 }, // 23 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.17 }, // 24 d
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.67 }, // 25 d
	{ boss: 'enem3', type: 'enem33', xPos: 19, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.17 }, // 26 d
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.67 }, // 27 d
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.67 }, // 28 e
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.17 }, // 29 e
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.67 }, // 30 e
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.17 }, // 31 e
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.67 }, // 32 e
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.67 }, // 33 e
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.17 }, // 34 e
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.63 }, // 35 f
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.38 }, // 36 f
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.13 }, // 37 f
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.88 }, // 38 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.63 }, // 39 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.38 }, // 40 f
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.17 }, // 41 g
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.67 }, // 42 g
	{ boss: 'enem3', type: 'enem33', xPos: 91, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.17 }, // 43 g
	{ boss: 'enem3', type: 'enem33', xPos: 81, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.67 }, // 44 g
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.17 }, // 45 g
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.67 }, // 46 g
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.17 }, // 47 g
	{ boss: 'enem3', type: 'enem33', xPos: 89, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.67 }, // 48 g
	{ boss: 'enem3', type: 'enem33', xPos: 78, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.17 }, // 49 h
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.67 }, // 50 h
	{ boss: 'enem3', type: 'enem33', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.17 }, // 51 h
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.67 }, // 52 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.17 }, // 53 h
	{ boss: 'enem3', type: 'enem33', xPos: 86, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 13.67 }, // 54 h
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.67 }, // 55 h
	{ boss: 'enem3', type: 'enem33', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.17 }, // 56 h
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.73 }, // 57 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.48 }, // 58 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.23 }, // 59 i
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.98 }, // 60 i
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.73 }, // 61 i
	{ boss: 'enem3', type: 'enem33', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.48 }, // 62 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.23 }, // 63 i

	// ===== Усоструй =====
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14.47 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16.47 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.47 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.47 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.47 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15.47 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 17.47 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.47 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.47 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14.47 }, // 9 c
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16.47 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.47 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.47 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.47 }, // 13 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6.13 }, // 14 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15.47 }, // 15 d
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16.47 }, // 16 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.47 }, // 17 d
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.47 }, // 18 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.47 }, // 19 d
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 18, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6.13 }, // 20 e
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15.47 }, // 21 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16.47 }, // 22 e
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.47 }, // 23 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.47 }, // 24 e
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.47 }, // 25 e
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.49 }, // 26 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.24 }, // 27 f
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.99 }, // 28 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.74 }, // 29 f
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 15, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6.13 }, // 30 g
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14.47 }, // 31 g
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15.47 }, // 32 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 17.47 }, // 33 g
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19.47 }, // 34 g
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.47 }, // 35 g
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.07 }, // 36 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 15, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6.13 }, // 37 h
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13.47 }, // 38 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14.47 }, // 39 h
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 16.47 }, // 40 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18.47 }, // 41 h
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.47 }, // 42 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22.07 }, // 43 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.59 }, // 44 i
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.34 }, // 45 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.09 }, // 46 i
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.84 }, // 47 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.59 }, // 48 i
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.34 }, // 49 i

	// ===== Багорыч =====
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.31 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 19.31 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.31 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.31 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.81 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.17 }, // 5 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.77 }, // 6 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.77 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.77 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.77 }, // 9 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.77 }, // 10 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.77 }, // 11 b
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.17 }, // 12 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.77 }, // 13 c
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.77 }, // 14 c
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.77 }, // 15 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.77 }, // 16 c
	{ boss: 'enem5', type: 'enem55', xPos: 16, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.77 }, // 17 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.77 }, // 18 c
	{ boss: 'enem5', type: 'enem55', xPos: 91, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.17 }, // 19 d
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.77 }, // 20 d
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.77 }, // 21 d
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.77 }, // 22 d
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.07 }, // 23 d
	{ boss: 'enem5', type: 'enem55', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.07 }, // 24 d
	{ boss: 'enem5', type: 'enem55', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.77 }, // 25 d
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.17 }, // 26 e
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.77 }, // 27 e
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.77 }, // 28 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.07 }, // 29 e
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.77 }, // 30 e
	{ boss: 'enem5', type: 'enem55', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.77 }, // 31 e
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.27 }, // 32 e
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.47 }, // 33 f
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.22 }, // 34 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.97 }, // 35 f
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.72 }, // 36 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.47 }, // 37 f
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.22 }, // 38 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.97 }, // 39 f
	{ boss: 'enem5', type: 'enem55', xPos: 89, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.17 }, // 40 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.77 }, // 41 g
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.77 }, // 42 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.77 }, // 43 g
	{ boss: 'enem5', type: 'enem55', xPos: 17, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.77 }, // 44 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.77 }, // 45 g
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.27 }, // 46 g
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.17 }, // 47 h
	{ boss: 'enem5', type: 'enem55', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.77 }, // 48 h
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.77 }, // 49 h
	{ boss: 'enem5', type: 'enem55', xPos: 68, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.77 }, // 50 h
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13.77 }, // 51 h
	{ boss: 'enem5', type: 'enem55', xPos: 68, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.77 }, // 52 h
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14.27 }, // 53 h
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.57 }, // 54 i
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.32 }, // 55 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.07 }, // 56 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.82 }, // 57 i
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.57 }, // 58 i
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.32 }, // 59 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.07 }, // 60 i

];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 173, bossDelayAbDop: 10801, firstWaveDelayMs: 2430 }, // Прыжок возвращается к прежней присоске
	{ boss: 'enem2', bossDelayAb: 174, bossDelayAbDop: 10400, firstWaveDelayMs: 2430 }, // Замок держит четыре зоны хлёста
	{ boss: 'enem3', bossDelayAb: 171, bossDelayAbDop: 14700, firstWaveDelayMs: 2430 }, // Дальний хлёст проходит за ободом
	{ boss: 'enem4', bossDelayAb: 180, bossDelayAbDop: 9500, firstWaveDelayMs: 2430 }, // Коромысло требует держать качание
	{ boss: 'enem5', bossDelayAb: 152, bossDelayAbDop: 13400, firstWaveDelayMs: 2430 }, // Багор вклинивается в долгий канат
];

 const bossAbilitiesDop = [
	// Жабоскок
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 0, 0, 0], openingOrder: 0, label: "Возврат к старой присоске" },
	{ boss: 'enem1', indexAbilities: [5, 6, 7, 8], shotGapsMs: [0, 0, 0], label: "Большой прыжок со сруба" },
	{ boss: 'enem1', indexAbilities: [9, 10, 11, 12, 13, 14], shotGapsMs: [300, 300, 0, 300, 300], label: "Капля зацепилась за прежний хват" },
	{ boss: 'enem1', indexAbilities: [15, 16, 17, 18, 19, 20], shotGapsMs: [0, 0, 0, 0, 300], label: "Жаба тянется к правому хвату" },
	{ boss: 'enem1', indexAbilities: [21, 22, 23, 24, 25, 26], shotGapsMs: [300, 0, 0, 0, 0], label: "Прыжок оставляет правый ответ" },
	{ boss: 'enem1', indexAbilities: [27, 28, 29], signature: true, isChain: true, shotDelayMs: 313, shotGapsMs: [0, 0], openingOrder: 1, label: "Цепь большого прыжка" },
	{ boss: 'enem1', indexAbilities: [30, 31, 32, 33, 34, 35, 36], minPhase: 2, shotGapsMs: [0, 0, 0, 0, 300, 600], label: "Старая присоска держит после прыжка" },
	{ boss: 'enem1', indexAbilities: [37, 38, 39, 40, 41, 42, 43], minPhase: 3, shotGapsMs: [600, 0, 600, 0, 0, 600], label: "Жаба снова меняет опору" },
	{ boss: 'enem1', indexAbilities: [44, 45, 46, 47, 48], signature: true, isChain: true, minPhase: 3, shotDelayMs: 313, shotGapsMs: [0, 0, 0, 0], label: "Цепь возврата к мокрому бревну" },

	// Кандальник
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [300, 0, 0, 600], openingOrder: 0, label: "Четыре зоны мокрого замка" },
	{ boss: 'enem2', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [0, 0, 0, 400], label: "Правое звено ждёт левого хлёста" },
	{ boss: 'enem2', indexAbilities: [10, 11, 12, 13], shotGapsMs: [300, 0, 0], label: "Короткий обход четырёх зон" },
	{ boss: 'enem2', indexAbilities: [14, 15, 16, 17, 18], shotGapsMs: [300, 0, 0, 600], label: "Дальний правый крюк после паузы" },
	{ boss: 'enem2', indexAbilities: [19, 20, 21, 22, 23], shotGapsMs: [0, 600, 0, 0], label: "Левый крюк за правым звеном" },
	{ boss: 'enem2', indexAbilities: [24, 25, 26, 27, 28, 29], signature: true, isChain: true, shotDelayMs: 313, openingOrder: 1, label: "Цепь четырёх цепких концов" },
	{ boss: 'enem2', indexAbilities: [30, 31, 32, 33, 34, 35], minPhase: 2, shotGapsMs: [0, 0, 0, 0, 480], label: "Обход возвращает дальний замок" },
	{ boss: 'enem2', indexAbilities: [36, 37, 38, 39, 40, 41], minPhase: 3, shotGapsMs: [600, 400, 0, 200, 400], label: "Четвёртая зона не отпускает" },
	{ boss: 'enem2', indexAbilities: [42, 43, 44, 45, 46, 47, 48], signature: true, isChain: true, minPhase: 3, shotDelayMs: 313, label: "Цепь возвращающегося замка" },

	// Плескун
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5, 6], shotGapsMs: [0, 0, 0, 0, 300, 0], openingOrder: 0, label: "Хлёст обходит обод ведра" },
	{ boss: 'enem3', indexAbilities: [7, 8, 9, 10, 11, 12, 13], shotGapsMs: [300, 0, 0, 0, 0, 0], label: "Обратная петля мокрой цепи" },
	{ boss: 'enem3', indexAbilities: [14, 15, 16, 17, 18, 19, 20], shotGapsMs: [300, 0, 0, 0, 0, 300], label: "Цепь возвращается через обод" },
	{ boss: 'enem3', indexAbilities: [21, 22, 23, 24, 25, 26, 27], shotGapsMs: [300, 0, 0, 0, 0, 0], label: "Хлёст после дальнего возврата" },
	{ boss: 'enem3', indexAbilities: [28, 29, 30, 31, 32, 33, 34], shotGapsMs: [0, 0, 0, 300, 300, 300], label: "Обод оставляет левый кончик" },
	{ boss: 'enem3', indexAbilities: [35, 36, 37, 38, 39, 40], signature: true, isChain: true, shotDelayMs: 313, shotGapsMs: [0, 0, 0, 0, 0], openingOrder: 1, label: "Цепь полного хлёста ведра" },
	{ boss: 'enem3', indexAbilities: [41, 42, 43, 44, 45, 46, 47, 48], minPhase: 2, shotGapsMs: [0, 300, 0, 0, 0, 0, 0], label: "Петля возвращается за второй край" },
	{ boss: 'enem3', indexAbilities: [49, 50, 51, 52, 53, 54, 55, 56], minPhase: 3, shotGapsMs: [300, 0, 0, 300, 0, 0, 0], label: "Хлёст замыкает широкий проход" },
	{ boss: 'enem3', indexAbilities: [57, 58, 59, 60, 61, 62, 63], signature: true, isChain: true, minPhase: 3, shotDelayMs: 313, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Цепь обратного хлёста" },

	// Усоструй
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [342, 342, 342, 342], openingOrder: 0, label: "Пять качаний коромысла" },
	{ boss: 'enem4', indexAbilities: [5, 6, 7, 8], shotGapsMs: [340, 340, 340], label: "Короткое обратное качание" },
	{ boss: 'enem4', indexAbilities: [9, 10, 11, 12, 13], shotGapsMs: [342, 342, 342, 342], label: "Правое ведро завершает качание" },
	{ boss: 'enem4', indexAbilities: [14, 15, 16, 17, 18, 19], shotGapsMs: [300, 340, 340, 340, 340], label: "Вода прикрыта вторым ведром" },
	{ boss: 'enem4', indexAbilities: [20, 21, 22, 23, 24, 25], shotGapsMs: [300, 340, 340, 340, 340], label: "Капля не заканчивает качание" },
	{ boss: 'enem4', indexAbilities: [26, 27, 28, 29], signature: true, isChain: true, shotDelayMs: 313, shotGapsMs: [0, 0, 0], openingOrder: 1, label: "Цепь двух вёдер" },
	{ boss: 'enem4', indexAbilities: [30, 31, 32, 33, 34, 35, 36], minPhase: 2, shotGapsMs: [300, 395, 395, 395, 395, 395], label: "Коромысло качает после пролива" },
	{ boss: 'enem4', indexAbilities: [37, 38, 39, 40, 41, 42, 43], minPhase: 3, shotGapsMs: [300, 395, 395, 395, 395, 395], label: "Последний перелив качающихся вёдер" },
	{ boss: 'enem4', indexAbilities: [44, 45, 46, 47, 48, 49], signature: true, isChain: true, minPhase: 3, shotDelayMs: 380, shotGapsMs: [0, 0, 0, 0, 0], label: "Цепь обратного коромысла" },

	// Багорыч
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [217, 217, 217, 217], openingOrder: 0, label: "Багор прерывает первый захлёст" },
	{ boss: 'enem5', indexAbilities: [5, 6, 7, 8, 9, 10, 11], shotGapsMs: [600, 600, 300, 300, 300, 600], label: "Укол между двумя петлями каната" },
	{ boss: 'enem5', indexAbilities: [12, 13, 14, 15, 16, 17, 18], shotGapsMs: [600, 0, 300, 0, 0, 600], label: "Канат остаётся после второго укола" },
	{ boss: 'enem5', indexAbilities: [19, 20, 21, 22, 23, 24, 25], shotGapsMs: [600, 600, 0, 0, 0, 275], label: "Багор вклинился в обратную петлю" },
	{ boss: 'enem5', indexAbilities: [26, 27, 28, 29, 30, 31, 32], shotGapsMs: [500, 500, 0, 500, 0, 250], label: "Захлёст переживает быстрый багор" },
	{ boss: 'enem5', indexAbilities: [33, 34, 35, 36, 37, 38, 39], signature: true, isChain: true, shotDelayMs: 313, shotGapsMs: [0, 0, 0, 0, 0, 0], openingOrder: 1, label: "Цепь мокрого каната" },
	{ boss: 'enem5', indexAbilities: [40, 41, 42, 43, 44, 45, 46], minPhase: 2, shotGapsMs: [0, 0, 250, 0, 0, 0], label: "Багор над открытой петлёй каната" },
	{ boss: 'enem5', indexAbilities: [47, 48, 49, 50, 51, 52, 53], minPhase: 3, shotGapsMs: [0, 0, 250, 500, 250, 0], label: "Два инструмента смыкают колодец" },
	{ boss: 'enem5', indexAbilities: [54, 55, 56, 57, 58, 59, 60], signature: true, isChain: true, minPhase: 3, shotDelayMs: 313, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Цепь последнего захлёста" },

];

// Лорные названия связок временных улучшений — у каждого босса свой словарь
// образов конкретно ЕГО материала/повадки (раздел 12.1), полных совпадений
// фраз между боссами уровня нет (проверено программно).
const UPGRADE_VARIANT_NAMES = {
    // Жабоскок — жаба: присоска, бревно, тина, кваканье, прыжок.
    enem1: {
        variant1: 'Жабий кураж', variant2: 'Присосочная хватка', variant3: 'Бревно-таран',
        variant4: 'Тинистый напор', variant5: 'Меткий прыжок', variant6: 'Бешеное кваканье',
        variant7: 'Жабоскоковый норов', variant8: 'Крепкая кожа', variant9: 'Ударный прыжок',
        variant10: 'Живучая присоска', variant11: 'Колючая бородавка', variant12: 'Прыжок и в темноту',
        variant13: 'Толстая кожа', variant14: 'Неутомимое кваканье', variant15: 'Пружинистый прыжок',
        variant16: 'Острый глаз, липкая лапа', variant17: 'Тинистая удача', variant18: 'Верный прыжок',
        variant19: 'Молниеносный прыжок', variant20: 'Тинистый нюх', variant21: 'Цепкая присоска',
        variant22: 'Юркий, несмотря на брюхо', variant23: 'Жабья стойкость', variant24: 'Долгий хват, зоркий глаз',
        variant25: 'Ускользающий прыжок', variant26: 'Дикое кваканье', variant27: 'Стойкая кожа',
        variant28: 'Прыжок наповал', variant29: 'Крепкий жабоскок', variant30: 'Тинистая мощь',
        variant31: 'Прыжок с оглядкой', variant32: 'Живучая кожа', variant33: 'Юркий и склизкий',
        variant34: 'Жабья прыть', variant35: 'Быстрый прыжок, крепкая присоска'
    },
    // Кандальник — цепь: звено, замок, ржавчина, крюк, кандалы.
    enem2: {
        variant1: 'Кандальный кураж', variant2: 'Звеньевая хватка', variant3: 'Крюк-таран',
        variant4: 'Ржавый напор', variant5: 'Меткий рывок', variant6: 'Бешеный лязг',
        variant7: 'Кандальничий норов', variant8: 'Крепкий замок', variant9: 'Ударное звено',
        variant10: 'Живучий крюк', variant11: 'Колючее звено', variant12: 'Лязг и в темноту',
        variant13: 'Толстое звено', variant14: 'Неутомимый лязг', variant15: 'Пружинистый рывок',
        variant16: 'Острый крюк, зоркий глаз', variant17: 'Ржавая удача', variant18: 'Верный рывок',
        variant19: 'Молниеносный рывок', variant20: 'Ржавый нюх', variant21: 'Цепкий замок',
        variant22: 'Юркий, несмотря на вес', variant23: 'Кандальная стойкость', variant24: 'Долгий лязг, зоркий глаз',
        variant25: 'Ускользающий рывок', variant26: 'Дикий лязг', variant27: 'Стойкое звено',
        variant28: 'Рывок наповал', variant29: 'Крепкий кандальник', variant30: 'Ржавая мощь',
        variant31: 'Рывок с оглядкой', variant32: 'Живучий замок', variant33: 'Юркий и ржавый',
        variant34: 'Кандальная прыть', variant35: 'Быстрый рывок, крепкий крюк'
    },
    // Плескун — окованное ведро: обруч, дужка, брызги, доска, цепь.
    enem3: {
        variant1: 'Плесковый кураж', variant2: 'Дужечная хватка', variant3: 'Обруч-таран',
        variant4: 'Брызговый напор', variant5: 'Меткий хлыст', variant6: 'Бешеный хлыст',
        variant7: 'Плескуний норов', variant8: 'Крепкий обруч', variant9: 'Ударная дужка',
        variant10: 'Живучая доска', variant11: 'Колючий обод', variant12: 'Хлыст и в темноту',
        variant13: 'Толстая доска', variant14: 'Неутомимый хлыст', variant15: 'Пружинистый хлыст',
        variant16: 'Острый обод, зоркий глаз', variant17: 'Брызговая удача', variant18: 'Верный хлыст',
        variant19: 'Молниеносный хлыст', variant20: 'Мокрый нюх', variant21: 'Цепкая дужка',
        variant22: 'Юркий, несмотря на воду', variant23: 'Дощатая стойкость', variant24: 'Долгий дребезг, зоркий глаз',
        variant25: 'Ускользающий хлыст', variant26: 'Дикий хлыст', variant27: 'Стойкий обруч',
        variant28: 'Хлыст наповал', variant29: 'Крепкий плескун', variant30: 'Брызговая мощь',
        variant31: 'Хлыст с оглядкой', variant32: 'Живучий обод', variant33: 'Юркий и мокрый',
        variant34: 'Плесковая прыть', variant35: 'Быстрый хлыст, крепкий обруч'
    },
    // Усоструй — водонос: коромысло, ведро, ус, струя, капля.
    enem4: {
        variant1: 'Струйный кураж', variant2: 'Коромысельная хватка', variant3: 'Ведро-таран',
        variant4: 'Усатый напор', variant5: 'Меткая струя', variant6: 'Бешеная струя',
        variant7: 'Усоструйный норов', variant8: 'Крепкое коромысло', variant9: 'Ударная струя',
        variant10: 'Живучий ус', variant11: 'Колючая капля', variant12: 'Струя и в темноту',
        variant13: 'Толстое коромысло', variant14: 'Неутомимая струя', variant15: 'Пружинистое ведро',
        variant16: 'Острая струя, зоркий глаз', variant17: 'Усатая удача', variant18: 'Верная струя',
        variant19: 'Молниеносная струя', variant20: 'Водяной нюх', variant21: 'Цепкое ведро',
        variant22: 'Юркий, несмотря на ведра', variant23: 'Коромысельная стойкость', variant24: 'Долгий разлив, зоркий глаз',
        variant25: 'Ускользающая струя', variant26: 'Дикая струя', variant27: 'Стойкий ус',
        variant28: 'Струя наповал', variant29: 'Крепкий усоструй', variant30: 'Усатая мощь',
        variant31: 'Ведро с оглядкой', variant32: 'Живучее коромысло', variant33: 'Юркий и усатый',
        variant34: 'Струйная прыть', variant35: 'Быстрая струя, крепкое ведро'
    },
    // Багорыч — колодезный мастер: багор, канат, узел, вервь, ворот.
    enem5: {
        variant1: 'Багровый кураж', variant2: 'Верёвочная хватка', variant3: 'Багор-таран',
        variant4: 'Канатный напор', variant5: 'Меткий крюк', variant6: 'Бешеный узел',
        variant7: 'Багорычевый норов', variant8: 'Крепкий ворот', variant9: 'Ударный багор',
        variant10: 'Живучий канат', variant11: 'Колючий крюк', variant12: 'Узел и в темноту',
        variant13: 'Толстый канат', variant14: 'Неутомимый узел', variant15: 'Пружинистый багор',
        variant16: 'Острый багор, зоркий глаз', variant17: 'Канатная удача', variant18: 'Верный узел',
        variant19: 'Молниеносный багор', variant20: 'Пеньковый нюх', variant21: 'Цепкий крюк',
        variant22: 'Юркий, несмотря на возраст', variant23: 'Канатная стойкость', variant24: 'Долгий заброс, зоркий глаз',
        variant25: 'Ускользающий багор', variant26: 'Дикий узел', variant27: 'Стойкий ворот',
        variant28: 'Багор наповал', variant29: 'Крепкий багорыч', variant30: 'Канатная мощь',
        variant31: 'Заброс с оглядкой', variant32: 'Живучий ворот', variant33: 'Юркий и канатный',
        variant34: 'Багорная прыть', variant35: 'Быстрый узел, крепкий канат'
    }
};
