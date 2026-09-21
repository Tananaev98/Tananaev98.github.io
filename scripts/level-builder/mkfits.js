// mkfits.js spec.json outdir [T] — по авторским формам (spec: {enemK:{a:"x/sp ..."}}) пишет по файлу на комбо со списком вариантов подбора (форма, форма со скоростями ±1, режим G).
const fs=require('fs');const S=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));const dir=process.argv[3];const T=+process.argv[4]||200;
for(const r in S)for(const i in S[r]){const sh=S[r][i];const toks=sh.split(' ');const v=d=>toks.map(t=>{const [x,sp]=t.split('/').map(Number);return sp>=10?x+'/'+(sp+d):t;}).join(' ');
 fs.writeFileSync(dir+'/'+r+'_'+i+'.json',JSON.stringify({[r+':'+i]:[[sh,T,'S'],[v(-1),T,'S'],[v(1),T,'S'],[sh,T,'G']]}));}
