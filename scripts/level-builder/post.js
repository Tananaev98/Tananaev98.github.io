// post.js N [план] — пост-обработка плана уровня БЕЗ повторного подбора: (1) давление — подгон delay[1] боссов под потолок А7.6 (hdr.js на базовом design), (2) повторы геометрии — fixdup.js по ролям из раздела 3,
// затем сводка оставшихся нарушений. База design — /tmp/designN_base.js (её же использует applyN.sh), план — /tmp/plan_some_N.txt (или аргумент). Итоговый design остаётся в designN.js (если ИТОГ пройден — и gameDataN.js).
const cp = require('child_process'), fs = require('fs'), path = require('path'), os = require('os');
const N = +process.argv[2]; const plan = process.argv[3] || ('/tmp/plan_some_' + N + '.txt');
const R = path.join(__dirname, '..', '..'); const T = os.tmpdir().split(String.fromCharCode(92)).join('/');
const base = '/tmp/design' + N + '_base.js';
const sh = (c) => { try { return cp.execSync(c, { cwd: R, encoding: 'utf8', maxBuffer: 1 << 27, stdio: ['ignore', 'pipe', 'pipe'] }); } catch (e) { return (e.stdout || '') + (e.stderr || ''); } };
const apply = () => sh('bash scripts/level-builder/applyN.sh ' + N + ' ' + base + ' ' + plan);
const readRun = () => fs.readFileSync(T + '/run' + N + '.txt', 'utf8');
const hdr = (patch) => { const f = T + '/hdr_post_' + N + '.json'; fs.writeFileSync(f, JSON.stringify(patch)); const tmp = path.join(__dirname, 'design' + N + '.js'); fs.copyFileSync(base, tmp); sh('node scripts/level-builder/hdr.js ' + N + ' ' + f); fs.copyFileSync(tmp, base); };
const delayOf = (role) => { const s = fs.readFileSync(base, 'utf8'); const i = s.indexOf('        ' + role + ':'); const m = /delay: \[([0-9]+), ([0-9]+)\]/.exec(s.slice(i)); return +m[2]; };
let out = apply();
for (let it = 0; it < 5; it++) {
    const run = readRun(); const sec5 = run.slice(run.indexOf('5) Давление'), run.indexOf('6) Запас')); const bad = {};
    for (const m of sec5.matchAll(/! (enem[1-5]) ф([13]): атак\/мин ([0-9.]+) > ([0-9]+)/g)) { const f = +m[3] / (+m[4] - 1.5); bad[m[1]] = Math.max(bad[m[1]] || 1, f); }
    const pauseBad = [...sec5.matchAll(/! (enem[1-5]) ф3: пауза между комбо/g)].map(m => m[1]);
    if (!Object.keys(bad).length && !pauseBad.length) break;
    const patch = { bosses: {} };
    for (const r of Object.keys(bad)) patch.bosses[r] = { delay1: Math.round(delayOf(r) * Math.min(1.35, bad[r])) };
    for (const r of pauseBad) patch.bosses[r] = { delay1: Math.round(delayOf(r) * 1.1) };
    console.log('давление, итерация', it + 1, JSON.stringify(patch.bosses)); hdr(patch); out = apply();
}
for (let it = 0; it < 3; it++) {
    const run = readRun(); const sec3 = run.slice(run.indexOf('3) Повторы данных'), run.indexOf('4) Повторы'));
    const roles = [...new Set([...sec3.matchAll(/! (enem[1-5]): [0-9]+ из [0-9]+ атак повторяют геометрию/g)].map(m => m[1]))];
    if (!roles.length) break;
    console.log('повторы геометрии: fixdup', roles.join(',')); for (const r of roles) sh('node scripts/level-builder/fixdup.js ' + N + ' ' + r);
    sh('node scripts/level-builder/run.js ' + N + ' > ' + T + '/run' + N + '.txt 2>&1');
}
const run = readRun(); const lines = run.split('\n').filter(l => /^   ! |ИТОГ|^[1-7]\) /.test(l) && !/нарушений нет|все поля известны/.test(l));
console.log(lines.map(l => l.slice(0, 190)).join('\n'));