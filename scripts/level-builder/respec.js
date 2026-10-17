// respec.js N role seed — меняет в LNspec.json режим/альтернативы/anchorX/порядок длин роли (для роли, где не нашлось вариантов), пересобирает LNa
const fs = require('fs'), os = require('os'), cp = require('child_process'), path = require('path');
const [N, role, seed, scale] = [process.argv[2], process.argv[3], (process.argv[4] === undefined ? 1 : +process.argv[4]), +(process.argv[5] || 1)];
const T = os.tmpdir().split(String.fromCharCode(92)).join('/'); const f = T + '/L' + N + 'spec.json'; const spec = JSON.parse(fs.readFileSync(f, 'utf8')); const b = spec.bosses[role];
let st = (seed * 2654435761 + 12345) % 4294967296; const rnd = () => { st = (st * 1664525 + 1013904223) % 4294967296; return st / 4294967296; };
const MODES = ['KL', 'LKs', 'KLs', 'LKt', 'LK']; const ALT = { LK: ['LKt', 'KLL'], KL: ['KLt', 'LLK'], LKs: ['KLs', 'LKK'], KLs: ['LKs', 'KKL'], LKt: ['KLt', 'LKK'] };
const slowR = b.Ks[0] >= 76;
const pool = MODES.filter(m => m !== b.mode && (slowR ? ['LK', 'KL', 'LKs'].includes(m) : m !== 'LK')); const nm = pool[Math.floor(rnd() * pool.length)];
if (seed > 0) { b.mode = nm; b.altModes = slowR ? ['KL', 'LKs'] : ALT[nm]; b.anchorX = 84 + Math.floor(rnd() * 11);
for (let i = b.lens.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [b.lens[i], b.lens[j]] = [b.lens[j], b.lens[i]]; } }
if (scale !== 1) b.targets = b.targets.map(t => t.split('/').map(v => Math.round(+v * scale)).join('/'));
fs.writeFileSync(f, JSON.stringify(spec)); fs.rmSync(T + '/L' + N + 'a', { recursive: true, force: true });
cp.execSync('node scripts/level-builder/mklvl.js ' + f + ' ' + T + '/L' + N + 'a', { cwd: path.join(__dirname, '..', '..'), stdio: 'ignore' });
console.log(N, role, 'режим', nm, 'anchorX', b.anchorX);
