// reprofile.js N role targetMid [scale] — пересчёт множителя/шаблона скоростей роли под ЦЕЛЕВУЮ фактическую долю «средних» полётов (≤2000 мс).
// Фактическая доля читается из /tmp/runN.txt (раздел А10), поправочный коэффициент r = факт / оценка по модели полёта; правит speedMultiplier в /tmp/designN_base.js и speeds в /tmp/LNspec.json.
const fs = require('fs'), os = require('os'), path = require('path'), cp = require('child_process');
const [N, role, target] = [process.argv[2], process.argv[3], +process.argv[4]];
const D = __dirname, T = os.tmpdir().split(String.fromCharCode(92)).join('/');
const lib = require('./lib.js'), model = lib.model; const old = require('./old/design' + N + '_old.js');
const run = fs.readFileSync(T + '/run' + N + '.txt', 'utf8'); const m = new RegExp(role + ': самая частая скорость [0-9]+% атак; полёт ≤1200 / до 2000 / дольше: ([0-9]+)% / ([0-9]+)%').exec(run);
if (!m) { console.log('нет профиля', role); process.exit(1); } const actual = +m[2] / 100;
const base = T + '/design' + N + '_base.js'; let s = fs.readFileSync(base, 'utf8'); const i = s.indexOf('        ' + role + ':'); const seg = s.slice(i, i + 3000);
const style = /style: '([a-zA-Z]+)'/.exec(seg)[1]; const m0 = +/speedMultiplier: ([0-9.]+)/.exec(seg)[1];
const spec = JSON.parse(fs.readFileSync(T + '/L' + N + 'spec.json', 'utf8')); const b = spec.bosses[role]; const s0 = b.speeds;
const ctx0 = lib.ctxFor(old, 'enem1'); const eb = ctx0.ENEMY_TYPES.enem11; const styles = ctx0.bossCombatConfig.movementStyles;
const YW = [[5, .35], [6, .3], [7, .2], [8, .1], [9, .05]];
const mid = (st, mult, spds) => { let r = 0; for (const sp of spds) YW.forEach(([y, w]) => { const f = model.flightMs(y, eb.baseSpeed * sp * mult * model.BASE_SPEED_GAME, st === 'wave' ? null : st, styles); if (f > 1200 && f <= 2000) r += w / spds.length; }); return r; };
const est0 = mid(style, m0, s0); const r = est0 < 0.03 ? 0.6 : Math.max(0.15, Math.min(1.5, actual / est0));
const TPL = [[11, 11, 12, 12], [11, 12, 12, 13], [12, 12, 13, 13], [12, 13, 13, 14], [12, 13, 14, 14], [13, 14, 14, 15], [13, 14, 15, 16], [14, 15, 16, 15], [15, 16, 16, 17], [14, 15, 16, 17], [15, 16, 17, 18]];
let best = null; for (let mm = 0.85; mm <= 1.4001; mm += 0.025) for (const t of TPL) { if (Math.max(...t) * mm * 1.3 * 1.12 > 30) continue; const e = r * mid(style, mm, t); const d = Math.abs(e - target) + Math.abs(mm - m0) * 0.1 + (t === s0 ? 0 : 0.01); if (!best || d < best.d) best = { d, mm: +mm.toFixed(3), t, e }; }
console.log(role, style, 'факт', actual, 'оценка0', est0.toFixed(2), 'r', r.toFixed(2), '->', 'мульт', best.mm, 'скор', best.t.join(','), 'ожид', best.e.toFixed(2));
s = s.slice(0, i) + seg.replace(/speedMultiplier: [0-9.]+/, 'speedMultiplier: ' + best.mm) + s.slice(i + 3000); fs.writeFileSync(base, s);
b.speeds = best.t; delete b.Kspeeds; fs.writeFileSync(T + '/L' + N + 'spec.json', JSON.stringify(spec));
