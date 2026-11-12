// Actual selector + actual wave delay: include every barricade hit, without
// the historical pressure report's estimated +2500ms combo duration.
'use strict';
const assert=require('assert'),{loadRuntime}=require('./combat-runtime-harness');
const n=Number(process.argv[2]||66),rt=loadRuntime(n);let failures=0;
try{for(const role of ['enem1','enem2','enem3','enem4','enem5'])for(let ph=0;ph<3;ph++){
 const runs=[];
 for(const seed of [17,101,997]){
  let rng=seed;rt.window.Math.random=()=>((rng=(Math.imul(rng,1664525)+1013904223)>>>0)/4294967296);
  rt.api.setBoss(role,ph);const a=rt.api.abilities.filter(a=>a.boss===role),cs=rt.api.combos.filter(c=>c.boss===role),p=rt.api.phase(),b=rt.api.config.bosses[role];
  let time=0,hits=0,targets=0,bars=0,lastBar=-Infinity,minBarGap=Infinity;
  for(let i=0;i<1000;i++){
   const c=rt.api.select(cs,a,p);assert(c);rt.api.setWave(i);
   const members=c.indexAbilities.map(k=>a[k]);hits+=members.reduce((s,a)=>s+(a.barricadeHits||1),0);targets+=members.length;
   if(c.barricade){bars++;minBarGap=Math.min(minBarGap,time-lastBar);lastBar=time;}
   const step=Math.max(rt.api.config.minShotDelay,rt.api.delays.find(d=>d.boss===role).bossDelayAb*b.cadence*p.cadence,c.shotDelayMs||0);
   const offsets=rt.api.schedule(c.indexAbilities,step,c.shotGapsMs);
   const tele=Math.max(rt.api.config.minTelegraphMs,b.telegraphMs*p.telegraphMultiplier);
   time+=Math.max(rt.api.waveDelay(),offsets.at(-1)+tele+(c.recoveryMs??rt.api.config.defaultRecoveryMs));
  }
  assert(minBarGap>=7000,`${role}/HP${ph+1}: barricades repeat too often`);
  runs.push({hitsPerMinute:hits*60000/time,targetsPerMinute:targets*60000/time,bars,minBarGap:Math.round(minBarGap)});
 }
 const max=Math.max(...runs.map(r=>r.hitsPerMinute)),cap=ph===0?46:ph===2?54:null;
 if(cap&&max>cap+1e-9)failures++;
 console.log(`${role} HP${ph+1}: ${runs.map(r=>r.hitsPerMinute.toFixed(1)).join('/')} hits/min; cap ${cap??'—'}; barricades ${runs.map(r=>r.bars).join('/')} per 1000 waves, min gap ${Math.min(...runs.map(r=>r.minBarGap))}ms — ${cap&&max>cap?'FAIL':'PASS'}`);
}}finally{rt.close();}
assert.equal(failures,0,'Actual multi-hit workload exceeds the combat pressure ceiling');
