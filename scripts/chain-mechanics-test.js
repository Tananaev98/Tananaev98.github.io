// Regression tests against actual engine functions; no browser or simulated playthrough.
const fs = require('fs'), vm = require('vm'), assert = require('assert');
const source = fs.readFileSync(require('path').join(__dirname, '../game.js'), 'utf8');
function fn(name) {
    const start = source.indexOf('function ' + name + '(');
    assert(start >= 0, name);
    // Function declarations are separated by top-level closing braces in game.js.
    const end = source.indexOf('\n}', start) + 2;
    assert(end > start);
    return source.slice(start, end);
}
const alive = [], sentinel = new Error('normal damage path');
const ctx = { activeEnemies: alive, bossM: [], SHOT_INTERVAL: 100,
    applyChainVisualState() {}, createChainLink() {}, removeChainLink() {},
    animateEnemyHit() {}, calculateDamage() { throw sentinel; } };
vm.createContext(ctx);
vm.runInContext(['linkNextChainMember', 'resolveChainMember', 'damageEnemy'].map(fn).join('\n'), ctx);
let cases = 0;
function member() { return { element: { isConnected: true }, type: 'attack' }; }
// Enumerate every legal spawn/destroy interleaving, including killing a head before its successor exists.
for (let length = 3; length <= 7; length++) {
    function walk(ops, spawned, killed) {
        if (killed === length) {
            alive.length = 0; const slot = {}, queue = [];
            for (const op of ops) {
                if (op === 's') { const e = member(); alive.push(e); queue.push(e); ctx.linkNextChainMember(slot, e); }
                else { const e = queue.shift(); assert.strictEqual(e.chainVulnerable, true); ctx.resolveChainMember(e); alive.splice(alive.indexOf(e), 1); }
                queue.forEach((e, i) => assert.strictEqual(e.chainVulnerable, i === 0));
                queue.forEach(e => { if (e.chainPrev) assert(alive.includes(e.chainPrev)); });
            }
            cases++; return;
        }
        if (spawned < length) walk(ops + 's', spawned + 1, killed);
        if (spawned > killed) walk(ops + 'k', spawned, killed + 1);
    }
    walk('', 0, 0);
}
alive.length = 0;
const a = member(), b = member(); alive.push(a, b);
ctx.linkNextChainMember({}, a); ctx.linkNextChainMember({}, b);
assert(a.chainVulnerable && b.chainVulnerable);
const tail = member(); tail.chainVulnerable = false;
assert.doesNotThrow(() => ctx.damageEnemy(tail));
assert.throws(() => ctx.damageEnemy(a), e => e === sentinel);
const pm = require('./player-model');
const attacks = [{ xPos: 90 }, { xPos: 10 }];
assert(pm.sequentialSlack(attacks, [2500, 1000], [0, 0], 0) >= 60);
assert(pm.sequentialSlack(attacks, [2500, 1000], [0, 0], 0, 0, [0, 1]) < 0);
const model = require('./combo-model');
const level = { bossCombatConfig: { attackChains: true, minShotDelay: 300,
    phases: [{ cadence: 1, speed: 1 }], bosses: { enem1: { cadence: 1, speedMultiplier: 1, speedVariance: [1] } } },
    ENEMY_TYPES: { enem11: { baseSpeed: .020 } }, mBossDelayAb: [{ boss: 'enem1', bossDelayAb: 150 }] };
const projectile = { xPos: 10, yPos: 5, customSpeed: 12 };
assert.deepStrictEqual(model.analyze(level, 'enem1', [projectile, projectile], [0, 1], 0, { isChain: true }).blockOrder, [0, 1]);
assert.strictEqual(model.analyze(level, 'enem1', [projectile, projectile], [0, 1], 0, {}).blockOrder, undefined);
level.bossCombatConfig.attackChains = false;
assert.strictEqual(model.analyze(level, 'enem1', [projectile, projectile], [0, 1], 0, { isChain: true }).blockOrder, undefined);
console.log(`Chain engine: ${cases} spawn/destroy interleavings; independent heads; invulnerable tail; forced block order — PASS`);
