// УРОВЕНЬ 37 (v3) — форма комбо извлечена из прежней версии, времена подобраны refit.js под честную модель (А11). Правится вручную по А11.
module.exports = {
    n: 37, timeNextBoss: 5, bossInterval: 5, tight: { p1: 500, floor: 170 },
    cfg: { levelCadence: 0.85, minWaveDelay: 2000, minShotDelay: 138, minTelegraphMs: 515 },
    phases: [
        { minHp: 0.65, cadence: 1, speed: 1, telegraphMultiplier: 1, surpriseChance: 0.16, maxActiveAttacks: 16 },
        { minHp: 0.3, cadence: 0.8, speed: 1.16, telegraphMultiplier: 0.87, surpriseChance: 0.3, maxActiveAttacks: 20 },
        { minHp: 0, cadence: 0.65, speed: 1.29, telegraphMultiplier: 0.78, surpriseChance: 0.41, maxActiveAttacks: 24 }
    ],
    bosses: {
        enem1: { title: 'Клешнач', identity: 'Клешня и возврат',
            trick: 'показывает боковой замах, но заканчивает серединой; позднее конец возвращается на край',
            tight: { p1: 400, floor: 120 }, style: 'wave', cadence: 1.02, telegraphMs: 830, speedMultiplier: 0.98, signatureEvery: 4, delay: [280, 5363], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '16/8@1600~7,1.5,0 84/9@1800~8,1.3,0', label: '' },
                { id: 'b', tight: false, beats: '40/20@1600~5,2.4,0 60/21@1800~6,2.3,0', label: '' },
                { id: 'c', tight: false, beats: '24/11@1600~6,1.8,0 76/12@1800~7,1.7,0 45/13@2000~6,1.6,0', label: '' },
                { id: 'd', tight: false, beats: '12/15@1600~5,2.1,0 88/16@1800~6,2,0 55/13@2000~7,1.5,0', label: '' },
                { id: 'e', tight: false, beats: '16/8@1600~7,1.5,0 24/11@1800~6,1.8,0 12/15@2000~5,2.1,0 40/20@2200~5,2.4,0', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '20/16@1600~6,1.2,0 38/14@1800~6,1.2,0 51/18@2000~6,1.2,0', label: 'Клешня и возврат — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '20/16@1600~6,1.2,0 38/14@1800~6,1.2,0 20/20@2000~6,1.2,0', label: 'Клешня и возврат — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '84/21@1600~6,1.2,0 51/18@1800~6,1.2,0 38/14@2000~6,1.2,0 20/20@2200~6,1.2,0', label: 'Клешня и возврат — завершение' }
            ] },
        enem2: { title: 'Долгонос', identity: 'Комариный повтор',
            trick: 'повторяет удар в прежнем секторе вместо ожидаемого чередования',
            tight: { p1: 400, floor: 120 }, style: 'wave', cadence: 1.08, telegraphMs: 780, speedMultiplier: 1.05, signatureEvery: 4, delay: [220, 4303], firstWave: 2065,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '18/11@1600~6,2.2,0 82/12@1800~7,2,0', label: '' },
                { id: 'b', tight: false, beats: '40/24@1600~5,3,0 60/25@1800~6,2.9,0', label: '' },
                { id: 'c', tight: false, beats: '26/15@1600~5,2.6,0 74/16@1800~6,2.4,0 32/10@2000~7,2.1,0', label: '' },
                { id: 'd', tight: false, beats: '12/20@1600~8,1.8,0 88/21@1800~9,1.7,0 68/10@2000~8,2,0', label: '' },
                { id: 'e', tight: false, beats: '20/6@1600~4,1.3,0 80/6@1800~4,1.4,0 18/11@2000~6,2.2,0 82/12@2200~7,2,0', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '82/16@1600~6,1.2,0 82/20@1800~6,1.2,0 72/14@2000~6,1.2,0', label: 'Комариный повтор — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '82/16@1600~6,1.2,0 82/20@1800~6,1.2,0 16/21@2000~6,1.2,0', label: 'Комариный повтор — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '32/18@1600~6,1.2,0 16/21@1800~6,1.2,0 32/18@2000~6,1.2,0 72/14@2200~6,1.2,0', label: 'Комариный повтор — завершение' }
            ] },
        enem3: { title: 'Громонос', identity: 'Раскат и удар грома',
            trick: 'две короткие группы разделены паузой; вторая группа меняет сторону',
            tight: { p1: 400, floor: 120 }, style: 'wave', cadence: 0.9, telegraphMs: 960, speedMultiplier: 0.86, signatureEvery: 4, delay: [420, 7059], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '14/4@1600~10,0.5,0 40/4@1800~11,0.4,0', label: '' },
                { id: 'b', tight: false, beats: '64/4@1600~10,0.5,0 88/4@1800~11,0.4,0', label: '' },
                { id: 'c', tight: false, beats: '24/7@1600~7,0.8,0 76/7@1800~8,0.7,0 10/3@2000~13,0.35,0', label: '' },
                { id: 'd', tight: false, beats: '12/11@1600~5,1.1,0 88/11@1800~6,1,0 90/3@2000~12,0.4,0', label: '' },
                { id: 'e', tight: false, beats: '14/4@1600~10,0.5,0 40/4@1800~11,0.4,0 64/4@2000~10,0.5,0 88/4@2200~11,0.4,0', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, gaps: [360, 900, 360], open: 1, beats: '14/16@1600~6,1.2,0 14/20@1800~6,1.2,0 68/21@2000~6,1.2,0 86/18@2200~6,1.2,0', label: 'Раскат и удар грома — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, gaps: [360, 900, 360], beats: '14/16@1600~6,1.2,0 14/20@1800~6,1.2,0 86/18@2000~6,1.2,0', label: 'Раскат и удар грома — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, gaps: [360, 900, 360], beats: '68/21@1600~6,1.2,0 86/18@1800~6,1.2,0 14/16@2000~6,1.2,0 14/20@2200~6,1.2,0', label: 'Раскат и удар грома — завершение' }
            ] },
        enem4: { title: 'Треснодуб', identity: 'Треснувший ствол',
            trick: 'разводит две цели, затем закрывает оставленную между ними полосу',
            tight: { p1: 400, floor: 120 }, style: 'pause', cadence: 0.88, telegraphMs: 780, speedMultiplier: 1.05, signatureEvery: 4, delay: [440, 6417], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '14/7@1600 26/7@1800', label: '' },
                { id: 'b', tight: false, beats: '74/8@1600 86/8@1800', label: '' },
                { id: 'c', tight: false, beats: '12/14@1600 88/14@1800 46/12@2000 54/12@2200', label: '' },
                { id: 'd', tight: false, beats: '10/4@1600 90/4@1800 30/8@2000 70/8@2200', label: '' },
                { id: 'e', tight: false, beats: '14/7@1600 26/7@1800 74/8@2000 86/8@2200', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '24/16@1600 80/21@1800 50/18@2000', label: 'Треснувший ствол — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '24/16@1600 80/21@1800 50/14@2000', label: 'Треснувший ствол — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '24/20@1600 80/21@1800 50/18@2000 50/14@2200', label: 'Треснувший ствол — завершение' }
            ] },
        enem5: { title: 'Фонарник', identity: 'Свет перед разрядом',
            trick: 'медленный первый снаряд остаётся фоном для более срочного второго',
            tight: { p1: 400, floor: 120 }, style: 'wave', cadence: 0.82, telegraphMs: 690, speedMultiplier: 1.1, signatureEvery: 4, delay: [250, 4950], firstWave: 2376,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '14/7@1600~9,0.9,0 86/8@1800~10,0.8,0', label: '' },
                { id: 'b', tight: false, beats: '24/11@1600~7,1.3,0 76/12@1800~8,1.2,0', label: '' },
                { id: 'c', tight: false, beats: '14/18@1600~6,1.8,0 86/19@1800~7,1.7,0 34/9@2000~8,1.1,0 66/9@2200~9,1,0', label: '' },
                { id: 'd', tight: false, beats: '45/23@1600~5,2.2,0 55/24@1800~6,2.1,0 50/4@2000~13,0.4,0', label: '' },
                { id: 'e', tight: false, beats: '14/7@1600~9,0.9,0 86/8@1800~10,0.8,0 24/11@2000~7,1.3,0 76/12@2200~8,1.2,0', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '86/7@1600~6,1.2,0 70/21@1800~6,1.2,0', label: 'Свет перед разрядом — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '86/7@1600~6,1.2,0 70/21@1800~6,1.2,0 86/20@2000~6,1.2,0', label: 'Свет перед разрядом — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '86/7@1600~6,1.2,0 38/18@1800~6,1.2,0 70/21@2000~6,1.2,0 86/20@2200~6,1.2,0', label: 'Свет перед разрядом — завершение' }
            ] }
    }
};
