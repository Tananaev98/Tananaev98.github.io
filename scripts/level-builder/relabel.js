// Пересобирает label комбо в designN.js по фактическим битам (стороны в порядке прилёта, медленные помечены).
// Префикс сигнатурных («Засада — знакомство:») сохраняется.
const fs=require('fs'),path=require('path');const n=+process.argv[2];
const file=path.join(__dirname,'design'+n+'.js');let src=fs.readFileSync(file,'utf8');
const D=require(file);
const side=x=>x<=28?'слева':x>=72?'справа':'в центр';
function words(bs){
  const seq=bs.map(b=>({w:side(b.x),slow:b.sp<=8}));
  const out=[];let i=0;
  while(i<seq.length){let j=i;while(j+1<seq.length&&seq[j+1].w===seq[i].w&&seq[j+1].slow===seq[i].slow)j++;
    const k=j-i+1,w=seq[i].w,sl=seq[i].slow;
    let s; if(sl) s='медленный '+w; else if(w==='в центр') s=k===1?'в центр':k===2?'два в центр':k+' в центр'; else s=k===1?w:k===2?'дважды '+w:k===3?'трижды '+w:k+' раза '+w;
    out.push(s);i=j+1;}
  const t=out.join(', ').replace(/, ([^,]*)$/,' и $1');return t.charAt(0).toUpperCase()+t.slice(1);
}
let cnt=0;
for(const [role,B] of Object.entries(D.bosses)){
  const map={};
  for(const c of B.combos){
    const bs=c.beats.split(/\s+/).map(s=>{if(s[0]==='='){const [id,k]=s.slice(1).split('#');return map[id][+k];}
      const m=s.match(/^(\d+)\/(\d+)@(\d+)/);return {x:+m[1],sp:+m[2],t:+m[3]};});
    map[c.id]=bs;
    const sorted=[...bs].sort((a,b)=>a.t-b.t);
    let tail=words(sorted); const pre=/^([^:]*— [^:]*):/.exec(c.label);
    const nl=pre?pre[1]+': '+tail.toLowerCase().replace(/^./,ch=>ch):tail;
    if(nl!==c.label){
      const idx=src.indexOf("label: '"+c.label+"'"); if(idx<0){console.log('нет',role,c.id);continue;}
      src=src.replace("label: '"+c.label+"'","label: '"+nl+"'");cnt++;
    }
  }
}
fs.writeFileSync(file,src);console.log('переписано labels:',cnt);
