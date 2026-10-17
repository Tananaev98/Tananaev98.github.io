// УРОВЕНЬ 36 (v3) — форма комбо извлечена из прежней версии, времена подобраны refit.js под честную модель (А11). Правится вручную по А11.
module.exports = {
    n: 36, timeNextBoss: 5, bossInterval: 5, tight: { p1: 500, floor: 170 },
    cfg: { levelCadence: 0.86, minWaveDelay: 2020, minShotDelay: 140, minTelegraphMs: 520 },
    phases: [
        { minHp: 0.65, cadence: 1, speed: 1, telegraphMultiplier: 1, surpriseChance: 0.16, maxActiveAttacks: 16 },
        { minHp: 0.3, cadence: 0.81, speed: 1.16, telegraphMultiplier: 0.87, surpriseChance: 0.29, maxActiveAttacks: 19 },
        { minHp: 0, cadence: 0.66, speed: 1.28, telegraphMultiplier: 0.79, surpriseChance: 0.4, maxActiveAttacks: 24 }
    ],
    bosses: {
        enem1: { title: 'Серебрянка', identity: 'Серебряный отблеск',
            trick: 'двойной выпад иногда получает третий укус с другой стороны',
            tight: { p1: 400, floor: 120 }, style: 'wave', cadence: 1.05, telegraphMs: 810, speedMultiplier: 1.03, signatureEvery: 4, delay: [220, 4600], firstWave: 2208,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '16/10@1600~6,1.9,0 84/11@1800~7,1.7,0', label: '' },
                { id: 'b', tight: false, beats: '40/22@1600~5,2.6,0 60/23@1800~6,2.4,0', label: '' },
                { id: 'c', tight: false, beats: '24/13@1600~5,2.2,0 76/14@1800~6,2,0 45/16@2000~6,1.8,0', label: '' },
                { id: 'd', tight: false, beats: '12/18@1600~8,1.4,0 88/19@1800~9,1.3,0 55/16@2000~7,1.7,0', label: '' },
                { id: 'e', tight: false, beats: '16/10@1600~6,1.9,0 24/13@1800~5,2.2,0 12/18@2000~8,1.4,0 40/22@2200~5,2.6,0', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '26/16@1600~6,1.2,0 26/20@1800~6,1.2,0', label: 'Серебряный отблеск — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '26/16@1600~6,1.2,0 26/20@1800~6,1.2,0 82/21@2000~6,1.2,0', label: 'Серебряный отблеск — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '70/18@1600~6,1.2,0 34/14@1800~6,1.2,0 70/18@2000~6,1.2,0 82/21@2200~6,1.2,0', label: 'Серебряный отблеск — завершение' }
            ] },
        enem2: { title: 'Красноплав', identity: 'Разгон плавников',
            trick: 'короткий первый заход продолжается более быстрым довеском с прежнего края',
            tight: { p1: 400, floor: 120 }, style: 'accelerate', cadence: 0.98, telegraphMs: 760, speedMultiplier: 1, signatureEvery: 4, delay: [280, 4509], firstWave: 2164,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '14/6@1600 86/6@1800', label: '' },
                { id: 'b', tight: false, beats: '22/9@1600 78/9@1800', label: '' },
                { id: 'c', tight: false, beats: '12/14@1600 88/14@1800 46/13@2000 54/13@2200', label: '' },
                { id: 'd', tight: false, beats: '10/4@1600 90/4@1800 30/8@2000 70/8@2200', label: '' },
                { id: 'e', tight: false, beats: '14/6@1600 86/6@1800 22/9@2000 78/9@2200', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '78/7@1600 78/20@1800 78/16@2000', label: 'Разгон плавников — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '78/7@1600 78/20@1800 14/21@2000', label: 'Разгон плавников — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '30/18@1600 86/14@1800 30/18@2000 14/21@2200 78/16@2400', label: 'Разгон плавников — завершение' }
            ] },
        enem3: { title: 'Полосатик', identity: 'Полосы возвращаются',
            trick: 'повторяет удар в прежнем секторе вместо ожидаемого чередования',
            tight: { p1: 400, floor: 120 }, style: 'wave', cadence: 0.94, telegraphMs: 850, speedMultiplier: 0.94, signatureEvery: 4, delay: [300, 5865], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '16/8@1600~7,1.3,0 84/9@1800~8,1.2,0', label: '' },
                { id: 'b', tight: false, beats: '40/19@1600~5,2.2,0 60/20@1800~6,2.1,0', label: '' },
                { id: 'c', tight: false, beats: '24/10@1600~6,1.6,0 76/11@1800~7,1.5,0 45/12@2000~6,1.7,0', label: '' },
                { id: 'd', tight: false, beats: '12/14@1600~5,1.9,0 88/15@1800~6,1.8,0 55/12@2000~7,1.6,0', label: '' },
                { id: 'e', tight: false, beats: '16/8@1600~7,1.3,0 24/10@1800~6,1.6,0 12/14@2000~5,1.9,0 40/19@2200~5,2.2,0', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '16/16@1600~6,1.2,0 16/20@1800~6,1.2,0 28/14@2000~6,1.2,0', label: 'Полосы возвращаются — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '16/16@1600~6,1.2,0 16/20@1800~6,1.2,0 74/21@2000~6,1.2,0', label: 'Полосы возвращаются — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '88/18@1600~6,1.2,0 74/21@1800~6,1.2,0 88/18@2000~6,1.2,0 28/14@2200~6,1.2,0', label: 'Полосы возвращаются — завершение' }
            ] },
        enem4: { title: 'Усач', identity: 'Усы охватывают дно',
            trick: 'сводит угрозы с краёв к внутренним полосам, затем размыкает рисунок',
            tight: { p1: 400, floor: 120 }, style: 'wave', cadence: 0.9, telegraphMs: 940, speedMultiplier: 0.84, signatureEvery: 4, delay: [420, 7106], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '16/3@1600~9,0.5,0 64/3@1800~9,0.5,0', label: '' },
                { id: 'b', tight: false, beats: '40/4@1600~10,0.4,0 88/4@1800~10,0.4,0', label: '' },
                { id: 'c', tight: false, beats: '24/6@1600~7,0.7,0 76/6@1800~8,0.6,0 10/5@2000~6,0.6,0', label: '' },
                { id: 'd', tight: false, beats: '12/10@1600~5,1,0 88/10@1800~6,0.9,0 90/5@2000~6,0.6,0', label: '' },
                { id: 'e', tight: false, beats: '16/3@1600~9,0.5,0 64/3@1800~9,0.5,0 24/6@2000~7,0.7,0 76/6@2200~8,0.6,0', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '86/16@1600~6,1.2,0 14/21@1800~6,1.2,0 70/14@2000~6,1.2,0 30/18@2200~6,1.2,0', label: 'Усы охватывают дно — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '86/16@1600~6,1.2,0 14/21@1800~6,1.2,0 86/20@2000~6,1.2,0', label: 'Усы охватывают дно — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '70/14@1600~6,1.2,0 30/18@1800~6,1.2,0 86/16@2000~6,1.2,0 14/21@2200~6,1.2,0', label: 'Усы охватывают дно — завершение' }
            ] },
        enem5: { title: 'Зубарь', identity: 'Щучья засада',
            trick: 'медленный первый снаряд остаётся фоном для более срочного второго',
            tight: { p1: 400, floor: 120 }, style: 'lateRush', cadence: 0.8, telegraphMs: 1000, speedMultiplier: 0.78, signatureEvery: 4, delay: [460, 5950], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '14/4@1600 86/4@1800', label: '' },
                { id: 'b', tight: false, beats: '22/6@1600 78/6@1800', label: '' },
                { id: 'c', tight: false, beats: '12/12@1600 88/12@1800 10/3@2000 90/3@2200', label: '' },
                { id: 'd', tight: false, beats: '20/24@1600 80/25@1800 50/26@2000', label: '' },
                { id: 'e', tight: false, beats: '14/4@1600 86/4@1800 22/6@2000 78/6@2200', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '20/7@1600 36/21@1800', label: 'Щучья засада — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '20/7@1600 36/21@1800 20/20@2000', label: 'Щучья засада — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '20/7@1600 66/18@1800 36/21@2000 20/20@2200', label: 'Щучья засада — завершение' }
            ] }
    }
};
