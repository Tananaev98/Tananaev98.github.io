#!/bin/bash
# finish.sh N — снимок «до» (git HEAD) в baseline, прогон конвейера, relabel, сводка: check + давление + запас + средний урон.
cd "$(dirname "$0")/../.." || exit 1
N=$1
[ -f scripts/baseline/gameData$N.js ] || git show HEAD:lvlData/gameData$N.js > scripts/baseline/gameData$N.js
node scripts/level-builder/run.js $N > /tmp/r$N.txt 2>&1
node scripts/level-builder/relabel.js $N > /dev/null
node scripts/combat-data-inventory.js --check=$N 2>&1 | grep -E "^[1-7]\)|ИТОГ|!" | cut -c1-120
node scripts/combat-data-inventory.js --pressure=$N 2>&1 | sed -E 's/ \| медленных без прикрытия.*//' | cut -c1-230
node scripts/combat-data-inventory.js --slack=$N 2>&1 | sed -n 2,7p | cut -c1-200
node scripts/level-builder/dmgcheck.js $N
node scripts/combo-audit.js $N | head -1
