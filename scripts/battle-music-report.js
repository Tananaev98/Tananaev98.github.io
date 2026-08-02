const fs = require('fs');
const path = require('path');
const vm = require('vm');

const projectRoot = path.resolve(__dirname, '..');

class AudioStub {
    constructor() {
        this.listeners = new Map();
        this.paused = true;
        this.ended = false;
        this.volume = 0;
        this.currentTime = 0;
        this.src = '';
    }

    addEventListener(name, callback) {
        this.listeners.set(name, callback);
    }

    load() {
        this.ended = false;
    }

    play() {
        this.paused = false;
        return Promise.resolve();
    }

    pause() {
        this.paused = true;
    }

    removeAttribute(name) {
        if (name === 'src') this.src = '';
    }
}

const windowStub = {
    addEventListener() {},
    setTimeout,
    clearTimeout
};
const sandbox = {
    window: windowStub,
    document: { hidden: false, addEventListener() {} },
    Audio: AudioStub,
    console,
    performance,
    requestAnimationFrame: callback => callback(performance.now() + 1000)
};

vm.createContext(sandbox);
for (const relativePath of ['music/playlist.js', 'music/battle-music.js']) {
    const source = fs.readFileSync(path.join(projectRoot, relativePath), 'utf8');
    vm.runInContext(source, sandbox, { filename: relativePath });
}

const player = windowStub.battleMusic;
const tracks = windowStub.BATTLE_MUSIC_TRACKS;

if (!player || tracks.length !== 6) {
    throw new Error(`Ожидалось 6 треков, загружено: ${tracks?.length ?? 0}`);
}

for (const track of tracks) {
    const trackPath = path.join(projectRoot, ...track.src.split('/'));
    if (!fs.existsSync(trackPath)) {
        throw new Error(`Не найден музыкальный файл: ${track.src}`);
    }
}

const scenarios = [
    {
        name: 'ранний приключенческий босс',
        context: {
            levelNumber: 1, bossIndex: 0, movementStyle: 'straight', cadence: 1.05,
            telegraphMs: 900, maxComboLength: 4, maxAttackSpeed: 16, averageSurpriseChance: 0.08
        }
    },
    {
        name: 'хитрый босс',
        context: {
            levelNumber: 8, bossIndex: 2, movementStyle: 'weave', cadence: 1.08,
            telegraphMs: 1000, maxComboLength: 5, maxAttackSpeed: 20, averageSurpriseChance: 0.28
        }
    },
    {
        name: 'быстрый хаотичный босс',
        context: {
            levelNumber: 9, bossIndex: 3, movementStyle: 'accelerate', cadence: 0.76,
            telegraphMs: 610, maxComboLength: 5, maxAttackSpeed: 30, averageSurpriseChance: 0.2
        }
    },
    {
        name: 'финал области',
        context: {
            levelNumber: 15, bossIndex: 4, isFinalBoss: true, isRegionFinal: true,
            movementStyle: 'lateRush', cadence: 0.72, telegraphMs: 650,
            maxComboLength: 7, maxAttackSpeed: 28, averageSurpriseChance: 0.3
        }
    }
];

console.log('Вес композиций по тестовым ситуациям:');
for (const scenario of scenarios) {
    player.setContext(scenario.context);
    const rankedTracks = player.getDebugSnapshot().trackWeights
        .sort((left, right) => right.weight - left.weight)
        .map(item => `${item.id}: ${item.weight.toFixed(2)}`);
    console.log(`- ${scenario.name}: ${rankedTracks.join(', ')}`);
}

player.trackHistory.length = 0;
player.currentTrackIndex = -1;
for (let step = 0; step < 30; step++) {
    const recent = player.trackHistory.slice(-2);
    const nextIndex = player.chooseNextTrackIndex();
    if (recent.includes(nextIndex)) {
        throw new Error(`Трек повторился раньше разрешённого: ${tracks[nextIndex].id}`);
    }
    player.loadTrack(nextIndex);
}

console.log('Проверка памяти двух последних треков: OK');
console.log('Проверка музыкальной конфигурации: OK');
