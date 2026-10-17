// combotyp.js N enemK — типичный (медиана 5 вращений) и худший запас КАЖДОГО комбо роли из designN.js (после правок/сдвигов), как считает fitlib.evalBeats
const F=require('./fitlib.js');const n=+process.argv[2],role=process.argv[3];const L=require('./design'+n+'.js');
for(const c of L.bosses[role].combos){const toks=c.beats.trim().split(/\s+/).map(t=>{const [a,b]=t.split('@');const [x,sp]=a.split('/').map(Number);return {x,sp,at:+b};});
 let sl=null;try{sl=F.evalBeats(L,role,toks,toks.map(t=>t.at),c.gaps);}catch(e){}
 console.log(c.id,(c.minPhase?'ф'+c.minPhase+'+':'ф1+ '),sl?'худш '+sl.join('/')+'  типичн '+sl.typ.join('/'):'-- '+F.why(),' |',c.beats);}
