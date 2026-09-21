// УРОВЕНЬ 22 (v3) — форма комбо извлечена из прежней версии, времена подобраны refit.js под честную модель (А11). Правится вручную по А11.
module.exports = {
    n: 22, timeNextBoss: 5, bossInterval: 5, tight: { p1: 500, floor: 170 },
    cfg: { levelCadence: 0.84, minWaveDelay: 2020, minShotDelay: 142, minTelegraphMs: 525 },
    phases: [
        { minHp: 0.64, cadence: 1, speed: 1, telegraphMultiplier: 1, surpriseChance: 0.16, maxActiveAttacks: 16 },
        { minHp: 0.29, cadence: 0.8, speed: 1.13, telegraphMultiplier: 0.88, surpriseChance: 0.28, maxActiveAttacks: 18 },
        { minHp: 0, cadence: 0.67, speed: 1.22, telegraphMultiplier: 0.81, surpriseChance: 0.38, maxActiveAttacks: 21 }
    ],
    bosses: {
        enem1: { title: 'Лемешок', identity: 'Подрез борозды',
            trick: 'ведёт прицел вдоль прохода, затем возвращает угрозу за спину прохода',
            tight: { p1: 400, floor: 120 }, style: 'weave', cadence: 1.05, telegraphMs: 780, speedMultiplier: 0.99, signatureEvery: 4, delay: [310, 4989], firstWave: 2395,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '15/5@1600', label: '' },
                { id: 'b', tight: false, beats: '85/5@1600', label: '' },
                { id: 'c', tight: false, beats: '15/5@1600 85/5@1800', label: '' },
                { id: 'd', tight: false, beats: '15/5@1600 20/7@1800 12/9@2000', label: '' },
                { id: 'e', tight: false, beats: '85/5@1600 80/7@1800 88/9@2000', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '14/16@1600 33/14@1800 58/21@2000', label: 'Подрез борозды — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '14/16@1600 33/14@1800 14/20@2000', label: 'Подрез борозды — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '82/18@1600 58/21@1800 33/14@2000 14/20@2200', label: 'Подрез борозды — завершение' }
            ] },
        enem2: { title: 'Плугарь', identity: 'Сошник и отвал',
            trick: 'показывает боковой замах, но заканчивает серединой; позднее конец возвращается на край',
            tight: { p1: 400, floor: 120 }, style: 'accelerate', cadence: 1.2, telegraphMs: 960, speedMultiplier: 0.83, signatureEvery: 4, delay: [450, 5865], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '20/4@1600', label: '' },
                { id: 'b', tight: false, beats: '80/4@1600', label: '' },
                { id: 'c', tight: false, beats: '20/4@1600 80/4@1800', label: '' },
                { id: 'd', tight: false, beats: '35/5@1600 65/5@1800 50/6@2000', label: '' },
                { id: 'e', tight: false, beats: '15/7@1600 85/7@1800 50/8@2000', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '84/16@1600 67/14@1800 53/18@2000', label: 'Сошник и отвал — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '84/16@1600 67/14@1800 84/20@2000', label: 'Сошник и отвал — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '16/21@1600 53/18@1800 67/14@2000 84/20@2200', label: 'Сошник и отвал — завершение' }
            ] },
        enem3: { title: 'Бодень', identity: 'Два рога и копыто',
            trick: 'двойной выпад иногда получает третий укус с другой стороны',
            tight: { p1: 400, floor: 120 }, style: 'pause', cadence: 1.02, telegraphMs: 810, speedMultiplier: 0.95, signatureEvery: 4, delay: [460, 5950], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '20/4@1600', label: '' },
                { id: 'b', tight: false, beats: '80/4@1600', label: '' },
                { id: 'c', tight: false, beats: '20/4@1600 80/4@1800', label: '' },
                { id: 'd', tight: false, beats: '35/5@1600 65/5@1800 50/6@2000', label: '' },
                { id: 'e', tight: false, beats: '15/8@1600 85/8@1800 50/12@2000', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '20/16@1600 20/20@1800', label: 'Два рога и копыто — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '20/16@1600 20/20@1800 78/21@2000', label: 'Два рога и копыто — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '87/18@1600 29/14@1800 87/18@2000 78/21@2200', label: 'Два рога и копыто — завершение' }
            ] },
        enem4: { title: 'Бороздень', identity: 'Пласт земли перекрывает проход',
            trick: 'разводит две цели, затем закрывает оставленную между ними полосу',
            tight: { p1: 400, floor: 120 }, style: 'drift', cadence: 0.83, telegraphMs: 640, speedMultiplier: 1.15, signatureEvery: 4, delay: [260, 5405], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, beats: '12/12@1600 30/14@1800 48/17@2000', label: '' },
                { id: 'b', tight: false, beats: '88/11@1600 70/15@1800 52/18@2000', label: '' },
                { id: 'c', tight: false, open: 0, beats: '66/21@1600 84/24@1800', label: '' },
                { id: 'd', tight: false, beats: '34/22@1600 16/26@1800', label: '' },
                { id: 'e', tight: false, beats: '20/5@1600 50/6@1800 80/7@2000', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '12/16@1600 86/21@1800 48/18@2000', label: 'Пласт земли перекрывает проход — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '12/16@1600 86/21@1800 48/14@2000', label: 'Пласт земли перекрывает проход — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '12/20@1600 86/21@1800 48/18@2000 48/14@2200', label: 'Пласт земли перекрывает проход — завершение' }
            ] },
        enem5: { title: 'Микула', identity: 'Микулина обратная борозда',
            trick: 'две короткие группы разделены паузой; вторая группа меняет сторону',
            tight: { p1: 400, floor: 120 }, style: 'straight', cadence: 0.72, telegraphMs: 620, speedMultiplier: 1.17, signatureEvery: 4, delay: [250, 4830], firstWave: 2318,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '50/7@1600', label: '' },
                { id: 'b', tight: false, beats: '50/14@1600', label: '' },
                { id: 'c', tight: false, beats: '50/7@1600 50/14@1800', label: '' },
                { id: 'd', tight: false, beats: '25/10@1600 75/10@1800', label: '' },
                { id: 'e', tight: false, beats: '18/21@1600 82/22@1800', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, gaps: [360, 900, 360], open: 1, beats: '24/16@1600 24/20@1800 72/21@2000 88/18@2200', label: 'Микулина обратная борозда — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, gaps: [360, 900, 360], beats: '24/16@1600 24/20@1800 88/18@2000', label: 'Микулина обратная борозда — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, gaps: [360, 900, 360], beats: '72/21@1600 88/18@1800 24/16@2000 24/20@2200', label: 'Микулина обратная борозда — завершение' }
            ] }
    }
};
