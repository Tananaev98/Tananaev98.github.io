// typslack.js [от] [до] — «типичный» запас живого игрока по уровням: медиана по 5 вращениям speedVariance (то, что игрок реально видит в среднем),
// рядом — худшая ротация (то, что проверяет А9.2). Сравнение с журналом боя ур.25 (2026-09-26): худшая ротация занижала запас в 2-3 раза.
const model=require('../combo-model.js'),pm=require('../player-model.js');
const a=+(process.argv[2]||1),b=+(process.argv[3]||25);
const med=x=>x.slice().sort((p,q)=>p-q)[Math.floor(x.length/2)];
for(let n=a;n<=b;n++){let lv;try{lv=model.loadLevel(String(n));}catch(e){continue;}
 const out=[];
 for(const boss of ['enem1','enem2','enem3','enem4','enem5']){const ab=lv.bossAbilities.filter(x=>x.boss===boss);const cbs=lv.bossAbilitiesDop.filter(x=>x.boss===boss);
  const row=[];
  for(let ph=0;ph<3;ph++){const tele=Math.max(lv.bossCombatConfig.minTelegraphMs,lv.bossCombatConfig.bosses[boss].telegraphMs*lv.bossCombatConfig.phases[ph].telegraphMultiplier);
   const list=cbs.filter(c=>c.indexAbilities.length>=2&&(c.minPhase||1)<=ph+1).map(c=>{const rots=model.analyzeAllRot(lv,boss,ab,c.indexAbilities,ph,c);
     const v=rots.map(r=>pm.sequentialSlack(c.indexAbilities.map(k=>ab[k]),r.arrivals,r.offsets,tele,r.lateral));return {typ:med(v),worst:Math.min(...v)};});
   row.push([med(list.map(x=>x.typ)),Math.min(...list.map(x=>x.typ)),med(list.map(x=>x.worst))]);}
  out.push(row);}
 const ph=p=>[0,1,2].map(i=>med(out.map(r=>r[p][i])));
 console.log('ур'+String(n).padStart(2),' ф1 типичн.медиана/мин комбо/худш.медиана',ph(0).join('/').padEnd(14),'| ф2',ph(1).join('/').padEnd(14),'| ф3',ph(2).join('/'));}
