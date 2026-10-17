#!/bin/bash
# plan.sh N план1.txt план2.txt … — для каждого файла плана («id|форма|T» по строке; имя файла eK.txt = enemK) параллельно запускает author.js (FITTYP=1)
# и складывает объединённый вывод в /tmp/plan_out.txt (его принимает applyfit.js). Окружение: FITK, FITOPTS.
cd "$(dirname "$0")/../.." || exit 1
N=$1; shift
OUT=${PLAN_OUT:-/tmp/plan_out.txt}; : > "$OUT"
for f in "$@"; do b=$(basename "$f" .txt); K=${b: -1}; node scripts/level-builder/mk.js enem$K "$f" "$f.json"; done
printf '%s\n' "$@" | xargs -P 8 -I{} sh -c "FITTYP=1 node scripts/level-builder/author.js $N {}.json > {}.res 2>&1"
for f in "$@"; do cat "$f.res" >> "$OUT"; done
cat "$OUT" | cut -c1-230
