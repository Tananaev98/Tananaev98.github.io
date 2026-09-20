// детерминированный генератор случайных чисел (mulberry32) — воспроизводимая генерация
function rng(seed) {
    let a = seed >>> 0;
    const next = () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    return {
        next,
        int: (lo, hi) => lo + Math.floor(next() * (hi - lo + 1)),
        range: (lo, hi) => lo + next() * (hi - lo),
        pick: (arr) => arr[Math.floor(next() * arr.length)],
        chance: (p) => next() < p,
        shuffle: (arr) => { const b = arr.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(next() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
    };
}
module.exports = { rng };
