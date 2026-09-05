// Уровень 49 «Пасека у дома» — девятый уровень области V, обычный (пять
// разных монстров, как 41-44/46-48). Следующий уровень (50, Кикимора) —
// снова многофазный, поэтому это последний «обычный» уровень перед новой
// сменой формата.
//
// ДВОЙНАЯ ПРОВЕРКА УНИКАЛЬНОСТИ (раздел 1.2) — ШАГ 1 выполнен 2026-09-06 по
// admin-boss-pattern-panel.html, 240 строк, уровни 1-48, обе таблицы
// распределения плюс колонка «Архетип» по всем пяти ролям целиком.
//
// АРТ (images/enemies/regions/5_dom_dvor/lvl49/) — все 5 картинок открыты и
// сверены лично:
// 1.webp — грузный мохнатый шмель с рваными крыльями, сотовые наросты на
//   бёдрах (пыльцевые корзинки), тяжёлая нескладная поза. Архетип — атаки
//   появляются из точек, медленно вращающихся по кругу вдоль края поля,
//   как гудящий неуклюжий облёт (роль enem1, знакомство) — сверено:
//   DRONE_CIRCLE новый, ни один архетип enem1 не завязан на медленное
//   круговое вращение точек появления.
// 2.webp — полосатая пчела в стремительном пике, один коготь-жало
//   подогнут и готов к удару. Архетип — быстрые повторяющиеся
//   пике-удары-отступления по одной и той же линии атаки (роль enem2,
//   быстрые серии) — сверено: STING_DART новый, отличен от всех парных
//   L/R и вращательных архетипов enem2 до этого.
// 3.webp — жестяной дымарь с мехами, из раструба валит густой
//   направленный клуб дыма. Архетип — редкий тяжёлый НАПРАВЛЕННЫЙ шлейф
//   дыма вдоль фиксированной линии от раструба, с долгим накачиванием
//   мехов как телеграфом (роль enem3, тяжёлые редкие) — сверено:
//   SMOKE_PLUME новый, отличен от Рассольника (46, широкий веерный
//   всплеск), Зерномёта (47, веерный залп) и Плескуна (48, одиночный
//   дальний хлыст) — здесь именно НАПРАВЛЕННЫЙ ШЛЕЙФ вдоль одной линии.
// 4.webp — пасечник(ца) в сетчатой шляпе, держит рамку с сотами как щит,
//   вторая рука — цепкий захват. Архетип — непредсказуемая ДЛИНА паузы
//   перед каждым ударом (то короткая, то длинная) вместо геометрического
//   рисунка — сама непредсказуемость ритма и есть нервность (роль enem4,
//   нервный) — сверено: FRAME_FEINT новый, отличен от всех «геометрических»
//   нервных архетипов enem4 до этого (Бренчиха/Скалкина/Пыхтун/Обугленный/
//   Клубнеглаз/Бирюк/Усоструй — там нервность в форме атаки или в жёстком
//   темпе, здесь — в непредсказуемости самой паузы).
// 5.webp — исполинская матка с сотовой короной-башней на голове, один
//   огромный коготь поднят повелительно. Архетип — начинает медленно и
//   величественно (редкие одиночные удары с длинным властным телеграфом),
//   но резко учащается и уплотняется к третьей фазе сильнее обычного —
//   контраст «покой → ярость» как сама суть боя, а не побочный эффект фаз
//   (роль enem5, финал) — сверено: HIVE_COMMAND новый, отличен от
//   REVERSE_ECHO Черпака (43), FOAM_COLUMN Пенодуя (46), GRAIN_SHOWER_SLAM
//   Урожаища (47) и HOOK_AND_ROPE Багорыча (48) — не «собрать почерк
//   предыдущих» и не «пара инструментов», а собственный контраст темпа.
//
// ДВИЖЕНИЕ (movementStyle) — сверено с полным распределением 1-48 (все роли
// ≤25% до этого уровня): Гудень — drift (неуклюжий облёт по кругу) 17%→18.4%;
// Жалохват — lateRush (рывок в пике и отступление) 10%→12.2%; Дымогон —
// pause (долгая накачка мехов перед выбросом) 15%→16.3%; Сеточник — wave
// (неровное, будто нервное подрагивание) 10%→12.2%; Ульевластница — pause
// (властная неподвижность перед ударом) 15%→16.3%.
//
// ЦЕПИ (13.6/13.7) — форма выбрана ИЗ образа и сверена с полным
// распределением: Гудень — diagonal(3)+zigzag(4): неуклюжий облёт по
// прямой, затем неровный зигзаг крыльев (у enem1 обе были по 13% — самые
// низкие, не усугубляют раздутый vertical 38%, доля падает до 33.3%);
// Жалохват — vertical(4)+arc(3): пикирование по прямой вниз, затем дуга
// возврата (у enem2 обе были по 19% — не худший вариант, zigzag 25% ЧИНИТСЯ
// неучастием, падает до 22.2%); Дымогон — zigzag(4)+arc(3): дым мечется
// зигзагом на ветру, затем оседает дугой (у enem3 обе были по 13% — самые
// низкие, не усугубляют раздутый diagonal 38%, доля падает до 33.3%);
// Сеточник — vertical(4)+irregular(5): рамка бьёт по прямой, второй заход
// — нервный сбой (у enem4 обе были по 19% — ЧИНЯТ пограничный zigzag 25%,
// доля падает до 22.2%); Ульевластница — zigzag(4)+vertical(4): коготь бьёт
// зигзагом сверху короны, затем тяжёлый прямой удар вниз (у enem5 обе были
// по 19% — ЧИНЯТ пограничный diagonal 25%, доля падает до 22.2%).
//
// БОЕВЫЕ ТЕКСТЫ (appearMessage/phaseMessages) — НЕ используются на этом
// уровне (правка 2026-09-06): раздел 12 в этой части касается только
// персонажей-в-пяти-обликах, а не обычных уровней с пятью разными
// монстрами.
let lvlNumber = 49;

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
		{ phase: 2, minHp: 0.31, cadence: 0.88, speed: 1.06, damage: 1.13, telegraphMultiplier: 0.94, surpriseChance: 0.13, maxActiveAttacks: 12 },
		{ phase: 3, minHp: 0.00, cadence: 0.74, speed: 1.15, damage: 1.25, telegraphMultiplier: 0.88, surpriseChance: 0.20, maxActiveAttacks: 15 }
	],
	bosses: {
		enem1: {
			// Гудень: DRONE_CIRCLE — атаки медленно вращаются по кругу вдоль края поля
			movementStyle: 'drift', cadence: 1.03, telegraphMs: 910, speedMultiplier: 0.93, damageMultiplier: 0.91,
			speedVariance: [0.82, 0.92, 1.00, 1.08, 1.16]
		}, // Гудень: DRONE_CIRCLE — атаки медленно вращаются по кругу вдоль края поля
		enem2: {
			// Жалохват: STING_DART — быстрые повторяющиеся пике-удары-отступления
			movementStyle: 'lateRush', cadence: 0.89, telegraphMs: 750, speedMultiplier: 1.07, damageMultiplier: 1.01,
			speedVariance: [0.86, 0.95, 1.05, 1.14, 1.22]
		}, // Жалохват: STING_DART — быстрые повторяющиеся пике-удары-отступления
		enem3: {
			// Дымогон: SMOKE_PLUME — редкий тяжёлый направленный шлейф дыма
			movementStyle: 'pause', cadence: 1.17, telegraphMs: 1040, speedMultiplier: 0.81, damageMultiplier: 1.19,
			speedVariance: [0.80, 0.88, 0.96, 1.04, 1.12]
		}, // Дымогон: SMOKE_PLUME — редкий тяжёлый направленный шлейф дыма
		enem4: {
			// Сеточник: FRAME_FEINT — непредсказуемая длина паузы перед каждым ударом
			movementStyle: 'wave', cadence: 0.84, telegraphMs: 670, speedMultiplier: 1.15, damageMultiplier: 1.06,
			speedVariance: [0.88, 0.98, 1.08, 1.18, 1.26]
		}, // Сеточник: FRAME_FEINT — непредсказуемая длина паузы перед каждым ударом
		enem5: {
			// Ульевластница: HIVE_COMMAND — властный покой в начале, резкая ярость к третьей фазе
			movementStyle: 'pause', cadence: 0.79, telegraphMs: 1000, speedMultiplier: 1.08, damageMultiplier: 1.16,
			speedVariance: [0.86, 0.94, 1.03, 1.12, 1.20]
		} // Ульевластница: HIVE_COMMAND — властный покой в начале, резкая ярость к третьей фазе
	}
};

