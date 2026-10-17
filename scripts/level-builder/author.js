// Авторская калибровка: author.js N spec.json. spec: { "enemK:id": [ ["форма", цель, "G"|"S", …, паузы], ... альтернативы ] } —
// формы (стороны/скорости/порядок) придумывает автор; программа только подбирает времена/паузы (fitGaps / fitShape).
// Режим по умолчанию — ПЕРВАЯ подошедшая альтернатива; BESTOF=1 — из ВСЕХ авторских альтернатив берётся та, что точнее попадает в цель (цель — число T или «ф1/ф2/ф3» типичного запаса при FITTYP=1).
// Комбо роли обрабатываются по порядку спецификации (a..h): принятое комбо фиксируется (commit) — следующие видят занятую геометрию, как конвейер.
// Печатает строки в формате applyfit.js (хвост после «#» — комментарий: типичный запас, геометрия x/y, предупреждения ЗАНЯТО/СДВИГ).
const fs=require('fs'),path=require('path');const F=require('./fitlib.js');
const n=+process.argv[2];const L=require('./design'+n+'.js');const spec=JSON.parse(fs.readFileSync(process.argv[3],'utf8'));
// SIDEREG=файл: реестр строк сторон (Л/Ц/П) комбо >=3 атак, уже занятых ДРУГИМИ боссами уровня (А10.1) — такие формы пропускаются; выбранные строки роли дописываются в реестр.
const SIDEREG=process.env.SIDEREG;const sideOf=(x)=>x<=28?'Л':x>=72?'П':'Ц';const sideStr=(shape)=>shape.trim().split(/\s+/).map(t=>sideOf(+t.split('/')[0])).join('');
const FORB=new Set(SIDEREG&&fs.existsSync(SIDEREG)?fs.readFileSync(SIDEREG,'utf8').split('\n').filter(Boolean):[]);const mine=new Set();
const DEFOPTS=process.env.FITOPTS;const BEST=!!process.env.BESTOF;const usedShape={};
for(const [k,alts] of Object.entries(spec)){const [role,id]=k.split(':');const combo=L.bosses[role].combos.find(c=>c.id===id)||{};let got=null,tried=[];
  for(const a of alts){const [shape,T,mode,x1,x2,x3,fo]=a; if(BEST&&(usedShape[role]||new Set()).has(shape)) continue; if(BEST&&SIDEREG&&sideStr(shape).length>=3&&FORB.has(sideStr(shape))) {tried.push(shape);continue;} if(fo) process.env.FITOPTS=fo; else if(DEFOPTS===undefined) delete process.env.FITOPTS; else process.env.FITOPTS=DEFOPTS;
    let r=null,warn=null; try{ if(mode==='S'){if(combo.isChain)throw Error('Цепь подбирается режимом G');r=F.fitShape(L,role,shape,T,x1,x2,x3);} else r=F.fitGaps(L,role,shape,T,x1,combo); warn=F.fitGaps.warn; }catch(e){}
    if(r){r.warn=warn; r.eff=r.d+(warn&&warn.length?(+process.env.WARNPEN||600)*warn.length:0); if(!got||(BEST&&r.eff<got.r.eff)) got={r,shape}; if(!BEST) break;} else tried.push(shape);}
  if(got&&BEST){(usedShape[role]||(usedShape[role]=new Set())).add(got.shape); if(sideStr(got.shape).length>=3) mine.add(sideStr(got.shape));} if(got){const r=got.r;try{const tk=r.beats.split(' ').map(t=>{const [a,b0]=t.split('@');const [b,wvs]=b0.split('~');const [x,sp]=a.split('/').map(Number);return {x,sp,w:1,at:+b,wv:wvs?wvs.split(',').map(Number):undefined};});F.commit(L,role,tk,tk.map(o=>o.at),r.gaps,combo);}catch(e){}}
  console.log(got?`${k} ${got.r.sl.join('/')}  ${got.r.beats}${got.r.gaps?'  GAPS['+got.r.gaps.join(',')+']':''}${got.r.typ?'  # типичн '+got.r.typ.join('/')+' x/y '+got.r.geo.join(' ')+' форма «'+got.shape+'»'+(got.r.warn?' ЗАНЯТО '+got.r.warn.join(','):'')+(got.r.xs&&got.r.geo.some((g,i)=>+g.split('/')[0]!==got.r.xs[i])?' СДВИГ(конвейер уводит x)':''):''}`:`${k} НЕТ (${tried.length+' вариантов'})`);}
if(SIDEREG&&mine.size) fs.appendFileSync(SIDEREG,[...mine].join('\n')+'\n');
