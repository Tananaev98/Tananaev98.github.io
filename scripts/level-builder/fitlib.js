// Калибровка времён прилёта под тугость для формы, заданной автором (см. fit.js). Медленные (скорость<=8) биты: прилёт = конец быстрых + сдвиг.
const lib=require('./lib.js'),model=lib.model,pm=require('../player-model.js');
let WHY='';function why(x){WHY=x;return null;}
// КОНТЕКСТ КОНВЕЙЕРА (2026-09-26): подбор обязан видеть то же, что построит run.js — (а) скалярные константы уровня сдвинуты до свободных значений (nudgeScalars),
// (б) геометрия x/y/скорость, занятая на других уровнях и в уже построенных комбо роли, сдвигает x на ±1..12 (solveCombo). Без этого «подобранные» запасы расходились с
// построенными на 100-400 мс (комбо x=30/70 сдвигались к телу босса). used накапливается ТОЛЬКО через commit() (принятые комбо, в порядке a..h). NONUDGE=1 — старое поведение.
const fsx=require('fs'),pathx=require('path');let PREP=null;
function prep(L){ if(PREP&&PREP.L===L) return PREP; let inv=null;for(let t=0;t<5&&!inv;t++){try{inv=JSON.parse(fsx.readFileSync(pathx.join(__dirname,'inv.json'),'utf8'));}catch(e){const w=Date.now();while(Date.now()-w<400){}}}
  const avoid={};lib.ROLES.forEach(r=>avoid[r]=new Set());
  inv.filter(l=>l.n!==L.n).forEach(l=>l.bosses.forEach(b=>b.attacks.forEach(a=>avoid[b.role].add(`${a.xPos}/${a.yPos}/${a.customSpeed}/${a.waveAmplitude!==undefined?a.waveAmplitude:'-'}/${a.waveFrequency!==undefined?a.waveFrequency:'-'}`))));
  if(!process.env.NONUDGE&&!L._nudged){lib.nudgeScalars(L,inv);L._nudged=true;}
  PREP={L,avoid,used:{}};return PREP; }
// settle: свободная геометрия БЕЗ дальних сдвигов. Конвейер сдвигает занятый x/y/скорость на ±12 (C-полоса уезжала 30 -> 38, полоса пропадала). Здесь x двигается
// только в пределах своей полосы (C-лево 29..31, C-право 69..71, L/R ±3 с сохранением стороны), ключ x/5/скорость; если свободного нет — предупреждение (менять скорость формы на ±1).
function sideOf2(x){return x<=28?'L':x>=72?'R':'C';}
function settle(L,role,tk){ if(process.env.NONUDGE||process.env.NOSETTLE) return tk; const P=prep(L); let loose=false;const taken=(k)=>P.avoid[role].has(k)||(!loose&&P.used[role]&&P.used[role].has(k)); const local=new Set(); const warn=[];
  const ctx0=lib.ctxFor(L,role),bb0=ctx0.bossCombatConfig.bosses[role],eb=ctx0.ENEMY_TYPES[role+role.slice(-1)];
  const fl=(sp,y)=>{const pps=eb.baseSpeed*sp*bb0.speedMultiplier*L.phases[0].speed*model.BASE_SPEED_GAME;return model.flightMs(y,pps,bb0.movementStyle||null,ctx0.bossCombatConfig.movementStyles);};
  const out=tk.map(o=>{ if(o.sp<=8) return {...o}; const sd=sideOf2(o.x);
    // полосы по РЕАЛЬНОМУ положению (журнал ур.25): слева x<=25 (27..40 боссом сдвигаются на 16..24), справа центр K 68..71 (66/67 сдвигаются), R >=72
    let ox=(sd==='C'&&o.x>=50)?70:o.x; let rng=sd==='C'?(o.x<50?[29,31]:[+(process.env.CLOW||69),71]):(sd==='L'?[Math.max(4,o.x-4),Math.min(25,o.x+4)]:[Math.max(72,o.x-4),Math.min(96,o.x+4)]); let pick=null;
    // сначала сохраняем x и меняем высоту старта y (5..9: потолок скорости 31 действует до y=9) — это меняет ключ x/y/скорость почти без влияния на дорожки; затем сдвигаем x в пределах полосы
    outer: for(const dx of [0,1,-1,2,-2,3,-3,4,-4,-5,-6,-7,-8,-9,-10,-11,-12]){ const x=ox+dx; if(x<rng[0]||x>rng[1]) continue;
      for(const y of (x<=68?[5]:[5,6,7,8,9])){ const k=x+'/'+y+'/'+o.sp+'/'+(o.wv?o.wv[0]:'-')+'/'+(o.wv?o.wv[1]:'-'); if(!taken(k)&&!local.has(k)){pick={x,y,k};break outer;} } }
    if(!pick&&L.reuseKeys){ loose=true; outer2: for(const dx of [0,1,-1,2,-2,3,-3,4,-4,-5,-6,-7,-8,-9,-10,-11,-12]){ const x=ox+dx; if(x<rng[0]||x>rng[1]) continue; for(const y of (x<=68?[5]:[5,6,7,8,9])){ const k=x+'/'+y+'/'+o.sp+'/'+(o.wv?o.wv[0]:'-')+'/'+(o.wv?o.wv[1]:'-'); if(!taken(k)&&!local.has(k)){pick={x,y,k};break outer2;} } } loose=false; }
    if(!pick){warn.push(o.x+'/'+o.sp);pick={x:ox,y:5,k:ox+'/5/'+o.sp+'/-/-'};}
    local.add(pick.k); return {...o,x:pick.x,d:Math.round(fl(o.sp,5)-fl(o.sp,pick.y))}; });
  if(warn.length) out.warn=warn; return out; }
