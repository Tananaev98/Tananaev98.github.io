// УРОВЕНЬ 22 (v3) — форма комбо извлечена из прежней версии, времена подобраны refit.js под честную модель (А11). Правится вручную по А11.
module.exports = {
    n: 22, damageByClass: true, damageClassOverride: { enem2: 'medium', enem3: 'medium' }, timeNextBoss: 18, bossInterval: 4, tight: { p1: 500, floor: 170 },
    cfg: { levelCadence: 0.84, minWaveDelay: 2800, minShotDelay: 142, minTelegraphMs: 525 },
    phases: [
        { minHp: 0.64, cadence: 1, speed: 1, telegraphMultiplier: 1, surpriseChance: 0.16, maxActiveAttacks: 15 },
        { minHp: 0.29, cadence: 0.8, speed: 1.13, telegraphMultiplier: 0.88, surpriseChance: 0.28, maxActiveAttacks: 21 },
        { minHp: 0, cadence: 0.67, speed: 1.22, telegraphMultiplier: 0.81, surpriseChance: 0.38, maxActiveAttacks: 26 }
    ],
    bosses: {
        enem1: { title: 'Лемешок', identity: 'Лезвие с крючком',
            trick: 'серии по три-четыре удара: медленный из угла и быстрые с центра и другого края; атаки качаются на лету',
            tight: { p1: 400, floor: 120 }, style: 'weave', cadence: 1.05, telegraphMs: 780, speedMultiplier: 0.99, signatureEvery: 4, delay: [200, 4989], firstWave: 2395,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '90/6@2596 70/13@2444 10/14@2646', label: 'В центр, медленный справа и слева' },
                { id: 'b', tight: false, beats: '10/6@2526 70/13@2444 90/14@2526', label: 'В центр, медленный слева и справа' },
                { id: 'c', tight: false, beats: '70/13@2364 90/6@2596 30/14@2496 10/15@2624', label: 'Два в центр, медленный справа и слева' },
                { id: 'd', tight: false, beats: '70/13@2364 10/6@3086 30/14@2526 90/15@2708', label: 'Два в центр, справа и медленный слева' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '90/6@2948 70/13@2444 10/14@2526 30/15@2568', label: 'В центр, слева, в центр и медленный справа' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '10/6@2596 90/13@2510 70/14@2556 30/15@2624', label: 'Справа, в центр, медленный слева и в центр' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '70/13@2364 90/6@2596 10/14@2496 30/15@2624', label: 'В центр, слева, медленный справа и в центр' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '70/13@2300 10/6@2876 90/14@2496 30/15@2708', label: 'В центр, справа, в центр и медленный слева' }
            ] },
        enem2: { title: 'Плугарь', identity: 'Плуг на разгоне',
            trick: 'плотные серии с левого края и центра; к концу полёта атаки разгоняются, поздние обгоняют ранние',
            tight: { p1: 400, floor: 120 }, style: 'accelerate', cadence: 1.2, telegraphMs: 960, speedMultiplier: 0.83, signatureEvery: 4, delay: [175, 5865], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '10/14@2122 70/16@2190 20/18@2294 30/20@2318', label: 'Слева, в центр, слева и в центр' },
                { id: 'b', tight: false, beats: '70/14@2122 10/16@2190 30/18@2294 20/20@2318', label: 'В центр, слева, в центр и слева' },
                { id: 'c', tight: false, beats: '10/14@2122 20/16@2190 70/18@2294 30/20@2318', label: 'Дважды слева и два в центр' },
                { id: 'd', tight: false, beats: '70/14@2122 30/16@2190 10/18@2294 20/20@2318', label: 'Два в центр и дважды слева' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '10/14@2122 70/16@2190 30/18@2294 20/20@2318', label: 'Слева, два в центр и слева' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '70/14@2122 10/16@2190 20/18@2294 30/20@2318', label: 'В центр, дважды слева и в центр' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '10/14@2122 20/16@2190 14/18@2294 70/20@2318', label: 'Трижды слева и в центр' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '10/14@2122 70/16@2190 20/18@2294', label: 'Слева, в центр и слева' }
            ] },
        enem3: { title: 'Бодень', identity: 'Бодание',
            trick: 'серии с правого края и центра; атаки зависают в полёте и падают почти разом, между сериями долгая пауза',
            tight: { p1: 400, floor: 120 }, style: 'pause', cadence: 1.02, telegraphMs: 810, speedMultiplier: 0.95, signatureEvery: 4, delay: [206, 5950], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '90/20@1854 86/21@1976 30/22@2084', label: 'Дважды справа и в центр' },
                { id: 'b', tight: false, beats: '90/19@1954 30/20@2064 80/21@2122', label: 'Справа, в центр и справа' },
                { id: 'c', tight: false, beats: '90/20@1876 30/21@2018 86/22@2164 70/22@2294', label: 'Справа, в центр, справа и в центр' },
                { id: 'd', tight: false, beats: '30/19@1954 90/20@2086 70/21@2206 80/22@2294', label: 'В центр, справа, в центр и справа' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '90/19@1954 80/20@2086 30/21@2228 70/22@2374', label: 'Дважды справа и два в центр' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '30/19@1954 70/20@2086 90/21@2228 80/22@2374', label: 'Два в центр и дважды справа' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '90/19@1908 30/20@2042 70/21@2186 80/22@2314', label: 'Справа, два в центр и справа' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '30/19@1860 90/20@2020 80/21@2206 70/22@2374 86/22@2564', label: 'В центр, дважды справа, в центр и справа' }
            ] },
        enem4: { title: 'Бороздень', identity: 'Борозда по центру',
            trick: 'серии по центру и с одного края; атаки сползают к центру и идут плотно',
            tight: { p1: 400, floor: 120 }, style: 'drift', cadence: 0.83, telegraphMs: 640, speedMultiplier: 1.15, signatureEvery: 4, delay: [260, 5405], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, gaps: [250,250,400], beats: '70/12@2206 30/13@2286 70/14@2390 88/15@2664', label: '3 в центр и справа' },
                { id: 'b', tight: false, gaps: [700,250,250], beats: '70/12@2206 30/13@2736 70/14@2840 12/15@2964', label: '3 в центр и слева' },
                { id: 'c', tight: false, open: 0, gaps: [400,0,250], beats: '88/12@2206 70/13@2436 30/14@2506 70/15@2630', label: 'Справа и 3 в центр' },
                { id: 'd', tight: false, gaps: [250,250,400], beats: '12/5@2972 70/13@2286 30/14@2390 88/15@2664', label: 'Два в центр, справа и медленный слева' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '70/12@2114 88/13@2168 90/14@2270 86/15@2339', label: 'В центр и трижды справа' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '88/12@2114 90/13@2168 86/14@2270 70/15@2339', label: 'Трижды справа и в центр' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, gaps: [400,250,700], beats: '70/12@2206 30/13@2436 12/14@2540 70/15@3114', label: 'Два в центр, слева и в центр' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, gaps: [0,550,0,250], beats: '70/12@2206 30/13@2252 88/14@2656 90/15@2746 70/15@2996', label: 'Два в центр, дважды справа и в центр' }
            ] },
        enem5: { title: 'Микула', identity: 'Микулин замах',
            trick: 'медленный удар снизу или из угла и быстрые с центра и края; атаки летят прямо',
            tight: { p1: 400, floor: 120 }, style: 'straight', cadence: 0.72, telegraphMs: 620, speedMultiplier: 1.17, signatureEvery: 4, delay: [250, 4830], firstWave: 2318,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '50/4@2404 88/12@2288 30/13@2360', label: 'Справа, в центр и медленный в центр' },
                { id: 'b', tight: false, beats: '12/4@2404 30/12@2288 88/13@2360 70/15@2298', label: 'Два в центр, справа и медленный слева' },
                { id: 'c', tight: false, beats: '88/4@2940 30/12@2258 70/13@2388 12/15@2298', label: 'В центр, слева, в центр и медленный справа' },
                { id: 'd', tight: false, beats: '30/11@2300 70/12@2348 88/4@2498 12/14@2424', label: 'Два в центр, слева и медленный справа' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '30/12@2108 50/4@2406 88/13@2252 70/15@2298', label: 'В центр, справа, в центр и медленный в центр' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '30/12@2198 88/4@2674 70/13@2334 30/15@2298', label: '3 в центр и медленный справа' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '30/12@2138 12/4@2318 70/13@2252 30/15@2298', label: '3 в центр и медленный слева' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '30/12@2108 70/13@2180 12/4@2498 88/15@2250', label: 'Два в центр, справа и медленный слева' }
            ] }
    }
};
