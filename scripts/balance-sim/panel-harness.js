// Node-замена браузерного прогона admin-balance-panel.html — НЕ дублирует ни одной
// боевой/балансовой формулы (см. CLAUDE.md правило 1): грузит РЕАЛЬНЫЙ level.html/
// game.js/saveData.js через jsdom (тот же чёрный ящик, что и настоящий скрытый iframe
// панели в браузере, просто в headless-DOM вместо настоящего), и запускает БУКВАЛЬНО ТОТ
// ЖЕ orchestration-код панели (CombatEngine/SurvivalEngine/RealUpgradeEngine/
// ProgressionEngine/ExcelExport/runAll), извлечённый из admin-balance-panel.html в
// момент запуска — не переписанную копию. Единственное, что здесь заменяется —
// ProgressionEngine.init и CombatEngine.loadHero, у которых в браузерной версии внутри
// GET/SET конкретных <iframe>-элементов панели; здесь та же роль отдаётся jsdom-окнам.
// Меняется среда исполнения, не смысл того, что исполняется.
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM, VirtualConsole } = require('jsdom');

const ROOT = path.resolve(__dirname, '../..');
const PANEL_PATH = path.join(ROOT, 'admin-balance-panel.html');

const AUTO_RUN_MARKER = '\nrunAll();';

// Топ-уровневые const/function-объявления panel-скрипта (CombatEngine, STRATEGIES,
// ATTEMPTS_PER_STRATEGY и т.п.) не становятся свойствами window сами по себе — в браузере
// это тоже так (let/const никогда не вешаются на window), просто раньше это было не нужно
// извне. Тем же приёмом, что и PROBE_SCRIPT_SOURCE ниже (script-тег, читающий их по имени
// из общего лексического скоупа), выносим нужные привязки на window.__expose.
const EXPOSE_NAMES = [
    'CombatEngine', 'ProgressionEngine', 'RealUpgradeEngine', 'SurvivalEngine', 'ExcelExport',
    'STRATEGIES', 'ATTEMPTS_PER_LEVEL', 'ATTEMPTS_PER_STRATEGY', 'ATTACK_STAT_IDS',
    'DUMMY_FIGHTS_PER_LEVEL', 'SURVIVAL_RUNS_PER_LEVEL', 'CAMPAIGN_FINAL_LEVEL',
    'OVERGRIND_HERO_LEVELS', 'OVERGRIND_CAMPAIGN_LEVEL',
    'SURVIVAL_RUNS_PER_ATTEMPT', 'INCOMING_CADENCE_MS',
    'DUMMY_RUN_DURATION_SEC', 'DUMMY_UPGRADE_INTERVAL_SEC', 'DUMMY_UPGRADE_WINDOWS',
    'PROBE_SCRIPT_SOURCE', 'runAll',
    // Для точечных диагностик (scripts/balance-sim/*-diagnostic.js) поверх обычного
    // прогона — та же самая функция захода, что и в runAll, не копия.
    'runOneUpgradedAttempt', 'runOneCeilingAttempt', 'getPerBossHpList', 'getLevelBossHpTotal', 'mulberry32', 'hashSeed',
    'CEILING_ATTEMPTS', 'CEILING_POOL_SIZE',
    // Правило 13 CLAUDE.md (шанс обогнать Луку) — вызывается ещё раз в run.js ПОСЛЕ
    // слияния воркеров, см. её комментарий в admin-balance-panel.html.
    'computeWinRateVsLuka'
];