function commit(L,role,tk,at,gaps,combo={}){ const P=prep(L); const u=(P.used[role]||=new Set()); lib.solveCombo(L,role,{...combo,id:'c',tolerant:true,gaps:gaps&&gaps.length?gaps:undefined,beats:tk.map((o,i)=>[o.x,at[i],o.sp,o.wv||null])},{},P.avoid[role],u); }
function evalBeats(L,role,tk,at,gaps,combo={}){
  const ctx=lib.ctxFor(L,role); const co={isChain:combo.isChain,shotDelayMs:combo.shotDelayMs,shotGapsMs:gaps&&gaps.length?gaps:undefined};
  let bts;try{const P=process.env.NONUDGE?null:prep(L);bts=lib.solveCombo(L,role,{...combo,id:'z',tolerant:true,gaps:gaps&&gaps.length?gaps:undefined,beats:tk.map((o,i)=>[o.x,at[i],o.sp,o.wv||null])},{},P?P.avoid[role]:new Set(),P?new Set(P.used[role]||[]):new Set());}catch(e){return why('solve');}
  const ab=bts.map(x=>({boss:role,xPos:x.x,yPos:x.y,customSpeed:x.s,waveAmplitude:x.w?x.w[0]:undefined}));const idx=ab.map((_,i)=>i);
  { const bb=ctx.bossCombatConfig.bosses[role]; const mv=Math.max(...(bb.speedVariance||[1]));
    for(const a of ab) for(let ph=0;ph<3;ph++){ const proj=a.customSpeed*bb.speedMultiplier*L.phases[ph].speed*mv; const cap=a.yPos>11?15:a.yPos>9?18:31; if(proj>cap) return why('cap'); if(a.customSpeed<=10&&proj>11.5) return why('anticheese'); } }
  for(let ph=0;ph<3;ph++){ const an0=model.analyze(ctx,role,ab,idx,ph,co); if((!combo.isChain&&!model.verdict(an0).ok) || (ab.length>=2 && an0.spread<80)) { if(process.env.FITDBG) console.error('  dbg ph'+ph+' rot0 spread',Math.round(an0.spread),model.verdict(an0).why||'spread<80','arrivals',an0.arrivals.map(Math.round).join(',')); return why('verdict/spread<80'); } }
  if(combo.isChain){
    if(!L.attackChains||ab.length<3||ab.length>7||ab.some(a=>a.yPos>26))return why('chain-geometry');
    const b=ctx.bossCombatConfig.bosses[role],v=b.speedVariance;
    for(let ph=0;ph<3;ph++){const an=model.analyze(ctx,role,ab,idx,ph,co);if(an.shotDelay<12/(.020*120*18)*1000)return why('chain-gap');
      for(let rot=0;rot<v.length;rot++){const speeds=ab.map((a,i)=>a.customSpeed*b.speedMultiplier*L.phases[ph].speed*v[(rot+i)%v.length]);if(speeds[0]>18||speeds.some((s,i)=>i>0&&s>speeds[i-1]+1e-9))return why('chain-speed');}}
  }
  // 5.1: быстрые (итоговая скорость >=18) атаки противоположных флангов — не ближе 720 мс по моментам ПОЯВЛЕНИЯ
  { const bb=ctx.bossCombatConfig.bosses[role]; const mv=Math.max(...(bb.speedVariance||[1]));
    for(let ph=0;ph<3;ph++){ const an=model.analyze(ctx,role,ab,idx,ph,co); let lL=-1e9,lR=-1e9;
      for(let i=0;i<ab.length;i++){ const a=ab[i]; const side=a.xPos<=28?'L':a.xPos>=72?'R':'C'; if(side==='C'||a.customSpeed*bb.speedMultiplier*L.phases[ph].speed*mv<18) continue;
        const opp=side==='L'?lR:lL; if(an.offsets[i]-opp<720) return why('cross-flank720'); if(side==='L') lL=an.offsets[i]; else lR=an.offsets[i]; } } }
  // прикрытие медленных (А7.4): другая атака на другой полосе (dx>=15) в пределах 600 мс прилёта в ф1 и ф3
  for(const ph of [0,2]){const an=model.analyze(ctx,role,ab,idx,ph,co);
    for(let i=0;i<ab.length;i++) if(ab[i].customSpeed<=8&&!ab.some((a,j)=>j!==i&&Math.abs(a.xPos-ab[i].xPos)>=15&&Math.abs(an.arrivals[j]-an.arrivals[i])<=600)) return why('cover');}
  const sl=[0,1,2].map(ph=>{const tele=Math.max(L.cfg.minTelegraphMs,L.bosses[role].telegraphMs*L.phases[ph].telegraphMultiplier);const rots=model.analyzeAllRot(ctx,role,ab,idx,ph,co);return pm.worstSequentialSlack(ab,rots,tele);});
  // ТИПИЧНЫЙ запас (медиана по 5 вращениям) — то, что игрок видит в бою (А9.7); худший (sl) остаётся условием «возможно»
  sl.typ=[0,1,2].map(ph=>{const tele=Math.max(L.cfg.minTelegraphMs,L.bosses[role].telegraphMs*L.phases[ph].telegraphMultiplier);return pm.typicalSequentialSlack(ab,model.analyzeAllRot(ctx,role,ab,idx,ph,co),tele);});
  sl.geo=ab.map(a=>a.xPos+'/'+a.yPos);
  sl.real=model.analyze(ctx,role,ab,idx,0,co).arrivals.map(Math.round);
  return sl;
}
function parseShape(shape){return shape.trim().split(/ +/).map(t=>{const [t0,fg]=t.split('!');const [t1,wvs]=t0.split('#');const [a,w]=t1.split('~');const [a2,d]=a.split('^');const [x,sp]=a2.split('/').map(Number);return {x,sp,w:w?+w:1,d:d?+d:0,fg:fg!==undefined?+fg:undefined,wv:wvs?wvs.split(',').map(Number):undefined};});}
function stepOf(L,role,combo={}){const b=L.bosses[role];return Math.max(L.cfg.minShotDelay,b.delay[0]*b.cadence*L.phases[0].cadence,combo.shotDelayMs||0);}
// Вес паузы ~w у пары битов означает: (а) время прилёта разнесено в w раз, (б) при gs>0 ещё и МЕЖДУ ПОЯВЛЕНИЯМИ (shotGapsMs, не сжимается в ф3) —
// это единственный способ развести быстрые атаки, у которых время полёта почти не регулируется (окно y 4-10 даёт ~±100 мс).
// FITTYP=1: подбор по ТИПИЧНОМУ запасу (А9.7): цель T — типичный запас ф3, ф1/ф2 — T*1.75/T*1.3 (env FITK="1.75,1.3"); условие «возможно» (худшее вращение >= MIN) прежнее.
function objective(sl,T,phEnv){ if(process.env.FITTYP){ if(typeof T==='string'&&T.includes('/')){const tg=T.split('/').map(Number);const A=+process.env.FITASYM||1;const M=+process.env.FITMONO||0;const mono=M?M*(Math.max(0,sl.typ[1]-sl.typ[0]+60)+Math.max(0,sl.typ[2]-sl.typ[1]+30)):0;return mono+sl.typ.reduce((t,v,i)=>t+(v>tg[i]?A:1)*Math.abs(v-tg[i]),0);} const k=(process.env.FITK||'1.75,1.3').split(',').map(Number);const tg=[T*k[0],T*k[1],T];return sl.typ.reduce((t,v,i)=>t+Math.abs(v-tg[i]),0);} return Math.abs(sl[phEnv===undefined?2:phEnv]-T); }
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
      const d=objective(sl,T); const sp=Math.max(...(sl.real||at))-Math.min(...(sl.real||at));
      if(!best||d<best.d||(d===best.d&&sp<best.sp)) best={d,sl,at:sl.real||at,sp,gaps};
    }
  }
  if(!best&&!fitShape._retry&&a0min===undefined){ fitShape._retry=true; let r=fitShape(L,role,shape,target,1800,gmax,800); if(!r) r=fitShape(L,role,shape,target,2600,gmax,900); fitShape._retry=false; if(r) return r; }
  return best?{d:best.d,warn:fitGaps.warn,sl:best.sl,typ:best.sl.typ,geo:best.sl.geo,xs:tk.map(o=>o.x),beats:tk.map((o,i)=>o.x+'/'+o.sp+'@'+best.at[i]+(o.wv?'~'+o.wv.join(','):'')).join(' '),gaps:best.gaps}:null;
}

