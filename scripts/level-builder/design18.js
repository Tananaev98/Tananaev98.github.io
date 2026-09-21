// УРОВЕНЬ 18 (v3) — форма комбо извлечена из прежней версии, времена подобраны refit.js под честную модель (А11). Правится вручную по А11.
module.exports = {
    n: 18, damageByClass: true, timeNextBoss: 14, bossInterval: 5, tight: { p1: 500, floor: 170 },
    cfg: { levelCadence: 0.9, minWaveDelay: 2800, minShotDelay: 150, minTelegraphMs: 545 },
    phases: [
        { minHp: 0.64, cadence: 1, speed: 1, telegraphMultiplier: 1, surpriseChance: 0.14, maxActiveAttacks: 13 },
        { minHp: 0.3, cadence: 0.84, speed: 1.1, telegraphMultiplier: 0.91, surpriseChance: 0.24, maxActiveAttacks: 18 },
        { minHp: 0, cadence: 0.71, speed: 1.19, telegraphMultiplier: 0.84, surpriseChance: 0.34, maxActiveAttacks: 23 }
    ],
    bosses: {
        enem1: { title: 'Кривозуб', identity: 'Кривой замах',
            trick: 'связки по три-четыре быстрых удара с края и центра; к концу полёта они разгоняются, а редкий медленный удар из угла прилетает вместе с ними',
            tight: { p1: 400, floor: 120 }, style: 'accelerate', cadence: 1.02, telegraphMs: 860, speedMultiplier: 0.93, signatureEvery: 4, delay: [205, 6300], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '80/17@1560 30/19@1635 70/22@1760', label: 'Справа и два в центр' },
                { id: 'b', tight: false, beats: '20/17@1560 30/19@1635 70/22@1760', label: 'Слева и два в центр' },
                { id: 'c', tight: false, beats: '70/17@1560 80/8@1665 20/22@1650', label: 'В центр, слева и медленный справа' },
                { id: 'd', tight: false, beats: '30/17@1560 20/8@1665 80/22@1650', label: 'В центр, справа и медленный слева' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '50/4@1834 30/17@1803 70/21@1852', label: 'В центр, медленный в центр и в центр' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '20/17@1560 70/19@1795 30/21@1852 10/24@1883', label: 'Слева, два в центр и слева' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, gaps: [250,250,400], beats: '10/17@1736 20/19@1802 70/21@1906 30/24@2130', label: 'Дважды слева и два в центр' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '80/17@1560 90/19@1697 84/21@1824 70/24@1883', label: 'Трижды справа и в центр' }
            ] },
        enem2: { title: 'Тройчатка', identity: 'Тройной укус',
            trick: 'связки по три-четыре удара между краем и центром; в конце полёта резкий рывок, порядок прилёта путается',
            tight: { p1: 400, floor: 120 }, style: 'lateRush', cadence: 0.86, telegraphMs: 730, speedMultiplier: 1.07, signatureEvery: 4, delay: [290, 4650], firstWave: 2232,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '70/13@2170 10/16@2181 8/19@2127', label: 'Слева, в центр и слева' },
                { id: 'b', tight: false, gaps: [550,0], beats: '20/14@2170 30/17@2338 84/19@2399', label: 'Слева, в центр и справа' },
                { id: 'c', tight: false, beats: '20/14@2170 70/17@2069 10/19@2127', label: 'В центр и дважды слева' },
                { id: 'd', tight: false, beats: '30/14@2054 90/16@2113 80/18@2157 84/19@2234', label: 'В центр и трижды справа' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '70/14@2054 10/16@2113 20/18@2157 8/19@2234', label: 'В центр и трижды слева' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, gaps: [0,400,250], beats: '20/13@2338 70/15@2275 30/17@2437 84/19@2499', label: 'В центр, слева, в центр и справа' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '80/13@2212 70/15@2311 30/17@2319 90/19@2376', label: 'Справа, два в центр и справа' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '70/14@2092 80/16@2181 84/18@2217 30/19@2376', label: 'В центр, дважды справа и в центр' }
            ] },
        enem3: { title: 'Чесалка', identity: 'Зуд и передышка',
            trick: 'быстрые связки зависают в полёте и падают почти разом; между связками долгая пауза',
            tight: { p1: 400, floor: 120 }, style: 'pause', cadence: 1.22, telegraphMs: 960, speedMultiplier: 0.84, signatureEvery: 4, delay: [172, 6900], firstWave: 2400,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '70/20@1918 10/22@2104 30/24@2212', label: 'В центр, слева и в центр' },
                { id: 'b', tight: false, beats: '30/20@1918 90/22@2104 70/24@2212', label: 'В центр, справа и в центр' },
                { id: 'c', tight: false, beats: '30/19@1996 90/21@2058 70/23@2142 84/25@2248', label: 'В центр, справа, в центр и справа' },
                { id: 'd', tight: false, beats: '90/19@2050 30/21@2104 80/23@2164 84/25@2248', label: 'Справа, в центр и дважды справа' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '70/18@2112 10/20@2154 30/22@2224 8/25@2288', label: 'В центр, слева, в центр и слева' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '30/18@2112 90/20@2154 70/22@2224 80/25@2288', label: 'В центр, справа, в центр и справа' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '70/18@2112 30/20@2154 10/22@2224 20/25@2288', label: 'Два в центр и дважды слева' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '90/18@2112 80/20@2154 70/22@2224 30/25@2288', label: 'Дважды справа и два в центр' }
            ] },
        enem4: { title: 'Скрипуха', identity: 'Скрип по прямой',
            trick: 'серии по три-пять ударов с одного края и центра, летят прямо и плотно',
            tight: { p1: 400, floor: 120 }, style: 'straight', cadence: 0.76, telegraphMs: 610, speedMultiplier: 1.2, signatureEvery: 4, delay: [230, 4500], firstWave: 2160,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '12/11@2148 14/12@2201 70/13@2274', label: 'Дважды слева и в центр' },
                { id: 'b', tight: false, gaps: [250,250], beats: '88/11@2306 30/12@2364 90/13@2450', label: 'Справа, в центр и справа' },
                { id: 'c', tight: false, beats: '70/11@2148 30/12@2201 10/13@2274', label: 'Два в центр и слева' },
                { id: 'd', tight: false, beats: '12/12@2114 30/11@2385 14/13@2328 70/12@2666', label: 'Дважды слева и два в центр' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '88/12@2142 30/11@2323 86/13@2328 70/12@2492', label: 'Справа, в центр, справа и в центр' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '70/12@1998 10/11@2449 12/13@2328 30/12@2666', label: 'В центр, дважды слева и в центр' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '12/11@2336 14/12@2317 10/13@2328 30/12@2666 70/11@2847', label: 'Трижды слева и два в центр' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '88/12@1998 90/13@2153 86/14@2186 70/13@2502 30/12@2841', label: 'Трижды справа и два в центр' }
            ] },
        enem5: { title: 'Шестерило', identity: 'Шестерёнки',
            trick: 'медленные удары снизу вперемешку с быстрыми сверху; атаки качаются на лету',
            tight: { p1: 400, floor: 120 }, style: 'weave', cadence: 0.73, telegraphMs: 630, speedMultiplier: 1.11, signatureEvery: 4, delay: [255, 4250], firstWave: 2040,
            combos: [
                { id: 'a', tight: false, open: 0, beats: '80/5@2254 30/13@2208 20/15@2224', label: 'В центр, слева и медленный справа' },
                { id: 'b', tight: false, beats: '89/5@2254 70/13@2208 20/15@2224', label: 'В центр, слева и медленный справа' },
                { id: 'c', tight: false, beats: '50/4@2254 70/14@2144 89/16@2110', label: 'Справа, в центр и медленный в центр' },
                { id: 'd', tight: false, beats: '89/5@2928 11/5@2890 30/13@2394 70/14@2544', label: 'Два в центр, медленный слева и медленный справа' },
                { id: 'e', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '20/13@2138 30/14@2172 50/4@2626 70/16@2272', label: 'Слева, два в центр и медленный в центр' },
                { id: 'f', tight: false, sig: true, minPhase: 1, recoveryMs: 650, open: 1, beats: '80/13@1964 70/14@2090 30/15@2224 20/5@2360', label: 'Справа, два в центр и медленный слева' },
                { id: 'g', tight: false, sig: true, minPhase: 2, recoveryMs: 650, beats: '20/13@2052 30/14@2144 70/15@2224 80/5@2886 50/4@2999', label: 'Слева, два в центр, медленный справа и медленный в центр' },
                { id: 'h', tight: false, sig: true, minPhase: 3, recoveryMs: 950, beats: '11/4@3098 50/4@3096 89/4@3094 30/14@2436 70/15@2497', label: 'Два в центр, медленный справа, медленный в центр и медленный слева' }
            ] }
    }
};
