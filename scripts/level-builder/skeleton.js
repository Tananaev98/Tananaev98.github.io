// УРОВЕНЬ 28 (v3) — форма комбо извлечена из прежней версии, времена подобраны refit.js под честную модель (А11). Правится вручную по А11.
module.exports = {
    n: 28, timeNextBoss: 5, bossInterval: 5, tight: { p1: 500, floor: 170 },
    cfg: { levelCadence: 0.88, minWaveDelay: 2100, minShotDelay: 146, minTelegraphMs: 545 },
    phases: [
        { minHp: 0.65, cadence: 1, speed: 1, telegraphMultiplier: 1, surpriseChance: 0.14, maxActiveAttacks: 14 },
        { minHp: 0.31, cadence: 0.86, speed: 1.1, telegraphMultiplier: 0.93, surpriseChance: 0.24, maxActiveAttacks: 17 },
        { minHp: 0, cadence: 0.72, speed: 1.2, telegraphMultiplier: 0.85, surpriseChance: 0.35, maxActiveAttacks: 21 }
    ],
    bosses: {
        enem1: { title: 'Алевка', identity: 'Ягода срывается с ветки',
            trick: 'двойной выпад иногда получает третий укус с другой стороны',
            tight: { p1: 400, floor: 120 }, style: 'lateRush', cadence: 1.03, telegraphMs: 800, speedMultiplier: 1.2, signatureEvery: 4, delay: [180, 5600], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '14/6@1600 86/7@1800', label: '' },
                { id: 'b', tight: false, beats: '12/16@1600 88/17@1800', label: '' },
                { id: 'c', tight: false, beats: '22/9@1600 78/10@1800 10/8@2000', label: '' },
                { id: 'd', tight: false, beats: '45/14@1600 55/14@1800 90/8@2000', label: '' },
                { id: 'e', tight: false, beats: '16/13@1600 84/14@1800 12/16@2000 88/17@2200', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '22/16@1600 22/20@1800', label: 'Ягода срывается с ветки — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '22/16@1600 22/20@1800 80/21@2000', label: 'Ягода срывается с ветки — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '87/18@1600 32/14@1800 87/18@2000 80/21@2200', label: 'Ягода срывается с ветки — завершение' }
            ] },
        enem2: { title: 'Колючница', identity: 'Шип после ягодки',
            trick: 'медленный первый снаряд остаётся фоном для более срочного второго',
            tight: { p1: 400, floor: 120 }, style: 'straight', cadence: 0.94, telegraphMs: 760, speedMultiplier: 1.0, speedVariance: [0.92, 0.98, 1.04, 1.1, 1.16], signatureEvery: 4, delay: [210, 4400], firstWave: 2112,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '10/22@1600 90/23@1800', label: '' },
                { id: 'b', tight: false, beats: '12/5@1600 88/5@1800', label: '' },
                { id: 'c', tight: false, beats: '16/18@1600 84/19@1800 18/9@2000', label: '' },
                { id: 'd', tight: false, beats: '22/14@1600 78/14@1800 82/9@2000', label: '' },
                { id: 'e', tight: false, beats: '10/22@1600 16/18@1800 90/23@2000 84/19@2200', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '84/7@1600 70/21@1800', label: 'Шип после ягодки — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '84/7@1600 70/21@1800 84/20@2000', label: 'Шип после ягодки — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '84/7@1600 34/18@1800 70/21@2000 84/20@2200', label: 'Шип после ягодки — завершение' }
            ] },
        enem3: { title: 'Гроздяна', identity: 'Гроздь рассыпается',
            trick: 'сводит угрозы с краёв к внутренним полосам, затем размыкает рисунок',
            tight: { p1: 400, floor: 120 }, style: 'drift', cadence: 1.17, telegraphMs: 1000, speedMultiplier: 1.0, signatureEvery: 4, delay: [230, 6500], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '16/3@1600 64/3@1800', label: '' },
                { id: 'b', tight: false, beats: '26/6@1600 74/6@1800', label: '' },
                { id: 'c', tight: false, beats: '40/4@1600 88/4@1800 10/5@2000', label: '' },
                { id: 'd', tight: false, beats: '12/10@1600 88/10@1800 90/5@2000', label: '' },
                { id: 'e', tight: false, beats: '16/3@1600 64/3@1800 26/6@2000 74/6@2200', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '14/16@1600 86/21@1800 30/14@2000 68/18@2200', label: 'Гроздь рассыпается — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '14/16@1600 86/21@1800 14/20@2000', label: 'Гроздь рассыпается — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '30/14@1600 68/18@1800 14/16@2000 86/21@2200', label: 'Гроздь рассыпается — завершение' }
            ] },
        enem4: { title: 'Сеточка', identity: 'Сетка кожуры рвётся',
            trick: 'показывает боковой замах, но заканчивает серединой; позднее конец возвращается на край',
            tight: { p1: 400, floor: 120 }, style: 'pause', cadence: 0.9, telegraphMs: 700, speedMultiplier: 1.25, speedVariance: [0.9, 0.96, 1.02, 1.08, 1.14], signatureEvery: 4, delay: [260, 7100], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, beats: '14/6@1600 32/6@1800', label: '' },
                { id: 'b', tight: false, open: 0, beats: '50/3@1600', label: '' },
                { id: 'c', tight: false, beats: '20/16@1600 80/17@1800 45/20@2000', label: '' },
                { id: 'd', tight: false, beats: '55/21@1600 10/4@1800 90/4@2000', label: '' },
                { id: 'e', tight: false, beats: '14/6@1600 32/6@1800 20/16@2000 80/17@2200', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '78/16@1600 64/14@1800 51/18@2000', label: 'Сетка кожуры рвётся — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '78/16@1600 64/14@1800 78/20@2000', label: 'Сетка кожуры рвётся — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '16/21@1600 51/18@1800 64/14@2000 78/20@2200', label: 'Сетка кожуры рвётся — завершение' }
            ] },
        enem5: { title: 'Полосатень', identity: 'Полосатый раскат',
            trick: 'ведёт прицел вдоль прохода, затем возвращает угрозу за спину прохода',
            tight: { p1: 400, floor: 120 }, style: 'accelerate', cadence: 0.87, telegraphMs: 715, speedMultiplier: 1.1, speedVariance: [0.88, 0.96, 1.04, 1.12, 1.2], signatureEvery: 4, delay: [195, 4500], firstWave: 2160,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '10/4@1600 24/6@1800', label: '' },
                { id: 'b', tight: false, beats: '85/4@1600 50/5@1800', label: '' },
                { id: 'c', tight: false, beats: '14/9@1600 30/12@1800 18/15@2000', label: '' },
                { id: 'd', tight: false, beats: '36/8@1600 16/14@1800 22/17@2000', label: '' },
                { id: 'e', tight: false, beats: '40/7@1600 60/7@1800 50/22@2000', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '18/16@1600 40/14@1800 62/21@2000', label: 'Полосатый раскат — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '18/16@1600 40/14@1800 18/20@2000', label: 'Полосатый раскат — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '84/18@1600 62/21@1800 40/14@2000 18/20@2200', label: 'Полосатый раскат — завершение' }
            ] }
    }
};
