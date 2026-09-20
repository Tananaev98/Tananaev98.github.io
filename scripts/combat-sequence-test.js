'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {loadRuntime, ROOT} = require('./combat-runtime-harness');
const {designs} = require('./combat-designs');
let choices=0, trajectories=0, signatures=0, bosses=0, shortestFlight=Infinity;
const readData = file => {
    const box={};
    vm.runInNewContext(fs.readFileSync(file,'utf8')+'\nthis.data={bossAbilities,bossAbilitiesDop,bossCombatConfig,ENEMY_TYPES,mBossDelayAb};',box);
    return JSON.parse(JSON.stringify(box.data));
};
for(let n=1;n<=74;n++) {
    const r=loadRuntime(n), a=r.api;
    // Seeded randomness exercises the real selector reproducibly.
    let seed=n*991;
    r.window.Math.random=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
    const baselineFile=path.join(ROOT,`tmp/combat-before/lvlData/gameData${n}.js`);
    const old=fs.existsSync(baselineFile)?readData(baselineFile):null;
    for(let role=1;role<=5;role++) {
        const boss='enem'+role, ab=a.abilities.filter(x=>x.boss===boss), cs=a.combos.filter(x=>x.boss===boss);
        const context=`${n}/${boss}`;
        bosses++;
        cs.forEach(c=>c.indexAbilities.forEach(i=>assert(ab[i],`${context}: invalid index ${i}`)));
        assert.equal(new Set(cs.map(c=>JSON.stringify([!!c.isChain,c.indexAbilities]))).size,cs.length,`${context}: duplicate combo`);
        if(designs[n]) {
            assert(a.config.bosses[boss].combatIdentity,`${context}: missing identity`);
            const original=ab.slice(0,-6), additions=ab.slice(-6);
            const limit=Math.min(...original.filter(x=>!x.barricadeHits).map(x=>x.customDamage));
            additions.forEach(x=>assert(x.customDamage<=limit,`${context}: added attack damage`));
        }
        // The saved snapshot predates independent edits to levels 61–74.
        if(old&&designs[n]&&n<=60) {
            const original=old.bossAbilities.filter(x=>x.boss===boss);
            assert.deepEqual(JSON.parse(JSON.stringify(ab.slice(0,original.length))),original,`${context}: original attacks changed`);
            assert.equal(a.enemies[boss].baseHP,old.ENEMY_TYPES[boss].baseHP);
            assert.equal(a.config.bosses[boss].damageMultiplier,old.bossCombatConfig.bosses[boss].damageMultiplier);
            assert.equal(a.config.damageMultiplier,old.bossCombatConfig.damageMultiplier);
            const limit=Math.min(...original.filter(x=>!x.barricadeHits).map(x=>x.customDamage));
            ab.slice(original.length).forEach(x=>assert(x.customDamage<=limit,`${context}: added damage`));
            const special=c=>c.isChain||c.indexAbilities.some(i=>original[i]?.barricadeHits);
            assert.deepEqual(JSON.parse(JSON.stringify(cs.filter(special))),old.bossAbilitiesDop.filter(c=>c.boss===boss&&special(c)),`${context}: chain/bar changed`);
        }
        for(let p=0;p<3;p++) {
            a.stop();a.setBoss(boss,p);
            const phase=a.phase(), profile=a.config.bosses[boss];
            const recent=[];
            for(let wave=0;wave<36;wave++) {
                const c=a.select(cs,ab,phase);
                assert(c,`${context}: selection stalled`);
                if(designs[n]&&p===0&&!phase.excludedDangerousCombos&&wave<2)
                    assert.equal(c.openingOrder,wave,`${context}: introduction skipped`);
                assert(!recent.includes(c),`${context}: immediate repeat`);
                assert((c.minPhase||1)<=phase.phase);
                recent.push(c);if(recent.length>2)recent.shift();choices++;
                if(cs.some(c=>c.signature)&&!(phase.excludedDangerousCombos>0))
                    assert(a.status().sinceSignature<=3,`${context}: missing signature`);
            }
            // All new trajectories, all variance positions, actual movement function.
            for(const c of cs.filter(c=>c.signature&&(c.minPhase||1)<=phase.phase)) {
                signatures++;
                for(let wave=0;wave<profile.speedVariance.length;wave++) {
                    a.setWave(wave);
                    c.indexAbilities.forEach((i,shot)=>{
                        const attack=ab[i],speed=a.speed(attack,phase,profile,shot);
                        const ms=r.flight(attack,speed,profile.movementStyle);
                        assert(ms<30000&&ms>=650,`${context}: flight ${ms}ms`);
                        shortestFlight=Math.min(shortestFlight,ms);trajectories++;
                    });
                }
                const offsets=a.schedule(c.indexAbilities,ab,c.shotDelayMs,phase,profile,c.shotGapsMs);
                assert(offsets.every((x,i)=>i===0||x-offsets[i-1]>=c.shotDelayMs-1));
                const last={left:-Infinity,right:-Infinity}, k=a.constants;
                c.indexAbilities.forEach((index,i)=>{
                    const attack=ab[index], side=attack.xPos<=k.leftFlank?'left':attack.xPos>=k.rightFlank?'right':null;
                    if(side&&a.projectedSpeed(attack,phase,profile)>=k.fastSpeed) {
                        assert(offsets[i]-last[side==='left'?'right':'left']>=k.crossfireGap-1,`${context}: unreadable flank switch`);
                        last[side]=offsets[i];
                    }
                });
                if(c.shotGapsMs) assert(offsets[2]-offsets[1]>=c.shotGapsMs[1]-1,`${context}: missing phrase pause`);
            }
        }
        // Actual asynchronous spawn and stop, not just calling the selector.
        a.stop();a.setBoss(boss);assert(a.execute());
        const reserved=a.status().pending;assert(reserved>0);
        a.pause();r.advance(10000);assert.equal(a.status().pending,reserved);
        a.resume();r.advance(15000);
        assert.equal(a.status().pending,0,`${context}: leaked reservation`);
        assert.equal(a.status().enemies.length,reserved,`${context}: truncated series`);
        assert.deepEqual(r.errors,[],`${context}: runtime errors`);
        a.stop();assert.equal(a.status().pending,0);assert.equal(a.status().tasks,0);
        const originalCombos=[...a.combos];
        try {
            for(const c of cs.filter(c=>c.signature)) {
                a.stop();a.setBoss(boss,c.minPhase-1);
                a.combos.splice(0,a.combos.length,c);
                assert(a.execute(),`${context}: signature not launched`);
                const profile=a.config.bosses[boss], phase=a.phase();
                const delay=a.delays.find(d=>d.boss===boss);
                const offsets=a.schedule(c.indexAbilities,ab,
                    Math.max(a.config.minShotDelay,delay.bossDelayAb*profile.cadence*phase.cadence,c.shotDelayMs),phase,profile,c.shotGapsMs);
                assert(a.waveDelay()>=offsets.at(-1)+a.constants.crossfireGap,`${context}: waves overlap without recovery`);
                r.advance(15000);
                assert.equal(a.status().enemies.length,c.indexAbilities.length,`${context}: signature truncated`);
                assert.equal(a.status().pending,0);
                assert.deepEqual(r.errors,[],`${context}: signature spawn error`);
            }
        } finally {a.stop();a.combos.splice(0,a.combos.length,...originalCombos);}
        const chain=cs.find(c=>c.isChain),bar=cs.find(c=>c.indexAbilities.some(i=>ab[i].barricadeHits));
        if(chain||bar) {
            a.setBoss(boss);
            a.setActive([{isCustom:true,hp:1,isBarricade:true}]);
            if(chain)assert(!a.canSchedule(chain,ab,a.phase()),`${context}: chain over barricade`);
            if(bar)assert(!a.canSchedule(bar,ab,a.phase()),`${context}: two barricades`);
            a.setActive([{isCustom:true,hp:1,chainVulnerable:true}]);
            if(chain)assert(!a.canSchedule(chain,ab,a.phase()),`${context}: two chains`);
            if(bar)assert(!a.canSchedule(bar,ab,a.phase()),`${context}: barricade over chain`);
        }
    }
    r.close();
    if(n%10===0)console.log(`Checked levels 1–${n}`);
}
{
    const r=loadRuntime(74), a=r.api;
    a.setBoss('enem1');
    a.setActive(Array.from({length:a.phase().maxActiveAttacks},()=>({isCustom:true,hp:1})));
    a.start();r.advance(5000);
    assert.equal(a.status().wave,0,'blocked field consumed a wave');
    a.setActive([]);r.advance(200);
    assert.equal(a.status().wave,1,'scheduler did not retry after field cleared');
    a.stop();assert.equal(a.status().tasks,0);assert.equal(a.status().pending,0);r.close();
}
console.log(JSON.stringify({bosses,choices,signatures,trajectories,shortestFlightMs:Math.round(shortestFlight)},null,2));
console.log('PASS: phase selection, variety, reservations, pause/resume, full spawning, special-target exclusion, trajectory reaction floor. This is not a human playtest.');
