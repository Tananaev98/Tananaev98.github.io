// Сборщик комбо боссов из семейств приёмов. Построение (подбор скоростей/высот под задуманный порядок и ритм),
// с проверкой 9.1 во всех трёх фазах моделью. Готовность уровня решает только scripts/combat-data-inventory.js --check.
const lib = require('./lib.js'); const { FAMILIES, SPEEDS } = require('./fam.js'); const { rng } = require('./rand.js');
const { model } = lib;
const TARGET_Y = 78, K = 2.4;

const spClass = (s) => (s <= 8 ? 'м' : s >= 18 ? 'б' : 'с');
const sdOf = (x) => (x <= 28 ? 'Л' : x >= 72 ? 'П' : 'Ц');
function fpOf(L, role, bts, co) {
    if (bts.length < 3) return null;
    const ctx = lib.ctxFor(L, role); const ab = bts.map(x => ({ boss: role, xPos: x.x, yPos: x.y, customSpeed: x.s })); const idx = ab.map((_, i) => i);
    const ph = [0, 2].map(p => { const an = model.analyze(ctx, role, ab, idx, p, co); const arr = an.arrivals.map(Math.round);
        const ord = idx.slice().sort((a, b) => arr[a] - arr[b] || a - b); const gaps = ord.slice(1).map((k, j) => arr[k] - arr[ord[j]]);
        return `${ord.map(i => i + 1).join('')}|${gaps.map(g => Math.round(g / 150)).join(',')}`; }).join('#');
    return `N|${ab.map(a => sdOf(a.xPos)).join('')}|${ab.map(a => spClass(a.customSpeed)).join('')}|${ph}`;
}
function step(L, role, sd) { const b = L.bosses[role]; return Math.max(L.cfg.minShotDelay, b.delay[0] * b.cadence * L.phases[0].cadence, sd || 0); }

function attempt(L, role, spec, seed, solved, G) {
    const r = rng(seed); const b = L.bosses[role];
    const mult = b.speedMultiplier * L.phases[0].speed; const st = step(L, role, spec.shotDelayMs);
    let beats;
    if (spec.share) { // общий префикс с уже решённым комбо + новый хвост
        const base = solved[spec.share.of]; const k = spec.share.k;
        const pref = base.slice(0, k).map((bt, i) => `=${spec.share.of}#${i}`);
        const arr = base.slice(0, k).map(bt => bt.at);
        const tail = spec.share.tail || 'between';
        if (tail === 'none') beats = { fixed: pref, extra: [] };
        else { const tb = tailBeat(r, base.slice(0, k), tail, mult, st, k); if (!tb) return null; beats = { fixed: pref, extra: [tb] }; }
    } else {
        const fam = FAMILIES[spec.fam]; if (!fam) throw new Error('нет семейства ' + spec.fam);
        const f = fam(r, !!spec.mir, spec.o || {});
        const list = [];
        for (let i = 0; i < f.beats.length; i++) {
            const bt = f.beats[i]; const off = i * st; const travel = bt.at - off;
            const yMax = (s) => (s >= 20 ? 10 : s >= 16 ? 12 : 54); const yMin = bt.low ? 46 : 4;
            const okS = SPEEDS[bt.c].filter(s => { const pps = K * s * mult; const y = TARGET_Y - travel * pps / 1000; return y >= yMin && y <= yMax(s) + 0.4; });
            if (!okS.length) return null;
            list.push({ x: Math.round(bt.x), at: bt.at, s: r.pick(okS), okS, c: bt.c });
        }
        // если в комбо есть медленная атака — нужна хотя бы одна с базовой скоростью ≥12; для базы общего префикса — внутри префикса
        const NK = spec._needFastK || 0; const win = NK ? list.slice(0, NK) : list;
        if ((list.some(e => e.c === 'S') || NK) && list.length > 1 && !win.some(e => e.s >= 12)) {
            const cand = win.filter(e => e.c !== 'S' && e.okS.some(s => s >= 12)); if (!cand.length) return null;
            const e = r.pick(cand); e.s = r.pick(e.okS.filter(s => s >= 12));
        }
        beats = { fixed: [], extra: list, exp: f.exp };
    }
    const str = [...beats.fixed, ...beats.extra.map(e => `${e.x}/${e.s}@${e.at}`)].join(' ');
    const combo = { id: spec.id, beats: str, sig: spec.sig, minPhase: spec.minPhase, shotDelayMs: spec.shotDelayMs, recoveryMs: spec.recoveryMs, label: spec.label, open: spec.open, gaps: spec.gaps };
    let bts; try { bts = lib.solveCombo(L, role, { ...combo, beats: str }, solved, new Set(), new Set()); } catch (e) { return null; }
    // 9.1 в трёх фазах моделью
    const ctx = lib.ctxFor(L, role); const ab = bts.map(x => ({ boss: role, xPos: x.x, yPos: x.y, customSpeed: x.s })); const idx = ab.map((_, i) => i);
    const co = { shotDelayMs: spec.shotDelayMs, shotGapsMs: spec.gaps };
    if (ab.length > 1) for (let ph = 0; ph < 3; ph++) { if (!model.verdict(model.analyze(ctx, role, ab, idx, ph, co)).ok) return null; }
    if (G) { const fp = fpOf(L, role, bts, co); if (fp && (G.fp.has(fp))) return null; }
    const an = model.analyze(ctx, role, ab, idx, 0, co);
    const order = idx.slice().sort((a, c) => an.arrivals[a] - an.arrivals[c]).map(i => i + 1).join('');
    combo.expect = order; combo.arrivals = an.arrivals.map(Math.round);
    return { combo, beats: bts };
}

