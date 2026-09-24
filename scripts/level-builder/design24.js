// УРОВЕНЬ 24 (v3) — форма комбо извлечена из прежней версии, времена подобраны refit.js под честную модель (А11). Правится вручную по А11.
module.exports = {
    n: 24, damageByClass: true, damageClassOverride: { enem1: 'medium', enem2: 'medium', enem4: 'light' }, timeNextBoss: 20, bossInterval: 5, tight: { p1: 500, floor: 170 },
    cfg: { levelCadence: 0.81, minWaveDelay: 2800, minShotDelay: 138, minTelegraphMs: 515 },
    phases: [
        { minHp: 0.63, cadence: 1, speed: 1, telegraphMultiplier: 1, surpriseChance: 0.17, maxActiveAttacks: 17 },
        { minHp: 0.29, cadence: 0.78, speed: 1.15, telegraphMultiplier: 0.87, surpriseChance: 0.3, maxActiveAttacks: 22 },
        { minHp: 0, cadence: 0.65, speed: 1.24, telegraphMultiplier: 0.8, surpriseChance: 0.4, maxActiveAttacks: 26 }
    ],
    bosses: {
        enem1: { title: 'Мешкач', identity: 'Рывок жерновов',
            trick: 'плотные серии с правого края и центра; в конце полёта резкий рывок, порядок прилёта путается',
            tight: { p1: 400, floor: 120 }, style: 'lateRush', cadence: 1.21, telegraphMs: 1000, speedMultiplier: 0.82, signatureEvery: 4, delay: [174, 5950], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '90/18@2046 30/19@2149 80/21@2243', label: 'Справа, в центр и справа' },
                { id: 'b', tight: false, beats: '90/18@2046 30/19@2149 70/21@2243', label: 'Справа и два в центр' },
                { id: 'c', tight: false, beats: '90/18@2046 30/19@2149 80/21@2243 70/22@2338', label: 'Справа, в центр, справа и в центр' },
                { id: 'd', tight: false, beats: '30/18@2046 90/19@2335 70/21@2343 80/22@2466', label: 'В центр, справа, в центр и справа' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '90/18@2046 80/19@2149 30/21@2243 70/22@2338', label: 'Дважды справа и два в центр' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '30/18@2046 70/19@2335 90/21@2343 80/22@2466', label: 'Два в центр и дважды справа' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '90/19@2124 30/21@2133 80/22@2255 70/22@2434 84/22@2516', label: 'Справа, в центр, справа, в центр и справа' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '30/18@2046 90/19@2335 80/21@2343 70/22@2466 86/22@2676', label: 'В центр, дважды справа, в центр и справа' }
            ] },
        enem2: { title: 'Жерновень', identity: 'Жёрнов зависает',
            trick: 'быстрые серии с левого края и центра; атаки зависают в полёте и падают почти разом, между сериями долгая пауза',
            tight: { p1: 400, floor: 120 }, style: 'pause', cadence: 1.03, telegraphMs: 815, speedMultiplier: 0.94, signatureEvery: 4, delay: [165, 5780], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '10/19@1900 20/20@1974 70/21@2056', label: 'Дважды слева и в центр' },
                { id: 'b', tight: false, beats: '10/19@1946 70/20@2018 20/21@2078', label: 'Слева, в центр и слева' },
                { id: 'c', tight: false, beats: '10/19@1900 70/20@1996 20/21@2098 30/22@2208', label: 'Слева, в центр, слева и в центр' },
                { id: 'd', tight: false, beats: '70/19@1970 10/20@2062 30/21@2120 20/22@2188', label: 'В центр, слева, в центр и слева' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '10/19@1946 20/20@2062 70/21@2162 30/22@2268', label: 'Дважды слева и два в центр' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '10/19@1900 20/20@2018 70/21@2140 14/22@2268', label: 'Дважды слева, в центр и слева' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '10/19@1970 70/20@2062 30/21@2162 20/22@2228', label: 'Слева, два в центр и слева' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '10/19@1946 70/20@2040 20/21@2140 14/22@2248', label: 'Слева, в центр и дважды слева' }
            ] },
        enem3: { title: 'Мучень', identity: 'Мука по прямой',
            trick: 'серии по центру и с одного края, изредка длинные; атаки летят прямо и плотно',
            tight: { p1: 400, floor: 120 }, style: 'straight', cadence: 0.91, telegraphMs: 720, speedMultiplier: 1.04, signatureEvery: 4, delay: [231, 5495], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '70/12@2404 30/14@2328 88/16@2274', label: 'Справа и два в центр' },
                { id: 'b', tight: false, beats: '70/12@2338 30/14@2328 70/16@2274 88/17@2375', label: '3 в центр и справа' },
                { id: 'c', tight: false, beats: '70/12@2472 30/14@2328 70/16@2274 12/17@2375', label: 'Два в центр, слева и в центр' },
                { id: 'd', tight: false, beats: '88/12@2338 70/14@2328 30/16@2274 70/17@2375', label: 'Два в центр, справа и в центр' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '12/12@2438 70/14@2328 30/16@2274 70/17@2375', label: '3 в центр и слева' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '70/12@2338 88/14@2328 90/16@2274 86/17@2375', label: 'Дважды справа, в центр и справа' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '88/12@2338 90/14@2328 86/16@2274 70/17@2375', label: 'Трижды справа и в центр' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '70/12@2304 30/14@2328 88/16@2274 90/17@2375 70/18@2489', label: 'Справа, два в центр, справа и в центр' }
            ] },
        enem4: { title: 'Крылорез', identity: 'Крыло у земли',
            trick: 'очень быстрые серии с медленным ударом снизу или из угла; атаки качаются на лету',
            tight: { p1: 400, floor: 120 }, style: 'weave', cadence: 0.77, telegraphMs: 605, speedMultiplier: 1.21, signatureEvery: 4, delay: [220, 5060], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '50/4@2412 12/11@2361 30/12@2463', label: 'Слева, медленный в центр и в центр' },
                { id: 'b', tight: false, beats: '50/4@2412 30/11@2361 70/12@2463', label: 'В центр, медленный в центр и в центр' },
                { id: 'c', tight: false, beats: '12/4@2498 30/11@2393 70/12@2463 88/13@2470', label: 'Два в центр, справа и медленный слева' },
                { id: 'd', tight: false, gaps: [250,250,400], beats: '88/4@3014 30/11@2536 70/12@2596 12/13@2834', label: 'Два в центр, слева и медленный справа' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [550,0,250,250], beats: '30/11@2286 12/4@3564 70/12@2815 30/13@2903 88/13@3153', label: '3 в центр, справа и медленный слева' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [0,250,250,550], beats: '30/11@2286 70/12@2265 12/4@3433 88/13@2603 30/13@3153', label: 'Два в центр, справа, в центр и медленный слева' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, gaps: [250,550,550,0], beats: '12/4@3014 30/11@2536 70/12@2896 88/13@3284 30/13@3453', label: 'Два в центр, медленный слева, справа и в центр' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, gaps: [250,550,550,0], beats: '88/4@3014 30/11@2536 70/12@2896 12/13@3284 30/13@3453', label: 'Два в центр, медленный справа, слева и в центр' }
            ] },
        enem5: { title: 'Белоручка', identity: 'Белые руки',
            trick: 'медленный удар из угла и быстрые с центра и края, по четыре-пять подряд; к концу полёта атаки разгоняются',
            tight: { p1: 400, floor: 120 }, style: 'accelerate', cadence: 0.7, telegraphMs: 600, speedMultiplier: 1.19, signatureEvery: 4, delay: [245, 5700], firstWave: 2263,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '80/5@2126 20/13@1982 70/14@2025', label: 'Слева, в центр и медленный справа' },
                { id: 'b', tight: false, beats: '20/5@1940 80/13@1836 70/14@1921', label: 'Справа, в центр и медленный слева' },
                { id: 'c', tight: false, beats: '80/5@2188 20/13@1800 70/14@1989 30/15@2085', label: 'Слева, два в центр и медленный справа' },
                { id: 'd', tight: false, beats: '20/5@1940 70/13@1800 80/14@1889 90/15@1957', label: 'В центр, справа, медленный слева и справа' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '70/13@1810 80/5@1932 30/14@1855 20/15@1927', label: 'Два в центр, слева и медленный справа' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [0,250,550,0], beats: '70/13@1774 20/5@3180 30/14@2068 80/15@2510 90/16@2585', label: 'Два в центр, дважды справа и медленный слева' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, gaps: [250,250,550,550], beats: '80/5@3008 20/12@2172 70/14@2146 10/15@2588 30/16@3042', label: 'В центр, дважды слева, медленный справа и в центр' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '20/5@2252 70/13@1982 80/14@2025 90/15@2085 30/16@2158', label: 'В центр, дважды справа, в центр и медленный слева' }
            ] }
    }
};