const ENEMY_TYPES = {

	enem11: { name: 'enem11', image: 'images/enemies/regions/5_dom_dvor/lvl49/11.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem22: { name: 'enem22', image: 'images/enemies/regions/5_dom_dvor/lvl49/22.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem33: { name: 'enem33', image: 'images/enemies/regions/5_dom_dvor/lvl49/33.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem44: { name: 'enem44', image: 'images/enemies/regions/5_dom_dvor/lvl49/44.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },
	enem55: { name: 'enem55', image: 'images/enemies/regions/5_dom_dvor/lvl49/55.webp', baseHP: 100, baseSpeed: 0.020, baseDamage: 20, spawnWeight: 5, baseExp: 0, size: '6%' },

	enem1: {
        name: 'enem1',
		dispName: 'Гудень',
        image: 'images/enemies/regions/5_dom_dvor/lvl49/1.webp',
        baseHP: 12447,
        baseSpeed: 0,
        baseDamage: 20,
        spawnWeight: 5,
		baseExp: 250,
        size: '24%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem2: {
        name: 'enem2',
		dispName: 'Жалохват',
        image: 'images/enemies/regions/5_dom_dvor/lvl49/2.webp',
        baseHP: 31114,
        baseSpeed: 0,
        baseDamage: 22,
        spawnWeight: 15,
		baseExp: 400,
        size: '23%',
        deathAnimation: { preset: 'default', durationMs: 900 }
    },
    enem3: {
        name: 'enem3',
		dispName: 'Дымогон',
        image: 'images/enemies/regions/5_dom_dvor/lvl49/3.webp',
        baseHP: 55019,
        baseSpeed: 0,
        baseDamage: 24,
        spawnWeight: 20,
		baseExp: 600,
        size: '24%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem4: {
        name: 'enem4',
		dispName: 'Сеточник',
        image: 'images/enemies/regions/5_dom_dvor/lvl49/4.webp',
        baseHP: 88465,
        baseSpeed: 0,
        baseDamage: 26,
        spawnWeight: 10,
		baseExp: 800,
        size: '25%',
        deathAnimation: { preset: 'default', durationMs: 950 }
    },

	enem5: {
        name: 'enem5',
		dispName: 'Ульевластница',
        image: 'images/enemies/regions/5_dom_dvor/lvl49/5.webp',
        baseHP: 134061,
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
	// ===== Гудень: DRONE_CIRCLE — атаки появляются из точек, медленно
	// вращающихся по кругу вдоль края поля =====
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //0  12 часов-ish (верх лево)
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //1  верх центр
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //2  верх право
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12 }, //3  середина лево
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13 }, //4  середина право
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 22 }, //5
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 24 }, //6
	{ boss: 'enem1', type: 'enem11', xPos: 40, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 4 },  //7  низ лево
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 50, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 3 },  //8  низ право
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 20 }, //9
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 26 }, //10
	{ boss: 'enem1', type: 'enem11', xPos: 30, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //11
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //12
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //13 — нежданчик: облёт вдруг ускоряется и меняет направление
	{ boss: 'enem1', type: 'enem11', xPos: 15, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem1', type: 'enem11', xPos: 85, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — неуклюжий облёт по прямой, затем неровный
	// зигзаг крыльев (diagonal+zigzag), раздел 13.7.
	{ boss: 'enem1', type: 'enem11', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 80, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 10 }, //18 цепь-A звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18 }, //19 цепь-B звено 1 (голова)
	{ boss: 'enem1', type: 'enem11', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 14 }, //20 цепь-B звено 2
	{ boss: 'enem1', type: 'enem11', xPos: 60, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11 }, //21 цепь-B звено 3
	{ boss: 'enem1', type: 'enem11', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 8 },  //22 цепь-B звено 4

	// ===== Жалохват: STING_DART — быстрые повторяющиеся пике-удары-
	// отступления по одной и той же линии атаки =====
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //0
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //1  та же линия, глубже
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //2
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 28, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 13 }, //3  та же линия, глубже
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 22 }, //4
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 24 }, //5
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //6
	{ boss: 'enem2', type: 'enem22', xPos: 75, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 26 }, //7
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 48, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 4 },  //8
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 46, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 3 },  //9
	{ boss: 'enem2', type: 'enem22', xPos: 20, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //10
	{ boss: 'enem2', type: 'enem22', xPos: 80, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20 }, //11
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //12 — нежданчик: пике из центра вместо привычных боков
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 30, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 12 }, //13
	{ boss: 'enem2', type: 'enem22', xPos: 15, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //14
	{ boss: 'enem2', type: 'enem22', xPos: 85, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — пикирование по прямой вниз, затем дуга
	// возврата (vertical+arc), раздел 13.7.
	{ boss: 'enem2', type: 'enem22', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem2', type: 'enem22', xPos: 51, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 9 },  //19 цепь-A звено 4
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem2', type: 'enem22', xPos: 45, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 14 }, //21 цепь-B звено 2
	{ boss: 'enem2', type: 'enem22', xPos: 30, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 11 }, //22 цепь-B звено 3

	// ===== Дымогон: SMOKE_PLUME — редкий тяжёлый направленный шлейф дыма
	// от раструба, долгая накачка мехов как телеграф =====
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
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //14 — нежданчик: клуб дыма раньше привычной долгой накачки
	{ boss: 'enem3', type: 'enem33', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 5 },  //15
	// звенья «атакующей цепи» — дым мечется зигзагом на ветру, затем
	// оседает дугой (zigzag+arc), раздел 13.7.
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem3', type: 'enem33', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem3', type: 'enem33', xPos: 75, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem3', type: 'enem33', xPos: 58, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14 }, //21 цепь-B звено 2
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 10 }, //22 цепь-B звено 3

	// ===== Сеточник: FRAME_FEINT — непредсказуемая длина паузы перед
	// каждым ударом, рамка то щит, то оружие =====
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 10, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 },  //0
	{ boss: 'enem4', type: 'enem44', xPos: 80, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 6 },  //1
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
	{ boss: 'enem4', type: 'enem44', xPos: 18, yPos: 8,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //13 — нежданчик: удар почти без паузы после предыдущего
	{ boss: 'enem4', type: 'enem44', xPos: 82, yPos: 7,  customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 19 }, //14
	{ boss: 'enem4', type: 'enem44', xPos: 45, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //15
	// звенья «атакующей цепи» — рамка бьёт по прямой, второй заход —
	// нервный сбой (vertical+irregular), раздел 13.7.
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 48, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 51, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 9 },  //19 цепь-A звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem4', type: 'enem44', xPos: 35, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 15 }, //21 цепь-B звено 2
	{ boss: 'enem4', type: 'enem44', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12 }, //22 цепь-B звено 3
	{ boss: 'enem4', type: 'enem44', xPos: 40, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 10 }, //23 цепь-B звено 4
	{ boss: 'enem4', type: 'enem44', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 8 },  //24 цепь-B звено 5

	// ===== Ульевластница: HIVE_COMMAND — властный покой в начале, резкая
	// ярость к третьей фазе =====
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
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 6,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 28 }, //12 — нежданчик: удар без единого мгновения предупредительного покоя
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //13
	{ boss: 'enem5', type: 'enem55', xPos: 75, yPos: 9,  customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6 },  //14
	{ boss: 'enem5', type: 'enem55', xPos: 45, yPos: 32, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 13 }, //15
	// звенья «атакующей цепи» — коготь бьёт зигзагом сверху короны, затем
	// тяжёлый прямой удар вниз (zigzag+vertical), раздел 13.7.
	{ boss: 'enem5', type: 'enem55', xPos: 20, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //16 цепь-A звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //17 цепь-A звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //18 цепь-A звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 55, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //19 цепь-A звено 4
	{ boss: 'enem5', type: 'enem55', xPos: 50, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18 }, //20 цепь-B звено 1 (голова)
	{ boss: 'enem5', type: 'enem55', xPos: 52, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 14 }, //21 цепь-B звено 2
	{ boss: 'enem5', type: 'enem55', xPos: 49, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11 }, //22 цепь-B звено 3
	{ boss: 'enem5', type: 'enem55', xPos: 51, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 8 },  //23 цепь-B звено 4
];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 325, bossDelayAbDop: 6100 }, // тяжёлый гудящий облёт
	{ boss: 'enem2', bossDelayAb: 220, bossDelayAbDop: 4200 }, // самый частый — быстрые пике
	{ boss: 'enem3', bossDelayAb: 415, bossDelayAbDop: 6950 }, // самый долгий отдых — награда за терпение
	{ boss: 'enem4', bossDelayAb: 190, bossDelayAbDop: 3300 }, // нервный, но непредсказуемый ритм
	{ boss: 'enem5', bossDelayAb: 260, bossDelayAbDop: 5150 }, // собранный финал
 ];

 const bossAbilitiesDop = [
	// Гудень — DRONE_CIRCLE
	{ boss: 'enem1', indexAbilities: [0, 1, 2] },
	{ boss: 'enem1', indexAbilities: [3, 4] },
	{ boss: 'enem1', indexAbilities: [5, 6] },
	{ boss: 'enem1', indexAbilities: [7, 8] },
	{ boss: 'enem1', indexAbilities: [9, 10, 14, 15] },
	{ boss: 'enem1', indexAbilities: [0, 1, 5] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem1', indexAbilities: [16, 17, 18], isChain: true }, // ← цепь-A (3, diagonal)
	{ boss: 'enem1', indexAbilities: [19, 20, 21, 22], isChain: true }, // ← цепь-B (4, zigzag)
	{ boss: 'enem1', indexAbilities: [13] }, // нежданчик: облёт вдруг ускоряется и меняет направление
	{ boss: 'enem1', indexAbilities: [0, 3, 7, 2, 4, 8] }, // сигнатурная: полный круг по всем шести точкам подряд

	// Жалохват — STING_DART
	{ boss: 'enem2', indexAbilities: [0, 1] },
	{ boss: 'enem2', indexAbilities: [2, 3] },
	{ boss: 'enem2', indexAbilities: [4, 5] },
	{ boss: 'enem2', indexAbilities: [6, 7] },
	{ boss: 'enem2', indexAbilities: [8, 9, 14, 15] },
	{ boss: 'enem2', indexAbilities: [0, 1, 4] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem2', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4, vertical)
	{ boss: 'enem2', indexAbilities: [20, 21, 22], isChain: true }, // ← цепь-B (3, arc)
	{ boss: 'enem2', indexAbilities: [12, 13] }, // нежданчик: пике из центра вместо привычных боков
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 6, 7] }, // сигнатурная: серия пике по обеим линиям подряд

	// Дымогон — SMOKE_PLUME
	{ boss: 'enem3', indexAbilities: [0, 1, 2] },
	{ boss: 'enem3', indexAbilities: [3, 4] },
	{ boss: 'enem3', indexAbilities: [5, 6] },
	{ boss: 'enem3', indexAbilities: [7, 8] },
	{ boss: 'enem3', indexAbilities: [9, 10] },
	{ boss: 'enem3', indexAbilities: [0, 1, 7] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem3', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4, zigzag)
	{ boss: 'enem3', indexAbilities: [20, 21, 22], isChain: true }, // ← цепь-B (3, arc)
	{ boss: 'enem3', indexAbilities: [14, 15] }, // нежданчик: клуб дыма раньше долгой накачки
	{ boss: 'enem3', indexAbilities: [3, 11, 4, 12] }, // сигнатурная: направленный шлейф с обеих сторон разом

	// Сеточник — FRAME_FEINT
	{ boss: 'enem4', indexAbilities: [0, 1] },
	{ boss: 'enem4', indexAbilities: [2, 3] },
	{ boss: 'enem4', indexAbilities: [4, 5] },
	{ boss: 'enem4', indexAbilities: [6, 7] },
	{ boss: 'enem4', indexAbilities: [8, 9, 10] },
	{ boss: 'enem4', indexAbilities: [0, 1, 4] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem4', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4, vertical)
	{ boss: 'enem4', indexAbilities: [20, 21, 22, 23, 24], isChain: true }, // ← цепь-B (5, irregular)
	{ boss: 'enem4', indexAbilities: [13, 14] }, // нежданчик: удар почти без паузы после предыдущего
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 11, 12, 15] }, // сигнатурная: полный захват по всему полю на скорости

	// Ульевластница — HIVE_COMMAND, финальный облик
	{ boss: 'enem5', indexAbilities: [0] },
	{ boss: 'enem5', indexAbilities: [1] },
	{ boss: 'enem5', indexAbilities: [2] },
	{ boss: 'enem5', indexAbilities: [5, 6] },
	{ boss: 'enem5', indexAbilities: [9, 10, 11] },
	{ boss: 'enem5', indexAbilities: [0, 1, 3] }, // same-start с [0,1], расходится быстрым акцентом
	{ boss: 'enem5', indexAbilities: [16, 17, 18, 19], isChain: true }, // ← цепь-A (4, zigzag)
	{ boss: 'enem5', indexAbilities: [20, 21, 22, 23], isChain: true }, // ← цепь-B (4, vertical)
	{ boss: 'enem5', indexAbilities: [12] }, // нежданчик: удар без единого мгновения предупредительного покоя
	{ boss: 'enem5', indexAbilities: [1, 2, 5, 6, 3, 4, 13, 14] }, // сигнатурная кульминация: вся ярость улья разом по всему полю
 ];

