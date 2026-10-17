// УРОВЕНЬ 35 (v3) — форма комбо извлечена из прежней версии, времена подобраны refit.js под честную модель (А11). Правится вручную по А11.
module.exports = {
    n: 35, timeNextBoss: 5, bossInterval: 5, tight: { p1: 500, floor: 170 },
    cfg: { levelCadence: 0.87, minWaveDelay: 2040, minShotDelay: 142, minTelegraphMs: 525 },
    phases: [
        { minHp: 0.65, cadence: 1, speed: 1, telegraphMultiplier: 1, surpriseChance: 0.16, maxActiveAttacks: 16 },
        { minHp: 0.3, cadence: 0.82, speed: 1.15, telegraphMultiplier: 0.88, surpriseChance: 0.29, maxActiveAttacks: 19 },
        { minHp: 0, cadence: 0.67, speed: 1.27, telegraphMultiplier: 0.79, surpriseChance: 0.39, maxActiveAttacks: 23 }
    ],
    bosses: {
        enem1: { title: 'Улитень', identity: 'Слизистый след',
            trick: 'медленный первый снаряд остаётся фоном для более срочного второго',
            tight: { p1: 400, floor: 120 }, style: 'drift', cadence: 1.15, telegraphMs: 990, speedMultiplier: 0.8, signatureEvery: 4, delay: [420, 5610], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '16/3@1600 40/4@1800', label: '' },
                { id: 'b', tight: false, beats: '64/3@1600 88/4@1800', label: '' },
                { id: 'c', tight: false, beats: '24/6@1600 76/6@1800 10/5@2000', label: '' },
                { id: 'd', tight: false, beats: '12/10@1600 88/10@1800 90/5@2000', label: '' },
                { id: 'e', tight: false, beats: '16/3@1600 40/4@1800 64/3@2000 88/4@2200', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '14/7@1600 30/21@1800', label: 'Слизистый след — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '14/7@1600 30/21@1800 14/20@2000', label: 'Слизистый след — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '14/7@1600 64/18@1800 30/21@2000 14/20@2200', label: 'Слизистый след — завершение' }
            ] },
        enem2: { title: 'Гребешок', identity: 'Зубцы гребня',
            trick: 'повторяет удар в прежнем секторе вместо ожидаемого чередования',
            tight: { p1: 400, floor: 120 }, style: 'wave', cadence: 1.02, telegraphMs: 820, speedMultiplier: 1, signatureEvery: 4, delay: [230, 4339], firstWave: 2083,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '18/10@1600~6,2,0 82/11@1800~7,1.8,0', label: '' },
                { id: 'b', tight: false, beats: '40/23@1600~5,2.8,0 60/24@1800~6,2.6,0', label: '' },
                { id: 'c', tight: false, beats: '26/14@1600~5,2.4,0 74/15@1800~6,2.2,0 32/11@2000~7,2,0', label: '' },
                { id: 'd', tight: false, beats: '12/19@1600~8,1.6,0 88/20@1800~9,1.5,0 68/11@2000~8,1.9,0', label: '' },
                { id: 'e', tight: false, beats: '18/10@1600~6,2,0 26/14@1800~5,2.4,0 12/19@2000~8,1.6,0 40/23@2200~5,2.8,0', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '84/16@1600~6,1.2,0 84/20@1800~6,1.2,0 74/14@2000~6,1.2,0', label: 'Зубцы гребня — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '84/16@1600~6,1.2,0 84/20@1800~6,1.2,0 22/21@2000~6,1.2,0', label: 'Зубцы гребня — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '36/18@1600~6,1.2,0 22/21@1800~6,1.2,0 36/18@2000~6,1.2,0 74/14@2200~6,1.2,0', label: 'Зубцы гребня — завершение' }
            ] },
        enem3: { title: 'Белоцвет', identity: 'Лепестки на воде',
            trick: 'разводит две цели, затем закрывает оставленную между ними полосу',
            tight: { p1: 400, floor: 120 }, style: 'wave', cadence: 0.92, telegraphMs: 870, speedMultiplier: 0.92, signatureEvery: 4, delay: [340, 5685], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '14/7@1600~9,0.8,0 86/7@1800~10,0.7,0', label: '' },
                { id: 'b', tight: false, beats: '12/14@1600~11,0.6,0 88/15@1800~12,0.5,0', label: '' },
                { id: 'c', tight: false, beats: '24/9@1600~7,1,0 76/10@1800~8,0.9,0 45/12@2000~8,0.9,0', label: '' },
                { id: 'd', tight: false, beats: '20/5@1600~6,0.5,0 80/5@1800~6,0.5,0 55/12@2000~9,0.8,0', label: '' },
                { id: 'e', tight: false, beats: '14/7@1600~9,0.8,0 86/7@1800~10,0.7,0 12/14@2000~11,0.6,0 88/15@2200~12,0.5,0', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '18/16@1600~6,1.2,0 86/21@1800~6,1.2,0 46/18@2000~6,1.2,0', label: 'Лепестки на воде — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '18/16@1600~6,1.2,0 86/21@1800~6,1.2,0 46/14@2000~6,1.2,0', label: 'Лепестки на воде — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '18/20@1600~6,1.2,0 86/21@1800~6,1.2,0 46/18@2000~6,1.2,0 46/14@2200~6,1.2,0', label: 'Лепестки на воде — завершение' }
            ] },
        enem4: { title: 'Плакальщица', identity: 'Плач с запоздалым ответом',
            trick: 'две короткие группы разделены паузой; вторая группа меняет сторону',
            tight: { p1: 400, floor: 120 }, style: 'wave', cadence: 0.88, telegraphMs: 900, speedMultiplier: 0.88, signatureEvery: 4, delay: [380, 6400], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '12/6@1600~11,0.6,0 88/6@1800~12,0.5,0', label: '' },
                { id: 'b', tight: false, beats: '14/15@1600~13,0.4,0 86/16@1800~14,0.35,0', label: '' },
                { id: 'c', tight: false, beats: '24/8@1600~8,0.8,0 76/9@1800~9,0.7,0 34/7@2000~9,0.8,0', label: '' },
                { id: 'd', tight: false, beats: '18/5@1600~7,0.5,0 82/5@1800~7,0.5,0 66/7@2000~10,0.7,0', label: '' },
                { id: 'e', tight: false, beats: '12/6@1600~11,0.6,0 88/6@1800~12,0.5,0 14/15@2000~13,0.4,0 86/16@2200~14,0.35,0', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, gaps: [360, 900, 360], open: 1, beats: '24/16@1600~6,1.2,0 24/20@1800~6,1.2,0 70/21@2000~6,1.2,0 82/18@2200~6,1.2,0', label: 'Плач с запоздалым ответом — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, gaps: [360, 900, 360], beats: '24/16@1600~6,1.2,0 24/20@1800~6,1.2,0 82/18@2000~6,1.2,0', label: 'Плач с запоздалым ответом — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, gaps: [360, 900, 360], beats: '70/21@1600~6,1.2,0 82/18@1800~6,1.2,0 24/16@2000~6,1.2,0 24/20@2200~6,1.2,0', label: 'Плач с запоздалым ответом — завершение' }
            ] },
        enem5: { title: 'Огнепёр', identity: 'Огненный хвост рыбы',
            trick: 'ведёт прицел вдоль прохода, затем возвращает угрозу за спину прохода',
            tight: { p1: 400, floor: 120 }, style: 'wave', cadence: 0.83, telegraphMs: 690, speedMultiplier: 1.14, signatureEvery: 4, delay: [210, 4600], firstWave: 2208,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '14/10@1600~7,1.9,0 86/11@1800~8,1.7,0', label: '' },
                { id: 'b', tight: false, beats: '45/24@1600~5,2.8,0 55/25@1800~6,2.6,0', label: '' },
                { id: 'c', tight: false, beats: '24/14@1600~6,2.3,0 76/15@1800~7,2.1,0 34/12@2000~8,1.9,0', label: '' },
                { id: 'd', tight: false, beats: '14/19@1600~9,1.5,0 86/20@1800~10,1.4,0 66/12@2000~9,1.8,0', label: '' },
                { id: 'e', tight: false, beats: '14/10@1600~7,1.9,0 24/14@1800~6,2.3,0 14/19@2000~9,1.5,0 45/24@2200~5,2.8,0', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '88/16@1600~6,1.2,0 66/14@1800~6,1.2,0 38/21@2000~6,1.2,0', label: 'Огненный хвост рыбы — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '88/16@1600~6,1.2,0 66/14@1800~6,1.2,0 88/20@2000~6,1.2,0', label: 'Огненный хвост рыбы — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '12/18@1600~6,1.2,0 38/21@1800~6,1.2,0 66/14@2000~6,1.2,0 88/20@2200~6,1.2,0', label: 'Огненный хвост рыбы — завершение' }
            ] }
    }
};
