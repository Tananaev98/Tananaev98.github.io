// Проверка ПЛАНА УНИКАЛЬНОСТИ БОЁВ (файл «ПЛАН_УНИКАЛЬНОСТИ_БОЁВ.txt» в корне).
// Читает блок #DATA-BEGIN..#DATA-END прямо из txt и проверяет: уникальность опыта,
// шаблонность/периодичность, реалистичность геометрии (реальная модель движка),
// кривую напора. Код возврата 1 при любом провале.
//   node scripts/plan-verify.js [путь к txt] [--verbose]
const fs = require('fs');
const path = require('path');
const model = require('./combo-model');

const FILE = process.argv.slice(2).find((a) => !a.startsWith('--')) || path.join(__dirname, '..', 'ПЛАН_УНИКАЛЬНОСТИ_БОЁВ.txt');
const VERBOSE = process.argv.includes('--verbose');
const ROLES = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
const AX = ['style', 'space', 'tempo', 'twist', 'arc'];
const N = 74;
const TWIST_STYLES = {
    ALT_BREAK: '*', TAIL_OTHER_SIDE: '*', EXTRA_HIT: '*', REVERSE_ORDER: '*', LANE_CLOSE: '*', MIRROR_PAIR: '*', DANGEROUS_BAIT: '*',
    FREQUENCY_ONLY: ['straight'], HONEST_VOLLEY: ['straight'], DRIFT_CROSS: ['drift'], CENTER_LEFT: ['drift'], DRIFT_TWINS: ['drift'],
    PAUSE_THRESHOLD: ['pause'], PAUSE_DOUBLE: ['pause'], RUSH_NO_CALM: ['lateRush'], RUSH_BAIT: ['lateRush'], ACCEL_NO_CALM: ['accelerate'],
    ACCEL_OVERTAKE: ['accelerate'], WEAVE_HANGTIME: ['weave'], WEAVE_MERGE: ['weave'], EDGE_CLAMP: ['weave', 'wave', 'drift'],
    WAVE_WIDTH: ['wave'], WAVE_FREQ: ['wave'], BARRICADE_COVER: '*'
};
const OVERRIDE_TEMPO = new Set(['REVERSE_ORDER', 'ACCEL_OVERTAKE', 'DANGEROUS_BAIT', 'PAUSE_DOUBLE', 'PAUSE_THRESHOLD', 'RUSH_NO_CALM', 'RUSH_BAIT', 'ACCEL_NO_CALM', 'WEAVE_HANGTIME', 'WEAVE_MERGE', 'WAVE_WIDTH', 'WAVE_FREQ', 'MIRROR_PAIR', 'EXTRA_HIT']);

const text = fs.readFileSync(FILE, 'utf8');
const a = text.indexOf('#DATA-BEGIN'), b = text.indexOf('#DATA-END');
if (a < 0 || b < 0) { console.error('нет блока данных #DATA-BEGIN/#DATA-END'); process.exit(1); }
const lines = text.slice(a, b).split(/\r?\n/);

