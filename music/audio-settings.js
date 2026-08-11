(function () {
    'use strict';

    // Общие настройки звука (музыка/эффекты), доступные и в хабе, и на уровне.
    // Регулируются ползунками в хабе (0-100, по умолчанию 25), читаются
    // hub-music.js/battle-music.js/game.js/index.html как единственный источник
    // громкости — никаких дополнительных фиксированных множителей в коде.
    const STORAGE_KEY = 'audioSettings';
    const DEFAULT_VOLUME = 10;
    const DEFAULTS = Object.freeze({ musicVolume: DEFAULT_VOLUME, sfxVolume: DEFAULT_VOLUME });

    function normalizeVolume(value, fallback) {
        const num = Number(value);
        if (!Number.isFinite(num)) return fallback;
        return Math.min(100, Math.max(0, Math.round(num)));
    }

    function readSettings() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return { ...DEFAULTS };
            const parsed = JSON.parse(raw);
            return {
                musicVolume: normalizeVolume(parsed?.musicVolume, DEFAULTS.musicVolume),
                sfxVolume: normalizeVolume(parsed?.sfxVolume, DEFAULTS.sfxVolume)
            };
        } catch (error) {
            return { ...DEFAULTS };
        }
    }

    function writeSettings(settings) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        } catch (error) {
            console.warn('Не удалось сохранить настройки звука', error);
        }
    }

    let state = readSettings();
    const listeners = new Set();

    function notify() {
        const snapshot = { ...state };
        listeners.forEach(listener => {
            try {
                listener(snapshot);
            } catch (error) {
                console.error('Ошибка в подписчике настроек звука', error);
            }
        });
    }

    function setMusicVolume(value) {
        const next = normalizeVolume(value, state.musicVolume);
        if (state.musicVolume === next) return;
        state = { ...state, musicVolume: next };
        writeSettings(state);
        notify();
    }

    function setSfxVolume(value) {
        const next = normalizeVolume(value, state.sfxVolume);
        if (state.sfxVolume === next) return;
        state = { ...state, sfxVolume: next };
        writeSettings(state);
        notify();
    }

    window.audioSettings = {
        // 0-100, как в UI.
        getMusicVolume: () => state.musicVolume,
        getSfxVolume: () => state.sfxVolume,
        // 0-1, готово для умножения на HTMLAudioElement.volume / GainNode.
        getMusicVolumeFactor: () => state.musicVolume / 100,
        getSfxVolumeFactor: () => state.sfxVolume / 100,
        setMusicVolume,
        setSfxVolume,
        isMusicMuted: () => state.musicVolume <= 0,
        isSfxMuted: () => state.sfxVolume <= 0,
        // Возвращает функцию отписки. Слушатель получает {musicVolume, sfxVolume} (0-100).
        subscribe(listener) {
            if (typeof listener !== 'function') return () => {};
            listeners.add(listener);
            return () => listeners.delete(listener);
        }
    };

    // Синхронизация между вкладками (например, хаб открыт отдельно от уровня).
    window.addEventListener('storage', event => {
        if (event.key !== STORAGE_KEY) return;
        state = readSettings();
        notify();
    });
})();
