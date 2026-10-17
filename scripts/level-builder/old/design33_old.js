// УРОВЕНЬ 33 (v3) — форма комбо извлечена из прежней версии, времена подобраны refit.js под честную модель (А11). Правится вручную по А11.
module.exports = {
    n: 33, timeNextBoss: 5, bossInterval: 5, tight: { p1: 500, floor: 170 },
    cfg: { levelCadence: 0.89, minWaveDelay: 2080, minShotDelay: 146, minTelegraphMs: 535 },
    phases: [
        { minHp: 0.65, cadence: 1, speed: 1, telegraphMultiplier: 1, surpriseChance: 0.15, maxActiveAttacks: 15 },
        { minHp: 0.3, cadence: 0.83, speed: 1.14, telegraphMultiplier: 0.89, surpriseChance: 0.27, maxActiveAttacks: 19 },
        { minHp: 0, cadence: 0.68, speed: 1.26, telegraphMultiplier: 0.81, surpriseChance: 0.38, maxActiveAttacks: 23 }
    ],
    bosses: {
        enem1: { title: 'Юркач', identity: 'Юркая петля рыбы',
            trick: 'повторяет удар в прежнем секторе вместо ожидаемого чередования',
            tight: { p1: 400, floor: 120 }, style: 'wave', cadence: 1.02, telegraphMs: 850, speedMultiplier: 0.97, signatureEvery: 4, delay: [230, 4737], firstWave: 2274,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '16/8@1600~6,1.8,0 84/9@1800~7,1.6,0', label: '' },
                { id: 'b', tight: false, beats: '18/18@1600~5,2.3,0 82/19@1800~6,2.2,0', label: '' },
                { id: 'c', tight: false, beats: '24/11@1600~5,2.1,0 76/12@1800~6,1.9,0 12/6@2000~4,1.1,0', label: '' },
                { id: 'd', tight: false, beats: '30/15@1600~8,1.4,0 70/16@1800~7,1.5,0 88/6@2000~4,1.2,0', label: '' },
                { id: 'e', tight: false, beats: '16/8@1600~6,1.8,0 24/11@1800~5,2.1,0 30/15@2000~8,1.4,0 18/18@2200~5,2.3,0', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '14/16@1600~6,1.2,0 14/20@1800~6,1.2,0 24/14@2000~6,1.2,0', label: 'Юркая петля рыбы — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '14/16@1600~6,1.2,0 14/20@1800~6,1.2,0 80/21@2000~6,1.2,0', label: 'Юркая петля рыбы — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '68/18@1600~6,1.2,0 80/21@1800~6,1.2,0 68/18@2000~6,1.2,0 24/14@2200~6,1.2,0', label: 'Юркая петля рыбы — завершение' }
            ] },
        enem2: { title: 'Ершак', identity: 'Колючий плавник',
            trick: 'двойной выпад иногда получает третий укус с другой стороны',
            tight: { p1: 400, floor: 120 }, style: 'weave', cadence: 0.95, telegraphMs: 780, speedMultiplier: 1.03, signatureEvery: 4, delay: [300, 5559], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '18/10@1600 82/10@1800', label: '' },
                { id: 'b', tight: false, beats: '26/15@1600 74/15@1800', label: '' },
                { id: 'c', tight: false, beats: '10/5@1600 90/5@1800 50/4@2000', label: '' },
                { id: 'd', tight: false, beats: '18/8@1600 82/8@1800 40/16@2000 60/16@2200', label: '' },
                { id: 'e', tight: false, beats: '18/10@1600 82/10@1800 26/15@2000 74/15@2200', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '86/16@1600 86/20@1800', label: 'Колючий плавник — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '86/16@1600 86/20@1800 20/21@2000', label: 'Колючий плавник — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '32/18@1600 74/14@1800 32/18@2000 20/21@2200', label: 'Колючий плавник — завершение' }
            ] },
        enem3: { title: 'Сетевик', identity: 'Поплавки и грузило',
            trick: 'медленный первый снаряд остаётся фоном для более срочного второго',
            tight: { p1: 400, floor: 120 }, style: 'wave', cadence: 1.08, telegraphMs: 920, speedMultiplier: 0.88, signatureEvery: 4, delay: [340, 5566], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '16/6@1600~8,0.8,0 84/6@1800~9,0.7,0', label: '' },
                { id: 'b', tight: false, beats: '40/18@1600~5,1.5,0 60/19@1800~6,1.4,0', label: '' },
                { id: 'c', tight: false, beats: '24/8@1600~7,1,0 76/8@1800~8,0.9,0 45/11@2000~7,0.9,0', label: '' },
                { id: 'd', tight: false, beats: '12/13@1600~6,1.2,0 88/13@1800~7,1.1,0 55/11@2000~8,0.8,0', label: '' },
                { id: 'e', tight: false, beats: '16/6@1600~8,0.8,0 24/8@1800~7,1,0 12/13@2000~6,1.2,0 40/18@2200~5,1.5,0', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '24/7@1600~6,1.2,0 38/21@1800~6,1.2,0', label: 'Поплавки и грузило — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '24/7@1600~6,1.2,0 38/21@1800~6,1.2,0 24/20@2000~6,1.2,0', label: 'Поплавки и грузило — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '24/7@1600~6,1.2,0 66/18@1800~6,1.2,0 38/21@2000~6,1.2,0 24/20@2200~6,1.2,0', label: 'Поплавки и грузило — завершение' }
            ] },
        enem4: { title: 'Струнобой', identity: 'Оборванный перебор',
            trick: 'две короткие группы разделены паузой; вторая группа меняет сторону',
            tight: { p1: 400, floor: 120 }, style: 'lateRush', cadence: 0.95, telegraphMs: 820, speedMultiplier: 0.9, signatureEvery: 4, delay: [400, 5185], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '14/5@1600 86/6@1800', label: '' },
                { id: 'b', tight: false, beats: '22/8@1600 78/9@1800', label: '' },
                { id: 'c', tight: false, beats: '12/13@1600 88/13@1800 46/12@2000 54/12@2200', label: '' },
                { id: 'd', tight: false, beats: '10/4@1600 90/4@1800 30/7@2000 70/7@2200', label: '' },
                { id: 'e', tight: false, beats: '14/5@1600 86/6@1800 22/8@2000 78/9@2200', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, gaps: [360, 900, 360], open: 1, beats: '18/16@1600 18/20@1800 70/21@2000 84/18@2200', label: 'Оборванный перебор — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, gaps: [360, 900, 360], beats: '18/16@1600 18/20@1800 84/18@2000', label: 'Оборванный перебор — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, gaps: [360, 900, 360], beats: '70/21@1600 84/18@1800 18/16@2000 18/20@2200', label: 'Оборванный перебор — завершение' }
            ] },
        enem5: { title: 'Ладейник', identity: 'Борт и встречное весло',
            trick: 'показывает боковой замах, но заканчивает серединой; позднее конец возвращается на край',
            tight: { p1: 400, floor: 120 }, style: 'wave', cadence: 0.85, telegraphMs: 700, speedMultiplier: 1.08, signatureEvery: 4, delay: [250, 4825], firstWave: 2316,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '12/6@1600~9,0.9,0 88/7@1800~10,0.8,0', label: '' },
                { id: 'b', tight: false, beats: '24/10@1600~7,1.2,0 76/11@1800~8,1.1,0', label: '' },
                { id: 'c', tight: false, beats: '14/17@1600~11,0.7,0 86/18@1800~12,0.6,0 34/8@2000~8,1,0 66/8@2200~9,0.9,0', label: '' },
                { id: 'd', tight: false, beats: '45/22@1600~6,1.5,0 55/23@1800~7,1.4,0 50/4@2000~13,0.4,0', label: '' },
                { id: 'e', tight: false, beats: '12/6@1600~9,0.9,0 88/7@1800~10,0.8,0 24/10@2000~7,1.2,0 76/11@2200~8,1.1,0', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '84/16@1600~6,1.2,0 64/14@1800~6,1.2,0 52/18@2000~6,1.2,0', label: 'Борт и встречное весло — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '84/16@1600~6,1.2,0 64/14@1800~6,1.2,0 84/20@2000~6,1.2,0', label: 'Борт и встречное весло — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '14/21@1600~6,1.2,0 52/18@1800~6,1.2,0 64/14@2000~6,1.2,0 84/20@2200~6,1.2,0', label: 'Борт и встречное весло — завершение' }
            ] }
    }
};
