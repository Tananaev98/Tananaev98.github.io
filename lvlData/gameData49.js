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
	attackChains: true,
	scaleLongComboDamage: true,
	scaleShortComboDamage: true,
	waveJitter: {min: 0.88, max: 1.12},
	busyRetryMs: 180,
	defaultRecoveryMs: 180,
	selection: {historyLength: 2, dangerLengthWeight: 0.8, minCombosForRepeatBlock: 2, dangerousPoolSize: 2, phase1WeightBase: 1.35, phase1WeightFloor: 0.25, phase3WeightBase: 0.45, phase3WeightSlope: 1.35},
	movementStyles: {accelerate: {start: 0.72, gain: 0.9}, lateRush: {switchAt: 0.55, early: 0.72, late: 1.48}, pause: {at: 0.42, durationMs: 420, after: 1.22}, weave: {frequency: 1.35, amplitude: 5.5}, drift: {shift: 10}},
	levelCadence: 0.77, damageMultiplier: 1.782, minWaveDelay: 4350, minShotDelay: 122, minTelegraphMs: 518,
	phases: [
		{ phase: 1, minHp: 0.683, cadence: 0.974, speed: 1.031, damage: 1, telegraphMultiplier: 1.029, surpriseChance: 0.101, maxActiveAttacks: 26 },
		{ phase: 2, minHp: 0.333, cadence: 0.793, speed: 1.172, damage: 1.13, telegraphMultiplier: 0.867, surpriseChance: 0.201, maxActiveAttacks: 30 },
		{ phase: 3, minHp: 0, cadence: 0.627, speed: 1.283, damage: 1.25, telegraphMultiplier: 0.767, surpriseChance: 0.301, maxActiveAttacks: 34 }
	],
	bosses: {
		enem1: { combatIdentity: "Тяжёлое крыло возвращается с внешней дуги", combatTrick: "Шмель проводит широкий облёт и возвращается к прежней кромке. Прикрытая пыльца не завершает круг. Ошибка — атаковать после внешней дуги до обратного взмаха.", signatureEvery: 3, movementStyle: 'drift', cadence: 1.008, telegraphMs: 932, speedMultiplier: 1.028, damageMultiplier: 0.91, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem2: { combatIdentity: "Повторное пике возвращается в старую линию", combatTrick: "Жало дважды проходит одну линию, отступает в другую и снова возвращается. Ошибка — уйти после второго укола, не дождавшись возврата.", signatureEvery: 3, movementStyle: 'lateRush', cadence: 0.997, telegraphMs: 841, speedMultiplier: 1.057, damageMultiplier: 1.01, speedVariance: [1, 1.0004, 1.0008, 1.0012, 1.0016] },
		enem3: { combatIdentity: "Последний клуб остаётся за направленным шлейфом", combatTrick: "Мехи задерживают дым, затем направленный шлейф уплотняется ещё одним клубом. Ошибка — атаковать во время накачки или уйти после первой плотной струи.", signatureEvery: 3, movementStyle: 'pause', cadence: 0.817, telegraphMs: 1019, speedMultiplier: 1.007, damageMultiplier: 1.19, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem4: { combatIdentity: "Рамка ломает длину знакомой паузы", combatTrick: "Рамка подаёт короткую пару, затем удлиняет промежуток перед обратным броском. Ошибка — продолжать метроном или бить пасечницу в незавершённой паузе.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 0.957, telegraphMs: 800, speedMultiplier: 1.077, damageMultiplier: 1.06, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] },
		enem5: { combatIdentity: "Охрана смыкается после властного разлёта", combatTrick: "Две части охраны расходятся от улья и смыкаются снова, пока пыльца ещё летит. Поздняя серия добавляет ещё одно смыкание. Ошибка — бить матку после первой половины разлёта.", signatureEvery: 3, movementStyle: 'accelerate', cadence: 0.937, telegraphMs: 961, speedMultiplier: 1.108, damageMultiplier: 1.16, speedVariance: [1, 1.004, 1.008, 1.012, 1.016] }
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
 let timeNextBoss = 21;
 const bossInterval = 14;

  //spawnEnemyWithParams(type, xPos, yPos, customHP, customDamage, customSpeed)

 // Скорости и высоты появления подобраны по разделу 5: speed≥20 → yPos 5-10;
 // speed 16-18 → yPos≤12; speed≤10 может стартовать ниже (46-52).

 const bossAbilities = [
	// ===== Гудень =====
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.17 }, // 0 a
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.37 }, // 1 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.37 }, // 2 a
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.37 }, // 3 a
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.37 }, // 4 a
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.37 }, // 5 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.37 }, // 6 b
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.37 }, // 7 b
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.37 }, // 8 b
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.37 }, // 9 b
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.21 }, // 10 c
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.37 }, // 11 c
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.37 }, // 12 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.37 }, // 13 c
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.37 }, // 14 c
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.37 }, // 15 c
	{ boss: 'enem1', type: 'enem11', xPos: 12, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.21 }, // 16 d
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.37 }, // 17 d
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.37 }, // 18 d
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.37 }, // 19 d
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.37 }, // 20 d
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.37 }, // 21 d
	{ boss: 'enem1', type: 'enem11', xPos: 13, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.21 }, // 22 e
	{ boss: 'enem1', type: 'enem11', xPos: 87, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.37 }, // 23 e
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.37 }, // 24 e
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.37 }, // 25 e
	{ boss: 'enem1', type: 'enem11', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.37 }, // 26 e
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.37 }, // 27 e
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.61 }, // 28 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.36 }, // 29 f
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.11 }, // 30 f
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.86 }, // 31 f
	{ boss: 'enem1', type: 'enem11', xPos: 91, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.21 }, // 32 g
	{ boss: 'enem1', type: 'enem11', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.37 }, // 33 g
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.37 }, // 34 g
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.37 }, // 35 g
	{ boss: 'enem1', type: 'enem11', xPos: 86, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.37 }, // 36 g
	{ boss: 'enem1', type: 'enem11', xPos: 69, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.37 }, // 37 g
	{ boss: 'enem1', type: 'enem11', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.37 }, // 38 g
	{ boss: 'enem1', type: 'enem11', xPos: 11, yPos: 27, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 6.21 }, // 39 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.37 }, // 40 h
	{ boss: 'enem1', type: 'enem11', xPos: 78, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 13.37 }, // 41 h
	{ boss: 'enem1', type: 'enem11', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.37 }, // 42 h
	{ boss: 'enem1', type: 'enem11', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 17.43 }, // 43 h
	{ boss: 'enem1', type: 'enem11', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 18.37 }, // 44 h
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 19.37 }, // 45 h
	{ boss: 'enem1', type: 'enem11', xPos: 90, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.71 }, // 46 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.46 }, // 47 i
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 12.21 }, // 48 i
	{ boss: 'enem1', type: 'enem11', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.96 }, // 49 i
	{ boss: 'enem1', type: 'enem11', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.71 }, // 50 i
	{ boss: 'enem1', type: 'enem11', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem1.baseDamage, customSpeed: 11.46 }, // 51 i

	// ===== Жалохват =====
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.41 }, // 0 a
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.41 }, // 1 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.41 }, // 2 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.41 }, // 3 a
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.41 }, // 4 a
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.41 }, // 5 a
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.41 }, // 6 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.41 }, // 7 b
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.41 }, // 8 b
	{ boss: 'enem2', type: 'enem22', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.41 }, // 9 b
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.41 }, // 10 b
	{ boss: 'enem2', type: 'enem22', xPos: 90, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.23 }, // 11 c
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.41 }, // 12 c
	{ boss: 'enem2', type: 'enem22', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.41 }, // 13 c
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.41 }, // 14 c
	{ boss: 'enem2', type: 'enem22', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.41 }, // 15 c
	{ boss: 'enem2', type: 'enem22', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.41 }, // 16 c
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.23 }, // 17 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.41 }, // 18 d
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.41 }, // 19 d
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.41 }, // 20 d
	{ boss: 'enem2', type: 'enem22', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.41 }, // 21 d
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.41 }, // 22 d
	{ boss: 'enem2', type: 'enem22', xPos: 91, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.23 }, // 23 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.41 }, // 24 e
	{ boss: 'enem2', type: 'enem22', xPos: 5, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.41 }, // 25 e
	{ boss: 'enem2', type: 'enem22', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.41 }, // 26 e
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.41 }, // 27 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.41 }, // 28 e
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.81 }, // 29 f
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.77 }, // 30 f
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.73 }, // 31 f
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.69 }, // 32 f
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.65 }, // 33 f
	{ boss: 'enem2', type: 'enem22', xPos: 13, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.23 }, // 34 g
	{ boss: 'enem2', type: 'enem22', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.41 }, // 35 g
	{ boss: 'enem2', type: 'enem22', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.41 }, // 36 g
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.41 }, // 37 g
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.41 }, // 38 g
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.41 }, // 39 g
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.41 }, // 40 g
	{ boss: 'enem2', type: 'enem22', xPos: 11, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 6.23 }, // 41 h
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.41 }, // 42 h
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.41 }, // 43 h
	{ boss: 'enem2', type: 'enem22', xPos: 4, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 18.41 }, // 44 h
	{ boss: 'enem2', type: 'enem22', xPos: 5, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.41 }, // 45 h
	{ boss: 'enem2', type: 'enem22', xPos: 71, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 20.41 }, // 46 h
	{ boss: 'enem2', type: 'enem22', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 19.41 }, // 47 h
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.91 }, // 48 i
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.87 }, // 49 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.83 }, // 50 i
	{ boss: 'enem2', type: 'enem22', xPos: 70, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.79 }, // 51 i
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.75 }, // 52 i
	{ boss: 'enem2', type: 'enem22', xPos: 8, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.71 }, // 53 i
	{ boss: 'enem2', type: 'enem22', xPos: 24, yPos: 26, customHP: 1, customDamage: ENEMY_TYPES.enem2.baseDamage, customSpeed: 10.67 }, // 54 i

	// ===== Дымогон =====
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.81 }, // 0 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.81 }, // 1 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.81 }, // 2 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.81 }, // 3 a
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.81 }, // 4 a
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.81 }, // 5 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.81 }, // 6 a
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.81 }, // 7 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.81 }, // 8 b
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.81 }, // 9 b
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.81 }, // 10 b
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.81 }, // 11 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.81 }, // 12 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 17.01 }, // 13 b
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.81 }, // 14 c
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.81 }, // 15 c
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.81 }, // 16 c
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.81 }, // 17 c
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.81 }, // 18 c
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.81 }, // 19 c
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.81 }, // 20 c
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.81 }, // 21 d
	{ boss: 'enem3', type: 'enem33', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.81 }, // 22 d
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.81 }, // 23 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.81 }, // 24 d
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.81 }, // 25 d
	{ boss: 'enem3', type: 'enem33', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.81 }, // 26 d
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.81 }, // 27 d
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.81 }, // 28 e
	{ boss: 'enem3', type: 'enem33', xPos: 6, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.81 }, // 29 e
	{ boss: 'enem3', type: 'enem33', xPos: 20, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.81 }, // 30 e
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.81 }, // 31 e
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.81 }, // 32 e
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.81 }, // 33 e
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.81 }, // 34 e
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.57 }, // 35 f
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.32 }, // 36 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.07 }, // 37 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.82 }, // 38 f
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.57 }, // 39 f
	{ boss: 'enem3', type: 'enem33', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.32 }, // 40 f
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.07 }, // 41 f
	{ boss: 'enem3', type: 'enem33', xPos: 11, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.81 }, // 42 g
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.91 }, // 43 g
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.81 }, // 44 g
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.81 }, // 45 g
	{ boss: 'enem3', type: 'enem33', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.81 }, // 46 g
	{ boss: 'enem3', type: 'enem33', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.81 }, // 47 g
	{ boss: 'enem3', type: 'enem33', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.81 }, // 48 g
	{ boss: 'enem3', type: 'enem33', xPos: 71, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.81 }, // 49 g
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.81 }, // 50 h
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.81 }, // 51 h
	{ boss: 'enem3', type: 'enem33', xPos: 5, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 14.81 }, // 52 h
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.97 }, // 53 h
	{ boss: 'enem3', type: 'enem33', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 16.81 }, // 54 h
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.87 }, // 55 h
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 17.01 }, // 56 h
	{ boss: 'enem3', type: 'enem33', xPos: 69, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 15.81 }, // 57 h
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.67 }, // 58 i
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.42 }, // 59 i
	{ boss: 'enem3', type: 'enem33', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 12.17 }, // 60 i
	{ boss: 'enem3', type: 'enem33', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.92 }, // 61 i
	{ boss: 'enem3', type: 'enem33', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem3.baseDamage, customSpeed: 11.67 }, // 62 i

	// ===== Сеточник =====
	{ boss: 'enem4', type: 'enem44', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.11 }, // 0 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.91 }, // 1 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.11 }, // 2 a
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.11 }, // 3 a
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.91 }, // 4 a
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.91 }, // 5 b
	{ boss: 'enem4', type: 'enem44', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.11 }, // 6 b
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.11 }, // 7 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.11 }, // 8 b
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.91 }, // 9 b
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.11 }, // 10 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.11 }, // 11 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.91 }, // 12 c
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.11 }, // 13 c
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.91 }, // 14 c
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.11 }, // 15 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.11 }, // 16 d
	{ boss: 'enem4', type: 'enem44', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.91 }, // 17 d
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.11 }, // 18 d
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.91 }, // 19 d
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.11 }, // 20 d
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.11 }, // 21 e
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.11 }, // 22 e
	{ boss: 'enem4', type: 'enem44', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.91 }, // 23 e
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.11 }, // 24 e
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.91 }, // 25 e
	{ boss: 'enem4', type: 'enem44', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.11 }, // 26 e
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.51 }, // 27 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.26 }, // 28 f
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.01 }, // 29 f
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.76 }, // 30 f
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.51 }, // 31 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.26 }, // 32 f
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.11 }, // 33 g
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.11 }, // 34 g
	{ boss: 'enem4', type: 'enem44', xPos: 13, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.91 }, // 35 g
	{ boss: 'enem4', type: 'enem44', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.11 }, // 36 g
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.11 }, // 37 g
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.11 }, // 38 g
	{ boss: 'enem4', type: 'enem44', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.11 }, // 39 h
	{ boss: 'enem4', type: 'enem44', xPos: 71, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.11 }, // 40 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.91 }, // 41 h
	{ boss: 'enem4', type: 'enem44', xPos: 11, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.91 }, // 42 h
	{ boss: 'enem4', type: 'enem44', xPos: 21, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 20.11 }, // 43 h
	{ boss: 'enem4', type: 'enem44', xPos: 12, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 21.11 }, // 44 h
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.61 }, // 45 i
	{ boss: 'enem4', type: 'enem44', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.36 }, // 46 i
	{ boss: 'enem4', type: 'enem44', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 12.11 }, // 47 i
	{ boss: 'enem4', type: 'enem44', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem4.baseDamage, customSpeed: 11.86 }, // 48 i

	// ===== Ульевластница =====
	{ boss: 'enem5', type: 'enem55', xPos: 90, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.29 }, // 0 a
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.49 }, // 1 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16.49 }, // 2 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.49 }, // 3 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.49 }, // 4 a
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.79 }, // 5 a
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.29 }, // 6 a
	{ boss: 'enem5', type: 'enem55', xPos: 12, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.29 }, // 7 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.49 }, // 8 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16.49 }, // 9 b
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.49 }, // 10 b
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.49 }, // 11 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.79 }, // 12 b
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.29 }, // 13 b
	{ boss: 'enem5', type: 'enem55', xPos: 13, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.29 }, // 14 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.49 }, // 15 c
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16.49 }, // 16 c
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.49 }, // 17 c
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.49 }, // 18 c
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.79 }, // 19 c
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.29 }, // 20 c
	{ boss: 'enem5', type: 'enem55', xPos: 11, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.29 }, // 21 d
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.49 }, // 22 d
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16.49 }, // 23 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.49 }, // 24 d
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.49 }, // 25 d
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.79 }, // 26 d
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.29 }, // 27 d
	{ boss: 'enem5', type: 'enem55', xPos: 91, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.29 }, // 28 e
	{ boss: 'enem5', type: 'enem55', xPos: 7, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.49 }, // 29 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16.49 }, // 30 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.49 }, // 31 e
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.49 }, // 32 e
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.79 }, // 33 e
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.29 }, // 34 e
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.43 }, // 35 f
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.18 }, // 36 f
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.93 }, // 37 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.68 }, // 38 f
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.43 }, // 39 f
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.18 }, // 40 f
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.93 }, // 41 f
	{ boss: 'enem5', type: 'enem55', xPos: 14, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.29 }, // 42 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.49 }, // 43 g
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16.49 }, // 44 g
	{ boss: 'enem5', type: 'enem55', xPos: 25, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.49 }, // 45 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 6, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.49 }, // 46 g
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.79 }, // 47 g
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.29 }, // 48 g
	{ boss: 'enem5', type: 'enem55', xPos: 9, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.39 }, // 49 g
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 16, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 6.29 }, // 50 h
	{ boss: 'enem5', type: 'enem55', xPos: 10, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 15.49 }, // 51 h
	{ boss: 'enem5', type: 'enem55', xPos: 23, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 16.49 }, // 52 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 8, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 17.49 }, // 53 h
	{ boss: 'enem5', type: 'enem55', xPos: 22, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 18.49 }, // 54 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 9, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 20.79 }, // 55 h
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 7, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 21.29 }, // 56 h
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.39 }, // 57 i
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 12.14 }, // 58 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.89 }, // 59 i
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.64 }, // 60 i
	{ boss: 'enem5', type: 'enem55', xPos: 70, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.39 }, // 61 i
	{ boss: 'enem5', type: 'enem55', xPos: 8, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 11.14 }, // 62 i
	{ boss: 'enem5', type: 'enem55', xPos: 24, yPos: 5, customHP: 1, customDamage: ENEMY_TYPES.enem5.baseDamage, customSpeed: 10.89 }, // 63 i

];

 const mBossDelayAb = [
	{ boss: 'enem1', bossDelayAb: 175, bossDelayAbDop: 12100, firstWaveDelayMs: 2490 }, // Тяжёлое крыло возвращается с внешней дуги
	{ boss: 'enem2', bossDelayAb: 176, bossDelayAbDop: 10600, firstWaveDelayMs: 2490 }, // Повторное пике возвращается в старую линию
	{ boss: 'enem3', bossDelayAb: 174, bossDelayAbDop: 16700, firstWaveDelayMs: 2490 }, // Последний клуб остаётся за направленным шлейфом
	{ boss: 'enem4', bossDelayAb: 178, bossDelayAbDop: 8500, firstWaveDelayMs: 2490 }, // Рамка ломает длину знакомой паузы
	{ boss: 'enem5', bossDelayAb: 171, bossDelayAbDop: 14700, firstWaveDelayMs: 2490 }, // Охрана смыкается после властного разлёта
];

 const bossAbilitiesDop = [
	// Гудень
	{ boss: 'enem1', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [0, 0, 0, 0], openingOrder: 0, label: "Крыло возвращается из внешнего облёта" },
	{ boss: 'enem1', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [600, 0, 300, 300], label: "Обратный гул тяжёлого крыла" },
	{ boss: 'enem1', indexAbilities: [10, 11, 12, 13, 14, 15], shotGapsMs: [0, 600, 300, 300, 300], label: "Пыльца остаётся после дуги" },
	{ boss: 'enem1', indexAbilities: [16, 17, 18, 19, 20, 21], shotGapsMs: [0, 0, 600, 300, 300], label: "Шмель обходит прежнюю опору" },
	{ boss: 'enem1', indexAbilities: [22, 23, 24, 25, 26, 27], shotGapsMs: [600, 300, 600, 300, 600], label: "Крыло накрывает обратный путь" },
	{ boss: 'enem1', indexAbilities: [28, 29, 30, 31], signature: true, isChain: true, shotDelayMs: 317, shotGapsMs: [0, 0, 0], openingOrder: 1, label: "Цепь неуклюжего облёта" },
	{ boss: 'enem1', indexAbilities: [32, 33, 34, 35, 36, 37, 38], minPhase: 2, shotGapsMs: [0, 0, 0, 300, 300, 600], label: "Внешняя дуга возвращается второй раз" },
	{ boss: 'enem1', indexAbilities: [39, 40, 41, 42, 43, 44, 45], minPhase: 3, shotGapsMs: [400, 0, 0, 400, 200, 600], label: "Длинный обратный взмах" },
	{ boss: 'enem1', indexAbilities: [46, 47, 48, 49, 50, 51], signature: true, isChain: true, minPhase: 3, shotDelayMs: 317, shotGapsMs: [0, 0, 0, 0, 0], label: "Цепь обратного тяжёлого крыла" },

	// Жалохват
	{ boss: 'enem2', indexAbilities: [0, 1, 2, 3, 4, 5], shotGapsMs: [0, 0, 0, 300, 0], openingOrder: 0, label: "Два пике и возврат к старому жалу" },
	{ boss: 'enem2', indexAbilities: [6, 7, 8, 9, 10], shotGapsMs: [0, 0, 0, 300], label: "Отступление оставляет новый укол" },
	{ boss: 'enem2', indexAbilities: [11, 12, 13, 14, 15, 16], shotGapsMs: [600, 300, 600, 0, 0], label: "Пыльца за повторным пике" },
	{ boss: 'enem2', indexAbilities: [17, 18, 19, 20, 21, 22], shotGapsMs: [600, 0, 0, 300, 300], label: "Жало повторяет правую линию" },
	{ boss: 'enem2', indexAbilities: [23, 24, 25, 26, 27, 28], shotGapsMs: [300, 0, 0, 300, 600], label: "Отход с новым двойным пике" },
	{ boss: 'enem2', indexAbilities: [29, 30, 31, 32, 33], signature: true, isChain: true, shotDelayMs: 317, shotGapsMs: [0, 0, 0, 0], openingOrder: 1, label: "Цепь повторных пике" },
	{ boss: 'enem2', indexAbilities: [34, 35, 36, 37, 38, 39, 40], minPhase: 2, shotGapsMs: [0, 600, 0, 300, 300, 0], label: "Третье пике после отхода" },
	{ boss: 'enem2', indexAbilities: [41, 42, 43, 44, 45, 46, 47], minPhase: 3, shotGapsMs: [600, 0, 200, 200, 600, 200], label: "Возврат с двумя новыми жалами" },
	{ boss: 'enem2', indexAbilities: [48, 49, 50, 51, 52, 53, 54], signature: true, isChain: true, minPhase: 3, shotDelayMs: 317, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Цепь жалящего отступления" },

	// Дымогон
	{ boss: 'enem3', indexAbilities: [0, 1, 2, 3, 4, 5, 6], shotGapsMs: [300, 0, 0, 0, 0, 0], openingOrder: 0, label: "Шлейф сгущается у обратного края" },
	{ boss: 'enem3', indexAbilities: [7, 8, 9, 10, 11, 12, 13], shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Правое сопло оставляет левый клуб" },
	{ boss: 'enem3', indexAbilities: [14, 15, 16, 17, 18, 19, 20], shotGapsMs: [200, 0, 0, 0, 0, 0], label: "Дым проходит вдоль тянущейся струи" },
	{ boss: 'enem3', indexAbilities: [21, 22, 23, 24, 25, 26, 27], shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Второй клуб в старом шлейфе" },
	{ boss: 'enem3', indexAbilities: [28, 29, 30, 31, 32, 33, 34], shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Возврат струи после накачки" },
	{ boss: 'enem3', indexAbilities: [35, 36, 37, 38, 39, 40, 41], signature: true, isChain: true, shotDelayMs: 317, shotGapsMs: [0, 0, 0, 0, 0, 0], openingOrder: 1, label: "Цепь густого шлейфа" },
	{ boss: 'enem3', indexAbilities: [42, 43, 44, 45, 46, 47, 48, 49], minPhase: 2, shotGapsMs: [0, 200, 0, 0, 0, 0, 0], label: "Второе уплотнение шлейфа" },
	{ boss: 'enem3', indexAbilities: [50, 51, 52, 53, 54, 55, 56, 57], minPhase: 3, shotGapsMs: [0, 0, 0, 0, 0, 200, 0], label: "Дым задержал последний выход" },
	{ boss: 'enem3', indexAbilities: [58, 59, 60, 61, 62], signature: true, isChain: true, minPhase: 3, shotDelayMs: 380, shotGapsMs: [0, 0, 0, 0], label: "Цепь обратного дыма" },

	// Сеточник
	{ boss: 'enem4', indexAbilities: [0, 1, 2, 3, 4], shotGapsMs: [330, 0, 330, 0], openingOrder: 0, label: "Короткий толчок и длинная рамка" },
	{ boss: 'enem4', indexAbilities: [5, 6, 7, 8, 9], shotGapsMs: [0, 340, 0, 340], label: "Рамка возвращается в иной паузе" },
	{ boss: 'enem4', indexAbilities: [10, 11, 12, 13, 14], shotGapsMs: [0, 0, 200, 400], label: "Обратный толчок после затишья" },
	{ boss: 'enem4', indexAbilities: [15, 16, 17, 18, 19, 20], shotGapsMs: [0, 200, 200, 200, 200], label: "Рамка удлиняет второй промежуток" },
	{ boss: 'enem4', indexAbilities: [21, 22, 23, 24, 25, 26], shotGapsMs: [200, 200, 200, 200, 200], label: "Соты возвращаются после сбоя" },
	{ boss: 'enem4', indexAbilities: [27, 28, 29, 30, 31, 32], signature: true, isChain: true, shotDelayMs: 317, shotGapsMs: [0, 0, 0, 0, 0], openingOrder: 1, label: "Цепь неровной рамки" },
	{ boss: 'enem4', indexAbilities: [33, 34, 35, 36, 37, 38], minPhase: 2, shotGapsMs: [200, 200, 200, 200, 0], label: "Пауза перестала чередоваться" },
	{ boss: 'enem4', indexAbilities: [39, 40, 41, 42, 43, 44], minPhase: 3, shotGapsMs: [200, 200, 200, 200, 200], label: "Рамка закрывается после двух задержек" },
	{ boss: 'enem4', indexAbilities: [45, 46, 47, 48], signature: true, isChain: true, minPhase: 3, shotDelayMs: 317, shotGapsMs: [0, 0, 0], label: "Цепь обратного толчка рамки" },

	// Ульевластница
	{ boss: 'enem5', indexAbilities: [0, 1, 2, 3, 4, 5, 6], shotGapsMs: [300, 0, 300, 300, 600, 300], openingOrder: 0, label: "Матка смыкает первый разлёт" },
	{ boss: 'enem5', indexAbilities: [7, 8, 9, 10, 11, 12, 13], shotGapsMs: [600, 300, 0, 300, 600, 0], label: "Правое крыло охраны не ушло" },
	{ boss: 'enem5', indexAbilities: [14, 15, 16, 17, 18, 19, 20], shotGapsMs: [600, 0, 600, 600, 300, 0], label: "Разлёт возвращается к сотам" },
	{ boss: 'enem5', indexAbilities: [21, 22, 23, 24, 25, 26, 27], shotGapsMs: [300, 0, 300, 600, 600, 300], label: "Вторая половина охраны" },
	{ boss: 'enem5', indexAbilities: [28, 29, 30, 31, 32, 33, 34], shotGapsMs: [600, 0, 600, 600, 0, 0], label: "Охрана возвращается за пыльцой" },
	{ boss: 'enem5', indexAbilities: [35, 36, 37, 38, 39, 40, 41], signature: true, isChain: true, shotDelayMs: 317, shotGapsMs: [0, 0, 0, 0, 0, 0], openingOrder: 1, label: "Цепь первого приказа" },
	{ boss: 'enem5', indexAbilities: [42, 43, 44, 45, 46, 47, 48, 49], minPhase: 2, shotGapsMs: [0, 300, 300, 300, 300, 300, 300], label: "Новый приказ поверх смыкания" },
	{ boss: 'enem5', indexAbilities: [50, 51, 52, 53, 54, 55, 56], minPhase: 3, shotGapsMs: [500, 250, 250, 500, 500, 0], label: "Улей закрывает весь разлёт" },
	{ boss: 'enem5', indexAbilities: [57, 58, 59, 60, 61, 62, 63], signature: true, isChain: true, minPhase: 3, shotDelayMs: 317, shotGapsMs: [0, 0, 0, 0, 0, 0], label: "Цепь последнего приказа" },

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
