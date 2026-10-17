#!/bin/bash
# pprobe.sh N enemK файл_форм T [паузы] — probe.js параллельно по строкам файла (по одному процессу на форму); вывод в порядке файла.
cd "$(dirname "$0")/../.." || exit 1
N=$1; R=$2; F=$3; T=${4:-380}; O=${5:-0,150,300,450,600}
TMP=$(mktemp -d); i=0
while IFS= read -r line; do case "$line" in ''|\#*) continue;; esac; i=$((i+1)); printf '%s\n' "$line" > "$TMP/$(printf %03d $i).txt"; done < "$F"
ls "$TMP"/*.txt | xargs -P 8 -I{} sh -c "FITOPTS=$O node scripts/level-builder/probe.js $N $R {} $T > {}.out 2>&1"
cat "$TMP"/*.out | cut -c1-190; rm -rf "$TMP"
