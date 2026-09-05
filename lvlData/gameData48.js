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
			// Жабоскок: STICKY_CLING — атаки из повторяющихся точек хвата, изредка большой прыжок
			movementStyle: 'pause', cadence: 1.02, telegraphMs: 900, speedMultiplier: 0.94, damageMultiplier: 0.90,
			speedVariance: [0.82, 0.92, 1.00, 1.08, 1.16]
		}, // Жабоскок: STICKY_CLING — атаки из повторяющихся точек хвата, изредка большой прыжок
		enem2: {
			// Кандальник: FOUR_LIMB_LASH — атаки вращаются по четырём точкам разом
			movementStyle: 'weave', cadence: 0.91, telegraphMs: 770, speedMultiplier: 1.05, damageMultiplier: 1.00,
			speedVariance: [0.86, 0.95, 1.05, 1.14, 1.22]
		}, // Кандальник: FOUR_LIMB_LASH — атаки вращаются по четырём точкам разом
		enem3: {
			// Плескун: CHAIN_WHIP_REACH — редкий очень дальний одиночный хлыст цепи
			movementStyle: 'lateRush', cadence: 1.16, telegraphMs: 1030, speedMultiplier: 0.82, damageMultiplier: 1.18,
			speedVariance: [0.80, 0.88, 0.96, 1.04, 1.12]
		}, // Плескун: CHAIN_WHIP_REACH — редкий очень дальний одиночный хлыст цепи
		enem4: {
			// Усоструй: YOKE_SEESAW — строго поочерёдные удары обоих вёдер на тугом нервном темпе
			movementStyle: 'accelerate', cadence: 0.85, telegraphMs: 680, speedMultiplier: 1.14, damageMultiplier: 1.05,
			speedVariance: [0.88, 0.98, 1.08, 1.18, 1.26]
		}, // Усоструй: YOKE_SEESAW — строго поочерёдные удары обоих вёдер на тугом нервном темпе
		enem5: {
			// Багорыч: HOOK_AND_ROPE — точный дальний укол багром + широкий захлёст канатом
			movementStyle: 'straight', cadence: 0.80, telegraphMs: 990, speedMultiplier: 1.06, damageMultiplier: 1.14,
			speedVariance: [0.86, 0.94, 1.03, 1.12, 1.20]
		} // Багорыч: HOOK_AND_ROPE — точный дальний укол багром + широкий захлёст канатом
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
 let timeNextBoss = 5;
 const bossInterval = 5;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
 // speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Жабоскок: STICKY_CLING — атаки из нескольких повторяющихся
	// точек-«прилипаний», изредка большой прыжок в новую точку =====
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //0  точка A
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //1  точка A
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //2  точка B
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //3  точка B
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //4  точка C (низ)
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //5  точка C
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //6
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //7
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //8  точка A, быстрый акцент
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 26 }, //9  точка B, быстрый акцент
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //10 точка A
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //11 точка B
	{ boss: 'enem1', type: 'enem11', xPos: 45, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //12 — нежданчик: большой прыжок в новую центральную точку
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //13
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //14 точка A
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //15 точка B
	// звенья «атакующей цепи» — прыжок по дуге, затем разбросанные точки
	// хвата (arc+irregular), раздел 13.7.
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 15 }, //20 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //21 цепь-B звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //22 цепь-B звено 4
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 8 },  //23 цепь-B звено 5

	// ===== Кандальник: FOUR_LIMB_LASH — атаки вращаются по четырём точкам
	// разом, быстро, без явного порядка =====
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //0  конечность 1 (левая верхняя)
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //1  конечность 2 (правая верхняя)
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //2  конечность 3 (левая нижняя)
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //3  конечность 4 (правая нижняя)
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //4
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //5
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //6
	{ boss: 'enem2', type: 'enem22', xPos: 75, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 26 }, //7
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //8
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //9
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //10
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 34, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //12 — нежданчик: все четыре конечности разом вместо привычной ротации по одной
	{ boss: 'enem2', type: 'enem22', xPos: 78, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 18, yPos: 12, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 82, yPos: 11, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — хаотичный вихрь четырёх конечностей, затем
	// быстрый зигзаг звеньев (irregular+zigzag), раздел 13.7.
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 15 }, //17 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //18 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //19 цепь-A звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 8 },  //20 цепь-A звено 5
	{ boss: 'enem2', type: 'enem22', xPos: 75, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //21 цепь-B звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //22 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10 }, //23 цепь-B звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 7 },  //24 цепь-B звено 4

	// ===== Плескун: CHAIN_WHIP_REACH — редкий, но очень дальний одиночный
	// хлыст цепи от ведра к герою =====
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
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 },  //14 — нежданчик: хлыст летит раньше привычного долгого дребезжания
	{ boss: 'enem3', type: 'enem33', xPos: 80, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 6 },  //15
	// звенья «атакующей цепи» — цепь мотается зигзагом перед броском, затем
	// прямой вертикальный хлыст вниз колодца (zigzag+vertical), раздел 13.7.
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //21 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //22 цепь-B звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 51, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //23 цепь-B звено 4

	// ===== Усоструй: YOKE_SEESAW — строго поочерёдные удары обоих вёдер на
	// непривычно тугом нервном темпе =====
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 },  //0  левое ведро
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 },  //1  правое ведро
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //2  левое ведро
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //3  правое ведро
	{ boss: 'enem4', type: 'enem44', xPos: 15, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //4
	{ boss: 'enem4', type: 'enem44', xPos: 85, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 24 }, //5
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 22 }, //6
	{ boss: 'enem4', type: 'enem44', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20 }, //7
	{ boss: 'enem4', type: 'enem44', xPos: 35, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //8  левое ведро низ
	{ boss: 'enem4', type: 'enem44', xPos: 65, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 5 },  //9  правое ведро низ
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 7 },  //10 центр (коромысло дрогнуло)
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, //11
	{ boss: 'enem4', type: 'enem44', xPos: 75, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 13 }, //12
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 26 }, //13 — нежданчик: оба ведра почти одновременно вместо привычной строгой очереди
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //15
	// звенья «атакующей цепи» — оба ведра бьют по одной вертикали, второй
	// заход — нервный сбой ритма (vertical+irregular), раздел 13.7.
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 48, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 51, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 9 },  //19 цепь-A звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //21 цепь-B звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //22 цепь-B звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, //23 цепь-B звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //24 цепь-B звено 5

	// ===== Багорыч: HOOK_AND_ROPE — точный дальний укол багром + широкий
	// боковой захлёст канатом =====
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //0  багор
	{ boss: 'enem5', type: 'enem55', xPos: 80, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //1  багор
	{ boss: 'enem5', type: 'enem55', xPos: 15, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //2  канат
	{ boss: 'enem5', type: 'enem55', xPos: 85, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //3  канат
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 22 }, //4
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 24 }, //5
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //6
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //7
	{ boss: 'enem5', type: 'enem55', xPos: 8,  yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 26 }, //8
	{ boss: 'enem5', type: 'enem55', xPos: 92, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20 }, //9
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 4 },  //10
	{ boss: 'enem5', type: 'enem55', xPos: 40, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //11
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 5 },  //12
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28 }, //13 — нежданчик: багор и канат разом с обеих сторон
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //14
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //15
	// звенья «атакующей цепи» — багор дёргается зигзагом, канат метёт
	// хаотичной дугой (zigzag+irregular), раздел 13.7.
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15 }, //21 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12 }, //22 цепь-B звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10 }, //23 цепь-B звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //24 цепь-B звено 5
];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 315, bossDelayAbDop: 5900 }, // цепляется и выжидает
	{ boss: 'enem2', bossDelayAb: 235, bossDelayAbDop: 4500 }, // четыре конечности, быстрый ритм
	{ boss: 'enem3', bossDelayAb: 405, bossDelayAbDop: 6850 }, // самый долгий отдых — награда за терпение
	{ boss: 'enem4', bossDelayAb: 180, bossDelayAbDop: 3400 }, // самый частый — нервный тугой темп
	{ boss: 'enem5', bossDelayAb: 250, bossDelayAbDop: 5050 }, // собранный финал
 ];

 const bossAbilitiesDop = [
	// Жабоскок — STICKY_CLING
	{ boss: 'enem1', indexAbilities: [0, 1] },
	{ boss: 'enem1', indexAbilities: [2, 3] },
	{ boss: 'enem1', indexAbilities: [4, 5] },
	{ boss: 'enem1', indexAbilities: [6, 7] },
	{ boss: 'enem1', indexAbilities: [8, 14, 9, 15] },
	{ boss: 'enem1', indexAbilities: [0, 1, 6] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem1', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь-A (3, arc)
	{ boss: 'enem1', indexAbilities: [19, 20, 21, 22, 23], isChain: true }, // ← цепь-B (5, irregular)
	{ boss: 'enem1', indexAbilities: [12, 13] }, // нежданчик: большой прыжок в новую точку
	{ boss: 'enem1', indexAbilities: [0, 1, 10, 2, 3, 11] }, // сигнатурная: обе точки хвата разом на полной скорости

	// Кандальник — FOUR_LIMB_LASH
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [2, 3] },
	{ boss: 'enem2', indexAbilities: [4, 5] },
	{ boss: 'enem2', indexAbilities: [6, 7] },
	{ boss: 'enem2', indexAbilities: [8, 9, 14, 15] },
	{ boss: 'enem2', indexAbilities: [0, 1, 4] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem2', indexAbilities: [16, 17, 18, 19, 20], isChain: true }, // ← цепь-A (5, irregular)
	{ boss: 'enem2', indexAbilities: [21, 22, 23, 24], isChain: true }, // ← цепь-B (4, zigzag)
	{ boss: 'enem2', indexAbilities: [12, 13] }, // нежданчик: все четыре конечности почти разом
	{ boss: 'enem2', indexAbilities: [0, 2, 4, 6, 1, 3, 5, 7] }, // сигнатурная: полный оборот по четырём точкам подряд

	// Плескун — CHAIN_WHIP_REACH
	{ boss: 'enem3', indexAbilities: [0, 1, 2] },
	{ boss: 'enem3', indexAbilities: [3, 4] },
	{ boss: 'enem3', indexAbilities: [5, 6] },
	{ boss: 'enem3', indexAbilities: [7, 8] },
	{ boss: 'enem3', indexAbilities: [9, 10] },
	{ boss: 'enem3', indexAbilities: [0, 1, 7] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem3', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4, zigzag)
	{ boss: 'enem3', indexAbilities: [20, 21, 22, 23], isChain: true }, // ← цепь-B (4, vertical)
	{ boss: 'enem3', indexAbilities: [14, 15] }, // нежданчик: хлыст раньше долгого дребезжания
	{ boss: 'enem3', indexAbilities: [3, 11, 4, 12] }, // сигнатурная: два дальних хлыста с обеих сторон разом

	// Усоструй — YOKE_SEESAW
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [2, 3] },
	{ boss: 'enem4', indexAbilities: [4, 5] },
	{ boss: 'enem4', indexAbilities: [6, 7] },
	{ boss: 'enem4', indexAbilities: [8, 9, 10] },
	{ boss: 'enem4', indexAbilities: [0, 1, 4] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem4', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4, vertical)
	{ boss: 'enem4', indexAbilities: [20, 21, 22, 23, 24], isChain: true }, // ← цепь-B (5, irregular)
	{ boss: 'enem4', indexAbilities: [13] }, // нежданчик: оба ведра почти одновременно
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 11, 12, 14, 15] }, // сигнатурная: полный тугой седл на пределе темпа

	// Багорыч — HOOK_AND_ROPE, финальный облик
	{ boss: 'enem5', indexAbilities: [0, 1] },
	{ boss: 'enem5', indexAbilities: [2, 3] },
	{ boss: 'enem5', indexAbilities: [4, 5] },
	{ boss: 'enem5', indexAbilities: [6, 7] },
	{ boss: 'enem5', indexAbilities: [10, 11, 12] },
	{ boss: 'enem5', indexAbilities: [0, 1, 4] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem5', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4, zigzag)
	{ boss: 'enem5', indexAbilities: [20, 21, 22, 23, 24], isChain: true }, // ← цепь-B (5, irregular)
	{ boss: 'enem5', indexAbilities: [13] }, // нежданчик: багор и канат разом с обеих сторон
	{ boss: 'enem5', indexAbilities: [0, 2, 6, 1, 3, 7, 14, 15] }, // сигнатурная кульминация: багор и канат по всему полю подряд
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
