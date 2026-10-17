// calibrate.js N [итераций] — подстройка ширины/сдвига speedVariance каждого босса по типичным медианам из /tmp/runN.txt (А9.7).
// Рычаг: прибавка d ко всем пяти значениям speedVariance (быстрее полёт -> меньше запас, ~1.1 мс на 0.001 для ф1, в фазах делится на phase.speed).
// Цели по ипостасям k=1..5: ф1 720-30(k-1), ф2 = ф1-170, ф3 = ф2-100. База design — /tmp/designN_base.js, план — /tmp/plan_some_N.txt.
const cp = require('child_process'), fs = require('fs'), path = require('path'), os = require('os');
const N = +process.argv[2], ITER = +(process.argv[3] || 3);
const R = path.join(__dirname, '..', '..'); const T = os.tmpdir().split(String.fromCharCode(92)).join('/');
const base = T + '/design' + N + '_base.js', plan = T + '/plan_some_' + N + '.txt';
const sh = (c) => { try { return cp.execSync(c, { cwd: R, encoding: 'utf8', maxBuffer: 1 << 27, stdio: ['ignore', 'pipe', 'pipe'] }); } catch (e) { return (e.stdout || '') + (e.stderr || ''); } };
const readRun = () => fs.readFileSync(T + '/run' + N + '.txt', 'utf8');
const parse = (run) => { const out = {}; const i = run.indexOf('типичный запас (медиана'); const seg = run.slice(i);
    for (const m of seg.matchAll(/(enem[1-5]): ф1: типичная медиана (\d+) \/ p75 (\d+) \/ мин (\d+) мс \| ф2: типичная медиана (\d+) \/ p75 (\d+) \/ мин (\d+) мс \| ф3: типичная медиана (\d+) \/ p75 (\d+) \/ мин (\d+) мс/g)) out[m[1]] = [+m[2], +m[5], +m[8]]; return out; };
const varOf = (role) => { const s = fs.readFileSync(base, 'utf8'); const i = s.indexOf('        ' + role + ':'); const m = /speedVariance: \[([^\]]*)\]/.exec(s.slice(i)); return m[1].split(',').map(Number); };
const phSpeed = () => [...fs.readFileSync(base, 'utf8').matchAll(/minHp: [0-9.]+, cadence: [0-9.]+, speed: ([0-9.]+)/g)].map(m => +m[1]);
const hdr = (patch) => { const f = T + '/hdr_cal_' + N + '.json'; fs.writeFileSync(f, JSON.stringify(patch)); const tmp = path.join(__dirname, 'design' + N + '.js'); fs.copyFileSync(base, tmp); sh('node scripts/level-builder/hdr.js ' + N + ' ' + f); fs.copyFileSync(tmp, base); };
for (let it = 0; it < ITER; it++) {
    const med = parse(readRun()); const ps = phSpeed(); const patch = { bosses: {} }; let any = false;
    ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'].forEach((r, k) => {
        const m = med[r]; if (!m) return; const t1 = 720 - 30 * k, tg = [t1, t1 - 170, t1 - 270];
        let num = 0, den = 0; for (let p = 0; p < 3; p++) { const s = 1.1 / ps[p]; num += s * (m[p] - tg[p]); den += s * s; }
        let d = num / den / 1000; d = Math.max(-0.06, Math.min(0.06, d)); if (Math.abs(d) < 0.004) return; any = true;
        patch.bosses[r] = { speedVariance: varOf(r).map(v => +Math.max(0.8, v + d).toFixed(3)) };
    });
    if (!any) break; console.log('калибровка, итерация', it + 1, JSON.stringify(Object.fromEntries(Object.entries(patch.bosses).map(([r, b]) => [r, b.speedVariance[0]]))));
    hdr(patch); sh('bash scripts/level-builder/applyN.sh ' + N + ' ' + base + ' ' + plan);
}
const run = readRun(); console.log(run.split('\n').filter(l => /^   ! |ИТОГ|^[1-7]\) /.test(l) && !/нарушений нет|все поля известны/.test(l)).map(l => l.slice(0, 190)).join('\n'));
