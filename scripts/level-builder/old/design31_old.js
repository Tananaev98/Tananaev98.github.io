// УРОВЕНЬ 31 (v3) — форма комбо извлечена из прежней версии, времена подобраны refit.js под честную модель (А11). Правится вручную по А11.
module.exports = {
    n: 31, timeNextBoss: 5, bossInterval: 5, tight: { p1: 500, floor: 170 },
    cfg: { levelCadence: 0.92, minWaveDelay: 2150, minShotDelay: 150, minTelegraphMs: 545 },
    phases: [
        { minHp: 0.65, cadence: 1, speed: 1, telegraphMultiplier: 1, surpriseChance: 0.15, maxActiveAttacks: 15 },
        { minHp: 0.3, cadence: 0.85, speed: 1.12, telegraphMultiplier: 0.9, surpriseChance: 0.26, maxActiveAttacks: 18 },
        { minHp: 0, cadence: 0.7, speed: 1.24, telegraphMultiplier: 0.82, surpriseChance: 0.36, maxActiveAttacks: 22 }
    ],
    bosses: {
        enem1: { title: 'Резак', identity: '',
            trick: '',
            tight: { p1: 400, floor: 120 }, style: 'wave', cadence: 1, telegraphMs: 880, speedMultiplier: 0.95, signatureEvery: 4, delay: [360, 5900], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, beats: '16/6@1600~6,0.7,0 84/7@1800~8,0.8,0', label: '' },
                { id: 'b', tight: false, beats: '18/15@1600~8,0.8,0 82/16@1800~7,0.9,0', label: '' },
                { id: 'c', tight: false, beats: '24/8@1600~7,0.9,0 76/9@1800~9,0.6,0 12/4@2000~5,0.5,0', label: '' },
                { id: 'd', tight: false, beats: '30/11@1600~5,1.1,0 70/12@1800~6,1,0 88/5@2000~6,0.6,0', label: '' },
                { id: 'e', tight: false, beats: '16/6@1600~6,0.7,0 24/8@1800~7,0.9,0 30/11@2000~5,1.1,0 18/15@2200~8,0.8,0', label: '' },
                { id: 'f', tight: false, beats: '16/6@1600~6,0.7,0 84/7@1800~8,0.8,0 45/18@2000~10,0.6,0 55/19@2200~9,0.7,0', label: '' },
                { id: 'g', tight: false, beats: '50/4@1600~11,0.5,0 38/13@1800~6,1.2,0 62/13@2000~7,1.1,0 28/20@2200~9,0.9,0', label: '' }
            ] },
        enem2: { title: 'Клыкокрыл', identity: '',
            trick: '',
            tight: { p1: 400, floor: 120 }, style: 'wave', cadence: 0.95, telegraphMs: 780, speedMultiplier: 1.05, signatureEvery: 4, delay: [230, 4300], firstWave: 2064,
            combos: [
                { id: 'a', tight: false, beats: '18/10@1600~7,2.4,0 82/11@1800~9,2.1,0', label: '' },
                { id: 'b', tight: false, beats: '40/23@1600~6,3.2,0 60/24@1800~7,3,0', label: '' },
                { id: 'c', tight: false, beats: '26/14@1600~6,2.8,0 74/15@1800~8,2.5,0 32/11@2000~8,2.2,0', label: '' },
                { id: 'd', tight: false, beats: '12/19@1600~10,1.9,0 88/20@1800~11,2,0 68/11@2000~9,2.3,0', label: '' },
                { id: 'e', tight: false, beats: '20/7@1600~5,1.7,0 80/7@1800~5,1.8,0 18/10@2000~7,2.4,0 82/11@2200~9,2.1,0', label: '' },
                { id: 'f', tight: false, beats: '18/10@1600~7,2.4,0 82/11@1800~9,2.1,0 40/23@2000~6,3.2,0 60/24@2200~7,3,0', label: '' },
                { id: 'g', tight: false, beats: '50/5@1600~4,1.4,0 16/17@1800~10,2.6,0 84/17@2000~9,2.7,0 50/25@2200~8,3.1,0', label: '' }
            ] },
        enem3: { title: 'Древогрыз', identity: '',
            trick: '',
            tight: { p1: 400, floor: 120 }, style: 'lateRush', cadence: 1.15, telegraphMs: 980, speedMultiplier: 0.85, signatureEvery: 4, delay: [400, 6300], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, beats: '16/3@1600 40/4@1800', label: '' },
                { id: 'b', tight: false, beats: '64/3@1600 88/4@1800', label: '' },
                { id: 'c', tight: false, beats: '24/6@1600 76/6@1800 10/5@2000', label: '' },
                { id: 'd', tight: false, beats: '12/10@1600 88/10@1800 90/5@2000', label: '' },
                { id: 'e', tight: false, beats: '16/3@1600 40/4@1800 64/3@2000 88/4@2200', label: '' },
                { id: 'f', tight: false, beats: '16/3@1600 40/4@1800 45/19@2000 55/20@2200', label: '' },
                { id: 'g', tight: false, beats: '22/16@1600 78/17@1800 50/6@2000 30/22@2200', label: '' }
            ] },
        enem4: { title: 'Корнеход', identity: '',
            trick: '',
            tight: { p1: 400, floor: 120 }, style: 'accelerate', cadence: 0.9, telegraphMs: 750, speedMultiplier: 1.05, signatureEvery: 4, delay: [280, 5000], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, beats: '14/5@1600 86/5@1800', label: '' },
                { id: 'b', tight: false, beats: '22/8@1600 78/8@1800', label: '' },
                { id: 'c', tight: false, beats: '12/13@1600 88/13@1800 46/12@2000 54/12@2200', label: '' },
                { id: 'd', tight: false, beats: '10/4@1600 90/4@1800 30/7@2000 70/7@2200', label: '' },
                { id: 'e', tight: false, beats: '14/5@1600 86/5@1800 22/8@2000 78/8@2200', label: '' },
                { id: 'f', tight: false, beats: '14/5@1600 86/5@1800 20/22@2000 80/23@2200', label: '' },
                { id: 'g', tight: false, beats: '50/24@1600 30/7@1800 70/7@2000 40/26@2200', label: '' }
            ] },
        enem5: { title: 'Шестовик', identity: '',
            trick: '',
            tight: { p1: 400, floor: 120 }, style: 'straight', cadence: 0.85, telegraphMs: 700, speedMultiplier: 1.08, signatureEvery: 4, delay: [250, 4600], firstWave: 2208,
            combos: [
                { id: 'a', tight: false, beats: '12/22@1600 88/23@1800', label: '' },
                { id: 'b', tight: false, beats: '18/18@1600 82/19@1800', label: '' },
                { id: 'c', tight: false, beats: '24/14@1600 76/14@1800 20/9@2000 80/9@2200', label: '' },
                { id: 'd', tight: false, beats: '14/5@1600 86/5@1800 50/4@2000', label: '' },
                { id: 'e', tight: false, beats: '12/22@1600 88/23@1800 18/18@2000 82/19@2200', label: '' },
                { id: 'f', tight: false, beats: '12/22@1600 88/23@1800 30/25@2000 70/26@2200', label: '' },
                { id: 'g', tight: false, beats: '20/9@1600 80/9@1800 40/17@2000 60/17@2200 50/27@2400', label: '' }
            ] }
    }
};
