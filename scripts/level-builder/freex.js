// freex.js N enemK sp [y=5] — занятые/свободные x для геометрии x/y/скорость на других уровнях (иначе конвейер сдвигает x на ±12 и ломает задуманные полосы).
// Полосы: L 4..28, «левый центр» 29..31, «правый центр» 69..71, R 72..96 (центр 32..68 при y 6..44 запрещён телом босса).
const fs=require('fs'),path=require('path');const n=+process.argv[2],role=process.argv[3],sp=process.argv[4],y=process.argv[5]||5;
const inv=JSON.parse(fs.readFileSync(path.join(__dirname,'inv.json'),'utf8'));
const taken=new Set();inv.filter(l=>l.n!==n).forEach(l=>l.bosses.filter(b=>b.role===role).forEach(b=>b.attacks.forEach(a=>{if(String(a.yPos)===String(y)&&String(a.customSpeed)===sp)taken.add(a.xPos);})));
const zone=(a,b)=>{let o=[];for(let x=a;x<=b;x++)o.push(taken.has(x)?'·':x);return o.join(' ');};
console.log(role,'sp',sp,'y',y,'занято:',[...taken].sort((a,b)=>a-b).join(','));
console.log(' L  8-28  :',zone(8,28));console.log(' C  29-31 :',zone(29,31),'  C\' 69-71:',zone(69,71));console.log(' R  72-92 :',zone(72,92));
