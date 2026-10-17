// varshift.js N role d — сдвиг всех пяти значений speedVariance роли в /tmp/designN_base.js на d (d<0 — полёты длиннее, запас БОЛЬШЕ: честность не страдает), затем applyN
const fs = require('fs'), os = require('os'), cp = require('child_process'), path = require('path');
const [N, role, d] = [process.argv[2], process.argv[3], +process.argv[4]];
const T = os.tmpdir().split(String.fromCharCode(92)).join('/'); const base = T + '/design' + N + '_base.js'; let s = fs.readFileSync(base, 'utf8');
const i = s.indexOf('        ' + role + ':'); const seg = s.slice(i, i + 3000); const m = /speedVariance: \[([^\]]*)\]/.exec(seg);
const v = m[1].split(',').map(Number).map(x => +(x + d).toFixed(3));
s = s.slice(0, i) + seg.replace(m[0], 'speedVariance: [' + v.join(', ') + ']') + s.slice(i + 3000); fs.writeFileSync(base, s);
console.log('varshift', N, role, v.join(','));
