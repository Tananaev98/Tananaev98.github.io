// used.js — занятые в кампании значения: тройки maxActiveAttacks, пары timeNextBoss/bossInterval и структуры комбо (мультимножества длин) по ролям — чтобы выбирать свободные ДО подбора.
const fs=require('fs'),path=require('path');const L=JSON.parse(fs.readFileSync(path.join(__dirname,'inv.json'),'utf8'));
const skip=+process.argv[2]||0;const ls=L.filter(l=>l.n!==skip);
console.log('maxActive:',[...new Set(ls.map(l=>l.phases.map(p=>p.maxActiveAttacks).join('/')))].sort().join(' '));
console.log('timeNext/interval:',[...new Set(ls.map(l=>l.timeNextBoss+'/'+l.bossInterval))].sort().join(' '));
for(const r of ['enem1','enem2','enem3','enem4','enem5']){const s=new Set(ls.map(l=>l.bosses.find(b=>b.role===r).combos.map(c=>c.indexAbilities?c.indexAbilities.length:(c.indices||c.attacks||[]).length).sort((a,b)=>a-b).join('')));console.log(r,'структур занято',s.size);}
// свободные структуры: node used.js N роль минДлина максДлина суммаОт суммаДо  (по 8 комбо)
if(process.argv[3]){const [role,mn,mx,s0,s1]=[process.argv[3],+process.argv[4],+process.argv[5],+process.argv[6],+process.argv[7]];
 const used=new Set(ls.map(l=>l.bosses.find(b=>b.role===role).combos.map(c=>c.indices.length).sort((a,b)=>a-b).join('')));
 const out=[];(function rec(a,i){if(a.length===8){const sum=a.reduce((x,y)=>x+y,0);const k=a.join('');if(sum>=s0&&sum<=s1&&!used.has(k))out.push(k);return;}for(let v=i;v<=mx;v++)rec(a.concat(v),v);})([],mn);
 console.log(role,'свободные структуры:',out.slice(0,25).join(' '));}
