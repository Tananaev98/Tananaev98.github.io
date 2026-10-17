// varreset.js N — вернуть всем боссам в /tmp/designN_base.js стандартный speedVariance [1, 1.03, 1.06, 1.09, 1.12] (центр сетки tune.js)
const fs = require('fs'), os = require('os'); const T = os.tmpdir().split(String.fromCharCode(92)).join('/'); const b = T + '/design' + process.argv[2] + '_base.js';
let s = fs.readFileSync(b, 'utf8'); s = s.replace(/speedVariance: \[[^\]]*\]/g, 'speedVariance: [1, 1.03, 1.06, 1.09, 1.12]'); fs.writeFileSync(b, s); console.log('varreset ok');
