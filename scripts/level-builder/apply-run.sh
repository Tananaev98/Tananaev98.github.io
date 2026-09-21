#!/bin/bash
# apply-run.sh N fitfile... — применить строки подбора к designN.js, расставить sig, прогнать конвейер, вывести нарушения.
cd "$(dirname "$0")/../.." || exit 1
N=$1; shift; cat "$@" | grep '^enem' | grep -v НЕТ | awk '{a[$1]=$0} END{for(k in a)print a[k]}' > /tmp/fa$N.txt
node scripts/level-builder/applyfit.js $N /tmp/fa$N.txt | tail -1
sed -i -E 's/, ?shotDelayMs: ?[0-9]+//g' scripts/level-builder/design$N.js
node scripts/level-builder/addsig.js $N > /dev/null
node scripts/level-builder/run.js $N > /tmp/r$N.txt 2>&1
grep -E "ИТОГ" /tmp/r$N.txt; awk '/^2\)/,0' /tmp/r$N.txt | cut -c1-230 | grep "!"
grep -A8 "ОШИБКА ПОСТРОЕНИЯ" /tmp/r$N.txt | head -10 | cut -c1-230
