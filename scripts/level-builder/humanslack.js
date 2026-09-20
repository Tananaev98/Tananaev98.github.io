// Диагностика честности «для живого игрока»: запас комбо при медленном курсоре/реакции (не решение о балансе — только чтение данных).
const model=require('../combo-model.js'),pm=require('../player-model.js');
const cursor=+process.argv[2]||85, react=+process.argv[3]||350, levels=(process.argv[4]||'1,2,3,4,5').split(',').map(Number), verbose=process.argv[5];
pm.PLAYER.cursorSpeed=cursor; pm.PLAYER.reactionMs=react;
for(const n of levels){
  const lv=model.loadLevel(n); let neg=[0,0,0],tot=[0,0,0],worst=[1e9,1e9,1e9];const rows=[];
  for(const role of ['enem1','enem2','enem3','enem4','enem5']){
    const at=lv.bossAbilities.filter(a=>a.boss===role);
    const tele0=lv.bossCombatConfig.bosses[role].telegraphMs;
    lv.bossAbilitiesDop.filter(x=>x.boss===role).forEach((c,ci)=>{ if(c.indexAbilities.length<2)return;
      for(let p=0;p<3;p++){ if((c.minPhase||1)>p+1)continue;
        const r=model.analyze(lv,role,at,c.indexAbilities,p,c); const ph=lv.bossCombatConfig.phases[p];
        const tele=Math.max(lv.bossCombatConfig.minTelegraphMs||0,tele0*ph.telegraphMultiplier);
        const s=pm.comboSlack(c.indexAbilities.map(k=>at[k]),r.arrivals.map(Math.round),r.offsets,tele);
        tot[p]++; if(s<0)neg[p]++; worst[p]=Math.min(worst[p],s); if(p===2&&verbose)rows.push(`${role} c${ci} ${s}`);}
    });}
  console.log(`L${n} курсор ${cursor} реакция ${react}: комбо с запасом<0 по фазам ${neg.map((x,i)=>x+'/'+tot[i]).join(' ')}  худший ${worst.join('/')}`); if(verbose) console.log(rows.filter(x=>+x.split(' ')[2]<0).join('; '));
}
