#!/bin/bash
# dup.sh N role... — fixdup по ролям (последовательно) по текущему designN.js, затем tune в прямом режиме
cd "F:/3 Курсы/0 Веб Разработчик/12 Проекты для портфолио/3 Игра без названия/игра №2" || exit 1
N=$1; shift
for r in "$@"; do node scripts/level-builder/fixdup.js $N $r | tail -2; done
node scripts/level-builder/run.js $N > /tmp/run$N.txt 2>&1
TUNEDIRECT=1 node scripts/level-builder/tune.js $N 0.01 ${TUNEMAX:-0.06}
