@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
    if exist "C:\Program Files\nodejs\node.exe" (
        set "NODE_CMD=C:\Program Files\nodejs\node.exe"
    ) else (
        echo.
        echo ERROR: Node.js was not found on this computer.
        echo Install it from https://nodejs.org and run this file again.
        echo.
        pause
        exit /b 1
    )
) else (
    set "NODE_CMD=node"
)

if not exist "node_modules\jsdom" (
    echo Installing dependencies ^(first run only, this can take a minute^)...
    set "NPM_CMD="
    if exist "C:\Program Files\nodejs\npm.cmd" set "NPM_CMD=C:\Program Files\nodejs\npm.cmd"
    if not defined NPM_CMD for /f "delims=" %%P in ('where npm.cmd 2^>nul') do if not defined NPM_CMD set "NPM_CMD=%%P"
    if not defined NPM_CMD (
        echo.
        echo ERROR: npm was not found on this computer ^(it normally installs alongside Node.js^).
        echo Reinstall Node.js from https://nodejs.org and run this file again.
        echo.
        pause
        exit /b 1
    )
    call "!NPM_CMD!" install
    if errorlevel 1 (
        echo.
        echo ERROR: npm install failed - see the messages above.
        echo.
        pause
        exit /b 1
    )
)

echo.
echo Running the fast balance simulation (Node, runs the real game code on all
echo CPU cores in parallel - no browser needed). This takes a few minutes.
echo.
"%NODE_CMD%" "scripts\balance-sim\run.js"

echo.
echo Done - see the report path printed above (it is also saved in DataExport\).
echo.
pause
