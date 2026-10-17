// logslack.js <журнал> [N=25] — реальный запас живого игрока по журналу боя против прогноза модели (player-model.js) для тех же комбо.
// Запас блока = появление + ожидаемый полёт (та же функция стиля, что в модели; ДОШЛА-события подтверждают 0.98-1.02) − момент блока.
// НЕ используем строку «до героя оставалось»: игра считает её линейно по ТЕКУЩЕЙ скорости, для accelerate/lateRush/pause она врёт (ложное «1.18»).
// Ничего не пересчитывает по своим формулам: прогноз — те же вызовы combo-model/player-model, что использует --check (А9/А11).
const fs=require('fs'),path=require('path');
const model=require('../combo-model.js'),pm=require('../player-model.js');
const file=process.argv[2],N=process.argv[3]||'25';
const lv=model.loadLevel(N);
const L=fs.readFileSync(file,'utf8').split('\n');
const inst=[];const cur={};const byId={};
for(const l of L){
  let m=/^\[\s*([\d.]+)\] КОМБО\s+(enem\d) фаза (\d): комбо №(\d+) из \d+, атак (\d+), шаг (\d+) мс, телеграф (\d+) мс/.exec(l);
  if(m){const o={t:+m[1],boss:m[2],ph:+m[3]-1,combo:+m[4],n:+m[5],tele:+m[7],atk:{}};inst.push(o);cur[m[2]]=o;continue;}
  m=/^\[\s*([\d.]+)\] появилась #(\d+) (enem\d)\d x=(\d+)% y=(\d+)% скорость=([\d.]+).*ожидаемый полёт до героя ≈(\d+) мс.*комбо (\d+), шаг (\d+)/.exec(l);
  if(m){const o=cur[m[3]];if(o&&o.combo===+m[8]){const a={id:+m[2],t:+m[1],x:+m[4],flight:+m[7],speed:+m[6],step:+m[9]};o.atk[m[9]]=a;byId[m[2]]=a;}continue;}
  m=/^\[\s*([\d.]+)\] ОТБИТА\s+#(\d+) .*жила (\d+) мс, до героя оставалось ≈(-?\d+) мс/.exec(l);
  if(m&&byId[m[2]]){byId[m[2]].age=+m[3];byId[m[2]].block=Math.round(byId[m[2]].t*1000+byId[m[2]].flight-(+m[1])*1000);continue;}
  m=/УДАР\s+#(\d+) \w+ ДОШЛА до героя/.exec(l);
  if(m&&byId[m[1]]){byId[m[1]].hit=true;}
}
const med=a=>a.length?a.slice().sort((x,y)=>x-y)[Math.floor(a.length/2)]:NaN;
const out={};
for(const o of inst){
  const att=Object.values(o.atk); if(att.length<2) continue;
  const real=Math.min(...att.map(a=>a.hit?-100:(a.block===undefined?NaN:a.block)).filter(v=>!isNaN(v)));
  const ab=lv.bossAbilities.filter(a=>a.boss===o.boss);const cb=lv.bossAbilitiesDop.filter(a=>a.boss===o.boss)[o.combo];
  const tele=Math.max(lv.bossCombatConfig.minTelegraphMs,lv.bossCombatConfig.bosses[o.boss].telegraphMs*lv.bossCombatConfig.phases[o.ph].telegraphMultiplier);
  const rots=model.analyzeAllRot(lv,o.boss,ab,cb.indexAbilities,o.ph,cb);
  const pred=pm.worstSequentialSlack(cb.indexAbilities.map(k=>ab[k]),rots,tele);
  const key=o.boss+' ф'+(o.ph+1);(out[key]||=[]).push({real,pred,combo:o.combo,n:att.length});
}
console.log(path.basename(file));
console.log('босс/фаза       комбо  реальный мин.запас (медиана/мин/макс)   прогноз модели (медиана)   реальный/прогноз');
for(const k of Object.keys(out).sort()){const v=out[k];const r=v.map(x=>x.real),p=v.map(x=>x.pred);
  console.log(k.padEnd(14),String(v.length).padStart(4),'  ',[med(r),Math.min(...r),Math.max(...r)].join('/').padEnd(22),'  ',String(med(p)).padEnd(12),'  ',(med(r)/med(p)).toFixed(2));}
if(process.env.V){for(const k of Object.keys(out).sort()){console.log(k);out[k].forEach(x=>console.log('  комбо',x.combo,'реал',x.real,'прогноз',x.pred));}}
