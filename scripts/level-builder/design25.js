// УРОВЕНЬ 25 (v3) — форма комбо извлечена из прежней версии, времена подобраны refit.js под честную модель (А11). Правится вручную по А11.
module.exports = {
    n: 25, damageByClass: true, damageClassOverride: { enem4: 'light' }, timeNextBoss: 12, bossInterval: 6, tight: { p1: 500, floor: 170 },
    cfg: { levelCadence: 0.72, minWaveDelay: 3200, minShotDelay: 132, minTelegraphMs: 500 },
    phases: [
        { minHp: 0.65, cadence: 1, speed: 1, telegraphMultiplier: 1, surpriseChance: 0.16, maxActiveAttacks: 15 },
        { minHp: 0.3, cadence: 0.78, speed: 1.14, telegraphMultiplier: 0.88, surpriseChance: 0.29, maxActiveAttacks: 20 },
        { minHp: 0, cadence: 0.64, speed: 1.24, telegraphMultiplier: 0.8, surpriseChance: 0.4, maxActiveAttacks: 26 }
    ],
    bosses: {
        enem1: { title: 'Полудница', identity: 'Серп в полуденном мареве',
            trick: 'медленный первый снаряд остаётся фоном для более срочного второго',
            tight: { p1: 400, floor: 120 }, style: 'drift', cadence: 1, telegraphMs: 900, speedMultiplier: 0.9, signatureEvery: 4, delay: [210, 6806], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, gaps: [0,250], beats: '30/17@2020 10/13@2810 90/19@2240', label: 'В центр, справа и слева' },
                { id: 'b', tight: false, gaps: [150,700], beats: '90/13@2600 30/17@2230 10/19@2690', label: 'В центр, справа и слева' },
                { id: 'c', tight: false, gaps: [900,150], beats: '14/15@2254 86/17@2920 30/19@2890', label: 'Слева, в центр и справа' },
                { id: 'd', tight: false, gaps: [700,250,700], beats: '30/6@3010 14/17@2720 70/19@2730 86/18@3528', label: 'Слева, в центр, медленный в центр и справа' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [700,250,700], beats: '70/6@3010 86/17@2720 30/19@2730 14/18@3528', label: 'Справа, в центр, медленный в центр и слева' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [0,0,550,550], beats: '10/13@2600 30/16@2324 90/18@2298 30/19@2750 14/20@3210', label: 'Справа, в центр, слева, в центр и слева' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, gaps: [250,900], beats: '30/16@2114 90/18@2128 10/19@2930', label: 'В центр, справа и слева' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, gaps: [250,550], beats: '90/17@2020 30/19@2030 14/18@2678', label: 'Справа, в центр и слева' }
            ] },
        enem2: { title: 'Маревая Полудница', identity: 'Отражённый замах',
            trick: 'повторяет удар в прежнем секторе вместо ожидаемого чередования',
            tight: { p1: 400, floor: 120 }, style: 'weave', cadence: 0.88, telegraphMs: 870, speedMultiplier: 1.2, speedVariance: [0.82, 0.94, 1.06, 1.18, 1.3], signatureEvery: 4, delay: [280, 7200], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, gaps: [250,0,550,550], beats: '14/5@2988 30/14@2062 90/15@2186 30/13@2996 76/14@3408', label: 'В центр, справа, медленный слева, в центр и справа' },
                { id: 'b', tight: false, gaps: [550,550,550,0], beats: '20/5@2988 30/15@2240 90/13@3050 30/14@3462 76/15@3586', label: 'В центр, медленный слева, справа, в центр и справа' },
                { id: 'c', tight: false, gaps: [550,550,550,550], beats: '14/5@2988 30/13@2500 90/14@2912 30/15@3340 76/16@3786', label: 'В центр, справа, медленный слева, в центр и справа' },
                { id: 'd', tight: false, gaps: [250,550,0,550], beats: '20/5@2988 30/14@2062 86/15@2490 30/13@2996 70/14@3408', label: 'В центр, справа, медленный слева и два в центр' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [250,550,550,0], beats: '24/5@2988 30/15@1940 76/13@2750 30/14@3162 90/15@3286', label: 'В центр, справа, медленный слева, в центр и справа' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [550,550,550,0], beats: '14/5@2988 30/15@2240 76/13@3050 30/14@3462 90/15@3586', label: 'В центр, медленный слева, справа, в центр и справа' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, gaps: [0,250,550,0], beats: '20/13@1950 14/14@2058 30/15@2186 80/15@2736 86/16@2879', label: 'Дважды слева, в центр и дважды справа' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, gaps: [250,0,550,550], beats: '24/5@2988 30/13@2200 90/14@2308 30/15@2736 76/16@3182', label: 'В центр, справа, в центр, медленный слева и справа' }
            ] },
        enem3: { title: 'Жаровая Полудница', identity: 'Жар между борозд',
            trick: 'медленный снаряд с фланга держится фоном, пока в центре бьёт дважды подряд разряд, нарастающий по скорости',
            tight: { p1: 400, floor: 120 }, style: 'accelerate', cadence: 1.22, telegraphMs: 1080, speedMultiplier: 1.1, speedVariance: [0.75, 0.86, 0.98, 1.1, 1.22], signatureEvery: 4, delay: [172, 5780], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, gaps: [550,250,550,250], beats: '80/5@3020 30/12@2628 20/13@2718 30/14@3132 76/15@3262', label: 'В центр, слева, медленный справа, в центр и справа' },
                { id: 'b', tight: false, gaps: [550,250,0,250], beats: '86/5@3020 31/13@2468 24/14@2582 29/15@2672 70/16@2818', label: 'В центр, слева, два в центр и медленный справа' },
                { id: 'c', tight: false, gaps: [0,550,550,250], beats: '80/5@3020 30/13@2128 14/14@2542 30/15@2972 76/16@3118', label: 'В центр, слева, в центр, медленный справа и справа' },
                { id: 'd', tight: false, gaps: [0,550,550,250], beats: '80/5@3020 30/12@2288 24/13@2678 30/14@3092 90/15@3222', label: 'В центр, слева, медленный справа, в центр и справа' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [550,0,250,550], beats: '76/5@3020 30/13@2468 20/14@2542 30/15@2672 90/16@3118', label: 'В центр, слева, в центр, медленный справа и справа' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [0,550,550,250], beats: '86/5@3020 30/13@2128 20/14@2542 30/15@2972 76/16@3118', label: 'В центр, слева, в центр, медленный справа и справа' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, gaps: [550,250,250,550], beats: '86/5@3020 30/12@2628 14/13@2718 30/14@2832 90/15@3262', label: 'В центр, слева, в центр, медленный справа и справа' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, gaps: [550,0,250,550], beats: '86/5@3020 30/12@2628 24/13@2678 30/14@2792 76/15@3222', label: 'В центр, слева, в центр, медленный справа и справа' }
            ] },
        enem4: { title: 'Венценосная Полудница', identity: 'Венец раскрывается',
            trick: 'сводит угрозы с краёв к внутренним полосам, затем размыкает рисунок',
            tight: { p1: 400, floor: 120 }, style: 'lateRush', cadence: 0.74, telegraphMs: 680, speedMultiplier: 1.2, speedVariance: [0.82, 0.94, 1.06, 1.18, 1.3], signatureEvery: 4, delay: [225, 5175], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, gaps: [400,700,0], beats: '10/5@3004 30/11@2862 90/12@3358 30/13@3351', label: 'В центр, медленный слева, в центр и справа' },
                { id: 'b', tight: false, gaps: [700,0,250], beats: '14/5@3004 30/12@2958 90/13@2951 30/14@3053', label: 'Справа, в центр, медленный слева и в центр' },
                { id: 'c', tight: false, gaps: [400,400,0], beats: '20/5@3004 30/12@2658 90/13@2884 30/14@2903', label: 'В центр, справа, в центр и медленный слева' },
                { id: 'd', tight: false, gaps: [400,700,250], beats: '24/5@3004 30/11@2862 90/12@3358 30/13@3434', label: 'В центр, медленный слева, справа и в центр' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [550], beats: '86/5@3004 24/13@2634', label: 'Слева и медленный справа' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [400,400,0], beats: '76/5@2976 30/12@2658 24/13@2884 30/14@2903', label: 'В центр, слева, в центр и медленный справа' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, gaps: [550,250,250,250], beats: '86/5@3004 24/11@3012 30/12@3058 70/13@3134 76/14@3236', label: 'Медленный справа, слева, два в центр и справа' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, gaps: [450,350], beats: '10/5@3004 30/11@2912 90/12@3058', label: 'В центр, медленный слева и справа' }
            ] },
        enem5: { title: 'Истинная Полудница', identity: 'Последний солнечный обман',
            trick: 'боковой снаряд подолгу висит фоном, пока по центру дважды бьёт разряд с заметной заминкой в полёте',
            tight: { p1: 400, floor: 120 }, style: 'pause', cadence: 0.68, telegraphMs: 700, speedMultiplier: 1.2, speedVariance: [0.82, 0.94, 1.06, 1.18, 1.3], signatureEvery: 4, delay: [250, 8200], firstWave: 2263,
            combos: [
                { id: 'a', tight: false, open: 0, gaps: [550,550,250,550], beats: '76/5@3016 30/11@3034 90/12@3412 30/13@3518 24/16@3740', label: 'Медленный справа, в центр, справа, в центр и слева' },
                { id: 'b', tight: false, gaps: [0,250,550,250], beats: '86/5@3016 30/12@2482 90/13@2588 30/16@2810 20/15@3154', label: 'В центр, справа, в центр, медленный справа и слева' },
                { id: 'c', tight: false, gaps: [550,250,550,250], beats: '76/5@3016 30/13@2718 90/16@2640 30/15@3284 14/16@3440', label: 'Справа, в центр, медленный справа, в центр и слева' },
                { id: 'd', tight: false, gaps: [550,550,250,550], beats: '86/5@3016 30/11@3034 76/12@3412 30/13@3518 20/16@3740', label: 'Медленный справа, в центр, справа, в центр и слева' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [0,250,250,550], beats: '76/5@3016 30/12@2482 86/13@2588 30/16@2510 24/15@3154', label: 'Два в центр, справа, медленный справа и слева' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [550,550,250,550], beats: '86/5@3016 30/13@2718 76/16@2940 30/15@3284 24/16@3740', label: 'В центр, справа, медленный справа, в центр и слева' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, gaps: [0,250,250,550], beats: '76/5@3016 30/11@2654 86/12@2732 30/13@2838 20/16@3060', label: 'В центр, справа, в центр, медленный справа и слева' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, gaps: [700,250,250], beats: '76/5@3016 30/11@3184 90/12@3262 30/13@3368', label: 'Медленный справа, в центр, справа и в центр' }
            ] }
    }
};
