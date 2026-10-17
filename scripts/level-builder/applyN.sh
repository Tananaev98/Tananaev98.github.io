#!/bin/bash
# applyN.sh N base.js plan.txt — design из базы + план подбора → run.js → краткий итог (разделы 4-7)
cd "$(dirname "$0")/../.." || exit 1
N=$1; cp $2 scripts/level-builder/design$N.js; node scripts/level-builder/applyfit.js $N $3 | tail -1; node scripts/level-builder/run.js $N > /tmp/run$N.txt 2>&1; sed -n '/^4) Повторы/,$p' /tmp/run$N.txt | grep -vE "^  enem[1-5]: (длина|ф1: мин)" | cut -c1-200; grep ОШИБКА -A2 /tmp/run$N.txt | head
