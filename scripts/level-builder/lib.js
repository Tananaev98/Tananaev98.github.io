// Конструктор боевых данных уровня по авторскому дизайну. Это ПОСТРОЕНИЕ (подбор yPos под желаемый прилёт),
// не проверка: честность и уникальность проверяются только scripts/combat-data-inventory.js --check=N.
const fs = require('fs'); const path = require('path'); const vm = require('vm'); const cp = require('child_process');
const REPO = 'F:/3 Курсы/0 Веб Разработчик/12 Проекты для портфолио/3 Игра без названия/игра №2';
const model = require(REPO + '/scripts/combo-model.js');
const TARGET_Y = 78, BASE = 120, EB = 0.020;
const ROLES = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];
const sideOf = (x) => (x <= 28 ? 'L' : x >= 72 ? 'R' : 'C');

function yRuleOk(s, y) { // раздел 5 правил: быстрые стартуют высоко; медленные могут стартовать низко
    if (y < 4 || y > 54) return false;
    if (s >= 20) return y <= 10;
    if (s >= 16) return y <= 12;
    return true;
}

function loadOld(n) {
    const src = fs.readFileSync(path.join(REPO, 'lvlData', `gameData${n}.js`), 'utf8');
    const sb = {};
    new vm.Script(src + '\nthis.c = bossCombatConfig; this.d = mBossDelayAb; this.t = ENEMY_TYPES;').runInContext(vm.createContext(sb));
    sb.c.__delays = sb.d; sb.c.__types = sb.t; return sb.c;
}

// синтетический уровень для модели времени
const oldCache = {};
function ctxFor(L, role) {
    const b = L.bosses[role];
    const old = oldCache[L.n] || (oldCache[L.n] = loadOld(L.n)); // типы атак и стили движения берутся из данных уровня, не из констант конструктора
    return {
        ENEMY_TYPES: old.__types,
        bossCombatConfig: {
            minShotDelay: L.cfg.minShotDelay,
            movementStyles: old.movementStyles,
            phases: L.phases.map(p => ({ cadence: p.cadence, speed: p.speed, telegraphMultiplier: p.telegraphMultiplier })),
            bosses: { [role]: { movementStyle: b.style, speedMultiplier: b.speedMultiplier, cadence: b.cadence, speedVariance: b.speedVariance || old.speedVariance /* как в записи lib: b.speedVariance || o.speedVariance */ || old.bosses[role].speedVariance, minFastSideSwitchMs: b.minFastSideSwitchMs } }
        },
        mBossDelayAb: [{ boss: role, bossDelayAb: b.delay[0] }]
    };
}

