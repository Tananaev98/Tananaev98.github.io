// ИНВЕНТАРИЗАЦИЯ ВСЕХ данных, влияющих на сражение с боссом, по ВСЕМ созданным
// уровням (раздел 1.3 lvlData/Правила создания уровня.txt). Каждое сражение
// должно быть уникальным относительно ВСЕХ остальных уровней, а не соседей.
//   node scripts/level-diversity-report.js [--verbose] [--to=N]
// По умолчанию проверяются уровни 1..LEVEL_HANDCRAFTED_THROUGH (areas.js).
// Код возврата 1 при любом повторе.
//
// Как проверяется уникальность:
//  - НЕПРЕРЫВНЫЕ переменные (числа с мелким шагом, кортежи, геометрия) —
//    значение каждой переменной уникально среди ВСЕХ уровней;
//  - переменные с ОЧЕНЬ малым доменом (7 стилей движения, целые 3-18) не могут
//    быть уникальны поодиночке на десятках уровней (принцип Дирихле) — для них
//    уникален КОРТЕЖ целиком: пять стилей ролей; три maxActiveAttacks; пара
//    timeNextBoss/bossInterval; структура (число атак/комбо и их размеры) по
//    пяти ролям.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const VERBOSE = process.argv.includes('--verbose');
const toArg = process.argv.find((a) => a.startsWith('--to='));
let LAST = toArg ? Number(toArg.slice(5)) : null;
if (!LAST) {
    const m = fs.readFileSync(path.join(ROOT, 'lvlData', 'areas.js'), 'utf8').match(/const LEVEL_HANDCRAFTED_THROUGH\s*=\s*(\d+)/);
    LAST = m ? Number(m[1]) : 74;
}
const ROLES = ['enem1', 'enem2', 'enem3', 'enem4', 'enem5'];

const EXEMPT = {
    'ENEMY_TYPES.*.baseExp / deathAnimation / spawnWeight / size / baseSpeed / dispName / image': 'не влияют на механику боя с боссом (награда, косметика, неиспользуемые для боссов поля; size 32% — раздел 17)',
    'bossCombatConfig.scale*ComboDamage / attackChains / musicMood': 'булевы флаги механик, не параметры ритма',
    'phases[].phase / phase3.minHp': 'индекс фазы и нижняя граница 0 — структурные',
    'barricadeHits / barricadePauseMs': 'жёстко связаны правилом 16.2 (пауза = удары × 400мс, эскалация по роли)',
};

function load(n) {
    const f = path.join(ROOT, 'lvlData', `gameData${n}.js`);
    if (!fs.existsSync(f)) return null;
    const sb = {};
    new vm.Script(fs.readFileSync(f, 'utf8') + `
        this.cfg = typeof bossCombatConfig !== 'undefined' ? bossCombatConfig : null;
        this.E = typeof ENEMY_TYPES !== 'undefined' ? ENEMY_TYPES : {};
        this.A = typeof bossAbilities !== 'undefined' ? bossAbilities : [];
        this.D = typeof bossAbilitiesDop !== 'undefined' ? bossAbilitiesDop : [];
        this.M = typeof mBossDelayAb !== 'undefined' ? mBossDelayAb : [];
        this.t = typeof timeNextBoss !== 'undefined' ? timeNextBoss : null;
        this.b = typeof bossInterval !== 'undefined' ? bossInterval : null;`).runInContext(vm.createContext(sb));
    return sb.cfg ? sb : null;
}

