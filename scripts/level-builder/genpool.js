// genpool.js outfile startSide — генерирует большой пул кандидатных форм (чередование startSide/K, длины 3-6, разные x/скорости) для author.js/plan.sh
const fs=require('fs');
const out=process.argv[2], startSide=process.argv[3]||'L';
const Ls=[12,14,16,18,20,22,24,25];
const Ks=[69,70,71];
const Rs=[76,80,84,88,90];
function gen(){
  const lines=[];
  let li=0, ki=0, ri=0;
  for(let len=3; len<=6; len++){
    for(let variant=0; variant<7; variant++){
      const toks=[];
      for(let i=0;i<len;i++){
        const side=(i%2===0)?startSide:'K';
        let x;
        if(side==='L') x=Ls[(li++)%Ls.length];
        else if(side==='R') x=Rs[(ri++)%Rs.length];
        else x=Ks[(ki++)%Ks.length];
        const sp=11+((variant+i)%6);
        toks.push(x+'/'+sp);
      }
      lines.push(toks.join(' '));
    }
  }
  return lines;
}
fs.writeFileSync(out, gen().join('\n')+'\n');
console.log('wrote', out);
