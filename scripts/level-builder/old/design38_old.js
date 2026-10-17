// УРОВЕНЬ 38 (v3) — форма комбо извлечена из прежней версии, времена подобраны refit.js под честную модель (А11). Правится вручную по А11.
module.exports = {
    n: 38, timeNextBoss: 5, bossInterval: 5, tight: { p1: 500, floor: 170 },
    cfg: { levelCadence: 0.84, minWaveDelay: 1980, minShotDelay: 136, minTelegraphMs: 510 },
    phases: [
        { minHp: 0.65, cadence: 1, speed: 1, telegraphMultiplier: 1, surpriseChance: 0.16, maxActiveAttacks: 16 },
        { minHp: 0.3, cadence: 0.79, speed: 1.17, telegraphMultiplier: 0.86, surpriseChance: 0.3, maxActiveAttacks: 20 },
        { minHp: 0, cadence: 0.64, speed: 1.3, telegraphMultiplier: 0.77, surpriseChance: 0.42, maxActiveAttacks: 25 }
    ],
    bosses: {
        enem1: { title: 'Жемчужник', identity: 'Створки жемчужницы',
            trick: 'сводит угрозы с краёв к внутренним полосам, затем размыкает рисунок',
            tight: { p1: 400, floor: 120 }, style: 'wave', cadence: 0.98, telegraphMs: 900, speedMultiplier: 0.88, signatureEvery: 4, delay: [380, 6195], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '16/6@1600~8,0.6,0 84/6@1800~9,0.5,0', label: '' },
                { id: 'b', tight: false, beats: '40/18@1600~5,1.4,0 60/19@1800~6,1.3,0', label: '' },
                { id: 'c', tight: false, beats: '24/8@1600~7,0.8,0 76/9@1800~8,0.7,0 45/11@2000~7,0.9,0', label: '' },
                { id: 'd', tight: false, beats: '12/13@1600~6,1.1,0 88/14@1800~7,1,0 55/11@2000~8,0.8,0', label: '' },
                { id: 'e', tight: false, beats: '16/6@1600~8,0.6,0 24/8@1800~7,0.8,0 12/13@2000~6,1.1,0 40/18@2200~5,1.4,0', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '16/16@1600~6,1.2,0 84/21@1800~6,1.2,0 34/14@2000~6,1.2,0 62/18@2200~6,1.2,0', label: 'Створки жемчужницы — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '16/16@1600~6,1.2,0 84/21@1800~6,1.2,0 16/20@2000~6,1.2,0', label: 'Створки жемчужницы — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '34/14@1600~6,1.2,0 62/18@1800~6,1.2,0 16/16@2000~6,1.2,0 84/21@2200~6,1.2,0', label: 'Створки жемчужницы — завершение' }
            ] },
        enem2: { title: 'Чекан', identity: 'Монета на ребре',
            trick: 'короткий первый заход продолжается более быстрым довеском с прежнего края',
            tight: { p1: 400, floor: 120 }, style: 'wave', cadence: 1.1, telegraphMs: 770, speedMultiplier: 1.06, signatureEvery: 4, delay: [200, 4167], firstWave: 2000,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '18/12@1600~5,2.6,0 82/13@1800~6,2.4,0', label: '' },
                { id: 'b', tight: false, beats: '40/24@1600~4,3.2,0 60/25@1800~5,3.1,0', label: '' },
                { id: 'c', tight: false, beats: '26/16@1600~4,3,0 74/17@1800~5,2.8,0 32/10@2000~6,2.3,0', label: '' },
                { id: 'd', tight: false, beats: '12/20@1600~7,2.1,0 88/21@1800~8,2,0 68/10@2000~7,2.2,0', label: '' },
                { id: 'e', tight: false, beats: '20/6@1600~4,1.4,0 80/6@1800~4,1.5,0 18/12@2000~5,2.6,0 82/13@2200~6,2.4,0', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '84/7@1600~6,1.2,0 84/20@1800~6,1.2,0 84/16@2000~6,1.2,0', label: 'Монета на ребре — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '84/7@1600~6,1.2,0 84/20@1800~6,1.2,0 20/21@2000~6,1.2,0', label: 'Монета на ребре — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '32/18@1600~6,1.2,0 74/14@1800~6,1.2,0 32/18@2000~6,1.2,0 20/21@2200~6,1.2,0 84/16@2400~6,1.2,0', label: 'Монета на ребре — завершение' }
            ] },
        enem3: { title: 'Глубинник', identity: 'Гребок с разворотом',
            trick: 'показывает боковой замах, но заканчивает серединой; позднее конец возвращается на край',
            tight: { p1: 400, floor: 120 }, style: 'wave', cadence: 1, telegraphMs: 820, speedMultiplier: 1, signatureEvery: 4, delay: [260, 5060], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '16/9@1600~6,1.7,0 84/10@1800~7,1.5,0', label: '' },
                { id: 'b', tight: false, beats: '40/20@1600~5,2.3,0 60/21@1800~6,2.2,0', label: '' },
                { id: 'c', tight: false, beats: '24/12@1600~5,2,0 76/13@1800~6,1.9,0 45/14@2000~6,1.8,0', label: '' },
                { id: 'd', tight: false, beats: '12/16@1600~8,1.3,0 88/17@1800~9,1.2,0 55/14@2000~7,1.7,0', label: '' },
                { id: 'e', tight: false, beats: '16/9@1600~6,1.7,0 24/12@1800~5,2,0 12/16@2000~8,1.3,0 40/20@2200~5,2.3,0', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '24/16@1600~6,1.2,0 40/14@1800~6,1.2,0 53/18@2000~6,1.2,0', label: 'Гребок с разворотом — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '24/16@1600~6,1.2,0 40/14@1800~6,1.2,0 24/20@2000~6,1.2,0', label: 'Гребок с разворотом — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '86/21@1600~6,1.2,0 53/18@1800~6,1.2,0 40/14@2000~6,1.2,0 24/20@2200~6,1.2,0', label: 'Гребок с разворотом — завершение' }
            ] },
        enem4: { title: 'Скрыня', identity: 'Крышка и зубы сундука',
            trick: 'двойной выпад иногда получает третий укус с другой стороны',
            tight: { p1: 400, floor: 120 }, style: 'lateRush', cadence: 0.9, telegraphMs: 970, speedMultiplier: 0.82, signatureEvery: 4, delay: [430, 7275], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '16/3@1600 40/4@1800', label: '' },
                { id: 'b', tight: false, beats: '64/3@1600 88/4@1800', label: '' },
                { id: 'c', tight: false, beats: '24/6@1600 76/6@1800 10/5@2000', label: '' },
                { id: 'd', tight: false, beats: '12/10@1600 88/10@1800 90/5@2000', label: '' },
                { id: 'e', tight: false, beats: '16/3@1600 40/4@1800 64/3@2000 88/4@2200', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '18/16@1600 18/20@1800', label: 'Крышка и зубы сундука — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '18/16@1600 18/20@1800 78/21@2000', label: 'Крышка и зубы сундука — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '88/18@1600 28/14@1800 88/18@2000 78/21@2200', label: 'Крышка и зубы сундука — завершение' }
            ] },
        enem5: { title: 'Осетрыч', identity: 'Осетровая борозда',
            trick: 'ведёт прицел вдоль прохода, затем возвращает угрозу за спину прохода',
            tight: { p1: 400, floor: 120 }, style: 'wave', cadence: 0.8, telegraphMs: 680, speedMultiplier: 1.12, signatureEvery: 4, delay: [240, 4945], firstWave: 2374,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '12/8@1600~10,1.1,0 88/9@1800~11,1,0', label: '' },
                { id: 'b', tight: false, beats: '24/12@1600~8,1.5,0 76/13@1800~9,1.4,0', label: '' },
                { id: 'c', tight: false, beats: '14/19@1600~6,2.1,0 86/20@1800~7,2,0 34/10@2000~9,1.3,0 66/10@2200~10,1.2,0', label: '' },
                { id: 'd', tight: false, beats: '45/24@1600~5,2.6,0 55/25@1800~6,2.5,0 50/5@2000~14,0.5,0', label: '' },
                { id: 'e', tight: false, beats: '12/8@1600~10,1.1,0 88/9@1800~11,1,0 24/12@2000~8,1.5,0 76/13@2200~9,1.4,0', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '86/16@1600~6,1.2,0 64/14@1800~6,1.2,0 36/21@2000~6,1.2,0', label: 'Осетровая борозда — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '86/16@1600~6,1.2,0 64/14@1800~6,1.2,0 86/20@2000~6,1.2,0', label: 'Осетровая борозда — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '12/18@1600~6,1.2,0 36/21@1800~6,1.2,0 64/14@2000~6,1.2,0 86/20@2200~6,1.2,0', label: 'Осетровая борозда — завершение' }
            ] }
    }
};
