// lanes.js вход.txt выход.txt — переводит формы «условной C-полосы» (x 29..39 = на деле левый кластер x≈20 после обтекания босса; 69..71) в честные полосы:
// левый кластер L (x 12..24) и правый центр K (x 64..71). Журнал боя ур.25: любые x 27..40 у босса оказываются на x 16..24; справа 66..70 остаются на месте.
const fs=require('fs');const Lp=[24,20,16,22,18,14,12,26],Kp=[70,68,66,64,71,69,67,65];
const lines=fs.readFileSync(process.argv[2],'utf8').split('\n').filter(Boolean);const out=[];
for(const l of lines){let li=0,ki=0;out.push(l.trim().split(/\s+/).map(t=>{const [x,s]=t.split('/').map(Number);if(x>=29&&x<=39)return Lp[li++%Lp.length]+'/'+s;if(x>=64&&x<=71)return Kp[ki++%Kp.length]+'/'+s;return t;}).join(' '));}
fs.writeFileSync(process.argv[3],out.join('\n')+'\n');
