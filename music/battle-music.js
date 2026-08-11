(function () {
    'use strict';

    const configuredMusic = window.BATTLE_MUSIC_CONFIG ?? {};
    const BATTLE_MUSIC_TRACKS = Array.isArray(configuredMusic.tracks)
        ? configuredMusic.tracks
        : [];
    const BATTLE_MUSIC_SETTINGS = {
        fadeDurationMs: Number.isFinite(configuredMusic.fadeDurationMs) ? configuredMusic.fadeDurationMs : 450,
        shuffle: configuredMusic.shuffle !== false,
        recentTrackMemory: Number.isFinite(configuredMusic.recentTrackMemory)
            ? configuredMusic.recentTrackMemory
            : 2,
        transitionDelayMs: Array.isArray(configuredMusic.transitionDelayMs)
            ? configuredMusic.transitionDelayMs
            : [1200, 2800]
    };

    const KNOWN_MOODS = ['folk', 'adventure', 'heavy', 'cunning', 'heroic', 'chaos'];
    const MOVEMENT_MOODS = {
        straight: ['adventure'],
        drift: ['cunning', 'adventure'],
        weave: ['cunning', 'chaos'],
        pause: ['heavy', 'cunning'],
        accelerate: ['chaos', 'heavy'],
        lateRush: ['heavy', 'cunning']
    };

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
    const toMoodArray = value => {
        const values = Array.isArray(value) ? value : [value];
        return values.filter(mood => KNOWN_MOODS.includes(mood));
    };

    class BattleMusicPlayer {
        constructor(tracks, settings) {
            this.tracks = tracks.filter(track => track && track.src && track.enabled !== false);
            this.settings = settings;
            this.audio = null;
            this.currentTrackIndex = -1;
            this.trackHistory = [];
            this.failedSources = new Set();
            this.context = {};
            this.requested = false;
            this.gamePaused = true;
            this.combatActive = false;
            this.pageHidden = document.hidden;
            this.fadeToken = 0;
            this.nextTrackTimer = null;
            this.volumeFactor = window.audioSettings?.getMusicVolumeFactor() ?? 0.10;

            window.audioSettings?.subscribe(({ musicVolume }) => {
                this.volumeFactor = clamp(Number(musicVolume) / 100, 0, 1);
                // syncPlayback сам подстроит громкость уже играющего трека (через
                // playLoadedTrack → fadeTo) и поставит на паузу/возобновит при
                // переходе в 0/из 0.
                this.syncPlayback();
            });

            document.addEventListener('visibilitychange', () => {
                this.pageHidden = document.hidden;
                this.syncPlayback();
            });

            window.addEventListener('pagehide', () => this.stop({ immediate: true }));
        }

        get playableTrackIndexes() {
            return this.tracks
                .map((track, index) => ({ track, index }))
                .filter(({ track }) => !this.failedSources.has(track.src))
                .map(({ index }) => index);
        }

        ensureAudio() {
            if (this.audio) return this.audio;

            this.audio = new Audio();
            this.audio.preload = 'metadata';
            this.audio.addEventListener('ended', () => this.handleTrackEnded());
            this.audio.addEventListener('error', () => this.handleTrackError());
            return this.audio;
        }

        getTrackVolume() {
            return clamp(this.volumeFactor, 0, 1);
        }

        setContext(context = {}) {
            this.context = context && typeof context === 'object' ? { ...context } : {};
        }

        setCombatActive(active) {
            this.combatActive = Boolean(active);
            if (!this.combatActive) this.clearNextTrackTimer();
        }

        getMoodScores() {
            const scores = Object.fromEntries(KNOWN_MOODS.map(mood => [mood, 0]));
            const add = (mood, value) => {
                if (Object.hasOwn(scores, mood)) scores[mood] += value;
            };
            const explicitMoods = toMoodArray(this.context.musicMood ?? this.context.musicMoods);

            // Авторская настройка в gameData имеет приоритет над автоматикой.
            if (explicitMoods.length > 0) {
                explicitMoods.forEach((mood, index) => add(mood, index === 0 ? 12 : 8));
                return scores;
            }

            const levelNumber = Number(this.context.levelNumber) || 1;
            const bossIndex = Number.isFinite(this.context.bossIndex) ? this.context.bossIndex : 0;
            const cadence = Number(this.context.cadence) || 1;
            const telegraphMs = Number(this.context.telegraphMs) || 850;
            const maxComboLength = Number(this.context.maxComboLength) || 1;
            const maxAttackSpeed = Number(this.context.maxAttackSpeed) || 1;
            const surpriseChance = Number(this.context.averageSurpriseChance) || 0;

            add('adventure', 1);

            if (levelNumber <= 3) {
                add('folk', 1.8);
                add('adventure', 2.2);
            } else if (levelNumber >= 10) {
                add('heavy', 0.8);
                add('heroic', 0.7);
            }

            if (bossIndex === 0) {
                add('folk', 1.2);
                add('adventure', 1.3);
            }

            if (this.context.isFinalBoss) {
                add('heroic', 3);
                add('heavy', 1.2);
            }

            if (this.context.isRegionFinal && this.context.isFinalBoss) {
                add('heroic', 3.5);
                add('heavy', 1.5);
            }

            (MOVEMENT_MOODS[this.context.movementStyle] ?? ['adventure'])
                .forEach((mood, index) => add(mood, index === 0 ? 2.2 : 1.1));

            if (cadence <= 0.82) {
                add('chaos', 2.1);
                add('heavy', 1.1);
            } else if (cadence <= 0.96) {
                add('heavy', 1.4);
            } else if (cadence >= 1.12) {
                add('cunning', 1.5);
            }

            if (telegraphMs <= 680) add('chaos', 1.5);
            if (telegraphMs >= 960) add('cunning', 1.2);
            if (maxComboLength >= 6) add('heavy', 1.1);
            if (maxAttackSpeed >= 24) add('chaos', 1);
            if (surpriseChance >= 0.25) add('cunning', 1.3);

            return scores;
        }

        getTrackSelectionWeight(index, moodScores = this.getMoodScores()) {
            const track = this.tracks[index];
            const moods = toMoodArray(track?.moods);
            const affinity = moods.reduce((sum, mood) => sum + moodScores[mood], 0);
            const baseWeight = Number.isFinite(track?.weight) ? Math.max(0, track.weight) : 1;
            return baseWeight * (0.12 + Math.pow(affinity, 1.12));
        }

        chooseWeightedIndex(indexes) {
            const moodScores = this.getMoodScores();
            const weighted = indexes.map(index => ({
                index,
                weight: this.getTrackSelectionWeight(index, moodScores)
            }));
            const totalWeight = weighted.reduce((sum, item) => sum + item.weight, 0);

            if (totalWeight <= 0) {
                return indexes[Math.floor(Math.random() * indexes.length)];
            }

            let cursor = Math.random() * totalWeight;
            for (const item of weighted) {
                cursor -= item.weight;
                if (cursor <= 0) return item.index;
            }

            return weighted[weighted.length - 1].index;
        }

        chooseNextTrackIndex() {
            const available = this.playableTrackIndexes;
            if (available.length === 0) return -1;

            const fixedTrack = this.context.musicTrack;
            if (fixedTrack) {
                const fixedIndex = available.find(index => {
                    const track = this.tracks[index];
                    return track.id === fixedTrack || track.src === fixedTrack;
                });
                if (fixedIndex !== undefined) return fixedIndex;
            }

            if (available.length === 1) return available[0];

            const memorySize = clamp(Math.floor(this.settings.recentTrackMemory), 0, available.length - 1);
            const recentIndexes = new Set(this.trackHistory.slice(-memorySize));
            let candidates = available.filter(index => !recentIndexes.has(index));

            if (candidates.length === 0) {
                candidates = available.filter(index => index !== this.currentTrackIndex);
            }

            if (!this.settings.shuffle) {
                const currentPosition = available.indexOf(this.currentTrackIndex);
                for (let offset = 1; offset <= available.length; offset++) {
                    const index = available[(currentPosition + offset) % available.length];
                    if (candidates.includes(index)) return index;
                }
            }

            return this.chooseWeightedIndex(candidates);
        }

        rememberTrack(index) {
            this.trackHistory.push(index);
            const maxHistory = Math.max(4, this.settings.recentTrackMemory + 1);
            if (this.trackHistory.length > maxHistory) {
                this.trackHistory.splice(0, this.trackHistory.length - maxHistory);
            }
        }

        loadTrack(index) {
            const track = this.tracks[index];
            if (!track) return false;

            const audio = this.ensureAudio();
            this.fadeToken++;
            this.currentTrackIndex = index;
            this.rememberTrack(index);
            audio.src = track.src;
            audio.loop = false;
            audio.volume = 0;
            audio.load();
            return true;
        }

        async playLoadedTrack() {
            if (!this.audio || this.currentTrackIndex < 0) return false;

            const track = this.tracks[this.currentTrackIndex];
            try {
                await this.audio.play();
                this.fadeTo(this.getTrackVolume());
                return true;
            } catch (error) {
                // Браузер может блокировать звук до первого действия игрока.
                if (error?.name !== 'NotAllowedError' && error?.name !== 'AbortError') {
                    console.warn(`Не удалось запустить боевую музыку: ${track.src}`, error);
                }
                return false;
            }
        }

        async syncPlayback() {
            const shouldPlay = this.requested && !this.gamePaused && !this.pageHidden && this.volumeFactor > 0;
            if (!shouldPlay) {
                this.fadePause();
                return false;
            }

            if (this.tracks.length === 0) return false;
            if (!this.combatActive && (!this.audio || this.audio.ended)) {
                this.releaseEndedTrack();
                return false;
            }

            if (!this.audio || this.currentTrackIndex < 0 || this.audio.ended) {
                const nextIndex = this.chooseNextTrackIndex();
                if (nextIndex < 0 || !this.loadTrack(nextIndex)) return false;
            }

            return this.playLoadedTrack();
        }

        start(context) {
            if (context) this.setContext(context);
            this.clearNextTrackTimer();
            this.requested = true;
            this.gamePaused = false;
            this.combatActive = true;
            return this.syncPlayback();
        }

        resume() {
            this.gamePaused = false;
            return this.syncPlayback();
        }

        pause({ immediate = false } = {}) {
            this.gamePaused = true;
            if (immediate) {
                this.fadeToken++;
                this.clearNextTrackTimer();
                if (this.audio) {
                    this.audio.pause();
                    this.audio.volume = 0;
                }
                return;
            }
            this.syncPlayback();
        }

        stop({ immediate = false } = {}) {
            this.clearNextTrackTimer();
            this.requested = false;
            this.gamePaused = true;
            this.combatActive = false;

            const reset = () => {
                if (!this.audio) return;
                this.audio.pause();
                this.audio.currentTime = 0;
                this.audio.volume = 0;
            };

            if (immediate) {
                this.fadeToken++;
                reset();
            } else {
                this.fadeTo(0, reset);
            }
        }

        handleTrackEnded() {
            if (!this.requested || this.gamePaused || this.pageHidden) return;
            if (!this.combatActive) {
                this.releaseEndedTrack();
                return;
            }

            this.scheduleNextTrack();
        }

        scheduleNextTrack() {
            this.clearNextTrackTimer();
            const [rawMin, rawMax] = this.settings.transitionDelayMs;
            const minDelay = Math.max(0, Number(rawMin) || 0);
            const maxDelay = Math.max(minDelay, Number(rawMax) || minDelay);
            const delay = minDelay + Math.random() * (maxDelay - minDelay);

            this.nextTrackTimer = window.setTimeout(() => {
                this.nextTrackTimer = null;
                this.playNextTrack();
            }, delay);
        }

        clearNextTrackTimer() {
            if (this.nextTrackTimer === null) return;
            window.clearTimeout(this.nextTrackTimer);
            this.nextTrackTimer = null;
        }

        playNextTrack() {
            if (!this.requested || this.gamePaused || this.pageHidden || !this.combatActive) return;
            const nextIndex = this.chooseNextTrackIndex();
            if (nextIndex < 0 || !this.loadTrack(nextIndex)) return;
            this.playLoadedTrack();
        }

        releaseEndedTrack() {
            this.clearNextTrackTimer();
            if (!this.audio) return;
            this.audio.pause();
            this.audio.removeAttribute('src');
            this.audio.load();
            this.currentTrackIndex = -1;
        }

        handleTrackError() {
            const failedTrack = this.tracks[this.currentTrackIndex];
            if (!failedTrack) return;

            this.failedSources.add(failedTrack.src);
            console.warn(`Файл боевой музыки не найден или не поддерживается: ${failedTrack.src}`);

            if (!this.combatActive) {
                this.releaseEndedTrack();
                return;
            }

            const nextIndex = this.chooseNextTrackIndex();
            if (nextIndex < 0) {
                this.stop({ immediate: true });
                return;
            }

            if (this.loadTrack(nextIndex) && this.requested && !this.gamePaused && !this.pageHidden) {
                this.playLoadedTrack();
            }
        }

        fadePause() {
            if (!this.audio || this.audio.paused) return;
            this.fadeTo(0, () => this.audio?.pause());
        }

        fadeTo(targetVolume, onComplete) {
            if (!this.audio) {
                onComplete?.();
                return;
            }

            const audio = this.audio;
            const startVolume = audio.volume;
            const target = clamp(targetVolume, 0, 1);
            const duration = Math.max(0, this.settings.fadeDurationMs);
            const token = ++this.fadeToken;

            if (duration === 0 || Math.abs(startVolume - target) < 0.001) {
                audio.volume = target;
                onComplete?.();
                return;
            }

            const startedAt = performance.now();
            const step = now => {
                if (token !== this.fadeToken) return;
                const progress = clamp((now - startedAt) / duration, 0, 1);
                audio.volume = startVolume + (target - startVolume) * progress;

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    onComplete?.();
                }
            };

            requestAnimationFrame(step);
        }

        getDebugSnapshot() {
            return {
                context: { ...this.context },
                moods: this.getMoodScores(),
                currentTrack: this.tracks[this.currentTrackIndex] ?? null,
                trackWeights: this.playableTrackIndexes.map(index => ({
                    id: this.tracks[index].id,
                    weight: this.getTrackSelectionWeight(index)
                }))
            };
        }
    }

    window.battleMusic = new BattleMusicPlayer(BATTLE_MUSIC_TRACKS, BATTLE_MUSIC_SETTINGS);
    window.BATTLE_MUSIC_TRACKS = BATTLE_MUSIC_TRACKS;
})();
