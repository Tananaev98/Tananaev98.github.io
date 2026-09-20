// Журнал боя: текстовое описание всего сражения последнего уровня, записывается в папку проекта (DataExport).
// Запись — File System Access API (Chrome/Edge на компьютере): папку выбирают ОДИН раз кнопкой «Лог боя» (дескриптор хранится в
// IndexedDB); после перезапуска браузера первый клик по странице просит подтвердить доступ. Ничего не влияет на игровую логику:
// модуль только читает события, которые ему передаёт game.js. Без выбранной папки лог остаётся в памяти (window.BattleLog.text()).
(function () {
    'use strict';
    const SUPPORTED = typeof window.showDirectoryPicker === 'function';
    const DB_NAME = 'battle-log-db', STORE = 'kv', KEY = 'dir';
    const FLUSH_EVERY_MS = 15000;

    let dirHandle = null, dirName = '';
    let lines = [], active = false, fileName = '', lastFlushAt = 0, flushing = false, dirty = false;
    let clock = () => 0, stampBase = 0;
    let frameStats = { frames: 0, sumMs: 0, maxMs: 0, slow: 0 };
    let lastAim = null, lastAimLogAt = -1e9, lastDeflect = null;
    let btn = null;

    // ---------- IndexedDB для дескриптора папки
    function idb() {
        return new Promise((res, rej) => {
            const r = indexedDB.open(DB_NAME, 1);
            r.onupgradeneeded = () => r.result.createObjectStore(STORE);
            r.onsuccess = () => res(r.result);
            r.onerror = () => rej(r.error);
        });
    }
    async function idbGet(k) { const db = await idb(); return new Promise((res, rej) => { const q = db.transaction(STORE).objectStore(STORE).get(k); q.onsuccess = () => res(q.result); q.onerror = () => rej(q.error); }); }
    async function idbSet(k, v) { const db = await idb(); return new Promise((res, rej) => { const q = db.transaction(STORE, 'readwrite').objectStore(STORE).put(v, k); q.onsuccess = () => res(); q.onerror = () => rej(q.error); }); }

    // ---------- папка
    async function permission(request) {
        if (!dirHandle) return 'none';
        try {
            let p = await dirHandle.queryPermission({ mode: 'readwrite' });
            if (p !== 'granted' && request) p = await dirHandle.requestPermission({ mode: 'readwrite' });
            return p;
        } catch (e) { return 'error'; }
    }
    function paintButton(state) {
        if (!btn) return;
        const map = {
            none: ['Лог боя: выбрать папку', '#8a5a00'],
            prompt: ['Лог боя: нажмите — подтвердить доступ', '#8a5a00'],
            granted: ['Лог боя → ' + dirName, '#1f6f2e'],
            error: ['Лог боя: ошибка доступа', '#8a1f1f']
        };
        const m = map[state] || map.none;
        btn.textContent = m[0];
        btn.style.background = m[1];
    }
    async function refreshState() { paintButton(dirHandle ? (await permission(false)) : 'none'); }
    async function chooseDir() {
        try {
            const h = await window.showDirectoryPicker({ mode: 'readwrite', id: 'battle-log' });
            dirHandle = h; dirName = h.name; await idbSet(KEY, h);
            await permission(true); await refreshState();
            if (lines.length) flush(true);
        } catch (e) { /* пользователь закрыл выбор */ }
    }
    async function restoreDir() {
        try { const h = await idbGet(KEY); if (h) { dirHandle = h; dirName = h.name; } } catch (e) { /* нет */ }
        await refreshState();
    }
    function mountButton() {
        if (!SUPPORTED || btn || !document.body) return;
        btn = document.createElement('button');
        btn.type = 'button';
        btn.style.cssText = 'position:fixed;left:6px;bottom:6px;z-index:99999;font:11px/1.2 Arial,sans-serif;color:#fff;border:0;border-radius:4px;padding:4px 7px;opacity:.55;cursor:pointer;';
        btn.addEventListener('mouseenter', () => { btn.style.opacity = '1'; });
        btn.addEventListener('mouseleave', () => { btn.style.opacity = '.55'; });
        btn.addEventListener('click', (e) => { e.stopPropagation(); chooseDir(); });
        btn.addEventListener('pointerdown', (e) => e.stopPropagation());
        document.body.appendChild(btn);
        paintButton('none');
        restoreDir();
    }
    // после перезапуска браузера доступ подтверждается первым же жестом пользователя
    function armPermissionOnGesture() {
        const h = async () => {
            if (!dirHandle) return;
            const p = await permission(true);
            await refreshState();
            if (p === 'granted') { document.removeEventListener('pointerdown', h, true); }
        };
        document.addEventListener('pointerdown', h, true);
    }

    // ---------- запись
    async function flush(force) {
        if (!SUPPORTED || !dirHandle || !fileName || flushing || (!dirty && !force)) return;
        if ((await permission(false)) !== 'granted') return;
        flushing = true;
        try {
            const fh = await dirHandle.getFileHandle(fileName, { create: true });
            const w = await fh.createWritable();
            await w.write(text());
            await w.close();
            dirty = false; lastFlushAt = performance.now();
        } catch (e) { console.warn('BattleLog: запись не удалась', e); }
        flushing = false;
    }
    function text() { return lines.join('\n') + '\n'; }

    // ---------- события
    const pad = (n, l) => String(n).padStart(l, ' ');
    function t() { return ((clock() - stampBase) / 1000).toFixed(3).padStart(8, ' '); }
    function log(kind, msg) {
        if (!active) return;
        lines.push(`[${t()}] ${kind.padEnd(9, ' ')} ${msg}`);
        dirty = true;
        if (performance.now() - lastFlushAt > FLUSH_EVERY_MS) flush(false);
    }
    function raw(msg) { lines.push(msg); dirty = true; }

    function begin(info, clockFn) {
        clock = clockFn || (() => performance.now()); stampBase = clock();
        active = true; lines = []; lastAim = null; lastDeflect = null; lastAimLogAt = -1e9;
        frameStats = { frames: 0, sumMs: 0, maxMs: 0, slow: 0 };
        const d = new Date();
        const p2 = (n) => String(n).padStart(2, '0');
        fileName = `battle-log_ур${info.level}_${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())}_${p2(d.getHours())}-${p2(d.getMinutes())}-${p2(d.getSeconds())}.txt`;
        raw('ЖУРНАЛ БОЯ');
        raw('='.repeat(60));
        Object.entries(info.header || {}).forEach(([k, v]) => raw(`${k}: ${v}`));
        raw(`Экран: окно ${innerWidth}x${innerHeight}, поле ${info.field}, devicePixelRatio ${window.devicePixelRatio}, сенсорный ввод: ${('ontouchstart' in window) || navigator.maxTouchPoints > 0 ? 'да' : 'нет'}`);
        raw(`Браузер: ${navigator.userAgent}`);
        raw('Время в квадратных скобках — секунды ИГРОВОГО времени от начала боя. x/y — проценты поля (x от ширины, y от высоты).');
        raw('Прилёт атаки = момент достижения линии героя (y=78%). «запас» = сколько мс оставалось до прилёта в момент отбития.');
        raw('='.repeat(60));
    }
    function frame(dtMs, aim) {
        if (!active) return;
        frameStats.frames++; frameStats.sumMs += dtMs; frameStats.maxMs = Math.max(frameStats.maxMs, dtMs); if (dtMs > 40) frameStats.slow++;
        const now = clock();
        if (aim && now - lastAimLogAt >= 200) {
            lastAimLogAt = now;
            if (!lastAim || Math.abs(aim.x - lastAim.x) >= 2 || Math.abs(aim.y - lastAim.y) >= 2) {
                log('прицел', `x=${aim.x.toFixed(0)}% y=${aim.y.toFixed(0)}%`);
                lastAim = { x: aim.x, y: aim.y };
            }
        }
    }
    function spawn(e) { // e: {id,type,x,y,speed,damage,hp,flightMs,combo,shot}
        log('появилась', `#${e.id} ${e.type} x=${e.x.toFixed(0)}% y=${e.y.toFixed(0)}% скорость=${e.speed.toFixed(1)} %/с, урон=${e.damage}, ударов до смерти=${e.hp}; стиль ${e.style}, ожидаемый полёт до героя ≈${Math.round(e.flightMs)} мс (по функции стиля из game.js)${e.combo ? `; комбо ${e.combo}, шаг ${e.shot}` : ''}`);
    }
    function deflect(e) { // e: {id,type,ageMs,remainMs,aimX,enemyX}
        let travel = '';
        if (lastDeflect) {
            const dx = Math.abs(e.aimX - lastDeflect.x), dtm = (clock() - lastDeflect.t);
            travel = `; прицел с предыдущей отбитой: Δx=${dx.toFixed(0)}% за ${Math.round(dtm)} мс${dtm > 0 ? ` (${(dx / dtm * 1000).toFixed(0)} %/с)` : ''}`;
        }
        lastDeflect = { x: e.aimX, t: clock() };
        log('ОТБИТА', `#${e.id} ${e.type} x=${e.enemyX.toFixed(0)}% — жила ${Math.round(e.ageMs)} мс, до героя оставалось ≈${Math.round(e.remainMs)} мс (запас), прицел x=${e.aimX.toFixed(0)}%${travel}`);
    }
    function end(result) {
        if (!active) return;
        log('КОНЕЦ', result);
        raw('-'.repeat(60));
        const fps = frameStats.frames ? (1000 / (frameStats.sumMs / frameStats.frames)).toFixed(1) : '—';
        raw(`Кадры: ${frameStats.frames}, средний fps ${fps}, самый длинный кадр ${Math.round(frameStats.maxMs)} мс, кадров дольше 40 мс: ${frameStats.slow}`);
        active = false; dirty = true;
        flush(true);
    }

    window.BattleLog = { begin, log, raw, spawn, deflect, frame, end, text, flush: () => flush(true), isActive: () => active, supported: SUPPORTED };

    function boot() { mountButton(); armPermissionOnGesture(); }
    if (document.body) boot(); else document.addEventListener('DOMContentLoaded', boot, { once: true });
})();
