const cp=require('child_process'),vm=require('vm'),fs=require('fs');const n=+process.argv[2];
const R=require('path').join(__dirname,'..','..');
const oldSrc=cp.execSync(`git show HEAD:lvlData/gameData${n}.js`,{cwd:R,encoding:'utf8',maxBuffer:1<<26});
const load=(src)=>{const sb={};new vm.Script(src+'\nthis.A=bossAbilities;this.D=bossAbilitiesDop;this.T=typeof attackDamage!=="undefined"?attackDamage:null;').runInContext(vm.createContext(sb));return sb;};
const o=load(oldSrc),w=load(fs.readFileSync(R+'/lvlData/gameData'+n+'.js','utf8'));
const mean=(sb,r)=>{const at=sb.A.filter(a=>a.boss===r);let s=0,c=0;for(const d of sb.D.filter(d=>d.boss===r))for(const i of d.indexAbilities){s+=at[i].customDamage;c++;}return s/c;};
for(const r of ['enem1','enem2','enem3','enem4','enem5']){const base=mean(o,r);const at=w.A.filter(a=>a.boss===r);const cnt={};let tot=0;
 for(const d of w.D.filter(d=>d.boss===r))for(const i of d.indexAbilities){const a=at[i];const cl=a.customSpeed>=13?'light':a.customSpeed>=7?'medium':'heavy';cnt[cl]=(cnt[cl]||0)+1;tot++;}
 // нет override: слоты по классу; с override — все слоты кроме heavy (якоря) берут выбранный класс
 const T=w.T[r];const res={};for(const ov of ['light','medium','heavy']){let s=0;for(const cl in cnt){const use=(cl==='heavy')?'heavy':ov;s+=cnt[cl]*T[use];}res[ov]=+(s/tot/base).toFixed(2);}
 let s=0;for(const cl in cnt)s+=cnt[cl]*T[cl];res.byClass=+(s/tot/base).toFixed(2);
 console.log(r,'базa',base.toFixed(2),JSON.stringify(cnt),JSON.stringify(res));}
