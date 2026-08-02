const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const limitBytes = 100 * 1024 * 1024;
const runtimeExtensions = new Set([
    '.html', '.css', '.js', '.webp', '.png', '.jpg', '.jpeg', '.gif', '.svg',
    '.mp3', '.wav', '.ogg', '.m4a', '.woff', '.woff2', '.ttf', '.otf', '.ico',
    '.txt', '.md'
]);
const ignoredDirectories = new Set(['.git', 'node_modules']);

function collectRuntimeFiles(directory, files = []) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;

        const absolutePath = path.join(directory, entry.name);
        if (entry.isDirectory()) {
            collectRuntimeFiles(absolutePath, files);
        } else if (runtimeExtensions.has(path.extname(entry.name).toLowerCase())) {
            files.push({
                path: path.relative(projectRoot, absolutePath),
                size: fs.statSync(absolutePath).size
            });
        }
    }
    return files;
}

function formatMiB(bytes) {
    return `${(bytes / 1024 / 1024).toFixed(2)} МБ`;
}

const files = collectRuntimeFiles(projectRoot);
const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
const remainingBytes = limitBytes - totalBytes;

console.log(`Игровая сборка: ${formatMiB(totalBytes)} из ${formatMiB(limitBytes)}`);
console.log(
    remainingBytes >= 0
        ? `Свободный бюджет: ${formatMiB(remainingBytes)}`
        : `Превышение лимита: ${formatMiB(Math.abs(remainingBytes))}`
);

if (totalBytes > limitBytes) {
    console.log('\nСамые тяжёлые файлы:');
    files
        .sort((left, right) => right.size - left.size)
        .slice(0, 10)
        .forEach(file => console.log(`- ${formatMiB(file.size)}  ${file.path}`));
    process.exitCode = 1;
}
