// settext.js N файл.json — {enemK:[identity, trick]} в designN.js (тексты пишутся по итоговым данным, А7.6)
const fs=require('fs'),path=require('path');const n=+process.argv[2];const T=JSON.parse(fs.readFileSync(process.argv[3],'utf8'));const f=path.join(__dirname,'design'+n+'.js');let s=fs.readFileSync(f,'utf8');
for(const r in T){const i=s.indexOf('        '+r+':');const nx=s.indexOf('\n        enem',i+10);const j=nx<0?s.length:nx;let seg=s.slice(i,j);
 seg=seg.replace(/identity: '[^']*'/,"identity: '"+T[r][0]+"'").replace(/trick: '[^']*'/,"trick: '"+T[r][1]+"'");s=s.slice(0,i)+seg+s.slice(j);}
fs.writeFileSync(f,s);
