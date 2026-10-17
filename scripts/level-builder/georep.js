// georep.js N role — какие атаки роли N-го уровня (rejected/gameDataN.js или lvlData) повторяют геометрию x/y/скорость этой роли на других уровнях (inv.json)
const fs=require('fs'),path=require('path'),vm=require('vm');const n=+process.argv[2],role=process.argv[3];
const R=path.join(__dirname,'..','..');const rej=path.join(__dirname,'rejected','gameData'+n+'.js');const src=fs.readFileSync(fs.existsSync(rej)&&!process.env.LIVE?rej:path.join(R,'lvlData','gameData'+n+'.js'),'utf8');
const sb={};new vm.Script(src+';this.A=bossAbilities;').runInContext(vm.createContext(sb));
const inv=JSON.parse(fs.readFileSync(path.join(__dirname,'inv.json'),'utf8'));const taken=new Map();
inv.filter(l=>l.n!==n).forEach(l=>l.bosses.filter(b=>b.role===role).forEach(b=>b.attacks.forEach(a=>taken.set(a.xPos+'/'+a.yPos+'/'+a.customSpeed,l.n))));
sb.A.filter(a=>a.boss===role).forEach((a,i)=>{const k=a.xPos+'/'+a.yPos+'/'+a.customSpeed;if(taken.has(k))console.log('атака',i,k,'занято ур.'+taken.get(k));});
