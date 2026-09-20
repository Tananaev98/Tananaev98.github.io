// Разбор боя глазами игрока (модель scripts/player-model.js: курсор 110 %/с, реакция 300 мс, 100 мс на смену цели, отбивает по порядку прилёта).
// Время полёта — по РЕАЛЬНОЙ функции стиля из game.js (combo-model.js), скорость — по всем 5 вращениям speedVariance (показано худшее).
// node scripts/level-builder/sim.js N enemK [комбо,через,запятую] [фазы 0,1,2]   (GD_REJECTED=1 — читать отвергнутый конвейером файл)
const model=require('../combo-model.js'),pm=require('../player-model.js');
const n=+process.argv[2],role=process.argv[3],only=process.argv[4]?process.argv[4].split(',').map(Number):null,phs=(process.argv[5]||'0,1,2').split(',').map(Number);
const lv=model.loadLevel(n);const at=lv.bossAbilities.filter(a=>a.boss===role);const P=pm.SEQ_PLAYER;
lv.bossAbilitiesDop.filter(x=>x.boss===role).forEach((c,ci)=>{ if(only&&!only.includes(ci))return;
  const line=[];
  for(const p of phs){ if((c.minPhase||1)>p+1)continue;
    const tele=Math.max(lv.bossCombatConfig.minTelegraphMs||0,lv.bossCombatConfig.bosses[role].telegraphMs*lv.bossCombatConfig.phases[p].telegraphMultiplier);
    const A=c.indexAbilities.map(k=>at[k]);
    const rots=model.analyzeAllRot(lv,role,at,c.indexAbilities,p,c).map(q=>({arrivals:q.arrivals,offsets:q.offsets,lateral:q.lateral}));
    let worst=null;
    rots.forEach((r,ri)=>{const s=pm.sequentialSlack(A,r.arrivals,r.offsets,tele,r.lateral); if(!worst||s<worst.s)worst={s,ri,r};});
    line.push(`ф${p+1}: ${worst.s}`);
    if(process.env.VERBOSE){ console.log(`c${ci} ф${p+1} худшее вращение ${worst.ri}, запас ${worst.s}`);
      const ord=A.map((_,i)=>i).sort((a,b)=>worst.r.arrivals[a]-worst.r.arrivals[b]); let x=50,t=worst.r.offsets[0]+P.reactionMs,first=true;
      for(const i of ord){const tr=(Math.abs(A[i].xPos-x)+(first?0:worst.r.lateral))/P.cursorSpeed*1000;const go=Math.max((first?t:t+P.retargetMs)+tr,worst.r.offsets[i]+tele);
        console.log(`   x${A[i].xPos} v${A[i].customSpeed}: видна ${Math.round(worst.r.offsets[i]+tele)} прилёт ${Math.round(worst.r.arrivals[i]+tele)} бьёт ${Math.round(go)} запас ${Math.round(worst.r.arrivals[i]+tele-go)}`);x=A[i].xPos;t=go;first=false;} }
  }
  console.log(`c${ci}${c.minPhase>1?'(ф'+c.minPhase+'+)':''} запас человека (худшее из 5 вращений): ${line.join('  ')}`);
});
