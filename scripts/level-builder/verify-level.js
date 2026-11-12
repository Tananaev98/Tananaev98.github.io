// Preservation and integration checks against actual game functions, after run.js has passed.
// Usage: node scripts/level-builder/verify-level.js N path/to/gameData-before.js
const fs=require('fs'),vm=require('vm'),assert=require('assert'),model=require('../combo-model');
const {loadRuntime}=require('../combat-runtime-harness');
const pm=require('../player-model');
const n=Number(process.argv[2]),beforePath=process.argv[3];
assert(n&&beforePath,'Specify level number and original snapshot');
function data(source){const c={};vm.runInNewContext(source+'\nthis.d={ENEMY_TYPES,bossCombatConfig,bossAbilities,bossAbilitiesDop,upgradeNames:typeof UPGRADE_VARIANT_NAMES!=="undefined"?UPGRADE_VARIANT_NAMES:null,completion:typeof levelCompletionConfig!=="undefined"?levelCompletionConfig:null};',c);return JSON.parse(JSON.stringify(c.d));}
const old=data(fs.readFileSync(beforePath,'utf8')),now=data(fs.readFileSync(`lvlData/gameData${n}.js`,'utf8'));
assert.deepStrictEqual(now.ENEMY_TYPES,old.ENEMY_TYPES,'Enemy stats, images, names and animations must be preserved');
assert.deepStrictEqual(now.upgradeNames,old.upgradeNames,'Upgrade names must be preserved');
assert.deepStrictEqual(now.completion,old.completion,'Completion configuration must be preserved');
for(const k of ['damageMultiplier','scaleLongComboDamage','scaleShortComboDamage','musicMood'])assert.deepStrictEqual(now.bossCombatConfig[k],old.bossCombatConfig[k],k);
assert.deepStrictEqual(now.bossCombatConfig.phases.map(p=>p.damage),old.bossCombatConfig.phases.map(p=>p.damage),'phase.damage');
const roles=['enem1','enem2','enem3','enem4','enem5'];
for(const role of roles){
 const a=now.bossCombatConfig.bosses[role],b=old.bossCombatConfig.bosses[role];
 for(const k of ['damageMultiplier','healthMultiplier','appearMessage','phaseMessages'])assert.deepStrictEqual(a[k],b[k],role+'.'+k);
 const values=d=>[...new Set(d.bossAbilities.filter(a=>a.boss===role).map(a=>a.customDamage))].sort((a,b)=>a-b);
 assert.deepStrictEqual(values(now),values(old),role+' damage values');
 const chains=now.bossAbilitiesDop.filter(c=>c.boss===role&&c.isChain);
 assert(chains.length>0,role+' must use chains');
 assert(chains.some(c=>c.openingOrder===1&&c.signature&&(c.minPhase||1)===1),role+' chain introduction');
 for(const chain of chains)assert(chain.indexAbilities.length>=3&&chain.indexAbilities.length<=7);
}
assert(now.bossAbilities.every(a=>a.customHP===1),'One-hit deflections');assert(now.bossCombatConfig.attackChains);
console.log(`Protected stats/damage/images/messages; ${now.bossAbilitiesDop.length} combos; chains for all five opponents — PASS`);
const rt=loadRuntime(n),api=rt.api,level=model.loadLevel(n);rt.window.Math.random=()=>.5;
let samples=0,maxError=0,waves=0,dispatched=0,minActualSlack=Infinity,minBarricadeRecovery=Infinity,minSeriesRecovery=Infinity;const executionFailures=[];
if(n>=25)for(const [i,a]of now.bossAbilities.entries()){
 const x=a.xPos;
 if(!((x>=4&&x<=25)||(x>=69&&x<=94)))executionFailures.push(`${a.boss}/attack${i}: outside real lanes x=${x}, y=${a.yPos}, speed=${a.customSpeed}`);
}
try{
 for(const role of roles){
  const attacks=level.bossAbilities.filter(a=>a.boss===role),combos=level.bossAbilitiesDop.filter(c=>c.boss===role),profile=level.bossCombatConfig.bosses[role];
  for(let ph=0;ph<3;ph++){
   api.setBoss(role,ph);let since=0,lastBarWave=-Infinity;
   for(let wave=0;wave<20;wave++){
    const c=api.select(combos,attacks,api.phase());assert(c);waves++;
    if(wave===0)assert.equal(c.openingOrder,0);
    if(wave===1)assert(c.isChain,'Second wave must introduce the chain');
    if(n===66&&wave===2)assert(c.barricade&&c.openingOrder===2,'Third wave must introduce a mixed barricade combo');
    if(c.barricade){assert(wave-lastBarWave>=level.bossCombatConfig.selection.historyLength+1,'Barricade must respect history');lastBarWave=wave;}
    if(c.isChain)since=0;else since++;
    if(combos.filter(c=>c.signature).every(c=>c.isChain))assert(since<profile.signatureEvery,'Chain must recur regularly');
    assert((c.minPhase||1)<=ph+1);
   }
   for(const c of combos)for(const r of model.analyzeAllRot(level,role,attacks,c.indexAbilities,ph,c)){
    const actualArrivals=[];
    for(let i=0;i<c.indexAbilities.length;i++){
    api.setWave(r.rot);const attack=attacks[c.indexAbilities[i]],prediction=r.arrivals[i]-r.offsets[i];
    const actual=rt.flight(attack,api.speed(attack,level.bossCombatConfig.phases[ph],profile,i),profile.movementStyle);
    actualArrivals.push(r.offsets[i]+actual);
    const error=Math.abs(actual/prediction-1);maxError=Math.max(maxError,error);
    assert(error<=.1,`${role}/phase${ph+1}/shot${i+1}: actual ${actual}, model ${prediction}`);samples++;
    }
    const tele=Math.max(level.bossCombatConfig.minTelegraphMs,profile.telegraphMs*level.bossCombatConfig.phases[ph].telegraphMultiplier);
    const slack=pm.sequentialSlack(c.indexAbilities.map(i=>attacks[i]),actualArrivals,r.offsets,tele,r.lateral,r.blockOrder);
    if(c.barricade||n===66){
     const timeline=pm.sequentialTimeline(c.indexAbilities.map(i=>attacks[i]),actualArrivals,r.offsets,tele,r.lateral,r.blockOrder);
     const recovery=level.bossCombatConfig.minWaveDelay-timeline.steps.at(-1).end;
     if(c.barricade)minBarricadeRecovery=Math.min(minBarricadeRecovery,recovery);
     minSeriesRecovery=Math.min(minSeriesRecovery,recovery);
     if(recovery<600)executionFailures.push(`${role}/phase${ph+1}/rotation${r.rot}: only ${Math.round(recovery)}ms after barricade before earliest next telegraph`);
    }
    if(slack<60)executionFailures.push(`${role}/combo${combos.indexOf(c)}/phase${ph+1}/rotation${r.rot}: actual slack ${slack}; actual arrivals ${actualArrivals.map(Math.round)}; model arrivals ${r.arrivals.map(Math.round)}`);
    minActualSlack=Math.min(minActualSlack,slack);
   }
  }
 }
 if(n>=66){
  const original=[...api.combos];
  try{for(const role of roles)for(let ph=0;ph<3;ph++)for(const c of original.filter(c=>c.boss===role&&(c.minPhase||1)<=ph+1)){
   api.stop();api.setBoss(role,ph);api.combos.splice(0,api.combos.length,c);
   assert(api.execute(),`${role}/HP${ph+1}: actual dispatch rejected combo`);
   const members=level.bossAbilities.filter(a=>a.boss===role),r=model.analyze(level,role,members,c.indexAbilities,ph,c);
   const tele=Math.max(level.bossCombatConfig.minTelegraphMs,level.bossCombatConfig.bosses[role].telegraphMs*level.bossCombatConfig.phases[ph].telegraphMultiplier);
   rt.advance(Math.max(...r.offsets)+tele+10);
   const state=api.status();assert.equal(state.pending,0);assert.equal(state.enemies.length,c.indexAbilities.length,'Actual dispatch must not truncate combo');
   state.enemies.forEach((enemy,i)=>{
    const attack=members[c.indexAbilities[i]];
    assert.equal(enemy.hp,attack.barricadeHits||1,'Actual spawned HP must match hit counter');
    assert.equal(enemy.isBarricade,!!attack.barricadeHits);
    enemy.element.remove();
   });
   if(c.isChain){assert(state.enemies[0].chainVulnerable);assert(state.enemies.slice(1).every(e=>e.chainVulnerable===false));}
   dispatched++;
  }}finally{api.stop();api.combos.splice(0,api.combos.length,...original);}
  assert.deepStrictEqual(rt.errors,[],'Actual dispatch runtime errors');
 }
 assert.equal(executionFailures.length,0,executionFailures.join('\n'));
 console.log(`Actual selector: ${waves} waves; introduction, recurrence and phase gates — PASS`);
 console.log(`Actual Enemy.update: ${samples} trajectories; maximum deviation ${(maxError*100).toFixed(2)}%; minimum actual slack ${Math.round(minActualSlack)} ms — PASS`);
 if(Number.isFinite(minBarricadeRecovery))console.log(`Barricade series: full multi-hit service; minimum recovery before earliest next telegraph ${Math.round(minBarricadeRecovery)} ms — PASS`);
 if(n===66)console.log(`All level 66 series: minimum recovery before earliest next telegraph ${Math.round(minSeriesRecovery)} ms — PASS`);
 if(dispatched)console.log(`Actual asynchronous executeBossEvent: ${dispatched} eligible combo/HP cases, complete spawns, exact barricade HP, linked chains — PASS`);
}finally{rt.close();}

