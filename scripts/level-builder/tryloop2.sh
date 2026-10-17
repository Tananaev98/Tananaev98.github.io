#!/bin/bash
# tryloop2.sh N base_design.js base_plan.txt regRoles "roles:asym ..." spec.json role field variants.txt fixroles — перебор значений поля spec (JSON-массив на строку) роли (например Kspeeds/speeds),
# для каждого: mklvl → подбор ролей → applyN → fixdup по fixroles → run; печатает нарушения (по разделам). Планы: /tmp/tryloop2_N_i.plan.txt, дизайн после правок: /tmp/tryloop2_N_i.design.js
cd "$(dirname "$0")/../.." || exit 1
N=$1; BASE=$2; PLAN=$3; REG=$4; ROLES=$5; SPEC=$6; ROLE=$7; FIELD=$8; VARS=$9; FIX=${10}; i=0
while IFS= read -r V; do i=$((i+1))
  node -e "const fs=require('fs');const s=JSON.parse(fs.readFileSync('$SPEC','utf8'));s.bosses['$ROLE']['$FIELD']=$V;fs.writeFileSync('$SPEC.loop',JSON.stringify(s));"
  rm -rf /tmp/L${N}loop; node scripts/level-builder/mklvl.js $SPEC.loop /tmp/L${N}loop > /dev/null
  cp $PLAN /tmp/plan_some_${N}_base.txt; rm -f /tmp/ptail$N.done
  node scripts/level-builder/regfromplan.js $PLAN /tmp/sidereg$N.txt $REG > /dev/null
  bash scripts/level-builder/runtail.sh $N /tmp/L${N}loop "$ROLES" > /dev/null 2>&1
  cp /tmp/plan_some_$N.txt /tmp/tryloop2_${N}_$i.plan.txt
  bash scripts/level-builder/applyN.sh $N $BASE /tmp/plan_some_$N.txt > /dev/null 2>&1
  for r in $FIX; do node scripts/level-builder/fixdup.js $N $r > /dev/null 2>&1; done
  node scripts/level-builder/run.js $N > /tmp/run$N.txt 2>&1; cp scripts/level-builder/design$N.js /tmp/tryloop2_${N}_$i.design.js
  tot=$(grep -E "ИТОГ" /tmp/run$N.txt | head -1); viol=$(sed -n '/^1) /,$p' /tmp/run$N.txt | grep -E "^   !" | cut -c1-110 | tr '\n' ';')
  echo "вариант $i $ROLE.$FIELD=$V : $tot :: $viol" | tee -a /tmp/tryloop2_$N.log
done < $VARS
echo finished >> /tmp/tryloop2_$N.log
