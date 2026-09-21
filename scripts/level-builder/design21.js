// УРОВЕНЬ 21 (v3) — форма комбо извлечена из прежней версии, времена подобраны refit.js под честную модель (А11). Правится вручную по А11.
module.exports = {
    n: 21, damageByClass: true, timeNextBoss: 17, bossInterval: 5, tight: { p1: 500, floor: 170 },
    cfg: { levelCadence: 0.86, minWaveDelay: 2800, minShotDelay: 144, minTelegraphMs: 530 },
    phases: [
        { minHp: 0.64, cadence: 1, speed: 1, telegraphMultiplier: 1, surpriseChance: 0.16, maxActiveAttacks: 16 },
        { minHp: 0.3, cadence: 0.81, speed: 1.12, telegraphMultiplier: 0.89, surpriseChance: 0.27, maxActiveAttacks: 22 },
        { minHp: 0, cadence: 0.68, speed: 1.21, telegraphMultiplier: 0.81, surpriseChance: 0.37, maxActiveAttacks: 26 }
    ],
    bosses: {
        enem1: { title: 'Космаль', identity: 'Первый покос',
            trick: 'ведёт прицел вдоль прохода, затем возвращает угрозу за спину прохода',
            tight: { p1: 400, floor: 120 }, style: 'straight', cadence: 1.03, telegraphMs: 860, speedMultiplier: 0.93, signatureEvery: 4, delay: [204, 5355], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '10/15@2062 70/17@2162 20/19@2166', label: '' },
                { id: 'b', tight: false, beats: '70/15@2212 10/17@2162 30/19@2166 20/21@2210', label: '' },
                { id: 'c', tight: false, beats: '10/15@2062 20/17@2162 70/19@2166 30/21@2210', label: '' },
                { id: 'd', tight: false, beats: '70/15@2212 30/17@2162 10/19@2166 20/21@2210', label: '' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '10/15@2212 70/17@2162 30/19@2166 20/21@2210', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '70/15@2212 10/17@2162 20/19@2166 30/21@2210', label: 'Первый покос — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '10/15@2212 20/17@2162 14/19@2166 70/21@2210', label: 'Первый покос — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '70/15@2212 10/17@2162 20/19@2166 14/21@2210', label: 'Первый покос — завершение' }
            ] },
        enem2: { title: 'Ворошень', identity: 'Обратный взмах ворошилки',
            trick: 'показывает боковой замах, но заканчивает серединой; позднее конец возвращается на край',
            tight: { p1: 400, floor: 120 }, style: 'weave', cadence: 0.89, telegraphMs: 730, speedMultiplier: 1.07, signatureEvery: 4, delay: [290, 5487], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '90/13@2098 80/14@2318 70/15@2438', label: '' },
                { id: 'b', tight: false, beats: '70/13@2098 90/14@2262 80/14@2408', label: '' },
                { id: 'c', tight: false, beats: '90/13@2098 70/14@2206 80/15@2334 30/16@2454', label: '' },
                { id: 'd', tight: false, gaps: [0,250,250], beats: '70/13@2188 90/14@2290 30/15@2412 80/16@2552', label: '' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '90/13@2098 80/14@2262 70/15@2412 30/16@2576', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [0,0,0,250], beats: '90/13@2188 70/14@2290 80/15@2412 30/16@2552 86/17@2706', label: 'Обратный взмах ворошилки — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, gaps: [550,0,250,250], beats: '70/13@2188 90/14@2582 80/15@2704 30/16@2844 86/17@2998', label: 'Обратный взмах ворошилки — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '90/12@2338 80/13@2476 70/13@2674 86/14@2834 30/14@2980', label: 'Обратный взмах ворошилки — завершение' }
            ] },
        enem3: { title: 'Копнуша', identity: 'Сено и скрытый ком',
            trick: 'медленный первый снаряд остаётся фоном для более срочного второго',
            tight: { p1: 400, floor: 120 }, style: 'lateRush', cadence: 1.19, telegraphMs: 990, speedMultiplier: 0.84, signatureEvery: 4, delay: [176, 5865], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '70/17@2114 30/19@2173 90/21@2261', label: '' },
                { id: 'b', tight: false, beats: '70/17@2114 90/19@2173 30/21@2229 70/23@2282', label: '' },
                { id: 'c', tight: false, beats: '70/17@2114 10/19@2173 30/21@2229 70/23@2282', label: '' },
                { id: 'd', tight: false, beats: '70/17@2114 30/19@2173 10/21@2229 70/23@2282', label: '' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '70/17@2114 30/19@2173 90/21@2229 70/23@2282', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '70/17@2114 90/6@2407 30/19@2275 10/21@2406', label: 'Сено и скрытый ком — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '70/17@2316 10/6@2637 30/19@2347 90/21@2406', label: 'Сено и скрытый ком — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '10/18@1958 50/6@2063 70/20@2181 30/22@2230', label: 'Сено и скрытый ком — завершение' }
            ] },
        enem4: { title: 'Возило', identity: 'Тележный толчок',
            trick: 'две короткие группы разделены паузой; вторая группа меняет сторону',
            tight: { p1: 400, floor: 120 }, style: 'pause', cadence: 0.85, telegraphMs: 645, speedMultiplier: 1.14, signatureEvery: 4, delay: [240, 5290], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, beats: '90/5@2698 20/12@2616 70/13@2668 30/13@2730', label: '' },
                { id: 'b', tight: false, beats: '20/5@3152 70/12@2464 90/13@2582 86/13@2730', label: '' },
                { id: 'c', tight: false, open: 0, beats: '80/5@2818 70/12@2464 20/13@2638 10/14@2766', label: '' },
                { id: 'd', tight: false, beats: '20/5@2758 80/12@2464 70/13@2582 30/14@2740', label: '' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '20/12@2260 70/13@2350 10/14@2458 14/15@2552', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '20/12@2352 10/13@2406 70/14@2484 14/15@2528', label: 'Тележный толчок — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '80/12@2260 70/13@2350 90/14@2458 86/15@2552', label: 'Тележный толчок — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '80/12@2260 90/13@2350 70/14@2458 86/15@2552', label: 'Тележный толчок — завершение' }
            ] },
        enem5: { title: 'Двукос', identity: 'Вторая коса после первой',
            trick: 'повторяет удар в прежнем секторе вместо ожидаемого чередования',
            tight: { p1: 400, floor: 120 }, style: 'drift', cadence: 0.73, telegraphMs: 625, speedMultiplier: 1.16, signatureEvery: 4, delay: [260, 4945], firstWave: 2374,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '50/4@2336 12/12@2256 30/13@2316', label: '' },
                { id: 'b', tight: false, beats: '12/4@2336 30/12@2256 70/13@2316 88/14@2365', label: '' },
                { id: 'c', tight: false, beats: '88/4@2874 30/11@2608 70/12@2596 12/13@2615', label: '' },
                { id: 'd', tight: false, gaps: [0,0,700], beats: '30/12@2186 70/13@2208 88/4@3344 12/14@2954', label: '' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '30/12@2036 70/13@2236 50/4@2626 88/14@2417', label: '' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '50/4@2784 88/12@2406 30/13@2426 70/14@2469', label: 'Вторая коса после первой — знакомство' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '50/4@2336 12/12@2256 30/13@2316 70/14@2365', label: 'Вторая коса после первой — иной конец' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, gaps: [0,0,550,550], beats: '12/4@2964 30/12@2376 70/13@2398 88/14@2804 30/15@3230', label: 'Вторая коса после первой — завершение' }
            ] }
    }
};
