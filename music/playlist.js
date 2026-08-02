window.BATTLE_MUSIC_CONFIG = {
    masterVolume: 0.12,
    fadeDurationMs: 450,
    shuffle: true,
    recentTrackMemory: 2,
    transitionDelayMs: [1200, 2800],

    // moods задают роль трека. Плеер сопоставляет их с профилем текущего
    // или следующего босса, поэтому порядок массива не привязан к уровням.
    tracks: [
        {
            id: 'kalinka',
            src: 'music/muzaproduction-russian-folk-kalinka-108671.mp3',
            title: 'Russian Folk Kalinka',
            author: 'MuzaProduction',
            moods: ['folk', 'adventure'],
            weight: 1.05,
            volume: 0.4
        },
        {
            id: 'slavic-epic',
            src: 'music/ebunny-slavic-epic-loop-368859.mp3',
            title: 'Slavic Epic Loop',
            author: 'Ebunny',
            moods: ['adventure', 'heroic'],
            weight: 1,
            volume: 0.4
        },
        {
            id: 'war-dance',
            src: 'music/soundsbyamelia-slavic-war-dance-drums-stomps-amp-war-pipes-422949.mp3',
            title: 'Slavic War Dance — Drums, Stomps & War Pipes',
            author: 'SoundsByAmelia',
            moods: ['heavy', 'chaos', 'heroic'],
            weight: 0.88,
            volume: 0.4
        },
        {
            id: 'forest-horror',
            src: 'music/soundsbyamelia-slavic-forest-horror-ritual-drums-eerie-flutes-amp-drones-422976.mp3',
            title: 'Slavic Forest Horror — Ritual Drums, Eerie Flutes & Drones',
            author: 'SoundsByAmelia',
            moods: ['cunning', 'heavy'],
            weight: 0.78,
            volume: 0.4
        },
        {
            id: 'fantasy-armies',
            src: 'music/alexandr-zhelanov-fantasy-armies.mp3',
            title: 'Fantasy Armies',
            author: 'Alexandr Zhelanov',
            moods: ['heroic', 'adventure', 'heavy'],
            weight: 0.88,
            volume: 0.4
        },
        {
            id: 'dvorak-polka',
            src: 'music/kevin-macleod-dvorak-polka.mp3',
            title: 'Dvorak Polka',
            author: 'Kevin MacLeod',
            moods: ['chaos', 'folk', 'adventure'],
            // Полка должна давать редкий всплеск без превращения всего боя в цирк.
            weight: 0.42,
            volume: 0.4
        }
    ]
};
