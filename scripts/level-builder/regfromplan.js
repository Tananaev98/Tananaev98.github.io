// regfromplan.js planfile outReg role,role... — реестр строк сторон (Л/Ц/П, комбо >=3 атак) из файла плана для перечисленных ролей (для частичного перезапуска одной роли)
const fs=require('fs');const [pf,out,roles]=process.argv.slice(2);const R=new Set(roles.split(','));const sd=x=>x<=28?'Л':x>=72?'П':'Ц';const set=new Set();
for(const l of fs.readFileSync(pf,'utf8').split('\n')){const m=/^(enem[0-9]):[a-h]\s+\S+\s+(.+?)(?:\s+GAPS|\s+#|$)/.exec(l);if(!m||!R.has(m[1])||/НЕТ/.test(l))continue;const s=m[2].trim().split(/\s+/).map(t=>sd(+t.split('/')[0])).join('');if(s.length>=3)set.add(s);}
fs.writeFileSync(out,[...set].join('\n')+'\n');console.log('реестр',[...set].length,'строк');
