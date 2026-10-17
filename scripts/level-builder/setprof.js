// setprof.js N role mult s1,s2,s3,s4 — вручную задать множитель (в /tmp/designN_base.js) и шаблон скоростей (в /tmp/LNspec.json) роли
const fs = require('fs'), os = require('os');
const [N, role, mult, spd] = [process.argv[2], process.argv[3], +process.argv[4], process.argv[5].split(',').map(Number)];
const T = os.tmpdir().split(String.fromCharCode(92)).join('/'); const base = T + '/design' + N + '_base.js'; let s = fs.readFileSync(base, 'utf8');
const i = s.indexOf('        ' + role + ':'); const seg = s.slice(i, i + 3000);
s = s.slice(0, i) + seg.replace(/speedMultiplier: [0-9.]+/, 'speedMultiplier: ' + mult) + s.slice(i + 3000); fs.writeFileSync(base, s);
const f = T + '/L' + N + 'spec.json'; const spec = JSON.parse(fs.readFileSync(f, 'utf8')); spec.bosses[role].speeds = spd; delete spec.bosses[role].Kspeeds;
const style = /style: '([a-zA-Z]+)'/.exec(seg)[1];
if (style !== 'wave' && spec.bosses[role].Ks[0] < 76) { // K-полоса занята ключами других уровней: K-токены только на скоростях со свободными ключами (как в genlevel)
    const inv = JSON.parse(fs.readFileSync(require('path').join(__dirname, 'inv.json'), 'utf8')).filter(l => l.n !== +N); const taken = new Set();
    inv.forEach(l => l.bosses.filter(x => x.role === role).forEach(x => x.attacks.forEach(a => { if (a.waveAmplitude === undefined) taken.add(a.xPos + '/' + a.yPos + '/' + a.customSpeed); })));
    const freeK = (sp) => { let c = 0; for (const x of [69, 70, 71, 72, 73, 74, 75]) for (let y = 5; y <= 9; y++) if (!taken.has(x + '/' + y + '/' + sp)) c++; return c; };
    spec.bosses[role].Ks = [69, 70, 71, 72, 73, 74, 75]; spec.bosses[role].Ls = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]; spec.bosses[role].Kspeeds = spd.map(sp => { const c = [0, 1, -1, 2, -2, 3, -3].map(d => sp + d).filter(v => v >= 11 && v <= 19 && freeK(v) >= 3); return c.length ? c[0] : sp; }); console.log('Kspeeds', spec.bosses[role].Kspeeds.join(',')); } fs.writeFileSync(f, JSON.stringify(spec)); console.log('setprof', N, role, mult, spd.join(','));