// attemptsPerStrategyOverride (опционально) — по прямому запросу пользователя: у листа
// «DPS с апгрейдами» — 50 попыток/строку (5 стратегий × ATTEMPTS_PER_STRATEGY=10 в
// admin-balance-panel.html), это даёт статистический шум ±6-7pp на КАЖДОЙ строке (см.
// обсуждение в чате с Еремеем/Дуней про разброс соседних строк, не связанный с реальными
// статами). Полный прогон всего ростера (150 строк × 8 героев) при таком шуме и так уже
// не быстрый (2.5+ мин) — поднимать ATTEMPTS_PER_STRATEGY там нельзя, будет слишком
// долго. Но при ФОКУСНЫХ прогонах (--heroes=X,luka, обычно ~50с) есть запас, чтобы взять
// в 2-4 раза больше попыток и заметно придавить шум БЕЗ переписывания ни одной формулы —
// тот же самый код панели, просто больше замеров. Подменяем текстом сам const в HTML
// панели ДО создания jsdom-окна (панель — не модуль, значения top-level const нельзя
// переопределить после парсинга) — только в Node-харнессе, браузерная версия панели не
// затронута (там override не передаётся никогда).
function readPanelSourceWithoutAutoRun(attemptsPerStrategyOverride) {
    const html = fs.readFileSync(PANEL_PATH, 'utf8');
    const occurrences = html.split(AUTO_RUN_MARKER).length - 1;
    if (occurrences !== 1) {
        throw new Error(
            `Ожидалась ровно одна автозапускающая строка "runAll();" в admin-balance-panel.html, ` +
            `найдено ${occurrences} — структура панели изменилась, поправьте scripts/balance-sim/panel-harness.js.`
        );
    }
    let patched = html.replace(AUTO_RUN_MARKER, '\n/* авто-запуск отключён Node-обвязкой scripts/balance-sim */');
    if (Number.isFinite(attemptsPerStrategyOverride) && attemptsPerStrategyOverride > 0) {
        const marker = 'const ATTEMPTS_PER_STRATEGY = 10;';
        if (!patched.includes(marker)) {
            throw new Error(
                `Не найдена строка "${marker}" в admin-balance-panel.html — структура панели ` +
                `изменилась, поправьте scripts/balance-sim/panel-harness.js (attemptsPerStrategyOverride).`
            );
        }
        patched = patched.replace(marker, `const ATTEMPTS_PER_STRATEGY = ${Math.round(attemptsPerStrategyOverride)};`);
    }
    return patched;
}

function extractProbeScriptSource(panelHtml) {
    const match = panelHtml.match(/const PROBE_SCRIPT_SOURCE = `([\s\S]*?)`;/);
    if (!match) throw new Error('PROBE_SCRIPT_SOURCE не найден в admin-balance-panel.html');
    return match[1];
}

// window.fetch в jsdom не подставляется сам по себе, а глобальный fetch Node не умеет
// относительные URL (SurvivalEngine.fetchLevelFile зовёт fetch('lvlData/gameData141.js')
// ровно как в браузере, ожидая резолва относительно текущего документа) — оборачиваем.
function installRelativeFetch(window) {
    window.fetch = (input, init) => {
        const resolved = typeof input === 'string' ? new URL(input, window.location.href).href : input;
        return fetch(resolved, init);
    };
}

// updateHeroHealthDisplay() (game.js) переустанавливает img.src на КАЖДЫЙ тик
// применения урона/регена (даже без изменения самого URL) — в headless-симуляции без
// экрана это чистые накладные расходы: jsdom пытается реально СКАЧАТЬ картинку с
// локального сервера на каждое присваивание .src, и на героях с механикой, дёргающей
// probe на каждый удар прямо ВНУТРИ живучести (сейчас — только реген Милы, см.
// applyMilaHeroRegen → updateHeroHealthDisplay), это превращает тысячи ударов в тысячи
// сетевых запросов и обрушивает скорость на порядки. Мы ничего не рендерим и не смотрим
// на картинки — глушим именно и только загрузку ресурса по .src, сама боевая логика
// game.js этот сеттер не читает и не ждёт результата, так что на числа это не влияет.
function disableImageLoading(window) {
    try {
        Object.defineProperty(window.HTMLImageElement.prototype, 'src', {
            configurable: true,
            get() { return this.getAttribute('src') || ''; },
            set(value) { this.setAttribute('src', value); }
        });
    } catch (e) { /* если jsdom когда-нибудь запретит переопределение — просто медленнее, не сломано */ }
}

function silentConsole() {
    // Реальный game.js логирует в консоль на каждый крит/спавн и т.п. — полезно живому
    // игроку в DevTools, но при тысячах симулированных ударов это чистые накладные
    // расходы без всякой пользы. VirtualConsole без .sendTo(...) просто не пробрасывает
    // события в консоль Node (ошибки самого jsdom при парсинге HTML/CSS тоже глушатся —
    // это тот же уровень шума, что игрок никогда не видит и в браузере).
    return new VirtualConsole();
}

async function waitFor(check, timeoutMs, intervalMs, message) {
    const start = Date.now();
    while (!check()) {
        if (Date.now() - start > timeoutMs) throw new Error(message || 'Таймаут ожидания условия');
        await new Promise((resolve) => setTimeout(resolve, intervalMs || 20));
    }
}

