// УРОВЕНЬ 23 (v3) — форма комбо извлечена из прежней версии, времена подобраны refit.js под честную модель (А11). Правится вручную по А11.
module.exports = {
    n: 23, timeNextBoss: 5, bossInterval: 5, tight: { p1: 500, floor: 170 },
    cfg: { levelCadence: 0.83, minWaveDelay: 2000, minShotDelay: 140, minTelegraphMs: 520 },
    phases: [
        { minHp: 0.64, cadence: 1, speed: 1, telegraphMultiplier: 1, surpriseChance: 0.17, maxActiveAttacks: 16 },
        { minHp: 0.29, cadence: 0.79, speed: 1.14, telegraphMultiplier: 0.88, surpriseChance: 0.29, maxActiveAttacks: 19 },
        { minHp: 0, cadence: 0.66, speed: 1.23, telegraphMultiplier: 0.8, surpriseChance: 0.39, maxActiveAttacks: 22 }
    ],
    bosses: {
        enem1: { title: 'Хлыстень', identity: 'Обратный ход цепа',
            trick: 'повторяет удар в прежнем секторе вместо ожидаемого чередования',
            tight: { p1: 400, floor: 120 }, style: 'accelerate', cadence: 1.02, telegraphMs: 850, speedMultiplier: 0.94, signatureEvery: 4, delay: [400, 6024], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '20/6@1600', label: '' },
                { id: 'b', tight: false, beats: '80/6@1600', label: '' },
                { id: 'c', tight: false, beats: '20/6@1600 80/6@1800', label: '' },
                { id: 'd', tight: false, beats: '32/8@1600 68/8@1800 18/10@2000', label: '' },
                { id: 'e', tight: false, beats: '40/13@1600 60/13@1800 25/16@2000 75/17@2200', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '16/16@1600 16/20@1800 28/14@2000', label: 'Обратный ход цепа — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '16/16@1600 16/20@1800 78/21@2000', label: 'Обратный ход цепа — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '86/18@1600 78/21@1800 86/18@2000 28/14@2200', label: 'Обратный ход цепа — завершение' }
            ] },
        enem2: { title: 'Решетень', identity: 'Просев через решето',
            trick: 'разводит две цели, затем закрывает оставленную между ними полосу',
            tight: { p1: 400, floor: 120 }, style: 'lateRush', cadence: 0.91, telegraphMs: 745, speedMultiplier: 1.05, signatureEvery: 4, delay: [295, 5362], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '25/9@1600', label: '' },
                { id: 'b', tight: false, beats: '75/9@1600', label: '' },
                { id: 'c', tight: false, beats: '25/9@1600 75/9@1800', label: '' },
                { id: 'd', tight: false, beats: '20/13@1600 80/13@1800', label: '' },
                { id: 'e', tight: false, beats: '30/18@1600 70/18@1800', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '24/16@1600 76/21@1800 46/18@2000', label: 'Просев через решето — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '24/16@1600 76/21@1800 46/14@2000', label: 'Просев через решето — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '24/20@1600 76/21@1800 46/18@2000 46/14@2200', label: 'Просев через решето — завершение' }
            ] },
        enem3: { title: 'Пылюга', identity: 'Пыль скрывает бросок',
            trick: 'медленный первый снаряд остаётся фоном для более срочного второго',
            tight: { p1: 400, floor: 120 }, style: 'drift', cadence: 0.86, telegraphMs: 615, speedMultiplier: 1.19, signatureEvery: 4, delay: [225, 5060], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '45/25@1600', label: '' },
                { id: 'b', tight: false, beats: '55/25@1600', label: '' },
                { id: 'c', tight: false, beats: '45/25@1600 55/25@1800', label: '' },
                { id: 'd', tight: false, beats: '15/22@1600 30/24@1800 85/22@2000', label: '' },
                { id: 'e', tight: false, beats: '22/18@1600 78/18@1800', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '82/7@1600 66/21@1800', label: 'Пыль скрывает бросок — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '82/7@1600 66/21@1800 82/20@2000', label: 'Пыль скрывает бросок — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '82/7@1600 34/18@1800 66/21@2000 82/20@2200', label: 'Пыль скрывает бросок — завершение' }
            ] },
        enem4: { title: 'Колосень', identity: 'Серпы из снопа',
            trick: 'двойной выпад иногда получает третий укус с другой стороны',
            tight: { p1: 400, floor: 120 }, style: 'straight', cadence: 1.03, telegraphMs: 620, speedMultiplier: 1.02, signatureEvery: 4, delay: [235, 4270], firstWave: 2050,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '12/22@1600', label: '' },
                { id: 'b', tight: false, beats: '88/23@1600', label: '' },
                { id: 'c', tight: false, beats: '12/22@1600 88/23@1800', label: '' },
                { id: 'd', tight: false, beats: '14/6@1600 86/7@1800', label: '' },
                { id: 'e', tight: false, beats: '15/18@1600 85/17@1800 12/15@2000 88/15@2200', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '14/16@1600 14/20@1800', label: 'Серпы из снопа — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '14/16@1600 14/20@1800 80/21@2000', label: 'Серпы из снопа — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '70/18@1600 25/14@1800 70/18@2000 80/21@2200', label: 'Серпы из снопа — завершение' }
            ] },
        enem5: { title: 'Овинник', identity: 'Огонь между снопами',
            trick: 'сводит угрозы с краёв к внутренним полосам, затем размыкает рисунок',
            tight: { p1: 400, floor: 120 }, style: 'weave', cadence: 0.71, telegraphMs: 610, speedMultiplier: 1.18, signatureEvery: 4, delay: [245, 4773], firstWave: 2291,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '50/7@1600', label: '' },
                { id: 'b', tight: false, beats: '50/13@1600', label: '' },
                { id: 'c', tight: false, beats: '50/7@1600 50/13@1800', label: '' },
                { id: 'd', tight: false, beats: '25/9@1600 75/9@1800', label: '' },
                { id: 'e', tight: false, beats: '20/20@1600 80/21@1800', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '86/16@1600 18/21@1800 68/14@2000 34/18@2200', label: 'Огонь между снопами — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '86/16@1600 18/21@1800 86/20@2000', label: 'Огонь между снопами — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '68/14@1600 34/18@1800 86/16@2000 18/21@2200', label: 'Огонь между снопами — завершение' }
            ] }
    }
};
