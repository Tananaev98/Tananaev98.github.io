#!/bin/bash
# runtail.sh N dir "role:asym ..." — роли по порядку; реестр сторон берётся из /tmp/sidereg$N.txt; итог = старый план без этих ролей + новые (plan_some_N_base.txt → plan_some_N.txt)
cd "F:/3 Курсы/0 Веб Разработчик/12 Проекты для портфолио/3 Игра без названия/игра №2" || exit 1
N=$1; DIR=$2; SR=/tmp/sidereg$N.txt; BASE=/tmp/plan_some_${N}_base.txt; OUT=/tmp/plan_some_$N.txt; cp $BASE /tmp/plan_tail_tmp.txt
for ra in $3; do i=${ra%%:*}; a=${ra##*:}
  FITMONO=${FITMONO:-2} FITASYM=$a BESTOF=1 FITTYP=1 SIDEREG="$SR" FITOPTS=${FITOPTS:-0,300,600} node scripts/level-builder/author.js $N $DIR/e$i.txt.json > $DIR/e$i.txt.res 2>&1
  grep -v "^enem$i:" /tmp/plan_tail_tmp.txt > /tmp/plan_tail_tmp2.txt; cat $DIR/e$i.txt.res >> /tmp/plan_tail_tmp2.txt; mv /tmp/plan_tail_tmp2.txt /tmp/plan_tail_tmp.txt
done
cp /tmp/plan_tail_tmp.txt $OUT; echo done > /tmp/ptail$N.done
