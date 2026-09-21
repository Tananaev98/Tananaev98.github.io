// УРОВЕНЬ 24 (v3) — форма комбо извлечена из прежней версии, времена подобраны refit.js под честную модель (А11). Правится вручную по А11.
module.exports = {
    n: 24, timeNextBoss: 5, bossInterval: 5, tight: { p1: 500, floor: 170 },
    cfg: { levelCadence: 0.81, minWaveDelay: 1980, minShotDelay: 138, minTelegraphMs: 515 },
    phases: [
        { minHp: 0.63, cadence: 1, speed: 1, telegraphMultiplier: 1, surpriseChance: 0.17, maxActiveAttacks: 17 },
        { minHp: 0.29, cadence: 0.78, speed: 1.15, telegraphMultiplier: 0.87, surpriseChance: 0.3, maxActiveAttacks: 19 },
        { minHp: 0, cadence: 0.65, speed: 1.24, telegraphMultiplier: 0.8, surpriseChance: 0.4, maxActiveAttacks: 22 }
    ],
    bosses: {
        enem1: { title: 'Мешкач', identity: 'Мешок и россыпь',
            trick: 'медленный первый снаряд остаётся фоном для более срочного второго',
            tight: { p1: 400, floor: 120 }, style: 'lateRush', cadence: 1.21, telegraphMs: 1000, speedMultiplier: 0.82, signatureEvery: 4, delay: [460, 5950], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '20/4@1600', label: '' },
                { id: 'b', tight: false, beats: '80/4@1600', label: '' },
                { id: 'c', tight: false, beats: '20/4@1600 80/4@1800', label: '' },
                { id: 'd', tight: false, beats: '35/5@1600 65/5@1800 50/6@2000', label: '' },
                { id: 'e', tight: false, beats: '15/8@1600 85/8@1800 50/12@2000', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '22/7@1600 36/21@1800', label: 'Мешок и россыпь — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '22/7@1600 36/21@1800 22/20@2000', label: 'Мешок и россыпь — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '22/7@1600 66/18@1800 36/21@2000 22/20@2200', label: 'Мешок и россыпь — завершение' }
            ] },
        enem2: { title: 'Жерновень', identity: 'Жернов делает второй оборот',
            trick: 'повторяет удар в прежнем секторе вместо ожидаемого чередования',
            tight: { p1: 400, floor: 120 }, style: 'pause', cadence: 1.03, telegraphMs: 815, speedMultiplier: 0.94, signatureEvery: 4, delay: [460, 5780], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '20/4@1600', label: '' },
                { id: 'b', tight: false, beats: '80/4@1600', label: '' },
                { id: 'c', tight: false, beats: '20/4@1600 80/4@1800', label: '' },
                { id: 'd', tight: false, beats: '35/5@1600 65/5@1800 50/6@2000', label: '' },
                { id: 'e', tight: false, beats: '15/7@1600 85/7@1800 50/8@2000', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '80/16@1600 80/20@1800 87/14@2000', label: 'Жернов делает второй оборот — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '80/16@1600 80/20@1800 16/21@2000', label: 'Жернов делает второй оборот — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '30/18@1600 16/21@1800 30/18@2000 87/14@2200', label: 'Жернов делает второй оборот — завершение' }
            ] },
        enem3: { title: 'Мучень', identity: 'Мука расходится веером',
            trick: 'разводит две цели, затем закрывает оставленную между ними полосу',
            tight: { p1: 400, floor: 120 }, style: 'straight', cadence: 0.91, telegraphMs: 720, speedMultiplier: 1.04, signatureEvery: 4, delay: [320, 5495], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '20/7@1600', label: '' },
                { id: 'b', tight: false, beats: '80/7@1600', label: '' },
                { id: 'c', tight: false, beats: '20/7@1600 80/7@1800', label: '' },
                { id: 'd', tight: false, beats: '32/9@1600 68/9@1800 18/11@2000', label: '' },
                { id: 'e', tight: false, beats: '40/14@1600 60/14@1800 25/17@2000 75/18@2200', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '18/16@1600 84/21@1800 52/18@2000', label: 'Мука расходится веером — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '18/16@1600 84/21@1800 52/14@2000', label: 'Мука расходится веером — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '18/20@1600 84/21@1800 52/18@2000 52/14@2200', label: 'Мука расходится веером — завершение' }
            ] },
        enem4: { title: 'Крылорез', identity: 'Лопасть возвращается',
            trick: 'ведёт прицел вдоль прохода, затем возвращает угрозу за спину прохода',
            tight: { p1: 400, floor: 120 }, style: 'weave', cadence: 0.77, telegraphMs: 605, speedMultiplier: 1.21, signatureEvery: 4, delay: [220, 5060], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '12/23@1600', label: '' },
                { id: 'b', tight: false, beats: '88/24@1600', label: '' },
                { id: 'c', tight: false, beats: '12/23@1600 88/24@1800', label: '' },
                { id: 'd', tight: false, beats: '14/6@1600 86/7@1800', label: '' },
                { id: 'e', tight: false, beats: '14/19@1600 86/18@1800 12/16@2000 88/16@2200', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '88/16@1600 70/14@1800 42/21@2000', label: 'Лопасть возвращается — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '88/16@1600 70/14@1800 88/20@2000', label: 'Лопасть возвращается — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '14/18@1600 42/21@1800 70/14@2000 88/20@2200', label: 'Лопасть возвращается — завершение' }
            ] },
        enem5: { title: 'Белоручка', identity: 'Мельничный подхват',
            trick: 'короткий первый заход продолжается более быстрым довеском с прежнего края',
            tight: { p1: 400, floor: 120 }, style: 'accelerate', cadence: 0.7, telegraphMs: 600, speedMultiplier: 1.19, signatureEvery: 4, delay: [245, 4715], firstWave: 2263,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '50/6@1600', label: '' },
                { id: 'b', tight: false, beats: '50/14@1600', label: '' },
                { id: 'c', tight: false, beats: '50/6@1600 50/14@1800', label: '' },
                { id: 'd', tight: false, beats: '25/9@1600 75/9@1800', label: '' },
                { id: 'e', tight: false, beats: '18/20@1600 82/21@1800', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '24/7@1600 24/20@1800 24/16@2000', label: 'Мельничный подхват — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '24/7@1600 24/20@1800 78/21@2000', label: 'Мельничный подхват — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '86/18@1600 32/14@1800 86/18@2000 78/21@2200 24/16@2400', label: 'Мельничный подхват — завершение' }
            ] }
    }
};
