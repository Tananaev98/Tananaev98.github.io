// Аудит давления по времени (раздел 9.1) для КАЖДОГО комбо уровня на реальной
// модели расписания движка (scripts/combo-model.js). Фазы 1-3.
//   node scripts/combo-audit.js 71 [72 73 ...]   (код возврата 1 при нарушениях)
const { loadLevel, analyze, verdict } = require('./combo-model');
let bad = 0;
for (const n of process.argv.slice(2).map(Number)) {
    const lv = loadLevel(n);
    const byBoss = {};
    for (const a of lv.bossAbilities) (byBoss[a.boss] ||= []).push(a);
    let count = 0; const issues = [];
    for (const d of lv.bossAbilitiesDop) {
        if (d.barricade || d.isChain || d.indexAbilities.length < 2) continue;
        count++;
        for (let ph = 0; ph < 3; ph++) {
            const r = analyze(lv, d.boss, byBoss[d.boss], d.indexAbilities, ph, d);
            const v = verdict(r);
            if (!v.ok) issues.push(`${d.boss} [${d.indexAbilities}] фаза${ph + 1}: ${v.why} (скорости ${r.speeds})`);
        }
    }
    console.log(`=== Уровень ${n}: ${count} комбо, проблем ${issues.length}`);
    issues.forEach((i) => console.log('  ! ' + i));
    bad += issues.length;
}
process.exit(bad ? 1 : 0);
