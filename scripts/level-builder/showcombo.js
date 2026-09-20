const model=require('../combo-model.js'),pm=require('../player-model.js');
const n=+process.argv[2],role=process.argv[3],p=+process.argv[4]||2;
const lv=model.loadLevel(n);const at=lv.bossAbilities.filter(a=>a.boss===role);
lv.bossAbilitiesDop.filter(x=>x.boss===role).forEach((c,ci)=>{
  const r=model.analyze(lv,role,at,c.indexAbilities,p,c);
  const tele=Math.max(lv.bossCombatConfig.minTelegraphMs||0,lv.bossCombatConfig.bosses[role].telegraphMs*lv.bossCombatConfig.phases[p].telegraphMultiplier);
  const sl=[[111,250],[90,300]].map(([cu,re])=>{pm.PLAYER.cursorSpeed=cu;pm.PLAYER.reactionMs=re;return pm.comboSlack(c.indexAbilities.map(k=>at[k]),r.arrivals.map(Math.round),r.offsets,tele);});
  const o=c.indexAbilities.map((k,i)=>`${at[k].xPos}/${at[k].customSpeed}@${Math.round(r.arrivals[i])}(сп${Math.round(r.offsets[i])})`);
  console.log('c'+ci,'мин'+(c.minPhase||1),'запас',sl.join('/'),o.join(' '));});
