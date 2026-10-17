#!/bin/bash
# runall.sh N [gen] — полный прогон обычного уровня: (gen) генерация каркаса и спецификации → подбор времён всех 5 ролей → сборка/проверка → сводка нарушений. Результаты: /tmp/plan_some_N.txt, /tmp/runN.txt
cd "$(dirname "$0")/../.." || exit 1
N=$1
if [ "$2" = "gen" ]; then node scripts/level-builder/genlevel.js $N || exit 1; cp scripts/level-builder/design$N.js /tmp/design${N}_base.js; fi
rm -rf /tmp/L${N}a; node scripts/level-builder/mklvl.js /tmp/L${N}spec.json /tmp/L${N}a > /dev/null
: > /tmp/plan_some_${N}_base.txt; : > /tmp/sidereg$N.txt; rm -f /tmp/ptail$N.done
FITMONO=${FITMONO:-2} bash scripts/level-builder/runtail.sh $N /tmp/L${N}a "${ROLES:-1:3 2:3 3:3 4:3 5:3}" > /tmp/rt$N.log 2>&1
cp /tmp/plan_some_$N.txt /tmp/plan_some_${N}_p0.txt
grep НЕТ /tmp/plan_some_$N.txt
bash scripts/level-builder/applyN.sh $N /tmp/design${N}_base.js /tmp/plan_some_$N.txt | grep -v "самая"
echo "== конец прогона $N"
