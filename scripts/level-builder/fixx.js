// fixx.js N enemK — лечит повторы геометрии (x/y/скорость как на другом уровне): у каждой нарушающей атаки (с тем же ключом во всех комбо роли, где она встречается)
// ищет в той же полосе (Л 4..28 / Ц-право 69..71 / П 72..96) ближайший x, свободный на других уровнях при том же y и скорости; правит designN.js (источник), пересобирает; до 12 раундов.
const fs=require('fs'),path=require('path'),cp=require('child_process');const n=+process.argv[2],role=process.argv[3];const R=path.join(__dirname,'..','..');
const df=path.join(__dirname,'design'+n+'.js');const inv=JSON.parse(fs.readFileSync(path.join(__dirname,'inv.json'),'utf8'));const taken=new Set();
inv.filter(l=>l.n!==n).forEach(l=>l.bosses.filter(b=>b.role===role).forEach(b=>b.attacks.forEach(a=>taken.add(a.xPos+'/'+a.yPos+'/'+a.customSpeed))));
const q=p=>'"'+p+'"';const run=(f,args)=>{try{return cp.execSync(`node ${q(path.join(__dirname,f))} ${args}`,{cwd:R,encoding:'utf8',maxBuffer:1<<26,stdio:'pipe'});}catch(e){return e.stdout?String(e.stdout):'';}};
const lane=x=>x<=28?[4,28]:x>=72?[72,96]:[69,71];const triedX={};
for(let round=0;round<12;round++){
  run('run.js',n);const out=run('dupfind.js',n+' '+role);const D=out.split('\n').filter(Boolean).map(l=>{const m=/комбо (\w) поз (\d+) ключ (\d+)\/(\d+)\/(\d+) уровень (\d+)/.exec(l);return m&&{id:m[1],pos:+m[2],x:+m[3],y:+m[4],sp:+m[5]};}).filter(Boolean);
  console.log('раунд',round,'повторов',D.length,D.map(d=>d.id+'#'+d.pos+':'+d.x+'/'+d.y+'/'+d.sp).join(' '));if(!D.length)break;
  let s=fs.readFileSync(df,'utf8');const i0=s.indexOf('        '+role+':');const nx=s.indexOf('\n        enem',i0+10);const j0=nx<0?s.length:nx;let seg=s.slice(i0,j0);const newOf={};
  for(const d of D){const k=d.x+'/'+d.y+'/'+d.sp;triedX[k]=triedX[k]||new Set([d.x]);if(newOf[k]===undefined){const [lo,hi]=lane(d.x);const c=[];for(let x=lo;x<=hi;x++)if(!triedX[k].has(x)&&!taken.has(x+'/'+d.y+'/'+d.sp))c.push(x);c.sort((a,b)=>Math.abs(a-d.x)-Math.abs(b-d.x));newOf[k]=c[0];if(c[0]!==undefined)triedX[k].add(c[0]);}
    const nxX=newOf[k];if(nxX===undefined)continue;const re=new RegExp("(\{ id: '"+d.id+"'[^\n]*beats: ')([^']*)(')");const m=re.exec(seg);if(!m)continue;const toks=m[2].split(' ');const t=toks[d.pos];const [xs,rest]=t.split('/');if(+xs!==d.x)continue;toks[d.pos]=nxX+'/'+rest;seg=seg.replace(m[0],m[1]+toks.join(' ')+m[3]);console.log('  ',d.id,'#'+d.pos,d.x,'->',nxX);}
  fs.writeFileSync(df,s.slice(0,i0)+seg+s.slice(j0));
}
