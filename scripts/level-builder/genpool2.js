// genpool2.js outfile mode — генерирует пул форм с РАЗНЫМИ отпечатками сторон (не только «начать с X»), чтобы не упираться в SIDEREG:
// mode: LK (Л-Ц-Л-Ц...), KL (Ц-Л-Ц-Л...), RK (П-Ц-П-Ц...), KR (Ц-П-Ц-П...), LLK (Л-Л-Ц-Л...), KLL (Ц-Л-Л-Ц...)
const fs=require('fs');
const out=process.argv[2], mode=process.argv[3]||'LK';
const Ls=[12,14,16,18,20,22,24,25];
const Ks=[69,70,71];
const Rs=[76,80,84,88,90];
function pick(side,i){ if(side==='L') return Ls[i%Ls.length]; if(side==='R') return Rs[i%Rs.length]; return Ks[i%Ks.length]; }
function pattern(len,mode){
  const seq=[];
  for(let i=0;i<len;i++){
    let side;
    if(mode==='LK') side=i%2===0?'L':'K';
    else if(mode==='KL') side=i%2===0?'K':'L';
    else if(mode==='RK') side=i%2===0?'R':'K';
    else if(mode==='KR') side=i%2===0?'K':'R';
    else if(mode==='LLK') side=(i%3===2)?'K':'L';
    else if(mode==='KLL') side=(i%3===0)?'K':'L';
    else if(mode==='RRK') side=(i%3===2)?'K':'R';
    else side='L';
    seq.push(side);
  }
  return seq;
}
const lines=[];
let ctr={L:0,K:0,R:0};
for(let len=3;len<=5;len++){
  for(let variant=0;variant<4;variant++){
    const seq=pattern(len,mode);
    const toks=seq.map((side,i)=>{ const x=pick(side,ctr[side]++); const sp=11+((variant+i)%4); return x+'/'+sp; });
    lines.push(toks.join(' '));
  }
}
fs.writeFileSync(out, lines.join('\n')+'\n');
console.log('wrote',out,'mode',mode,'n',lines.length);
