// mk.js роль план.txt выход.json — из плана строит spec для author.js.
// Формат v1: «id|форма|T[|паузы]» (по строке; повтор id = альтернативы).
// Формат v2 (пул): «@id ф1/ф2/ф3» — цель типичного запаса для комбо; остальные строки — формы автора «форма[|паузы]»; каждое комбо получает ВЕСЬ пул
// как альтернативы (author.js с BESTOF=1 берёт лучшую по попаданию в цель и не использует одну форму дважды в роли).
const fs=require('fs');const [role,list,out]=process.argv.slice(2);const spec={};
const lines=fs.readFileSync(list,'utf8').split('\n').map(s=>s.trim()).filter(s=>s&&!s.startsWith('#'));
if(lines.some(l=>l.startsWith('@'))){
  const tg=lines.filter(l=>l.startsWith('@')).map(l=>{const [a,b]=l.slice(1).split(/\s+/);return [a,b];});
  const pool=lines.filter(l=>!l.startsWith('@')).map(l=>{const [f,o]=l.split('|');return [f.trim(),o||null];});
  for(const [id,T] of tg) spec[role+':'+id]=pool.map(([f,o])=>[f,T,'G',null,null,null,o]);
} else {
  for(const l of lines){const [id,shape,T,opts]=l.split('|');(spec[role+':'+id]||=[]).push([shape.trim(),T.includes('/')?T.trim():+T,'G',null,null,null,opts||null]);}
}
fs.writeFileSync(out,JSON.stringify(spec));
