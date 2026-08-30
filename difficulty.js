// Окно выбора сложности уровня — общее для index.html (клик по плитке уровня) и
// game.js (кнопка «Следующий уровень» в конце боя), чтобы сложность нельзя было обойти
// ни одним из двух входов на уровень — тот же принцип «универсально раз и навсегда», что
// и у формул начисления в saveData.js/game.js, только применённый к самому окну выбора.
// Стили — main_css.css (.difficulty-modal и т.д.), общий файл для обеих страниц.
//
// getLevelDifficulty/setLevelDifficulty — настоящие функции из saveData.js. Этот файл
// грузится статическим тегом раньше, чем saveData.js гарантированно готов, поэтому они
// не вызываются на верхнем уровне — только внутри openLevelDifficultyModal, к моменту
// вызова которой saveData.js уже точно загружен и в index.html, и в level.html.
(function () {
    'use strict';

    function normalizeDifficulty(value) {
        const parsed = Math.floor(Number(value));
        return Number.isFinite(parsed) && parsed >= 1 ? parsed : 1;
    }

    function openLevelDifficultyModal(levelNumber, { onStart, onCancel } = {}) {
        const oldModal = document.querySelector('.difficulty-modal');
        if (oldModal) oldModal.remove();

        let difficulty = typeof getLevelDifficulty === 'function' ? getLevelDifficulty(levelNumber) : 1;
        let started = false;

        const modal = document.createElement('div');
        modal.className = 'difficulty-modal';
        modal.innerHTML = `
            <div class="difficulty-dialog" role="dialog" aria-modal="true" aria-labelledby="difficultyModalTitle">
                <button type="button" class="difficulty-close" aria-label="Закрыть">&times;</button>
                <h2 id="difficultyModalTitle">Уровень ${levelNumber}</h2>
                <p class="difficulty-subtitle">Выберите сложность</p>
                <div class="difficulty-stepper">
                    <button type="button" class="difficulty-arrow difficulty-arrow-left" aria-label="Уменьшить сложность">&#8249;</button>
                    <input type="number" class="difficulty-value" id="difficultyValue" min="1" step="1" inputmode="numeric">
                    <button type="button" class="difficulty-arrow difficulty-arrow-right" aria-label="Увеличить сложность">&#8250;</button>
                </div>
                <p class="difficulty-hint">Урон и HP боссов, злато и очки рейтинга: <span id="difficultyBonusPct"></span></p>
                <div class="difficulty-actions">
                    <button type="button" class="difficulty-start">Начать</button>
                </div>
            </div>
        `;

        const valueInput = modal.querySelector('#difficultyValue');
        const bonusEl = modal.querySelector('#difficultyBonusPct');
        const leftArrow = modal.querySelector('.difficulty-arrow-left');

        function renderFrom(rawDifficulty) {
            bonusEl.textContent = `+${rawDifficulty * 10}%`;
            leftArrow.disabled = rawDifficulty <= 1;
        }

        function setDifficulty(value) {
            difficulty = normalizeDifficulty(value);
            valueInput.value = difficulty;
            renderFrom(difficulty);
        }
        setDifficulty(difficulty);

        // Ввод числа руками, не только стрелками. На каждый ввод — не нормализуем сам
        // <input> (иначе нельзя стереть цифру и напечатать другую, курсор будет скакать),
        // только подсказку/стрелки живьём; итоговое значение фиксируется на blur, Enter
        // или клик «Начать» — через setDifficulty (уже с полной нормализацией).
        valueInput.addEventListener('input', () => {
            const parsed = Math.floor(Number(valueInput.value));
            if (Number.isFinite(parsed) && parsed >= 1) {
                difficulty = parsed;
                renderFrom(difficulty);
            }
        });
        valueInput.addEventListener('blur', () => setDifficulty(valueInput.value));
        valueInput.addEventListener('keydown', event => {
            if (event.key === 'Enter') {
                event.preventDefault();
                setDifficulty(valueInput.value);
                modal.querySelector('.difficulty-start').click();
            }
        });

        function escHandler(event) {
            if (event.key === 'Escape') close();
        }
        document.addEventListener('keydown', escHandler);

        function close() {
            document.removeEventListener('keydown', escHandler);
            modal.remove();
            if (!started) onCancel?.();
        }

        modal.querySelector('.difficulty-close').addEventListener('click', close);
        modal.addEventListener('click', event => {
            if (event.target === modal) close();
        });
        leftArrow.addEventListener('click', () => setDifficulty(difficulty - 1));
        modal.querySelector('.difficulty-arrow-right').addEventListener('click', () => setDifficulty(difficulty + 1));
        modal.querySelector('.difficulty-start').addEventListener('click', () => {
            setDifficulty(valueInput.value);
            started = true;
            // Запоминается сложность, с которой НАЧАЛИ заход — не с которой прошли (см.
            // комментарий у setLevelDifficulty в saveData.js) — единственная точка вызова,
            // чтобы это не пришлось дублировать в каждом месте, откуда открывается окно.
            if (typeof setLevelDifficulty === 'function') setLevelDifficulty(levelNumber, difficulty);
            close();
            onStart?.(difficulty);
        });

        document.body.appendChild(modal);
        valueInput.focus();
        valueInput.select();
    }

    window.openLevelDifficultyModal = openLevelDifficultyModal;
})();
