// whyfail.js N spec.json role:id — для каждого варианта формы: удалось ли подобрать времена и почему нет (WHY из fitlib). Диагностика роли с «НЕТ».
const fs=require('fs');const F=require('./fitlib.js');const n=+process.argv[2];const L=require('./design'+n+'.js');const spec=JSON.parse(fs.readFileSync(process.argv[3],'utf8'));
const [role,id]=process.argv[4].split(':');const alts=spec[role+':'+id];const cnt={};
for(const a of alts){const [shape,T,mode,x1,,,fo]=a;if(fo)process.env.FITOPTS=fo;let r=null;try{r=F.fitGaps(L,role,shape,T,x1);}catch(e){}console.log(r?'OK ':'-- '+F.why(),'|',shape,r?r.typ.join('/'):'');}
