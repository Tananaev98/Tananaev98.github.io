// Перекалибровка ВРЕМЁН всех комбо designN.js под честную модель: форма (стороны x, скорости, порядок появления) берётся из
// авторского дизайна как есть; времена прилёта подбираются под тугость по ступеньке (a вступление ... f поздняя длинная).
// Комбо, для которых честного варианта нет (форма чередует края), выводятся списком — их форму правит автор вручную.
// node scripts/level-builder/refit.js N [--dry]
const fs=require('fs'),path=require('path'),{fitShape,fitTail}=require('./fitlib.js');
const n=+process.argv[2],dry=process.argv.includes('--dry');
const file=path.join(__dirname,'design'+n+'.js');let src=fs.readFileSync(file,'utf8');const L=require(file);
const LADDER={a:520,b:400,c:260,d:260,e:250,f:190,g:330,h:240,i:300,j:300};
const failed=[];let done=0;
// профиль боссов (А10.3), выработанный на ур.4-6: долгие полёты — у вступительных/поздних комбо (не тянут медиану ф1), короткие — у первых битов
const LONG=process.env.LONG?JSON.parse(process.env.LONG):{enem1:'abghf',enem3:'agf',enem5:'ag'}, SHORT=process.env.SHORT?JSON.parse(process.env.SHORT):{enem2:'cdh',enem4:'gb'};
const fitP=(role,id,shape,target)=>{
  let r=null;
  if((LONG[role]||'').includes(id)) r=fitShape(L,role,shape,target,2200,520,300);
  else if((SHORT[role]||'').includes(id)) r=fitShape(L,role,shape,target,1000,520,100);
  return r||fitShape(L,role,shape,target);
};
for(const [role,B] of Object.entries(L.bosses)){
  const map={};
  for(const c of B.combos){
    const toks=c.beats.trim().split(/\s+/);
    const copy=toks.filter(t=>t[0]==='=').length;
    const parse=t=>{const m=t.match(/^(\d+)\/(\d+)@(\d+)/);return m?{x:+m[1],sp:+m[2],t:+m[3],raw:t}:null;};
    let res=null;
    if(copy===0){
      // порядок появления = порядок записи; формa сохраняется
      const shape=toks.map(t=>{const p=parse(t);return p.x+'/'+p.sp;}).join(' ');
      res=fitP(role,c.id,shape,LADDER[c.id]||300);
      if(!res){ // принцип А11.4: пачка у одного края -> одна переброска. Форма группируется по сторонам (порядок сторон — по первому появлению)
        const items=toks.map(t=>{const p=parse(t);return {x:p.x,sp:p.sp};}); const side=x=>x<=28?'L':x>=72?'R':'C';
        const order=[];items.forEach(it=>{if(!order.includes(side(it.x)))order.push(side(it.x));});
        const grouped=[];order.forEach(sd=>items.filter(it=>side(it.x)===sd).forEach(it=>grouped.push(it)));
        const gshape=grouped.map((it,i)=>it.x+'/'+it.sp+(i>0&&side(it.x)!==side(grouped[i-1].x)?'~2':'')).join(' ');
        res=fitP(role,c.id,gshape,LADDER[c.id]||300); if(res) console.log('  (форма сгруппирована по сторонам: '+role+' '+c.id+')');
      }
      if(res)map[c.id]=res.beats.split(' ');
    } else {
      const pre=[];const tail=[];toks.forEach(t=>{if(t[0]==='='){const [id,k]=t.slice(1).split('#');pre.push(map[id]&&map[id][+k]);}else tail.push(t);});
      if(pre.every(Boolean)){
        const shape=tail.map(t=>{const p=parse(t);return p.x+'/'+p.sp;}).join(' ');
        res=fitTail(L,role,pre.join(' '),shape,LADDER[c.id]||250);
        if(!res){ const px=pre.map(b=>+b.split('/')[0]); const lastX=px[px.length-1]; const opp=lastX<50?84:16;
          for(const cand of [ (lastX<50?Math.min(lastX+10,28):Math.max(lastX-10,72))+'/12', opp+'/12', '30/12', (lastX<50?Math.max(lastX-8,5):Math.min(lastX+8,95))+'/13' ]){
            res=fitTail(L,role,pre.join(' '),cand,LADDER[c.id]||250); if(res){console.log('  (хвост e заменён на '+cand+': '+role+')');break;} } }
        if(res){const all=res.beats.split(' ');map[c.id]=all; res.beats='@@'+toks.filter(t=>t[0]==='=').join(' ')+' '+all.slice(pre.length).join(' ');}
      }
    }
    if(!res){failed.push(`${role} ${c.id}: ${toks.join(' ')}`);map[c.id]=toks;continue;}
    const newBeats=res.beats.startsWith('@@')?res.beats.slice(2):res.beats;
    const i=src.indexOf(role+':'); const j=(()=>{const m=/\n        enem\d:/g;m.lastIndex=i+5;const x=m.exec(src);return x?x.index:src.indexOf('    }\n};');})();
    const seg=src.slice(i,j); const re=new RegExp("(\{ id: '"+c.id+"'[^\n]*?beats: ')([^']*)(')"); const m=re.exec(seg);
    if(!m){failed.push(role+' '+c.id+': нет в файле');continue;}
    let seg2=seg.slice(0,m.index)+m[1]+newBeats+m[3]+seg.slice(m.index+m[0].length);
    if(!new RegExp("\{ id: '"+c.id+"', tight: false").test(seg2)) seg2=seg2.replace("{ id: '"+c.id+"',","{ id: '"+c.id+"', tight: false,");
    src=src.slice(0,i)+seg2+src.slice(j); done++;
    console.log(`${role} ${c.id}: ф1/ф2/ф3 ${res.sl.join('/')}  ${newBeats}`);
  }
}
if(!dry) fs.writeFileSync(file,src);
console.log('\nперекалибровано:',done,'\nтребуют ручной правки формы:',failed.length);failed.forEach(f=>console.log('  '+f));
