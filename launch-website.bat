@echo off
setlocal
cd /d "%~dp0"

echo Starting the AURA website...
start "" /b powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "$url='http://localhost:3000'; $deadline=(Get-Date).AddSeconds(60); do { try { $response=Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 2; if ($response.StatusCode -ge 200) { Start-Process $url; exit 0 } } catch { Start-Sleep -Seconds 1 } } while ((Get-Date) -lt $deadline); Write-Host 'The site did not respond at http://localhost:3000 within 60 seconds.'"

call npm.cmd run dev
endlocal
