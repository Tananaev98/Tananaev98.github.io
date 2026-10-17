// humanrobust.js N — справочно (А9.6): сколько комбо уровня остаются возможными (худшее вращение >= 0 / >= 60 мс), если живая рука медленнее модели (курсор 110 → 100/90/80 %/с).
// Считается теми же функциями, что и конструктор (fitlib.evalBeats → player-model.sequentialSlack), по designN.js; решения о правках по нему не принимаются, это оценка запаса честности.
const F=require('./fitlib.js'),pm=require('../player-model.js');const n=+process.argv[2];const L=require('./design'+n+'.js');
const base=pm.SEQ_PLAYER.cursorSpeed;const roles=Object.keys(L.bosses);
for(const sp of [110,100,90,80]){pm.SEQ_PLAYER.cursorSpeed=sp;const rows=[];let tot=0,neg=0,low=0;
 for(const r of roles){const per=[0,0,0],perLow=[0,0,0],cnt=[0,0,0];
  for(const c of L.bosses[r].combos){const toks=c.beats.trim().split(/ +/).map(t=>{const [a,b]=t.split('@');const [x,s]=a.split('/').map(Number);return {x,sp:s,at:+b};});let sl=null;try{sl=F.evalBeats(L,r,toks,toks.map(t=>t.at),c.gaps);}catch(e){}
   if(!sl)continue;const mp=c.minPhase||1;for(let p=mp-1;p<3;p++){cnt[p]++;tot++;if(sl[p]<0){per[p]++;neg++;}if(sl[p]<60){perLow[p]++;low++;}}}
  rows.push(r+' невозможных(<0) по фазам '+per.join('/')+' из '+cnt.join('/')+'; <60 мс: '+perLow.join('/'));}
 console.log('курсор',sp,'%/с: невозможных',neg,'из',tot,'; запас <60 мс:',low);rows.forEach(x=>console.log('  '+x));}
pm.SEQ_PLAYER.cursorSpeed=base;
