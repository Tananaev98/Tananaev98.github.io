#!/bin/bash
# job.sh NAME cmd... — выполнить fix2 и по окончании записать /tmp/done_NAME
bash scripts/level-builder/fix2.sh "$@" > /tmp/job_${1}.log 2>&1; echo done > /tmp/done_$1
