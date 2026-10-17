// freek.js N enemK — занятость K-полосы (x 69..71) и левого кластера по скорости и высоте старта y 5..9: сколько ключей x/y/скорость свободно.
const fs=require('fs'),path=require('path');const n=+process.argv[2],role=process.argv[3];
const inv=JSON.parse(fs.readFileSync(path.join(__dirname,'inv.json'),'utf8'));const taken=new Set();
inv.filter(l=>l.n!==n).forEach(l=>l.bosses.filter(b=>b.role===role).forEach(b=>b.attacks.forEach(a=>taken.add(a.xPos+'/'+a.yPos+'/'+a.customSpeed))));
for(let sp=11;sp<=23;sp++){let K=0,Lc=0,R=0;for(let y=5;y<=9;y++){for(const x of [69,70,71])if(!taken.has(x+'/'+y+'/'+sp))K++;for(let x=6;x<=25;x++)if(!taken.has(x+'/'+y+'/'+sp))Lc++;for(let x=72;x<=94;x++)if(!taken.has(x+'/'+y+'/'+sp))R++;}
 console.log(role,'sp',String(sp).padStart(2),'свободно ключей: K',String(K).padStart(2)+'/15','  L',String(Lc).padStart(3)+'/100','  R',String(R).padStart(3)+'/115');}