// ---------- разбор
const levels = {}; const bosses = [];
let curL = null, curB = null;
const kv = (s) => { const o = {}; for (const m of s.matchAll(/(\w+)=(\S+)/g)) o[m[1]] = m[2]; return o; };
const num = (x) => Number(x);
const parseAb = (t) => { const m = t.match(/^(\d+)\/(\d+)\/(\d+)(?:\/w(\d+)-([\d.]+))?(?::(\w+))?$/); if (!m) throw new Error('плохая атака ' + t); return { x: +m[1], y: +m[2], s: +m[3], wa: m[4] !== undefined ? +m[4] : undefined, wf: m[5] !== undefined ? +m[5] : undefined, cls: m[6] }; };
for (const raw of lines) {
    const L = raw.trim();
    if (L.startsWith('LEVEL ')) {
        const n = +L.match(/^LEVEL (\d+)/)[1]; curL = { n, ...kv(L), phases: [] }; levels[n] = curL;
    } else if (L.startsWith('PHASE ')) { curL.phases.push(kv(L)); }
    else if (L.startsWith('BOSS ')) { const m = L.match(/^BOSS (\d+) (\w+) (.+)$/); curB = { n: +m[1], role: m[2], name: m[3], k: ROLES.indexOf(m[2]) }; bosses.push(curB); }
    else if (L.startsWith('AXES ')) curB.axes = kv(L);
    else if (L.startsWith('PROFILE ')) { curB.prof = kv(L); curB.prof.sv = curB.prof.speedVariance.split(',').map(Number); }
    else if (L.startsWith('SIG ')) curB.sig = L.slice(4).split(' ;; ').map((v) => v.trim().split(/\s+/).map(parseAb));
    else if (L.startsWith('POOL ')) curB.pool = L.slice(5).trim().split(/\s+/).map(parseAb);
    else if (L.startsWith('COMBOS ')) curB.combos = L.slice(7).split('|').map((c) => c.trim()).filter(Boolean).map((c) => c.split('.').map(Number));
    else if (L.startsWith('BARRICADE ')) curB.bar = kv(L);
    else if (L.startsWith('CHAIN ')) { const m = L.match(/a=(\w+):(\d+) b=(\w+):(\d+)/); curB.chain = { a: m[1], la: +m[2], b: m[3], lb: +m[4] }; }
}
const problems = []; const soft = [];
const P = (m) => problems.push(m), S = (m) => soft.push(m);

// ---------- V1 полнота
if (Object.keys(levels).length !== N) P(`V1 уровней ${Object.keys(levels).length}, нужно ${N}`);
for (let n = 1; n <= N; n++) { const bs = bosses.filter((x) => x.n === n); if (bs.length !== 5) P(`V1 уровень ${n}: боссов ${bs.length}`); }
const at = (n, role) => bosses.find((x) => x.n === n && x.role === role);

// ---------- V2 оси: внутри уровня и по соседним уровням той же роли
for (let n = 1; n <= N; n++) for (const ax of AX) {
    const vals = bosses.filter((x) => x.n === n).map((x) => x.axes[ax]);
    if (new Set(vals).size !== vals.length) P(`V2 уровень ${n}: повтор оси ${ax} внутри уровня (${vals.join('/')})`);
}
for (const r of ROLES) for (let n = 2; n <= N; n++) for (const ax of AX) {
    const p = at(n - 1, r), c = at(n, r); if (p && c && p.axes[ax] === c.axes[ax]) P(`V2 роль ${r}: ось ${ax} одинакова на уровнях ${n - 1} и ${n} (${c.axes[ax]})`);
}
for (const bo of bosses) {
    const st = TWIST_STYLES[bo.axes.twist];
    if (st === undefined) { P(`V3 неизвестный приём ${bo.axes.twist}`); continue; }
    if (st !== '*' && !st.includes(bo.axes.style)) P(`V3 ${bo.n}/${bo.role}: приём ${bo.axes.twist} несовместим со стилем ${bo.axes.style}`);
    if (bo.axes.twist === 'BARRICADE_COVER' && !bo.bar) P(`V3 ${bo.n}/${bo.role}: BARRICADE_COVER без баррикады`);
}

