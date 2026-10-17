#!/bin/bash
# fix2.sh N step... ; step: "P enemK target" | "S enemK mult s1,s2,s3,s4" | "R enemK asym seed scale" | "RR enemK asym seed0 scale" (повтор со сменой seed, пока есть НЕТ)
cd "F:/3 Курсы/0 Веб Разработчик/12 Проекты для портфолио/3 Игра без названия/игра №2" || exit 1
N=$1; shift
one() { R=$1; A=$2; S=$3; SC=$4
 others=$(echo enem1 enem2 enem3 enem4 enem5 | tr ' ' '\n' | grep -v $R | paste -sd,)
 cp /tmp/plan_some_$N.txt /tmp/plan_some_${N}_base.txt; cp /tmp/design${N}_base.js scripts/level-builder/design$N.js
 node scripts/level-builder/regfromplan.js /tmp/plan_some_$N.txt /tmp/sidereg$N.txt $others > /dev/null
 node scripts/level-builder/respec.js $N $R $S $SC
 bash scripts/level-builder/runtail2.sh $N /tmp/L${N}a "${R#enem}:$A"
 grep -c "^$R:.* НЕТ" /tmp/plan_some_$N.txt; }
for st in "$@"; do set -- $st
 case $1 in
 P) node scripts/level-builder/reprofile.js $N $2 $3;;
 S) node scripts/level-builder/setprof.js $N $2 $3 $4;;
 R) one $2 $3 $4 $5 > /dev/null; bash scripts/level-builder/applyN.sh $N /tmp/design${N}_base.js /tmp/plan_some_$N.txt | grep -v "самая" | tail -2;;
 RR) s=$4; for t in 1 2 3 4; do c=$(one $2 $3 $s $5 | tail -1); echo "попытка $t seed $s НЕТ=$c"; [ "$c" = "0" ] && break; s=$((s+7)); done; bash scripts/level-builder/applyN.sh $N /tmp/design${N}_base.js /tmp/plan_some_$N.txt | grep -v "самая" | tail -2;;
 esac
done