// Настоящий saveData.js (без game.js, без DOM боя) — admin-progression-harness.html и
// так всего лишь загружает его одним <script src>, эквивалент ProgressionEngine.init в
// браузере, просто на jsdom-окне вместо #progressionFrame.
async function loadProgressionApi(port) {
    const url = `http://127.0.0.1:${port}/admin-progression-harness.html`;
    const dom = await JSDOM.fromURL(url, {
        runScripts: 'dangerously',
        resources: 'usable',
        virtualConsole: silentConsole()
    });
    const window = dom.window;
    await waitFor(
        () => typeof window.getDefaultGameState === 'function',
        15000, 30,
        'saveData.js не загрузился в admin-progression-harness.html (Node-harness)'
    );
    return { dom, api: window };
}

// Настоящий level.html + game.js + внедрённый PROBE_SCRIPT_SOURCE — эквивалент
// CombatEngine.loadHero в браузере, только на отдельном jsdom-окне вместо #combatFrame.
// gameState в localStorage сеется ДО загрузки документа (beforeParse) — как и в браузере,
// где localStorage.setItem вызывается перед сменой frameEl.src.
// overrideHeroState — опциональный (см. CombatEngine.loadHeroAtLevel в admin-balance-
// panel.html и attachNodeEngines ниже): если передан, gameState[heroKey] сеется этим
// уже прокачанным объектом (ProgressionEngine.buildHeroAtLevel), а не героем 1 уровня по
// умолчанию — нужно, чтобы startGlobalDamage/startGlobalCritMultiplier/... (const в
// game.js, читаются один раз при разборе страницы) отражали РЕАЛЬНЫЙ уровень героя, а не
// всегда 1-й — иначе магнитуда карточек временных улучшений (buildUpgradeStatEffect)
// считалась бы неверно на любой строке диапазона выше 1 уровня.
async function loadHeroCombatProbe(port, heroKey, defaultGameState, probeScriptSource, overrideHeroState) {
    const seedState = JSON.parse(JSON.stringify(defaultGameState));
    seedState.activeHero = heroKey;
    seedState.schemaVersion = defaultGameState.schemaVersion;
    if (overrideHeroState) {
        seedState[heroKey] = JSON.parse(JSON.stringify(overrideHeroState));
    }

    const url = `http://127.0.0.1:${port}/level.html?level=1&admin=1&t=${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const dom = await JSDOM.fromURL(url, {
        runScripts: 'dangerously',
        resources: 'usable',
        virtualConsole: silentConsole(),
        beforeParse(window) {
            window.localStorage.setItem('gameState', JSON.stringify(seedState));
            disableImageLoading(window);
        }
    });
    const window = dom.window;
    await waitFor(
        () => typeof window.calculateDamage === 'function',
        20000, 30,
        `game.js не загрузился для ${heroKey} (Node-harness)`
    );

    const scriptEl = window.document.createElement('script');
    scriptEl.textContent = probeScriptSource;
    window.document.body.appendChild(scriptEl);
    await waitFor(() => window.__probeReady === true, 5000, 20, `probe не стал готов для ${heroKey}`);

    const activeKey = window.__probe.getActiveHeroKey();
    if (activeKey !== heroKey) {
        throw new Error(`Ожидали активного героя ${heroKey}, получили ${activeKey} (Node-harness)`);
    }
    return { dom, probe: window.__probe };
}

// Грузит весь admin-balance-panel.html в jsdom (авто-запуск runAll() отключён на лету,
// файл на диске не трогаем) и выносит нужные внутренности на window.__expose — дальше
// вызывающий код патчит только ProgressionEngine.init/discoverHeroes и
// CombatEngine.loadHero (см. attachNodeEngines), всё остальное — дословно тот же код
// панели.
async function loadPanelWindow(port, attemptsPerStrategyOverride) {
    const html = readPanelSourceWithoutAutoRun(attemptsPerStrategyOverride);
    const url = `http://127.0.0.1:${port}/admin-balance-panel.html`;
    const dom = new JSDOM(html, {
        url,
        runScripts: 'dangerously',
        resources: 'usable',
        virtualConsole: silentConsole(),
        beforeParse(window) {
            installRelativeFetch(window);
        }
    });
    const window = dom.window;
    await new Promise((resolve) => setTimeout(resolve, 20));

    const exposeScript = window.document.createElement('script');
    exposeScript.textContent = `window.__expose = {
        get lastRunSnapshot() { return typeof lastRunSnapshot !== 'undefined' ? lastRunSnapshot : null; },
        ${EXPOSE_NAMES.join(', ')}
    };`;
    window.document.body.appendChild(exposeScript);

    if (!window.__expose || typeof window.__expose.CombatEngine !== 'object') {
        throw new Error('Не удалось извлечь внутренности admin-balance-panel.html (window.__expose пуст) — структура панели изменилась.');
    }
    return { dom, expose: window.__expose };
}

