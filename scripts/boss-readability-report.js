/* eslint-disable no-console */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const FAST_BOSS_ATTACK_SPEED = 18;
const BOSS_LEFT_FLANK_MAX_X = 28;
const BOSS_RIGHT_FLANK_MIN_X = 72;
const MIN_FAST_CROSSFIRE_GAP_MS = 720;

const levelNumbers = fs.readdirSync('lvlData')
    .map(filename => filename.match(/^gameData(\d+)\.js$/))
    .filter(Boolean)
    .map(match => Number(match[1]))
    .sort((left, right) => left - right);

function loadLevelData(levelNumber) {
    const filename = `lvlData/gameData${levelNumber}.js`;
    const context = vm.createContext({ console });
    const source = fs.readFileSync(filename, 'utf8') + `
globalThis.levelApi = {
    lvlNumber,
    bossCombatConfig,
    ENEMY_TYPES,
    bossAbilities,
    bossAbilitiesDop,
    mBossDelayAb
};`;

    vm.runInContext(source, context, { filename });
    return context.levelApi;
}

function getAttackSide(attack) {
    if (attack.xPos <= BOSS_LEFT_FLANK_MAX_X) return 'left';
    if (attack.xPos >= BOSS_RIGHT_FLANK_MIN_X) return 'right';
    return 'center';
}

function capAttackSpeed(attack, speed) {
    let cappedSpeed = speed;
    if (attack.yPos > 12) cappedSpeed = Math.min(cappedSpeed, 15);
    else if (attack.yPos > 10) cappedSpeed = Math.min(cappedSpeed, 18);
    else cappedSpeed = Math.min(cappedSpeed, 31);
    if (attack.customSpeed <= 10) cappedSpeed = Math.min(cappedSpeed, 11.5);
    return cappedSpeed;
}

function getProjectedAttackSpeed(attack, phase, profile) {
    const maximumVariance = Math.max(...profile.speedVariance);
    return capAttackSpeed(
        attack,
        attack.customSpeed * profile.speedMultiplier * phase.speed * maximumVariance
    );
}

function getSchedule(abilityIndexes, abilities, shotDelay, phase, profile, enforceSafety) {
    const offsets = [];
    const adjustedTransitions = [];
    const lastFastAttackAt = { left: -Infinity, right: -Infinity };
    const minimumGap = Math.max(
        MIN_FAST_CROSSFIRE_GAP_MS,
        Number(profile.minFastSideSwitchMs) || 0
    );
    let currentOffset = 0;

    abilityIndexes.forEach((abilityIndex, shotIndex) => {
        if (shotIndex > 0) currentOffset += shotDelay;
        const attack = abilities[abilityIndex];
        if (!attack) {
            offsets.push(Math.round(currentOffset));
            return;
        }

        const side = getAttackSide(attack);
        const isFast = side !== 'center'
            && getProjectedAttackSpeed(attack, phase, profile) >= FAST_BOSS_ATTACK_SPEED;

        if (isFast) {
            const oppositeSide = side === 'left' ? 'right' : 'left';
            const rawGap = currentOffset - lastFastAttackAt[oppositeSide];
            const earliestFairOffset = lastFastAttackAt[oppositeSide] + minimumGap;

            if (Number.isFinite(rawGap) && rawGap < minimumGap) {
                adjustedTransitions.push({
                    shotIndex,
                    from: oppositeSide,
                    to: side,
                    rawGap: Math.round(rawGap),
                    requiredGap: minimumGap
                });
                if (enforceSafety) currentOffset = earliestFairOffset;
            }

            lastFastAttackAt[side] = currentOffset;
        }

        offsets.push(Math.round(currentOffset));
    });

    return { offsets, adjustedTransitions };
}

function findUnsafeTransitions(abilityIndexes, abilities, offsets, phase, profile) {
    const lastFastAttackAt = { left: -Infinity, right: -Infinity };
    const minimumGap = Math.max(
        MIN_FAST_CROSSFIRE_GAP_MS,
        Number(profile.minFastSideSwitchMs) || 0
    );
    const violations = [];

    abilityIndexes.forEach((abilityIndex, shotIndex) => {
        const attack = abilities[abilityIndex];
        if (!attack) return;
        const side = getAttackSide(attack);
        const isFast = side !== 'center'
            && getProjectedAttackSpeed(attack, phase, profile) >= FAST_BOSS_ATTACK_SPEED;
        if (!isFast) return;

        const oppositeSide = side === 'left' ? 'right' : 'left';
        const gap = offsets[shotIndex] - lastFastAttackAt[oppositeSide];
        if (Number.isFinite(gap) && gap < minimumGap) {
            violations.push({ shotIndex, gap, minimumGap });
        }
        lastFastAttackAt[side] = offsets[shotIndex];
    });

    return violations;
}

