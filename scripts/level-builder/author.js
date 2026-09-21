// Авторская калибровка: author.js N spec.json [--apply]. spec: { "enemK:id": [ ["форма", цель, "G"|"S"], ... альтернативы ] } —
// формы (стороны/скорости/порядок) придумывает автор; программа только подбирает времена/паузы (fitGaps / fitShape) и берёт ПЕРВУЮ подошедшую
// альтернативу. Печатает строки в формате fitmany (их принимает applyfit.js) и, с --apply, записывает в designN.js.
const fs=require('fs'),path=require('path');const F=require('./fitlib.js');
const n=+process.argv[2];const L=require('./design'+n+'.js');const spec=JSON.parse(fs.readFileSync(process.argv[3],'utf8'));
const out=[];
for(const [k,alts] of Object.entries(spec)){const [role,id]=k.split(':');let got=null,tried=[];
  for(const a of alts){const [shape,T,mode,x1,x2,x3]=a;
    let r=null; try{ if(mode==='S') r=F.fitShape(L,role,shape,T,x1,x2,x3); else r=F.fitGaps(L,role,shape,T,x1); }catch(e){}
    if(r){got={r,shape};break;} tried.push(shape);}
  console.log(got?`${k} ${got.r.sl.join('/')}  ${got.r.beats}${got.r.gaps?'  GAPS['+got.r.gaps.join(',')+']':''}`:`${k} НЕТ (${tried.length+' вариантов'})`);}
console.log(out.join('\n'));
