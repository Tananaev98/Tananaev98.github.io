// mkspec.js N outdir — печатает спеки для author.js: форма автора + запасные варианты (скорости ±1) — форму и порядок задаёт автор в этом файле, не алгоритм.
const fs=require('fs');const [,, N, dir, file]=process.argv;const S=JSON.parse(fs.readFileSync(file,'utf8'));
const out={};
for(const role of Object.keys(S)){const o={};
  for(const [id,sh] of Object.entries(S[role])){const T=200;const toks=sh.split(' ');const alts=[];
    const vars=[0,-1,1,-2].map(d=>toks.map(t=>{const [x,sp]=t.split('/').map(Number);return sp>=10?x+'/'+(sp+d):t;}).join(' '));
    for(const v of vars.slice(0,3)) alts.push([v,T,'S']); alts.push([vars[0],T,'G']);
    alts.push([vars[0],T,'S',1500,700,900]);o[role+':'+id]=alts;}
  fs.writeFileSync(dir+'/'+role+'.json',JSON.stringify(o));}
console.log('ok');
