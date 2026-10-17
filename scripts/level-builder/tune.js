// tune.js N [шаг=0.01] [макс=0.06] — подбор сдвига speedVariance КАЖДОГО босса сеткой реальных прогонов проверки (run.js): на каждом значении d сдвигаются все боссы сразу,
// из вывода берутся (а) нарушения, относящиеся к ОДНОМУ боссу (честность, А9.3, А9.7 кроме «легче предыдущей»), (б) типичные медианы фаз. Затем перебор комбинаций: у каждого босса d без собственных нарушений,
// цепочка «следующий не легче предыдущего >80» выполняется; минимум суммы |d|. Результат применяется к /tmp/designN_base.js и печатается итог проверки.
const cp = require('child_process'), fs = require('fs'), path = require('path'), os = require('os');
const N = +process.argv[2], STEP = +(process.argv[3] || 0.01), MAX = +(process.argv[4] || 0.06);
const R = path.join(__dirname, '..', '..'); const T = os.tmpdir().split(String.fromCharCode(92)).join('/');
const DIRECT = !!process.env.TUNEDIRECT; const base = DIRECT ? path.join(__dirname, 'design' + N + '.js') : T + '/design' + N + '_base.js', plan = T + '/plan_some_' + N + '.txt'; const roles = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
const sh = (c) => { try { return cp.execSync(c, { cwd: R, encoding: 'utf8', maxBuffer: 1 << 27, stdio: ['ignore', 'pipe', 'pipe'] }); } catch (e) { return (e.stdout || '') + (e.stderr || ''); } };
const orig = fs.readFileSync(base, 'utf8');
const varOf = (s, r) => { const i = s.indexOf('        ' + r + ':'); const m = /speedVariance: \[([^\]]*)\]/.exec(s.slice(i, i + 3000)); return m[1].split(',').map(Number); };
const setVar = (s, r, v) => { const i = s.indexOf('        ' + r + ':'); const seg = s.slice(i, i + 3000); const m = /speedVariance: \[([^\]]*)\]/.exec(seg); return s.slice(0, i) + seg.replace(m[0], 'speedVariance: [' + v.join(', ') + ']') + s.slice(i + 3000); };
const origV = {}; const TB = {}; (process.env.TUNEBASE || '').split(',').filter(Boolean).forEach(x => { const [r, v] = x.split(':'); TB[r] = +v; });
roles.forEach(r => origV[r] = varOf(orig, r).map(x => +(x + (TB[r] || 0)).toFixed(3)));
const grid = []; for (let k = -Math.round(MAX / STEP); k <= Math.round(MAX / STEP); k++) grid.push(+(k * STEP).toFixed(4));
const data = {}; // data[r][d] = { bad: n, med: [..] }
roles.forEach(r => data[r] = {});
for (const d of grid) {
    let s = orig; roles.forEach(r => { s = setVar(s, r, origV[r].map(x => +(x + d).toFixed(3))); }); fs.writeFileSync(base, s);
    DIRECT ? sh('node scripts/level-builder/run.js ' + N + ' > ' + T + '/run' + N + '.txt 2>&1') : sh('bash scripts/level-builder/applyN.sh ' + N + ' ' + base + ' ' + plan); const run = fs.readFileSync(T + '/run' + N + '.txt', 'utf8');
    const med = {}; const i0 = run.indexOf('типичный запас (медиана'); const seg = i0 < 0 ? '' : run.slice(i0);
    for (const m of seg.matchAll(/(enem[1-5]): ф1: типичная медиана (\d+) \/ p75 (\d+) \/ мин (\d+) мс \| ф2: типичная медиана (\d+) \/ p75 (\d+) \/ мин (\d+) мс \| ф3: типичная медиана (\d+) \/ p75 (\d+) \/ мин (\d+) мс/g)) med[m[1]] = [+m[2], +m[5], +m[8]];
    const bad = {}; roles.forEach(r => bad[r] = 0);
    for (const l of run.split('\n')) { const m = /^   ! (enem[1-5])/.exec(l); if (!m) continue; if (/повторяют|повторяет решение|профили|легче предыдущей|уже на уровнях/.test(l)) continue; bad[m[1]]++; }
    roles.forEach(r => data[r][d] = { bad: bad[r], med: med[r] || null }); console.log('d', d, roles.map(r => r + ':' + bad[r] + (med[r] ? '(' + med[r].join('/') + ')' : '')).join(' '));
}
const ok = {}; roles.forEach(r => ok[r] = grid.filter(d => data[r][d].bad === 0 && data[r][d].med));
roles.forEach(r => { if (!ok[r].length) console.log('НЕТ чистого d у', r); });
let best = null; const pick = [];
(function rec(k, ch, cost) { if (k === 5) { if (!best || cost < best.cost) best = { cost, ch: ch.slice() }; return; }
    for (const d of (ok[roles[k]].length ? ok[roles[k]] : [0])) { const m = (data[roles[k]][d] || {}).med; if (k > 0 && m) { const pm = (data[roles[k - 1]][ch[k - 1]] || {}).med; if (pm && [0, 1, 2].some(p => m[p] > pm[p] + 75)) continue; } ch.push(d); rec(k + 1, ch, cost + Math.abs(d)); ch.pop(); } })(0, [], 0);
if (!best) { console.log('цепочка недостижима при чистых d — берём d=0'); best = { cost: 0, ch: [0, 0, 0, 0, 0] }; }
console.log('выбор', roles.map((r, k) => r + ':' + best.ch[k]).join(' '));
let s = orig; roles.forEach((r, k) => { s = setVar(s, r, origV[r].map(x => +(x + best.ch[k]).toFixed(3))); }); fs.writeFileSync(base, s);
DIRECT ? sh('node scripts/level-builder/run.js ' + N + ' > ' + T + '/run' + N + '.txt 2>&1') : sh('bash scripts/level-builder/applyN.sh ' + N + ' ' + base + ' ' + plan);
const run = fs.readFileSync(T + '/run' + N + '.txt', 'utf8'); console.log(run.split('\n').filter(l => /^   ! |ИТОГ/.test(l) && !/уже на уровнях/.test(l)).map(l => l.slice(0, 180)).join('\n'));
