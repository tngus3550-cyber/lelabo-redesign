@echo off
setlocal EnableDelayedExpansion
cd /d "%~dp0"
title ESSENCE LAB launcher

echo ============================================
echo   ESSENCE LAB  -  dev run / open / stop
echo ============================================

echo.
echo [1/3] Starting dev server on http://localhost:3000 ...
start "ELAB_SERVER" /min cmd /c npm run dev

echo      waiting for server to respond...
set /a tries=0
:waitloop
powershell -NoProfile -Command "try{$null=Invoke-WebRequest -UseBasicParsing http://localhost:3000/ -TimeoutSec 2;exit 0}catch{exit 1}"
if not errorlevel 1 goto ready
set /a tries+=1
if !tries! geq 40 (
  echo Server did not start in time. Cleaning up.
  goto cleanup
)
timeout /t 1 /nobreak >nul
goto waitloop

:ready
echo      server is up.

echo.
echo [2/3] Opening browser ^(close the window to shut everything down^)...
set "BROWSER="
if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" set "BROWSER=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" set "BROWSER=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
if not defined BROWSER if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" set "BROWSER=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if not defined BROWSER if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" set "BROWSER=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"

if defined BROWSER (
  start "" /wait "!BROWSER!" --new-window --app=http://localhost:3000 --user-data-dir="%TEMP%\elab_browser_profile"
) else (
  echo Edge/Chrome not found. Opening default browser instead.
  start "" http://localhost:3000
  echo Press any key in this window when done to stop the server...
  pause >nul
)

:cleanup
echo.
echo [3/3] Stopping server...
taskkill /FI "WINDOWTITLE eq ELAB_SERVER*" /T /F >nul 2>nul
echo Done.
endlocal
