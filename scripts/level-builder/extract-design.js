// Извлекает designN.js из СУЩЕСТВУЮЩЕГО gameDataN.js (для уровней, ещё не переделанных по А11): профиль боссов, фазы, константы и ФОРМЫ комбо
// (стороны/скорости/порядок появления, волны) как стартовая точка. Времена прилёта — заглушки: их подбирает refit.js под честную модель.
// Формы, не подходящие честности (чередование краёв), автор правит вручную. node scripts/level-builder/extract-design.js N
const fs=require('fs'),path=require('path'),vm=require('vm');
const n=+process.argv[2]; const R=path.join(__dirname,'..','..');
const src=fs.readFileSync(path.join(R,'lvlData',`gameData${n}.js`),'utf8');
const sb={};new vm.Script(src+`
 this.C=bossCombatConfig;this.T=ENEMY_TYPES;this.A=bossAbilities;this.D=bossAbilitiesDop;this.M=mBossDelayAb;this.tnb=timeNextBoss;this.bi=bossInterval;`).runInContext(vm.createContext(sb));
const C=sb.C, ROLES=['enem1','enem2','enem3','enem4','enem5'], ids='abcdefghijklmnop';
const q=s=>JSON.stringify(String(s||'')).replace(/^"|"$/g,'').replace(/'/g,"\'").replace(/\\"/g,'"');
const out=[];
out.push(`// УРОВЕНЬ ${n} (v3) — форма комбо извлечена из прежней версии, времена подобраны refit.js под честную модель (А11). Правится вручную по А11.`);
out.push(`module.exports = {`);
out.push(`    n: ${n}, timeNextBoss: ${sb.tnb}, bossInterval: ${sb.bi}, tight: { p1: 500, floor: 170 },`);
out.push(`    cfg: { levelCadence: ${C.levelCadence}, minWaveDelay: ${C.minWaveDelay}, minShotDelay: ${C.minShotDelay}, minTelegraphMs: ${C.minTelegraphMs} },`);
out.push(`    phases: [`);
C.phases.forEach((p,i)=>out.push(`        { minHp: ${p.minHp}, cadence: ${p.cadence}, speed: ${p.speed}, telegraphMultiplier: ${p.telegraphMultiplier}, surpriseChance: ${p.surpriseChance}, maxActiveAttacks: ${p.maxActiveAttacks}${p.excludedDangerousCombos?`, excluded: ${p.excludedDangerousCombos}`:''} }${i<2?',':''}`));
out.push(`    ],`);
out.push(`    bosses: {`);
ROLES.forEach((r,ri)=>{
  const b=C.bosses[r]; const at=sb.A.filter(a=>a.boss===r); const dops=sb.D.filter(d=>d.boss===r); const dl=sb.M.find(m=>m.boss===r);
  const title=(sb.T[r]&&sb.T[r].dispName)||r;
  out.push(`        ${r}: { title: '${q(title)}', identity: '${q(b.combatIdentity)}',`);
  out.push(`            trick: '${q(b.combatTrick)}',`);
  out.push(`            tight: { p1: 400, floor: 120 }, style: '${b.movementStyle}', cadence: ${b.cadence}, telegraphMs: ${b.telegraphMs}, speedMultiplier: ${b.speedMultiplier}, signatureEvery: ${b.signatureEvery}, delay: [${dl.bossDelayAb}, ${dl.bossDelayAbDop}],${dl.firstWaveDelayMs!==undefined?` firstWave: ${dl.firstWaveDelayMs},`:''}`);
  out.push(`            combos: [`);
  dops.forEach((c,ci)=>{
    const beats=c.indexAbilities.map((k,i)=>{const a=at[k];const w=a.waveAmplitude!==undefined?`~${a.waveAmplitude},${a.waveFrequency}${a.wavePhase!==undefined?','+a.wavePhase:''}`:'';return `${a.xPos}/${a.customSpeed}@${1600+i*200}${w}`;}).join(' ');
    const parts=[`id: '${ids[ci]}'`,'tight: false'];
    if(c.signature)parts.push('sig: true'); if(c.minPhase)parts.push(`minPhase: ${c.minPhase}`);
    if(c.shotDelayMs)parts.push(`shotDelayMs: ${c.shotDelayMs}`); if(c.recoveryMs)parts.push(`recoveryMs: ${c.recoveryMs}`);
    if(c.shotGapsMs)parts.push(`gaps: [${c.shotGapsMs.join(', ')}]`); if(c.openingOrder!==undefined)parts.push(`open: ${c.openingOrder}`);
    parts.push(`beats: '${beats}'`); parts.push(`label: '${q(c.label||'')}'`);
    out.push(`                { ${parts.join(', ')} }${ci<dops.length-1?',':''}`);
  });
  out.push(`            ] }${ri<4?',':''}`);
});
out.push(`    }`);out.push(`};`);
const file=path.join(__dirname,`design${n}.js`);
if(fs.existsSync(file)&&!process.argv.includes('--force')){console.log('design'+n+'.js уже есть (--force чтобы перезаписать)');process.exit(1);}
fs.writeFileSync(file,out.join('\n')+'\n');console.log('записан',file);
