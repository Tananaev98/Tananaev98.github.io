// УРОВЕНЬ 14 (v3) — форма комбо извлечена из прежней версии, времена подобраны refit.js под честную модель (А11). Правится вручную по А11.
module.exports = {
    n: 14, damageTiers: { enem1: [12, 16, 20], enem2: [10, 14, 19], enem3: [12, 16, 20], enem4: [11, 15, 19], enem5: [12, 17, 30] }, // урон атаки по классу скорости (быстрые/средние/медленные) — как в прежней версии уровня: цифры не менялись
    timeNextBoss: 9, bossInterval: 4, tight: { p1: 500, floor: 170 },
    cfg: { levelCadence: 0.72, minWaveDelay: 3100, minShotDelay: 135, minTelegraphMs: 470 },
    phases: [
        { minHp: 0.66, cadence: 1, speed: 1, telegraphMultiplier: 1, surpriseChance: 0.14, maxActiveAttacks: 15 },
        { minHp: 0.31, cadence: 0.77, speed: 1.13, telegraphMultiplier: 0.9, surpriseChance: 0.27, maxActiveAttacks: 19 },
        { minHp: 0, cadence: 0.63, speed: 1.25, telegraphMultiplier: 0.83, surpriseChance: 0.38, maxActiveAttacks: 22 }
    ],
    bosses: {
        enem1: { title: 'Баюнище', identity: 'Заговорённый',
            trick: 'атаки зависают в полёте и падают разом; связки чередуют край и центр',
            tight: { p1: 400, floor: 120 }, style: 'pause', cadence: 1.02, telegraphMs: 820, speedMultiplier: 1.02, signatureEvery: 4, delay: [340, 6000], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, beats: '8/12@2510 16/14@2587 24/18@2622 70/20@2796', label: 'Трижды слева и в центр' },
                { id: 'b', tight: false, beats: '8/12@2510 20/17@2363 70/20@2470', label: 'Слева, в центр и слева' },
                { id: 'c', tight: false, beats: '12/13@2350 30/14@2559 70/19@2542', label: 'Слева и два в центр' },
                { id: 'd', tight: false, gaps: [700,250], beats: '10/12@2646 70/16@2790 90/20@2803', label: 'Слева, в центр и справа' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [400,700,0], beats: '10/12@2646 70/14@2728 90/19@2926 30/20@3203', label: 'Слева, в центр, справа и в центр' },
                { id: 'f', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '10/11@2588 70/12@2823 20/17@2710 8/20@2816', label: 'Трижды слева и в центр' },
                { id: 'g', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '8/11@2588 70/13@2665 16/18@2622 24/20@2776', label: 'Дважды слева, в центр и слева' },
                { id: 'h', tight: false, beats: '10/12@2510 70/13@2665 24/17@2710 30/20@2816', label: 'Слева, в центр, слева и в центр' }
            ] },
        enem2: { title: 'Каркун-Вещун', identity: 'Дурной знак',
            trick: 'атаки уходят к центру по пути; свои и чужие удары сходятся по времени',
            tight: { p1: 400, floor: 120 }, style: 'drift', cadence: 0.92, telegraphMs: 720, speedMultiplier: 1.08, signatureEvery: 4, delay: [300, 5500], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, gaps: [250,250], beats: '92/12@2348 30/16@2038 84/18@2118', label: 'В центр и дважды справа' },
                { id: 'b', tight: false, gaps: [0,550], beats: '84/13@2168 92/17@1934 30/18@2392', label: 'Дважды справа и в центр' },
                { id: 'c', tight: false, beats: '92/12@2188 30/13@2474 70/18@2140', label: 'В центр, справа и в центр' },
                { id: 'd', tight: false, beats: '76/12@2188 84/16@2062 92/18@2140', label: 'Трижды справа' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [700,0,700], beats: '92/12@2348 30/13@2868 84/17@2634 76/18@3242', label: 'Дважды справа, в центр и справа' },
                { id: 'f', tight: false, sig: true, minPhase: 2, recoveryMs: 650, gaps: [700,250,400], beats: '84/13@2168 30/16@2462 92/18@2542 70/17@3034', label: 'Справа, в центр, справа и в центр' },
                { id: 'g', tight: false, sig: true, minPhase: 3, recoveryMs: 950, gaps: [700,0,250], beats: '92/12@2348 30/14@2712 76/17@2634 70/18@2818', label: 'Дважды справа и два в центр' },
                { id: 'h', tight: false, gaps: [0,400,400], beats: '76/13@2168 84/16@2038 30/17@2334 92/18@2642', label: 'Дважды справа, в центр и справа' }
            ] },
        enem3: { title: 'Цепняк', identity: 'Звено за звеном',
            trick: 'атаки летят прямо и быстро; связки по три-четыре удара сходятся у линии героя',
            tight: { p1: 400, floor: 120 }, style: 'straight', cadence: 1.05, telegraphMs: 780, speedMultiplier: 0.98, signatureEvery: 4, delay: [310, 5400], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, beats: '30/15@2098 70/17@2152 10/19@2219 24/20@2423', label: 'Два в центр и дважды слева' },
                { id: 'b', tight: false, beats: '30/16@1968 92/19@1982 70/20@2161 31/20@2423', label: 'В центр, справа и два в центр' },
                { id: 'c', tight: false, beats: '30/15@1956 88/18@2074 76/20@2183', label: 'В центр и дважды справа' },
                { id: 'd', tight: false, beats: '30/17@1802 92/19@1916 84/20@2097 76/20@2423', label: 'В центр и трижды справа' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '70/16@1808 30/18@1934 8/20@2097', label: 'Два в центр и слева' },
                { id: 'f', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '30/16@1808 70/18@1934 92/20@2097', label: 'Два в центр и справа' },
                { id: 'g', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '30/17@1802 70/18@1934 31/20@2097', label: '3 в центр' },
                { id: 'h', tight: false, beats: '70/15@2014 10/18@2074 24/19@2197 30/20@2423', label: 'В центр, дважды слева и в центр' }
            ] },
        enem4: { title: 'Ступолёт', identity: 'Топот на разгоне',
            trick: 'атаки разгоняются к концу полёта; серии по четыре-пять ударов сжимаются',
            tight: { p1: 400, floor: 120 }, style: 'accelerate', cadence: 0.84, telegraphMs: 650, speedMultiplier: 1.12, signatureEvery: 4, delay: [290, 6800], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, gaps: [0,0,400], beats: '10/11@2226 24/15@1878 70/16@2019 8/17@2329', label: 'Слева, в центр и дважды слева' },
                { id: 'b', tight: false, beats: '8/11@2088 16/13@2168 70/16@2051 30/17@2203', label: 'В центр, дважды слева и в центр' },
                { id: 'c', tight: false, beats: '10/11@2134 70/15@1912 30/17@1959 24/16@2295', label: 'Два в центр и дважды слева' },
                { id: 'd', tight: false, beats: '8/11@2180 16/12@2242 70/16@2051 24/17@2203 30/17@2446', label: 'В центр, трижды слева и в центр' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [0,550,0,0], beats: '10/12@2040 70/14@1994 30/15@2428 20/16@2569 8/17@2723', label: 'В центр, слева, в центр и дважды слева' },
                { id: 'f', tight: false, sig: true, minPhase: 2, recoveryMs: 650, gaps: [550,0,250,550], beats: '8/11@2226 70/13@2434 20/16@2326 12/17@2486 30/17@3036', label: 'Дважды слева, в центр, слева и в центр' },
                { id: 'g', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '8/11@2134 20/13@2168 70/16@2051 24/17@2203 30/17@2446', label: 'В центр, трижды слева и в центр' },
                { id: 'h', tight: false, beats: '10/11@2088 16/13@2168 70/16@2051 30/16@2295 24/17@2416', label: 'В центр, дважды слева, в центр и слева' }
            ] },
        enem5: { title: 'Избач', identity: 'Налёт стаей',
            trick: 'в конце полёта атаки рвутся вперёд; серии из пяти ударов идут плотно',
            tight: { p1: 400, floor: 120 }, style: 'lateRush', cadence: 0.75, telegraphMs: 640, speedMultiplier: 1.14, signatureEvery: 4, delay: [250, 8300], firstWave: 2016,
            combos: [
                { id: 'a', tight: false, gaps: [250,250,0,550], beats: '8/13@2192 16/14@2286 24/13@2692 70/14@2724 20/15@3140', label: 'Трижды слева, в центр и слева' },
                { id: 'b', tight: false, gaps: [550,250,0,0], beats: '92/13@2192 70/14@2586 84/15@2702 88/14@3024 76/15@3077', label: 'Справа, в центр и трижды справа' },
                { id: 'c', tight: false, gaps: [0,0,0,250], beats: '8/14@2036 70/13@2380 16/15@2277 30/14@2599 24/13@3005', label: 'Дважды слева, два в центр и слева' },
                { id: 'd', tight: false, gaps: [250,250,250,250], beats: '92/13@2192 70/14@2286 84/15@2402 30/13@2942 88/14@3036', label: 'Справа, в центр, справа, в центр и справа' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [0,250,0,0], beats: '8/13@2192 16/14@2224 70/15@2340 24/13@2817 12/14@2849', label: 'Дважды слева, в центр и дважды слева' },
                { id: 'f', tight: false, sig: true, minPhase: 2, recoveryMs: 650, gaps: [0,0,0,0], beats: '92/15@1902 84/13@2380 70/14@2411 88/15@2465 80/14@2786', label: 'Дважды справа, в центр и дважды справа' },
                { id: 'g', tight: false, sig: true, minPhase: 3, recoveryMs: 950, gaps: [0,0,0,0], beats: '8/15@1902 70/13@2380 30/14@2411 31/13@2755 24/14@2786', label: 'Слева, 3 в центр и слева' },
                { id: 'h', tight: false, gaps: [0,0,250,0], beats: '70/14@2036 8/13@2380 30/15@2277 16/13@2817 24/14@2849', label: 'Два в центр и трижды слева' }
            ] }
    }
};
