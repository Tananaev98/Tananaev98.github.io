#!/bin/bash
# try.sh N role "mult speeds"... — для каждого варианта: S + R + печать профиля роли и типичных медиан
cd "F:/3 Курсы/0 Веб Разработчик/12 Проекты для портфолио/3 Игра без названия/игра №2" || exit 1
N=$1; R=$2; shift 2
for v in "$@"; do set -- $v
 bash scripts/level-builder/fix2.sh $N "S $R $1 $2" "R $R 3 0 1" > /dev/null 2>&1
 echo "== $R мульт $1 скор $2: $(grep -E "$R: самая" /tmp/run$N.txt | sed -E 's/.*дольше: ([0-9]+)% \/ ([0-9]+)% \/ ([0-9]+)%.*/\2/')% mid; $(grep -E "$R: ф1: типичная" /tmp/run$N.txt | sed -E 's/ \/ p75 [0-9]+ \/ мин [0-9]+ мс//g;s/типичная медиана //g')"
 grep -c "^$R:.* НЕТ" /tmp/plan_some_$N.txt
done
