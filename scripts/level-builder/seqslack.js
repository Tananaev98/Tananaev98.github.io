// Диагностика: «последовательный игрок» — отбивает атаки по порядку прилёта (иначе — по порядку появления), не зная будущего.
const model=require('../combo-model.js');
const cursor=+process.argv[2]||111, react=+process.argv[3]||250, levels=(process.argv[4]||'1,2,3,4,5,6,7,8,9,10').split(',').map(Number), only=process.argv[5];
function seq(attacks,arr,off,tele,order){ let x=50,t=off[0]+react,min=1e9;
  for(const i of order){ const S=off[i]+tele; const at=Math.max(t+Math.abs(attacks[i].xPos-x)/cursor*1000,S); min=Math.min(min,arr[i]+tele-at); x=attacks[i].xPos;t=at;} return Math.round(min);}
for(const n of levels){
  const lv=model.loadLevel(n);const neg=[0,0,0],tot=[0,0,0];const bad=[];
  for(const role of ['enem1','enem2','enem3','enem4','enem5']){
    const at=lv.bossAbilities.filter(a=>a.boss===role);
    lv.bossAbilitiesDop.filter(x=>x.boss===role).forEach((c,ci)=>{ if(c.indexAbilities.length<2)return;
      for(let p=0;p<3;p++){ if((c.minPhase||1)>p+1)continue;
        const r=model.analyze(lv,role,at,c.indexAbilities,p,c);const ph=lv.bossCombatConfig.phases[p];
        const tele=Math.max(lv.bossCombatConfig.minTelegraphMs||0,lv.bossCombatConfig.bosses[role].telegraphMs*ph.telegraphMultiplier);
        const A=c.indexAbilities.map(k=>at[k]);const idx=A.map((_,i)=>i);
        const byArr=idx.slice().sort((a,b)=>r.arrivals[a]-r.arrivals[b]);
        const s=seq(A,r.arrivals,r.offsets,tele,byArr); tot[p]++; if(s<0){neg[p]++; if(only===role||only==='all')bad.push(`${role} c${ci} ф${p+1} ${s}`);}
      }});}
  console.log(`L${n} (курсор ${cursor}, реакция ${react}) последовательный игрок: невозможных ${neg.map((x,i)=>x+'/'+tot[i]).join(' ')}`); if(bad.length)console.log('  '+bad.join('; '));
}
