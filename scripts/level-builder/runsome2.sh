#!/bin/bash
# runsome2.sh N dir "role:asym role:asym ..." — подбор ролей по порядку с индивидуальным FITASYM
cd "F:/3 Курсы/0 Веб Разработчик/12 Проекты для портфолио/3 Игра без названия/игра №2" || exit 1
N=$1; DIR=$2; SR=/tmp/sidereg$N.txt; OUT=/tmp/plan_some_$N.txt; : > "$OUT"
for ra in $3; do i=${ra%%:*}; a=${ra##*:}
  FITASYM=$a BESTOF=1 FITTYP=1 SIDEREG="$SR" FITOPTS=${FITOPTS:-0,300,600} node scripts/level-builder/author.js $N $DIR/e$i.txt.json > $DIR/e$i.txt.res 2>&1
  cat $DIR/e$i.txt.res >> "$OUT"
done
echo done > /tmp/psome$N.done
