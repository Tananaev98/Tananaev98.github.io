// Песочница проектирования: оценка ОДНОГО комбо (строка битов) для босса уровня N без запуска конвейера.
// node scripts/level-builder/try.js N enemK "x/скорость@прилёт x/скорость@прилёт ..." [shotDelayMs]
// Печатает по фазам: запас живого игрока (худшее из 5 вращений), разброс 9.1, порядок прилёта, полёты.
const lib=require('./lib.js'),model=lib.model,pm=require('../player-model.js');
const [,, n, role, str, sd]=process.argv; const L=require('./design'+n+'.js');
const combo={id:'t',tolerant:true,beats:str,shotDelayMs:sd&&sd[0]!=='['?+sd:undefined,gaps:sd&&sd[0]==='['?JSON.parse(sd):undefined};
const bts=lib.solveCombo(L,role,combo,{},new Set(),new Set());
const ctx=lib.ctxFor(L,role);const ab=bts.map(x=>({boss:role,xPos:x.x,yPos:x.y,customSpeed:x.s}));const idx=ab.map((_,i)=>i);
console.log('y:',bts.map(b=>`${b.x}/${b.s}:y${b.y}`).join(' '));
for(let ph=0;ph<3;ph++){
  const tele=Math.max(L.cfg.minTelegraphMs,L.bosses[role].telegraphMs*L.phases[ph].telegraphMultiplier);
  const rots=model.analyzeAllRot(ctx,role,ab,idx,ph,{shotGapsMs:combo.gaps}); const worst=Math.min(...rots.map(r=>pm.sequentialSlack(ab,r.arrivals,r.offsets,tele,r.lateral)));
  const nom=model.analyze(ctx,role,ab,idx,ph,{shotGapsMs:combo.gaps}); const v=model.verdict(nom);
  console.log(`ф${ph+1}: запас ${worst}  разброс ${Math.round(nom.spread)}${v.ok?'':' ✗'+v.why}  прилёты ${nom.arrivals.map(Math.round).join(',')}`);
}
