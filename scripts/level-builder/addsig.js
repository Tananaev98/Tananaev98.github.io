// addsig.js N — расставляет фирменные (signature) комбо e/f/g каждого босса (фаза 2/3/4-я: minPhase 1/2/3, recoveryMs 650/650/950, open:1 у e), как на уровнях 10-11.
const fs=require('fs'),path=require('path');const n=+process.argv[2];const f=path.join(__dirname,'design'+n+'.js');let s=fs.readFileSync(f,'utf8');
const cfg={e:'sig: true, minPhase: 1, recoveryMs: 650, open: 1, ',f:'sig: true, minPhase: 2, recoveryMs: 650, ',g:'sig: true, minPhase: 3, recoveryMs: 950, '};
for(const id of ['e','f','g']){ s=s.replace(new RegExp("\{ id: '"+id+"', tight: false, (?!sig)","g"),"{ id: '"+id+"', tight: false, "+cfg[id]); }
fs.writeFileSync(f,s);console.log('sig расставлены');
