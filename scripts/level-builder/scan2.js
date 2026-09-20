const model=require('../combo-model.js');
const G=+process.argv[2]||350, DX=+process.argv[3]||40, MAXFLIGHT=+process.argv[4]||99999;
const only=process.argv[5]?process.argv[5].split(',').map(Number):[3,4,5,6,7,8,9,10];
const tot={};
for(const n of only){
  const lv=model.loadLevel(n);
  const ROLES=['enem1','enem2','enem3','enem4','enem5'];
  for(const role of ROLES){
    const at=lv.bossAbilities.filter(a=>a.boss===role);
    lv.bossAbilitiesDop.filter(x=>x.boss===role).forEach((c,ci)=>{
      for(let p=0;p<3;p++){
        const r=model.analyze(lv,role,at,c.indexAbilities,p,c);
        const o=c.indexAbilities.map((k,i)=>({x:at[k].xPos,t:r.arrivals[i],f:r.arrivals[i]-r.offsets[i],s:at[k].customSpeed})).sort((a,b)=>a.t-b.t);
        for(let i=1;i<o.length;i++){const g=o[i].t-o[i-1].t,dx=Math.abs(o[i].x-o[i-1].x);
          if(g<G&&dx>=DX&&Math.min(o[i].f,o[i-1].f)<=MAXFLIGHT){ if(p===2||process.argv[6]) console.log(`L${n} ${role} c${ci} ф${p+1} ${o[i-1].x}/${o[i-1].s}@${Math.round(o[i-1].t)} -> ${o[i].x}/${o[i].s}@${Math.round(o[i].t)} gap ${Math.round(g)}`); tot[n+role+'ф'+(p+1)]=(tot[n+role+'ф'+(p+1)]||0)+1;}}
      }
    });
  }
}
const byL={};for(const k in tot){const l=k.match(/^\d+/)[0];byL[l]=(byL[l]||0)+tot[k];}console.log(byL);
