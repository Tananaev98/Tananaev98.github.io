// flights.js N enemK [lo hi] — полёты (прилёт − появление, ф1) каждой атаки роли из designN.js; печатает токены у границ профиля А10.3 (по умолчанию 1900..2300 мс)
const lib=require('./lib.js'),model=lib.model;const n=+process.argv[2],role=process.argv[3],lo=+(process.argv[4]||1900),hi=+(process.argv[5]||2300);const L=require('./design'+n+'.js');
const ctx=lib.ctxFor(L,role);const avoid=new Set(),used=new Set();
for(const c of L.bosses[role].combos){let bts;try{bts=lib.solveCombo(L,role,{id:c.id,tolerant:true,gaps:c.gaps,beats:c.beats},{},avoid,used);}catch(e){console.log(c.id,'ошибка сборки');continue;}
 const ab=bts.map(x=>({boss:role,xPos:x.x,yPos:x.y,customSpeed:x.s}));const idx=ab.map((_,i)=>i);const an=model.analyze(ctx,role,ab,idx,0,{shotGapsMs:c.gaps});
 console.log(c.id,ab.map((a,i)=>{const f=Math.round(an.arrivals[i]-an.offsets[i]);const m=f>=lo&&f<=hi?'*':'';return a.xPos+'/'+a.customSpeed+':'+f+m;}).join(' '));}
