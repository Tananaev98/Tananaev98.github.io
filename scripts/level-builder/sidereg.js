// sidereg.js N файл роль… — записывает в реестр строки сторон (Л/Ц/П) комбо >=3 атак указанных ролей из designN.js (для SIDEREG в author.js).
const fs=require('fs');const L=require('./design'+process.argv[2]+'.js');const sd=x=>x<=28?'Л':x>=72?'П':'Ц';const set=new Set();
for(const r of process.argv.slice(4))for(const c of L.bosses[r].combos){const s=c.beats.trim().split(/\s+/).map(t=>sd(+t.split('/')[0])).join('');if(s.length>=3)set.add(s);}
fs.writeFileSync(process.argv[3],[...set].join('\n')+'\n');console.log('реестр:',[...set].join(' '));
