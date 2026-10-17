// fixdup.js N enemK — лечит повторы геометрии x/y/скорость с другими уровнями: у атаки-нарушителя сдвигает желаемый прилёт (меняется y старта → другой ключ), пересобирает (run.js)
// и повторяет до отсутствия повторов (макс 14 раундов). Если сдвиг делает сборку невозможной («ОШИБКА ПОСТРОЕНИЯ ... c#i»), этот сдвиг откатывается и берётся следующий кандидат.
// Правит designN.js (источник), не gameData. Волновые токены (суффикс ~амп,частота,фаза) сохраняются.
const fs = require('fs'), path = require('path'), cp = require('child_process');
const n = +process.argv[2], role = process.argv[3]; const R = path.join(__dirname, '..', '..'); const df = path.join(__dirname, 'design' + n + '.js');
const OFFS = process.env.FIXDIR === '+' ? [40, 80, -40, -80, -120, -160] : [-40, -80, -120, -160, -200, 40, 80, 120];
const state = {}; // id#pos -> {base, cur, bad:Set}
const build = () => { try { return cp.execSync('node "' + path.join(__dirname, 'run.js') + '" ' + n, { cwd: R, encoding: 'utf8', maxBuffer: 1 << 26, stdio: 'pipe' }); } catch (e) { return (e.stdout || '') + (e.stderr || ''); } };
const dupsOf = () => cp.execSync('node "' + path.join(__dirname, 'dupfind.js') + '" ' + n + ' ' + role, { cwd: R, encoding: 'utf8' }).split('\n').filter(Boolean).map(l => { const m = /комбо (\w) поз (\d+) ключ (\S+) уровень (\d+)/.exec(l); return m && { id: m[1], pos: +m[2], key: m[3] }; }).filter(Boolean);
const segOf = (s) => { const i0 = s.indexOf('        ' + role + ':'); const nx = s.indexOf('\n        enem', i0 + 10); const j0 = nx < 0 ? s.length : nx; return [i0, j0]; };
const combRe = (id) => new RegExp("(\\{ id: '" + id + "'[^\\n]*beats: ')([^']*)(')");
const readAt = (id, pos) => { const s = fs.readFileSync(df, 'utf8'); const [i0, j0] = segOf(s); const m = combRe(id).exec(s.slice(i0, j0)); return +m[2].split(' ')[pos].split('@')[1].split('~')[0]; };
const setAt = (id, pos, val) => { const s = fs.readFileSync(df, 'utf8'); const [i0, j0] = segOf(s); let seg = s.slice(i0, j0); const m = combRe(id).exec(seg); const toks = m[2].split(' '); const [a, rest] = toks[pos].split('@'); const wv = rest.split('~')[1]; toks[pos] = a + '@' + val + (wv ? '~' + wv : ''); seg = seg.replace(m[0], m[1] + toks.join(' ') + m[3]); fs.writeFileSync(df, s.slice(0, i0) + seg + s.slice(j0)); };
let out = build();
for (let round = 0; round < 14; round++) {
    const retry = new Set(); let msg;
    if (out.includes('ОШИБКА ПОСТРОЕНИЯ')) {
        const fails = [...out.matchAll(new RegExp('\\[' + role + '\\] ([^\\n]*)', 'g'))].flatMap(m => [...m[1].matchAll(/([a-h])#([0-9]+)/g)].map(x => x[1] + '#' + x[2]));
        msg = 'ошибка сборки: ' + [...new Set(fails)].join(' ');
        for (const k of new Set(fails)) { const st = state[k]; if (!st) continue; st.bad.add(st.cur); const [id, pos] = k.split('#'); setAt(id, +pos, st.base); st.cur = st.base; retry.add(k); }
        if (!retry.size) { console.log('раунд', round, msg, '— нечего откатывать'); break; }
    } else {
        const D = dupsOf(); msg = 'повторов ' + D.length + ' ' + D.map(d => d.id + '#' + d.pos + ':' + d.key).join(' ');
        if (!D.length) { console.log('раунд', round, msg); break; }
        for (const d of D) retry.add(d.id + '#' + d.pos);
    }
    console.log('раунд', round, msg);
    for (const k of retry) {
        const [id, pos] = k.split('#'); const p = +pos; if (!state[k]) { const v = readAt(id, p); state[k] = { base: v, cur: v, bad: new Set() }; } const st = state[k];
        const cand = OFFS.map(o => st.base + o).find(v => !st.bad.has(v) && v !== st.cur); if (cand === undefined) continue;
        st.cur = cand; setAt(id, p, cand); console.log('  ', k, 'прилёт', st.base, '->', cand);
    }
    out = build();
}