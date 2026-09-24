// УРОВЕНЬ 21 (v3) — форма комбо извлечена из прежней версии, времена подобраны refit.js под честную модель (А11). Правится вручную по А11.
module.exports = {
    n: 21, damageByClass: true, damageClassOverride: { enem3: 'medium' }, timeNextBoss: 17, bossInterval: 5, tight: { p1: 500, floor: 170 },
    cfg: { levelCadence: 0.86, minWaveDelay: 2800, minShotDelay: 144, minTelegraphMs: 530 },
    phases: [
        { minHp: 0.64, cadence: 1, speed: 1, telegraphMultiplier: 1, surpriseChance: 0.16, maxActiveAttacks: 16 },
        { minHp: 0.3, cadence: 0.81, speed: 1.12, telegraphMultiplier: 0.89, surpriseChance: 0.27, maxActiveAttacks: 22 },
        { minHp: 0, cadence: 0.68, speed: 1.21, telegraphMultiplier: 0.81, surpriseChance: 0.37, maxActiveAttacks: 26 }
    ],
    bosses: {
        enem1: { title: 'Космаль', identity: 'Космы по прямой',
            trick: 'короткие быстрые серии с левого края и центра; атаки летят прямо и почти вместе',
            tight: { p1: 400, floor: 120 }, style: 'straight', cadence: 1.03, telegraphMs: 860, speedMultiplier: 0.93, signatureEvery: 4, delay: [204, 5355], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '10/16@1990 70/17@2082 20/18@2164', label: 'Слева, в центр и слева' },
                { id: 'b', tight: false, beats: '70/16@1962 10/17@2056 30/18@2138 20/19@2258', label: 'В центр, слева, в центр и слева' },
                { id: 'c', tight: false, beats: '10/16@2074 20/18@2052 70/20@2078 30/22@2138', label: 'Дважды слева и два в центр' },
                { id: 'd', tight: false, beats: '70/17@1846 30/19@1908 10/21@1978 20/23@2034', label: 'Два в центр и дважды слева' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '10/16@2074 70/18@2052 30/20@2078 20/22@2138', label: 'В центр, слева, в центр и слева' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '70/17@1846 10/19@1908 20/21@1978 30/23@2034', label: 'В центр, дважды слева и в центр' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '10/17@1846 20/19@1908 14/21@1978 70/23@2034', label: 'Трижды слева и в центр' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '70/16@2074 10/18@2052 20/20@2078 14/22@2138', label: 'Слева, в центр и дважды слева' }
            ] },
        enem2: { title: 'Ворошень', identity: 'Ворох справа',
            trick: 'серии по три-пять ударов с правого края и центра; атаки качаются на лету и идут плотно',
            tight: { p1: 400, floor: 120 }, style: 'weave', cadence: 0.89, telegraphMs: 730, speedMultiplier: 1.07, signatureEvery: 4, delay: [290, 5487], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '90/13@2098 80/14@2318 30/15@2438', label: 'Дважды справа и в центр' },
                { id: 'b', tight: false, beats: '90/13@2158 30/13@2326 86/14@2520', label: 'Справа, в центр и справа' },
                { id: 'c', tight: false, gaps: [250,250,250], beats: '90/13@2188 30/14@2290 80/15@2412 70/16@2552', label: 'Справа, в центр, справа и в центр' },
                { id: 'd', tight: false, beats: '30/13@2218 90/14@2318 70/15@2412 80/16@2478', label: 'В центр, справа, в центр и справа' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '90/13@2098 80/14@2262 30/15@2412 70/16@2576', label: 'Дважды справа и два в центр' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [550,250,250,0], beats: '90/13@2188 30/14@2582 80/15@2704 70/16@2844 86/17@2998', label: 'Справа, в центр, справа, в центр и справа' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '30/12@2402 90/13@2476 80/14@2576 70/15@2696 86/16@2834', label: 'В центр, дважды справа, в центр и справа' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, gaps: [0,0,250,250], beats: '90/13@2188 80/14@2290 30/15@2412 86/16@2552 70/17@2706', label: 'Дважды справа, в центр, справа и в центр' }
            ] },
        enem3: { title: 'Копнуша', identity: 'Копнуть и рвануть',
            trick: 'серии с центра и одного края; в конце полёта резкий рывок, порядок прилёта путается',
            tight: { p1: 400, floor: 120 }, style: 'lateRush', cadence: 1.19, telegraphMs: 990, speedMultiplier: 0.84, signatureEvery: 4, delay: [176, 5865], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '70/17@2114 30/19@2173 90/21@2261', label: 'Два в центр и справа' },
                { id: 'b', tight: false, beats: '70/17@2114 30/19@2173 10/21@2229 70/23@2282', label: 'Два в центр, слева и в центр' },
                { id: 'c', tight: false, beats: '70/17@2114 30/19@2173 90/21@2229 70/23@2282', label: 'Два в центр, справа и в центр' },
                { id: 'd', tight: false, beats: '70/17@2236 90/6@2407 30/19@2311 10/21@2372', label: 'Два в центр, слева и медленный справа' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '70/17@2316 10/6@2637 30/19@2347 90/21@2406', label: 'Два в центр, справа и медленный слева' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '10/17@2114 70/19@2173 30/21@2229 31/23@2282', label: 'Слева и 3 в центр' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '70/17@2114 30/19@2173 70/21@2229 30/23@2282', label: '4 в центр' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '70/17@2196 30/19@2283 70/21@2295 10/23@2342', label: '3 в центр и слева' }
            ] },
        enem4: { title: 'Возило', identity: 'Возня у края',
            trick: 'серии с одного края и центра, иногда с медленным ударом из угла; атаки зависают в полёте и падают разом',
            tight: { p1: 400, floor: 120 }, style: 'pause', cadence: 0.85, telegraphMs: 645, speedMultiplier: 1.14, signatureEvery: 4, delay: [240, 5290], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, beats: '80/5@2638 20/12@2494 70/13@2582 30/14@2662', label: 'Слева, в центр, медленный справа и в центр' },
                { id: 'b', tight: false, beats: '20/5@3080 70/12@2494 80/13@2582 90/14@2662', label: 'В центр, дважды справа и медленный слева' },
                { id: 'c', tight: false, open: 0, beats: '80/5@2878 70/12@2494 20/13@2696 10/14@2766', label: 'В центр, дважды слева и медленный справа' },
                { id: 'd', tight: false, beats: '20/5@2638 80/12@2494 70/13@2582 30/14@2662', label: 'Справа, в центр, медленный слева и в центр' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '20/12@2290 70/13@2378 10/14@2458 14/15@2552', label: 'Слева, в центр и дважды слева' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '20/12@2352 10/13@2406 70/14@2484 14/15@2528', label: 'Дважды слева, в центр и слева' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '80/12@2290 30/13@2378 90/14@2458 86/15@2552', label: 'Справа, в центр и дважды справа' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '80/12@2352 90/13@2406 30/14@2484 86/15@2528', label: 'Дважды справа, в центр и справа' }
            ] },
        enem5: { title: 'Двукос', identity: 'Двойной покос',
            trick: 'медленный удар снизу или из угла и быстрые с центра и края; атаки сползают к центру',
            tight: { p1: 400, floor: 120 }, style: 'drift', cadence: 0.73, telegraphMs: 625, speedMultiplier: 1.16, signatureEvery: 4, delay: [260, 4945], firstWave: 2374,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '50/4@2336 12/12@2256 30/13@2316', label: 'Слева, в центр и медленный в центр' },
                { id: 'b', tight: false, beats: '12/4@2336 30/12@2256 70/13@2316 88/14@2365', label: 'Два в центр, медленный слева и справа' },
                { id: 'c', tight: false, beats: '88/4@2874 30/11@2608 70/12@2596 12/13@2615', label: 'Два в центр, слева и медленный справа' },
                { id: 'd', tight: false, gaps: [0,0,700], beats: '30/12@2186 70/13@2208 88/4@3344 12/14@2954', label: 'Два в центр, слева и медленный справа' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '30/12@2156 70/13@2236 50/4@2716 88/14@2341', label: 'Два в центр, справа и медленный в центр' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '50/4@2336 12/12@2256 30/13@2316 70/14@2365', label: 'Слева, в центр, медленный в центр и в центр' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, gaps: [400,700,0], beats: '88/12@2186 30/13@2418 70/14@2974 30/15@3040', label: 'Справа и 3 в центр' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, gaps: [0,0,550,550], beats: '12/4@2964 30/12@2376 70/13@2398 88/14@2804 30/15@3230', label: 'Два в центр, справа, медленный слева и в центр' }
            ] }
    }
};
