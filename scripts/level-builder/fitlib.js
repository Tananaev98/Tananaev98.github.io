// Калибровка времён прилёта под тугость для формы, заданной автором (см. fit.js). Медленные (скорость<=8) биты: прилёт = конец быстрых + сдвиг.
const lib=require('./lib.js'),model=lib.model,pm=require('../player-model.js');
function evalBeats(L,role,tk,at,gaps){
  const ctx=lib.ctxFor(L,role); const co={shotGapsMs:gaps&&gaps.length?gaps:undefined};
  let bts;try{bts=lib.solveCombo(L,role,{id:'z',tolerant:true,gaps:gaps&&gaps.length?gaps:undefined,beats:tk.map((o,i)=>[o.x,at[i],o.sp,null])},{},new Set(),new Set());}catch(e){return null;}
  const ab=bts.map(x=>({boss:role,xPos:x.x,yPos:x.y,customSpeed:x.s}));const idx=ab.map((_,i)=>i);
  { const bb=ctx.bossCombatConfig.bosses[role]; const mv=Math.max(...(bb.speedVariance||[1]));
    for(const a of ab) for(let ph=0;ph<3;ph++){ const proj=a.customSpeed*bb.speedMultiplier*L.phases[ph].speed*mv; const cap=a.yPos>12?15:a.yPos>10?18:31; if(proj>cap) return null; if(a.customSpeed<=10&&proj>11.5) return null; } }
  for(let ph=0;ph<3;ph++) if(!model.verdict(model.analyze(ctx,role,ab,idx,ph,co)).ok) return null;
  // 5.1: быстрые (итоговая скорость >=18) атаки противоположных флангов — не ближе 720 мс по моментам ПОЯВЛЕНИЯ
  { const bb=ctx.bossCombatConfig.bosses[role]; const mv=Math.max(...(bb.speedVariance||[1]));
    for(let ph=0;ph<3;ph++){ const an=model.analyze(ctx,role,ab,idx,ph,co); let lL=-1e9,lR=-1e9;
      for(let i=0;i<ab.length;i++){ const a=ab[i]; const side=a.xPos<=28?'L':a.xPos>=72?'R':'C'; if(side==='C'||a.customSpeed*bb.speedMultiplier*L.phases[ph].speed*mv<18) continue;
        const opp=side==='L'?lR:lL; if(an.offsets[i]-opp<720) return null; if(side==='L') lL=an.offsets[i]; else lR=an.offsets[i]; } } }
  // прикрытие медленных (А7.4): другая атака на другой полосе (dx>=15) в пределах 600 мс прилёта в ф1 и ф3
  for(const ph of [0,2]){const an=model.analyze(ctx,role,ab,idx,ph,co);
    for(let i=0;i<ab.length;i++) if(ab[i].customSpeed<=8&&!ab.some((a,j)=>j!==i&&Math.abs(a.xPos-ab[i].xPos)>=15&&Math.abs(an.arrivals[j]-an.arrivals[i])<=600)) return null;}
  const sl=[0,1,2].map(ph=>{const tele=Math.max(L.cfg.minTelegraphMs,L.bosses[role].telegraphMs*L.phases[ph].telegraphMultiplier);const rots=model.analyzeAllRot(ctx,role,ab,idx,ph,co);return Math.min(...rots.map(r=>pm.sequentialSlack(ab,r.arrivals,r.offsets,tele,r.lateral)));});
  sl.real=model.analyze(ctx,role,ab,idx,0,co).arrivals.map(Math.round);
  return sl;
}
function parseShape(shape){return shape.trim().split(/\s+/).map(t=>{const [a,w]=t.split('~');const [a2,d]=a.split('^');const [x,sp]=a2.split('/').map(Number);return {x,sp,w:w?+w:1,d:d?+d:0};});}
function stepOf(L,role){const b=L.bosses[role];return Math.max(L.cfg.minShotDelay,b.delay[0]*b.cadence*L.phases[0].cadence);}
// Вес паузы ~w у пары битов означает: (а) время прилёта разнесено в w раз, (б) при gs>0 ещё и МЕЖДУ ПОЯВЛЕНИЯМИ (shotGapsMs, не сжимается в ф3) —
// это единственный способ развести быстрые атаки, у которых время полёта почти не регулируется (окно y 4-10 даёт ~±100 мс).
function fitShape(L,role,shape,target,a0min,gmax,a0span){
  const tk=parseShape(shape),T=+target||200,A0=a0min||900,GM=gmax||520; const MIN=pm.SEQ_MIN_MS+15; const step=stepOf(L,role);
  const fast=tk.map((o,i)=>o.sp>8?i:-1).filter(i=>i>=0), slow=tk.map((o,i)=>o.sp<=8?i:-1).filter(i=>i>=0);
  const weighted=tk.some((o,i)=>i>0&&o.w>1); let best=null;
  for(const gs of (weighted?[0,350,500,600,700,850]:[0])){
    const gaps=gs>0?tk.map((o,i)=>i>0&&o.w>1?gs:0).slice(1):null;
    for(let a0=A0;a0<=A0+(a0span===undefined?700:a0span);a0+=50) for(let g=60;g<=GM;g+=20) for(const sk of (slow.length?[-200,0,200,400,600]:[0])){
      const at=new Array(tk.length);let t=a0;
      fast.forEach((i,n)=>{if(n>0)t+=g*tk[i].w;at[i]=Math.round(t/10)*10;});
      const endF=Math.max(...fast.map(i=>at[i]));
      slow.forEach(i=>{at[i]=Math.round((endF+sk+200)/10)*10;});
      const sl=evalBeats(L,role,tk,at,gaps); if(!sl||Math.min(...sl)<MIN) continue;
      const d=Math.abs(sl[2]-T); const sp=Math.max(...(sl.real||at))-Math.min(...(sl.real||at));
      if(!best||d<best.d||(d===best.d&&sp<best.sp)) best={d,sl,at:sl.real||at,sp,gaps};
    }
  }
  if(!best&&!fitShape._retry&&a0min===undefined){ fitShape._retry=true; let r=fitShape(L,role,shape,target,1800,gmax,800); if(!r) r=fitShape(L,role,shape,target,2600,gmax,900); fitShape._retry=false; if(r) return r; }
  return best?{sl:best.sl,beats:tk.map((o,i)=>o.x+'/'+o.sp+'@'+best.at[i]).join(' '),gaps:best.gaps}:null;
}