function tailBeat(r, prefix, kind, mult, st, k) {
    const arrs = prefix.map(b => b.at); const lo = Math.min(...arrs), hi = Math.max(...arrs); const last = prefix[prefix.length - 1];
    const off = k * st; let x, at, c = 'M';
    if (kind === 'between') { x = r.int(24, 30); at = Math.round(lo + (hi - lo) * r.range(0.35, 0.65)); }
    else if (kind === 'after-far') { x = last.x < 50 ? r.int(80, 92) : r.int(8, 20); at = hi + r.int(720, 820); c = 'S'; }
    else if (kind === 'after-same') { x = last.x + (last.x < 50 ? r.int(6, 12) : -r.int(6, 12)); at = hi + r.int(330, 460); c = 'S'; }
    else if (kind === 'before') { x = last.x < 50 ? r.int(78, 90) : r.int(10, 22); at = lo - r.int(180, 300); c = 'F'; }
    else return null;
    const travel = at - off; const yMax = (s) => (s >= 20 ? 10 : s >= 16 ? 12 : 54);
    const okS = SPEEDS[c].filter(s => { const y = TARGET_Y - travel * (K * s * mult) / 1000; return y >= 4 && y <= yMax(s) + 0.4; });
    if (!okS.length) return null;
    return { x, at, s: r.pick(okS) };
}

// собирает все комбо босса; spec.plan — список описаний; элементы с opt:true — необязательные (подбираются до уникальной структуры)
function composeBoss(L, role, plan, seedBase, G) {
    const shareK = {}; plan.forEach(p => { const ks = plan.filter(q => q.share && q.share.of === p.id).map(q => q.share.k); if (ks.length) p._needFastK = Math.max(...ks); });
    const structOf = (combos) => combos.map(cb => 'N' + cb.beats.trim().split(/\s+/).length).sort().join(',');
    const req = plan.filter(p => !p.opt), opt = plan.filter(p => p.opt);
    const fails = {}; let structFails = 0;
    for (let tr = 0; tr < 80; tr++) {
        const rr = rng(seedBase * 31 + tr); const chosen = [...req]; rr.shuffle(opt).slice(0, rr.int(0, 2)).forEach(o => chosen.push(o));
        const order = plan.filter(p => chosen.includes(p));
        const solved = {}; const out = []; const localFp = new Set(); let ok = true;
        for (const spec of order) {
            let res = null;
            for (let t = 0; t < 300 && !res; t++) res = attempt(L, role, spec, seedBase * 1000 + (spec.seed || 0) + tr * 131 + t * 7919, solved, G ? { fp: new Set([...G.fp, ...localFp]) } : null);
            if (!res) { ok = false; fails[spec.id] = (fails[spec.id] || 0) + 1; break; }
            solved[spec.id] = res.beats.map((bt, i) => ({ ...bt, at: res.combo.arrivals[i] })); out.push(res.combo);
            const fp = fpOf(L, role, res.beats, { shotDelayMs: spec.shotDelayMs, shotGapsMs: spec.gaps }); if (fp) localFp.add(fp);
        }
        if (!ok) continue;
        if (G && G.struct[role] && G.struct[role].has(structOf(out))) { structFails++; continue; }
        if (G) { out.forEach((cb, i) => { }); [...localFp].forEach(f => G.fp.add(f)); }
        return out;
    }
    throw new Error(`[${role}] не удалось собрать комбо босса: срывы по комбо ${JSON.stringify(fails)}, занятых структур ${structFails}`);
}
module.exports = { composeBoss };
