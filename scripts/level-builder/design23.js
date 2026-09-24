// УРОВЕНЬ 23 (v3) — форма комбо извлечена из прежней версии, времена подобраны refit.js под честную модель (А11). Правится вручную по А11.
module.exports = {
    n: 23, damageByClass: true, damageClassOverride: { enem3: 'light' }, timeNextBoss: 19, bossInterval: 5, tight: { p1: 500, floor: 170 },
    cfg: { levelCadence: 0.83, minWaveDelay: 2800, minShotDelay: 140, minTelegraphMs: 520 },
    phases: [
        { minHp: 0.64, cadence: 1, speed: 1, telegraphMultiplier: 1, surpriseChance: 0.17, maxActiveAttacks: 15 },
        { minHp: 0.29, cadence: 0.79, speed: 1.14, telegraphMultiplier: 0.88, surpriseChance: 0.29, maxActiveAttacks: 22 },
        { minHp: 0, cadence: 0.66, speed: 1.23, telegraphMultiplier: 0.8, surpriseChance: 0.39, maxActiveAttacks: 26 }
    ],
    bosses: {
        enem1: { title: 'Хлыстень', identity: 'Хлёст справа',
            trick: 'быстрые серии с правого края и центра; к концу полёта атаки разгоняются, поздние обгоняют ранние',
            tight: { p1: 400, floor: 120 }, style: 'accelerate', cadence: 1.02, telegraphMs: 850, speedMultiplier: 0.94, signatureEvery: 4, delay: [206, 6024], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, gaps: [400,0,250], beats: '90/16@1824 30/18@2022 80/20@2070 70/22@2188', label: 'Справа, в центр, справа и в центр' },
                { id: 'b', tight: false, gaps: [250,250,700], beats: '30/16@1824 90/18@1872 70/20@1960 80/22@2528', label: 'В центр, справа, в центр и справа' },
                { id: 'c', tight: false, gaps: [0,400,250], beats: '90/16@1824 80/18@1832 30/20@2070 70/22@2188', label: 'Дважды справа и два в центр' },
                { id: 'd', tight: false, beats: '30/15@1786 70/17@1890 90/19@1956 80/21@2050', label: 'Два в центр и дважды справа' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [400,0,250], beats: '90/16@1824 30/18@2022 70/20@2070 80/22@2188', label: 'Справа, два в центр и справа' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '30/15@1786 90/17@1890 80/19@1956 70/21@2050', label: 'В центр, дважды справа и в центр' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '90/15@1786 80/17@1890 86/19@1956 30/21@2050', label: 'Трижды справа и в центр' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, gaps: [0,0,700], beats: '30/16@1824 90/18@1832 80/20@1880 86/22@2448', label: 'В центр и трижды справа' }
            ] },
        enem2: { title: 'Решетень', identity: 'Сито и рывок',
            trick: 'плотные серии с левого края и центра; в конце полёта резкий рывок, порядок прилёта путается',
            tight: { p1: 400, floor: 120 }, style: 'lateRush', cadence: 0.91, telegraphMs: 745, speedMultiplier: 1.05, signatureEvery: 4, delay: [231, 5362], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '10/14@2094 70/16@2180 20/17@2274', label: 'Слева, в центр и слева' },
                { id: 'b', tight: false, beats: '70/14@2054 10/16@2146 30/17@2208 20/18@2291', label: 'В центр, слева, в центр и слева' },
                { id: 'c', tight: false, beats: '10/14@2094 20/16@2180 70/17@2274 30/18@2351', label: 'Дважды слева и два в центр' },
                { id: 'd', tight: false, beats: '70/14@2054 30/16@2146 10/17@2208 20/18@2291', label: 'Два в центр и дважды слева' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '10/14@2212 70/16@2180 30/17@2274 20/18@2381', label: 'В центр, слева, в центр и слева' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '70/14@2054 10/16@2146 20/17@2208 30/18@2291', label: 'В центр, дважды слева и в центр' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '10/14@2054 20/16@2146 14/17@2208 70/18@2291', label: 'Трижды слева и в центр' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '70/13@2424 10/15@2310 30/16@2390 20/17@2485 70/18@2591', label: 'Слева, два в центр, слева и в центр' }
            ] },
        enem3: { title: 'Пылюга', identity: 'Пыль столбом',
            trick: 'очень быстрые серии с медленным ударом снизу или из угла; атаки сползают к центру и идут плотно',
            tight: { p1: 400, floor: 120 }, style: 'drift', cadence: 0.86, telegraphMs: 615, speedMultiplier: 1.19, signatureEvery: 4, delay: [225, 5060], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '50/4@2540 12/11@2454 10/12@2519', label: 'Дважды слева и медленный в центр' },
                { id: 'b', tight: false, beats: '50/4@2540 88/11@2454 90/12@2519', label: 'Дважды справа и медленный в центр' },
                { id: 'c', tight: false, beats: '50/4@2628 30/11@2392 12/12@2489 70/13@2575', label: 'В центр, слева, в центр и медленный в центр' },
                { id: 'd', tight: false, beats: '50/4@2628 30/11@2392 88/12@2489 70/13@2575', label: 'В центр, справа, в центр и медленный в центр' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '30/11@2260 70/12@2354 12/4@3015 88/13@2441', label: 'Два в центр, справа и медленный слева' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [0,0,700], beats: '30/11@2324 70/12@2326 88/4@3365 12/13@3055', label: 'Два в центр, слева и медленный справа' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, gaps: [0,550,550,550], beats: '12/11@2324 88/4@3172 30/12@2876 70/13@3262 10/13@3812', label: 'Слева, в центр, медленный справа, в центр и слева' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, gaps: [550,0,550,0], beats: '88/11@2324 12/4@3528 30/12@2876 70/13@3262 90/13@3455', label: 'Справа, два в центр, справа и медленный слева' }
            ] },
        enem4: { title: 'Колосень', identity: 'Колосья по прямой',
            trick: 'серии по центру и с одного края; атаки летят прямо и плотно',
            tight: { p1: 400, floor: 120 }, style: 'straight', cadence: 1.03, telegraphMs: 620, speedMultiplier: 1.02, signatureEvery: 4, delay: [235, 4270], firstWave: 2050,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '70/15@1962 30/17@2022 88/18@2164', label: 'Два в центр и справа' },
                { id: 'b', tight: false, beats: '70/15@1908 30/17@2022 12/18@2142', label: 'Два в центр и слева' },
                { id: 'c', tight: false, beats: '70/15@2016 30/17@2022 70/18@2164 88/19@2232', label: '3 в центр и справа' },
                { id: 'd', tight: false, gaps: [700,0,0], beats: '70/15@1990 30/17@2456 70/18@2600 12/19@2754', label: '3 в центр и слева' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '88/15@1908 70/17@2022 30/18@2164 70/19@2318', label: 'Справа и 3 в центр' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [400,250,0], beats: '12/15@1990 70/17@2156 30/18@2308 70/19@2462', label: 'Слева и 3 в центр' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, gaps: [0,0,550,250], beats: '70/15@1990 30/17@1998 88/18@2142 90/19@2604 70/20@2776', label: 'Два в центр, дважды справа и в центр' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, gaps: [0,250,250,550], beats: '70/15@1990 30/17@1998 12/18@2150 10/19@2312 70/20@2784', label: 'Два в центр, дважды слева и в центр' }
            ] },
        enem5: { title: 'Овинник', identity: 'Овинная возня',
            trick: 'серии по четыре-пять ударов с медленным ударом из угла; атаки качаются на лету',
            tight: { p1: 400, floor: 120 }, style: 'weave', cadence: 0.71, telegraphMs: 610, speedMultiplier: 1.18, signatureEvery: 4, delay: [245, 5600], firstWave: 2291,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '80/5@2756 20/12@2352 70/13@2358 30/14@2390', label: 'Слева, два в центр и медленный справа' },
                { id: 'b', tight: false, beats: '20/5@2332 70/12@2206 80/13@2250 90/14@2314', label: 'В центр, дважды справа и медленный слева' },
                { id: 'c', tight: false, beats: '80/5@2332 70/12@2206 20/13@2250 10/14@2314', label: 'В центр, дважды слева и медленный справа' },
                { id: 'd', tight: false, beats: '20/5@2332 80/12@2206 70/13@2250 30/14@2314', label: 'Справа, два в центр и медленный слева' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '70/12@2090 80/5@2364 30/13@2224 20/14@2338', label: 'Два в центр, слева и медленный справа' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '70/12@2178 20/5@2930 30/13@2278 80/14@2364', label: 'Два в центр, справа и медленный слева' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '70/12@2090 80/5@2364 20/13@2224 30/14@2338', label: 'В центр, слева, в центр и медленный справа' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '20/5@2896 70/12@2206 80/13@2304 90/14@2390 30/15@2438', label: 'В центр, дважды справа, в центр и медленный слева' }
            ] }
    }
};
