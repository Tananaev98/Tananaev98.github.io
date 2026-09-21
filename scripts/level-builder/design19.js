// УРОВЕНЬ 19 (v3) — форма комбо извлечена из прежней версии, времена подобраны refit.js под честную модель (А11). Правится вручную по А11.
module.exports = {
    n: 19, damageByClass: true, timeNextBoss: 15, bossInterval: 4, tight: { p1: 500, floor: 170 },
    cfg: { levelCadence: 0.89, minWaveDelay: 2800, minShotDelay: 148, minTelegraphMs: 540 },
    phases: [
        { minHp: 0.65, cadence: 1, speed: 1, telegraphMultiplier: 1, surpriseChance: 0.15, maxActiveAttacks: 15 },
        { minHp: 0.3, cadence: 0.83, speed: 1.1, telegraphMultiplier: 0.9, surpriseChance: 0.25, maxActiveAttacks: 19 },
        { minHp: 0, cadence: 0.7, speed: 1.19, telegraphMultiplier: 0.83, surpriseChance: 0.35, maxActiveAttacks: 25 }
    ],
    bosses: {
        enem1: { title: 'Прожорень', identity: 'Жадный глоток',
            trick: 'четвёрки ударов с края и центра; медленный удар из угла прилетает вместе с быстрыми, атаки зависают в полёте',
            tight: { p1: 400, floor: 120 }, style: 'pause', cadence: 1, telegraphMs: 720, speedMultiplier: 1.05, signatureEvery: 4, delay: [200, 4600], firstWave: 2208,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '10/6@2958 70/15@2244 20/16@2468 30/17@2570', label: 'В центр, слева, в центр и медленный слева' },
                { id: 'b', tight: false, beats: '90/6@2958 70/15@2244 10/16@2468 30/17@2570', label: 'В центр, слева, в центр и медленный справа' },
                { id: 'c', tight: false, beats: '70/15@2044 10/16@2242 30/17@2370 20/18@2484', label: 'В центр, слева, в центр и слева' },
                { id: 'd', tight: false, beats: '10/15@2044 20/16@2144 70/17@2254 30/18@2352', label: 'Дважды слева и два в центр' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '70/15@2044 30/16@2268 10/17@2370 20/18@2484', label: 'Два в центр и дважды слева' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '10/6@2826 20/15@2244 70/16@2344 30/17@2454', label: 'Слева, два в центр и медленный слева' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '70/15@2044 10/16@2242 20/6@2448 30/17@2454', label: 'В центр, слева, медленный слева и в центр' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, gaps: [250,0,250,550], beats: '10/15@2150 70/16@2292 30/17@2396 20/18@2562 70/19@3036', label: 'Слева, два в центр, слева и в центр' }
            ] },
        enem2: { title: 'Латник', identity: 'Стальной ряд',
            trick: 'быстрые четвёрки с правого края и центра; атаки сползают к центру и идут плотным рядом',
            tight: { p1: 400, floor: 120 }, style: 'drift', cadence: 0.9, telegraphMs: 780, speedMultiplier: 0.98, signatureEvery: 4, delay: [233, 5100], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '90/15@2098 70/16@2150 80/17@2221 30/18@2283', label: 'Справа, в центр, справа и в центр' },
                { id: 'b', tight: false, gaps: [0,0,400], beats: '70/15@2070 90/16@2150 30/17@2245 80/18@2545', label: 'В центр, справа, в центр и справа' },
                { id: 'c', tight: false, beats: '86/15@2014 92/16@2072 70/18@2121 30/20@2181', label: 'Дважды справа и два в центр' },
                { id: 'd', tight: false, gaps: [700,0,400], beats: '70/15@2070 30/16@2640 90/17@2736 80/18@3036', label: 'Два в центр и дважды справа' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [0,400,400], beats: '90/15@2070 70/16@2150 30/17@2436 80/18@2736', label: 'Справа, два в центр и справа' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '70/15@2098 90/16@2150 80/17@2221 30/18@2283', label: 'В центр, дважды справа и в центр' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '90/15@1956 80/16@2044 86/17@2145 70/18@2259', label: 'Трижды справа и в центр' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '70/15@1956 90/16@2044 80/17@2145 86/18@2259', label: 'В центр и трижды справа' }
            ] },
        enem3: { title: 'Зубоскал', identity: 'Шепелявый зубоскал',
            trick: 'короткие плотные серии с центра и одного края; атаки качаются на лету',
            tight: { p1: 400, floor: 120 }, style: 'weave', cadence: 0.78, telegraphMs: 600, speedMultiplier: 1.18, signatureEvery: 4, delay: [240, 4500], firstWave: 2160,
            combos: [
                { id: 'a', tight: false, open: 0, gaps: [0,250,700], beats: '70/12@2150 30/13@2171 70/14@2279 12/15@2857', label: '3 в центр и слева' },
                { id: 'b', tight: false, beats: '70/11@2312 30/12@2365 70/13@2384 88/14@2430', label: '3 в центр и справа' },
                { id: 'c', tight: false, gaps: [0,400,250], beats: '12/12@2150 70/13@2171 30/14@2429 70/15@2557', label: 'Слева и 3 в центр' },
                { id: 'd', tight: false, beats: '88/11@2312 70/12@2365 30/13@2384 70/14@2430', label: 'Справа и 3 в центр' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [0,400,400], beats: '70/12@2150 12/13@2171 30/14@2429 70/15@2707', label: 'В центр, слева и два в центр' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [250,0,250], beats: '70/12@2150 88/13@2234 30/14@2279 70/15@2407', label: 'В центр, справа и два в центр' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '12/12@2002 10/13@2063 14/14@2116 70/15@2188', label: 'Трижды слева и в центр' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '70/12@2002 12/13@2063 10/14@2116 14/15@2188', label: 'В центр и трижды слева' }
            ] },
        enem4: { title: 'Хлебокрад', identity: 'Хлебная пыль',
            trick: 'серии по четыре-пять ударов с одного края и центра; к концу полёта атаки разгоняются',
            tight: { p1: 400, floor: 120 }, style: 'accelerate', cadence: 0.88, telegraphMs: 730, speedMultiplier: 1.06, signatureEvery: 4, delay: [290, 5000], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, gaps: [0,250,550,0], beats: '20/14@1848 70/16@1873 10/17@2032 14/19@2422 30/19@2678', label: 'Слева, в центр, дважды слева и в центр' },
                { id: 'b', tight: false, gaps: [250,250,550,0], beats: '20/14@1848 10/16@1873 70/17@2032 14/19@2422 30/19@2678', label: 'Дважды слева, в центр, слева и в центр' },
                { id: 'c', tight: false, gaps: [0,250,0,550], beats: '80/14@1848 70/16@1873 90/17@2032 86/19@2128 30/19@2678', label: 'Справа, в центр, дважды справа и в центр' },
                { id: 'd', tight: false, gaps: [0,0,0,550], beats: '80/14@1848 90/16@1873 70/17@2032 86/19@2128 30/19@2678', label: 'Дважды справа, в центр, справа и в центр' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [0,250,400], beats: '20/14@1848 70/16@1873 10/17@2032 14/19@2272', label: 'Слева, в центр и дважды слева' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [0,400,250], beats: '20/14@1848 10/16@1873 70/17@2177 14/19@2272', label: 'Дважды слева, в центр и слева' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '80/14@1810 70/16@1873 90/17@1908 86/19@1990', label: 'Справа, в центр и дважды справа' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '80/14@1810 90/16@1873 70/17@1908 86/19@1990', label: 'Дважды справа, в центр и справа' }
            ] },
        enem5: { title: 'Ненасыть', identity: 'Ненасытный рывок',
            trick: 'медленный удар с одного края и быстрые с центра и другого; в конце полёта резкий рывок',
            tight: { p1: 400, floor: 120 }, style: 'lateRush', cadence: 0.74, telegraphMs: 630, speedMultiplier: 1.12, signatureEvery: 4, delay: [255, 5600], firstWave: 2016,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '12/4@2860 30/12@2391 70/13@2649 88/14@2676', label: 'Два в центр, справа и медленный слева' },
                { id: 'b', tight: false, beats: '88/4@2730 30/12@2391 70/13@2451 12/14@2528', label: 'Два в центр, слева и медленный справа' },
                { id: 'c', tight: false, beats: '30/12@2462 70/13@2461 88/4@2591 12/14@2566', label: 'Два в центр, слева и медленный справа' },
                { id: 'd', tight: false, beats: '30/12@2462 70/13@2461 12/4@2721 88/14@2566', label: 'Два в центр, справа и медленный слева' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '30/12@2332 70/13@2461 12/14@2487 90/4@2780', label: 'Два в центр, слева и медленный справа' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '70/12@2288 30/13@2343 88/14@2413 12/4@2652', label: 'Два в центр, справа и медленный слева' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '12/4@3248 30/12@2563 70/13@2649 88/14@2676 30/15@2725', label: 'Два в центр, справа, в центр и медленный слева' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '88/4@2990 30/12@2435 70/13@2531 12/14@2638 30/15@2725', label: 'Два в центр, слева, в центр и медленный справа' }
            ] }
    }
};