const gameSource = fs.readFileSync('game.js', 'utf8');
const gameStyles = fs.readFileSync('main_css.css', 'utf8');
assert.match(gameSource, /const MIN_FAST_CROSSFIRE_GAP_MS = 720;/);
assert.match(gameSource, /function getBossAttackScheduleOffsets\(/);
assert.match(gameSource, /attackScheduleOffsets\[shotIndex\]/);
assert.match(gameSource, /function getBossAttackDangerIntensity\(/);
assert.match(gameSource, /showAttackTelegraph\(telegraphAttack, telegraphMs, movementStyle, speed\)/);
assert.match(gameSource, /applyBossAttackSpeedVisual\(enemy\.element, customSpeed\)/);
assert.match(gameStyles, /var\(--telegraph-border-color/);
assert.match(gameStyles, /var\(--attack-speed-filter\)/);

const adjustedCombos = [];
let checkedCombos = 0;

for (const levelNumber of levelNumbers) {
    const level = loadLevelData(levelNumber);

    for (const [boss, profile] of Object.entries(level.bossCombatConfig.bosses)) {
        const abilities = level.bossAbilities.filter(attack => attack.boss === boss);
        const combos = level.bossAbilitiesDop.filter(combo => combo.boss === boss);
        const delayConfig = level.mBossDelayAb.find(item => item.boss === boss);
        assert.ok(delayConfig, `Нет mBossDelayAb для ${boss} на уровне ${levelNumber}`);

        combos.forEach((combo, comboIndex) => {
            checkedCombos++;
            let worstAdjustment = null;

            for (const phase of level.bossCombatConfig.phases) {
                const shotDelay = Math.max(
                    level.bossCombatConfig.minShotDelay,
                    delayConfig.bossDelayAb * profile.cadence * phase.cadence
                );
                const rawSchedule = getSchedule(
                    combo.indexAbilities,
                    abilities,
                    shotDelay,
                    phase,
                    profile,
                    false
                );
                const safeSchedule = getSchedule(
                    combo.indexAbilities,
                    abilities,
                    shotDelay,
                    phase,
                    profile,
                    true
                );

                const unsafeAfterCorrection = findUnsafeTransitions(
                    combo.indexAbilities,
                    abilities,
                    safeSchedule.offsets,
                    phase,
                    profile
                );
                assert.equal(
                    unsafeAfterCorrection.length,
                    0,
                    `После коррекции остался быстрый перекрёстный залп: уровень ${levelNumber}, ${boss}, комбинация ${comboIndex + 1}`
                );

                if (rawSchedule.adjustedTransitions.length === 0) continue;

                const addedDuration = safeSchedule.offsets[safeSchedule.offsets.length - 1]
                    - rawSchedule.offsets[rawSchedule.offsets.length - 1];
                const candidate = {
                    phase: phase.phase,
                    transitions: rawSchedule.adjustedTransitions.length,
                    minimumRawGap: Math.min(
                        ...rawSchedule.adjustedTransitions.map(transition => transition.rawGap)
                    ),
                    addedDuration: Math.round(addedDuration)
                };

                if (!worstAdjustment || candidate.addedDuration > worstAdjustment.addedDuration) {
                    worstAdjustment = candidate;
                }
            }

            if (!worstAdjustment) return;
            adjustedCombos.push({
                level: levelNumber,
                boss,
                name: level.ENEMY_TYPES[boss]?.dispName ?? boss,
                combo: comboIndex + 1,
                phase: worstAdjustment.phase,
                switches: worstAdjustment.transitions,
                previousGap: `${worstAdjustment.minimumRawGap} мс`,
                addedTime: `+${worstAdjustment.addedDuration} мс`
            });
        });
    }
}

assert.ok(
    adjustedCombos.some(row => row.level === 1 && row.name === 'Колобок'),
    'Проверка не обнаружила исходный перекрёстный залп Колобка'
);
assert.ok(
    adjustedCombos.some(row => row.level === 5 && row.name === 'Волчок'),
    'Проверка не обнаружила исходный перекрёстный залп Волчка'
);

console.log(`Проверено комбинаций: ${checkedCombos}`);
console.log(`Автоматически разнесено нечитаемых комбинаций: ${adjustedCombos.length}`);
const adjustedBosses = [...adjustedCombos.reduce((bosses, row) => {
    const key = `${row.level}:${row.boss}`;
    const previousGap = Number.parseInt(row.previousGap, 10);
    const addedTime = Number.parseInt(row.addedTime, 10);
    const summary = bosses.get(key) ?? {
        level: row.level,
        boss: row.boss,
        name: row.name,
        combos: 0,
        minimumPreviousGap: Infinity,
        maximumAddedTime: 0
    };

    summary.combos++;
    summary.minimumPreviousGap = Math.min(summary.minimumPreviousGap, previousGap);
    summary.maximumAddedTime = Math.max(summary.maximumAddedTime, addedTime);
    bosses.set(key, summary);
    return bosses;
}, new Map()).values()].map(summary => ({
    level: summary.level,
    boss: summary.boss,
    name: summary.name,
    combos: summary.combos,
    previousGap: `${summary.minimumPreviousGap} мс`,
    maximumAddedTime: `+${summary.maximumAddedTime} мс`
}));

console.log(`Затронуто боссов: ${adjustedBosses.length}`);
console.table(process.argv.includes('--details') ? adjustedCombos : adjustedBosses);
console.log(
    `Boss readability report passed: быстрые противоположные фланги разделены минимум на ${MIN_FAST_CROSSFIRE_GAP_MS} мс.`
);