function extract(sb) {
    const cont = {}; const tuples = {}; const triples = {};
    const c = sb.cfg;
    for (const k of ['levelCadence', 'damageMultiplier', 'minWaveDelay', 'minShotDelay', 'minTelegraphMs']) cont[`level.${k}`] = c[k];
    const ph = c.phases || [];
    ph.forEach((p, i) => {
        for (const k of ['cadence', 'speed', 'damage', 'telegraphMultiplier', 'surpriseChance']) cont[`phase${i + 1}.${k}`] = p[k];
        if (i < 2) cont[`phase${i + 1}.minHp`] = p.minHp;
    });
    cont['phases.tuple'] = JSON.stringify(ph.map((p) => [p.minHp, p.cadence, p.speed, p.damage, p.telegraphMultiplier, p.surpriseChance, p.maxActiveAttacks]));
    tuples['phaseMaxActive'] = ph.map((p) => p.maxActiveAttacks).join('/');
    tuples['timing'] = `${sb.t}/${sb.b}`;
    const styles = [];
    const structure = [];
    for (const r of ROLES) {
        const b = (c.bosses && c.bosses[r]) || {};
        for (const k of ['cadence', 'telegraphMs', 'speedMultiplier', 'damageMultiplier']) cont[`${r}.${k}`] = b[k];
        cont[`${r}.speedVariance`] = b.speedVariance ? JSON.stringify(b.speedVariance) : undefined;
        styles.push(b.movementStyle);
        const e = sb.E[r] || {};
        cont[`${r}.baseDamage`] = e.baseDamage;
        const m = sb.M.find((x) => x.boss === r) || {};
        cont[`${r}.bossDelayAb`] = m.bossDelayAb;
        cont[`${r}.bossDelayAbDop`] = m.bossDelayAbDop;

        const abs = sb.A.filter((a) => a.boss === r);
        const bar = abs.filter((a) => a.barricadeHits !== undefined);
        const chainIdx = new Set();
        sb.D.filter((d) => d.boss === r && d.isChain).forEach((d) => d.indexAbilities.forEach((i) => chainIdx.add(i)));
        const pool = abs.filter((a, i) => a.barricadeHits === undefined && !chainIdx.has(i))
            .map((a) => `${a.xPos}/${a.yPos}/${a.customSpeed}` + (a.waveAmplitude !== undefined ? `/w${a.waveAmplitude}-${a.waveFrequency}` : '')).sort();
        triples[r] = pool;
        cont[`${r}.pool.tuple`] = pool.join(' ');
        const chains = sb.D.filter((d) => d.boss === r && d.isChain).map((d) => d.indexAbilities.map((i) => `${abs[i] && abs[i].xPos}@${abs[i] && abs[i].customSpeed}`).join(','));
        cont[`${r}.chains.tuple`] = chains.length ? chains.join(' | ') : undefined;
        cont[`${r}.barricade.tuple`] = bar.length ? bar.map((a) => `${a.xPos}/${a.yPos}/${a.barricadeHits}/${a.barricadePauseMs}/${a.barricadeRushSpeedMultiplier}`).join(' ') : undefined;
        cont[`${r}.barricade.rush`] = bar.length ? bar.map((a) => a.barricadeRushSpeedMultiplier).join(',') : undefined;
        const combos = sb.D.filter((d) => d.boss === r && !d.isChain && !d.barricade);
        cont[`${r}.combos.tuple`] = combos.map((d) => d.indexAbilities.join('.')).join(' ');
        structure.push(`${abs.length}:${combos.length}:${combos.map((d) => d.indexAbilities.length).sort().join('')}`);
    }
    tuples['movementStyles'] = styles.join('/');
    tuples['structure'] = structure.join(' ');
    return { cont, tuples, triples };
}

const levels = {};
for (let n = 1; n <= LAST; n++) { const sb = load(n); if (sb) levels[n] = extract(sb); }
const nums = Object.keys(levels).map(Number).sort((a, b) => a - b);

const problems = []; const perVar = {};
const note = (varName, msg) => { problems.push(msg); const k = varName.replace(/^enem\d/, 'enemN'); perVar[k] = (perVar[k] || 0) + 1; };
const empty = (v) => v === undefined || v === null || v === '' || /undefined/.test(String(v));

const seen = {};
for (const n of nums) for (const [name, v] of Object.entries(levels[n].cont)) {
    if (empty(v)) continue;
    const key = name + '=' + JSON.stringify(v);
    if (seen[key] !== undefined) note(name, `L${n} ${name} = ${String(v).slice(0, 50)} — уже на уровне ${seen[key]}`);
    else seen[key] = n;
}
const seenT = {};
for (const n of nums) for (const [name, v] of Object.entries(levels[n].tuples)) {
    if (empty(v)) continue;
    const key = name + '=' + v;
    if (seenT[key] !== undefined) note(name, `L${n} ${name} = ${v} — тот же кортеж на уровне ${seenT[key]}`);
    else seenT[key] = n;
}
const seenG = {};
for (const n of nums) for (const r of ROLES) for (const t of levels[n].triples[r]) {
    const key = t.split('/w')[0];
    const own = `${r}|${key}`;
    if (seenG[own] !== undefined && seenG[own] !== n) note('геометрия', `L${n} ${r}: атака ${key} уже была на уровне ${seenG[own]}`);
    else seenG[own] = n;
}
for (const n of nums) {
    const inLevel = {};
    for (const r of ROLES) for (const t of levels[n].triples[r]) {
        const key = t.split('/w')[0];
        if (inLevel[key] && inLevel[key] !== r) note('геометрия', `L${n} атака ${key} у двух боссов уровня: ${inLevel[key]}, ${r}`);
        inLevel[key] = r;
    }
}

console.log(`ИНВЕНТАРИЗАЦИЯ: уровней ${nums.length} (1-${LAST}), переменных на уровень ≈ ${Object.keys(levels[nums[nums.length - 1]].cont).length + Object.keys(levels[nums[nums.length - 1]].tuples).length}`);
console.log('\nИСКЛЮЧЕНИЯ (не влияют на механику боя с боссом):');
for (const k in EXEMPT) console.log(`  ${k} — ${EXEMPT[k]}`);
if (VERBOSE) console.log('\nПОВТОРЫ:\n' + problems.join('\n'));
if (problems.length) {
    const lv = new Set(problems.map((p) => (p.match(/^L(\d+)/) || [])[1]));
    console.log(`\nПОВТОРОВ: ${problems.length}, затронуто уровней: ${lv.size}. По переменным:`);
    Object.entries(perVar).sort((a, b) => b[1] - a[1]).forEach(([k, c]) => console.log(`  ${String(c).padStart(5)}  ${k}`));
    process.exit(1);
}
console.log('\nПовторов нет: каждое сражение уникально относительно всех уровней.');
