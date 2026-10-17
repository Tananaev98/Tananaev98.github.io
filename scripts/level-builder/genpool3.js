// genpool3.js outfile mode [anchorX] — пул форм: режимы LK KL LLK KLL LKK KKL (Л=6..25, Ц=69..71), скорости 12..16, длины 3..6, у нечётных вариантов — медленный якорь anchorX/5 с противоположной стороны.
// Только Л/Ц (без П у быстрых): перекрёстный огонь А5.1 не срабатывает, перебросы Л<->Ц дают тугость (А11.8).
const fs=require('fs');const [out,mode,anchor]=process.argv.slice(2);
const Ls=[8,9,10,11,12,13,14,15],Ks=[69,70,71];const cnt={L:0,K:0};
const pat={LK:i=>i%2?'K':'L',KL:i=>i%2?'L':'K',LLK:i=>i%3==2?'K':'L',KLL:i=>i%3==0?'K':'L',LKK:i=>i%3==0?'L':'K',KKL:i=>i%3==2?'L':'K'}[mode];
const lines=[];
for(let len=4;len<=6;len++)for(let v=0;v<5;v++){
  const t=[];if(anchor&&v%2===1)t.push(anchor+'/5');
  const n=len-(t.length?1:0)+0;
  for(let i=0;i<n;i++){const s=pat(i);const x=s==='L'?Ls[(cnt.L++)%Ls.length]:Ks[(cnt.K++)%Ks.length];t.push(x+'/'+(12+((v+i+len)%5)));}
  lines.push(t.join(' '));
}
fs.writeFileSync(out,lines.join('\n')+'\n');console.log(out,mode,lines.length);