// Лорные названия связок временных улучшений — у каждого босса свой словарь
// образов конкретно ЕГО материала/повадки (раздел 12.1), полных совпадений
// фраз между боссами уровня нет (проверено программно).
const UPGRADE_VARIANT_NAMES = {
    // Гудень — шмель: гул, пыльца, крыло, ворс, соты.
    enem1: {
        variant1: 'Гудящий кураж', variant2: 'Ворсистая хватка', variant3: 'Жало-таран',
        variant4: 'Пыльцевой напор', variant5: 'Меткий облёт', variant6: 'Бешеный гул',
        variant7: 'Гуденьский норов', variant8: 'Крепкое крыло', variant9: 'Ударный гул',
        variant10: 'Живучий ворс', variant11: 'Колючая лапка', variant12: 'Гул и в темноту',
        variant13: 'Толстый ворс', variant14: 'Неутомимый гул', variant15: 'Пружинистый облёт',
        variant16: 'Острый глаз, гулкий рой', variant17: 'Пыльцевая удача', variant18: 'Верный облёт',
        variant19: 'Молниеносный облёт', variant20: 'Пыльцевой нюх', variant21: 'Цепкая лапка',
        variant22: 'Юркий для своей тяжести', variant23: 'Гудящая стойкость', variant24: 'Долгий облёт, зоркий глаз',
        variant25: 'Ускользающий облёт', variant26: 'Дикий гул', variant27: 'Стойкое крыло',
        variant28: 'Гул наповал', variant29: 'Крепкий гудень', variant30: 'Ворсистая мощь',
        variant31: 'Облёт с оглядкой', variant32: 'Живучее крыло', variant33: 'Юркий и ворсистый',
        variant34: 'Гудящая прыть', variant35: 'Быстрый облёт, крепкое крыло'
    },
    // Жалохват — рабочая пчела: жало, полоса, крыло, пике, мёд.
    enem2: {
        variant1: 'Жальный кураж', variant2: 'Полосатая хватка', variant3: 'Пике-таран',
        variant4: 'Пикирующий напор', variant5: 'Меткое жало', variant6: 'Бешеное жало',
        variant7: 'Жалохватский норов', variant8: 'Крепкое жало', variant9: 'Ударное пике',
        variant10: 'Живучая полоса', variant11: 'Колючее жало', variant12: 'Жало и в темноту',
        variant13: 'Толстый панцирь', variant14: 'Неутомимое пике', variant15: 'Пружинистое пике',
        variant16: 'Острое жало, зоркий глаз', variant17: 'Пикирующая удача', variant18: 'Верное пике',
        variant19: 'Молниеносное пике', variant20: 'Жальный нюх', variant21: 'Цепкое жало',
        variant22: 'Юркий для своих полос', variant23: 'Жальная стойкость', variant24: 'Долгий разгон, зоркий глаз',
        variant25: 'Ускользающее пике', variant26: 'Дикое жало', variant27: 'Стойкая полоса',
        variant28: 'Жало наповал', variant29: 'Крепкий жалохват', variant30: 'Пикирующая мощь',
        variant31: 'Пике с оглядкой', variant32: 'Живучее жало', variant33: 'Юркий и полосатый',
        variant34: 'Жальная прыть', variant35: 'Быстрое пике, острое жало'
    },
    // Дымогон — жестяной дымарь: дым, мехи, жесть, раструб, искра.
    enem3: {
        variant1: 'Дымный кураж', variant2: 'Мехова́я хватка', variant3: 'Раструб-таран',
        variant4: 'Дымовой напор', variant5: 'Меткий выброс', variant6: 'Бешеный выброс',
        variant7: 'Дымогонский норов', variant8: 'Крепкая жесть', variant9: 'Ударный дым',
        variant10: 'Живучие мехи', variant11: 'Колючая искра', variant12: 'Выброс и в темноту',
        variant13: 'Толстая жесть', variant14: 'Неутомимый выброс', variant15: 'Пружинистые мехи',
        variant16: 'Острый раструб, зоркий глаз', variant17: 'Дымная удача', variant18: 'Верный выброс',
        variant19: 'Молниеносный выброс', variant20: 'Дымный нюх', variant21: 'Цепкие мехи',
        variant22: 'Юркий, несмотря на жесть', variant23: 'Дымная стойкость', variant24: 'Долгая накачка, зоркий глаз',
        variant25: 'Ускользающий выброс', variant26: 'Дикий выброс', variant27: 'Стойкая жесть',
        variant28: 'Выброс наповал', variant29: 'Крепкий дымогон', variant30: 'Дымная мощь',
        variant31: 'Выброс с оглядкой', variant32: 'Живучая жесть', variant33: 'Юркий и дымный',
        variant34: 'Дымная прыть', variant35: 'Быстрый выброс, крепкая жесть'
    },
    // Сеточник — пасечник: сетка, рамка, соты, веко, захват.
    enem4: {
        variant1: 'Сетчатый кураж', variant2: 'Рамочная хватка', variant3: 'Рамка-таран',
        variant4: 'Медовый напор', variant5: 'Меткий захват', variant6: 'Бешеный захват',
        variant7: 'Сетночников норов', variant8: 'Крепкая сетка', variant9: 'Ударная рамка',
        variant10: 'Живучий захват', variant11: 'Колючие соты', variant12: 'Захват и в темноту',
        variant13: 'Толстая сетка', variant14: 'Неутомимый захват', variant15: 'Пружинистый захват',
        variant16: 'Острый взгляд из сетки, зоркий глаз', variant17: 'Восковая удача', variant18: 'Верный захват',
        variant19: 'Молниеносный захват', variant20: 'Сетчатый нюх', variant21: 'Цепкая рамка',
        variant22: 'Юркий, несмотря на сетку', variant23: 'Сетчатая стойкость', variant24: 'Долгий прищур, зоркий глаз',
        variant25: 'Ускользающий захват', variant26: 'Дикий захват', variant27: 'Стойкая рамка',
        variant28: 'Захват наповал', variant29: 'Крепкий сетночник', variant30: 'Сетчатая мощь',
        variant31: 'Захват с оглядкой', variant32: 'Живучая сетка', variant33: 'Юркий и сетчатый',
        variant34: 'Сетчатая прыть', variant35: 'Быстрый захват, крепкая рамка'
    },
    // Ульевластница — матка: улей, корона, соты, крыло, приказ.
    enem5: {
        variant1: 'Царский кураж', variant2: 'Коронная хватка', variant3: 'Коготь-таран',
        variant4: 'Улейный напор', variant5: 'Меткий приказ', variant6: 'Бешеный приказ',
        variant7: 'Властный норов', variant8: 'Крепкая корона', variant9: 'Ударный коготь',
        variant10: 'Живучая корона', variant11: 'Колючая корона', variant12: 'Приказ и в темноту',
        variant13: 'Толстые соты', variant14: 'Неутомимый приказ', variant15: 'Пружинистый коготь',
        variant16: 'Острый коготь, властный взгляд', variant17: 'Улейная удача', variant18: 'Верный приказ',
        variant19: 'Молниеносный приказ', variant20: 'Царский нюх', variant21: 'Цепкий коготь',
        variant22: 'Юркая, несмотря на величие', variant23: 'Царская стойкость', variant24: 'Долгий покой, властный глаз',
        variant25: 'Ускользающий приказ', variant26: 'Дикий приказ', variant27: 'Стойкая корона',
        variant28: 'Приказ наповал', variant29: 'Крепкая ульевластница', variant30: 'Улейная мощь',
        variant31: 'Приказ с оглядкой', variant32: 'Живучий коготь', variant33: 'Юркая и властная',
        variant34: 'Царская прыть', variant35: 'Быстрый приказ, крепкая корона'
    }
};
