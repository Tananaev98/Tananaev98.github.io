@echo off
cd /d "%~dp0"
git add .
git commit -m "quick update"
git push game2 master
echo Done!
pause