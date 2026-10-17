// hdr.js N patch.json — правит шапку designN.js: {timeNextBoss,bossInterval, phases:[{...},{...},{...}], bosses:{enemK:{speedMultiplier,speedVariance,delay0,cadence,telegraphMs}}}
const fs=require('fs'),path=require('path');const n=+process.argv[2];const P=JSON.parse(fs.readFileSync(process.argv[3],'utf8'));
const f=path.join(__dirname,'design'+n+'.js');let s=fs.readFileSync(f,'utf8');
if(P.timeNextBoss!==undefined)s=s.replace(/timeNextBoss: \d+, bossInterval: \d+/,`timeNextBoss: ${P.timeNextBoss}, bossInterval: ${P.bossInterval}`);
if(P.phases)P.phases.forEach((ph,i)=>{let k=-1;s=s.replace(/({ minHp: [0-9.]+, cadence: )[0-9.]+(, speed: )[0-9.]+(, telegraphMultiplier: )[0-9.]+(, surpriseChance: [0-9.]+, maxActiveAttacks: )[0-9]+/g,(m,a,b,c,d)=>{k++;if(k!==i)return m;return a+ph.cadence+b+ph.speed+c+ph.tele+d+ph.maxActive;});});
Object.entries(P.bosses||{}).forEach(([r,b])=>{const i=s.indexOf('        '+r+':');const nx=s.indexOf('\n        enem',i+10);const j=nx<0?s.indexOf('    }\n};'):nx;let seg=s.slice(i,j);
 if(b.speedMultiplier!==undefined)seg=seg.replace(/speedMultiplier: [\d.]+/,'speedMultiplier: '+b.speedMultiplier);
 if(b.speedVariance){seg=seg.replace(/ speedVariance: \[[^\]]*\],/,'');seg=seg.replace(/(speedMultiplier: [\d.]+,)/,'$1 speedVariance: ['+b.speedVariance.join(', ')+'],');}
 if(b.delay0!==undefined)seg=seg.replace(/delay: \[\d+,/,'delay: ['+b.delay0+',');
 if(b.telegraphMs!==undefined)seg=seg.replace(/telegraphMs: [0-9]+/,'telegraphMs: '+b.telegraphMs);
 if(b.cadence!==undefined)seg=seg.replace(/ cadence: [\d.]+,/,' cadence: '+b.cadence+',');
 if(b.delay1!==undefined){const a=seg.indexOf('delay: [');const c=seg.indexOf(']',a);const parts=seg.slice(a+8,c).split(',');seg=seg.slice(0,a)+'delay: ['+parts[0].trim()+', '+b.delay1+seg.slice(c);}
 s=s.slice(0,i)+seg+s.slice(j);});
fs.writeFileSync(f,s);console.log('hdr ok');