// ---------- V4 глобальное расстояние между боссами и уникальность тройки
let dist2 = 0, tri = 0; const triSeen = new Map();
for (let i = 0; i < bosses.length; i++) {
    const k = `${bosses[i].axes.space}|${bosses[i].axes.tempo}|${bosses[i].axes.twist}`;
    if (triSeen.has(k)) { tri++; P(`V4 тройка (пространство, ритм, приём) ${k} у ${bosses[i].n}/${bosses[i].role} и ${triSeen.get(k)}`); } else triSeen.set(k, `${bosses[i].n}/${bosses[i].role}`);
    for (let j = i + 1; j < bosses.length; j++) {
        let e = 0; for (const x of AX) if (bosses[i].axes[x] === bosses[j].axes[x]) e++;
        if (e >= 3) { dist2++; if (VERBOSE || dist2 <= 8) P(`V4 боссы ${bosses[i].n}/${bosses[i].role} и ${bosses[j].n}/${bosses[j].role} совпадают по ${e} осям из 5`); }
    }
}
// соседние уровни: один и тот же приём
for (let n = 2; n <= N; n++) {
    const pa = new Set(bosses.filter((x) => x.n === n - 1).map((x) => x.axes.twist)); const ca = bosses.filter((x) => x.n === n).map((x) => x.axes.twist);
    const inter = ca.filter((t) => pa.has(t)).length;
    if (inter > 1) S(`V4 уровни ${n - 1}/${n}: общих приёмов ${inter} (допустимо не более 1)`);
}

// ---------- V5 геометрия: реальная модель, три фазы
function synth(bo) {
    const lv = levels[bo.n];
    const phases = lv.phases.map((p) => ({ cadence: +p.cadence, speed: +p.speed }));
    return { bossCombatConfig: { minShotDelay: +lv.minShotDelay, phases, bosses: { [bo.role]: { speedMultiplier: +bo.prof.speedMultiplier, cadence: +bo.prof.cadence, speedVariance: bo.prof.sv } } }, mBossDelayAb: [{ boss: bo.role, bossDelayAb: +bo.prof.bossDelayAb }] };
}
const objsOf = (arr, role) => arr.map((a) => ({ boss: role, xPos: a.x, yPos: a.y, customSpeed: a.s }));
const tripleSeen = {}; ROLES.forEach((r) => (tripleSeen[r] = new Map()));
const comboSeen = new Map();
let nCombos = 0, badCombos = 0;
for (const bo of bosses) {
    const lv = synth(bo); const pool = bo.pool; const objs = objsOf(pool, bo.role);
    // тройки
    const inBoss = new Set();
    for (const t of pool) {
        const key = `${t.x}/${t.y}/${t.s}`;
        if (inBoss.has(key)) P(`V5 ${bo.n}/${bo.role}: повтор атаки ${key} внутри босса`); inBoss.add(key);
        if (tripleSeen[bo.role].has(key)) P(`V5 роль ${bo.role}: атака ${key} уже на уровне ${tripleSeen[bo.role].get(key)} (${bo.n})`); else tripleSeen[bo.role].set(key, bo.n);
        if (bo.axes.style === 'wave' && t.wa === undefined) P(`V5 ${bo.n}/${bo.role}: wave-атака ${key} без waveAmplitude/waveFrequency`);
        if (bo.axes.style !== 'wave' && t.wa !== undefined) P(`V5 ${bo.n}/${bo.role}: параметры wave у не-wave босса`);
    }
    // сигнатура = первые k пула; комбо-варианты
    const sigLen = bo.sig[bo.sig.length - 1].length;
    bo.sig.forEach((v, vi) => {
        const idxs = v.map((_, i) => i); nCombos++;
        for (let ph = 0; ph < 3; ph++) { const r = model.analyze(lv, bo.role, objs, idxs, ph); const vd = model.verdict(r); if (!vd.ok) { badCombos++; P(`V5 ${bo.n}/${bo.role} сигнатура[${vi}] фаза${ph + 1}: ${vd.why}`); break; } }
        v.forEach((t, i) => { const p = pool[i]; if (!p || p.x !== t.x || p.y !== t.y || p.s !== t.s) P(`V5 ${bo.n}/${bo.role}: сигнатура не совпадает с началом пула`); });
    });
    // комбо
    for (const c of bo.combos) {
        nCombos++; if (c.some((i) => i < 0 || i >= pool.length)) { P(`V5 ${bo.n}/${bo.role}: индекс комбо вне пула`); continue; }
        if (c.length > 1) for (let ph = 0; ph < 3; ph++) { const vd = model.verdict(model.analyze(lv, bo.role, objs, c, ph)); if (!vd.ok) { badCombos++; P(`V5 ${bo.n}/${bo.role} комбо [${c}] фаза${ph + 1}: ${vd.why}`); break; } }
    }
    const usedIdx = new Set(); bo.combos.forEach((c) => c.forEach((i) => usedIdx.add(i)));
    for (let i = bo.sig[bo.sig.length - 1].length; i < pool.length; i++) if (!usedIdx.has(i)) P(`V5 ${bo.n}/${bo.role}: атака #${i} не входит ни в одно комбо`);
    const ck = bo.role + '|' + bo.combos.map((c) => c.join('.')).join(' ') + '|' + bo.sig.map((v) => v.map((t) => `${t.x}/${t.y}/${t.s}`).join(',')).join(';');
    if (comboSeen.has(ck)) P(`V5 структура комбо ${bo.n}/${bo.role} повторяет ${comboSeen.get(ck)}`); comboSeen.set(ck, `${bo.n}/${bo.role}`);
}
// атаки разных боссов одного уровня
for (let n = 1; n <= N; n++) {
    const seen = new Map();
    for (const bo of bosses.filter((x) => x.n === n)) for (const t of bo.pool) { const k = `${t.x}/${t.y}/${t.s}`; if (seen.has(k) && seen.get(k) !== bo.role) P(`V5 уровень ${n}: атака ${k} у двух боссов (${seen.get(k)}, ${bo.role})`); seen.set(k, bo.role); }
}

