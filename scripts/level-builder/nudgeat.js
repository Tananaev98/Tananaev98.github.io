// nudgeat.js N enemK id delta [from] — сдвигает желаемые прилёты быстрых атак комбо (кроме слабых sp<=8) на delta мс (от позиции from, по умолчанию 1); правка designN.js (точечная доводка после подбора)
const fs=require('fs'),path=require('path');const [n,role,id,dl,from]=[process.argv[2],process.argv[3],process.argv[4],+process.argv[5],+(process.argv[6]||0)];
const f=path.join(__dirname,'design'+n+'.js');let s=fs.readFileSync(f,'utf8');const i0=s.indexOf('        '+role+':');const nx=s.indexOf('\n        enem',i0+10);const j0=nx<0?s.length:nx;let seg=s.slice(i0,j0);
const re=new RegExp("(\{ id: '"+id+"'[^\n]*beats: ')([^']*)(')");const m=re.exec(seg);if(!m)throw new Error('нет комбо');
const toks=m[2].split(' ').map((t,i)=>{if(i<from)return t;const [a,rest]=t.split('@');const [at,wv]=rest.split('~');const sp=+a.split('/')[1];if(sp<=8)return t;return a+'@'+(+at+dl)+(wv?'~'+wv:'');});
seg=seg.replace(m[0],m[1]+toks.join(' ')+m[3]);fs.writeFileSync(f,s.slice(0,i0)+seg+s.slice(j0));console.log(id,toks.join(' '));
