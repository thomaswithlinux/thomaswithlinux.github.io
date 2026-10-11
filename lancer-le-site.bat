@echo off
echo Portfolio disponible sur http://localhost:8765 (Ctrl+C pour arreter)
start http://localhost:8765
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\serve.ps1" -Root "%~dp0."
