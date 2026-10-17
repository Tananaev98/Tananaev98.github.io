// УРОВЕНЬ 26 (v3) — форма комбо извлечена из прежней версии, времена подобраны refit.js под честную модель (А11). Правится вручную по А11.
module.exports = {
    n: 26, damageByClass: true, damageClassOverride: { enem1: 'light', enem2: 'medium', enem5: 'medium' }, timeNextBoss: 6, bossInterval: 5, tight: { p1: 500, floor: 170 },
    cfg: { levelCadence: 0.9, minWaveDelay: 2150, minShotDelay: 150, minTelegraphMs: 555 },
    phases: [
        { minHp: 0.65, cadence: 1, speed: 1, telegraphMultiplier: 1, surpriseChance: 0.13, maxActiveAttacks: 14 },
        { minHp: 0.31, cadence: 0.82, speed: 1.14, telegraphMultiplier: 0.9, surpriseChance: 0.23, maxActiveAttacks: 16 },
        { minHp: 0, cadence: 0.66, speed: 1.28, telegraphMultiplier: 0.78, surpriseChance: 0.33, maxActiveAttacks: 21 }
    ],
    bosses: {
        enem1: { title: 'Чернавка', identity: 'Корень тянет обратно',
            trick: 'медленный корень справа висит фоном, пока быстрые удары чередуют левый край и центр',
            tight: { p1: 400, floor: 120 }, style: 'pause', cadence: 1.05, telegraphMs: 900, speedMultiplier: 1.4, speedVariance: [0.99, 1.02, 1.05, 1.08, 1.11], signatureEvery: 4, delay: [180, 6600], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, gaps: [600,0,300], beats: '88/5@2980 8/11@2774 70/11@2961 9/12@3091', label: 'Слева, в центр, медленный справа и слева' },
                { id: 'b', tight: false, gaps: [300,0,600,300], beats: '88/5@2980 8/11@2448 70/11@2635 9/12@3065 70/12@3415', label: 'Слева, в центр, медленный справа, слева и в центр' },
                { id: 'c', tight: false, gaps: [600,300], beats: '88/5@2980 8/11@2720 70/12@2904', label: 'Слева, в центр и медленный справа' },
                { id: 'd', tight: false, gaps: [600,300,300,300,600], beats: '88/5@2980 12/11@2774 70/11@3020 13/12@3228 70/12@3478 14/11@4274', label: 'Слева, медленный справа, в центр, слева, в центр и слева' },
                { id: 'e', tight: false, gaps: [600,0,0], beats: '88/5@2980 10/12@2578 70/11@2881 11/11@3149', label: 'Слева, в центр, медленный справа и слева' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [300,600,600], beats: '88/5@2980 8/11@2366 9/11@3074 70/12@3454', label: 'Слева, медленный справа, слева и в центр' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, gaps: [600,300,300,300], beats: '88/5@2980 10/11@2774 70/11@2966 11/12@3204 70/12@3430', label: 'Слева, в центр, медленный справа, слева и в центр' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, gaps: [0,300,300,0], beats: '14/12@2028 71/12@2215 15/11@2661 71/11@2961 8/12@2979', label: 'Слева, в центр, слева, в центр и слева' }
            ] },
        enem2: { title: 'Ботвинья', identity: 'Ботва распускается',
            trick: 'быстрые удары идут из центра на левый край и обратно; в завершении за ними висит медленный правый побег',
            tight: { p1: 400, floor: 120 }, style: 'lateRush', cadence: 0.95, telegraphMs: 780, speedMultiplier: 1.2, speedVariance: [0.9, 0.96, 1.02, 1.08, 1.14], signatureEvery: 4, delay: [150, 5200], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, gaps: [300,300,300], beats: '71/14@1882 8/15@2088 69/16@2188 9/15@2688', label: 'В центр, слева, в центр и слева' },
                { id: 'b', tight: false, gaps: [600,600,0,600,0], beats: '86/5@2974 71/15@2326 10/16@2788 71/15@3048 11/14@3836 69/15@3866', label: 'В центр, слева, медленный справа, в центр, слева и в центр' },
                { id: 'c', tight: false, gaps: [300,300,300], beats: '71/14@1848 8/15@2058 69/16@2158 9/15@2658', label: 'В центр, слева, в центр и слева' },
                { id: 'd', tight: false, gaps: [300,0], beats: '71/14@1814 8/15@2026 70/16@2132', label: 'В центр, слева и в центр' },
                { id: 'e', tight: false, gaps: [0,300,300,0], beats: '69/15@1726 10/16@1712 69/15@2148 11/14@2602 69/15@2570', label: 'Слева, 3 в центр и слева' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [300,300,0], beats: '69/14@1916 10/15@2058 70/16@2278 11/15@2542', label: 'В центр, слева, в центр и слева' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, gaps: [300,300,0], beats: '69/14@1882 10/15@2026 70/16@2278 11/15@2512', label: 'В центр, слева, в центр и слева' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, gaps: [600,600,600,0,0], beats: '86/5@2974 70/16@2278 12/15@2988 69/14@3648 13/15@3742 70/16@3786', label: 'В центр, медленный справа, слева, в центр, слева и в центр' }
            ] },
        enem3: { title: 'Белобока', identity: 'Стержень и боковой корешок',
            trick: 'после центрального выпада левый край бьёт почти сразу, а медленный правый корешок остаётся фоном',
            tight: { p1: 400, floor: 120 }, style: 'accelerate', cadence: 1.1, telegraphMs: 980, speedMultiplier: 1.1, speedVariance: [1, 1.045, 1.09, 1.135, 1.18], signatureEvery: 4, delay: [155, 6000], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, gaps: [300,300,0,0], beats: '70/11@2248 8/12@2362 71/12@2494 70/13@2555 9/11@3186', label: 'В центр, слева, два в центр и слева' },
                { id: 'b', tight: false, gaps: [600,0,0], beats: '69/12@2018 8/13@2502 9/13@2671 70/14@2632', label: 'В центр, слева, в центр и слева' },
                { id: 'c', tight: false, gaps: [0,600,0], beats: '69/12@1976 10/13@2071 11/13@2671 70/14@2596', label: 'В центр, слева, в центр и слева' },
                { id: 'd', tight: false, gaps: [600,300,0,600,0], beats: '84/5@2996 69/12@2534 8/13@2724 70/13@2817 70/14@3291 9/12@3900', label: 'В центр, слева, в центр, медленный справа, в центр и слева' },
                { id: 'e', tight: false, gaps: [300,300,0], beats: '69/12@1894 12/13@2124 13/13@2464 71/14@2499', label: 'В центр, дважды слева и в центр' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [600,300], beats: '84/5@2996 70/12@2662 8/13@2686', label: 'В центр, слева и медленный справа' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, gaps: [600,0,600,600], beats: '84/5@2996 70/12@2662 12/13@2555 13/13@3193 71/14@3663', label: 'Слева, в центр, медленный справа, слева и в центр' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, gaps: [300,0,0,0], beats: '70/12@2062 13/13@2086 71/13@2333 71/14@2296 13/12@2869', label: 'В центр, слева, два в центр и слева' }
            ] },
        enem4: { title: 'Кругляш', identity: 'Редиска возвращается',
            trick: 'центр возвращается после левого края: удар повторяется в том же секторе вместо ожидаемой смены стороны',
            tight: { p1: 400, floor: 120 }, style: 'weave', cadence: 0.82, telegraphMs: 650, speedMultiplier: 1.16, speedVariance: [1.055, 1.0875, 1.12, 1.1525, 1.185], signatureEvery: 4, delay: [150, 7000], firstWave: 1968,
            combos: [
                { id: 'a', tight: false, open: 0, gaps: [300,0,0], beats: '90/5@2992 70/13@2246 12/12@2590 13/13@2608', label: 'В центр, дважды слева и медленный справа' },
                { id: 'b', tight: false, gaps: [300,0,300,0], beats: '71/13@1946 14/12@2436 69/13@2400 15/12@2890 8/13@2908', label: 'Два в центр и трижды слева' },
                { id: 'c', tight: false, gaps: [600,0,0,0], beats: '70/12@2136 12/13@2572 70/12@2862 13/13@2880 14/13@3034', label: 'В центр, слева, в центр и дважды слева' },
                { id: 'd', tight: false, gaps: [0,0,0], beats: '90/5@2992 69/13@2044 8/12@2444 9/13@2434', label: 'В центр, дважды слева и медленный справа' },
                { id: 'e', tight: false, gaps: [0,0], beats: '8/12@2078 70/13@2154 9/12@2444', label: 'Слева, в центр и слева' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [300,0,600,0], beats: '90/5@2992 70/13@2300 8/12@2502 70/13@3054 71/12@3344', label: 'В центр, слева, медленный справа и два в центр' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, gaps: [300,300,0,0], beats: '71/12@2108 12/13@2246 69/12@2736 13/13@2700 14/12@3016', label: 'В центр, дважды слева, в центр и слева' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, gaps: [0,0,0], beats: '69/12@2108 8/13@2126 70/13@2308 69/12@2540', label: 'В центр, слева и два в центр' }
            ] },
        enem5: { title: 'Спасовка', identity: 'Сбор корнеплодов',
            trick: 'две левые атаки идут почти вместе, затем центр дважды закрывает полосу между ними',
            tight: { p1: 400, floor: 120 }, style: 'straight', cadence: 0.85, telegraphMs: 585, speedMultiplier: 1.25, speedVariance: [1.01, 1.035, 1.06, 1.085, 1.11], signatureEvery: 4, delay: [195, 6600], firstWave: 2256,
            combos: [
                { id: 'a', tight: false, open: 0, gaps: [300,0,0,0], beats: '8/11@2194 71/12@2310 9/12@2474 10/13@2458 70/11@2957', label: 'Слева, в центр, дважды слева и в центр' },
                { id: 'b', tight: false, gaps: [600,300,0,0,300], beats: '86/5@2974 12/11@2794 71/12@2856 13/12@3074 14/13@3084 70/11@3662', label: 'Слева, в центр, медленный справа, дважды слева и в центр' },
                { id: 'c', tight: false, gaps: [0,0,0], beats: '86/5@2974 8/11@2328 71/12@2256 69/12@2503', label: 'В центр, слева, в центр и медленный справа' },
                { id: 'd', tight: false, gaps: [0,300,300], beats: '12/11@2164 69/12@2148 69/12@2420 13/13@2620', label: 'В центр, слева, в центр и слева' },
                { id: 'e', tight: false, gaps: [0,300,300], beats: '14/11@2194 69/12@2092 70/12@2474 15/13@2594', label: 'В центр, слева, в центр и слева' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [300,300], beats: '86/5@2974 12/11@2434 13/12@2584', label: 'Дважды слева и медленный справа' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, gaps: [0,600,600,0,0], beats: '86/5@2974 15/12@2174 70/12@2774 8/13@3194 9/11@3722 70/12@3703', label: 'Слева, в центр, медленный справа, слева, в центр и слева' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, gaps: [300,300,0], beats: '8/11@2134 70/12@2310 70/12@2610 9/13@2594', label: 'Слева, в центр, слева и в центр' }
            ] }
    }
};
