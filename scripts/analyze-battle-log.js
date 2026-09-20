// Разбор журнала боя (DataExport/бой/*.txt): сверка модели честности с реальной игрой. Запускать после КАЖДОГО нового боя
// и после любой правки движения/механик: node scripts/analyze-battle-log.js [файл]
// 1) полёт: реальное время жизни долетевших атак против оценки из журнала (обе — по resolveAttackStyleMultiplier из game.js);
//    отношение ≠ 1 (±10 %) = физика игры разошлась с моделью — ТРЕВОГА, править модель/игру до любой калибровки уровней;
// 2) скорость руки: переносы прицела >40 % поля между отбитыми атаками (Δx, мс, %/с) — калибровка SEQ_PLAYER в player-model.js;
// 3) запас при отбитии и пропущенные удары по боссам/атакам.
const fs = require('fs'), path = require('path');
const dir = path.join(__dirname, '..', 'DataExport', 'бой');
let file = process.argv[2];
if (!file) { const fl = fs.readdirSync(dir).filter(f => /^battle-log/.test(f)).map(f => ({ f, t: fs.statSync(path.join(dir, f)).mtimeMs })).sort((a, b) => b.t - a.t); file = fl.length ? path.join(dir, fl[0].f) : null; }
if (!file) { console.log('нет журналов в DataExport/бой'); process.exit(0); }
const L = fs.readFileSync(file, 'utf8').split('\n');
const exp = {}; const ratio = {}; const slack = []; const trans = []; let hits = 0;
for (const l of L) {
    let m = /появилась #(\d+) (\w+) .*стиль (\w+), ожидаемый полёт до героя ≈(\d+) мс/.exec(l); if (m) { exp[m[1]] = { type: m[2], style: m[3], ms: +m[4] }; continue; }
    m = /ДОШЛА до героя \(жила (\d+) мс\)/.exec(l); const id = /#(\d+)/.exec(l);
    if (m && id && exp[id[1]]) { hits++; const e = exp[id[1]]; (ratio[e.style] ||= []).push(+m[1] / e.ms); }
    m = /ОТБИТА\s+#(\d+) .*жила (\d+) мс, до героя оставалось ≈(-?\d+) мс/.exec(l); if (m && exp[m[1]]) { const e = exp[m[1]]; (ratio[e.style + ' (отбитые)'] ||= []).push((+m[2] + +m[3]) / e.ms); slack.push(+m[3]); }
    m = /Δx=(\d+)% за (\d+) мс/.exec(l); if (m && +m[1] >= 40 && +m[2] > 0) trans.push({ dx: +m[1], ms: +m[2] });
}
const med = a => a.slice().sort((x, y) => x - y)[Math.floor(a.length / 2)];
console.log('Журнал:', path.basename(file)); console.log('Долетело до героя:', hits);
console.log('\n1) РЕАЛЬНЫЙ полёт / оценка (норма 0.9-1.1):');
for (const [k, v] of Object.entries(ratio)) { const r = med(v); console.log(`   ${k.padEnd(24)} n=${String(v.length).padStart(3)} медиана ${r.toFixed(2)} ${r < 0.9 || r > 1.1 ? '  <<< РАСХОЖДЕНИЕ' : ''}`); }
if (trans.length) { const sp = trans.map(t => t.dx / t.ms * 1000); console.log(`\n2) Переносы прицела >=40%: ${trans.length}; скорость %/с мин ${Math.min(...sp).toFixed(0)}, медиана ${med(sp).toFixed(0)}, макс ${Math.max(...sp).toFixed(0)} (модель: SEQ_PLAYER.cursorSpeed=110 + 100 мс на смену цели)`); }
if (slack.length) console.log(`\n3) Запас при отбитии (мс): мин ${Math.min(...slack)}, медиана ${med(slack)}, n=${slack.length}`);