// Подменяет ProgressionEngine.init/discoverHeroes и CombatEngine.loadHero на
// jsdom-версии, ограничивая discoverHeroes только heroKeys этого воркера (для
// разбиения героев между потоками — см. worker.js). Все остальные методы этих
// объектов (buildHeroAtLevel, simulateDummyFight, simulateManyDummyFights, RealUpgradeEngine,
// SurvivalEngine, ExcelExport...) остаются буквально теми же функциями, что в панели.
function attachNodeEngines(expose, port, heroKeys) {
    const allowedHeroKeys = heroKeys ? new Set(heroKeys) : null;
    const probeCache = new Map();
    const openDoms = [];
    // probe → dom для окон, открытых loadHeroAtLevel (по одному на каждую строку
    // диапазона "с апгрейдами", см. её комментарий в admin-balance-panel.html) — в
    // отличие от probeCache (один кэш на героя на весь прогон), эти окна нужно закрывать
    // СРАЗУ после releaseHeroAtLevel, а не копить до общего closeAll() в конце: при
    // ~150 строках × 6 героях одновременно открытых jsdom-окон иначе накопилось бы под
    // тысячу штук, каждое — распарсенный game.js целиком.
    const rowDoms = new Map();

    expose.ProgressionEngine.init = async function () {
        const { dom, api } = await loadProgressionApi(port);
        openDoms.push(dom);
        this.api = api;
        this.campaignToHeroLevel = this.buildCampaignToHeroLevelMap(expose.CAMPAIGN_FINAL_LEVEL);
    };

    expose.ProgressionEngine.discoverHeroes = function () {
        const state = this.api.getDefaultGameState();
        const keys = state.mHero.filter((key) => this.api.isHeroEligibleForDifficulty(state[key]));
        const filtered = allowedHeroKeys ? keys.filter((key) => allowedHeroKeys.has(key)) : keys;
        return filtered.map((key) => ({ key, dispName: state[key].dispName || key }));
    };

    expose.CombatEngine.loadHero = async function (heroKey) {
        if (probeCache.has(heroKey)) return probeCache.get(heroKey);
        const defaults = expose.ProgressionEngine.api.getDefaultGameState();
        const { dom, probe } = await loadHeroCombatProbe(port, heroKey, defaults, expose.PROBE_SCRIPT_SOURCE);
        openDoms.push(dom);
        probeCache.set(heroKey, probe);
        return probe;
    };

    // Не кэшируется (в отличие от loadHero выше) — КАЖДЫЙ вызов открывает СВЕЖЕЕ окно,
    // засеянное permanentHero конкретной строки, иначе startGlobalX так и останутся
    // статами 1 уровня из общего кэша. Вызывающий код (runAll в admin-balance-panel.html)
    // обязан вызвать releaseHeroAtLevel после того, как закончил с этой строкой.
    expose.CombatEngine.loadHeroAtLevel = async function (heroKey, permanentHero) {
        const defaults = expose.ProgressionEngine.api.getDefaultGameState();
        const { dom, probe } = await loadHeroCombatProbe(port, heroKey, defaults, expose.PROBE_SCRIPT_SOURCE, permanentHero);
        rowDoms.set(probe, dom);
        return probe;
    };

    expose.CombatEngine.releaseHeroAtLevel = function (probe) {
        const dom = rowDoms.get(probe);
        if (!dom) return;
        rowDoms.delete(probe);
        try { dom.window.close(); } catch (e) { /* окно уже освобождено — не критично */ }
    };

    return {
        closeAll() {
            for (const dom of openDoms) {
                try { dom.window.close(); } catch (e) { /* окно уже освобождено — не критично */ }
            }
            openDoms.length = 0;
            // Подстраховка: если прогон прервался (stopRequested/ошибка) до
            // releaseHeroAtLevel для текущей строки — закрыть и то, что осталось.
            for (const dom of rowDoms.values()) {
                try { dom.window.close(); } catch (e) { /* окно уже освобождено — не критично */ }
            }
            rowDoms.clear();
        }
    };
}

module.exports = {
    ROOT,
    PANEL_PATH,
    loadPanelWindow,
    attachNodeEngines
};
