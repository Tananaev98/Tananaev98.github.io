// УРОВЕНЬ 17 (v3) — форма комбо извлечена из прежней версии, времена подобраны refit.js под честную модель (А11). Правится вручную по А11.
module.exports = {
    n: 17, damageByClass: true, damageClassOverride: { enem3: 'medium' }, timeNextBoss: 13, bossInterval: 5, tight: { p1: 500, floor: 170 },
    cfg: { levelCadence: 0.92, minWaveDelay: 2800, minShotDelay: 152, minTelegraphMs: 550 },
    phases: [
        { minHp: 0.65, cadence: 1, speed: 1, telegraphMultiplier: 1, surpriseChance: 0.13, maxActiveAttacks: 12 },
        { minHp: 0.31, cadence: 0.85, speed: 1.09, telegraphMultiplier: 0.92, surpriseChance: 0.23, maxActiveAttacks: 17 },
        { minHp: 0, cadence: 0.72, speed: 1.18, telegraphMultiplier: 0.85, surpriseChance: 0.33, maxActiveAttacks: 23 }
    ],
    bosses: {
        enem1: { title: 'Притайка', identity: 'Притаившийся замах',
            trick: 'медленные удары идут из угла, а быстрые с центра и другого края догоняют их; атаки качаются на лету',
            tight: { p1: 400, floor: 120 }, style: 'weave', cadence: 1.05, telegraphMs: 900, speedMultiplier: 0.9, signatureEvery: 4, delay: [333, 6400], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '70/18@1904 80/8@2030 20/22@2131', label: 'В центр, медленный справа и слева' },
                { id: 'b', tight: false, beats: '30/18@1904 20/8@2030 80/22@2131', label: 'В центр, медленный слева и справа' },
                { id: 'c', tight: false, beats: '70/17@2016 20/8@2376 30/21@2199', label: 'Два в центр и медленный слева' },
                { id: 'd', tight: false, beats: '30/17@2016 80/8@2376 70/21@2199', label: 'Два в центр и медленный справа' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '70/18@1904 20/8@2434 10/22@2257 30/24@2439', label: 'В центр, слева, медленный слева и в центр' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '80/8@2778 30/17@2312 90/20@2413 70/23@2539', label: 'В центр, справа, в центр и медленный справа' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '80/7@2514 90/8@2492 30/19@2405 70/22@2523', label: 'В центр, медленный справа и в центр' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '10/7@2778 20/8@2782 70/18@2501 30/22@2565', label: 'Два в центр и медленный слева' }
            ] },
        enem2: { title: 'Щекан', identity: 'Щекотка на разгоне',
            trick: 'короткие быстрые тычки по два-четыре; к концу полёта они разгоняются, поздние обгоняют ранние',
            tight: { p1: 400, floor: 120 }, style: 'accelerate', cadence: 0.85, telegraphMs: 720, speedMultiplier: 1.08, signatureEvery: 4, delay: [300, 4700], firstWave: 2256,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '20/11@1986 70/18@1697', label: 'В центр и слева' },
                { id: 'b', tight: false, beats: '80/11@1986 30/18@1697', label: 'В центр и справа' },
                { id: 'c', tight: false, beats: '20/11@1986 30/13@2209 70/19@1876', label: 'В центр, слева и в центр' },
                { id: 'd', tight: false, beats: '80/11@2166 70/13@2209 30/16@2132 90/19@2131', label: 'Справа, в центр, справа и в центр' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '70/13@1996 20/15@1985 10/17@2036 8/19@2131', label: 'Слева, в центр и дважды слева' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '30/11@2120 80/13@2167 90/16@2132 84/19@2131', label: 'В центр и трижды справа' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '20/11@2212 70/13@2251 30/16@2132 8/19@2131', label: 'Слева, в центр, слева и в центр' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, gaps: [700,700,250], beats: '70/11@2308 80/13@2654 30/16@2988 90/19@2993', label: 'В центр, справа, в центр и справа' }
            ] },
        enem3: { title: 'Столбик', identity: 'Столбом и рывком',
            trick: 'короткие быстрые связки между краем и центром; в конце полёта резкий рывок, между связками долгая пауза',
            tight: { p1: 400, floor: 120 }, style: 'lateRush', cadence: 1.25, telegraphMs: 980, speedMultiplier: 0.82, signatureEvery: 4, delay: [280, 7000], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '10/22@1642 70/26@1766', label: 'Слева и в центр' },
                { id: 'b', tight: false, beats: '90/22@1642 30/26@1766', label: 'Справа и в центр' },
                { id: 'c', tight: false, beats: '10/21@1720 70/23@1920 20/26@2116', label: 'Слева, в центр и слева' },
                { id: 'd', tight: false, beats: '90/21@1720 80/23@1920 30/26@2116', label: 'Дважды справа и в центр' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '70/22@1642 10/24@1854 8/26@2224', label: 'В центр и дважды слева' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '30/21@1720 90/23@2074 80/26@2252', label: 'В центр и дважды справа' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '10/21@1720 20/23@1920 70/26@2116', label: 'Дважды слева и в центр' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '90/21@1720 30/23@2012 80/25@2314 84/27@2544', label: 'Справа, в центр и дважды справа' }
            ] },
        enem4: { title: 'Трещотник', identity: 'Трещотка',
            trick: 'серии по три-четыре удара с одного края и центра; атаки сползают к центру и идут плотно',
            tight: { p1: 400, floor: 120 }, style: 'drift', cadence: 0.75, telegraphMs: 600, speedMultiplier: 1.22, signatureEvery: 4, delay: [240, 4600], firstWave: 2208,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '88/11@2112 30/12@2288 70/13@2306', label: 'Справа и два в центр' },
                { id: 'b', tight: false, gaps: [350,0], beats: '88/11@2268 30/12@2428 90/13@2448', label: 'Справа, в центр и справа' },
                { id: 'c', tight: false, gaps: [250,250,400], beats: '70/12@2078 30/11@2518 10/13@2418 12/12@2978', label: 'В центр, слева, в центр и слева' },
                { id: 'd', tight: false, beats: '70/12@2108 30/11@2478 88/13@2306 90/12@2648', label: 'В центр, справа, в центр и справа' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '10/12@2108 12/11@2354 14/13@2306 30/12@2648', label: 'Трижды слева и в центр' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '88/13@1946 90/12@2116 86/14@2166 70/13@2354', label: 'Трижды справа и в центр' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '12/12@2108 30/12@2288 14/13@2306 70/11@2838', label: 'Слева, в центр, слева и в центр' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '90/12@1964 88/13@2098 30/14@2166 86/13@2380', label: 'Дважды справа, в центр и справа' }
            ] },
        enem5: { title: 'Шуршало', identity: 'Шорох под ногами',
            trick: 'медленные удары снизу вперемешку с быстрыми сверху; пока следишь за одними, другие догоняют',
            tight: { p1: 400, floor: 120 }, style: 'straight', cadence: 0.72, telegraphMs: 620, speedMultiplier: 1.1, signatureEvery: 4, delay: [260, 4300], firstWave: 2064,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '20/5@2426 80/6@2397 30/14@2378', label: 'В центр, медленный справа и медленный слева' },
                { id: 'b', tight: false, beats: '80/5@2426 20/6@2397 70/14@2378', label: 'В центр, медленный слева и медленный справа' },
                { id: 'c', tight: false, beats: '50/4@2464 30/12@2335 70/13@2414 20/14@2484', label: 'Два в центр, медленный в центр и слева' },
                { id: 'd', tight: false, beats: '89/5@2502 11/5@2537 30/13@2444 70/14@2512', label: 'В центр, медленный справа, в центр и медленный слева' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '20/11@2342 30/12@2397 50/4@2648 70/14@2484', label: 'Слева, два в центр и медленный в центр' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '80/12@2148 70/13@2285 30/14@2378 20/5@2836', label: 'Справа, два в центр и медленный слева' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '20/12@2148 30/13@2285 70/14@2378 80/5@2836', label: 'Слева, два в центр и медленный справа' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '20/11@2342 50/4@2839 80/5@2876 70/13@2660', label: 'Слева, в центр, медленный в центр и медленный справа' }
            ] }
    }
};
