#!/bin/bash
# tryloop.sh N base_design.js base_plan.txt rolesRegFrom "roles:asym ..." role variants.txt — перебор наборов speedVariance для роли (по строке JSON-массива на строку файла) с подбором хвоста ролей;
# для каждого варианта печатает число нарушений в разделах 6-7 (A9/A10) и 4 (решения); результаты — /tmp/tryloop_N_i.plan.txt
cd "$(dirname "$0")/../.." || exit 1
N=$1; BASE=$2; PLAN=$3; REG=$4; ROLES=$5; ROLE=$6; VARS=$7; i=0
while IFS= read -r V; do i=$((i+1))
  echo "{\"bosses\":{\"$ROLE\":{\"speedVariance\":$V}}}" > /tmp/hdr_loop.json
  cp $BASE scripts/level-builder/design$N.js; node scripts/level-builder/hdr.js $N /tmp/hdr_loop.json > /dev/null; cp scripts/level-builder/design$N.js /tmp/design${N}_loop.js
  cp $PLAN /tmp/plan_some_${N}_base.txt; rm -f /tmp/ptail$N.done
  node scripts/level-builder/regfromplan.js $PLAN /tmp/sidereg$N.txt $REG > /dev/null
  bash scripts/level-builder/runtail.sh $N /tmp/L${N}a "$ROLES" > /dev/null 2>&1
  cp /tmp/plan_some_$N.txt /tmp/tryloop_${N}_$i.plan.txt
  bash scripts/level-builder/applyN.sh $N /tmp/design${N}_loop.js /tmp/plan_some_$N.txt > /tmp/tryloop_${N}_$i.out.txt 2>&1
  cnt=$(sed -n '/^4) /,$p' /tmp/run$N.txt | grep -c "^   !"); a9=$(sed -n '/^6) /,/^7) /p' /tmp/run$N.txt | grep -c "^   !"); a10=$(sed -n '/^7) /,/ИТОГ/p' /tmp/run$N.txt | grep -c "^   !"); a4=$(sed -n '/^4) /,/^5) /p' /tmp/run$N.txt | grep -c "^   !")
  echo "вариант $i $V : A4=$a4 A9=$a9 A10=$a10 (4-7: $cnt)" | tee -a /tmp/tryloop_$N.log
done < $VARS
echo finished >> /tmp/tryloop_$N.log
