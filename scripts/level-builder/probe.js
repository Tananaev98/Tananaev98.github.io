// probe.js N enemK файл_форм.txt [target=380] — прогон нескольких авторских форм (по одной в строке «x/скорость …») через fitGaps по ТИПИЧНОМУ запасу (А9.7).
// Печатает лучший вариант каждой формы (худший/типичный запасы, паузы, прилёты) или причину отказа. Формы придумывает автор.
const fs=require('fs');process.env.FITTYP='1';const F=require('./fitlib.js');
const n=+process.argv[2],role=process.argv[3];const L=require('./design'+n+'.js');const T=+(process.argv[5]||380);
for(const line of fs.readFileSync(process.argv[4],'utf8').split('\n').map(s=>s.trim()).filter(s=>s&&!s.startsWith('#'))){
  let r=null;try{r=F.fitGaps(L,role,line,T);}catch(e){}
  console.log(r?`${line.padEnd(40)} худш ${r.sl.join('/').padEnd(12)} типичн ${r.typ.join('/').padEnd(12)} паузы[${r.gaps}] ${r.beats}`:`${line.padEnd(40)} НЕТ`);
}
