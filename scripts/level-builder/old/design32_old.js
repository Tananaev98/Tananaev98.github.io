// УРОВЕНЬ 32 (v3) — форма комбо извлечена из прежней версии, времена подобраны refit.js под честную модель (А11). Правится вручную по А11.
module.exports = {
    n: 32, timeNextBoss: 5, bossInterval: 5, tight: { p1: 500, floor: 170 },
    cfg: { levelCadence: 0.9, minWaveDelay: 2100, minShotDelay: 148, minTelegraphMs: 540 },
    phases: [
        { minHp: 0.65, cadence: 1, speed: 1, telegraphMultiplier: 1, surpriseChance: 0.15, maxActiveAttacks: 15 },
        { minHp: 0.3, cadence: 0.84, speed: 1.13, telegraphMultiplier: 0.89, surpriseChance: 0.27, maxActiveAttacks: 18 },
        { minHp: 0, cadence: 0.69, speed: 1.25, telegraphMultiplier: 0.81, surpriseChance: 0.37, maxActiveAttacks: 22 }
    ],
    bosses: {
        enem1: { title: 'Мохогляд', identity: 'Взгляд из мха',
            trick: 'медленный первый снаряд остаётся фоном для более срочного второго',
            tight: { p1: 400, floor: 120 }, style: 'wave', cadence: 0.98, telegraphMs: 870, speedMultiplier: 0.94, signatureEvery: 4, delay: [360, 5900], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '16/6@1600~7,0.6,0 84/7@1800~8,0.7,0', label: '' },
                { id: 'b', tight: false, beats: '18/15@1600~7,0.7,0 82/16@1800~6,0.8,0', label: '' },
                { id: 'c', tight: false, beats: '24/8@1600~6,0.9,0 76/9@1800~9,0.5,0 12/4@2000~5,0.4,0', label: '' },
                { id: 'd', tight: false, beats: '30/11@1600~5,1,0 70/12@1800~6,0.9,0 88/5@2000~6,0.5,0', label: '' },
                { id: 'e', tight: false, beats: '16/6@1600~7,0.6,0 24/8@1800~6,0.9,0 30/11@2000~5,1,0 18/15@2200~7,0.7,0', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '18/7@1600~6,1.2,0 34/21@1800~6,1.2,0', label: 'Взгляд из мха — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '18/7@1600~6,1.2,0 34/21@1800~6,1.2,0 18/20@2000~6,1.2,0', label: 'Взгляд из мха — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '18/7@1600~6,1.2,0 70/18@1800~6,1.2,0 34/21@2000~6,1.2,0 18/20@2200~6,1.2,0', label: 'Взгляд из мха — завершение' }
            ] },
        enem2: { title: 'Вёслыч', identity: 'Гребок назад',
            trick: 'ведёт прицел вдоль прохода, затем возвращает угрозу за спину прохода',
            tight: { p1: 400, floor: 120 }, style: 'wave', cadence: 0.92, telegraphMs: 800, speedMultiplier: 1, signatureEvery: 4, delay: [270, 4700], firstWave: 2256,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '18/9@1600~6,1.3,0 82/10@1800~7,1.2,0', label: '' },
                { id: 'b', tight: false, beats: '40/22@1600~5,1.7,0 60/23@1800~6,1.6,0', label: '' },
                { id: 'c', tight: false, beats: '26/13@1600~5,1.5,0 74/14@1800~6,1.4,0 32/10@2000~7,1.3,0', label: '' },
                { id: 'd', tight: false, beats: '12/18@1600~8,1.1,0 88/19@1800~9,1,0 68/10@2000~8,1.2,0', label: '' },
                { id: 'e', tight: false, beats: '20/6@1600~4,0.9,0 80/6@1800~4,1,0 18/9@2000~6,1.3,0 82/10@2200~7,1.2,0', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '86/16@1600~6,1.2,0 68/14@1800~6,1.2,0 42/21@2000~6,1.2,0', label: 'Гребок назад — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '86/16@1600~6,1.2,0 68/14@1800~6,1.2,0 86/20@2000~6,1.2,0', label: 'Гребок назад — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '20/18@1600~6,1.2,0 42/21@1800~6,1.2,0 68/14@2000~6,1.2,0 86/20@2200~6,1.2,0', label: 'Гребок назад — завершение' }
            ] },
        enem3: { title: 'Зубоплот', identity: 'Доски плота смыкаются',
            trick: 'сводит угрозы с краёв к внутренним полосам, затем размыкает рисунок',
            tight: { p1: 400, floor: 120 }, style: 'drift', cadence: 1.1, telegraphMs: 950, speedMultiplier: 0.86, signatureEvery: 4, delay: [400, 6200], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '16/3@1600 40/4@1800', label: '' },
                { id: 'b', tight: false, beats: '64/3@1600 88/4@1800', label: '' },
                { id: 'c', tight: false, beats: '24/6@1600 76/6@1800 10/5@2000', label: '' },
                { id: 'd', tight: false, beats: '12/10@1600 88/10@1800 90/5@2000', label: '' },
                { id: 'e', tight: false, beats: '16/3@1600 40/4@1800 64/3@2000 88/4@2200', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '12/16@1600 82/21@1800 30/14@2000 66/18@2200', label: 'Доски плота смыкаются — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '12/16@1600 82/21@1800 12/20@2000', label: 'Доски плота смыкаются — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '30/14@1600 66/18@1800 12/16@2000 82/21@2200', label: 'Доски плота смыкаются — завершение' }
            ] },
        enem4: { title: 'Крючень', identity: 'Крюк за борт',
            trick: 'показывает боковой замах, но заканчивает серединой; позднее конец возвращается на край',
            tight: { p1: 400, floor: 120 }, style: 'wave', cadence: 1.05, telegraphMs: 760, speedMultiplier: 1.05, signatureEvery: 4, delay: [240, 4300], firstWave: 2064,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '14/8@1600~6,2.2,0 86/9@1800~7,2,0', label: '' },
                { id: 'b', tight: false, beats: '22/12@1600~5,2.6,0 78/13@1800~6,2.4,0', label: '' },
                { id: 'c', tight: false, beats: '12/17@1600~8,1.9,0 88/18@1800~9,1.8,0 46/12@2000~7,2.1,0 54/12@2200~7,2.2,0', label: '' },
                { id: 'd', tight: false, beats: '10/4@1600~4,1.4,0 90/4@1800~4,1.5,0 30/7@2000~5,1.7,0 70/7@2200~5,1.8,0', label: '' },
                { id: 'e', tight: false, beats: '14/8@1600~6,2.2,0 86/9@1800~7,2,0 22/12@2000~5,2.6,0 78/13@2200~6,2.4,0', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '24/16@1600~6,1.2,0 40/14@1800~6,1.2,0 52/18@2000~6,1.2,0', label: 'Крюк за борт — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '24/16@1600~6,1.2,0 40/14@1800~6,1.2,0 24/20@2000~6,1.2,0', label: 'Крюк за борт — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '86/21@1600~6,1.2,0 52/18@1800~6,1.2,0 40/14@2000~6,1.2,0 24/20@2200~6,1.2,0', label: 'Крюк за борт — завершение' }
            ] },
        enem5: { title: 'Пагодник', identity: 'Переправа вторым потоком',
            trick: 'две короткие группы разделены паузой; вторая группа меняет сторону',
            tight: { p1: 400, floor: 120 }, style: 'wave', cadence: 0.86, telegraphMs: 710, speedMultiplier: 1.08, signatureEvery: 4, delay: [250, 4600], firstWave: 2208,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '12/7@1600~8,1,0 88/8@1800~9,0.9,0', label: '' },
                { id: 'b', tight: false, beats: '24/11@1600~6,1.3,0 76/12@1800~7,1.2,0', label: '' },
                { id: 'c', tight: false, beats: '14/18@1600~10,0.8,0 86/19@1800~11,0.7,0 34/9@2000~7,1.1,0 66/9@2200~8,1,0', label: '' },
                { id: 'd', tight: false, beats: '45/23@1600~6,1.6,0 55/24@1800~7,1.5,0 50/4@2000~12,0.5,0', label: '' },
                { id: 'e', tight: false, beats: '12/7@1600~8,1,0 88/8@1800~9,0.9,0 24/11@2000~6,1.3,0 76/12@2200~7,1.2,0', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, gaps: [360, 900, 360], open: 1, beats: '78/16@1600~6,1.2,0 78/20@1800~6,1.2,0 16/21@2000~6,1.2,0 28/18@2200~6,1.2,0', label: 'Переправа вторым потоком — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, gaps: [360, 900, 360], beats: '78/16@1600~6,1.2,0 78/20@1800~6,1.2,0 28/18@2000~6,1.2,0', label: 'Переправа вторым потоком — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, gaps: [360, 900, 360], beats: '16/21@1600~6,1.2,0 28/18@1800~6,1.2,0 78/16@2000~6,1.2,0 78/20@2200~6,1.2,0', label: 'Переправа вторым потоком — завершение' }
            ] }
    }
};
