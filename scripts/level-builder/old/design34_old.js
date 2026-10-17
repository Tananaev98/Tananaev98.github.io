// УРОВЕНЬ 34 (v3) — форма комбо извлечена из прежней версии, времена подобраны refit.js под честную модель (А11). Правится вручную по А11.
module.exports = {
    n: 34, timeNextBoss: 5, bossInterval: 5, tight: { p1: 500, floor: 170 },
    cfg: { levelCadence: 0.88, minWaveDelay: 2060, minShotDelay: 144, minTelegraphMs: 530 },
    phases: [
        { minHp: 0.65, cadence: 1, speed: 1, telegraphMultiplier: 1, surpriseChance: 0.16, maxActiveAttacks: 16 },
        { minHp: 0.3, cadence: 0.82, speed: 1.15, telegraphMultiplier: 0.88, surpriseChance: 0.28, maxActiveAttacks: 19 },
        { minHp: 0, cadence: 0.67, speed: 1.27, telegraphMultiplier: 0.8, surpriseChance: 0.38, maxActiveAttacks: 23 }
    ],
    bosses: {
        enem1: { title: 'Свистун', identity: 'Свист и повторное пике',
            trick: 'короткий первый заход продолжается более быстрым довеском с прежнего края',
            tight: { p1: 400, floor: 120 }, style: 'wave', cadence: 1.05, telegraphMs: 830, speedMultiplier: 1, signatureEvery: 4, delay: [220, 4715], firstWave: 2263,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '16/9@1600~6,2,0 84/10@1800~7,1.8,0', label: '' },
                { id: 'b', tight: false, beats: '18/19@1600~5,2.5,0 82/20@1800~6,2.4,0', label: '' },
                { id: 'c', tight: false, beats: '24/12@1600~5,2.3,0 76/13@1800~6,2.1,0 12/6@2000~4,1.2,0', label: '' },
                { id: 'd', tight: false, beats: '30/16@1600~8,1.5,0 70/17@1800~7,1.6,0 88/6@2000~4,1.3,0', label: '' },
                { id: 'e', tight: false, beats: '16/9@1600~6,2,0 24/12@1800~5,2.3,0 30/16@2000~8,1.5,0 18/19@2200~5,2.5,0', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '18/7@1600~6,1.2,0 18/20@1800~6,1.2,0 18/16@2000~6,1.2,0', label: 'Свист и повторное пике — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '18/7@1600~6,1.2,0 18/20@1800~6,1.2,0 82/21@2000~6,1.2,0', label: 'Свист и повторное пике — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '70/18@1600~6,1.2,0 28/14@1800~6,1.2,0 70/18@2000~6,1.2,0 82/21@2200~6,1.2,0 18/16@2400~6,1.2,0', label: 'Свист и повторное пике — завершение' }
            ] },
        enem2: { title: 'Клюворез', identity: 'Два клевка с разворотом',
            trick: 'двойной выпад иногда получает третий укус с другой стороны',
            tight: { p1: 400, floor: 120 }, style: 'wave', cadence: 0.98, telegraphMs: 900, speedMultiplier: 0.9, signatureEvery: 4, delay: [400, 6088], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '16/6@1600~9,0.7,0 84/6@1800~10,0.6,0', label: '' },
                { id: 'b', tight: false, beats: '24/8@1600~7,0.9,0 76/8@1800~8,0.8,0', label: '' },
                { id: 'c', tight: false, beats: '12/13@1600~6,1.1,0 88/13@1800~7,1,0 45/11@2000~7,0.8,0', label: '' },
                { id: 'd', tight: false, beats: '20/5@1600~5,0.5,0 80/5@1800~5,0.5,0 55/11@2000~8,0.7,0', label: '' },
                { id: 'e', tight: false, beats: '16/6@1600~9,0.7,0 84/6@1800~10,0.6,0 24/8@2000~7,0.9,0 76/8@2200~8,0.8,0', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '80/16@1600~6,1.2,0 80/20@1800~6,1.2,0', label: 'Два клевка с разворотом — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '80/16@1600~6,1.2,0 80/20@1800~6,1.2,0 16/21@2000~6,1.2,0', label: 'Два клевка с разворотом — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '30/18@1600~6,1.2,0 88/14@1800~6,1.2,0 30/18@2000~6,1.2,0 16/21@2200~6,1.2,0', label: 'Два клевка с разворотом — завершение' }
            ] },
        enem3: { title: 'Крякун', identity: 'Разбежка по воде',
            trick: 'ведёт прицел вдоль прохода, затем возвращает угрозу за спину прохода',
            tight: { p1: 400, floor: 120 }, style: 'wave', cadence: 0.94, telegraphMs: 790, speedMultiplier: 1.02, signatureEvery: 4, delay: [290, 5561], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '16/8@1600~7,1.2,0 84/9@1800~8,1.1,0', label: '' },
                { id: 'b', tight: false, beats: '40/19@1600~5,2,0 60/20@1800~6,1.9,0', label: '' },
                { id: 'c', tight: false, beats: '24/10@1600~6,1.4,0 76/11@1800~7,1.3,0 45/12@2000~6,1.5,0', label: '' },
                { id: 'd', tight: false, beats: '12/14@1600~5,1.7,0 88/15@1800~6,1.6,0 55/12@2000~7,1.4,0', label: '' },
                { id: 'e', tight: false, beats: '16/8@1600~7,1.2,0 24/10@1800~6,1.4,0 12/14@2000~5,1.7,0 40/19@2200~5,2,0', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '12/16@1600~6,1.2,0 34/14@1800~6,1.2,0 60/21@2000~6,1.2,0', label: 'Разбежка по воде — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '12/16@1600~6,1.2,0 34/14@1800~6,1.2,0 12/20@2000~6,1.2,0', label: 'Разбежка по воде — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '86/18@1600~6,1.2,0 60/21@1800~6,1.2,0 34/14@2000~6,1.2,0 12/20@2200~6,1.2,0', label: 'Разбежка по воде — завершение' }
            ] },
        enem4: { title: 'Белокрыл', identity: 'Крылья сводятся',
            trick: 'сводит угрозы с краёв к внутренним полосам, затем размыкает рисунок',
            tight: { p1: 400, floor: 120 }, style: 'wave', cadence: 0.9, telegraphMs: 850, speedMultiplier: 0.94, signatureEvery: 4, delay: [360, 5177], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '12/6@1600~10,0.6,0 88/7@1800~11,0.5,0', label: '' },
                { id: 'b', tight: false, beats: '14/16@1600~12,0.4,0 86/17@1800~13,0.4,0', label: '' },
                { id: 'c', tight: false, beats: '24/9@1600~8,0.8,0 76/10@1800~9,0.7,0 34/8@2000~8,0.9,0', label: '' },
                { id: 'd', tight: false, beats: '18/5@1600~6,0.5,0 82/5@1800~6,0.5,0 66/8@2000~9,0.8,0', label: '' },
                { id: 'e', tight: false, beats: '12/6@1600~10,0.6,0 88/7@1800~11,0.5,0 14/16@2000~12,0.4,0 86/17@2200~13,0.4,0', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '84/16@1600~6,1.2,0 18/21@1800~6,1.2,0 68/14@2000~6,1.2,0 36/18@2200~6,1.2,0', label: 'Крылья сводятся — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '84/16@1600~6,1.2,0 18/21@1800~6,1.2,0 84/20@2000~6,1.2,0', label: 'Крылья сводятся — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '68/14@1600~6,1.2,0 36/18@1800~6,1.2,0 84/16@2000~6,1.2,0 18/21@2200~6,1.2,0', label: 'Крылья сводятся — завершение' }
            ] },
        enem5: { title: 'Горлотруб', identity: 'Крик прерывает стаю',
            trick: 'разводит две цели, затем закрывает оставленную между ними полосу',
            tight: { p1: 400, floor: 120 }, style: 'accelerate', cadence: 0.84, telegraphMs: 700, speedMultiplier: 1.1, signatureEvery: 4, delay: [250, 4735], firstWave: 2273,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '14/5@1600 86/5@1800', label: '' },
                { id: 'b', tight: false, beats: '22/8@1600 78/8@1800', label: '' },
                { id: 'c', tight: false, beats: '12/13@1600 88/13@1800 46/12@2000 54/12@2200', label: '' },
                { id: 'd', tight: false, beats: '10/4@1600 90/4@1800 30/7@2000 70/7@2200', label: '' },
                { id: 'e', tight: false, beats: '14/5@1600 86/5@1800 22/8@2000 78/8@2200', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, shotDelayMs: 360, recoveryMs: 650, open: 1, beats: '22/16@1600 78/21@1800 50/18@2000', label: 'Крик прерывает стаю — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, shotDelayMs: 360, recoveryMs: 650, beats: '22/16@1600 78/21@1800 50/14@2000', label: 'Крик прерывает стаю — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, shotDelayMs: 360, recoveryMs: 950, beats: '22/20@1600 78/21@1800 50/18@2000 50/14@2200', label: 'Крик прерывает стаю — завершение' }
            ] }
    }
};
