// Короткая запись плана боссa: main — семейство главного приёма; fill — фоновые комбо; опции подбираются под уникальную структуру.
const OPTS = [['TAIL_FAR', 'Довесок с другой стороны'], ['ECHO', 'Повтор'], ['STAIR', 'Ступени'], ['PAIRS_2x2', 'Две пары'], ['PAIR', 'Ещё пара'], ['RITARD', 'Замедление'], ['FUNNEL', 'Воронка']];
function plan(o) {
    const P = [];
    P.push({ id: 'a', fam: 'PAIR', label: o.labels.a });
    P.push({ id: 'b', fam: o.b, label: o.labels.b });
    P.push({ id: 'c', fam: o.main, o: o.mainO, sig: true, minPhase: 1, shotDelayMs: o.sd, recoveryMs: o.rec, label: o.labels.c });
    P.push({ id: 'd', fam: o.d, label: o.labels.d });
    P.push({ id: 'e', share: o.share, sig: true, minPhase: 2, shotDelayMs: o.sd, recoveryMs: o.rec, label: o.labels.e });
    P.push({ id: 'f', fam: o.main, o: o.mainO, mir: true, minPhase: 3, label: o.labels.f });
    P.push({ id: 'g', fam: 'SINGLE', label: o.labels.g });
    OPTS.filter(x => x[0] !== o.main).forEach((x, i) => P.push({ id: 'x' + i, fam: x[0], opt: true, minPhase: (i % 3) + 1, label: x[1] }));
    return P;
}
module.exports = { plan };
