// chk.js N enemK "x/sp@прилёт …" "паузы,через,запятую" — быстрая оценка ОДНОГО комбо без подбора: худший/типичный запас по фазам и причина отказа (для ручных правок сторон/скоростей автором).
const F=require('./fitlib.js');const n=+process.argv[2],role=process.argv[3];const L=require('./design'+n+'.js');
const tk=process.argv[4].trim().split(/\s+/).map(t=>{const [a,b]=t.split('@');const [x,sp]=a.split('/').map(Number);return {x,sp,w:1,at:+b};});
const gaps=(process.argv[5]||'').split(',').filter(s=>s!=='').map(Number);
const sl=F.evalBeats(L,role,tk,tk.map(o=>o.at),gaps);
console.log(sl?`худш ${sl.join('/')} типичн ${sl.typ.join('/')} x/y ${sl.geo.join(' ')}`:`ОТКАЗ: ${F.why()}`);
