@echo off
REM Hotel Chandamama - GitHub Push Script for Windows
REM Double-click this file to push to GitHub

echo ==================================
echo Hotel Chandamama - GitHub Push
echo ==================================
echo.

REM Check if git is installed
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed
    echo Please install Git from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo [OK] Git found
echo.

REM Check if in correct directory
if not exist "README.md" (
    echo [ERROR] Not in hotel-chandamama directory
    echo Please run this script from the hotel-chandamama folder
    pause
    exit /b 1
)

echo [OK] In correct directory
echo.

REM Initialize git if needed
if not exist ".git" (
    echo Initializing Git repository...
    git init
    echo [OK] Git initialized
)

REM Add all files
echo Adding all files...
git add .
echo [OK] Files added

REM Commit
echo Creating commit...
git commit -m "Initial commit - Hotel Chandamama Restaurant Management System"
echo [OK] Commit created

REM Add remote
echo Adding GitHub remote...
git remote remove origin 2>nul
git remote add origin https://github.com/doddasurendra/hotelchandamama-vinukonda.git
echo [OK] Remote added

REM Set branch
git branch -M main
echo [OK] Branch set to main

echo.
echo ==================================
echo Ready to push to GitHub!
echo ==================================
echo.
echo Repository: https://github.com/doddasurendra/hotelchandamama-vinukonda
echo.
echo When prompted, enter:
echo   Username: doddasurendra
echo   Password: Your GitHub Personal Access Token
echo.
echo Don't have a token? Get one at:
echo   https://github.com/settings/tokens
echo.
pause

REM Push to GitHub
echo.
echo Pushing to GitHub...
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ==================================
    echo SUCCESS!
    echo ==================================
    echo.
    echo Your code is now on GitHub!
    echo.
    echo View it at:
    echo   https://github.com/doddasurendra/hotelchandamama-vinukonda
    echo.
    echo Next steps:
    echo   1. Code is on GitHub (DONE!)
    echo   2. Deploy frontend to Vercel
    echo   3. Deploy backend to Render
    echo   4. Setup MongoDB Atlas
    echo.
    echo See DEPLOYMENT.md for complete guide
) else (
    echo.
    echo ==================================
    echo Push Failed
    echo ==================================
    echo.
    echo Common issues:
    echo   1. Wrong username/password
    echo   2. Token doesn't have permissions
    echo   3. Repository already has content
    echo.
    echo See GITHUB_PUSH_GUIDE.md for help
)

echo.
pause
