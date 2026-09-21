// УРОВЕНЬ 13 (v3) — форма комбо извлечена из прежней версии, времена подобраны refit.js под честную модель (А11). Правится вручную по А11.
module.exports = {
    n: 13, timeNextBoss: 8, bossInterval: 4, tight: { p1: 500, floor: 170 },
    cfg: { levelCadence: 0.79, minWaveDelay: 3100, minShotDelay: 145, minTelegraphMs: 480 },
    phases: [
        { minHp: 0.66, cadence: 1, speed: 1, telegraphMultiplier: 1, surpriseChance: 0.12, maxActiveAttacks: 15 },
        { minHp: 0.31, cadence: 0.78, speed: 1.12, telegraphMultiplier: 0.9, surpriseChance: 0.23, maxActiveAttacks: 19 },
        { minHp: 0, cadence: 0.64, speed: 1.22, telegraphMultiplier: 0.84, surpriseChance: 0.32, maxActiveAttacks: 21 }
    ],
    bosses: {
        enem1: { title: 'Когтехват', identity: 'Хват когтями',
            trick: 'в конце полёта когти резко ускоряются; связки чередуют край и центр',
            tight: { p1: 400, floor: 120 }, style: 'lateRush', cadence: 1.02, telegraphMs: 780, speedMultiplier: 1.04, signatureEvery: 4, delay: [290, 5600], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, beats: '10/12@2558 24/14@2568 70/20@2184', label: 'В центр и дважды слева' },
                { id: 'b', tight: false, beats: '8/13@2318 70/14@2370 16/20@2184', label: 'Дважды слева и в центр' },
                { id: 'c', tight: false, beats: '12/17@1806 70/19@1940', label: 'Слева и в центр' },
                { id: 'd', tight: false, gaps: [550,0], beats: '10/12@2604 70/16@2504 90/20@2410', label: 'Справа, в центр и слева' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [0,0,700], beats: '8/12@2604 70/13@2700 30/17@2432 92/20@2856', label: 'В центр, слева, в центр и справа' },
                { id: 'f', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '10/12@2420 70/14@2450 24/18@2360 30/20@2479', label: 'Дважды слева и два в центр' },
                { id: 'g', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '8/13@2190 16/14@2450 24/18@2360 70/20@2479', label: 'Трижды слева и в центр' }
            ] },
        enem2: { title: 'Ухух', identity: 'Ухающий налёт',
            trick: 'атаки зависают в середине полёта; пятиударные серии сходятся по времени в конце',
            tight: { p1: 400, floor: 120 }, style: 'pause', cadence: 0.96, telegraphMs: 700, speedMultiplier: 1.08, signatureEvery: 4, delay: [250, 5200], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, beats: '92/12@2362 30/13@2452 84/15@2556 76/17@2648 70/18@2760', label: 'Справа, в центр, дважды справа и в центр' },
                { id: 'b', tight: false, beats: '84/13@2302 92/12@2602 30/17@2408 76/18@2564', label: 'Справа, в центр и дважды справа' },
                { id: 'c', tight: false, beats: '92/12@2362 30/16@2262 70/18@2324', label: 'Два в центр и справа' },
                { id: 'd', tight: false, beats: '92/12@2362 84/13@2482 30/16@2502 70/18@2564', label: 'Дважды справа и два в центр' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '92/12@2362 30/13@2452 84/17@2408 70/18@2564', label: 'Дважды справа и два в центр' },
                { id: 'f', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '76/12@2362 84/13@2482 92/16@2502 30/18@2564', label: 'Трижды справа и в центр' },
                { id: 'g', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '92/12@2362 84/14@2434 30/17@2408', label: 'Справа, в центр и справа' }
            ] },
        enem3: { title: 'Хаптун', identity: 'Скользящий налёт',
            trick: 'атаки уходят к центру по пути; быстрые броски догоняют более ранние',
            tight: { p1: 400, floor: 120 }, style: 'drift', cadence: 1.14, telegraphMs: 900, speedMultiplier: 0.9, signatureEvery: 4, delay: [340, 6000], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, beats: '30/17@1852 10/21@1998 24/23@2145', label: 'В центр и дважды слева' },
                { id: 'b', tight: false, beats: '10/17@1852 70/21@1910 30/23@2145', label: 'Слева и два в центр' },
                { id: 'c', tight: false, beats: '30/17@1852 88/20@1964 76/23@2145', label: 'В центр и дважды справа' },
                { id: 'd', tight: false, beats: '30/17@1962 92/23@1878', label: 'Справа и в центр' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '70/17@2016 30/20@2102 8/23@2245', label: 'Два в центр и слева' },
                { id: 'f', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '30/17@2016 70/20@2102 92/23@2245', label: 'Два в центр и справа' },
                { id: 'g', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '70/16@2114 10/19@2192 24/21@2407 30/23@2633', label: 'В центр, дважды слева и в центр' }
            ] },
        enem4: { title: 'Долбун', identity: 'Долбёжка',
            trick: 'атаки качаются; серии из четырёх-пяти ударов с одного края и центра',
            tight: { p1: 400, floor: 120 }, style: 'weave', cadence: 0.88, telegraphMs: 620, speedMultiplier: 1.14, signatureEvery: 4, delay: [230, 6600], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, gaps: [400,0,700], beats: '10/12@2224 70/14@2306 24/16@2270 14/16@2970', label: 'Дважды слева, в центр и слева' },
                { id: 'b', tight: false, beats: '8/12@2164 20/14@2134 30/15@2209 70/16@2299', label: 'Дважды слева и два в центр' },
                { id: 'c', tight: false, gaps: [400,0,700], beats: '10/12@2224 70/14@2306 30/15@2382 24/16@2970', label: 'Слева, два в центр и слева' },
                { id: 'd', tight: false, gaps: [0,0,250,550], beats: '8/12@2224 20/13@2256 70/14@2311 12/15@2435 30/16@2873', label: 'Дважды слева, в центр, слева и в центр' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [0,0,0,550], beats: '8/12@2224 16/13@2256 24/14@2311 70/15@2387 30/16@2825', label: 'Трижды слева и два в центр' },
                { id: 'f', tight: false, sig: true, minPhase: 2, recoveryMs: 650, gaps: [0,250,250,550], beats: '10/12@2224 70/14@2108 20/15@2232 8/16@2370 30/16@2920', label: 'В центр, трижды слева и в центр' },
                { id: 'g', tight: false, sig: true, minPhase: 3, recoveryMs: 950, gaps: [0,0,250,250], beats: '8/12@2224 20/13@2256 70/14@2311 30/15@2435 24/16@2573', label: 'Дважды слева, два в центр и слева' }
            ] },
        enem5: { title: 'Токовик', identity: 'Токование',
            trick: 'атаки разгоняются к концу полёта; пятиударные серии идут очень плотно',
            tight: { p1: 400, floor: 120 }, style: 'accelerate', cadence: 0.7, telegraphMs: 610, speedMultiplier: 1.16, signatureEvery: 4, delay: [210, 8300], firstWave: 2256,
            combos: [
                { id: 'a', tight: false, gaps: [250,250,250,0], beats: '8/14@1690 16/15@1826 24/14@2190 70/15@2326 20/14@2587', label: 'Трижды слева, в центр и слева' },
                { id: 'b', tight: false, gaps: [250,0,0,0], beats: '92/13@1820 84/16@1728 76/14@2087 70/15@2120 88/14@2381', label: 'Трижды справа, в центр и справа' },
                { id: 'c', tight: false, gaps: [0,0,250,0], beats: '70/16@1478 8/14@1837 30/13@2114 16/15@2120 24/14@2381', label: 'В центр, слева, в центр и дважды слева' },
                { id: 'd', tight: false, gaps: [0,250,250,250], beats: '92/13@1820 70/15@1723 84/16@1875 30/14@2337 88/13@2717', label: 'В центр, дважды справа, в центр и справа' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [250,0,550,0], beats: '8/14@1690 16/16@1728 70/13@2217 24/15@2523 12/16@2572', label: 'Дважды слева, в центр и дважды слева' },
                { id: 'f', tight: false, sig: true, minPhase: 2, recoveryMs: 650, gaps: [0,250,0,0], beats: '92/14@1690 84/13@1967 70/16@1875 88/15@2120 80/13@2511', label: 'Справа, в центр и трижды справа' },
                { id: 'g', tight: false, sig: true, minPhase: 3, recoveryMs: 950, gaps: [0,250,0,0], beats: '8/14@1690 70/15@1723 30/14@2087 31/15@2120 24/14@2381', label: 'Слева, 3 в центр и слева' }
            ] }
    }
};
