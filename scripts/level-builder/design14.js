// УРОВЕНЬ 14 (v3) — форма комбо извлечена из прежней версии, времена подобраны refit.js под честную модель (А11). Правится вручную по А11.
module.exports = {
    n: 14, timeNextBoss: 5, bossInterval: 5, tight: { p1: 500, floor: 170 },
    cfg: { levelCadence: 0.72, minWaveDelay: 2000, minShotDelay: 135, minTelegraphMs: 470 },
    phases: [
        { minHp: 0.66, cadence: 1, speed: 1, telegraphMultiplier: 1, surpriseChance: 0.14, maxActiveAttacks: 15 },
        { minHp: 0.31, cadence: 0.77, speed: 1.13, telegraphMultiplier: 0.9, surpriseChance: 0.27, maxActiveAttacks: 19 },
        { minHp: 0, cadence: 0.63, speed: 1.25, telegraphMultiplier: 0.83, surpriseChance: 0.38, maxActiveAttacks: 22 }
    ],
    bosses: {
        enem1: { title: 'Баюнище', identity: '',
            trick: '',
            tight: { p1: 400, floor: 120 }, style: 'pause', cadence: 1.02, telegraphMs: 820, speedMultiplier: 1.02, signatureEvery: 4, delay: [340, 6000], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, beats: '50/5@1600 40/7@1800 60/8@2000', label: '' },
                { id: 'b', tight: false, beats: '40/7@1600 60/8@1800 30/11@2000 70/12@2200', label: '' },
                { id: 'c', tight: false, beats: '36/21@1600 64/23@1800', label: '' },
                { id: 'd', tight: false, beats: '16/4@1600 84/6@1800', label: '' },
                { id: 'e', tight: false, beats: '50/9@1600 50/15@1800 50/25@2000', label: '' },
                { id: 'f', tight: false, beats: '30/11@1600 18/14@1800 36/21@2000', label: '' },
                { id: 'g', tight: false, beats: '70/12@1600 82/15@1800 64/23@2000 50/5@2200', label: '' },
                { id: 'h', tight: false, beats: '50/5@1600 30/11@1800 70/12@2000 36/21@2200 64/23@2400', label: '' }
            ] },
        enem2: { title: 'Каркун-Вещун', identity: '',
            trick: '',
            tight: { p1: 400, floor: 120 }, style: 'drift', cadence: 0.92, telegraphMs: 720, speedMultiplier: 1.08, signatureEvery: 4, delay: [300, 5500], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, beats: '14/18@1600 30/20@1800', label: '' },
                { id: 'b', tight: false, beats: '78/24@1600 90/15@1800 90/12@2000', label: '' },
                { id: 'c', tight: false, beats: '78/7@1600 50/5@1800 22/8@2000', label: '' },
                { id: 'd', tight: false, beats: '10/13@1600 10/15@1800 14/18@2000', label: '' },
                { id: 'e', tight: false, beats: '30/20@1600 50/25@1800', label: '' },
                { id: 'f', tight: false, beats: '90/12@1600 84/11@1800 50/9@2000 50/25@2200', label: '' },
                { id: 'g', tight: false, beats: '22/8@1600 10/13@1800 16/14@2000 14/18@2200', label: '' },
                { id: 'h', tight: false, beats: '14/18@1600 42/22@1800 90/15@2000 78/7@2200 50/5@2400', label: '' }
            ] },
        enem3: { title: 'Цепняк', identity: '',
            trick: '',
            tight: { p1: 400, floor: 120 }, style: 'straight', cadence: 1.05, telegraphMs: 780, speedMultiplier: 0.98, signatureEvery: 4, delay: [310, 5400], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, beats: '15/5@1600', label: '' },
                { id: 'b', tight: false, beats: '85/5@1600', label: '' },
                { id: 'c', tight: false, beats: '15/5@1600 85/5@1800', label: '' },
                { id: 'd', tight: false, beats: '15/5@1600 20/7@1800 12/9@2000', label: '' },
                { id: 'e', tight: false, beats: '85/5@1600 80/7@1800 88/9@2000', label: '' },
                { id: 'f', tight: false, beats: '50/4@1600 35/10@1800 65/10@2000', label: '' },
                { id: 'g', tight: false, beats: '15/5@1600 20/7@1800 12/9@2000 22/12@2200 15/16@2400 20/24@2600', label: '' },
                { id: 'h', tight: false, beats: '78/12@1600 85/16@1800 80/23@2000 50/21@2200', label: '' }
            ] },
        enem4: { title: 'Ступолёт', identity: '',
            trick: '',
            tight: { p1: 400, floor: 120 }, style: 'accelerate', cadence: 0.84, telegraphMs: 650, speedMultiplier: 1.12, signatureEvery: 4, delay: [290, 5200], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, beats: '12/12@1600 30/14@1800 48/17@2000', label: '' },
                { id: 'b', tight: false, beats: '88/11@1600 70/15@1800 52/18@2000', label: '' },
                { id: 'c', tight: false, beats: '66/21@1600 84/24@1800', label: '' },
                { id: 'd', tight: false, beats: '34/22@1600 16/26@1800', label: '' },
                { id: 'e', tight: false, beats: '20/5@1600 50/6@1800 80/7@2000', label: '' },
                { id: 'f', tight: false, beats: '12/12@1600 30/14@1800 48/17@2000 66/21@2200 84/24@2400', label: '' },
                { id: 'g', tight: false, beats: '88/11@1600 70/15@1800 52/18@2000 34/22@2200 16/26@2400', label: '' },
                { id: 'h', tight: false, beats: '10/10@1600 90/13@1800 50/25@2000', label: '' }
            ] },
        enem5: { title: 'Избач', identity: '',
            trick: '',
            tight: { p1: 400, floor: 120 }, style: 'lateRush', cadence: 0.75, telegraphMs: 640, speedMultiplier: 1.14, signatureEvery: 4, delay: [250, 4200], firstWave: 2016,
            combos: [
                { id: 'a', tight: false, beats: '50/6@1600', label: '' },
                { id: 'b', tight: false, beats: '50/18@1600', label: '' },
                { id: 'c', tight: false, beats: '50/6@1600 50/18@1800', label: '' },
                { id: 'd', tight: false, beats: '30/9@1600 70/9@1800 15/6@2000 85/6@2200', label: '' },
                { id: 'e', tight: false, beats: '25/15@1600 75/16@1800', label: '' },
                { id: 'f', tight: false, beats: '35/21@1600 65/22@1800 50/26@2000', label: '' },
                { id: 'g', tight: false, beats: '11/4@1600 30/4@1800 50/4@2000 69/4@2200 89/4@2400 50/12@2600', label: '' },
                { id: 'h', tight: false, beats: '50/6@1600 15/6@1800 25/15@2000 35/21@2200 50/12@2400', label: '' }
            ] }
    }
};
