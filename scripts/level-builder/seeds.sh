#!/bin/bash
# seeds.sh N role seed... — для каждого seed: перезапуск роли с новым режимом (после varreset), печать профиля/типичных/числа повторов роли; планы сохраняются в /tmp/planN_<role>_<seed>.txt
cd "F:/3 Курсы/0 Веб Разработчик/12 Проекты для портфолио/3 Игра без названия/игра №2" || exit 1
N=$1; R=$2; shift 2
cp /tmp/plan_some_$N.txt /tmp/plan${N}_pre_$R.txt; cp /tmp/L${N}spec.json /tmp/L${N}spec_pre_$R.json
for s in "$@"; do
 cp /tmp/plan${N}_pre_$R.txt /tmp/plan_some_$N.txt; cp /tmp/L${N}spec_pre_$R.json /tmp/L${N}spec.json
 bash scripts/level-builder/fix2.sh $N "R $R 3 $s 1" > /dev/null 2>&1
 cp /tmp/plan_some_$N.txt /tmp/plan${N}_${R}_$s.txt; cp /tmp/L${N}spec.json /tmp/L${N}spec_${R}_$s.json
 echo "== seed $s: mid $(grep -E "$R: самая" /tmp/run$N.txt | sed -E 's/.*дольше: ([0-9]+)% \/ ([0-9]+)% .*/\2/')% typ $(grep -E "$R: ф1: типичная" /tmp/run$N.txt | sed -E 's/ \/ p75 [0-9]+ \/ мин [0-9]+ мс//g;s/типичная медиана //g') dups $(grep -E "^   ! $R: [0-9]+ из" /tmp/run$N.txt | sed -E 's/.*: ([0-9]+) из.*/\1/') НЕТ $(grep -c "^$R:.* НЕТ" /tmp/plan_some_$N.txt)"
done
