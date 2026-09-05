# 🚀 Single Command Startup Guide

This guide explains how to run the entire KathaQuest project with a single command!

## Prerequisites

### Option 1: Node.js Method (Recommended for Development)
- Node.js 18+ ([Download](https://nodejs.org/))
- Python 3.8+ ([Download](https://www.python.org/))
- OpenAI API key (set in `backend/.env`)

### Option 2: Docker Method (Best for Consistency)
- Docker Desktop ([Download](https://www.docker.com/products/docker-desktop))
- OpenAI API key (set in `docker-compose.yml`)

---

## ⚡ Quick Setup

### 1. **Configure Environment Variables**

Create `backend/.env`:
```bash
DATABASE_URL=sqlite:///./kathaquest.db
OPENAI_API_KEY=your_openai_key_here
ENABLE_VOICE_FEATURES=True
ENABLE_IMAGE_GENERATION=True
ENABLE_ADAPTIVE_LEARNING=True
DEBUG=True
SESSION_TIMEOUT=3600
MAX_STORY_SCENES=100
```

Create `frontend/.env`:
```bash
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=KathaQuest
VITE_ENABLE_VOICE=true
VITE_ENABLE_IMAGES=true
```

---

## 🎯 Run with Single Command

### **Method 1: npm (Recommended for Development)**

**First time setup:**
```bash
npm install
npm run install:all
```

**Run the project:**
```bash
npm run dev
```

**For verbose output (easier debugging):**
```bash
npm run dev:verbose
```

✅ **Access:**
- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs

---

### **Method 2: PowerShell Script (Windows Only)**

**First time setup:**
```powershell
powershell -ExecutionPolicy Bypass -File run.ps1
```

**Subsequent runs:**
```powershell
# Same command - it skips setup if already done
powershell -ExecutionPolicy Bypass -File run.ps1
```

This script will:
✓ Check for Node.js and Python
✓ Install dependencies if needed
✓ Create Python virtual environment
✓ Start both backend and frontend in separate windows
✓ Show URLs and instructions

---

### **Method 3: Bash Script (Mac/Linux)**

**Make it executable:**
```bash
chmod +x run.sh
```

**First time setup + run:**
```bash
./run.sh
```

This script will:
✓ Check for Node.js and Python
✓ Install dependencies if needed
✓ Create Python virtual environment
✓ Start both backend and frontend in background processes
✓ Show URLs and instructions

---

### **Method 4: Docker Compose (Containerized)**

**First time setup:**
```bash
docker-compose build
```

**Run the project:**
```bash
docker-compose up
```

**Run in background:**
```bash
docker-compose up -d
```

**Stop the project:**
```bash
docker-compose down
```

✅ **Access:**
- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs

---

## 📋 Npm Scripts Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Run both backend and frontend |
| `npm run dev:verbose` | Run with colored output for each service |
| `npm run backend` | Run only backend server |
| `npm run frontend` | Run only frontend server |
| `npm run build` | Build both backend and frontend |
| `npm run build:backend` | Build backend (no action needed) |
| `npm run build:frontend` | Build frontend for production |
| `npm run install:all` | Install all dependencies |

---

## 🛑 Stopping the Project

### npm/PowerShell Script:
```
Press Ctrl+C
```

### Bash Script:
```
Press Ctrl+C
```

### Docker:
```bash
docker-compose down
```

---

## 🐛 Troubleshooting

### Backend not running?
```bash
# Check if port 8000 is available
netstat -an | find ":8000"  # Windows
lsof -i :8000  # Mac/Linux

# Try running manually:
cd backend
python -m venv venv
source venv/bin/activate  # Mac/Linux
# OR
.\venv\Scripts\activate  # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend not running?
```bash
# Clear node_modules and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### OPENAI_API_KEY not recognized?
```bash
# Verify backend/.env exists and has the key
cat backend/.env

# Restart the backend after adding the key
```

### Port already in use?
```bash
# Change port in environment or code:
# Backend: --port 8001
# Frontend: VITE_PORT=5174
```

---

## 📊 Expected Output

When running `npm run dev`, you should see:

```
> kathaquest@1.0.0 dev
> concurrently "npm run backend" "npm run frontend"

[Backend] INFO:     Uvicorn running on http://0.0.0.0:8000
[Backend] INFO:     Application startup complete
[Frontend] 
[Frontend]   VITE v5.0.0  ready in 234 ms
[Frontend]   ➜  Local:   http://localhost:5173/
[Frontend]   ➜  press h to show help
```

✅ Open http://localhost:5173 in your browser!

---

## 🐳 Docker Quick Reference

```bash
# Build and run
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Run single service
docker-compose up backend
docker-compose up frontend

# Remove everything
docker-compose down -v
```

---

## 💡 Tips

1. **Development**: Use `npm run dev` for the fastest feedback loop
2. **Production Build**: Use `npm run build` to create optimized builds
3. **Debugging**: Use `npm run dev:verbose` to see which service logs are from
4. **Hot Reload**: Both servers support hot reload - changes auto-apply
5. **API Documentation**: Visit http://localhost:8000/docs for interactive API docs

---

## 🎉 You're All Set!

With any of these methods, your KathaQuest project is running with a single command. Choose the one that works best for your workflow!

**Happy coding! 🚀**
