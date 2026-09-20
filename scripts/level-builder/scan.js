const path=require('path');
const GAP=+process.argv[2]||400, DX=+process.argv[3]||40;
for(let n=1;n<=10;n++){
  let D; try{D=require('./design'+n+'.js');}catch(e){continue;}
  if(!D.bosses) continue;
  for(const [r,B] of Object.entries(D.bosses)){
    const map={};
    for(const c of B.combos){
      const bs=c.beats.split(/\s+/).map(s=>{
        if(s[0]==='='){const [id,k]=s.slice(1).split('#');return map[id][+k];}
        const m=s.match(/^(\d+)\/(\d+)@(\d+)$/);return {x:+m[1],sp:+m[2],t:+m[3]};});
      map[c.id]=bs;
      const s=[...bs].sort((a,b)=>a.t-b.t);
      for(let i=1;i<s.length;i++){
        const g=s[i].t-s[i-1].t, dx=Math.abs(s[i].x-s[i-1].x);
        if(g<GAP&&dx>=DX) console.log(`L${n} ${r} ${B.title} ${c.id}: ${s[i-1].x}/${s[i-1].sp}@${s[i-1].t} -> ${s[i].x}/${s[i].sp}@${s[i].t} gap ${g} dx ${dx}`);
      }
    }
  }
}