// Комбо из «прижатых» атак (быстрые сверху с окном y 4-10 ~ время полёта почти не регулируется; медленные бомбы): времена прилёта задаёт скорость,
// а расстановку по времени — ПАУЗЫ МЕЖДУ ПОЯВЛЕНИЯМИ (shotGapsMs). Перебор пауз для формы автора: наиболее близкая к цели тугость ф3 при честности.
function fitGaps(L,role,shape,target,slowAt){
  const tk=parseShape(shape).map(o=>({...o,w:1})),T=+target||200,MIN=pm.SEQ_MIN_MS+15; const n=tk.length; const opts=n>4?[0,250,550]:n>3?[0,250,400,700]:[0,150,250,350,450,550,700,900,1100];
  const step=stepOf(L,role); let best=null;
  const ctx0=lib.ctxFor(L,role), bb0=ctx0.bossCombatConfig.bosses[role];
  const baseFlight=(sp)=>{ const eb=ctx0.ENEMY_TYPES[role+role.slice(-1)]; const pps=eb.baseSpeed*sp*bb0.speedMultiplier*L.phases[0].speed*model.BASE_SPEED_GAME; return model.flightMs(5,pps,bb0.movementStyle||null,ctx0.bossCombatConfig.movementStyles); };
  const rec=(i,g)=>{ if(i===n){ const gaps=g.slice(); let cur=0; const at=tk.map((o,i)=>{ if(i>0) cur+=Math.max(step,gaps[i-1]||0); return Math.round(((o.sp<=8?(slowAt||3000):baseFlight(o.sp,o.x)-(o.d||0))+cur)/10)*10; }); const sl=evalBeats(L,role,tk,at,gaps); if(!sl||Math.min(...sl)<MIN) return; const d=Math.abs(sl[+process.env.FITPH||2]-T); const real=sl.real; const sp=Math.max(...real)-Math.min(...real); if(!best||d<best.d||(d===best.d&&sp<best.sp)) best={d,sl,at:real,gaps,sp}; return; } for(const o of opts){ g.push(o); rec(i+1,g); g.pop(); } };
  rec(1,[]);
  return best?{sl:best.sl,beats:tk.map((o,i)=>o.x+'/'+o.sp+'@'+best.at[i]).join(' '),gaps:best.gaps}:null;
}
function fitTail(L,role,prefix,tail,target){
  const pre=prefix.trim().split(/\s+/); const tl=parseShape(tail); const T=+target||200; const MIN=pm.SEQ_MIN_MS+15;
  const preTk=pre.map(b=>{const [a,t]=b.split('@');const [x,sp]=a.split('/').map(Number);return {x,sp,t:+t};});
  const lastPre=Math.max(...preTk.map(b=>b.t)); let best=null;
  for(let a=lastPre-500;a<=lastPre+700;a+=50) for(let g=0;g<=500;g+=25){
    const tk=[...preTk,...tl]; const at=[...preTk.map(b=>b.t),...tl.map((_,i)=>a+i*g)];
    const sl=evalBeats(L,role,tk,at); if(!sl||Math.min(...sl)<MIN) continue; const d=Math.abs(sl[2]-T); if(!best||d<best.d) best={d,sl,at,tk};
  }
  return best?{sl:best.sl,beats:best.tk.map((o,i)=>o.x+'/'+o.sp+'@'+best.at[i]).join(' ')}:null;
}
module.exports={fitGaps,fitShape,fitTail,evalBeats,parseShape};
