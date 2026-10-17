// freestruct.js N role [minLen=3 maxLen=6 sumMin=34 sumMax=40 maxMin=2] — свободные мультимножества длин комбо роли (8 комбо; не более maxMin комбо минимальной длины). Данные — inv.json (другие уровни).
const fs=require('fs'),path=require('path');const inv=JSON.parse(fs.readFileSync(path.join(__dirname,'inv.json'),'utf8'));
const [n,role,mn=3,mx=6,s0=34,s1=40,maxMin=2]=[+process.argv[2],process.argv[3],...process.argv.slice(4).map(Number)];
const used=new Set(inv.filter(l=>l.n!==n).map(l=>l.bosses.find(b=>b.role===role).combos.map(c=>c.indices.length).sort((a,b)=>a-b).join('')));
const out=[];(function rec(a,i){if(a.length===8){const s=a.reduce((x,y)=>x+y,0);if(s>=s0&&s<=s1&&a.filter(v=>v===mn).length<=maxMin&&!used.has(a.join('')))out.push(a.join(''));return;}for(let v=i;v<=mx;v++)rec(a.concat(v),v);})([],mn);
console.log(role,'свободно',out.length+':',out.slice(0,60).join(' '));
