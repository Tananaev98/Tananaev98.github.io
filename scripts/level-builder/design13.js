// УРОВЕНЬ 13 (v3) — форма комбо извлечена из прежней версии, времена подобраны refit.js под честную модель (А11). Правится вручную по А11.
module.exports = {
    n: 13, timeNextBoss: 5, bossInterval: 5, tight: { p1: 500, floor: 170 },
    cfg: { levelCadence: 0.79, minWaveDelay: 2230, minShotDelay: 145, minTelegraphMs: 480 },
    phases: [
        { minHp: 0.66, cadence: 1, speed: 1, telegraphMultiplier: 1, surpriseChance: 0.12, maxActiveAttacks: 15 },
        { minHp: 0.31, cadence: 0.78, speed: 1.12, telegraphMultiplier: 0.9, surpriseChance: 0.23, maxActiveAttacks: 19 },
        { minHp: 0, cadence: 0.64, speed: 1.22, telegraphMultiplier: 0.84, surpriseChance: 0.32, maxActiveAttacks: 21 }
    ],
    bosses: {
        enem1: { title: 'Когтехват', identity: '',
            trick: '',
            tight: { p1: 400, floor: 120 }, style: 'lateRush', cadence: 1.02, telegraphMs: 780, speedMultiplier: 1.04, signatureEvery: 4, delay: [290, 5600], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, beats: '90/10@1600 88/11@1800 92/9@2000', label: '' },
                { id: 'b', tight: false, beats: '86/12@1600 90/10@1800 88/11@2000', label: '' },
                { id: 'c', tight: false, beats: '90/10@1600 88/11@1800 92/9@2000 86/12@2200 90/10@2400', label: '' },
                { id: 'd', tight: false, beats: '90/22@1600 86/24@1800', label: '' },
                { id: 'e', tight: false, beats: '92/13@1600 92/15@1800 88/14@2000', label: '' },
                { id: 'f', tight: false, beats: '90/4@1600 92/20@1800', label: '' },
                { id: 'g', tight: false, beats: '92/9@1600 86/8@1800 88/15@2000 90/22@2200', label: '' }
            ] },
        enem2: { title: 'Ухух', identity: '',
            trick: '',
            tight: { p1: 400, floor: 120 }, style: 'pause', cadence: 0.96, telegraphMs: 700, speedMultiplier: 1.08, signatureEvery: 4, delay: [250, 5200], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, beats: '8/8@1600 92/9@1800', label: '' },
                { id: 'b', tight: false, beats: '8/4@1600 92/5@1800', label: '' },
                { id: 'c', tight: false, beats: '8/8@1600 92/5@1800 92/9@2000 8/4@2200', label: '' },
                { id: 'd', tight: false, beats: '8/22@1600 92/24@1800', label: '' },
                { id: 'e', tight: false, beats: '10/12@1600 90/13@1800 10/20@2000', label: '' },
                { id: 'f', tight: false, beats: '8/16@1600 92/5@1800', label: '' },
                { id: 'g', tight: false, beats: '8/8@1600 92/9@1800 8/4@2000 92/24@2200', label: '' }
            ] },
        enem3: { title: 'Хаптун', identity: '',
            trick: '',
            tight: { p1: 400, floor: 120 }, style: 'drift', cadence: 1.14, telegraphMs: 900, speedMultiplier: 0.9, signatureEvery: 4, delay: [340, 6000], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, beats: '18/6@1600 50/5@1800', label: '' },
                { id: 'b', tight: false, beats: '18/6@1600 50/5@1800 82/7@2000', label: '' },
                { id: 'c', tight: false, beats: '18/5@1600 50/6@1800 82/5@2000', label: '' },
                { id: 'd', tight: false, beats: '28/3@1600 72/4@1800', label: '' },
                { id: 'e', tight: false, beats: '20/22@1600 80/24@1800', label: '' },
                { id: 'f', tight: false, beats: '18/6@1600 34/8@1800 82/7@2000 66/7@2200', label: '' },
                { id: 'g', tight: false, beats: '50/5@1600 50/6@1800 28/3@2000 80/24@2200 50/5@2400', label: '' }
            ] },
        enem4: { title: 'Долбун', identity: '',
            trick: '',
            tight: { p1: 400, floor: 120 }, style: 'weave', cadence: 0.88, telegraphMs: 620, speedMultiplier: 1.14, signatureEvery: 4, delay: [230, 5000], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, beats: '8/14@1600 10/15@1800 8/13@2000', label: '' },
                { id: 'b', tight: false, beats: '8/14@1600 10/15@1800 8/13@2000 12/15@2200 8/14@2400', label: '' },
                { id: 'c', tight: false, beats: '10/22@1600 14/24@1800', label: '' },
                { id: 'd', tight: false, beats: '10/22@1600 14/24@1800 8/26@2000 12/20@2200', label: '' },
                { id: 'e', tight: false, beats: '10/12@1600 12/15@1800 10/11@2000', label: '' },
                { id: 'f', tight: false, beats: '8/14@1600 8/13@1800 90/18@2000', label: '' },
                { id: 'g', tight: false, beats: '12/15@1600 14/15@1800 88/22@2000 8/9@2200', label: '' }
            ] },
        enem5: { title: 'Токовик', identity: '',
            trick: '',
            tight: { p1: 400, floor: 120 }, style: 'accelerate', cadence: 0.7, telegraphMs: 610, speedMultiplier: 1.16, signatureEvery: 4, delay: [210, 4700], firstWave: 2256,
            combos: [
                { id: 'a', tight: false, beats: '16/12@1600 32/14@1800 48/13@2000', label: '' },
                { id: 'b', tight: false, beats: '16/12@1600 32/14@1800 48/13@2000 64/15@2200 80/12@2400', label: '' },
                { id: 'c', tight: false, beats: '30/3@1600 70/4@1800', label: '' },
                { id: 'd', tight: false, beats: '20/22@1600 80/24@1800', label: '' },
                { id: 'e', tight: false, beats: '90/11@1600 8/10@1800 92/9@2000 10/11@2200', label: '' },
                { id: 'f', tight: false, beats: '48/13@1600 30/3@1800 50/26@2000', label: '' },
                { id: 'g', tight: false, beats: '16/12@1600 80/12@1800 70/4@2000 20/22@2200 92/16@2400', label: '' }
            ] }
    }
};
