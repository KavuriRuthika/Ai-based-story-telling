#!/bin/bash

# KathaQuest - Single Command Startup (Mac/Linux)
# Run the entire project with: bash run.sh

echo "================================"
echo "  KathaQuest Project Startup"
echo "================================"
echo ""

# Check if Node.js is installed
echo "[1/4] Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi
echo "✓ Node.js found: $(node -v)"

# Check if Python is installed
echo "[2/4] Checking Python..."
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python is not installed!"
    echo "Please install Python from https://www.python.org/"
    exit 1
fi
echo "✓ Python found: $(python3 --version)"

# Install dependencies if needed
echo "[3/4] Installing dependencies..."
if [ ! -d "frontend/node_modules" ]; then
    echo "Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
fi
if [ ! -d "backend/venv" ]; then
    echo "Creating Python virtual environment..."
    cd backend
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    cd ..
fi
echo "✓ Dependencies installed"

# Check for .env files
echo "[4/4] Checking configuration..."
if [ ! -f "backend/.env" ]; then
    echo "⚠ WARNING: backend/.env not found!"
    echo "Please create backend/.env with OPENAI_API_KEY"
    echo ""
fi
if [ ! -f "frontend/.env" ]; then
    echo "⚠ WARNING: frontend/.env not found!"
    echo "Please create frontend/.env with VITE_API_URL"
    echo ""
fi

echo ""
echo "================================"
echo "  Starting Backend & Frontend"
echo "================================"
echo ""
echo "Backend will be available at: http://localhost:8000"
echo "Frontend will be available at: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Run backend in background
cd backend
source venv/bin/activate
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!
cd ..

# Run frontend
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo "✓ Backend (PID: $BACKEND_PID) and Frontend (PID: $FRONTEND_PID) started!"
echo ""

# Cleanup on exit
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo 'Servers stopped.'; exit 0" SIGINT SIGTERM

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
