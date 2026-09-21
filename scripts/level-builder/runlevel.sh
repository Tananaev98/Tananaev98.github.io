#!/bin/bash
# runlevel.sh N spec.json [T] — подбор времён по авторским формам (8 потоков), применение к designN.js и прогон конвейера; печатает только итог и нарушения.
cd "$(dirname "$0")/../.." || exit 1
N=$1; SPEC=$2; T=${3:-200}
D=$(mktemp -d); mkdir -p $D/s $D/o
node scripts/level-builder/mkfits.js $SPEC $D/s $T
ls $D/s | xargs -P 8 -I{} sh -c "timeout 1500 node scripts/level-builder/author.js $N $D/s/{} > $D/o/{}.txt 2>&1"
cat $D/o/*.txt | grep '^enem' | grep -v НЕТ | awk '{a[$1]=$0} END{for(k in a)print a[k]}' > $D/f.txt
echo "подобрано: $(wc -l < $D/f.txt) из $(ls $D/s | wc -l)"; cat $D/o/*.txt | grep НЕТ | cut -c1-60
node scripts/level-builder/applyfit.js $N $D/f.txt | tail -1
sed -i -E 's/, ?shotDelayMs: ?[0-9]+//g' scripts/level-builder/design$N.js
node scripts/level-builder/addsig.js $N > /dev/null
node scripts/level-builder/run.js $N > $D/r.txt 2>&1
cp $D/r.txt /tmp/r$N.txt; cp $D/f.txt /tmp/f$N.txt
grep -E "ИТОГ" $D/r.txt; awk '/^2\)/,0' $D/r.txt | cut -c1-230 | grep -A8 -E "!|ОШИБК"; grep -A8 "ОШИБКА ПОСТРОЕНИЯ" $D/r.txt | head -10 | cut -c1-230
echo "RUNLEVEL_DONE"
