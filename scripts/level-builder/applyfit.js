// Применяет вывод fitmany (строки «enemK:x ф1/ф2/ф3  биты  [GAPS[..]]») к designN.js: биты и shotGapsMs (gaps) комбо.
// node scripts/level-builder/applyfit.js N файл_вывода
const fs=require('fs'),path=require('path');const n=+process.argv[2];const lines=fs.readFileSync(process.argv[3],'utf8').split('\n');
const file=path.join(__dirname,'design'+n+'.js');let src=fs.readFileSync(file,'utf8');let cnt=0;
for(const l of lines){const m=/^(enem\d):([a-p])\s+\S+\s+(.+?)(?:\s+GAPS\[([\d,]*)\])?\s*$/.exec(l); if(!m||/НЕТ/.test(l))continue;
  const [,role,id,beats,gaps]=m; const i=src.indexOf('        '+role+':'); const nx=src.indexOf('\n        enem',i+10); const j=nx<0?src.indexOf('    }\n};'):nx;
  let seg=src.slice(i,j); const re=new RegExp("(\{ id: '"+id+"'[^\n]*?)(?:gaps: \[[^\]]*\], )?beats: '[^']*'"); const mm=re.exec(seg); if(!mm){console.log('нет',role,id);continue;}
  let head=mm[1].replace(/gaps: \[[^\]]*\], ?/,''); const g=gaps?`gaps: [${gaps}], `:'';
  seg=seg.slice(0,mm.index)+head+g+"beats: '"+beats.replace(/\s+GAPS.*$/,'')+"'"+seg.slice(mm.index+mm[0].length);
  if(!new RegExp("\{ id: '"+id+"', tight: false").test(seg)) seg=seg.replace("{ id: '"+id+"',","{ id: '"+id+"', tight: false,");
  src=src.slice(0,i)+seg+src.slice(j);cnt++;}
fs.writeFileSync(file,src);console.log('применено',cnt);
