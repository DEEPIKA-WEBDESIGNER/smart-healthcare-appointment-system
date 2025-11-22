@echo off
echo ============================================
echo Smart Healthcare Appointment System
echo Creating Download Package...
echo ============================================
echo.

REM Create a zip file of the project
powershell -Command "Compress-Archive -Path backend, frontend, .env, .gitignore, package.json, database_schema.sql, README.md, SETUP_INSTRUCTIONS.md -DestinationPath Smart_Healthcare_System.zip -Force"

echo.
echo ============================================
echo Package created successfully!
echo File: Smart_Healthcare_System.zip
echo ============================================
echo.
echo You can now download and share this zip file.
echo Extract it and follow SETUP_INSTRUCTIONS.md
echo.
pause
