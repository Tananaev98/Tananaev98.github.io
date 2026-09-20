// Как fit.js, но префикс (уже утверждённые биты x/скорость@прилёт) зафиксирован, подбираются времена только хвоста.
// node scripts/level-builder/fittail.js N enemK "префикс-биты" "x/скорость x/скорость" цельФ3
const lib=require('./lib.js'),model=lib.model,pm=require('../player-model.js');
const [,, n, role, prefix, tail, target]=process.argv; const L=require('./design'+n+'.js'); const ctx=lib.ctxFor(L,role);
const pre=prefix.trim().split(/\s+/); const tl=tail.trim().split(/\s+/).map(t=>t.split('/').map(Number)); const T=+target||200;
const lastPre=Math.max(...pre.map(b=>+b.split('@')[1]));
const ev=(ats)=>{const str=[...pre,...tl.map(([x,s],i)=>`${x}/${s}@${ats[i]}`)].join(' ');
  let bts;try{bts=lib.solveCombo(L,role,{id:'z',beats:str},{},new Set(),new Set());}catch(e){return null;}
  const ab=bts.map(x=>({boss:role,xPos:x.x,yPos:x.y,customSpeed:x.s}));const idx=ab.map((_,i)=>i);
  for(let ph=0;ph<3;ph++) if(!model.verdict(model.analyze(ctx,role,ab,idx,ph,{})).ok) return null;
  const sl=[0,1,2].map(ph=>{const tele=Math.max(L.cfg.minTelegraphMs,L.bosses[role].telegraphMs*L.phases[ph].telegraphMultiplier);const rots=model.analyzeAllRot(ctx,role,ab,idx,ph,{});return Math.min(...rots.map(r=>pm.sequentialSlack(ab,r.arrivals,r.offsets,tele,r.lateral)));});
  return {sl,str}; };
let best=null;
for(let a=lastPre-500;a<=lastPre+700;a+=50) for(let g=0;g<=500;g+=25){ const ats=tl.map((_,i)=>a+i*g);
  const r=ev(ats); if(!r||Math.min(...r.sl)<pm.SEQ_MIN_MS+15) continue; const d=Math.abs(r.sl[2]-T); if(!best||d<best.d) best={d,...r}; }
console.log(best?`запас ф1/ф2/ф3: ${best.sl.join('/')}\n"${best.str}"`:'нет допустимого варианта');
