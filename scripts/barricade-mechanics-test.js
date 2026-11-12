// Actual input cooldown, hit counter and movement, with presentation stubbed.
'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const model=require('./combo-model'),pm=require('./player-model');
const {loadRuntime}=require('./combat-runtime-harness');
const src=fs.readFileSync(require('path').join(__dirname,'../game.js'),'utf8');
function fn(name){const s=src.indexOf('function '+name+'('),e=src.indexOf('\n}',s)+2;assert(s>=0&&e>s,name);return src.slice(s,e);}
let time=10000,aimed,vfx=0;
const rect=()=>({left:0,top:0,width:100,height:100});
const ctx={Date:{now:()=>time},activeEnemies:[],bossM:['enem1'],SHOT_INTERVAL:100,
 aimPosition:{x:0,y:0},getEnemyAtPoint:()=>aimed,window:{},activeHeroObject:null,
 gameField:{getBoundingClientRect:rect},bossAliveName:'enem1',currentBoss:null,setTimeout(){},
 rollHeroAttackMultiplier(){return {multiplier:999999,kind:'critical'};},
 updateBarricadeRing(){},subsDamageEnemy(){},animateEnemyHit(){},playDamageSound(){},createWoundText(){},
 calculateDamage(){return {damage:999999,isCritical:true};},getHeroDeflectTiming(){return {};},globalWoundChance:1,
 resolveChainMember(){},beginEnemyDeathVisual(){return false;},playGenericEnemyDeathVisual(){}};
for(const hero of ['Eremei','Dunya','Luka','Daryana','Mila','Tikhon','Elisey','Klim'])ctx[`show${hero}DeflectImpact`]=()=>vfx++;
vm.createContext(ctx);vm.runInContext(['checkAimAndDamage','damageEnemy','applyHeroImpactDamage','checkForWound'].map(fn).join('\n'),ctx);
function target(hits){const e={type:'enem11',hp:hits,maxHP:hits,isBarricade:hits>1,lastShotTime:0,applyWound(){this.isWounded=true;},element:{isConnected:true,style:{},getBoundingClientRect:rect}};ctx.activeEnemies.push(e);return e;}
for(const hero of [null,'elisey','eremei','vasilisa'])for(let hits=3;hits<=7;hits++){
 ctx.activeEnemies.length=0;ctx.activeHeroObject=hero?{name:hero}:null;time+=10000;
 const bar=target(hits);aimed=bar;const beforeVfx=vfx;ctx.checkAimAndDamage();assert.equal(bar.hp,hits-1);
 assert(!bar.isWounded,'100% wound chance must not bypass the hit counter');assert.equal(vfx,beforeVfx,'Unbroken barricade must not show final-deflection VFX');
 time+=299;ctx.checkAimAndDamage();assert.equal(bar.hp,hits-1,'299ms cannot repeat hit');
 const ordinary=target(1);aimed=ordinary;ctx.checkAimAndDamage();assert(ordinary.hp<=0,'Other target has its own cooldown');
 aimed=bar;time++;ctx.checkAimAndDamage();assert.equal(bar.hp,hits-2,'Return at 300ms keeps partial progress');
 for(let i=2;i<hits;i++){time+=model.TARGET_HIT_INTERVAL_MS;ctx.checkAimAndDamage();}
 assert.equal(bar.hp,0);assert(!ctx.activeEnemies.includes(bar));
 assert(pm.serviceMs({barricadeHits:hits})>=(hits-1)*300);
}
for(const hz of [60,120])for(let hits=3;hits<=7;hits++)for(let phase=0;phase<16;phase++){
 ctx.activeEnemies.length=0;time=100000+phase;const bar=target(hits);aimed=bar;
 const start=time;ctx.checkAimAndDamage();
 while(bar.hp>0){time+=1000/hz;ctx.checkAimAndDamage();assert(time-start<5000);}
 assert(time-start<=pm.serviceMs({barricadeHits:hits})+1e-6,'Frame-quantized repeat hits fit reserved service time');
}
const simple=[{xPos:50,barricadeHits:3},{xPos:70}];
assert(pm.sequentialSlack(simple,[1000,1100],[0,0],0)<0,'Multi-hit service must not become one instant deflection');
assert(pm.sequentialSlack(simple.map(a=>({xPos:a.xPos})),[1000,1100],[0,0],0)>0);
const rt=loadRuntime(66);let cases=0,maxError=0;
try{
 const fakeBar={isBarricade:true,hp:7,isWounded:true,woundEndTime:Infinity,lastWoundTick:0,woundDamagePerSecond:99999};
 assert.equal(rt.api.updateWound.call(fakeBar),false);assert.equal(fakeBar.hp,7);
 rt.api.applyWound.call({isBarricade:true},99999); // No wound state, timer or DOM is needed.
 const ordinaryWound={isWounded:true,hp:100,woundEndTime:Infinity,lastWoundTick:0,woundDamagePerSecond:10,showWoundDamage(){}};
 assert.equal(rt.api.updateWound.call(ordinaryWound),false);assert.equal(ordinaryWound.hp,90,'Ordinary wound damage is preserved');
 rt.api.setBoss('enem1',0);
 const held={isBarricade:true,hasRushed:false,barricadeHoldUntil:rt.window.performance.now()+1200,speedPixelsPerSecond:12};
 rt.api.setActive([held]);rt.advance(200);rt.api.pauseGame();assert.equal(held.pausedBarricadeHoldMs,1000);
 rt.advance(10000);rt.api.pauseGame(); // Repeated pause must not overwrite the remainder.
 Object.defineProperty(rt.window.document,'hidden',{value:false,configurable:true});
 rt.api.resumeGame();assert.equal(held.barricadeHoldUntil-rt.window.performance.now(),1000);
 assert.equal(held.speedPixelsPerSecond,12);assert.equal(held.pausedBarricadeHoldMs,undefined);
 for(const role of ['enem1','enem2','enem3','enem4','enem5']){
  const bar=rt.api.abilities.find(a=>a.boss===role&&a.barricadeHits);assert(bar,role);
  const level=model.loadLevel(66),attacks=level.bossAbilities.filter(a=>a.boss===role),idx=attacks.findIndex(a=>a.barricadeHits);
  for(let ph=0;ph<3;ph++)for(let rot=0;rot<5;rot++){
   rt.api.setBoss(role,ph);rt.api.setWave(rot);
   const speed=rt.api.speed(bar,level.bossCombatConfig.phases[ph],level.bossCombatConfig.bosses[role],0);
   const predicted=model.analyze(level,role,attacks,[idx],ph,null,{rot}).arrivals[0];
   for(const style of ['straight','weave','pause','lateRush','drift']){
    const trace=rt.flight(bar,speed,style,true),actual=trace.elapsed;const error=Math.abs(actual/predicted-1);
    assert(trace.firstMovement>=bar.barricadePauseMs-1e-6&&trace.firstMovement<=bar.barricadePauseMs+1000/120+1e-6,'Hold ends exactly at authored time');
    assert.equal(trace.maxXDeviation,0,'Barricade does not inherit lateral movement');
    maxError=Math.max(maxError,error);assert(error<.1,`${role}/${ph}/${rot}/${style}: ${actual} vs ${predicted}`);cases++;
   }
  }
 }
}finally{rt.close();}
console.log(`Barricades: 20 hero/hit-count cases; per-target 300ms cooldown, retained partial damage, exact hits despite critical damage; 100% wound immunity with ordinary wounds preserved; final-hit VFX; paused hold restored; 160 repeat-hit replays at 60/120Hz; ${cases} actual trajectories, max deviation ${(maxError*100).toFixed(2)}% — PASS`);