// beats: [{x, at, s, w}] либо {same:[comboId, k]} — копия уже решённой атаки. at — прилёт в фазе 1, мс от начала комбо.
function parseBeats(str) {
    return str.trim().split(/\s+/).map(t => {
        if (t.startsWith('=')) { const m = /^=([\w]+)#(\d+)$/.exec(t); return { same: [m[1], Number(m[2])] }; }
        const m = /^(\d+)\/(\d+)@(\d+)(?:~([\d.]+),([\d.]+)(?:,([\d.]+))?)?$/.exec(t);
        if (!m) throw new Error('плохой бит ' + t);
        return [Number(m[1]), Number(m[3]), Number(m[2]), m[4] ? [Number(m[4]), Number(m[5]), ...(m[6] ? [Number(m[6])] : [])] : null];
    });
}
function solveCombo(L, role, combo, solved, avoid, used) {
    if (typeof combo.beats === 'string') combo.beats = parseBeats(combo.beats);
    const ctx = ctxFor(L, role);
    const b = L.bosses[role]; const phase = L.phases[0];
    const mult = b.speedMultiplier * phase.speed;
    const beats = combo.beats.map(bt => {
        if (bt.same) { const src = solved[bt.same[0]][bt.same[1]]; return { ...src, fixed: true }; }
        const [x, at, s, w] = bt; return { x, at, s, w: w || null };
    });
    beats.forEach((bt, i) => { if (bt.x >= 32 && bt.x <= 68 && bt.y !== undefined) return; });
    const comboObj = { shotDelayMs: combo.shotDelayMs, shotGapsMs: combo.gaps };
    const ab = beats.map(bt => ({ boss: role, xPos: bt.x, yPos: bt.y !== undefined ? bt.y : 15, customSpeed: bt.s }));
    const idx = beats.map((_, i) => i);
    for (let it = 0; it < 8; it++) {
        const an = model.analyze(ctx, role, ab, idx, 0, comboObj);
        beats.forEach((bt, i) => {
            if (bt.fixed) return;
            // y такой, чтобы прилёт (по РЕАЛЬНОЙ функции движения из game.js — стиль, старт от START_Y) совпал с желаемым: бисекция
            const pps = ctx.ENEMY_TYPES[role + role.slice(-1)].baseSpeed * bt.s * mult * model.BASE_SPEED_GAME;
            const want = bt.at - an.offsets[i]; let lo = 4, hi = 76;
            for (let k = 0; k < 40; k++) { const mid = (lo + hi) / 2; if (model.flightMs(mid, pps, b.style, ctx.bossCombatConfig.movementStyles) > want) lo = mid; else hi = mid; }
            let y = Math.round((lo + hi) / 2);
            const yMax = bt.s >= 20 ? 10 : bt.s >= 16 ? 12 : 54;
            y = Math.max(4, Math.min(yMax, y));
            ab[i].yPos = y; bt.y = y;
        });
    }
    // ошибка построения и допустимость высоты
    const an = model.analyze(ctx, role, ab, idx, 0, comboObj);
    const problems = [];
    beats.forEach((bt, i) => {
        if (!bt.fixed && bt.x >= 32 && bt.x <= 68 && bt.y >= 6 && bt.y <= 44) problems.push(`${combo.id}#${i}: атака x=${bt.x}, y=${bt.y} попадает в тело босса (правило зон спавна)`);
        if (!yRuleOk(bt.s, bt.y)) problems.push(`${combo.id}#${i}: скорость ${bt.s} при y=${bt.y} вне разрешённого (желаемый прилёт ${bt.at}мс)`);
        if (!combo.tolerant && !bt.fixed && Math.abs(an.arrivals[i] - bt.at) > 160) problems.push(`${combo.id}#${i}: скорость ${bt.s} даёт прилёт ${Math.round(an.arrivals[i])}мс вместо желаемых ${bt.at}мс (достижимо только около этого значения)`);
    });
    if (combo.expect) {
        const order = idx.slice().sort((a, b) => an.arrivals[a] - an.arrivals[b]).map(i => i + 1).join('');
        if (order !== combo.expect) problems.push(`${combo.id}: порядок прилёта ${order}, задумано ${combo.expect} (прилёты ${an.arrivals.map(Math.round)})`);
    }
    if (problems.length) throw new Error(`[${role}] ` + problems.join('; '));
    // уникальная геометрия: сдвиг x на ±1..4, сторона не меняется
    beats.forEach((bt, i) => {
        if (bt.fixed) return;
        const key = (x) => `${x}/${bt.y}/${bt.s}/${bt.w ? bt.w[0] : '-'}/${bt.w ? bt.w[1] : '-'}`;
        const taken = (x) => avoid.has(key(x)) || used.has(key(x));
        if (taken(bt.x)) for (const d of [1, -1, 2, -2, 3, -3, 4, -4, 5, -5, 6, -6, 7, -7, 8, -8, 9, -9, 10, -10, 11, -11, 12, -12]) { const nx = bt.x + d; if (nx >= 4 && nx <= 96 && sideOf(nx) === sideOf(bt.x) && !taken(nx)) { bt.x = nx; break; } }
        used.add(key(bt.x));
    });
    return beats;
}


// ---------- подгонка «тугости»: сжатие времени полёта средних/быстрых атак комбо до целевого запаса времени игрока (А9)
// L.tight = { p1: целевой запас фазы 1 (мс), floor: минимально допустимый запас фазы 3 (мс) }; combo.tight === false — не подгонять.
const { comboSlack, worstSequentialSlack, SEQ_MIN_MS, SEQ_PLAYER } = require(REPO + '/scripts/player-model.js');
function scaleBeats(L, role, combo, lam, shift) {
    shift = shift || 0;
    const b = L.bosses[role]; const mult = b.speedMultiplier * L.phases[0].speed;
    const step = Math.max(L.cfg.minShotDelay, b.delay[0] * b.cadence * L.phases[0].cadence, combo.shotDelayMs || 0);
    return combo.beats.map((bt, i) => {
        if (bt.same) return bt;
        const off = i * step; const minFlight = 24000 / (2.4 * bt[2] * mult) + 30;
        const at = Math.round(off + lam * (bt[1] - off)) - shift;
        return [bt[0], Math.max(at, Math.round(off + minFlight)), bt[2], bt[3]];
    });
}
// допустимо ли комбо: раздел 9.1 во всех фазах и запас последней фазы не ниже пола; возвращает запасы фаз или null
function feasibleSlack(L, role, combo, bts, margin) {
    const b = L.bosses[role]; const ctx = ctxFor(L, role); const co = { shotDelayMs: combo.shotDelayMs, shotGapsMs: combo.gaps };
    const ab = bts.map(x => ({ boss: role, xPos: x.x, yPos: x.y, customSpeed: x.s })); const idx = ab.map((_, i) => i); const sl = [];
    for (let ph = 0; ph < 3; ph++) {
        const an = model.analyze(ctx, role, ab, idx, ph, co);
        if (ab.length > 1 && !model.verdict(an).ok) return null;
        const tele = Math.max(L.cfg.minTelegraphMs, b.telegraphMs * L.phases[ph].telegraphMultiplier);
        if (ab.length > 1 && worstSequentialSlack(ab, model.analyzeAllRot(ctx, role, ab, idx, ph, co).map(q => ({ arrivals: q.arrivals.map(Math.round), offsets: q.offsets, lateral: q.lateral })), tele) < SEQ_MIN_MS + 12) return null;
        sl.push(comboSlack(ab, an.arrivals.map(Math.round), an.offsets, tele));
        // А7.4: медленная атака (≤8) — только с прикрытием: в ±700 мс другая атака на другой полосе
        ab.forEach((a1, i) => { if (a1.customSpeed <= 8 && !ab.some((a2, j) => j !== i && Math.abs(a2.xPos - a1.xPos) >= 15 && Math.abs(an.arrivals[i] - an.arrivals[j]) <= 700)) sl.bad = true; });
    }
    return (sl.bad || sl[2] < L.tight.floor + (margin || 0)) ? null : sl;
}

// Честность для живого человека (2026-09-20): дизайн задаёт стороны/скорости/намерение, а конструктор переставляет ВРЕМЕНА прилёта так,
// чтобы игрок, отбивающий атаки по порядку прилёта, успевал (запас >= SEQ_MIN_MS) и разнесённые атаки не прилетали почти вместе
// (CROSS_MIN_GAP_MS) — во всех фазах. Если сдвигом не выходит (разброс 9.1), бит переносится ближе к предыдущей цели.
function fairnessRetime(L, role, combo, solved) {
    if (combo.beats.length < 2) return;
    const b = L.bosses[role]; const ctx = ctxFor(L, role); const co = { shotDelayMs: combo.shotDelayMs, shotGapsMs: combo.gaps };
    combo.beats = combo.beats.map(x => (x.same ? x : x.slice()));
    for (let it = 0; it < 120; it++) {
        let bts; try { bts = solveCombo(L, role, { ...combo, beats: combo.beats }, solved, new Set(), new Set()); } catch (e) { return; }
        const ab = bts.map(x => ({ boss: role, xPos: x.x, yPos: x.y, customSpeed: x.s })); const idx = ab.map((_, i) => i);
        let fix = null;
        for (let ph = 2; ph >= 0 && !fix; ph--) {
            const an = model.analyze(ctx, role, ab, idx, ph, co);
            const tele = Math.max(L.cfg.minTelegraphMs, b.telegraphMs * L.phases[ph].telegraphMultiplier);
            const order = idx.slice().sort((a1, a2) => an.arrivals[a1] - an.arrivals[a2]);
            let x = 50, t = an.offsets[0] + SEQ_PLAYER.reactionMs;
            for (let k = 0; k < order.length && !fix; k++) {
                const i = order[k];
                const at = Math.max(t + Math.abs(ab[i].xPos - x) / SEQ_PLAYER.cursorSpeed * 1000, an.offsets[i] + tele);
                const sl = an.arrivals[i] + tele - at;
                let need = 0;
                if (sl < SEQ_MIN_MS + 45) need = SEQ_MIN_MS + 45 - sl;
                if (k > 0) { const pj = order[k - 1]; const g = an.arrivals[i] - an.arrivals[pj]; if (Math.abs(ab[i].xPos - ab[pj].xPos) >= model.CROSS_MIN_DX && g < model.CROSS_MIN_GAP_MS) need = Math.max(need, model.CROSS_MIN_GAP_MS - g); }
                if (need > 0) fix = { i, need: need * 1.25 + 10, prev: k > 0 ? order[k - 1] : null };
                x = ab[i].xPos; t = at;
            }
        }
        if (!fix) return;
        const cb = combo.beats[fix.i];
        if (cb.same) return; // копия чужого бита — правится в базовом комбо
        const arrCur = cb[1]; const shiftFrom = cb[1];
        const trial = combo.beats.map(x => (x.same ? x : x.slice()));
        trial.forEach(x => { if (!x.same && x[1] >= shiftFrom) x[1] += Math.ceil(fix.need); });
        let ok = true; try {
            const t2 = solveCombo(L, role, { ...combo, beats: trial }, solved, new Set(), new Set());
            const ab2 = t2.map(x => ({ boss: role, xPos: x.x, yPos: x.y, customSpeed: x.s }));
            for (let ph = 0; ph < 3; ph++) { const an2 = model.analyze(ctx, role, ab2, idx, ph, co); if (!model.verdict(an2).ok) ok = false; }
        } catch (e) { ok = false; }
        if (ok) { combo.beats = trial; continue; }
        // сдвиг не помещается в разброс — перенос бита к предыдущей цели (та же полоса)
        if (fix.prev === null) return;
        const px = ab[fix.prev].xPos; const off = 8 + ((it * 5) % 7);
        let nx = px < 50 ? (px - off >= 4 ? px - off : px + off) : (px + off <= 96 ? px + off : px - off);
        nx = px < 50 ? Math.max(4, Math.min(28, nx)) : Math.max(72, Math.min(96, nx));
        if (nx === cb[0]) return; cb[0] = nx;
    }
}

// Сжатие в рамках честности: пока честность (feasibleSlack) держится, поочерёдно двигаем прилёт каждого бита и берём ход, снижающий запас
// последней фазы (идеальный игрок) к цели T3. Это ищет комбо, где ЛЮБОЙ порядок обхода тесен — а не только порядок прилёта.
function descendTight(L, role, combo, solved, T3, deps) {
    const evalC = (beats) => { let bts; try { bts = solveCombo(L, role, { ...combo, beats }, solved, new Set(), new Set()); } catch (e) { return null; }
        const sl = feasibleSlack(L, role, combo, bts); if (!sl) return null;
        for (const d of deps || []) { const tmp = { ...solved, [combo.id]: Object.assign(bts.slice(), { lam: 1, shift: 0 }) }; let db; try { db = solveCombo(L, role, { ...d, beats: d.beats }, tmp, new Set(), new Set()); } catch (e) { return null; } if (!feasibleSlack(L, role, d, db, 110)) return null; }
        return sl; };
    let cur = combo.beats.map(x => (x.same ? x : x.slice())); let sl = evalC(cur); if (process.env.DBGD) console.error('descend', role, combo.id, sl ? sl.join('/') : 'ИСХОД НЕДОПУСТИМ', 'цель', T3); if (!sl) return;
    // детерминированный ГСЧ от роли/комбо — результат воспроизводим
    let h = 2166136261; for (const ch of role + combo.id + L.n + '#' + (process.env.SEEDS ? (JSON.parse(process.env.SEEDS)[role] || 0) : (L.bosses[role].fairSeed || 0))) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0;
    const rnd = () => { h = (Math.imul(h, 1664525) + 1013904223) >>> 0; return h / 4294967296; };
    const allowedX = []; for (let x = 4; x <= 28; x++) allowedX.push(x); [29, 30, 31, 69, 70, 71].forEach(x => allowedX.push(x)); for (let x = 72; x <= 96; x++) allowedX.push(x);
    let bestS = sl, bestB = cur.map(x => (x.same ? x : x.slice()));
    const mov = cur.map((x, k) => (x.same ? -1 : k)).filter(k => k >= 0);
    for (let ev = 0; ev < 4000 && bestS[2] > T3 && mov.length; ev++) {
        const k = mov[Math.floor(rnd() * mov.length)]; const tr = cur.map(x => (x.same ? x : x.slice())); const r = rnd();
        if (r < 0.3) tr[k][0] = allowedX[Math.floor(rnd() * allowedX.length)];
        else if (r < 0.55) { const nx = tr[k][0] + Math.round((rnd() - 0.5) * 24); if (!allowedX.includes(nx)) continue; tr[k][0] = nx; }
        else tr[k][1] = Math.max(700, tr[k][1] + Math.round((rnd() - 0.5) * 400 / 20) * 20);
        const s2 = evalC(tr); const Tm = 50 * (1 - ev / 4000);
        if (s2 && (s2[2] < sl[2] || rnd() < Math.exp(-(s2[2] - sl[2]) / Math.max(1, Tm)))) { cur = tr; sl = s2; if (!bestS || sl[2] < bestS[2]) { bestS = sl; bestB = cur.map(x => (x.same ? x : x.slice())); } }
    }
    if (bestB && bestS[2] < (evalC(combo.beats) || [0, 0, 1e9])[2]) { cur = bestB; sl = bestS; } else if (bestB) { cur = bestB; sl = bestS; }
    if (process.env.DBGD) console.error('  →', sl.join('/'));
    combo.beats = cur;
}
function tuneAndSolve(L, role, combo, solved, avoid, used) {
    if (typeof combo.beats === 'string') combo.beats = parseBeats(combo.beats);
    // (автоподгонка времён fairnessRetime/descendTight отключена 2026-09-20: честные комбо проектируются вручную, см. sim.js)

    const t = L.bosses[role].tight || L.tight;
    if (!t || combo.tight === false || combo.beats.length < 2) return solveCombo(L, role, combo, solved, avoid, used);
    // комбо с общим префиксом берёт масштаб полёта у базового комбо
    const ref = combo.beats.find(x => x.same);
    const refS = ref ? solved[ref.same[0]] : null;
    const shifts = [0, 50, 100, 150, 200, 300, 400, 500, 600, 800];
    const lamList = ref ? [{ lam: refS.lam === undefined ? 1 : refS.lam, shift: refS.shift || 0 }]
        : [].concat(...Array.from({ length: 34 }, (_, k) => Number((1 - 0.02 * k).toFixed(2))).map(l => shifts.map(sh => ({ lam: l, shift: sh }))));
    // зависимые комбо этого босса (берут наш префикс) — должны оставаться допустимыми при том же масштабе
    const deps = L.bosses[role].combos.filter(c2 => { if (typeof c2.beats === 'string') c2.beats = parseBeats(c2.beats); return c2 !== combo && c2.beats.some(x => x.same && x.same[0] === combo.id); });
    const cands = [];
    for (const { lam, shift } of lamList) {
        const scaled = scaleBeats(L, role, combo, lam, shift);
        let bts; try { bts = solveCombo(L, role, { ...combo, beats: scaled }, solved, new Set(), new Set()); } catch (e) { continue; }
        const sl = feasibleSlack(L, role, combo, bts); if (!sl) continue;
        let depsOk = true;
        for (const d of deps) {
            const tmp = { ...solved, [combo.id]: Object.assign(bts.slice(), { lam, shift }) };
            let db; try { db = solveCombo(L, role, { ...d, beats: scaleBeats(L, role, d, lam, shift) }, tmp, new Set(), new Set()); } catch (e) { depsOk = false; break; }
            if (!feasibleSlack(L, role, d, db, 110)) { depsOk = false; break; }
        }
        if (!depsOk) continue;
        cands.push({ lam, shift, scaled, s1: sl[0], s3: sl[2] });
    }
    if (!cands.length) { const r0 = solveCombo(L, role, combo, solved, avoid, used); r0.lam = 1; r0.shift = 0; return r0; }
    const T3 = (t.floor || 120) + 110; // честность (живой игрок) уже отфильтрована в feasibleSlack — из допустимых берём самый тугой
    cands.sort((x, y) => Math.abs(x.s3 - T3) - Math.abs(y.s3 - T3) || Math.abs(x.s1 - t.p1) - Math.abs(y.s1 - t.p1));
    if (false) { const dps2 = deps; let lamR = 1, shR = 1;
      if (!combo.beats.some(x => x.same)) { const before = JSON.stringify(combo.beats);
        descendTight(L, role, combo, solved, (L.bosses[role].combos.indexOf(combo) % 2 === 0) ? 200 : 480, dps2);
        if (false) { const res2 = solveCombo(L, role, combo, solved, avoid, used); res2.lam = 1; res2.shift = 0; return res2; } } }
    const res = solveCombo(L, role, { ...combo, beats: cands[0].scaled }, solved, avoid, used); res.lam = cands[0].lam; res.shift = cands[0].shift; return res;
}

// ---------- разбор границ блока в исходнике
function blockEnd(src, openIdx) {
    const open = src[openIdx]; const close = open === '{' ? '}' : ']';
    let depth = 0;
    for (let i = openIdx; i < src.length; i++) {
        const c = src[i];
        if (c === '/' && src[i + 1] === '/') { while (i < src.length && src[i] !== '\n') i++; continue; }
        if (c === '/' && src[i + 1] === '*') { i = src.indexOf('*/', i) + 1; continue; }
        if (c === "'" || c === '"' || c === '`') { const q = c; i++; while (i < src.length && src[i] !== q) { if (src[i] === '\\') i++; i++; } continue; }
        if (c === open) depth++;
        else if (c === close) { depth--; if (depth === 0) return i; }
    }
    throw new Error('нет закрытия блока');
}
function replaceBlock(src, declRe, newText) {
    const m = declRe.exec(src); if (!m) throw new Error('не найден блок ' + declRe);
    const openIdx = m.index + m[0].length - 1; const end = blockEnd(src, openIdx);
    let after = end + 1; if (src[after] === ';') after++;
    return src.slice(0, m.index) + newText + src.slice(after);
}

const f = (x) => (Number.isInteger(x) ? String(x) : String(Number(x.toFixed(4))));
const q = (s) => JSON.stringify(s);

function writeLevel(L, solvedByRole) {
    const file = path.join(REPO, 'lvlData', `gameData${L.n}.js`);
    let src = fs.readFileSync(file, 'utf8'); const old = loadOld(L.n);
    // --- bossCombatConfig
    const P = [];
    P.push('const bossCombatConfig = {');
    if (old.scaleLongComboDamage !== undefined) P.push('\tscaleLongComboDamage: ' + old.scaleLongComboDamage + ',\n\tscaleShortComboDamage: ' + old.scaleShortComboDamage + ',');
    if (old.musicMood) P.push('\tmusicMood: ' + q(old.musicMood) + ',');
    for (const k of ['waveJitter', 'busyRetryMs', 'defaultRecoveryMs', 'selection', 'movementStyles']) P.push(`\t${k}: ${JSON.stringify(old[k]).replace(/"([a-zA-Z0-9]+)":/g, '$1: ').replace(/,/g, ', ')},`);
    P.push(`\tlevelCadence: ${f(L.cfg.levelCadence)}, damageMultiplier: ${f(old.damageMultiplier)}, minWaveDelay: ${L.cfg.minWaveDelay}, minShotDelay: ${L.cfg.minShotDelay}, minTelegraphMs: ${L.cfg.minTelegraphMs},`);
    P.push('\tphases: [');
    L.phases.forEach((p, i) => {
        const o = old.phases[i];
        P.push(`\t\t{ phase: ${i + 1}, minHp: ${f(p.minHp)}, cadence: ${f(p.cadence)}, speed: ${f(p.speed)}, damage: ${f(o.damage)}, telegraphMultiplier: ${f(p.telegraphMultiplier)}, surpriseChance: ${f(p.surpriseChance)}, maxActiveAttacks: ${p.maxActiveAttacks}${p.excluded ? `, excludedDangerousCombos: ${p.excluded}` : ''} }${i < 2 ? ',' : ''}`);
    });
    P.push('\t],');
    P.push('\tbosses: {');
    ROLES.forEach((r, i) => {
        const b = L.bosses[r]; const o = old.bosses[r];
        const sv = b.speedVariance || o.speedVariance;
        P.push(`\t\t${r}: { combatIdentity: ${q(b.identity)}, combatTrick: ${q(b.trick)}, signatureEvery: ${b.signatureEvery ?? o.signatureEvery}, movementStyle: '${b.style}', cadence: ${f(b.cadence)}, telegraphMs: ${b.telegraphMs}, speedMultiplier: ${f(b.speedMultiplier)}, damageMultiplier: ${f(o.damageMultiplier)}, speedVariance: [${sv.map(f).join(', ')}]${o.healthMultiplier !== undefined ? `, healthMultiplier: ${f(o.healthMultiplier)}` : ''}${o.appearMessage ? `, appearMessage: ${q(o.appearMessage)}` : ''}${o.phaseMessages ? `, phaseMessages: ${JSON.stringify(o.phaseMessages).replace(/"(d)":/g, '$1: ').replace(/,/g, ', ')}` : ''} }${i < 4 ? ',' : ''}`);
    });
    P.push('\t}');
    P.push('};');
    src = replaceBlock(src, /const bossCombatConfig = \{/, P.join('\n'));
    // --- timeNextBoss / bossInterval
    src = src.replace(/let timeNextBoss = \d+;/, `let timeNextBoss = ${L.timeNextBoss};`).replace(/const bossInterval = \d+;/, `const bossInterval = ${L.bossInterval};`);
    // --- bossAbilities + комбо
    const AB = ['const bossAbilities = ['], DOP = ['const bossAbilitiesDop = ['];
    ROLES.forEach((r, ri) => {
        const b = L.bosses[r]; const solved = solvedByRole[r];
        const reg = []; const regIdx = new Map();
        const idxOf = (bt) => {
            const k = `${bt.x}/${bt.y}/${bt.s}/${bt.w ? bt.w.join('-') : ''}`;
            if (!regIdx.has(k)) { regIdx.set(k, reg.length); reg.push({ ...bt, k, combo: null }); }
            return regIdx.get(k);
        };
        const comboIdx = b.combos.map(c => solved[c.id].map(bt => { const i = idxOf(bt); if (!reg[i].combo) reg[i].combo = c.id; return i; }));
        AB.push(`\t// ===== ${b.title} =====`);
        reg.forEach((a, i) => {
            const t = 'enem' + (ri + 1) + (ri + 1);
            AB.push(`\t{ boss: '${r}', type: '${t}', xPos: ${a.x}, yPos: ${a.y}, customHP: 1, customDamage: ${L.damageByClass ? `attackDamage.${r}.${(L.damageClassOverride && L.damageClassOverride[r]) || (a.s >= 13 ? 'light' : a.s >= 7 ? 'medium' : 'heavy')}` : (L.damageTiers && L.damageTiers[r]) ? L.damageTiers[r][a.s >= 18 ? 0 : a.s >= 11 ? 1 : 2] : `ENEMY_TYPES.${r}.baseDamage`}, customSpeed: ${a.s}${a.w ? `, waveAmplitude: ${f(a.w[0])}, waveFrequency: ${f(a.w[1])}${a.w[2] !== undefined ? `, wavePhase: ${f(a.w[2])}` : ''}` : ''} }, // ${i} ${a.combo}`);
        });
        AB.push('');
        DOP.push(`\t// ${b.title}`);
        b.combos.forEach((c, ci) => {
            const parts = [`boss: '${r}'`, `indexAbilities: [${comboIdx[ci].join(', ')}]`];
            if (c.sig) parts.push('signature: true');
            if (c.minPhase) parts.push(`minPhase: ${c.minPhase}`);
            if (c.shotDelayMs) parts.push(`shotDelayMs: ${c.shotDelayMs}`);
            if (c.recoveryMs) parts.push(`recoveryMs: ${c.recoveryMs}`);
            if (c.gaps) parts.push(`shotGapsMs: [${c.gaps.join(', ')}]`);
            if (c.open !== undefined) parts.push(`openingOrder: ${c.open}`);
            if (c.label) parts.push(`label: ${q(c.label)}`);
            DOP.push(`\t{ ${parts.join(', ')} },`);
        });
        DOP.push('');
    });
    AB.push('];'); DOP.push('];');
    src = replaceBlock(src, /const bossAbilities = \[/, AB.join('\n'));
    src = replaceBlock(src, /const bossAbilitiesDop = \[/, DOP.join('\n'));
    // --- задержки
    const MD = ['const mBossDelayAb = ['];
    ROLES.forEach(r => MD.push(`\t{ boss: '${r}', bossDelayAb: ${L.bosses[r].delay[0]}, bossDelayAbDop: ${L.bosses[r].delay[1]}, firstWaveDelayMs: ${L.bosses[r].firstWave ?? old.__delays.find(x => x.boss === r).firstWaveDelayMs} }, // ${L.bosses[r].delayNote || ''}`));
    MD.push('];');
    src = replaceBlock(src, /const mBossDelayAb = \[/, MD.join('\n'));
    fs.writeFileSync(file, src, 'utf8');
}

function avoidSets(n) { // геометрия остальных уровней по ролям (из инструмента, не из своих выборок)
    const out = path.join(__dirname, 'inv.json');
    cp.spawnSync('node', [REPO + '/scripts/combat-data-inventory.js', `--json=${out}`], { encoding: 'utf8', maxBuffer: 1 << 28 });
    const levels = JSON.parse(fs.readFileSync(out, 'utf8'));
    const sets = {}; ROLES.forEach(r => (sets[r] = new Set()));
    levels.filter(l => l.n !== n).forEach(l => l.bosses.forEach(b => b.attacks.forEach(a => sets[b.role].add(`${a.xPos}/${a.yPos}/${a.customSpeed}/${a.waveAmplitude !== undefined ? a.waveAmplitude : '-'}/${a.waveFrequency !== undefined ? a.waveFrequency : '-'}`))));
    return sets;
}

// Механическая уникальность скалярных констант (раздел 1.3 правил): сетка 0.001 / 1 мс; сдвиг до первого свободного значения.
function nudgeScalars(L, levels) {
    const others = levels.filter(l => l.n !== L.n);
    const taken = (get) => new Set(others.map(get).filter(v => v !== undefined));
    const log = [];
    const nudge = (cur, step, set, dec, label) => {
        if (!set.has(cur)) return cur;
        for (let k = 1; k < 400; k++) for (const sg of [1, -1]) { const v = Number((cur + sg * k * step).toFixed(dec)); if (!set.has(v)) { log.push(`${label}: ${cur} -> ${v}`); return v; } }
        return cur;
    };
    for (const k of ['levelCadence']) L.cfg[k] = nudge(L.cfg[k], 0.001, taken(o => o[k]), 3, 'cfg.' + k);
    for (const k of ['minWaveDelay', 'minShotDelay', 'minTelegraphMs']) L.cfg[k] = nudge(L.cfg[k], 1, taken(o => o[k]), 0, 'cfg.' + k);
    L.phases.forEach((p, i) => ['cadence', 'speed', 'telegraphMultiplier', 'surpriseChance', ...(i < 2 ? ['minHp'] : [])].forEach(k => { p[k] = nudge(p[k], 0.001, taken(o => o.phases[i][k]), 3, `фаза${i + 1}.${k}`); }));
    ROLES.forEach(r => {
        const b = L.bosses[r]; const tk = (get) => taken(o => get(o.bosses.find(x => x.role === r)));
        b.cadence = nudge(b.cadence, 0.001, tk(x => x.profile.cadence), 3, r + '.cadence');
        b.telegraphMs = nudge(b.telegraphMs, 1, tk(x => x.profile.telegraphMs), 0, r + '.telegraphMs');
        b.speedMultiplier = nudge(b.speedMultiplier, 0.001, tk(x => x.profile.speedMultiplier), 3, r + '.speedMultiplier');
        b.delay[0] = nudge(b.delay[0], 1, tk(x => x.bossDelayAb), 0, r + '.bossDelayAb');
        b.delay[1] = nudge(b.delay[1], 1, tk(x => x.bossDelayAbDop), 0, r + '.bossDelayAbDop');
    });
    return log;
}
function build(L) {
    const NL = String.fromCharCode(10);
    if (!L._nudged) { const out = path.join(__dirname, 'inv.json'); cp.spawnSync('node', [REPO + '/scripts/combat-data-inventory.js', `--json=${out}`], { encoding: 'utf8', maxBuffer: 1 << 28 });
      const lv = JSON.parse(fs.readFileSync(out, 'utf8')); const lg = nudgeScalars(L, lv);
      if (lg.length) console.log(['сдвиг констант до свободных значений:', ...lg.map(x => '  ' + x)].join(NL)); }
    const avoid = avoidSets(L.n); const solvedByRole = {}; const errs = [];
    for (const r of ROLES) {
        const solved = {}; const used = new Set();
        for (const c of L.bosses[r].combos) { try { solved[c.id] = tuneAndSolve(L, r, c, solved, avoid[r], used); } catch (e) { errs.push(e.message); solved[c.id] = null; } }
        solvedByRole[r] = solved;
    }
    if (errs.length) throw new Error(NL + '  ' + errs.join(NL + '  '));
    const target = path.join(REPO, 'lvlData', `gameData${L.n}.js`); const prev = fs.readFileSync(target, 'utf8');
    writeLevel(L, solvedByRole);
    const res = cp.spawnSync('node', [REPO + '/scripts/combat-data-inventory.js', `--check=${L.n}`], { encoding: 'utf8', maxBuffer: 1 << 28 });
    const au = cp.spawnSync('node', [REPO + '/scripts/combo-audit.js', String(L.n)], { encoding: 'utf8', maxBuffer: 1 << 28 });
    let status = res.status; let out = res.stdout + res.stderr + NL + '--- combo-audit ---' + NL + au.stdout + au.stderr;
    if (au.status) status = au.status;
    // А10.5: провал проверок — прежний файл уровня возвращается, отвергнутый вариант сохраняется для разбора
    if (status) {
        const rej = path.join(__dirname, 'rejected'); fs.mkdirSync(rej, { recursive: true });
        fs.writeFileSync(path.join(rej, `gameData${L.n}.js`), fs.readFileSync(target, 'utf8')); fs.writeFileSync(target, prev);
        out += NL + `!!! ПРОВЕРКИ НЕ ПРОЙДЕНЫ — gameData${L.n}.js ВОЗВРАЩЁН к прежней версии (отвергнутая: scripts/level-builder/rejected/)`;
    }
    return { status, out };
}
module.exports = { nudgeScalars, build, ROLES, loadOld, REPO, solveCombo, ctxFor, model, parseBeats, sideOf, scaleBeats, feasibleSlack, tuneAndSolve };