// ---------- V6 семантика приёмов (что реально нарисовано в данных)
const side = (x) => (x < 50 ? 'L' : 'R');
for (const bo of bosses) {
    const t = bo.axes.twist; const sg = bo.sig[bo.sig.length - 1]; const lv = synth(bo);
    const chk = (cond, msg) => { if (!cond) P(`V6 ${bo.n}/${bo.role} ${t}: ${msg}`); };
    const s0 = sg[0], s1 = sg[1], last = sg[sg.length - 1];
    switch (t) {
        case 'DRIFT_CROSS': chk(Math.abs(50 - s0.x) >= 4 && Math.abs(50 - s0.x) <= 10 && Math.abs(s1.x - 50) >= 4 && Math.abs(s1.x - 50) <= 10 && side(s0.x) !== side(s1.x), 'старт должен быть в 4-10% от центра по разные стороны'); break;
        case 'CENTER_LEFT': chk(s0.x === 50 && s1.x === 50, 'первые две атаки строго x=50'); break;
        case 'DRIFT_TWINS': chk(s0.x + s1.x === 100 && Math.abs(s0.x - 50) >= 14 && Math.abs(s0.x - 50) <= 24, 'зеркальный отступ 14-24'); break;
        case 'PAUSE_THRESHOLD': chk(s0.y === 38 && s1.y === 34, 'высоты 38 и 34 (порог паузы 42% ≈ y 36)'); break;
        case 'PAUSE_DOUBLE': chk(Math.abs(s0.x - s1.x) >= 3 && Math.abs(s0.x - s1.x) <= 6, 'две атаки в 3-6% друг от друга'); break;
        case 'RUSH_NO_CALM': chk(s0.y >= 46 && s0.s <= 6 && sg.some((q, i) => i > 0 && q.y < 45), 'первая выше порога рывка y≥46, парная ниже'); break;
        case 'RUSH_BAIT': chk(s0.y >= 44 && s0.y <= 48 && s0.s <= 7, 'медленная приманка y 44-48'); break;
        case 'ACCEL_NO_CALM': chk(sg.some((q) => q.y <= 10) && sg.some((q) => q.y >= 28), 'контраст высот старта'); break;
        case 'WEAVE_HANGTIME': chk(s0.s === 9 && s1.s === 15, 'скорости 9 и 15'); break;
        case 'WEAVE_MERGE': chk(Math.abs(s1.x - s0.x) === 8, 'разрыв старта ровно 8%'); break;
        case 'EDGE_CLAMP': chk(s0.x <= 6 && s1.x >= 88, 'старт у обеих кромок'); break;
        case 'WAVE_WIDTH': chk(s0.wf === s1.wf && Math.min(s0.wa, s1.wa) === 3 && Math.max(s0.wa, s1.wa) === 11, 'амплитуды 3 и 11 при одной частоте'); break;
        case 'WAVE_FREQ': chk(s0.wa === s1.wa && s0.wf === 0.9 && s1.wf === 1.7, 'частоты 0.9 и 1.7 при одной амплитуде'); break;
        case 'MIRROR_PAIR': chk(Math.abs(s0.x + s1.x - 100) <= 1 && s0.s >= 18 && s1.s <= 11, 'зеркало по x, скорости ≥18 и ≤11'); break;
        case 'DANGEROUS_BAIT': chk(s0.s <= 6 && Math.abs(s0.x - last.x) <= 5, 'медленная приманка в полосе последней атаки'); break;
        case 'BARRICADE_COVER': chk(bo.bar && Math.abs(s0.x - +bo.bar.x) <= 3, 'быстрая атака в полосе баррикады'); break;
        case 'TAIL_OTHER_SIDE': chk(side(last.x) !== side(s0.x) && sg.slice(0, -1).every((q) => side(q.x) === side(s0.x)), 'хвост с другой стороны'); break;
        case 'ALT_BREAK': chk(sg.length >= 3 && side(sg[sg.length - 1].x) === side(sg[sg.length - 2].x), 'последние две с одной стороны'); break;
        case 'EXTRA_HIT': chk(bo.sig.length === 2 && bo.sig[1].length === bo.sig[0].length + 1, 'нужны два варианта серии, второй на 1 длиннее'); break;
        case 'LANE_CLOSE': chk(sg.length >= 3 && sg[0].x < 30 && sg[1].x > 70 && sg[2].x >= 40 && sg[2].x <= 60, 'левая кромка, правая кромка, затем центр'); break;
        case 'REVERSE_ORDER': case 'ACCEL_OVERTAKE': { const r = model.analyze(lv, bo.role, objsOf(sg, bo.role), sg.map((_, i) => i), 0); chk(r.arrivals[r.arrivals.length - 1] < r.arrivals[0], 'последняя по появлению атака должна прилетать раньше первой'); break; }
    }
}

