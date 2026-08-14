@echo off
setlocal
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

echo Starting the hero balance panel server...
start "Balance Panel Server" "%NODE_CMD%" "scripts\serve-admin-panel.js"

echo.
echo Done. A separate server window just opened - keep it open while using the panel.
echo The browser should open on its own in a couple of seconds.
echo.
pause
