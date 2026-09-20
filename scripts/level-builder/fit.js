// Калибровка ВРЕМЁН прилёта под желаемую тугость для формы комбо, которую задал автор (стороны x и скорости — руками, по замыслу).
// Вес паузы перед битом: x/скорость~2 (пауза вдвое длиннее базовой). node scripts/level-builder/fit.js N enemK "x/скорость x/скорость ..." цельФ3 [первыйПрилёт_от] [шаг_макс]
// Перебирает первый прилёт и (неравномерные по замыслу) промежутки; берёт вариант, где запас живого игрока в ф3 ближе всего к цели,
// а в ф1/ф2 — честно и не ниже ф3. Печатает строку битов для designN.js. Форма и смысл комбо остаются авторскими.
const lib=require('./lib.js'),model=lib.model,pm=require('../player-model.js');
const [,, n, role, shape, target, a0min, gmax]=process.argv; const L=require('./design'+n+'.js');
const T=+target||200, ctx=lib.ctxFor(L,role); const tk=shape.trim().split(/\s+/).map(t=>{const [a,w]=t.split('~');const [x,sp]=a.split('/').map(Number);return {x,sp,w:w?+w:1};}); const xs=tk.map(o=>[o.x,o.sp]);
const evalBeats=(at)=>{ let bts; try{bts=lib.solveCombo(L,role,{id:'z',beats:xs.map(([x,s],i)=>[x,at[i],s,null])},{},new Set(),new Set());}catch(e){return null;}
  const ab=bts.map(x=>({boss:role,xPos:x.x,yPos:x.y,customSpeed:x.s}));const idx=ab.map((_,i)=>i);
  for(let ph=0;ph<3;ph++) if(!model.verdict(model.analyze(ctx,role,ab,idx,ph,{})).ok) return null;
  const sl=[0,1,2].map(ph=>{const tele=Math.max(L.cfg.minTelegraphMs,L.bosses[role].telegraphMs*L.phases[ph].telegraphMultiplier);const rots=model.analyzeAllRot(ctx,role,ab,idx,ph,{});return Math.min(...rots.map(r=>pm.sequentialSlack(ab,r.arrivals,r.offsets,tele,r.lateral)));});
  return sl; };
let best=null;
const A0=+a0min||900, GM=+gmax||520;
for(let a0=A0;a0<=A0+700;a0+=50) for(let g=60;g<=GM;g+=20){
  const at=[];let t=a0;for(let i=0;i<xs.length;i++){if(i>0)t+=g*tk[i].w;at.push(Math.round(t/10)*10);}
  const sl=evalBeats(at); if(!sl) continue; if(Math.min(...sl)<SEQ()) continue;
  const d=Math.abs(sl[2]-T); if(!best||d<best.d||(d===best.d&&at[at.length-1]-at[0]<best.sp)) best={d,sl,at,sp:at[at.length-1]-at[0]}; }
function SEQ(){return pm.SEQ_MIN_MS+15;}
if(!best) console.log('нет допустимого варианта'); else console.log(`запас ф1/ф2/ф3: ${best.sl.join('/')}\n"${xs.map(([x,s],i)=>x+'/'+s+'@'+best.at[i]).join(' ')}"`);
