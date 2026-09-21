// УРОВЕНЬ 20 (v3) — форма комбо извлечена из прежней версии, времена подобраны refit.js под честную модель (А11). Правится вручную по А11.
module.exports = {
    n: 20, damageByClass: true, damageClassOverride: { enem3: 'medium' }, timeNextBoss: 16, bossInterval: 6, tight: { p1: 500, floor: 170 },
    cfg: { levelCadence: 0.87, minWaveDelay: 2800, minShotDelay: 146, minTelegraphMs: 535 },
    phases: [
        { minHp: 0.65, cadence: 1, speed: 1, telegraphMultiplier: 1, surpriseChance: 0.15, maxActiveAttacks: 15 },
        { minHp: 0.3, cadence: 0.82, speed: 1.11, telegraphMultiplier: 0.89, surpriseChance: 0.26, maxActiveAttacks: 20 },
        { minHp: 0, cadence: 0.69, speed: 1.2, telegraphMultiplier: 0.82, surpriseChance: 0.36, maxActiveAttacks: 25 }
    ],
    bosses: {
        enem1: { title: 'Колючень', identity: 'Колючий шаг',
            trick: 'четвёрки и пятёрки ударов с правого края и центра; атаки сползают к центру, редкий медленный удар идёт из угла',
            tight: { p1: 400, floor: 120 }, style: 'drift', cadence: 1.02, telegraphMs: 800, speedMultiplier: 0.96, signatureEvery: 4, delay: [206, 5522], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '90/7@2544 30/14@2444 80/16@2428 70/17@2520', label: 'Справа, два в центр и медленный справа' },
                { id: 'b', tight: false, beats: '10/7@3040 30/14@2444 90/16@2428 70/17@2520', label: 'Справа, два в центр и медленный слева' },
                { id: 'c', tight: false, beats: '30/13@2404 90/15@2352 70/16@2428 80/18@2416', label: 'Справа, в центр, справа и в центр' },
                { id: 'd', tight: false, beats: '90/14@2296 80/16@2218 30/17@2310 70/19@2322', label: 'Дважды справа и два в центр' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '30/14@2110 70/16@2164 90/17@2208 80/19@2276', label: 'Два в центр и дважды справа' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '30/14@2140 90/16@2218 80/7@2406 70/17@2392', label: 'В центр, справа, в центр и медленный справа' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, gaps: [250,550,250,250], beats: '90/14@2264 30/16@2232 70/17@2664 80/19@2718 30/20@2886', label: 'В центр, справа, в центр, справа и в центр' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, gaps: [0,250,250,550], beats: '30/14@2264 90/16@2192 70/17@2324 80/19@2378 30/20@2846', label: 'Справа, два в центр, справа и в центр' }
            ] },
        enem2: { title: 'Белозубка', identity: 'Оскал по прямой',
            trick: 'плотные четвёрки и пятёрки с левого края и центра; атаки летят прямо и почти вместе',
            tight: { p1: 400, floor: 120 }, style: 'straight', cadence: 0.9, telegraphMs: 740, speedMultiplier: 1.06, signatureEvery: 4, delay: [285, 4853], firstWave: 2329,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '10/12@2360 70/13@2435 20/14@2507 30/15@2580', label: 'Слева, в центр, слева и в центр' },
                { id: 'b', tight: false, beats: '70/12@2262 10/13@2345 30/14@2451 20/15@2552', label: 'В центр, слева, в центр и слева' },
                { id: 'c', tight: false, beats: '8/12@2262 24/13@2345 30/14@2423 70/16@2490', label: 'Дважды слева и два в центр' },
                { id: 'd', tight: false, beats: '70/12@2262 30/13@2495 10/14@2591 20/15@2710', label: 'Два в центр и дважды слева' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '10/12@2262 70/13@2345 30/14@2451 20/15@2552', label: 'Слева, два в центр и слева' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '70/12@2426 10/13@2495 20/14@2563 30/15@2632 14/16@2698', label: 'В центр, дважды слева, в центр и слева' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '10/11@2502 20/12@2649 70/13@2751 14/14@2848 30/15@2966', label: 'Дважды слева, в центр, слева и в центр' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '10/11@2538 70/12@2617 20/13@2721 30/14@2792 14/15@2862', label: 'Слева, в центр, слева, в центр и слева' }
            ] },
        enem3: { title: 'Горчак', identity: 'Горькое ускорение',
            trick: 'короткие серии по центру и с одного края; к концу полёта атаки разгоняются',
            tight: { p1: 400, floor: 120 }, style: 'accelerate', cadence: 1.18, telegraphMs: 970, speedMultiplier: 0.85, signatureEvery: 4, delay: [178, 5865], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '70/16@1852 30/18@1892 70/20@1966 90/22@2036', label: '3 в центр и справа' },
                { id: 'b', tight: false, beats: '70/15@2196 30/17@2148 70/19@2154 10/21@2200', label: '3 в центр и слева' },
                { id: 'c', tight: false, beats: '90/16@1852 70/18@1892 30/20@1966 70/22@2036', label: 'Справа и 3 в центр' },
                { id: 'd', tight: false, beats: '10/15@2196 70/17@2148 30/19@2154 70/21@2200', label: 'Два в центр, слева и в центр' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '70/16@1812 90/18@1856 86/20@1934 80/22@1978', label: 'В центр и трижды справа' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '90/16@1812 86/18@1856 80/20@1934 70/22@1978', label: 'Трижды справа и в центр' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '70/16@1812 10/18@1856 14/20@1934 20/22@1978', label: 'В центр и трижды слева' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '70/16@2016 30/18@2040 90/20@2068 86/22@2128 70/24@2214', label: 'Два в центр, дважды справа и в центр' }
            ] },
        enem4: { title: 'Клохтун', identity: 'Клохтанье и рывок',
            trick: 'серии по четыре-пять ударов с края и центра, иногда с медленным ударом из угла; в конце полёта резкий рывок',
            tight: { p1: 400, floor: 120 }, style: 'lateRush', cadence: 0.79, telegraphMs: 620, speedMultiplier: 1.16, signatureEvery: 4, delay: [235, 5233], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '80/5@2908 20/12@2314 70/13@2373 30/14@2451', label: 'Слева, два в центр и медленный справа' },
                { id: 'b', tight: false, beats: '20/5@2410 70/12@2314 80/13@2373 90/14@2417', label: 'В центр, справа, медленный слева и справа' },
                { id: 'c', tight: false, beats: '80/5@2908 70/12@2354 20/13@2565 10/14@2595', label: 'В центр, дважды слева и медленный справа' },
                { id: 'd', tight: false, beats: '20/12@2252 70/13@2342 10/14@2409 14/14@2559', label: 'Слева, в центр и дважды слева' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '20/12@2294 10/13@2380 14/14@2409 70/14@2595', label: 'Трижды слева и в центр' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '80/12@2168 70/13@2304 90/14@2409 86/14@2595 30/14@2781', label: 'Справа, в центр, дважды справа и в центр' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '80/12@2376 90/13@2380 70/14@2409 86/14@2595 30/14@2745', label: 'Дважды справа, в центр, справа и в центр' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '20/12@2168 70/13@2380 10/14@2409 14/14@2595 30/14@2781', label: 'Слева, в центр, дважды слева и в центр' }
            ] },
        enem5: { title: 'Полевик', identity: 'Полевой шорох',
            trick: 'медленный удар снизу или с угла и быстрые с центра и края; атаки зависают в полёте и падают почти разом',
            tight: { p1: 400, floor: 120 }, style: 'pause', cadence: 0.74, telegraphMs: 630, speedMultiplier: 1.13, signatureEvery: 4, delay: [250, 4830], firstWave: 2318,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '12/4@3216 30/12@2491 70/13@2560 88/14@2619', label: 'Два в центр, справа и медленный слева' },
                { id: 'b', tight: false, beats: '88/4@2612 30/12@2491 70/13@2560 12/14@2619', label: 'Два в центр, медленный справа и слева' },
                { id: 'c', tight: false, beats: '30/12@2460 70/13@2489 88/4@3134 12/14@2565', label: 'Два в центр, слева и медленный справа' },
                { id: 'd', tight: false, beats: '30/12@2338 70/13@2461 12/4@2756 88/14@2593', label: 'Два в центр, справа и медленный слева' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '50/4@2688 12/12@2461 30/13@2560 70/14@2697', label: 'Слева, в центр, медленный в центр и в центр' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '50/4@2536 88/12@2461 30/13@2504 70/14@2565', label: 'Справа, в центр, медленный в центр и в центр' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '30/12@2306 70/13@2431 12/4@2604 30/14@2593', label: '3 в центр и медленный слева' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '30/12@2398 70/13@2489 88/4@2906 30/14@2671', label: '3 в центр и медленный справа' }
            ] }
    }
};
