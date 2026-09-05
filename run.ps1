# KathaQuest - Single Command Startup (Windows PowerShell)
# Run the entire project with: powershell -ExecutionPolicy Bypass -File run.ps1

Write-Host "================================" -ForegroundColor Cyan
Write-Host "  KathaQuest Project Startup" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "[1/4] Checking Node.js..." -ForegroundColor Yellow
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}
Write-Host "OK: Node.js found: $(node -v)" -ForegroundColor Green

# Check if Python is installed
Write-Host "[2/4] Checking Python..." -ForegroundColor Yellow
if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Python is not installed!" -ForegroundColor Red
    Write-Host "Please install Python from https://www.python.org/" -ForegroundColor Red
    exit 1
}
Write-Host "OK: Python found: $(python --version)" -ForegroundColor Green

# Install dependencies if needed
Write-Host "[3/4] Installing dependencies..." -ForegroundColor Yellow
if (-not (Test-Path "frontend/node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Cyan
    Push-Location frontend
    npm install
    if ($LASTEXITCODE -ne 0) {
        Pop-Location
        Write-Host "ERROR: Frontend dependency installation failed." -ForegroundColor Red
        exit 1
    }
    Pop-Location
}

$backendPython = Join-Path (Get-Location) "backend\venv\Scripts\python.exe"
if (-not (Test-Path $backendPython)) {
    Write-Host "Creating Python virtual environment..." -ForegroundColor Cyan
    Push-Location backend
    python -m venv venv
    if ($LASTEXITCODE -ne 0) {
        Pop-Location
        Write-Host "ERROR: Python virtual environment creation failed." -ForegroundColor Red
        exit 1
    }
    Pop-Location
}

Write-Host "Installing backend dependencies..." -ForegroundColor Cyan
& $backendPython -m pip install -r (Join-Path (Get-Location) "backend\requirements.txt")
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Backend dependency installation failed." -ForegroundColor Red
    exit 1
}
Write-Host "OK: Dependencies installed" -ForegroundColor Green

# Check for .env files
Write-Host "[4/4] Checking configuration..." -ForegroundColor Yellow
if (-not (Test-Path "backend/.env")) {
    Write-Host "WARNING: backend/.env not found!" -ForegroundColor Yellow
    Write-Host "Please create backend/.env with OPENAI_API_KEY" -ForegroundColor Yellow
    Write-Host ""
}
if (-not (Test-Path "frontend/.env")) {
    Write-Host "WARNING: frontend/.env not found!" -ForegroundColor Yellow
    Write-Host "Please create frontend/.env with VITE_API_URL" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "  Starting Backend and Frontend" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend will be available at: http://localhost:8000" -ForegroundColor Green
Write-Host "Frontend will be available at: http://localhost:5173" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop both servers" -ForegroundColor Yellow
Write-Host ""

# Run both services through the root npm launcher in this terminal
$env:Path = (Join-Path (Get-Location) 'backend\venv\Scripts') + ';' + $env:Path
npm run dev
exit $LASTEXITCODE
