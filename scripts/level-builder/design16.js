// УРОВЕНЬ 16 (v3) — форма комбо извлечена из прежней версии, времена подобраны refit.js под честную модель (А11). Правится вручную по А11.
module.exports = {
    n: 16, damageByClass: true, damageClassOverride: { enem3: 'medium' }, timeNextBoss: 11, bossInterval: 3, tight: { p1: 500, floor: 170 },
    cfg: { levelCadence: 0.94, minWaveDelay: 2800, minShotDelay: 155, minTelegraphMs: 560 },
    phases: [
        { minHp: 0.66, cadence: 1, speed: 1, telegraphMultiplier: 1, surpriseChance: 0.12, maxActiveAttacks: 13 },
        { minHp: 0.31, cadence: 0.86, speed: 1.08, telegraphMultiplier: 0.93, surpriseChance: 0.22, maxActiveAttacks: 17 },
        { minHp: 0, cadence: 0.73, speed: 1.17, telegraphMultiplier: 0.86, surpriseChance: 0.32, maxActiveAttacks: 22 }
    ],
    bosses: {
        enem1: { title: 'Босовик', identity: 'Прямой удар и добивка',
            trick: 'тяжёлые медленные удары идут из угла, быстрые следом по центру и с другого края и прилетают почти вместе с ними',
            tight: { p1: 400, floor: 120 }, style: 'straight', cadence: 1, telegraphMs: 880, speedMultiplier: 0.95, signatureEvery: 4, delay: [340, 6200], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '20/19@1594 70/23@1694', label: 'Слева и в центр' },
                { id: 'b', tight: false, beats: '20/8@2140 30/18@1998 80/21@2122', label: 'В центр, справа и медленный слева' },
                { id: 'c', tight: false, beats: '80/7@2444 20/19@2004 30/22@2056', label: 'Слева, в центр и медленный справа' },
                { id: 'd', tight: false, beats: '10/6@2778 90/16@2260 70/19@2390 30/22@2496', label: 'Справа, два в центр и медленный слева' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '50/5@2370 80/19@1910 70/23@1978', label: 'Справа, в центр и медленный в центр' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '20/8@2906 70/18@2046 30/20@2282 80/22@2496', label: 'Два в центр, справа и медленный слева' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '80/7@2382 70/18@2144 30/20@2282 20/22@2396', label: 'Два в центр, медленный справа и слева' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '80/8@2248 70/17@2146 20/20@2282', label: 'В центр, медленный справа и слева' }
            ] },
        enem2: { title: 'Сеюшка', identity: 'Веер зерна',
            trick: 'быстрые броски по три-четыре вразброс между краем и центром; атаки качаются на лету, ритм короткий',
            tight: { p1: 400, floor: 120 }, style: 'weave', cadence: 0.88, telegraphMs: 740, speedMultiplier: 1.1, signatureEvery: 4, delay: [280, 5000], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '20/12@2148 70/16@1998', label: 'В центр и слева' },
                { id: 'b', tight: false, beats: '80/12@2148 30/17@1896', label: 'В центр и справа' },
                { id: 'c', tight: false, beats: '20/12@2148 70/15@2116 30/18@2051', label: 'Два в центр и слева' },
                { id: 'd', tight: false, beats: '80/12@2336 30/14@2250 90/17@2143', label: 'Справа, в центр и справа' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '70/13@2012 10/15@2090 30/18@2051', label: 'Два в центр и слева' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '20/11@2514 70/13@2404 30/15@2363 8/17@2389', label: 'В центр, слева, в центр и слева' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '80/11@2446 70/13@2404 30/15@2363 90/17@2389', label: 'В центр, справа, в центр и справа' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, gaps: [400,700,0], beats: '70/12@2306 10/14@2376 30/16@2830 8/18@2884', label: 'В центр, слева, в центр и слева' }
            ] },
        enem3: { title: 'Звонец', identity: 'Звон на разгоне',
            trick: 'очереди быстрых ударов разгоняются к концу полёта; поздние догоняют ранние, порядок прилёта меняется',
            tight: { p1: 400, floor: 120 }, style: 'accelerate', cadence: 1.2, telegraphMs: 980, speedMultiplier: 0.85, signatureEvery: 4, delay: [220, 6800], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '20/23@1262 70/26@1380', label: 'Слева и в центр' },
                { id: 'b', tight: false, beats: '80/23@1262 30/26@1380', label: 'Справа и в центр' },
                { id: 'c', tight: false, beats: '20/21@1538 10/23@1668 8/25@1792 30/26@1908', label: 'Трижды слева и в центр' },
                { id: 'd', tight: false, beats: '80/22@1348 90/24@1582 30/26@1796', label: 'Дважды справа и в центр' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '70/21@1442 80/23@1582 90/25@1688', label: 'В центр и дважды справа' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '10/21@1538 20/23@1668 8/25@1792 30/26@1908', label: 'Трижды слева и в центр' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '80/21@1538 90/23@1668 84/25@1792 70/26@1908', label: 'Трижды справа и в центр' },
                { id: 'h', tight: false, beats: '70/21@1570 10/23@1698 8/25@1846 30/26@2034', label: 'В центр, дважды слева и в центр' }
            ] },
        enem4: { title: 'Дед-Всевсей', identity: 'Дедово поле',
            trick: 'серии по четыре-пять ударов с одного края и центра; атаки зависают в полёте и падают разом',
            tight: { p1: 400, floor: 120 }, style: 'pause', cadence: 0.78, telegraphMs: 620, speedMultiplier: 1.2, signatureEvery: 4, delay: [250, 4800], firstWave: 2304,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '12/12@2342 70/13@2389 10/14@2458 30/13@2779', label: 'Слева, в центр, слева и в центр' },
                { id: 'b', tight: false, beats: '88/12@2254 30/13@2389 90/14@2458 86/13@2671', label: 'Справа, в центр и дважды справа' },
                { id: 'c', tight: false, beats: '10/13@2194 70/12@2363 12/14@2458 14/13@2619', label: 'Слева, в центр и дважды слева' },
                { id: 'd', tight: false, beats: '12/13@2194 30/12@2421 10/14@2458 31/13@2671', label: 'Слева, в центр, слева и в центр' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '70/13@2194 10/14@2263 12/13@2424', label: 'В центр и дважды слева' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '88/13@2194 30/12@2391 90/14@2458 70/13@2753', label: 'Справа, в центр, справа и в центр' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '12/12@2342 70/13@2389 10/14@2458 30/13@2779 14/12@2948', label: 'Слева, в центр, слева, в центр и слева' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '90/12@2254 88/13@2363 30/14@2458 86/13@2619', label: 'Дважды справа, в центр и справа' }
            ] },
        enem5: { title: 'Зубец', identity: 'Зубья борон',
            trick: 'ударные ряды по краю и центру плюс медленные удары снизу; всё сползает к центру',
            tight: { p1: 400, floor: 120 }, style: 'drift', cadence: 0.75, telegraphMs: 640, speedMultiplier: 1.08, signatureEvery: 4, delay: [270, 4400], firstWave: 2112,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '20/13@2048 50/4@2615 70/15@2207 30/16@2370', label: 'Слева, два в центр и медленный в центр' },
                { id: 'b', tight: false, beats: '25/5@2316 11/13@2251 70/15@2309', label: 'Слева, в центр и медленный слева' },
                { id: 'c', tight: false, beats: '80/14@2040 70/15@2107 50/5@2721 30/16@2296', label: 'Справа, два в центр и медленный в центр' },
                { id: 'd', tight: false, beats: '11/5@3088 20/13@2401 70/14@2445 30/15@2512', label: 'Слева, два в центр и медленный слева' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '50/4@2508 70/5@2519 30/14@2445 80/15@2512', label: 'В центр, медленный в центр, справа и медленный в центр' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '80/12@2380 70/13@2401 30/14@2445 20/5@2692 50/15@2688', label: 'Справа, 3 в центр и медленный слева' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '89/4@3376 50/4@3387 11/4@3299 70/15@2410 30/16@2596', label: 'Два в центр, медленный слева, медленный справа и медленный в центр' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '80/14@2040 30/15@2107 70/16@2167 50/5@2460', label: 'Справа, два в центр и медленный в центр' }
            ] }
    }
};
