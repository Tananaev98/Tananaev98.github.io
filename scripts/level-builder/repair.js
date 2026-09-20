// Ремонт «нечестных перекрёстных пар» в designN.js: по фактическим прилётам gameDataN.js (все фазы) находит пары
// разнесённых атак, прилетающих ближе порога, и правит ТОЛЬКО бит в design (сдвиг прилёта или сторона).
const fs=require('fs'),path=require('path');
const model=require('../combo-model.js');
const n=+process.argv[2], GAPD=+process.argv[3]||270, MAXSPREAD=+process.argv[4]||940;
const file=path.join(__dirname,'design'+n+'.js'); let src=fs.readFileSync(file,'utf8');
const lv=model.loadLevel(n);
const ROLES=['enem1','enem2','enem3','enem4','enem5'];
let edits=0;
for(const role of ROLES){
  const at=lv.bossAbilities.filter(a=>a.boss===role);
  const dops=lv.bossAbilitiesDop.filter(x=>x.boss===role);
  const ids='abcdefghijkl';
  dops.forEach((c,ci)=>{
    const viol=new Set();
    for(let p=0;p<3;p++){
      const r=model.analyze(lv,role,at,c.indexAbilities,p,c);
      const xs=c.indexAbilities.map(k=>at[k].xPos);
      const o=xs.map((x,i)=>({i,x,t:r.arrivals[i]})).sort((a,b)=>a.t-b.t);
      for(let i=1;i<o.length;i++) if(Math.abs(o[i].x-o[i-1].x)>=model.CROSS_MIN_DX&&o[i].t-o[i-1].t<model.CROSS_MIN_GAP_MS) viol.add(o[i].i+'>'+o[i-1].i);
    }
    if(!viol.size) return;
    // блок босса в исходнике
    const bi=src.indexOf(role+':'); const nextB=src.indexOf('enem',bi+8); 
    const id=ids[ci];
    const re=new RegExp("(\{ id: '"+id+"'[^\n]*?beats: ')([^']*)(')");
    const start=bi, end=(()=>{const m=/\n        enem\d:/g;m.lastIndex=bi+5;const x=m.exec(src);return x?x.index:src.length;})();
    const seg=src.slice(start,end); const m=re.exec(seg);
    if(!m){console.log('нет комбо',role,id);return;}
    let toks=m[2].trim().split(/\s+/);
    const parse=t=>{const q=t.match(/^(\d+)\/(\d+)@(\d+)/);return q?{x:+q[1],s:+q[2],t:+q[3]}:null;};
    let changed=false;
    // порядок по прилёту в design
    for(const v of viol){
      const [a,b]=v.split('>').map(Number); // a — поздняя (по факту), b — ранняя
      const later=parse(toks[a]); if(!later){console.log('  зависимый бит',role,id,a);continue;}
      const early=parse(toks[b]);
      const others=toks.map(parse).filter(Boolean);
      const first=Math.min(...others.map(o=>o.t));
      const need=early? (early.t+GAPD):later.t;
      const delta=need-later.t;
      const last=Math.max(...others.map(o=>o.t));
      if(early&&delta>0&&(last+delta-first)<=MAXSPREAD){
        toks=toks.map(t=>{const q=parse(t);if(!q||q.t<later.t)return t; if(q.t===later.t&&t!==toks[a]) return t.replace(/@\d+/,'@'+(q.t+delta)); return t.replace(/@\d+/,'@'+(q.t+delta));});
        changed=true;console.log(`  ${role} ${id}: сдвиг +${delta}`);
      } else if(early){
        // сторона: та же полоса, что у ранней
        const off=8+((a*5+n)%7); let nx;
        if(early.x<50){ nx=early.x-off>=4?early.x-off:early.x+off; nx=Math.max(4,Math.min(28,nx)); }
        else { nx=early.x+off<=96?early.x+off:early.x-off; nx=Math.max(72,Math.min(96,nx)); }
        toks[a]=toks[a].replace(/^\d+/,String(nx)); changed=true; console.log(`  ${role} ${id}: x→${nx}`);
      }
    }
    if(changed){ const nm=m[1]+toks.join(' ')+m[3]; src=src.slice(0,start)+seg.replace(re,nm)+src.slice(end); edits++; }
  });
}
fs.writeFileSync(file,src); console.log('правок комбо:',edits);
