// prep.js N [timeNextBoss bossInterval] — механическая подготовка designN.js: пол паузы 2800, шаг серии не больше ~210 мс у медленных боссов (большой шаг делает комбо «пустыми»: последняя атака появляется поздно и весь её полёт — запас) (пауза между комбо не меняется:
// delay[1] прежний), damageByClass если в уровне есть attackDamage. Формы комбо это НЕ трогает.
const fs=require('fs'),path=require('path');const n=+process.argv[2];const f=path.join(__dirname,'design'+n+'.js');let s=fs.readFileSync(f,'utf8');
s=s.replace(/minWaveDelay: \d+/,'minWaveDelay: 2800');
if(process.argv[3]) s=s.replace(/timeNextBoss: \d+, bossInterval: \d+/,`timeNextBoss: ${process.argv[3]}, bossInterval: ${process.argv[4]}`);
const gd=fs.readFileSync(path.join(__dirname,'..','..','lvlData','gameData'+n+'.js'),'utf8');
if(/const attackDamage = \{/.test(gd)&&!/damageByClass/.test(s)) s=s.replace(/    n: (\d+),/,'    n: $1, damageByClass: true,');
// шаг серии
s=s.replace(/(cadence: ([\d.]+),[^\n]*?delay: \[)(\d+), (\d+)\]/g,(m,pre,cad,d0,d1)=>{const step=+d0*+cad;return step>260?pre+Math.round(210/+cad)+', '+d1+']':m;});
fs.writeFileSync(f,s);console.log('prep ok');
