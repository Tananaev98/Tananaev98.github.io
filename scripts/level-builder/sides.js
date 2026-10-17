// sides.js N — стороны (Л/Ц/П по x: <=28 / 29..71 / >=72) каждого комбо >=3 атак по designN.js и дубли между боссами (А10.1).
const L=require('./design'+process.argv[2]+'.js');const sd=x=>x<=28?'Л':x>=72?'П':'Ц';const by={};
for(const [r,b] of Object.entries(L.bosses)){by[r]=b.combos.map(c=>({id:c.id,s:c.beats.trim().split(/\s+/).map(t=>sd(+t.split('/')[0])).join('')})).filter(o=>o.s.length>=3);}
for(const r in by)console.log(r,by[r].map(o=>o.id+':'+o.s).join('  '));
const roles=Object.keys(by);for(let i=0;i<roles.length;i++)for(let j=i+1;j<roles.length;j++){const a=new Set(by[roles[i]].map(o=>o.s));const d=[...new Set(by[roles[j]].map(o=>o.s))].filter(s=>a.has(s));if(d.length)console.log('ДУБЛЬ',roles[i],roles[j],d.join(','));}
