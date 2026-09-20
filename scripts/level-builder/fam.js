// Семейства приёмов: каждое — ОТДЕЛЬНОЕ решение игрока (порядок/сторона/ритм), не траектория.
// Функция семейства возвращает список «битов» {x, at (мс прилёта в ф.1), c (класс скорости S/M/F)} и ожидаемый порядок прилёта.
// Подбор скоростей и высот, проверка 9.1 в трёх фазах, зоны спавна — в lib.tryCombo (построение, не проверка готовности).
const { rng } = require('./rand');
const SPEEDS = { S: [2, 3, 4, 5, 6, 7, 8], M: [9, 10, 11, 12, 13, 14, 15], F: [16, 18, 20, 22, 24] };

const flip = (x, mir) => (mir ? 100 - x : x);
const L = (r) => r.int(6, 24), R = (r) => r.int(76, 94), C = (r) => r.int(30, 34);

const FAMILIES = {
    // фаст-обгон: медленное с одной стороны появляется первым, быстрое с другой прилетает раньше (привычка: бить по порядку появления)
    REVERSE(r, m, o = {}) { const T = r.int(2400, 3300), g = r.int(1000, 1450);
        const beats = [{ x: flip(L(r), m), at: T + g, c: 'S' }, { x: flip(R(r), m), at: T, c: r.pick(['M', 'F']) }];
        if (o.three === true || (o.three !== false && r.chance(0.5))) beats.push({ x: flip(C(r), m), at: T + Math.round(g * r.range(0.4, 0.6)), c: 'M' });
        return { beats, exp: beats.length === 2 ? '21' : '231' }; },
    // ложный след: серия с одной стороны, последний удар с противоположной (привычка: серия идёт с одной стороны — значит и конец)
    TAIL_FAR(r, m) { const n = r.int(2, 4), T = r.int(2300, 3000), gap = r.int(300, 420); const beats = []; let x = m ? r.int(76, 88) : r.int(8, 18);
        for (let i = 0; i < n; i++) { beats.push({ x: flip(x, false), at: T + i * gap, c: 'M' }); x += (m ? -1 : 1) * r.int(6, 10); }
        beats.push({ x: m ? r.int(8, 20) : r.int(80, 92), at: T + (n - 1) * gap + r.int(720, 860), c: 'S' });
        return { beats, exp: beats.map((_, i) => i + 1).join('') }; },
    // загон: фланг, фланг, затем медленный низ-центр (привычка: после флангов центр безопасен)
    CENTER_CLOSER(r, m) { const T = r.int(2300, 3200), g = r.int(640, 900), g2 = r.int(560, 800);
        return { beats: [{ x: flip(L(r), m), at: T, c: 'M' }, { x: flip(R(r), m), at: T + g, c: 'M' }, { x: r.int(44, 56), at: T + g + g2, c: 'S', low: true }], exp: '123' }; },
    // двойной удар в одну полосу: игрок отбил и расслабился — второй уже летит (привычка: одна атака = один клик)
    DOUBLE_LANE(r, m, o = {}) { const T = r.int(2400, 3200), gap = r.int(260, 380), x = flip(r.chance(0.5) ? L(r) : R(r), m);
        const beats = [{ x, at: T, c: 'M' }, { x: x + r.pick([-3, 3]), at: T + gap, c: 'M' }];
        if (o.three === true || (o.three !== false && r.chance(0.5))) beats.push({ x: flip(x > 50 ? L(r) : R(r), false), at: T + gap + r.int(720, 840), c: 'S' });
        return { beats, exp: beats.map((_, i) => i + 1).join('') }; },
    // ускоряющийся круг: L, L, R, R с сокращающимися интервалами (привычка: ровный ритм)
    ACCEL_RING(r, m) { const T = r.int(2300, 2900), a = r.int(520, 620), b = r.int(380, 460);
        return { beats: [{ x: flip(L(r), m), at: T, c: 'M' }, { x: flip(L(r) + 10, m), at: T + a, c: 'M' }, { x: flip(R(r), m), at: T + a + r.int(680, 760), c: 'M' }, { x: flip(R(r) - 8, m), at: T + a + r.int(680, 760) + b, c: 'S' }], exp: '1234' }; },
    // ложное затишье: два быстрых подряд, тишина, третий — расслабился и пропустил
    LULL(r, m) { const T = r.int(2300, 2800), g1 = r.int(240, 340), g2 = r.int(780, 950), s = flip(r.chance(0.5) ? L(r) : R(r), m);
        return { beats: [{ x: s, at: T, c: 'M' }, { x: s + r.pick([-8, 8]), at: T + g1, c: 'M' }, { x: s + r.pick([-4, 4, 12, -12]), at: T + g1 + g2, c: 'S' }], exp: '123' }; },
    // одновременный кластер: три цели на одном фланге почти вместе (привычка: бью по очереди слева направо)
    CLUSTER(r, m) { const T = r.int(2400, 3200), s = flip(r.chance(0.5) ? r.int(10, 16) : r.int(80, 88), m), st = r.int(110, 230); const d = s < 50 ? 1 : -1;
        const xs = [s, s + d * r.int(9, 13), s + d * r.int(20, 26)]; const perm = r.pick([[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]]);
        const beats = perm.map((xi, k) => ({ x: xs[xi], at: T + k * st, c: 'M' }));
        return { beats, exp: '123' }; },
    // зеркало с запаздыванием: слева и справа симметрично, вторая — медленнее (привычка: идти за ближайшей)
    MIRROR(r, m) { const T = r.int(2400, 3100), g = r.int(700, 830), x = r.int(10, 22);
        return { beats: [{ x: flip(x, m), at: T, c: 'M' }, { x: flip(100 - x - 6, m), at: T + g, c: 'S' }], exp: '12' }; },
    // лестница: шаг по x на одной диагонали, каждая следующая ниже/медленнее (привычка: ждать волны на месте)
    STAIR(r, m) { const T = r.int(2300, 2900), n = r.int(3, 4), st = r.int(7, 10), x0 = m ? r.int(70, 82) : r.int(8, 16), gap = r.int(380, 480); const beats = [];
        for (let i = 0; i < n; i++) beats.push({ x: m ? x0 - st * i : x0 + st * i, at: T + i * gap, c: i === n - 1 ? 'S' : 'M' });
        return { beats, exp: beats.map((_, i) => i + 1).join('') }; },
    // веер наружу: от центра-лево к краю (привычка: у края безопаснее)
    FAN_OUT(r, m) { const T = r.int(2300, 3000), gap = r.int(330, 440);
        return { beats: [{ x: flip(r.int(28, 33), m), at: T, c: 'M' }, { x: flip(r.int(16, 22), m), at: T + gap, c: 'M' }, { x: flip(r.int(5, 12), m), at: T + 2 * gap, c: 'S' }], exp: '123' }; },
    // воронка: с края внутрь и перекрытие другой стороны
    FUNNEL(r, m) { const T = r.int(2400, 3100), g = r.int(700, 800);
        return { beats: [{ x: flip(r.int(6, 12), m), at: T, c: 'M' }, { x: flip(r.int(24, 30), m), at: T + r.int(280, 380), c: 'M' }, { x: flip(r.int(84, 92), m), at: T + g + 320, c: 'S' }], exp: '123' }; },
    // синкопа: неровные интервалы на одной стороне
    SYNCOPE(r, m) { const T = r.int(2300, 2900), gaps = r.pick([[180, 520], [300, 130], [140, 610], [420, 200]]), s = flip(r.chance(0.5) ? 16 : 82, m);
        const x = (k) => s + (s < 50 ? 1 : -1) * k;
        return { beats: [{ x: x(0), at: T, c: 'M' }, { x: x(9), at: T + gaps[0], c: 'M' }, { x: x(4), at: T + gaps[0] + gaps[1], c: 'M' }], exp: '123' }; },
    // чересполосица: слева, справа, снова слева (привычка: закончил слева — остаюсь слева)
    INTERLEAVE(r, m) { const T = r.int(2300, 2900), g = r.int(680, 780);
        return { beats: [{ x: flip(L(r), m), at: T, c: 'M' }, { x: flip(R(r), m), at: T + g, c: 'M' }, { x: flip(L(r) + 4, m), at: T + 2 * g - r.int(0, 60), c: 'S' }], exp: '123' }; },
    // развёртка: слева-направо через центр-низ с одинаковым шагом (привычка: жду у центра)
    SWEEP(r, m) { const T = r.int(2400, 3000), g = r.int(640, 720);
        return { beats: [{ x: flip(r.int(8, 20), m), at: T, c: 'M' }, { x: r.int(42, 58), at: T + g, c: 'S', low: true }, { x: flip(r.int(80, 92), m), at: T + 2 * g, c: 'M' }], exp: '123' }; },
    // эхо: два удара, короткая пауза, те же две полосы ещё раз (привычка: пара закончилась — можно отвлечься)
    ECHO(r, m) { const T = r.int(2300, 2800), g = r.int(240, 330), p = r.int(560, 700), x1 = flip(L(r), m), x2 = flip(R(r), m);
        return { beats: [{ x: x1, at: T, c: 'M' }, { x: x1 + (x1 < 50 ? 9 : -9), at: T + g, c: 'M' }, { x: x1 + (x1 < 50 ? 4 : -4), at: T + g + p, c: 'M' }, { x: x1 + (x1 < 50 ? 13 : -13), at: T + 2 * g + p, c: 'S' }], exp: '1234' }; },
    // тройной тап: три удара в одну полосу (привычка: один клик на полосу)
    TRIPLE_TAP(r, m) { const T = r.int(2300, 2900), g = r.int(300, 400), x = flip(r.chance(0.5) ? L(r) : R(r), m), d = x < 50 ? 1 : -1;
        return { beats: [{ x, at: T, c: 'M' }, { x: x + d * 3, at: T + g, c: 'M' }, { x: x - d * 2, at: T + 2 * g + r.int(0, 60), c: 'S' }], exp: '123' }; },
    // двойной обгон: две медленные с одной стороны появляются раньше двух быстрых с другой, быстрые прилетают первыми
    OVERTAKE2(r, m) { const T = r.int(2300, 2800), g = r.int(560, 680);
        return { beats: [{ x: flip(L(r), m), at: T + g, c: 'S' }, { x: flip(L(r) + 8, m), at: T + g + r.int(180, 300), c: 'S' }, { x: flip(R(r), m), at: T, c: 'M' }, { x: flip(R(r) - 7, m), at: T + r.int(180, 300), c: 'M' }], exp: '3412' }; },
    // очередь над медленным: медленный дальний удар появляется первым, а три быстрых на ближней стороне успевают раньше (привычка: сначала замечаю то, что появилось первым)
    BURST_OVER_SLOW(r, m) { const T = r.int(2300, 2800), st = r.int(140, 210), far = r.int(1200, 1450), x = flip(r.chance(0.5) ? 14 : 84, m), d = x < 50 ? 1 : -1;
        return { beats: [{ x: 100 - x, at: T + far, c: 'S' }, { x, at: T, c: 'M' }, { x: x + d * r.int(8, 12), at: T + st, c: 'M' }, { x: x + d * r.int(18, 24), at: T + 2 * st, c: 'M' }], exp: '2341' }; },
    // замедление: интервалы растут — последний удар опаздывает (привычка: темп уже понятен)
    RITARD(r, m) { const T = r.int(2300, 2800), g1 = r.int(200, 280), g2 = r.int(480, 620), x = flip(r.chance(0.5) ? 12 : 86, m), d = x < 50 ? 1 : -1;
        return { beats: [{ x, at: T, c: 'M' }, { x: x + d * r.int(8, 12), at: T + g1, c: 'M' }, { x: x + d * r.int(2, 6), at: T + g1 + g2, c: 'M' }], exp: '123' }; },
    // пары 2+2: пара слева почти вместе, пара справа (привычка: пара = один взгляд)
    PAIRS_2x2(r, m) { const T = r.int(2300, 2700), st = r.int(110, 160), g = r.int(700, 780), a = flip(L(r), m), b = flip(R(r), m);
        return { beats: [{ x: a, at: T, c: 'M' }, { x: a + (a < 50 ? 9 : -9), at: T + st, c: 'M' }, { x: b, at: T + g, c: 'M' }, { x: b + (b < 50 ? 9 : -9), at: T + g + st, c: 'M' }], exp: '1234' }; },
    // внутренние полосы: удары идут по полосам между краем и боссом (привычка: угроза только по краям)
    INNER_LANES(r, m) { const T = r.int(2300, 2800), g = r.int(340, 420), h = r.int(650, 740);
        return { beats: [{ x: flip(r.int(6, 12), m), at: T, c: 'M' }, { x: flip(r.int(29, 31), m), at: T + g, c: 'M' }, { x: flip(r.int(69, 71), m), at: T + g + h, c: 'M' }, { x: flip(r.int(88, 94), m), at: T + g + h + g, c: 'S' }], exp: '1234' }; },
    // одиночный
    SINGLE(r, m) { return { beats: [{ x: flip(r.chance(0.5) ? r.int(8, 24) : r.int(76, 92), m), at: r.int(2800, 4200), c: 'S' }], exp: '1' }; },
    // пара
    PAIR(r, m) { const T = r.int(2400, 3200), same = r.chance(0.5), g = same ? r.int(380, 560) : r.int(720, 880);
        const x = r.chance(0.5) ? L(r) : R(r); return { beats: [{ x, at: T, c: 'M' }, { x: same ? x + (x < 50 ? 10 : -10) : 100 - x, at: T + g, c: r.pick(['M', 'S']) }], exp: '12' }; }
};

const FREE = new Set(['CLUSTER', 'SYNCOPE', 'RITARD', 'FAN_OUT', 'STAIR', 'TRIPLE_TAP', 'INNER_LANES', 'LULL', 'ECHO', 'PAIRS_2x2', 'FUNNEL']);
for (const k of Object.keys(FAMILIES)) if (FREE.has(k)) { const f0 = FAMILIES[k]; FAMILIES[k] = (r, m, o) => { const res = f0(r, m, o); if (res.beats.length >= 3 && r.chance(0.55)) { const i = r.int(1, res.beats.length - 1); res.beats[i].c = res.beats[i].c === 'S' ? 'M' : 'S'; } return res; }; }
module.exports = { FAMILIES, SPEEDS };
