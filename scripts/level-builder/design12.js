// УРОВЕНЬ 12 (v3) — форма комбо извлечена из прежней версии, времена подобраны refit.js под честную модель (А11). Правится вручную по А11.
module.exports = {
    n: 12, timeNextBoss: 7, bossInterval: 3, tight: { p1: 500, floor: 170 },
    cfg: { levelCadence: 0.8, minWaveDelay: 2700, minShotDelay: 145, minTelegraphMs: 480 },
    phases: [
        { minHp: 0.66, cadence: 1, speed: 1, telegraphMultiplier: 1, surpriseChance: 0.12, maxActiveAttacks: 17 },
        { minHp: 0.31, cadence: 0.78, speed: 1.11, telegraphMultiplier: 0.9, surpriseChance: 0.23, maxActiveAttacks: 19 },
        { minHp: 0, cadence: 0.64, speed: 1.21, telegraphMultiplier: 0.84, surpriseChance: 0.32, maxActiveAttacks: 23 }
    ],
    bosses: {
        enem1: { title: 'Строевик', identity: 'Строевой шаг',
            trick: 'атаки качаются; ряды из трёх-четырёх ударов чередуют край и центр — успевай переводить прицел',
            tight: { p1: 400, floor: 120 }, style: 'weave', cadence: 0.96, telegraphMs: 720, speedMultiplier: 1.08, signatureEvery: 4, delay: [270, 5600], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, beats: '8/11@2456 70/14@2299 16/18@2106', label: 'Слева, в центр и слева' },
                { id: 'b', tight: false, beats: '92/11@2456 30/14@2299 82/18@2106', label: 'Справа, в центр и справа' },
                { id: 'c', tight: false, beats: '16/11@2456 70/13@2457 8/17@2198', label: 'Дважды слева и в центр' },
                { id: 'd', tight: false, beats: '8/11@2386 20/12@2479 30/13@2566 14/14@2652', label: 'Дважды слева, в центр и слева' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '70/11@2386 20/12@2639 10/14@2558', label: 'В центр и дважды слева' },
                { id: 'f', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '12/11@2386 22/12@2479 70/13@2566 30/14@2652', label: 'Дважды слева и два в центр' },
                { id: 'g', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '92/11@2386 82/12@2479 70/13@2566 30/14@2652', label: 'Дважды справа и два в центр' }
            ] },
        enem2: { title: 'Колчанчик', identity: 'Стрелы на разгоне',
            trick: 'стрелы разгоняются к концу полёта; поздние быстрые стрелы прилетают раньше ранних медленных',
            tight: { p1: 400, floor: 120 }, style: 'accelerate', cadence: 0.98, telegraphMs: 760, speedMultiplier: 0.94, signatureEvery: 4, delay: [260, 5400], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, beats: '10/13@1932 70/15@2041 84/17@2120', label: 'Слева, в центр и справа' },
                { id: 'b', tight: false, beats: '20/12@2092 30/14@2339 90/17@2264', label: 'Слева, справа и в центр' },
                { id: 'c', tight: false, beats: '10/17@1544 70/20@1745 30/22@1866', label: 'Слева и два в центр' },
                { id: 'd', tight: false, beats: '30/13@2106 70/15@2159 8/17@2264 16/19@2332', label: 'Два в центр и дважды слева' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [450,1100], beats: '30/3@2990 22/20@1910 88/22@2878', label: 'Слева, справа и медленный в центр' },
                { id: 'f', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '30/16@1786 70/20@1745 88/23@1806', label: 'Два в центр и справа' },
                { id: 'g', tight: false, sig: true, minPhase: 3, recoveryMs: 950, gaps: [400,250,0], beats: '20/13@2244 30/15@2346 86/17@2371 70/19@2446', label: 'Слева, в центр, справа и в центр' }
            ] },
        enem3: { title: 'Дубинщик', identity: 'Замах и удар',
            trick: 'дубины идут вразвалку и в конце рвутся вперёд; порядок прилёта не совпадает с порядком появления',
            tight: { p1: 400, floor: 120 }, style: 'lateRush', cadence: 1.18, telegraphMs: 700, speedMultiplier: 0.88, signatureEvery: 4, delay: [320, 5800], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, beats: '70/17@2018 10/20@2060 30/23@2219', label: 'В центр, слева и в центр' },
                { id: 'b', tight: false, beats: '30/17@2018 90/20@2060 70/23@2219', label: 'В центр, справа и в центр' },
                { id: 'c', tight: false, beats: '24/17@2018 8/20@2060 70/23@2219', label: 'Дважды слева и в центр' },
                { id: 'd', tight: false, beats: '92/14@2310 30/18@2394 70/23@2391', label: 'Справа и два в центр' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '8/17@2096 16/19@2184 24/21@2357 70/23@2597', label: 'Трижды слева и в центр' },
                { id: 'f', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '70/17@2096 92/19@2184 30/21@2357', label: 'В центр, справа и в центр' },
                { id: 'g', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '30/17@2018 70/20@2060 31/23@2219', label: '3 в центр' }
            ] },
        enem4: { title: 'Сабелька', identity: 'Зависший клинок',
            trick: 'клинки зависают в полёте, а потом падают; считай момент падения, а не появления',
            tight: { p1: 400, floor: 120 }, style: 'pause', cadence: 0.94, telegraphMs: 700, speedMultiplier: 1.05, signatureEvery: 4, delay: [280, 5200], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, gaps: [700,0,0], beats: '10/13@2416 70/17@2646 24/20@2681 14/19@3012', label: 'Слева, в центр и дважды слева' },
                { id: 'b', tight: false, beats: '92/13@2294 84/17@2233 30/20@2264 88/19@2472', label: 'Справа, в центр и дважды справа' },
                { id: 'c', tight: false, beats: '10/12@2352 70/16@2331 30/20@2264 24/19@2534', label: 'Два в центр и дважды слева' },
                { id: 'd', tight: false, beats: '70/12@2352 8/14@2565 16/17@2496 30/20@2528', label: 'В центр, слева, в центр и слева' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '8/13@2448 16/14@2509 24/15@2570 92/4@3162', label: 'Трижды слева и медленный справа' },
                { id: 'f', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '92/12@2352 70/16@2331 84/20@2264 30/17@2644', label: 'Справа, в центр, справа и в центр' },
                { id: 'g', tight: false, sig: true, minPhase: 3, recoveryMs: 950, gaps: [0,250,250], beats: '70/13@2416 10/13@2679 30/16@2568 14/17@2736', label: 'Два в центр и дважды слева' }
            ] },
        enem5: { title: 'Барабань', identity: 'Барабанная дробь',
            trick: 'частые серии по четыре-пять ударов с одного края и центра; темп не оставляет пауз',
            tight: { p1: 400, floor: 120 }, style: 'straight', cadence: 0.68, telegraphMs: 600, speedMultiplier: 1.22, signatureEvery: 4, delay: [210, 8300], firstWave: 2304,
            combos: [
                { id: 'a', tight: false, gaps: [0,0,0,0], beats: '8/14@1782 16/13@2063 24/14@2072 30/13@2353 20/14@2362', label: 'Трижды слева, в центр и слева' },
                { id: 'b', tight: false, gaps: [0,0,0,0], beats: '92/14@1782 84/13@2063 76/14@2072 70/13@2353 88/14@2362', label: 'Трижды справа, в центр и справа' },
                { id: 'c', tight: false, gaps: [0,0,250,0], beats: '8/13@1918 30/14@1927 16/13@2208 70/14@2322 24/13@2603', label: 'Слева, в центр, слева, в центр и слева' },
                { id: 'd', tight: false, gaps: [0,250,250,250], beats: '92/13@1918 70/14@1927 84/13@2313 30/14@2427 88/13@2813', label: 'Справа, в центр, справа, в центр и справа' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [0,250,0], beats: '24/14@1782 70/13@2063 8/14@2177 30/13@2458', label: 'Слева, в центр, слева и в центр' },
                { id: 'f', tight: false, sig: true, minPhase: 2, recoveryMs: 650, gaps: [0,0,550,0], beats: '92/14@1782 84/13@2063 70/14@2072 88/13@2758 30/14@2767', label: 'Дважды справа, в центр, справа и в центр' },
                { id: 'g', tight: false, sig: true, minPhase: 3, recoveryMs: 950, gaps: [400,0,0], beats: '92/14@1782 84/13@2318 76/14@2327 30/13@2608', label: 'Трижды справа и в центр' }
            ] }
    }
};
