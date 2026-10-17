// shareest.js N spec.json — оценка доли «средних» полётов (1200..2000 мс, А10.3) по спецификации mklvl и design N: токены speeds по кругу, y=7, якоря (sp5) — долгие.
const fs=require('fs');const lib=require('./lib.js'),model=lib.model;const n=+process.argv[2];const L=require('./design'+n+'.js');const spec=JSON.parse(fs.readFileSync(process.argv[3],'utf8'));
const YW=[[5,.35],[6,.3],[7,.2],[8,.1],[9,.05]];
for(const role of Object.keys(spec.bosses)){const b=spec.bosses[role];const ctx=lib.ctxFor(L,role);const bb=ctx.bossCombatConfig.bosses[role];const eb=ctx.ENEMY_TYPES[role+role.slice(-1)];
 const fl1=(sp,Y)=>{const pps=eb.baseSpeed*sp*bb.speedMultiplier*L.phases[0].speed*model.BASE_SPEED_GAME;return model.flightMs(Y,pps,bb.movementStyle||null,ctx.bossCombatConfig.movementStyles);};
 const w=(sp)=>{let m=0,l=0;YW.forEach(([y,wt])=>{const f=fl1(sp,y);if(f>1200&&f<=2000)m+=wt;else if(f<=1200)l+=wt;});return [m,l];};
 const IDS='abcdefgh'.split('');let si=0,mid=0,tot=0,lo=0;
 if(b.forms){for(const id of IDS){for(const tk of (Array.isArray(b.forms[id])?b.forms[id][0]:b.forms[id]).trim().split(" ")){const mm=/^([LKRWAFN])([0-9]+)?/.exec(tk);tot++;if(mm[1]==='A')continue;const [mi,lw]=w(+mm[2]);mid+=mi;lo+=lw;}}} else IDS.forEach((id,ix)=>{const anch=(b.anchors||[]).includes(id);const spd=(b.idSpeeds&&b.idSpeeds[id])||b.speeds;const len=b.lens[ix];if(anch){tot++;}const nn=len-(anch?1:0);for(let i=0;i<nn;i++){const sp=(b.Kspeeds&&i%2===1)?b.Kspeeds[(si++)%b.Kspeeds.length]:spd[(si++)%spd.length];const [m,l]=w(sp);tot++;mid+=m;lo+=l;}});
 console.log(role,bb.movementStyle,'mult',bb.speedMultiplier,'оценка средних',(mid/tot).toFixed(2),'коротких',(lo/tot).toFixed(2),'(токенов',tot+')');}
