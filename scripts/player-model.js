// МОДЕЛЬ ИДЕАЛЬНОГО ИГРОКА (правила, часть А9). Не движок: константы — правила проверки уровня.
// Курсор летит между целями со скоростью cursorSpeed (% ширины поля в секунду; калибровка: 720 мс на перенос через ~80% поля,
// раздел 5.1), начинает двигаться через reactionMs после первого телеграфа комбо, стартует из центра. Атака бьётся с момента
// появления (смещение в комбо + телеграф) и до прилёта. Запас комбо = наибольший из «наименьших запасов» по всем порядкам обхода
// (мс между моментом блока и прилётом). Запас < 0 — комбо физически не отбить целиком; малый запас — трудно.
'use strict';
const PLAYER = { cursorSpeed: 111, reactionMs: 250, startX: 50 };
const { TARGET_HIT_INTERVAL_MS } = require('./combo-model');
// Input damage is polled by gameLoop. Reserve up to one 60Hz frame per repeat
// rather than assuming every cooldown expires exactly on a rendered frame.
const BARRICADE_FRAME_MS = 1000 / 60;
const serviceMs = a => a.barricadeHits ? (a.barricadeHits - 1) * (TARGET_HIT_INTERVAL_MS + BARRICADE_FRAME_MS) : 0;

// attacks — объекты с xPos; arrivals/offsets — прилёты и моменты появления комбо (мс); teleMs — время телеграфа фазы
function comboSlack(attacks, arrivals, offsets, teleMs, blockOrder) {
    const n = attacks.length; if (n === 0) return null;
    const S = attacks.map((a, i) => offsets[i] + teleMs), D = arrivals.map(t => t + teleMs), X = attacks.map(a => a.xPos);
    const t0 = offsets[0] + PLAYER.reactionMs;
    let best = -Infinity;
    const used = new Array(n).fill(false);
    (function dfs(cnt, x, t, minSlack) {
        if (minSlack <= best) return;
        if (cnt === n) { best = minSlack; return; }
        for (let i = 0; i < n; i++) if (!used[i]) {
            if (blockOrder && i !== blockOrder[cnt]) continue;
            const arrive = Math.max(t + Math.abs(X[i] - x) / PLAYER.cursorSpeed * 1000, S[i]) + serviceMs(attacks[i]);
            const slack = D[i] - arrive;
            used[i] = true; dfs(cnt + 1, X[i], arrive, Math.min(minSlack, slack)); used[i] = false;
        }
    })(0, PLAYER.startX, t0, Infinity);
    return Math.round(best);
}
// «Живой игрок» (честность, 2026-09-20). Калибровка по журналу боя (battleLog.js, DataExport/бой): переносы прицела >40 % поля
// делались за 217-667 мс (мышь, 100-300 %/с); проигрыш происходил не от скорости руки, а от выбора цели и от того, что атаки с
// lateRush летят на 30 % быстрее расчёта. Здесь: курсор 110 %/с, реакция 300 мс на первое появление, 100 мс на смену цели,
// отбивает по порядку ПРИЛЁТА; blockOrder задаёт обязательный порядок головы цепи.
// Запас — наименьший (прилёт − момент блока); блок возможен не раньше появления+телеграфа.
// lateral — боковой разброс цели (weave ±amplitude, drift shift): добавляется к каждому переносу. Пересчитывать константы по новым журналам.
const SEQ_MIN_MS = 60;
const SEQ_PLAYER = { cursorSpeed: 110, reactionMs: 300, retargetMs: 100 };
function sequentialTimeline(attacks, arrivals, offsets, teleMs, lateral = 0, blockOrder) {
    const n = attacks.length; if (n === 0) return null;
    // Цепь снимает неуязвимость строго от головы к хвосту, а не по прилётам.
    const order = blockOrder || arrivals.map((_, i) => i).sort((a, b) => arrivals[a] - arrivals[b]);
    let x = PLAYER.startX, t = offsets[0] + SEQ_PLAYER.reactionMs, min = Infinity, first = true;
    const steps = [];
    for (const i of order) {
        // Barricades do not inherit weave/drift. Retaining the source target's
        // uncertainty on departure is conservative when returning from a moving target.
        const slop = first ? 0 : attacks[i].barricadeHits ? (attacks[steps.at(-1).index].barricadeHits ? 0 : lateral) : lateral;
        const travel = (Math.abs(attacks[i].xPos - x) + slop) / SEQ_PLAYER.cursorSpeed * 1000;
        const start = Math.max((first ? t : t + SEQ_PLAYER.retargetMs) + travel, offsets[i] + teleMs);
        const at = start + serviceMs(attacks[i]);
        const slack = arrivals[i] + teleMs - at;
        steps.push({index:i, start, end:at, deadline:arrivals[i]+teleMs, slack});
        min = Math.min(min, slack); x = attacks[i].xPos; t = at; first = false;
    }
    return {slack:Math.round(min), steps};
}
// Conservative, readable strategy: earliest arrival first; finish every barricade
// before retargeting. No omniscient route search and no free intermediate hits.
function sequentialSlack(...args) { return sequentialTimeline(...args)?.slack ?? null; }
// Худший случай по всем вращениям speedVariance (каждая волна босса сдвигает счётчик — конкретный порядок скоростей заранее неизвестен)
function worstSequentialSlack(attacks, rots, teleMs) {
    return Math.min(...rots.map(r => sequentialSlack(attacks, r.arrivals, r.offsets, teleMs, r.lateral, r.blockOrder)));
}
// Типичный запас (медиана по 5 вращениям speedVariance) — то, что игрок реально видит в бою в среднем. Журнал боя ур.25 (2026-09-26, 191 экземпляр комбо):
// худшее вращение занижало реальный запас в 2-3 раза (ф3: реальные 716 мс против 258), а сама модель игрока на реальных данных боя точна
// (прогноз 650 против реальных 716). Поэтому: «возможно» (>= SEQ_MIN_MS) проверяется по худшему вращению, «не слишком легко» — по ТИПИЧНОМУ.
function typicalSequentialSlack(attacks, rots, teleMs) {
    const v = rots.map(r => sequentialSlack(attacks, r.arrivals, r.offsets, teleMs, r.lateral, r.blockOrder)).sort((a, b) => a - b);
    return v[Math.floor(v.length / 2)];
}
module.exports = { BARRICADE_FRAME_MS, serviceMs, sequentialTimeline, PLAYER, comboSlack, sequentialSlack, worstSequentialSlack, typicalSequentialSlack, SEQ_MIN_MS, SEQ_PLAYER };
