// Покоординатный перебор зёрен честного конструктора по боссам; лучшие зёрна пишутся в designN.js (fairSeed у босса).
const cp=require('child_process'),fs=require('fs'),path=require('path');
const n=process.argv[2],K=+process.argv[3]||10,SW=+process.argv[4]||2;const roles=['enem1','enem2','enem3','enem4','enem5'];
const f=path.join(__dirname,'design'+n+'.js');const D=require(f);
const seeds={};roles.forEach(r=>seeds[r]=D.bosses[r].fairSeed||0);
function run(sd){const r=cp.spawnSync('node',[path.join(__dirname,'run.js'),n],{encoding:'utf8',maxBuffer:1<<28,env:{...process.env,SEEDS:JSON.stringify(sd)}});const out=r.stdout||'';
  const ok=/ИТОГ: ПРОЙДЕНО/.test(out)&&!/НЕ ПРОЙДЕНЫ/.test(out);const lines=out.split('\n').filter(l=>/^   ! /.test(l));const per={};roles.forEach(x=>per[x]=0);
  lines.forEach(l=>{(l.match(/enem\d/g)||[]).forEach(x=>per[x]++);});return {ok,total:lines.length,per,err:!lines.length&&!ok};}
let cur=run(seeds);console.log('старт',cur.total);
outer: for(let sw=0;sw<SW&&!cur.ok;sw++){
  for(const r of roles){ if(cur.per[r]===0) continue; let best={sd:seeds[r],res:cur};
    for(let k=1;k<=K;k++){ const t={...seeds,[r]:k}; const res=run(t); if(res.err)continue; if(res.total<best.res.total){best={sd:k,res};} if(res.ok)break; }
    seeds[r]=best.sd;cur=best.res;console.log('  ',r,'зерно',best.sd,'всего',cur.total); if(cur.ok)break outer; }
}
let s=fs.readFileSync(f,'utf8');
for(const r of roles){ const i=s.indexOf(r+':'); let j=s.indexOf('title:',i); let seg=s.slice(i,j); if(/fairSeed/.test(s.slice(i,j+200))) s=s.replace(new RegExp('(\b'+r+': \{ )fairSeed: \d+, '),'$1'); }
for(const r of roles){ s=s.replace(new RegExp('(\n\s+'+r+': \{ )'),`$1fairSeed: ${seeds[r]}, `); }
fs.writeFileSync(f,s);
const r2=cp.spawnSync('node',[path.join(__dirname,'run.js'),n],{encoding:'utf8',maxBuffer:1<<28});console.log((r2.stdout||'').split('\n').filter(l=>/^ИТОГ|^   !/.test(l)).join('\n').slice(0,3000));
