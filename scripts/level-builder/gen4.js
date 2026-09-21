// gen4.js вход.json выход.json — превращает авторские РИСУНКИ комбо (строки букв) и профиль скоростей босса в формы «x/скорость …» для author.js.
// Буквы: Л/П/Ц — быстрые слева/справа/по центру (x берутся по кругу из пулов), л/п/ц — медленные (слева/справа/снизу-центр). Рисунки и скорости задаёт автор в входе:
// { "enem1": { "pats": ["ЛЦЛЦ",...8], "ramp":[12,13,14,15,16], "slow":6, "lx":[10,14,20], "rx":[80,86,90], "cx":[30,70] } , ... }
const fs=require('fs');const S=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));const out={};
for(const r in S){const b=S[r];const lx=b.lx||[10,14,20,8,24],rx=b.rx||[90,86,80,92,76],cx=b.cx||[30,70];const cl={};out[r]={};
 b.pats.forEach((p,i)=>{const id='abcdefgh'[i];let ic=0,il=0,ir=0,isl=0,isr=0;let fast=0;const toks=[];
  for(const ch of p){if(ch==='Л'){toks.push(lx[il++%lx.length]+'/'+(b.ramp[Math.min(fast++,b.ramp.length-1)]));}
   else if(ch==='П'){toks.push(rx[ir++%rx.length]+'/'+(b.ramp[Math.min(fast++,b.ramp.length-1)]));}
   else if(ch==='Ц'){toks.push(cx[ic++%cx.length]+'/'+(b.ramp[Math.min(fast++,b.ramp.length-1)]));}
   else if(ch==='л')toks.push(lx[il++%lx.length]+'/'+b.slow);else if(ch==='п')toks.push(rx[ir++%rx.length]+'/'+b.slow);else if(ch==='ц')toks.push('50/'+b.slow);}
  out[r][id]=toks.join(' ');});}
fs.writeFileSync(process.argv[3],JSON.stringify(out));console.log(JSON.stringify(out).slice(0,300));
