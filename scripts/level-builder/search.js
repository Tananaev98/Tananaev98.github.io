// Локальный поиск по designN.js: цель — ИТОГ ПРОЙДЕНО. Мутации только данные дизайна (биты, tight, p1), метрика — само число нарушений
// из конвейера (run.js → check-инструмент). Никакой своей логики баланса.
const fs=require('fs'),path=require('path'),cp=require('child_process');
const n=+process.argv[2], ITER=+process.argv[3]||60, seed=+process.argv[4]||1;
let rs=seed*9301+49297; const rnd=()=>{rs=(rs*9301+49297)%233280;return rs/233280;}; const pick=a=>a[Math.floor(rnd()*a.length)];
const file=path.join(__dirname,'design'+n+'.js');
function run(){
  const r=cp.spawnSync('node',[path.join(__dirname,'run.js'),String(n)],{encoding:'utf8',maxBuffer:1<<28,timeout:200000});
  const out=(r.stdout||'')+(r.stderr||'');
  const m=/ИТОГ: НЕ ПРОЙДЕНО \((\d+)\)/.exec(out); const ok=/ИТОГ: ПРОЙДЕНО/.test(out)&&!/ПРОВЕРКИ НЕ ПРОЙДЕНЫ/.test(out);
  const err=/ОШИБКА|Error/.test(out)&&!m&&!ok;
  return {score: ok?0:(m?+m[1]:err?9999:500), out};
}
function bossesIn(out){const s=new Set();(out.match(/^\s+! (enem\d)/gm)||[]).forEach(l=>s.add(l.match(/enem\d/)[0]));(out.match(/enem\d и enem\d/g)||[]).forEach(l=>l.match(/enem\d/g).forEach(x=>s.add(x)));return [...s];}
function combosOf(out,role){const ids='abcdefghijkl';const r=new Set();(out.match(new RegExp(role+' комбо (\d+)','g'))||[]).forEach(l=>r.add(ids[+l.match(/(\d+)$/)[1]]));return [...r];}
function bossSeg(src,role){const i=src.indexOf(role+':');const nx=['enem1','enem2','enem3','enem4','enem5'].map(x=>src.indexOf('        '+x+':')).filter(x=>x>i);return [i,nx.length?Math.min(...nx):src.indexOf('    }\n};')];}
function mutate(src,role,ids){
  const [i,j]=bossSeg(src,role);let t=src.slice(i,j);
  const kind=pick(['time','time','x','x','tight','p1','speed','loose']);
  const ids2=ids.length&&rnd()<0.8?ids:'abcdefgh'.split('');
  const id=pick(ids2);
  const re=new RegExp("(\{ id: '"+id+"'[^\n]*?beats: ')([^']*)(')");const m=re.exec(t); if(!m) return null;
  let toks=m[2].trim().split(/\s+/); const idxs=toks.map((x,k)=>x[0]==='='?-1:k).filter(k=>k>=0); if(!idxs.length) return null;
  const k=pick(idxs); const q=toks[k].match(/^(\d+)\/(\d+)@(\d+)$/); if(!q) return null;
  let x=+q[1],s=+q[2],a=+q[3];
  if(kind==='time'){a+=pick([-100,-50,50,100,150]); if(a<2300)a=2300;}
  else if(kind==='x'){ if(x>=29&&x<=31||x>=69&&x<=71){x+=pick([-1,1]);} else if(x<=28)x=Math.max(4,Math.min(28,x+pick([-8,-6,-4,4,6,8]))); else x=Math.max(72,Math.min(96,x+pick([-8,-6,-4,4,6,8]))); }
  else if(kind==='speed'){ if(s>=10) s=pick([10,11,12,13].filter(v=>v!==s)); }
  else if(kind==='tight'||kind==='loose'){
    const has=/\{ id: '.'[^\n]*?tight: false/.test(m[0]); let seg=t;
    const line=new RegExp("\{ id: '"+id+"'");
    if(kind==='loose'&&!/tight: false/.test(m[0])){ t=t.replace(line,"{ id: '"+id+"', tight: false"); return src.slice(0,i)+t+src.slice(j);}
    if(kind==='tight'&&/tight: false/.test(m[0])){ t=t.replace(new RegExp("(\{ id: '"+id+"'), tight: false"),'$1'); return src.slice(0,i)+t+src.slice(j);}
    return null; }
  else if(kind==='p1'){ const pm=/tight: \{ p1: (\d+)/.exec(t); if(!pm) return null; const v=Math.max(50,Math.min(700,+pm[1]+pick([-150,-100,100,150]))); t=t.replace(/tight: \{ p1: \d+/,'tight: { p1: '+v); return src.slice(0,i)+t+src.slice(j);}
  toks[k]=x+'/'+s+'@'+a; const nb=m[1]+toks.join(' ')+m[3]; t=t.replace(re,nb); return src.slice(0,i)+t+src.slice(j);
}
let src=fs.readFileSync(file,'utf8'); let cur=run(); console.log('старт',cur.score); let best=cur.score;
for(let it=0;it<ITER&&cur.score>0;it++){
  const bs=bossesIn(cur.out); if(!bs.length){ console.log('нет целевых боссов; вывод:\n'+cur.out.slice(0,600)); break; }
  const role=pick(bs); const ns=mutate(src,role,combosOf(cur.out,role)); if(!ns||ns===src) continue;
  fs.writeFileSync(file,ns); const r=run();
  if(process.env.DBG) console.log(it,role,r.score);
  if(r.score<=cur.score){ if(r.score<cur.score) console.log('it',it,role,'→',r.score); src=ns; cur=r; }
  else fs.writeFileSync(file,src);
}
fs.writeFileSync(file,src);
console.log('итог',cur.score); if(cur.score>0) run();
