// УРОВЕНЬ 15 (v3) — форма комбо извлечена из прежней версии, времена подобраны refit.js под честную модель (А11). Правится вручную по А11.
module.exports = {
    n: 15, damageByClass: true, damageClassOverride: { enem3: 'medium' }, timeNextBoss: 10, bossInterval: 4, tight: { p1: 500, floor: 170 },
    cfg: { levelCadence: 0.7, minWaveDelay: 2800, minShotDelay: 130, minTelegraphMs: 460 },
    phases: [
        { minHp: 0.66, cadence: 1, speed: 1.02, telegraphMultiplier: 1, surpriseChance: 0.16, maxActiveAttacks: 16 },
        { minHp: 0.31, cadence: 0.74, speed: 1.15, telegraphMultiplier: 0.89, surpriseChance: 0.3, maxActiveAttacks: 21 },
        { minHp: 0, cadence: 0.6, speed: 1.28, telegraphMultiplier: 0.82, surpriseChance: 0.42, maxActiveAttacks: 24 }
    ],
    bosses: {
        enem1: { title: 'Баба-Яга', identity: 'Зигзаг посоха',
            trick: 'тяжёлые медленные удары идут впереди, быстрые следом по центру и с другого края и прилетают почти вместе с ними; посох уводит удары к центру',
            tight: { p1: 400, floor: 120 }, style: 'drift', cadence: 1.05, telegraphMs: 880, speedMultiplier: 0.92, signatureEvery: 4, delay: [320, 6200], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, beats: '20/17@1804 70/19@1950', label: 'Слева и в центр' },
                { id: 'b', tight: false, beats: '20/8@2332 30/17@2140 80/20@2316', label: 'В центр, справа и медленный слева' },
                { id: 'c', tight: false, beats: '80/7@2094 20/18@2040 30/20@2182', label: 'Слева, медленный справа и в центр' },
                { id: 'd', tight: false, gaps: [400,400,700], beats: '10/6@3036 90/17@2308 70/19@2506 30/21@3044', label: 'Справа, в центр, медленный слева и в центр' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '50/5@2222 80/17@2192 70/19@2262', label: 'Справа, медленный в центр и в центр' },
                { id: 'f', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '20/8@2776 70/17@2244 30/19@2402 80/20@2652', label: 'Два в центр, справа и медленный слева' },
                { id: 'g', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '80/7@2856 70/17@2192 30/19@2402 20/21@2574', label: 'Два в центр, слева и медленный справа' },
                { id: 'h', tight: false, beats: '80/8@2998 70/15@2498 20/18@2498 30/21@2574', label: 'В центр, слева, в центр и медленный справа' }
            ] },
        enem2: { title: 'Злая Баба-Яга', identity: 'Когти в клещи',
            trick: 'медленный коготь с одного края и быстрый с другого прилетают почти разом — успей перекинуть прицел, пока первый ещё летит',
            tight: { p1: 400, floor: 120 }, style: 'straight', cadence: 0.9, telegraphMs: 740, speedMultiplier: 1.06, signatureEvery: 4, delay: [280, 5000], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, beats: '25/5@2236 75/15@2154', label: 'Справа и медленный слева' },
                { id: 'b', tight: false, beats: '75/5@2236 25/15@2154', label: 'Слева и медленный справа' },
                { id: 'c', tight: false, beats: '15/5@2468 85/13@2446 25/6@2496', label: 'Справа и медленный слева' },
                { id: 'd', tight: false, beats: '85/5@2468 15/14@2208 75/5@2508 30/17@2298', label: 'Слева, в центр и медленный справа' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '50/5@2236 20/14@2152 30/17@2182 70/18@2278', label: 'Слева, в центр, медленный в центр и в центр' },
                { id: 'f', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '50/5@2468 85/5@2488 15/14@2404 30/17@2434', label: 'Слева, в центр, медленный в центр и медленный справа' },
                { id: 'g', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '25/5@2698 75/6@2694 50/5@2740 30/14@2656 70/16@2720', label: 'В центр, медленный справа, медленный слева, в центр и медленный в центр' },
                { id: 'h', tight: false, beats: '70/15@1902 30/14@2124 20/16@2288 8/18@2342', label: 'Два в центр и дважды слева' }
            ] },
        enem3: { title: 'Очень злая Баба-Яга', identity: 'Хлёсткие проклятья',
            trick: 'быстрые проклятья идут короткой очередью между краем и центром и качаются на лету; в серии не передохнуть, зато между сериями долгая пауза',
            tight: { p1: 400, floor: 120 }, style: 'weave', cadence: 1.18, telegraphMs: 980, speedMultiplier: 0.85, signatureEvery: 4, delay: [300, 6800], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, beats: '20/19@1796 70/22@1950', label: 'Слева и в центр' },
                { id: 'b', tight: false, beats: '80/19@1796 70/21@1934 30/23@2130', label: 'Справа и два в центр' },
                { id: 'c', tight: false, gaps: [450,0], beats: '20/19@1848 70/21@2122 8/23@2330', label: 'Слева, в центр и слева' },
                { id: 'd', tight: false, gaps: [450,0], beats: '80/19@1848 30/21@2122 90/23@2330', label: 'Справа, в центр и справа' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '70/19@1848 10/21@1912 30/23@2130', label: 'В центр, слева и в центр' },
                { id: 'f', tight: false, sig: true, minPhase: 2, recoveryMs: 650, gaps: [0,250,700], beats: '20/18@1950 70/20@2110 30/22@2304 8/23@2934', label: 'Слева, два в центр и слева' },
                { id: 'g', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '80/18@1844 70/20@2110 30/22@2326 90/23@2610', label: 'Справа, два в центр и справа' },
                { id: 'h', tight: false, beats: '70/18@1844 10/20@1988 30/22@2194', label: 'В центр, слева и в центр' }
            ] },
        enem4: { title: 'Взбешенная Баба-Яга', identity: 'Вспышки из углов',
            trick: 'вспышки идут по три-пять подряд с одного угла и центра и в конце полёта резко ускоряются — ритм ломается на последнем шаге',
            tight: { p1: 400, floor: 120 }, style: 'lateRush', cadence: 0.76, telegraphMs: 610, speedMultiplier: 1.2, signatureEvery: 4, delay: [230, 5500], firstWave: 2208,
            combos: [
                { id: 'a', tight: false, beats: '12/13@1934 14/12@2191 30/14@2280', label: 'Дважды слева и в центр' },
                { id: 'b', tight: false, beats: '88/13@2080 30/14@2105 90/13@2430 86/12@2540', label: 'Справа, в центр и дважды справа' },
                { id: 'c', tight: false, beats: '12/13@1862 30/12@2231 10/14@2280 70/13@2604', label: 'Слева, в центр, слева и в центр' },
                { id: 'd', tight: false, beats: '12/13@1934 14/12@2191 30/14@2280 70/13@2604 10/12@2911', label: 'Дважды слева, два в центр и слева' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '10/13@1898 12/12@2191 30/14@2280 70/13@2604', label: 'Дважды слева и два в центр' },
                { id: 'f', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '88/13@2080 90/12@2427 70/14@2280 30/13@2530', label: 'Справа, в центр, справа и в центр' },
                { id: 'g', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '12/12@2252 30/13@2255 10/14@2280 14/13@2604 70/12@2793', label: 'Слева, в центр, дважды слева и в центр' },
                { id: 'h', tight: false, beats: '90/12@2094 70/13@2181 30/14@2280 31/13@2386', label: 'Справа и 3 в центр' }
            ] },
        enem5: { title: 'Обезумевшая Баба-Яга', identity: 'Слияние обликов',
            trick: 'смешивает приёмы всех обликов: нижний ряд медленных ударов «лес смыкается» и быстрые удары сверху, атаки зависают в полёте и падают разом',
            tight: { p1: 400, floor: 120 }, style: 'pause', cadence: 0.72, telegraphMs: 640, speedMultiplier: 1.15, signatureEvery: 4, delay: [270, 5600], firstWave: 2064,
            combos: [
                { id: 'a', tight: false, beats: '20/12@2238 50/4@2434 30/13@2459', label: 'Слева, медленный в центр и в центр' },
                { id: 'b', tight: false, beats: '75/5@2342 89/13@2292 30/15@2359', label: 'Справа, медленный справа и в центр' },
                { id: 'c', tight: false, beats: '20/13@2152 30/14@2298 50/4@2557 70/15@2433', label: 'Слева, два в центр и медленный в центр' },
                { id: 'd', tight: false, beats: '89/5@2576 11/12@2462 30/13@2515 70/14@2561', label: 'Слева, два в центр и медленный справа' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '50/4@2532 30/5@2536 70/13@2487 20/14@2561', label: 'В центр, медленный в центр и слева' },
                { id: 'f', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '20/12@2386 30/13@2428 70/14@2493 80/5@3333 50/15@2770', label: 'Слева, 3 в центр и медленный справа' },
                { id: 'g', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '11/4@3042 50/4@3018 89/4@2993 30/14@2611 70/15@2770', label: 'Два в центр, медленный справа, медленный в центр и медленный слева' },
                { id: 'h', tight: false, beats: '20/13@2208 70/14@2248 30/15@2311 50/5@2401', label: 'Слева, два в центр и медленный в центр' }
            ] }
    }
};
