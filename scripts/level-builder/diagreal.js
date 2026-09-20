// ДИАГНОСТИКА (не проверка готовности): реальный движок game.js через harness — насколько устойчив порядок прилёта комбо
// при разбросе скоростей (speedVariance, индекс зависит от номера волны) и реальном стиле движения (pause/lateRush/accelerate/drift/weave).
const REPO = 'F:/3 Курсы/0 Веб Разработчик/12 Проекты для портфолио/3 Игра без названия/игра №2';
const { loadRuntime } = require(REPO + '/scripts/combat-runtime-harness.js');
const from = Number(process.argv[2] || 1), to = Number(process.argv[3] || 10);
let totalCombos = 0, unstable = 0, flipRows = [], sigTotal = 0, sigUnstable = 0;
for (let n = from; n <= to; n++) {
    const r = loadRuntime(n); const a = r.api; r.window.Math.random = () => 0.5;
    for (let role = 1; role <= 5; role++) {
        const boss = 'enem' + role; const ab = a.abilities.filter(x => x.boss === boss); const cs = a.combos.filter(x => x.boss === boss);
        const profile = a.config.bosses[boss];
        cs.forEach((c, ci) => {
            if (c.indexAbilities.length < 3) return;
            totalCombos++; if (c.signature) sigTotal++;
            const orders = new Set(); let worst = 0;
            for (let ph = 0; ph < 3; ph++) {
                const phase = a.config.phases[ph];
                const bossDelay = a.delays.find(d => d.boss === boss).bossDelayAb;
                const shotDelay = Math.max(a.config.minShotDelay, bossDelay * profile.cadence * phase.cadence, Number(c.shotDelayMs) || 0);
                const offsets = a.schedule(c.indexAbilities, ab, shotDelay, phase, profile, c.shotGapsMs || []);
                const phaseOrders = new Set();
                for (let wc = 0; wc < 5; wc++) {
                    const arr = c.indexAbilities.map((idx, k) => {
                        const att = ab[idx]; const variation = profile.speedVariance[(wc + k) % profile.speedVariance.length];
                        const speed = Math.max(2, Math.round(Math.min(att.customSpeed * profile.speedMultiplier * phase.speed * variation, 99) * 10) / 10);
                        return offsets[k] + r.flight(att, speed, profile.movementStyle);
                    });
                    phaseOrders.add(arr.map((t, i) => [t, i]).sort((x, y) => x[0] - y[0]).map(x => x[1] + 1).join(''));
                }
                phaseOrders.forEach(o => orders.add(o + '@' + (ph + 1)));
                worst = Math.max(worst, phaseOrders.size);
            }
            if (worst > 1) { unstable++; if (c.signature) sigUnstable++; flipRows.push(`${n}/${boss} комбо ${ci}${c.signature ? ' (сигн)' : ''} [${c.label || ''}]: порядки ${[...orders].join(' ')}`); }
        });
    }
    r.close();
}
console.log(`комбо ≥3 атак: ${totalCombos}; с нестабильным порядком прилёта: ${unstable}; сигнатурных ≥3 атак: ${sigTotal}, из них нестабильных: ${sigUnstable}`);
flipRows.slice(0, 0).forEach(x => console.log('  ' + x));
