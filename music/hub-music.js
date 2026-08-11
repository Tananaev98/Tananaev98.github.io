(function () {
    'use strict';

    const HUB_MUSIC_CONFIG = {
        src: 'music/elerya-calm.mp3',
        fadeInMs: 900,
        fadeOutMs: 900,
        positionStorageKey: 'hubMusicPosition:elerya-calm'
    };

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

    class HubMusicPlayer {
        constructor(config) {
            this.config = config;
            this.audio = new Audio(config.src);
            this.audio.preload = 'auto';
            this.audio.loop = true;
            this.audio.volume = 0;
            this.started = false;
            this.fadeToken = 0;
            this.lastSavedSecond = -1;
            this.navigationStarted = false;
            this.volumeFactor = window.audioSettings?.getMusicVolumeFactor() ?? 0.10;

            window.audioSettings?.subscribe(({ musicVolume }) => this.handleVolumeChange(musicVolume));

            this.audio.addEventListener('loadedmetadata', () => this.restorePosition());
            this.audio.addEventListener('timeupdate', () => this.savePositionPeriodically());
            this.audio.addEventListener('error', () => {
                console.warn(`Не удалось загрузить музыку хаба: ${this.config.src}`);
            });

            document.addEventListener('pointerdown', event => this.handleFirstInteraction(event), true);
            document.addEventListener('keydown', event => this.handleFirstInteraction(event), true);
            document.addEventListener('click', event => this.handleLevelNavigation(event), true);
            document.addEventListener('visibilitychange', () => this.syncWithPageActivity());
            window.addEventListener('blur', () => this.syncWithPageActivity());
            window.addEventListener('focus', () => this.syncWithPageActivity());
            window.addEventListener('pagehide', () => {
                this.savePosition();
                this.pauseForBackground();
            });
            window.addEventListener('pageshow', () => {
                this.resetNavigationState();
                this.syncWithPageActivity();
            });

            // В некоторых браузерах возврат на уже разрешивший звук сайт допускает автозапуск.
            // Если нет — музыка начнётся после первого действия пользователя.
            this.start({ silentFailure: true });
        }

        isPageInactive() {
            return document.hidden || !document.hasFocus();
        }

        pauseForBackground() {
            // rAF-затухание во скрытой вкладке не доходит до pause() — останавливаем сразу.
            this.fadeToken += 1;
            this.savePosition();
            if (!this.audio.paused) {
                this.audio.pause();
            }
        }

        resumeFromBackground() {
            if (!this.started || this.navigationStarted || this.isPageInactive() || this.volumeFactor <= 0) return;
            this.audio.volume = 0;
            this.start({ silentFailure: true });
        }

        handleVolumeChange(musicVolume) {
            const factor = clamp(Number(musicVolume) / 100, 0, 1);
            this.volumeFactor = factor;

            if (factor <= 0) {
                this.fadeToken += 1;
                this.savePosition();
                if (!this.audio.paused) this.audio.pause();
                this.audio.volume = 0;
                return;
            }

            if (this.started && !this.audio.paused) {
                // Уже играет — плавно подстраиваемся под новый уровень.
                this.fadeTo(factor, 250);
                return;
            }

            // Не играло (было выключено или ждало первого действия пользователя).
            this.audio.volume = 0;
            this.start({ silentFailure: true });
        }

        syncWithPageActivity() {
            if (this.isPageInactive()) {
                this.pauseForBackground();
                return;
            }
            this.resumeFromBackground();
        }

        isLevelLinkInteraction(event) {
            const target = event.target instanceof Element ? event.target : null;
            return Boolean(target?.closest('a.level.unlocked[href]'));
        }

        handleFirstInteraction(event) {
            if (this.started || this.isLevelLinkInteraction(event)) return;
            this.start({ silentFailure: true });
        }

        async start({ silentFailure = false } = {}) {
            if (this.volumeFactor <= 0) return false;
            if (this.started && !this.audio.paused) return true;
            if (this.isPageInactive()) return false;

            try {
                await this.audio.play();
                this.started = true;
                this.fadeTo(this.volumeFactor, this.config.fadeInMs);
                return true;
            } catch (error) {
                if (!silentFailure && error?.name !== 'NotAllowedError' && error?.name !== 'AbortError') {
                    console.warn('Не удалось запустить музыку хаба', error);
                }
                return false;
            }
        }

        handleLevelNavigation(event) {
            if (event.defaultPrevented || event.button !== 0) return;
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

            const target = event.target instanceof Element ? event.target : null;
            const levelLink = target?.closest('a.level.unlocked[href]');
            if (!levelLink || levelLink.target === '_blank') return;

            if (this.navigationStarted) {
                event.preventDefault();
                return;
            }
            this.navigationStarted = true;
            document.documentElement.classList.add('is-level-navigation-pending');
            levelLink.classList.add('is-entering');
            levelLink.setAttribute('aria-busy', 'true');
            this.savePosition();

            // Не отменяем обычное действие ссылки: загрузка уровня начинается сразу.
            // Затухание музыки идёт параллельно и никогда не блокирует навигацию.
            if (this.started && !this.audio.paused && this.audio.volume >= 0.002) {
                this.fadeTo(0, this.config.fadeOutMs);
            }
        }

        resetNavigationState() {
            this.navigationStarted = false;
            document.documentElement.classList.remove('is-level-navigation-pending');
            document.querySelectorAll('.level.is-entering').forEach(levelLink => {
                levelLink.classList.remove('is-entering');
                levelLink.removeAttribute('aria-busy');
            });
        }

        restorePosition() {
            try {
                const savedPosition = Number(sessionStorage.getItem(this.config.positionStorageKey));
                if (!Number.isFinite(savedPosition) || savedPosition <= 0 || !this.audio.duration) return;
                this.audio.currentTime = savedPosition % this.audio.duration;
            } catch (error) {
                console.warn('Не удалось восстановить позицию музыки хаба', error);
            }
        }

        savePositionPeriodically() {
            const currentSecond = Math.floor(this.audio.currentTime);
            if (currentSecond === this.lastSavedSecond || currentSecond % 5 !== 0) return;
            this.lastSavedSecond = currentSecond;
            this.savePosition();
        }

        savePosition() {
            if (!Number.isFinite(this.audio.currentTime)) return;
            try {
                sessionStorage.setItem(this.config.positionStorageKey, String(this.audio.currentTime));
            } catch (error) {
                console.warn('Не удалось сохранить позицию музыки хаба', error);
            }
        }

        fadeTo(targetVolume, duration, onComplete) {
            const startVolume = this.audio.volume;
            const target = clamp(targetVolume, 0, 1);
            const fadeDuration = Math.max(0, Number(duration) || 0);
            const token = ++this.fadeToken;

            if (fadeDuration === 0 || Math.abs(startVolume - target) < 0.001) {
                this.audio.volume = target;
                onComplete?.();
                return;
            }

            const startedAt = performance.now();
            const step = now => {
                if (token !== this.fadeToken) return;
                const progress = clamp((now - startedAt) / fadeDuration, 0, 1);
                this.audio.volume = startVolume + (target - startVolume) * progress;

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    onComplete?.();
                }
            };

            requestAnimationFrame(step);
        }
    }

    window.hubMusic = new HubMusicPlayer(HUB_MUSIC_CONFIG);
    window.HUB_MUSIC_CONFIG = HUB_MUSIC_CONFIG;
})();