// ---------- V7 числа профилей и уровней: уникальность и допустимые диапазоны
for (const r of ROLES) for (const key of ['cadence', 'telegraphMs', 'speedMultiplier', 'bossDelayAb', 'bossDelayAbDop']) {
    const seen = new Map();
    for (const bo of bosses.filter((x) => x.role === r)) { const v = bo.prof[key]; if (seen.has(v)) P(`V7 ${r}.${key}=${v} на уровнях ${seen.get(v)} и ${bo.n}`); else seen.set(v, bo.n); }
}
const tp = new Set(), pm = new Set();
for (let n = 1; n <= N; n++) { const l = levels[n]; const t = l.timeNextBoss + '/' + l.bossInterval; if (tp.has(t)) P(`V7 пара timeNextBoss/bossInterval ${t} повторяется`); tp.add(t); const m = l.phases.map((p) => p.maxActiveAttacks).join('/'); if (pm.has(m)) P(`V7 тройка maxActiveAttacks ${m} повторяется`); pm.add(m); }
for (const key of ['levelCadence', 'minWaveDelay', 'minShotDelay', 'minTelegraphMs']) {
    const seen = new Map(); for (let n = 1; n <= N; n++) { const v = levels[n][key]; if (seen.has(v)) S(`V7 ${key}=${v} на уровнях ${seen.get(v)} и ${n} (следствие формулы напора; смысловой повтор только если совпадает мотив)`); else seen.set(v, n); }
}
const barSeen = new Set(), chainSeen = new Set();
for (const bo of bosses) {
    if (bo.bar) { const k = bo.bar.x + '/' + bo.bar.y; if (barSeen.has(k)) P(`V7 баррикада ${k} повторяется`); barSeen.add(k); if (+bo.bar.x === 50) P('V7 баррикада x=50'); if (+bo.bar.pauseMs !== +bo.bar.hits * 400) P(`V7 ${bo.n}/${bo.role}: pauseMs != hits×400`); }
    if (bo.chain) { const k = JSON.stringify(bo.chain); if (chainSeen.has(k)) P(`V7 цепь ${k} повторяется`); chainSeen.add(k); }
}
for (const r of ROLES) for (let n = 2; n <= N; n++) { const p = at(n - 1, r), c = at(n, r); if (p.chain && c.chain && (p.chain.a === c.chain.a || p.chain.b === c.chain.b)) P(`V7 роль ${r}: форма цепи повторена на уровнях ${n - 1}/${n}`); if (p.bar && c.bar && (+p.bar.x < 47) === (+c.bar.x < 47)) P(`V7 роль ${r}: баррикада на той же стороне на уровнях ${n - 1}/${n}`); }

