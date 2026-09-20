// МОДЕЛЬ ИДЕАЛЬНОГО ИГРОКА (правила, часть А9). Не движок: константы — правила проверки уровня.
// Курсор летит между целями со скоростью cursorSpeed (% ширины поля в секунду; калибровка: 720 мс на перенос через ~80% поля,
// раздел 5.1), начинает двигаться через reactionMs после первого телеграфа комбо, стартует из центра. Атака бьётся с момента
// появления (смещение в комбо + телеграф) и до прилёта. Запас комбо = наибольший из «наименьших запасов» по всем порядкам обхода
// (мс между моментом блока и прилётом). Запас < 0 — комбо физически не отбить целиком; малый запас — трудно.
'use strict';
const PLAYER = { cursorSpeed: 111, reactionMs: 250, startX: 50 };

// attacks — объекты с xPos; arrivals/offsets — прилёты и моменты появления комбо (мс); teleMs — время телеграфа фазы
function comboSlack(attacks, arrivals, offsets, teleMs) {
    const n = attacks.length; if (n === 0) return null;
    const S = attacks.map((a, i) => offsets[i] + teleMs), D = arrivals.map(t => t + teleMs), X = attacks.map(a => a.xPos);
    const t0 = offsets[0] + PLAYER.reactionMs;
    let best = -Infinity;
    const used = new Array(n).fill(false);
    (function dfs(cnt, x, t, minSlack) {
        if (minSlack <= best) return;
        if (cnt === n) { best = minSlack; return; }
        for (let i = 0; i < n; i++) if (!used[i]) {
            const arrive = Math.max(t + Math.abs(X[i] - x) / PLAYER.cursorSpeed * 1000, S[i]);
            const slack = D[i] - arrive;
            used[i] = true; dfs(cnt + 1, X[i], arrive, Math.min(minSlack, slack)); used[i] = false;
        }
    })(0, PLAYER.startX, t0, Infinity);
    return Math.round(best);
}
// «Живой игрок» (честность, 2026-09-20). Калибровка по журналу боя (battleLog.js, DataExport/бой): переносы прицела >40 % поля
// делались за 217-667 мс (мышь, 100-300 %/с); проигрыш происходил не от скорости руки, а от выбора цели и от того, что атаки с
// lateRush летят на 30 % быстрее расчёта. Здесь: курсор 110 %/с, реакция 300 мс на первое появление, 100 мс на смену цели,
// отбивает по порядку ПРИЛЁТА (правильная игра). Запас — наименьший (прилёт − момент блока); блок возможен не раньше появления+телеграфа.
// lateral — боковой разброс цели (weave ±amplitude, drift shift): добавляется к каждому переносу. Пересчитывать константы по новым журналам.
const SEQ_MIN_MS = 60;
const SEQ_PLAYER = { cursorSpeed: 110, reactionMs: 300, retargetMs: 100 };
function sequentialSlack(attacks, arrivals, offsets, teleMs, lateral = 0) {
    const n = attacks.length; if (n === 0) return null;
    const order = arrivals.map((_, i) => i).sort((a, b) => arrivals[a] - arrivals[b]);
    let x = PLAYER.startX, t = offsets[0] + SEQ_PLAYER.reactionMs, min = Infinity, first = true;
    for (const i of order) {
        const travel = (Math.abs(attacks[i].xPos - x) + (first ? 0 : lateral)) / SEQ_PLAYER.cursorSpeed * 1000;
        const at = Math.max((first ? t : t + SEQ_PLAYER.retargetMs) + travel, offsets[i] + teleMs);
        min = Math.min(min, arrivals[i] + teleMs - at); x = attacks[i].xPos; t = at; first = false;
    }
    return Math.round(min);
}
// Худший случай по всем вращениям speedVariance (каждая волна босса сдвигает счётчик — конкретный порядок скоростей заранее неизвестен)
function worstSequentialSlack(attacks, rots, teleMs) {
    return Math.min(...rots.map(r => sequentialSlack(attacks, r.arrivals, r.offsets, teleMs, r.lateral)));
}
module.exports = { PLAYER, comboSlack, sequentialSlack, worstSequentialSlack, SEQ_MIN_MS, SEQ_PLAYER };
