// explore.js N enemK "форма" [opts] — помощник автора (А9.7): по всем паузам формы показывает, почему комбо отвергается (какая проверка) и какие
// (худший / ТИПИЧНЫЙ) запасы по фазам достижимы. Формы (стороны, скорости) выбирает автор; программа ничего не подбирает за него.
// opts — паузы между появлениями, по умолчанию 0,150,300,450,600,800. Пример: node explore.js 25 enem5 "86/5 20/14 88/15 24/16 90/14"
const F=require('./fitlib.js'),lib=require('./lib.js'),model=lib.model,pm=require('../player-model.js');
const n=+process.argv[2],role=process.argv[3],shape=process.argv[4];const opts=(process.argv[5]||'0,150,300,450,600,800').split(',').map(Number);
const L=require('./design'+n+'.js');const tk=F.parseShape(shape).map(o=>({...o,w:1}));const m=tk.length;
const ctx0=lib.ctxFor(L,role),bb0=ctx0.bossCombatConfig.bosses[role];
const step=Math.max(L.cfg.minShotDelay,L.bosses[role].delay[0]*L.bosses[role].cadence*L.phases[0].cadence);
const baseFlight=sp=>{const eb=ctx0.ENEMY_TYPES[role+role.slice(-1)];return model.flightMs(5,eb.baseSpeed*sp*bb0.speedMultiplier*L.phases[0].speed*model.BASE_SPEED_GAME,bb0.movementStyle||null,ctx0.bossCombatConfig.movementStyles);};
const why={},ok=[];
(function rec(i,g){if(i===m){let cur=0;const at=tk.map((o,k)=>{if(k>0)cur+=Math.max(step,g[k-1]||0);return Math.round(((o.sp<=8?3000:baseFlight(o.sp))+cur)/10)*10;});
 const sl=F.evalBeats(L,role,tk,at,g.slice());if(!sl){const w=F.why();why[w]=(why[w]||0)+1;return;}
 if(Math.min(...sl)<75){why['worst<75']=(why['worst<75']||0)+1;return;}ok.push({g:g.slice(),sl:[...sl],typ:sl.typ,at:sl.real});return;}
 for(const o of opts){g.push(o);rec(i+1,g);g.pop();}})(1,[]);
console.log('шаг серии',Math.round(step),'мс; вариантов пауз',Math.pow(opts.length,m-1),'; отвергнуто по причинам:',JSON.stringify(why),'; подходят:',ok.length);
ok.sort((a,b)=>a.typ[2]-b.typ[2]);
for(const r of ok.slice(0,+process.env.TOP||6))console.log(' паузы',JSON.stringify(r.g),'худш',r.sl.join('/'),'типичн',r.typ.join('/'),'прилёты',r.at.join(','));
