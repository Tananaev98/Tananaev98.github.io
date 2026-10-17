// rotview.js N enemK "x/sp@прилёт x/sp@прилёт ..." "паузы через запятую" — запас живого игрока по КАЖДОМУ из 5 вращений speedVariance и фазам (для понимания разброса худший/типичный)
const F=require('./fitlib.js'),lib=require('./lib.js'),model=lib.model,pm=require('../player-model.js');
const n=+process.argv[2],role=process.argv[3];const L=require('./design'+n+'.js');
const tk=process.argv[4].trim().split(/\s+/).map(t=>{const [a,b]=t.split('@');const [x,sp]=a.split('/').map(Number);return {x,sp,at:+b};});
const gaps=(process.argv[5]||'').split(',').filter(s=>s!=='').map(Number);
const bts=lib.solveCombo(L,role,{id:'z',tolerant:true,gaps:gaps.length?gaps:undefined,beats:tk.map(o=>[o.x,o.at,o.sp,null])},{},new Set(),new Set());
const ctx=lib.ctxFor(L,role);const ab=bts.map(x=>({boss:role,xPos:x.x,yPos:x.y,customSpeed:x.s}));const idx=ab.map((_,i)=>i);const co={shotGapsMs:gaps.length?gaps:undefined};
console.log('атаки:',ab.map(a=>`x${a.xPos} y${a.yPos} sp${a.customSpeed}`).join(' | '));
for(let ph=0;ph<3;ph++){const tele=Math.max(L.cfg.minTelegraphMs,L.bosses[role].telegraphMs*L.phases[ph].telegraphMultiplier);
 const rots=model.analyzeAllRot(ctx,role,ab,idx,ph,co);
 console.log('ф'+(ph+1),'запас по вращениям:',rots.map(r=>pm.sequentialSlack(ab,r.arrivals,r.offsets,tele,r.lateral)).join(' / '),' прилёты(вращ.0):',rots[0].arrivals.map(Math.round).join(','),' появления:',rots[0].offsets.map(Math.round).join(','));}
