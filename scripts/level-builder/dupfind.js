// dupfind.js N enemK [file] — какие атаки роли повторяют ключ x/y/скорость(/волна) других уровней (inv.json) и в каких комбо; файл по умолчанию — rejected/gameDataN.js, если он новее, иначе lvlData
const fs=require('fs'),path=require('path'),vm=require('vm');const n=+process.argv[2],role=process.argv[3];const R=path.join(__dirname,'..','..');
const f=process.argv[4]||path.join(R,'scripts/level-builder/rejected/gameData'+n+'.js');const sb={};new vm.Script(fs.readFileSync(f,'utf8')+'\nthis.A=bossAbilities;this.D=bossAbilitiesDop;').runInContext(vm.createContext(sb));
const inv=JSON.parse(fs.readFileSync(path.join(__dirname,'inv.json'),'utf8'));const taken=new Map();
inv.filter(l=>l.n!==n).forEach(l=>l.bosses.filter(b=>b.role===role).forEach(b=>b.attacks.forEach(a=>taken.set(a.xPos+'/'+a.yPos+'/'+a.customSpeed,l.n))));
const at=sb.A.filter(a=>a.boss===role);const IDS='abcdefghijklmnop';
sb.D.filter(d=>d.boss===role).forEach((d,ci)=>d.indexAbilities.forEach((i,pos)=>{const a=at[i];const k=a.xPos+'/'+a.yPos+'/'+a.customSpeed;if(taken.has(k))console.log('комбо',IDS[ci],'поз',pos,'ключ',k,'уровень',taken.get(k));}));
