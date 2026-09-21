// УРОВЕНЬ 11 (v3) — форма комбо извлечена из прежней версии, времена подобраны refit.js под честную модель (А11). Правится вручную по А11.
module.exports = {
    n: 11, timeNextBoss: 6, bossInterval: 4, tight: { p1: 500, floor: 170 },
    cfg: { levelCadence: 0.82, minWaveDelay: 2710, minShotDelay: 146, minTelegraphMs: 490 },
    phases: [
        { minHp: 0.66, cadence: 1, speed: 0.99, telegraphMultiplier: 1, surpriseChance: 0.11, maxActiveAttacks: 14 },
        { minHp: 0.31, cadence: 0.79, speed: 1.1, telegraphMultiplier: 0.91, surpriseChance: 0.22, maxActiveAttacks: 18 },
        { minHp: 0, cadence: 0.66, speed: 1.2, telegraphMultiplier: 0.85, surpriseChance: 0.3, maxActiveAttacks: 20 }
    ],
    bosses: {
        enem1: { title: 'Молотобой', identity: 'Удар и искры',
            trick: 'тяжёлые удары идут по прямой; позже брошенные искры быстрее и прилетают раньше медленных — порядок прилёта не совпадает с порядком появления',
            tight: { p1: 400, floor: 120 }, style: 'straight', cadence: 1.12, telegraphMs: 880, speedMultiplier: 0.94, signatureEvery: 4, delay: [280, 5400], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, gaps: [250], beats: '10/13@2516 30/14@2650', label: 'Слева и в центр' },
                { id: 'b', tight: false, beats: '12/11@2500 88/14@2820 10/12@3140 92/13@3460', label: 'Слева, справа, слева и справа' },
                { id: 'c', tight: false, beats: '18/13@2308 70/16@2358 12/20@2285', label: 'Дважды слева и в центр' },
                { id: 'd', tight: false, beats: '88/11@2198 70/14@2490 84/18@2469 30/22@2449', label: 'Справа, в центр, справа и в центр' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '14/12@2464 70/14@2554 24/16@2643 30/18@2757', label: 'Слева, в центр, слева и в центр' },
                { id: 'f', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '88/13@2308 30/16@2358 76/20@2285', label: 'Дважды справа и в центр' },
                { id: 'g', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '30/12@2464 18/14@2554 70/16@2643 10/19@2685', label: 'В центр, слева, в центр и слева' }
            ] },
        enem2: { title: 'Пильщик', identity: 'Пила по кругу',
            trick: 'атаки качаются на лету; связки чередуют край и центр — смотри, куда качнёт, а не куда летит',
            tight: { p1: 400, floor: 120 }, style: 'weave', cadence: 0.8, telegraphMs: 580, speedMultiplier: 1.22, signatureEvery: 4, delay: [240, 5600], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, gaps: [0,250,400,0], beats: '8/13@1964 70/14@2016 16/12@2426 30/13@2806 24/14@2858', label: 'Слева, в центр, слева, в центр и слева' },
                { id: 'b', tight: false, gaps: [250,250,400], beats: '92/14@1800 30/15@1930 84/12@2600 88/14@2700', label: 'Справа, в центр и дважды справа' },
                { id: 'c', tight: false, gaps: [0,850,0], beats: '82/4@3192 90/4@3212 12/12@3142 8/13@3198', label: 'Слева, медленный справа, слева и медленный справа' },
                { id: 'd', tight: false, open: 0, gaps: [250], beats: '88/12@2100 30/15@1930', label: 'В центр и справа' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [0,0], beats: '30/12@2100 70/15@1872 10/13@2322', label: 'Два в центр и слева' },
                { id: 'f', tight: false, sig: true, minPhase: 2, recoveryMs: 650, gaps: [250,250], beats: '30/12@2100 88/15@1930 76/13@2438', label: 'Справа, в центр и справа' },
                { id: 'g', tight: false, sig: true, minPhase: 3, recoveryMs: 950, gaps: [0,0,550], beats: '10/14@1800 30/15@1872 70/12@2484 24/14@2734', label: 'Слева, два в центр и слева' }
            ] },
        enem3: { title: 'Горшечник', identity: 'Горшки на разгоне',
            trick: 'атаки разгоняются к концу полёта; связка из трёх-четырёх бросков сжимается — поздние догоняют ранних',
            tight: { p1: 400, floor: 120 }, style: 'accelerate', cadence: 0.94, telegraphMs: 720, speedMultiplier: 1.1, signatureEvery: 4, delay: [260, 5200], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, beats: '8/13@1898 22/12@2130 70/17@2003', label: 'Слева, в центр и слева' },
                { id: 'b', tight: false, gaps: [0,400,0], beats: '92/13@1938 30/14@2044 70/17@2126 84/13@2827', label: 'Справа, два в центр и справа' },
                { id: 'c', tight: false, beats: '82/12@1886 90/13@1986 70/18@1919', label: 'Справа, в центр и справа' },
                { id: 'd', tight: false, open: 0, beats: '18/16@1608 82/3@2332 30/15@1999', label: 'Слева, в центр и медленный справа' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [0,0,250], beats: '14/13@1938 22/12@2344 30/17@1971 70/13@2677', label: 'Слева, в центр, слева и в центр' },
                { id: 'f', tight: false, sig: true, minPhase: 2, recoveryMs: 650, gaps: [550,0,0], beats: '16/13@1938 30/15@2230 70/14@2594 78/16@2613', label: 'Слева, два в центр и справа' },
                { id: 'g', tight: false, sig: true, minPhase: 3, recoveryMs: 950, gaps: [0,400], beats: '86/18@1400 30/12@2344 70/16@2218', label: 'Справа и два в центр' }
            ] },
        enem4: { title: 'Ниточник', identity: 'Нить и рывок',
            trick: 'в конце полёта атаки резко ускоряются; порядок прилёта не совпадает с порядком появления',
            tight: { p1: 400, floor: 120 }, style: 'lateRush', cadence: 0.84, telegraphMs: 585, speedMultiplier: 1.18, signatureEvery: 4, delay: [310, 5800], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, gaps: [0,0], beats: '30/12@2318 14/12@2578 22/13@2661', label: 'В центр и дважды слева' },
                { id: 'b', tight: false, open: 0, beats: '30/14@1846 10/15@2148 90/4@2389', label: 'В центр, слева и медленный справа' },
                { id: 'c', tight: false, gaps: [250,250], beats: '70/12@2318 86/14@2248 30/16@2261', label: 'Справа и два в центр' },
                { id: 'd', tight: false, gaps: [900,350], beats: '76/3@2996 24/13@3040 70/15@3104', label: 'Медленный справа, слева и в центр' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [0,250,0], beats: '24/12@2318 70/12@2578 12/13@2661 8/12@3099', label: 'Слева, в центр и дважды слева' },
                { id: 'f', tight: false, sig: true, minPhase: 2, recoveryMs: 650, gaps: [0,0,0], beats: '70/14@1988 86/15@2148 30/16@2291 78/14@2769', label: 'В центр, справа, в центр и справа' },
                { id: 'g', tight: false, sig: true, minPhase: 3, recoveryMs: 950, gaps: [250,0,250], beats: '30/12@2318 86/13@2400 70/12@2839 31/13@2921', label: 'В центр, справа и два в центр' }
            ] },
        enem5: { title: 'Обручник', identity: 'Обруч и увод',
            trick: 'атаки уходят к центру по пути; серии из четырёх-пяти ударов идут с одного края и центра',
            tight: { p1: 400, floor: 120 }, style: 'drift', cadence: 0.72, telegraphMs: 620, speedMultiplier: 1.2, signatureEvery: 4, delay: [250, 7300], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, gaps: [0,250], beats: '30/14@1830 10/15@1888 70/14@2260', label: 'В центр, слева и в центр' },
                { id: 'b', tight: false, gaps: [0,0,550], beats: '30/14@1830 90/15@1888 84/14@2190 70/15@2618', label: 'В центр, дважды справа и в центр' },
                { id: 'c', tight: false, gaps: [400,400], beats: '14/13@1998 30/15@2132 86/14@2654', label: 'Слева, в центр и справа' },
                { id: 'd', tight: false, open: 0, gaps: [550,0,0], beats: '92/14@1830 84/15@2258 78/14@2560 70/15@2618', label: 'Трижды справа и в центр' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [250,0], beats: '14/15@1732 30/13@2248 70/14@2284', label: 'Слева и два в центр' },
                { id: 'f', tight: false, sig: true, minPhase: 2, recoveryMs: 650, gaps: [0,250,400], beats: '30/14@1854 20/15@1912 8/13@2428 70/15@2562', label: 'В центр, дважды слева и в центр' },
                { id: 'g', tight: false, sig: true, minPhase: 3, recoveryMs: 950, gaps: [0,250,550], beats: '70/15@1732 30/13@2178 10/14@2284 24/15@2712', label: 'Два в центр и дважды слева' }
            ] }
    }
};
