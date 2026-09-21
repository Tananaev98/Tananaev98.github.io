// bp.js N — параметры боссов уровня и производные пределы для авторской расстановки скоростей (справка, не проверка).
const lib=require('./lib.js');const N=+process.argv[2];const L=require('./design'+N+'.js');
const ph=L.phases[2].speed;
console.log('уровень',N,'| cfg',JSON.stringify(L.cfg),'| фазы speed',L.phases.map(p=>p.speed).join('/'),'cad',L.phases.map(p=>p.cadence).join('/'),'| delays');
for(const r of Object.keys(L.bosses)){const b=L.bosses[r];const c=lib.ctxFor(L,r).bossCombatConfig.bosses[r];const mv=Math.max(...c.speedVariance);const m=c.speedMultiplier*ph*mv;
 const step=[0,1,2].map(i=>Math.round(Math.max(L.cfg.minShotDelay,b.delay[0]*b.cadence*L.phases[i].cadence)));
 console.log(r,b.title,'|',b.style,'mult',c.speedMultiplier,'mv',mv,'tele',b.telegraphMs,'delay',JSON.stringify(b.delay),'step',step.join('/'),
  '| maxS(y<=10)',(31/m).toFixed(1),'fast>=',(18/m).toFixed(1),'slowMax',Math.min(8,Math.floor(11.5/m)),'longThr~',(15.4/c.speedMultiplier).toFixed(1));}