// ---------- V8 шаблонность: периодичность, баланс, сходство соседей
const seqOf = (r, ax) => Array.from({ length: N }, (_, i) => at(i + 1, r).axes[ax]);
for (const ax of AX) for (const r of ROLES) {
    const s = seqOf(r, ax);
    const dom = new Set(bosses.map((x) => x.axes[ax])).size;
    for (let lag = 1; lag <= 12; lag++) { let eq = 0, tot = 0; for (let i = 0; i + lag < N; i++) { tot++; if (s[i] === s[i + lag]) eq++; } const frac = eq / tot; const lim = Math.max(0.34, 3.2 / dom); if (frac > lim) P(`V8 периодичность: роль ${r}, ось ${ax}, сдвиг ${lag} совпадает в ${(frac * 100).toFixed(0)}% уровней`); }
}
// циклический сдвиг ролей между соседними уровнями (n+1 = n, повёрнутый по ролям)
for (let n = 2; n <= N; n++) for (const ax of ['twist', 'space', 'tempo']) {
    const a1 = ROLES.map((r) => at(n - 1, r).axes[ax]), a2 = ROLES.map((r) => at(n, r).axes[ax]);
    for (let sh = 1; sh < 5; sh++) { let e = 0; for (let i = 0; i < 5; i++) if (a1[i] === a2[(i + sh) % 5]) e++; if (e >= 3) P(`V8 уровень ${n}: ось ${ax} — почти циклический сдвиг ролей уровня ${n - 1} (сдвиг ${sh}, совпадений ${e})`); }
}
for (const ax of AX) {
    const cnt = {}; bosses.forEach((x) => (cnt[x.axes[ax]] = (cnt[x.axes[ax]] || 0) + 1));
    const dom = Object.keys(cnt).length, mean = bosses.length / dom;
    for (const [v, c] of Object.entries(cnt)) if (c > mean * 1.6 || c < mean * 0.4) S(`V8 баланс: ${ax}=${v} встречается ${c} раз (среднее ${mean.toFixed(1)})`);
}
// стили внутри областей
const AREAS = [[1, 15], [16, 25], [26, 30], [31, 40], [41, 65], [66, 74]];
for (const [s, e] of AREAS) { const cnt = {}; let tot = 0; bosses.filter((x) => x.n >= s && x.n <= e).forEach((x) => { cnt[x.axes.style] = (cnt[x.axes.style] || 0) + 1; tot++; }); for (const [v, c] of Object.entries(cnt)) if (c / tot > 0.32) P(`V8 область ${s}-${e}: стиль ${v} занимает ${(100 * c / tot).toFixed(0)}% боссов`); }
// идентичность уровней
const pairs = new Set();
for (let n = 1; n <= N; n++) { const k = levels[n].shape + '|' + levels[n].motif; if (pairs.has(k)) P(`V8 пара (профиль напора, мотив) ${k} повторяется`); pairs.add(k); if (n > 1 && levels[n].motif === levels[n - 1].motif) P(`V8 мотив ${levels[n].motif} на соседних уровнях ${n - 1}/${n}`); }
for (let n = 4; n <= N; n++) { const last = [1, 2, 3].map((d) => levels[n - d].shape); if (last.includes(levels[n].shape) && !/CALM_THEN_HARD|RAMP/.test(levels[n].shape)) S(`V8 профиль напора ${levels[n].shape} повторяется в окне 3 уровней (уровень ${n})`); }

