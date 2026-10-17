// genlevel.js N [seed] — генератор для «обычных» уровней (пять разных боссов): по старой версии (old/designN_old.js) и опыту ур.26-30 пишет каркас designN.js (шапка, свободные пара/тройка,
// параметры боссов) и спецификацию TMP/LNspec.json для mklvl.js (формы-режимы, свободные структуры длин, якоря, волновые параметры, скорости под разведённые профили полёта).
// Дальше: bash scripts/level-builder/runall.sh N — подбор времён, сборка, сводка; доводка — calibrate.js / вручную.
const fs = require('fs'), path = require('path'), os = require('os');
const N = +process.argv[2], seed = +(process.argv[3] || N); const D = __dirname;
const TMP = process.env.GENTMP || os.tmpdir().split(String.fromCharCode(92)).join('/');
const lib = require('./lib.js'), model = lib.model;
const old = require('./old/design' + N + '_old.js');
const inv = JSON.parse(fs.readFileSync(path.join(D, 'inv.json'), 'utf8')).filter(l => l.n !== N);
let st = (seed * 2654435761) % 4294967296; const rnd = () => { st = (st * 1664525 + 1013904223) % 4294967296; return st / 4294967296; };
const ROLES = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
const usedPairs = new Set(inv.map(l => l.timeNextBoss + '/' + l.bossInterval)), usedTr = new Set(inv.map(l => l.phases.map(p => p.maxActiveAttacks).join('/')));
const pairs = []; for (let t = 6; t <= 16; t++) for (let i = 4; i <= 9; i++) if (!usedPairs.has(t + '/' + i)) pairs.push([t, i]);
const pair = pairs[Math.floor(rnd() * pairs.length)];
const oa = old.phases.map(p => p.maxActiveAttacks); const trs = [];
for (let a = oa[0] - 1; a <= oa[0] + 1; a++) for (let b = oa[1] - 1; b <= oa[1] + 2; b++) for (let c = oa[2] - 1; c <= oa[2] + 2; c++) if (!usedTr.has(a + '/' + b + '/' + c) && a < b && b < c) trs.push([a, b, c]);
const tr = trs[Math.floor(rnd() * trs.length)];
const info = ROLES.map((r, k) => {
    const b = old.bosses[r]; const am = [], fr = [];
    b.combos.forEach(c => c.beats.split(' ').forEach(t => { const m = /~([0-9.]+),([0-9.]+)/.exec(t); if (m) { am.push(+m[1]); fr.push(+m[2]); } }));
    return { role: r, k, title: b.title, style: b.style, oldMult: b.speedMultiplier, tele: b.telegraphMs, cad: b.cadence, fw: b.firstWave, amps: am.length ? [Math.min(...am), Math.max(...am)] : null, freqs: fr.length ? [Math.min(...fr), Math.max(...fr)] : null };
});
const SHARE = [0, 0.21, 0.42, 0.64, 0.85];
const order = info.slice(); // доли по порядку ипостасей: чем позже босс, тем быстрее полёты и тугее запас (А9.7: следующий не легче предыдущего) const SHARE = [0, 0.21, 0.42, 0.64, 0.85]; // в единицах оценки (факт ≈ 0.78 × оценка): факт 0 / 0.16 / 0.33 / 0.5 / 0.66
order.forEach((o, i) => o.target = SHARE[i]);
const ctx0 = lib.ctxFor(old, 'enem1'); const eb = ctx0.ENEMY_TYPES.enem11; const styles = ctx0.bossCombatConfig.movementStyles;
const YW = [[5, .35], [6, .3], [7, .2], [8, .1], [9, .05]];
const flight = (style, mult, sp, y) => model.flightMs(y, eb.baseSpeed * sp * mult * model.BASE_SPEED_GAME, style === 'wave' ? null : style, styles);
const midShare = (style, mult, spds) => { let m = 0; for (const sp of spds) YW.forEach(([y, w]) => { const f = flight(style, mult, sp, y); if (f > 1200 && f <= 2000) m += w / spds.length; }); return m; };
const TPL = [[11, 11, 12, 12], [11, 12, 12, 13], [12, 12, 13, 13], [12, 13, 13, 14], [12, 13, 14, 14], [13, 14, 14, 15], [13, 14, 15, 16], [14, 15, 16, 15], [15, 16, 16, 17], [14, 15, 16, 17]];
const ANCH = 0.82;
const VAR = [1.0, 1.03, 1.06, 1.09, 1.12];
for (const o of info) {
    let best = null;
    for (let m = (o.target === 0 ? 1.0 : 0.85); m <= 1.4001; m += 0.05) for (const t of TPL) {
        const mx = Math.max(...t) * m * 1.3 * VAR[4]; if (mx > 30) continue;
        const sh = midShare(o.style, m, t) * ANCH;
        const nonFast = o.target === 0 ? (mx < 18 ? 0 : 1) : 0;
        const d = Math.abs(sh - o.target) + Math.abs(m - o.oldMult) * 0.05 + nonFast * 0.3 + (o.target === 0 && Math.max(...t) > 12 ? 0.2 : 0);
        if (!best || d < best.d) best = { d, m: +m.toFixed(2), t, sh };
    }
    Object.assign(o, { mult: best.m, speeds: (o.style !== 'wave' && o.target !== 0) ? best.t.map(v => v + 0.5) : best.t, est: best.sh }); // не-wave: полуцелые скорости — ключи x/y/скорость целых скоростей исчерпаны прошлыми уровнями
}
const lensFor = (o) => {
    const used = new Set(inv.map(l => { const b = l.bosses.find(x => x.role === o.role); return b.combos.map(c => c.indices.length).sort((a, b) => a - b).join(''); }));
    const drift = o.style === 'drift'; const lo = 4, hi = drift ? 5 : 6; const out = [];
    (function rec(a, i) {
        if (a.length === 8) { const s = a.reduce((x, y) => x + y, 0); if (s >= (drift ? 32 : 35) && s <= (drift ? 39 : 41) && a.filter(v => v === lo).length <= 2 && new Set(a).size >= (drift ? 2 : 3) && !used.has(a.join(''))) out.push(a.slice()); return; }
        for (let v = i; v <= hi; v++) { a.push(v); rec(a, v); a.pop(); }
    })([], lo);
    const pick = out[Math.floor(rnd() * out.length)] || [5, 5, 5, 5, 5, 5, 5, 5]; const arr = pick.slice();
    for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; }
    return arr;
};
const MODES = ['LK', 'KL', 'LKs', 'KLs', 'LKt']; const ALT = { LK: ['LKt', 'KLL'], KL: ['KLt', 'LLK'], LKs: ['KLs', 'LKK'], KLs: ['LKs', 'KKL'], LKt: ['KLt', 'LKK'] };
const mk = (a, b, n) => { const out = []; for (let i = 0; i < n; i++) out.push(+(a + (b - a) * (n === 1 ? 0.5 : i / (n - 1)) + (rnd() - 0.5) * 0.04).toFixed(2)); return out; };
const spec = { bosses: {} }; const hdrBoss = {};
info.forEach((o, idx) => {
    const lens = lensFor(o); const rl = o.target === 0; const others = ['KL', 'LKs', 'KLs', 'LKt']; const mode = rl ? 'LK' : others[(idx + Math.floor(seed)) % 4];
    const b = {
        mode, altModes: rl ? ['KL', 'LKs'] : ALT[mode], lens, speeds: o.speeds, anchors: 'abcdefgh'.split(''), anchorX: 84 + Math.floor(rnd() * 11), shifts: [0, -1, 1], altShifts: [0, -1], Ls: o.style === 'wave' ? [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] : [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
        targets: Array.from({ length: 8 }, (_, i) => (700 - idx * 20 - i * 8) + '/' + (480 - idx * 14 - i * 6) + '/' + (340 - idx * 10 - i * 5))
    };
    if (o.style !== 'wave' && !rl) { // K-полоса занята ключами других уровней: K-токены только на скоростях со свободными ключами
        const taken = new Set(); inv.forEach(l => l.bosses.filter(x => x.role === o.role).forEach(x => x.attacks.forEach(a => { if (a.waveAmplitude === undefined) taken.add(a.xPos + '/' + a.yPos + '/' + a.customSpeed); })));
        const freeK = (sp) => { let c = 0; for (const x of [69, 70, 71, 72, 73, 74, 75]) for (let y = 5; y <= 9; y++) if (!taken.has(x + '/' + y + '/' + sp)) c++; return c; };
        b.Kspeeds = o.speeds.map(sp => { const c = [0, 1, -1, 2, -2, 3, -3].map(d => sp + d).filter(v => v >= 11 && v <= 19 && freeK(v) >= 3); return c.length ? c[0] : sp; }); }
    b.Ks = rl ? [76, 78, 80, 82, 84, 86, 88] : (o.style === 'wave' ? [69, 70, 71] : [69, 70, 71, 72, 73, 74, 75]);
    if (o.style === 'wave') { const a = o.amps, f = o.freqs; b.wave = { amps: mk(a[0], a[1], 3).map(v => +(v + 0.07).toFixed(2)), freqs: mk(f[0], f[1], 4), phases: [0, 0.5, 1.1, 0.3] }; }
    spec.bosses[o.role] = b;
    hdrBoss[o.role] = { title: o.title, style: o.style, cad: o.cad, tele: o.tele, mult: o.mult, var: VAR, d0: o.style === 'drift' ? 150 : 165, d1: 6800, fw: o.fw };
});
let s = fs.readFileSync(path.join(D, 'skeleton.js'), 'utf8').replace(/shotDelayMs: ?[0-9]+,? ?/g, '');
s = s.replace(/n: 28, timeNextBoss: [0-9]+, bossInterval: [0-9]+/, 'n: ' + N + ', damageByClass: true, reuseKeys: true, timeNextBoss: ' + pair[0] + ', bossInterval: ' + pair[1]);
s = s.replace(/cfg: \{[^}]*\}/, 'cfg: { levelCadence: ' + old.cfg.levelCadence + ', minWaveDelay: ' + old.cfg.minWaveDelay + ', minShotDelay: ' + old.cfg.minShotDelay + ', minTelegraphMs: ' + old.cfg.minTelegraphMs + ' }');
s = s.replace(/УРОВЕНЬ 28/, 'УРОВЕНЬ ' + N);
let k = 0;
s = s.replace(/\{ minHp: [0-9.]+, cadence: [0-9.]+, speed: [0-9.]+, telegraphMultiplier: [0-9.]+, surpriseChance: [0-9.]+, maxActiveAttacks: [0-9]+ \}/g, () => {
    const p = old.phases[k]; const ma = tr[k]; k++;
    return '{ minHp: ' + p.minHp + ', cadence: ' + p.cadence + ', speed: ' + p.speed + ', telegraphMultiplier: ' + p.telegraphMultiplier + ', surpriseChance: ' + p.surpriseChance + ', maxActiveAttacks: ' + ma + ' }';
});
for (const r of ROLES) {
    const b = hdrBoss[r]; const i = s.indexOf('        ' + r + ': {'); const nx = s.indexOf('\n        enem', i + 10); const j = nx < 0 ? s.indexOf('\n    }\n};') : nx; let seg = s.slice(i, j);
    seg = seg.replace(/title: '[^']*'/, "title: '" + b.title + "'").replace(/identity: '[^']*'/, "identity: ''").replace(/trick: '[^']*'/, "trick: ''");
    seg = seg.replace(/style: '[a-zA-Z]+', cadence: [0-9.]+, telegraphMs: [0-9]+, speedMultiplier: [0-9.]+,( speedVariance: \[[^\]]*\],)? signatureEvery: 4, delay: \[[0-9]+, [0-9]+\], firstWave: [0-9]+/,
        "style: '" + b.style + "', cadence: " + b.cad + ', telegraphMs: ' + b.tele + ', speedMultiplier: ' + b.mult + ', speedVariance: [' + b.var.join(', ') + '], signatureEvery: 4, delay: [' + b.d0 + ', ' + b.d1 + '], firstWave: ' + b.fw);
    s = s.slice(0, i) + seg + s.slice(j);
}
fs.writeFileSync(path.join(D, 'design' + N + '.js'), s); fs.writeFileSync(path.join(TMP, 'L' + N + 'spec.json'), JSON.stringify(spec));
console.log('уровень', N, 'пара', pair.join('/'), 'тройка', tr.join('/'));
info.forEach(o => console.log(' ', o.role, o.title, o.style, 'мульт', o.mult, 'скор', o.speeds.join(','), 'доля цель', o.target, 'оценка', o.est.toFixed(2), 'режим', spec.bosses[o.role].mode, 'lens', spec.bosses[o.role].lens.join('')));