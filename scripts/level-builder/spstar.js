// spstar.js N — для каждого босса: скорость, при которой полёт (фаза 1, множитель вращения 1, y=5..9) пересекает порог 2000 мс (граница «долгих» полётов А10.3) и 1200 мс.
const lib=require('./lib.js'),model=lib.model;const L=require('./design'+process.argv[2]+'.js');
for(const role of Object.keys(L.bosses)){const ctx=lib.ctxFor(L,role);const bb=ctx.bossCombatConfig.bosses[role];const eb=ctx.ENEMY_TYPES[role+role.slice(-1)];
 const row=[];for(let sp=10;sp<=18;sp++){const pps=eb.baseSpeed*sp*bb.speedMultiplier*L.phases[0].speed*model.BASE_SPEED_GAME;row.push(sp+':'+[5,7,9].map(y=>Math.round(model.flightMs(y,pps,bb.movementStyle||null,ctx.bossCombatConfig.movementStyles))).join('/'));}
 console.log(role,bb.movementStyle,'mult',bb.speedMultiplier,' sp:полёт(y5/y7/y9) ',row.join('  '));}