// ---------- V9 кривая напора и плотность
const I = Array.from({ length: N }, (_, i) => +levels[i + 1].I);
const meanSize = Array.from({ length: N }, (_, i) => { const bs = bosses.filter((x) => x.n === i + 1); let s = 0, c = 0; bs.forEach((b) => b.combos.forEach((cm) => { s += cm.length; c++; })); return s / c; });
const corr = (x, y) => { const mx = x.reduce((a, b) => a + b) / x.length, my = y.reduce((a, b) => a + b) / y.length; let n = 0, dx = 0, dy = 0; x.forEach((v, i) => { n += (v - mx) * (y[i] - my); dx += (v - mx) ** 2; dy += (y[i] - my) ** 2; }); return n / Math.sqrt(dx * dy); };
const c1 = corr(I, I.map((_, i) => i)), c2 = corr(I, meanSize);
if (c1 < 0.6) P(`V9 напор почти не растёт по кампании (корреляция ${c1.toFixed(2)})`);
if (c2 < 0.45) S(`V9 средний размер серии слабо следует за напором (корреляция ${c2.toFixed(2)})`);
for (let i = 0; i + 5 <= N; i++) { const w = meanSize.slice(i, i + 5); const rng = Math.max(...w) - Math.min(...w); if (rng < 0.12) S(`V9 плато: уровни ${i + 1}-${i + 5} — средний размер серии почти не меняется (размах ${rng.toFixed(2)})`); }
for (const [s, e] of AREAS) { const lastI = I[e - 1]; const maxI = Math.max(...I.slice(s - 1, e)); if (lastI < maxI - 0.001 && e - s > 3) P(`V9 финал области ${s}-${e} не является пиком напора`); }
const lo66 = meanSize.slice(65, 70).reduce((a, b) => a + b) / 5, hi = meanSize.slice(0, 15).reduce((a, b) => a + b) / 15;
console.log(`Файл: ${FILE}`);
console.log(`боссов ${bosses.length}, комбо проверено ${nCombos}, нарушений раздела 9.1 в данных плана ${badCombos}`);
console.log(`напор: корреляция с номером ${c1.toFixed(2)}, размер серии ~ напор ${c2.toFixed(2)}; ср. серия уровни 1-15: ${hi.toFixed(2)}, 66-70: ${lo66.toFixed(2)}`);
console.log(`пар боссов, совпадающих по ≥3 осям: ${dist2}; повторов тройки (пространство,ритм,приём): ${tri}`);
if (soft.length) { console.log(`\nЗАМЕЧАНИЯ (${soft.length}):`); soft.slice(0, VERBOSE ? 999 : 12).forEach((x) => console.log('  ~ ' + x)); }
if (problems.length) {
    console.log(`\nПРОВАЛЫ (${problems.length}):`);
    const by = {}; problems.forEach((p) => { const k = p.split(' ')[0]; by[k] = (by[k] || 0) + 1; });
    console.log('  по группам:', JSON.stringify(by));
    problems.slice(0, VERBOSE ? 9999 : 40).forEach((x) => console.log('  ! ' + x));
    process.exit(1);
}
console.log('\nПЛАН ПРОШЁЛ ВСЕ ПРОВЕРКИ.');
