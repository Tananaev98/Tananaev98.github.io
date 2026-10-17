// mklvl.js spec.json outdir — из авторской спецификации уровня строит для каждого босса outdir/eK.txt.json (вход author.js) и eK.txt (чтобы runlvl видел файл).
// spec: { bosses:{ enem1:{mode:'LK', lens:[4,5,...8 шт по id a..h], speeds:[12,13,..], anchors:[ids с якорем R sp5], anchorX:88, targets:['760/520/400',... 8 шт], opts:'0,300,600' }, ... } }
// Каждому id даётся 4 кандидата ровно заданной длины (BESTOF выбирает точнее попадающий в цель). Л=8..15, Ц=69..71. Форму придумывает автор (режим, длины, полосы, скорости) — программа лишь расставляет x/скорости по кругу.
const fs=require('fs'),path=require('path');
const [specf,outdir]=process.argv.slice(2);const spec=JSON.parse(fs.readFileSync(specf,'utf8'));
const GLs=spec.Ls||[8,9,10,11,12,13,14,15];let Ls=GLs;const IDS='abcdefgh'.split('');
const tailMode=(base,dup)=>(i,n)=>{const k=Math.max(0,n-dup);const j=i<k?i:k-1+0;const idx=i<k?i:(k-1);return base(idx);};
const swapMode=(base)=>(i,n)=>{let idx=i;if(n>=4){if(i===n-1)idx=n-2;else if(i===n-2)idx=n-1;}return base(idx);};
const pat={LKs:swapMode(i=>i%2?'K':'L'),KLs:swapMode(i=>i%2?'L':'K'),LKt:(i,n)=>tailMode(i=>i%2?'K':'L',1)(i,n),KLt:(i,n)=>tailMode(i=>i%2?'L':'K',1)(i,n),LKtt:(i,n)=>tailMode(i=>i%2?'K':'L',2)(i,n),LK:i=>i%2?'K':'L',KL:i=>i%2?'L':'K',LLK:i=>i%3==2?'K':'L',KLL:i=>i%3==0?'K':'L',LKK:i=>i%3==0?'L':'K',KKL:i=>i%3==2?'L':'K',LKL:i=>[0,2].includes(i%4)?'L':'K'};
fs.mkdirSync(outdir,{recursive:true});
Object.entries(spec.bosses).forEach(([role,b])=>{
  const out={};let li=0,ki=0,si=0,kj=0,ri=0,fi=0,ni=0,wi=0;const wv=()=>{if(!b.wave)return '';const W=b.wave;const k=wi++;const ph=W.phases||[0];return '#'+[W.amps[k%W.amps.length],W.freqs[(k*3+Math.floor(k/W.freqs.length))%W.freqs.length],ph[k%ph.length]].join(',');};
  IDS.forEach((id,ix)=>{
    Ls=b.Ls||GLs;const Ks=b.Ks||spec.Ks||[69,70,71];const spd=(b.idSpeeds&&b.idSpeeds[id])||b.speeds;const L=(b.lens||[])[ix],anchor=(b.anchors||[]).includes(id),alts=[];
    if(b.forms&&b.forms[id]){ // авторская форма: токены L<ск> K<ск> R<ск> W<ск> (волна: x растёт на 3) A (медленный якорь П), суффикс !g — фиксированная пауза перед токеном
      const SHf=b.shifts||[0,-2];const Rs=b.Rs||[76,78,80,82,84,86,88,90];const Fs=b.Fs||[6,7,8,9];const Ns=b.Ns||[20,21,22,23,24];const Ws=b.Ws||[6,9,7,10];const FL=Array.isArray(b.forms[id])?b.forms[id]:[b.forms[id]];for(const form of FL){const toks=form.trim().split(' ');
      for(let v=0;v<4*SHf.length;v++){const t=[];let wj=0;for(const tk of toks){const m=/^([LKRWAFN])([0-9]+)?(![0-9]+)?$/.exec(tk);if(!m)throw new Error('токен '+tk);const kind=m[1],sp=m[2]?+m[2]:0,fg=m[3]||'';
        if(kind==='A'){t.push((b.anchorX||88)+'/5'+wv()+fg);continue;}
        const spv=Math.max(11,sp+SHf[Math.floor(v/4)]);let x;
        if(kind==='F')x=Fs[(fi++)%Fs.length];else if(kind==='N')x=Ns[(ni++)%Ns.length];else if(kind==='L')x=Ls[(li++)%Ls.length];else if(kind==='K')x=Ks[(ki++)%Ks.length];else if(kind==='R')x=Rs[(ri++)%Rs.length];else{x=Math.min(25,Ws[v%4]+3*wj);wj++;}
        t.push(x+'/'+spv+wv()+fg);}
        alts.push([t.join(' '),b.targets[ix],'G',null,null,null,(b.idOpts&&b.idOpts[id])||b.opts||null]);}}
      out[role+':'+id]=alts;return;}
    const modesList=[(b.idModes&&b.idModes[id])||b.mode,...(b.altModes||[])];modesList.forEach((MODE,mi)=>{
    const SH=mi===0?(b.shifts||[0,-2]):(b.altShifts||[0,-1]);for(let v=0;v<4*SH.length;v++){
      const t=[];const endA=anchor&&b.anchorPos==='end';if(anchor&&!endA)t.push((b.anchorX||88)+'/5'+wv());
      const n=L-t.length-(endA?1:0);
      for(let i=0;i<n;i++){const s=pat[MODE](i,n);const x=s==='L'?Ls[(li++)%Ls.length]:Ks[(ki++)%Ks.length];const KS=(b.idKspeeds&&b.idKspeeds[id])||b.Kspeeds;const sp0=(s==='K'&&KS)?KS[(kj++)%KS.length]:spd[(si++)%spd.length];t.push(x+"/"+Math.max(11,sp0+SH[Math.floor(v/4)])+wv());}
      if(endA)t.push((b.anchorX||88)+'/5'+wv());alts.push([t.join(" "),b.targets[ix],"G",null,null,null,(b.idOpts&&b.idOpts[id])||b.opts||null]);
    }
    });
    out[role+':'+id]=alts;
  });
  const K=role.slice(-1);fs.writeFileSync(path.join(outdir,'e'+K+'.txt.json'),JSON.stringify(out));fs.writeFileSync(path.join(outdir,'e'+K+'.txt'),'# spec-driven\n');
});
console.log('ok',Object.keys(spec.bosses).join(','));