// Комбо из «прижатых» атак (быстрые сверху с окном y 4-10 ~ время полёта почти не регулируется; медленные бомбы): времена прилёта задаёт скорость,
// а расстановку по времени — ПАУЗЫ МЕЖДУ ПОЯВЛЕНИЯМИ (shotGapsMs). Перебор пауз для формы автора: наиболее близкая к цели тугость ф3 при честности.
function fitGaps(L,role,shape,target,slowAt,combo={}){
  const tk0=parseShape(shape).map(o=>({...o,w:1})); const tk=settle(L,role,tk0); fitGaps.warn=tk.warn||null; const T=(typeof target==='string'&&target.includes('/'))?target:(+target||200),MIN=pm.SEQ_MIN_MS+15; const n=tk.length; const opts=process.env.FITOPTS?process.env.FITOPTS.split(',').map(Number):n>4?[0,250,550]:n>3?[0,250,400,700]:[0,150,250,350,450,550,700,900,1100];
  const step=stepOf(L,role,combo); let best=null;
  const ctx0=lib.ctxFor(L,role), bb0=ctx0.bossCombatConfig.bosses[role];
  const baseFlight=(sp)=>{ const eb=ctx0.ENEMY_TYPES[role+role.slice(-1)]; const pps=eb.baseSpeed*sp*bb0.speedMultiplier*L.phases[0].speed*model.BASE_SPEED_GAME; return model.flightMs(5,pps,bb0.movementStyle||null,ctx0.bossCombatConfig.movementStyles); };
  const rec=(i,g)=>{ if(i===n){ const gaps=g.slice(); let cur=0; const at=tk.map((o,i)=>{ if(i>0) cur+=Math.max(step,gaps[i-1]||0); return Math.round(((o.sp<=8?(slowAt||3000):baseFlight(o.sp,o.x)-(o.d||0))+cur)/10)*10; }); const sl=evalBeats(L,role,tk,at,gaps,combo); if(!sl||Math.min(...sl)<MIN) return; const d=objective(sl,T,+process.env.FITPH||2); const real=sl.real; const sp=Math.max(...real)-Math.min(...real); if(!best||d<best.d||(d===best.d&&sp<best.sp)) best={d,sl,at:real,gaps,sp}; return; } for(const o of (tk[i]&&tk[i].fg!==undefined?[tk[i].fg]:opts)){ g.push(o); rec(i+1,g); g.pop(); } };
  rec(1,[]);
  return best?{sl:best.sl,typ:best.sl.typ,geo:best.sl.geo,beats:tk.map((o,i)=>o.x+'/'+o.sp+'@'+best.at[i]+(o.wv?'~'+o.wv.join(','):'')).join(' '),gaps:best.gaps}:null;
}
function fitTail(L,role,prefix,tail,target){
  const pre=prefix.trim().split(/\s+/); const tl=parseShape(tail); const T=+target||200; const MIN=pm.SEQ_MIN_MS+15;
  const preTk=pre.map(b=>{const [a,t]=b.split('@');const [x,sp]=a.split('/').map(Number);return {x,sp,t:+t};});
  const lastPre=Math.max(...preTk.map(b=>b.t)); let best=null;
  for(let a=lastPre-500;a<=lastPre+700;a+=50) for(let g=0;g<=500;g+=25){
    const tk=[...preTk,...tl]; const at=[...preTk.map(b=>b.t),...tl.map((_,i)=>a+i*g)];
    const sl=evalBeats(L,role,tk,at); if(!sl||Math.min(...sl)<MIN) continue; const d=Math.abs(sl[2]-T); if(!best||d<best.d) best={d,sl,at,tk};
  }
  return best?{sl:best.sl,typ:best.sl.typ,geo:best.sl.geo,beats:best.tk.map((o,i)=>o.x+'/'+o.sp+'@'+best.at[i]).join(' ')}:null;
}
module.exports={commit,prep,why:()=>WHY,fitGaps,fitShape,fitTail,evalBeats,parseShape};
