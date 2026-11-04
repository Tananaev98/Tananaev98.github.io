const lib = require('./lib.js'); const { composeBoss } = require('./compose.js');
const n = process.argv[2];
const fs = require('fs'); const cp = require('child_process');
function loadInv(n) {
    const out = require('path').join(__dirname, 'inv.json');
    cp.spawnSync('node', [lib.REPO + '/scripts/combat-data-inventory.js', `--json=${out}`], { encoding: 'utf8', maxBuffer: 1 << 28 });
    const lv = JSON.parse(fs.readFileSync(out, 'utf8')).filter(l => l.n !== Number(n));
    const G = { fp: new Set(), struct: {} }; lib.ROLES.forEach(r => (G.struct[r] = new Set()));
    const spC = (s) => (s <= 8 ? 'м' : s >= 18 ? 'б' : 'с');
    lv.forEach(l => l.bosses.forEach(b => { G.struct[b.role].add(b.combos.map(c => c.kind + c.indices.length).sort().join(','));
        b.combos.forEach(cb => { if (cb.indices.length >= 3) { const ph = [cb.phases[0], cb.phases[2]].map(p => `${p.order}|${p.gaps.map(g => Math.round(g / 150)).join(',')}`).join('#'); G.fp.add(`${cb.kind}|${cb.sides}|${cb.classes}|${ph}`); } }); }));
    return G;
}
const L = require('./design' + n + '.js');
try {
    // А7.3: compare pressure against the actual level before its first rebuild.
    // Never replace an existing baseline with an already rebuilt candidate.
    const baseline = require('path').join(__dirname, '..', 'baseline', `gameData${n}.js`);
    if (!fs.existsSync(baseline)) {
        fs.mkdirSync(require('path').dirname(baseline), { recursive: true });
        fs.copyFileSync(lib.REPO + `/lvlData/gameData${n}.js`, baseline);
        console.log(`Сохранена исходная база давления: scripts/baseline/gameData${n}.js`);
    }
    cp.spawnSync('node', [lib.REPO + '/scripts/combat-data-inventory.js', `--json=${require('path').join(__dirname, 'inv.json')}`], { encoding: 'utf8', maxBuffer: 1 << 28 });
    { const lv = JSON.parse(fs.readFileSync(require('path').join(__dirname, 'inv.json'), 'utf8')); const lg = lib.nudgeScalars(L, lv); if (lg.length) console.log(['сдвиг констант до свободных значений:', ...lg.map(x => '  ' + x)].join(String.fromCharCode(10))); L._nudged = true; }
    const G = loadInv(n);
    for (const r of lib.ROLES) {
        const b = L.bosses[r];
        if (b.plan) {
            b.combos = composeBoss(L, r, b.plan, b.seed || 1, G);
            if (process.env.SHOW) console.log(r, b.combos.map(c => `${c.id}:${c.beats}`).join(' | '));
        }
    }
    const res = lib.build(L);
    console.log(res.out);
    process.exit(res.status);
} catch (e) { console.log('ОШИБКА ПОСТРОЕНИЯ:', e.message); process.exit(3); }
