/* eslint-disable no-console */
// Минимальный статический сервер для admin-balance-panel.html — без зависимостей.
// Нужен потому, что file:// не годится: браузер считает каждый локальный файл
// отдельным изолированным источником и блокирует доступ панели к содержимому
// её служебных iframe (admin-progression-harness.html, level.html).
//
// Запуск из корня проекта: node scripts/serve-admin-panel.js
// Затем открыть: http://localhost:8843/admin-balance-panel.html

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { exec } = require('node:child_process');

const START_PORT = Number(process.env.PORT) || 8843;
const MAX_PORT_ATTEMPTS = 10;
const ROOT = path.resolve(__dirname, '..');

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.ico': 'image/x-icon'
};

function requestHandler(req, res) {
    const urlPath = decodeURIComponent(req.url.split('?')[0]);
    const safePath = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, '');
    let filePath = path.join(ROOT, safePath === '/' ? '/index.html' : safePath);

    if (!filePath.startsWith(ROOT)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(`Не найдено: ${safePath}`);
            return;
        }
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
        res.end(content);
    });
}

function openBrowser(url) {
    const command = process.platform === 'win32'
        ? `start "" "${url}"`
        : process.platform === 'darwin'
            ? `open "${url}"`
            : `xdg-open "${url}"`;
    exec(command, (error) => {
        if (error) console.log(`Не удалось открыть браузер автоматически — откройте вручную: ${url}`);
    });
}

// Порт может быть занят зависшим процессом от прошлого запуска — пробуем следующие
// по порядку, а не падаем с ошибкой биндинга. Каждая попытка получает СВОЙ http.Server:
// повторный .listen() на одном и том же объекте после неудачи оставляет висящий
// слушатель 'listening' от неудачной попытки, и он потом стреляет ВМЕСТЕ с настоящим
// при удачном биндинге на другом порту — отсюда задвоенный "Сервер запущен".
function startServer(port, attemptsLeft) {
    const server = http.createServer(requestHandler);

    server.once('error', (error) => {
        // На Windows занятый порт может отдать и EADDRINUSE, и EACCES в зависимости
        // от того, как именно его держит другой процесс — ретраим на любую ошибку
        // биндинга, пока не кончится бюджет попыток, а не только на один код.
        if (attemptsLeft > 0) {
            console.log(`Порт ${port} недоступен (${error.code}), пробую ${port + 1}...`);
            startServer(port + 1, attemptsLeft - 1);
            return;
        }
        console.error(`Не удалось запустить сервер: ${error.message}`);
        process.exitCode = 1;
    });

    // Явно только IPv4-loopback (127.0.0.1), а не общий "слушать всё" адрес —
    // с ним на Windows иногда прилетает и 'listening', и 'error' на один и тот же
    // .listen() (частичный успех по IPv4/IPv6-парам).
    server.listen(port, '127.0.0.1', () => {
        const url = `http://localhost:${port}/admin-balance-panel.html`;
        console.log(`Сервер запущен: ${url}`);
        console.log('Остановить — закрыть это окно или Ctrl+C.');
        openBrowser(url);
    });
}

startServer(START_PORT, MAX_PORT_ATTEMPTS);
