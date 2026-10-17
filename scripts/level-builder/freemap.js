// freemap.js N enemK — по скоростям: сколько свободных x в полосах C-лево 29..31 / C-право 69..71 (y=5) — чтобы выбирать скорости форм без сдвигов x конвейером.
const fs=require('fs'),path=require('path');const n=+process.argv[2],role=process.argv[3];
const inv=JSON.parse(fs.readFileSync(path.join(__dirname,'inv.json'),'utf8'));const taken=new Set();
inv.filter(l=>l.n!==n).forEach(l=>l.bosses.filter(b=>b.role===role).forEach(b=>b.attacks.forEach(a=>{if(a.yPos===5)taken.add(a.xPos+'/'+a.customSpeed);})));
const fr=(sp,xs)=>xs.filter(x=>!taken.has(x+'/'+sp));
for(let sp=11;sp<=24;sp++)console.log(role,'sp',String(sp).padStart(2),' C-лево свободно:',fr(sp,[29,30,31]).join(',').padEnd(9),' C-право:',fr(sp,[69,70,71]).join(','));
