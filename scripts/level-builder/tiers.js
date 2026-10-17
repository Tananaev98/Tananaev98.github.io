// tiers.js N [H=28] — подбор damageTiers по базе (git HEAD): для каждого босса [t,t,H] так, чтобы средний урон слотов ≈ базовому; вписывает в designN.js вместо damageByClass: true
const cp = require('child_process'), vm = require('vm'), fs = require('fs'), path = require('path');
const n = +process.argv[2], H0 = +(process.argv[3] || 28); const R = path.join(__dirname, '..', '..');
const load = (src) => { const sb = {}; new vm.Script(src + '\nthis.A=bossAbilities;this.D=bossAbilitiesDop;').runInContext(vm.createContext(sb)); return sb; };
const old = load(cp.execSync('git show HEAD:lvlData/gameData' + n + '.js', { cwd: R, encoding: 'utf8', maxBuffer: 1 << 26 }));
const cur = load(fs.readFileSync(path.join(R, 'lvlData', 'gameData' + n + '.js'), 'utf8'));
const mean = (sb, r) => { const at = sb.A.filter(a => a.boss === r); let s = 0, c = 0; for (const d of sb.D.filter(d => d.boss === r)) for (const i of d.indexAbilities) { s += at[i].customDamage; c++; } return s / c; };
// число слотов по классам берём из текущей сборки (damageByClass даёт класс через цену): классы light/medium/heavy по значению customDamage
const out = {}; const lines = [];
for (const r of ['enem1', 'enem2', 'enem3', 'enem4', 'enem5']) {
    const base = mean(old, r); const at = cur.A.filter(a => a.boss === r); const vals = []; for (const d of cur.D.filter(d => d.boss === r)) for (const i of d.indexAbilities) vals.push(at[i].customDamage);
    const sorted = [...new Set(vals)].sort((a, b) => a - b); const heavy = sorted[sorted.length - 1]; const nH = vals.filter(v => v === heavy).length, N = vals.length;
    let H = H0; let t = (base * N - nH * H) / (N - nH); if (t < 12) { H = Math.round(base * 1.4); t = (base * N - nH * H) / (N - nH); }
    t = Math.round(t); out[r] = [t, t, H]; lines.push(r + ' база ' + base.toFixed(2) + ' слотов ' + N + ' тяжёлых ' + nH + ' -> [' + t + ',' + t + ',' + H + '] среднее ' + ((t * (N - nH) + H * nH) / N).toFixed(2));
}
console.log(lines.join('\n'));
const f = path.join(__dirname, 'design' + n + '.js'); let s = fs.readFileSync(f, 'utf8');
const tiers = 'damageTiers: {' + Object.entries(out).map(([r, a]) => r + ': [' + a.join(', ') + ']').join(', ') + '}';
if (/damageTiers: \{[^}]*\}/.test(s)) s = s.replace(/damageTiers: \{[^}]*\}/, tiers); else s = s.replace('damageByClass: true', tiers);
fs.writeFileSync(f, s); console.log('записано');
