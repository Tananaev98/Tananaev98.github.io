// dmgcheck.js N — средний урон атаки боссов (по слотам атак в комбо): до (git HEAD) и после; цифры урона сами не меняются — проверяется, что набор/доля классов light/medium/heavy не уронила и не раздула силу удара.
const cp=require('child_process'),vm=require('vm'),fs=require('fs'),path=require('path');const n=+process.argv[2];const R=path.join(__dirname,'..','..');
const oldSrc=cp.execSync(`git show HEAD:lvlData/gameData${n}.js`,{cwd:R,encoding:'utf8',maxBuffer:1<<26});
function mean(src){const sb={};new vm.Script(src+'\nthis.A=bossAbilities;this.D=bossAbilitiesDop;').runInContext(vm.createContext(sb));const out={};
 for(const r of ['enem1','enem2','enem3','enem4','enem5']){const at=sb.A.filter(a=>a.boss===r);let s=0,c=0;for(const d of sb.D.filter(d=>d.boss===r)) for(const i of d.indexAbilities){s+=at[i].customDamage;c++;} out[r]=[+(s/c).toFixed(2),c];}return out;}
const o=mean(oldSrc),nw=mean(fs.readFileSync(path.join(R,'lvlData',`gameData${n}.js`),'utf8'));
for(const r in o) console.log(r,'до',o[r][0],'после',nw[r][0],'x'+(nw[r][0]/o[r][0]).toFixed(2));
