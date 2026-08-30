// Минимальный статический сервер для Node-версии баланс-симуляции (scripts/balance-sim) —
// та же причина, что и у serve-admin-panel.js: jsdom (как и настоящий браузер) не умеет
// грузить относительные ресурсы (game.js, lvlData/*, картинки) с file://, нужен http://.
// Отдельная копия вместо переиспользования serve-admin-panel.js — тот файл сразу же
// открывает браузер при запуске (open Browser side-effect), нам нужен только сам сервер.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

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

function startStaticServer(root) {
    const server = http.createServer((req, res) => {
        const urlPath = decodeURIComponent(req.url.split('?')[0]);
        const safePath = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, '');
        const filePath = path.join(root, safePath === '/' ? '/index.html' : safePath);
        if (!filePath.startsWith(root)) { res.writeHead(403); res.end('Forbidden'); return; }
        fs.readFile(filePath, (error, content) => {
            if (error) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end(`Не найдено: ${safePath}`); return; }
            const ext = path.extname(filePath).toLowerCase();
            res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
            res.end(content);
        });
    });
    return new Promise((resolve, reject) => {
        server.once('error', reject);
        server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }));
    });
}

module.exports = { startStaticServer };
