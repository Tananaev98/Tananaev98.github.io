#!/bin/bash
# seq.sh N шаги... — последовательно: varreset, шаги fix2, tune
cd "F:/3 Курсы/0 Веб Разработчик/12 Проекты для портфолио/3 Игра без названия/игра №2" || exit 1
N=$1; shift
node scripts/level-builder/varreset.js $N
bash scripts/level-builder/fix2.sh $N "$@"
node scripts/level-builder/tune.js $N 0.01 ${TUNEMAX:-0.06}
