// УРОВЕНЬ 12 (v3) — форма комбо извлечена из прежней версии, времена подобраны refit.js под честную модель (А11). Правится вручную по А11.
module.exports = {
    n: 12, timeNextBoss: 5, bossInterval: 5, tight: { p1: 500, floor: 170 },
    cfg: { levelCadence: 0.8, minWaveDelay: 2250, minShotDelay: 145, minTelegraphMs: 480 },
    phases: [
        { minHp: 0.66, cadence: 1, speed: 1, telegraphMultiplier: 1, surpriseChance: 0.12, maxActiveAttacks: 15 },
        { minHp: 0.31, cadence: 0.78, speed: 1.11, telegraphMultiplier: 0.9, surpriseChance: 0.23, maxActiveAttacks: 19 },
        { minHp: 0, cadence: 0.64, speed: 1.21, telegraphMultiplier: 0.84, surpriseChance: 0.32, maxActiveAttacks: 21 }
    ],
    bosses: {
        enem1: { title: 'Строевик', identity: '',
            trick: '',
            tight: { p1: 400, floor: 120 }, style: 'weave', cadence: 0.96, telegraphMs: 720, speedMultiplier: 1.08, signatureEvery: 4, delay: [270, 5600], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, beats: '8/11@2456 70/14@2299 16/18@2106', label: '' },
                { id: 'b', tight: false, beats: '92/11@2456 30/14@2299 82/18@2106', label: '' },
                { id: 'c', tight: false, beats: '16/11@2456 70/13@2457 8/17@2198', label: '' },
                { id: 'd', tight: false, beats: '8/11@2386 20/13@2457 30/15@2422 14/18@2366', label: '' },
                { id: 'e', tight: false, beats: '70/11@2386 20/14@2299 10/18@2106', label: '' },
                { id: 'f', tight: false, beats: '12/12@2348 70/15@2163 92/4@2930', label: '' },
                { id: 'g', tight: false, beats: '8/14@2040 70/13@2279 90/4@2834', label: '' }
            ] },
        enem2: { title: 'Колчанчик', identity: '',
            trick: '',
            tight: { p1: 400, floor: 120 }, style: 'accelerate', cadence: 0.98, telegraphMs: 760, speedMultiplier: 0.94, signatureEvery: 4, delay: [260, 5400], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, gaps: [250,550], beats: '10/20@1460 70/22@1583 84/18@2427', label: '' },
                { id: 'b', tight: false, gaps: [700,0], beats: '20/21@1390 30/19@2236 90/21@2345', label: '' },
                { id: 'c', tight: false, gaps: [0,0], beats: '14/18@1622 70/20@1715 28/21@1900', label: '' },
                { id: 'd', tight: false, beats: '8/15@1786 30/17@1865 12/22@1866', label: '' },
                { id: 'e', tight: false, gaps: [450,1100], beats: '30/3@2990 22/20@1910 88/22@2878', label: '' },
                { id: 'f', tight: false, beats: '8/4@1898 70/20@1567 22/23@1702', label: '' },
                { id: 'g', tight: false, gaps: [350,450,0], beats: '20/22@1328 30/20@1810 86/21@2190 70/23@2325', label: '' }
            ] },
        enem3: { title: 'Дубинщик', identity: '',
            trick: '',
            tight: { p1: 400, floor: 120 }, style: 'lateRush', cadence: 1.18, telegraphMs: 920, speedMultiplier: 0.88, signatureEvery: 4, delay: [320, 5800], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, beats: '10/12@2694 70/16@2728 12/22@2465', label: '' },
                { id: 'b', tight: false, beats: '90/12@2694 30/16@2728 88/22@2465', label: '' },
                { id: 'c', tight: false, beats: '10/12@2694 70/17@2590 24/23@2391', label: '' },
                { id: 'd', tight: false, beats: '92/12@2694 30/16@2728 82/22@2465', label: '' },
                { id: 'e', tight: false, beats: '12/6@2866 90/17@2590 30/16@2859', label: '' },
                { id: 'f', tight: false, beats: '10/14@2498 90/6@2914 70/16@2859', label: '' },
                { id: 'g', tight: false, beats: '88/12@2694 70/17@2590 82/23@2391', label: '' }
            ] },
        enem4: { title: 'Сабелька', identity: '',
            trick: '',
            tight: { p1: 400, floor: 120 }, style: 'pause', cadence: 0.94, telegraphMs: 700, speedMultiplier: 1.05, signatureEvery: 4, delay: [280, 5200], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, beats: '10/14@1600 12/13@1800 8/15@2000 14/18@2200', label: '' },
                { id: 'b', tight: false, beats: '90/16@1600 88/15@1800 92/12@2000 86/14@2200', label: '' },
                { id: 'c', tight: false, beats: '10/22@1600 14/22@1800', label: '' },
                { id: 'd', tight: false, beats: '88/24@1600 90/26@1800 86/24@2000', label: '' },
                { id: 'e', tight: false, beats: '10/14@1600 12/13@1800 88/24@2000', label: '' },
                { id: 'f', tight: false, beats: '90/16@1600 88/15@1800 14/22@2000', label: '' },
                { id: 'g', tight: false, beats: '10/15@1600 12/16@1800 88/13@2000', label: '' }
            ] },
        enem5: { title: 'Барабань', identity: '',
            trick: '',
            tight: { p1: 400, floor: 120 }, style: 'straight', cadence: 0.68, telegraphMs: 600, speedMultiplier: 1.22, signatureEvery: 4, delay: [210, 4800], firstWave: 2304,
            combos: [
                { id: 'a', tight: false, beats: '8/12@1600 92/14@1800', label: '' },
                { id: 'b', tight: false, beats: '8/14@1600 92/12@1800', label: '' },
                { id: 'c', tight: false, beats: '8/13@1600 92/11@1800 8/11@2000 92/13@2200', label: '' },
                { id: 'd', tight: false, beats: '8/12@1600 92/14@1800 8/14@2000 92/12@2200 8/13@2400 92/11@2600 8/11@2800 92/13@3000', label: '' },
                { id: 'e', tight: false, beats: '28/3@1600 72/4@1800', label: '' },
                { id: 'f', tight: false, beats: '12/22@1600 88/24@1800', label: '' },
                { id: 'g', tight: false, beats: '8/12@1600 28/3@1800 92/14@2000 88/24@2200 72/4@2400', label: '' }
            ] }
    }
};
