# 📖 Detailed Setup & Installation Guide

## System Requirements

### Minimum Requirements
- **OS**: Windows 10+, macOS 10.14+, Linux (Ubuntu 18.04+)
- **RAM**: 4GB minimum (8GB recommended)
- **Disk Space**: 2GB for project + dependencies
- **Internet**: Required for OpenAI API calls

### Software Requirements
- **Python**: 3.9, 3.10, 3.11, or 3.12
- **Node.js**: 16+ (18+ recommended)
- **npm**: 8+ or yarn 1.22+

## Step-by-Step Installation

### 1. Repository Setup

#### On Windows:
```powershell
# Download and navigate to project
git clone https://github.com/yourusername/kathaquest.git
cd kathaquest

# Verify project structure
dir
```

#### On macOS/Linux:
```bash
git clone https://github.com/yourusername/kathaquest.git
cd kathaquest
ls -la
```

### 2. Backend Installation

#### 2.1 Python Environment Setup

**Windows:**
```powershell
# Check Python installation
python --version

# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\activate

# You should see (venv) in terminal prompt
```

**macOS/Linux:**
```bash
# Check Python installation
python3 --version

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# You should see (venv) in terminal prompt
```

#### 2.2 Install Dependencies

```bash
cd backend

# Verify you're in backend directory
pwd  # macOS/Linux
cd   # Windows

# Upgrade pip
pip install --upgrade pip

# Install requirements
pip install -r requirements.txt

# Verify installation
pip list | grep -E "fastapi|uvicorn|openai|sqlalchemy"
```

#### 2.3 Environment Configuration

```bash
# Copy environment template
cp .env.example .env  # macOS/Linux
copy .env.example .env  # Windows

# Edit .env with your editor (VS Code, Sublime, etc.)
nano .env  # macOS/Linux
notepad .env  # Windows
```

**Required in .env:**
```env
# MUST HAVE
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# RECOMMENDED
DATABASE_URL=sqlite:///./kathaquest.db
ENVIRONMENT=development
DEBUG=True
```

#### 2.4 Database Setup

```bash
# Still in backend directory

# Option 1: Create database via Python
python << EOF
from app.models import Base
from sqlalchemy import create_engine

engine = create_engine('sqlite:///kathaquest.db')
Base.metadata.create_all(engine)
print("Database created successfully!")
EOF

# Option 2: Using SQL directly
# Requires sqlite3 command (usually pre-installed)
sqlite3 kathaquest.db < ../database/schema.sql
```

#### 2.5 Start Backend Server

```bash
# Start FastAPI with auto-reload
uvicorn app.main:app --reload --port 8000

# You should see output like:
# INFO:     Uvicorn running on http://127.0.0.1:8000
# INFO:     Application startup complete
```

**Test Backend:**
- Open browser: `http://localhost:8000`
- You should see: `{"status": "KathaQuest AI Engine Online", ...}`
- API Docs: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### 3. Frontend Installation

#### 3.1 Node Dependencies

**In a NEW terminal, don't close backend terminal:**

```bash
cd frontend

# Verify Node installation
node --version
npm --version

# Install dependencies (this may take a few minutes)
npm install

# Verify installation
npm list react react-router-dom axios
```

#### 3.2 Frontend Environment

```bash
# Copy environment template (if not already done)
cp .env.example .env  # macOS/Linux
copy .env.example .env  # Windows

# Edit .env if needed
nano .env  # macOS/Linux
notepad .env  # Windows
```

**Verify .env contains:**
```env
VITE_API_URL=http://localhost:8000/api
VITE_DEFAULT_LANGUAGE=en
```

#### 3.3 Start Frontend Development Server

```bash
# Start Vite development server
npm run dev

# You should see:
# VITE v5.x.x  ready in xxx ms
# ➜  Local:   http://localhost:5173/
# ➜  press h + enter to show help
```

**Test Frontend:**
- Open browser: `http://localhost:5173`
- You should see KathaQuest home page
- Create a test hero

### 4. Verify Full Stack

At this point you should have:

**Terminal 1 (Backend):**
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete
```

**Terminal 2 (Frontend):**
```
➜  Local:   http://localhost:5173/
```

**Test the Connection:**

1. Go to `http://localhost:5173` in your browser
2. Click "Create Hero"
3. Fill in hero details
4. Click "Create" button
5. Should see success message and redirect to home

If you see error, check:
- Is backend running?
- Is OPENAI_API_KEY set?
- Check browser console (F12) for errors
- Check backend terminal for error logs

## Detailed Component Setup

### Database Setup Details

#### SQLite (Local Development - Recommended)

```bash
# Location: backend/kathaquest.db

# Direct SQL injection
sqlite3 kathaquest.db
> .schema

# Verify tables created
> SELECT name FROM sqlite_master WHERE type='table';

# Exit
> .quit
```

#### PostgreSQL (Production - Optional)

```bash
# Install PostgreSQL
# Windows: Download from postgresql.org
# macOS: brew install postgresql
# Linux: sudo apt install postgresql

# Update .env
DATABASE_URL=postgresql://username:password@localhost:5432/kathaquest

# Create database
createdb kathaquest

# Apply schema
psql kathaquest < ../database/schema.sql
```

### OpenAI API Setup

1. **Create Account**: https://platform.openai.com/account/api-keys
2. **Generate API Key**: New Secret Key
3. **Copy Key**: `sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
4. **Add to .env**: `OPENAI_API_KEY=sk-xxxxx...`

**Billing Setup:**
- Add payment method to OpenAI account
- Set usage limits if desired
- Monitor usage: https://platform.openai.com/account/billing/overview

### Dependencies Troubleshooting

**Backend dependency issues:**
```bash
cd backend
pip install --upgrade pip setuptools wheel
pip install -r requirements.txt --force-reinstall
```

**Frontend dependency issues:**
```bash
cd frontend
rm -rf node_modules package-lock.json  # macOS/Linux
rmdir /s /q node_modules  # Windows
del package-lock.json  # Windows
npm install
```

## Development Workflow

### File Structure for Development

```
kathaquest/
├── backend/
│   ├── app/
│   │   ├── main.py (edit here for routes)
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   ├── kathaquest.db (auto-created)
│   └── .env (keep secret!)
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── services/
│   └── .env
└── README.md
```

### Making Changes

**Backend Changes:**
1. Edit `.py` files in `backend/app/`
2. Save file
3. Backend reloads automatically (uvicorn --reload)
4. Check `http://localhost:8000/docs` for changes

**Frontend Changes:**
1. Edit `.jsx` or `.css` files in `frontend/src/`
2. Save file
3. Browser auto-refreshes with changes (Vite HMR)
4. Check `http://localhost:5173` for changes

## Production Deployment

### Pre-Deployment Checklist

- [ ] Change `DEBUG=False` in backend .env
- [ ] Set `ENVIRONMENT=production`
- [ ] Use PostgreSQL instead of SQLite
- [ ] Enable HTTPS/SSL
- [ ] Configure appropriate CORS_ORIGINS
- [ ] Set strong database passwords
- [ ] Run `npm run build` in frontend

### Deployment Platforms

**Easy Options:**
- **Vercel** (Frontend): `npm install -g vercel` → `vercel deploy`
- **Heroku** (Backend): Requires Procfile
- **Railway.app**: Drag & drop deployment
- **Replit**: Web-based development

**Advanced Options:**
- **AWS**: EC2, Lambda, RDS
- **Google Cloud**: Compute Engine, Cloud SQL
- **Azure**: App Service, Cosmos DB
- **DigitalOcean**: Droplets, Managed DB

## Troubleshooting Common Issues

### Issue: "ModuleNotFoundError: No module named 'fastapi'"

**Solution:**
```bash
cd backend
source venv/bin/activate  # Activate virtual environment
pip install fastapi uvicorn
```

### Issue: "OPENAI_API_KEY not found"

**Solution:**
```bash
# In backend/.env, add:
OPENAI_API_KEY=sk-your-actual-key-here

# Restart backend server
# Press Ctrl+C, then:
uvicorn app.main:app --reload
```

### Issue: "Port 8000 already in use"

**Solution:**
```bash
# Find process on port 8000
# Windows:
netstat -ano | findstr :8000
taskkill /PID <process-id> /F

# macOS/Linux:
lsof -ti:8000 | xargs kill -9

# Or use different port:
uvicorn app.main:app --reload --port 8001
```

### Issue: "Cannot find module 'react'"

**Solution:**
```bash
cd frontend
npm install
npm run dev
```

### Issue: "CORS error when calling API"

**Solution:**
```env
# In backend/.env, update:
CORS_ORIGINS=http://localhost:5173,http://localhost:3000

# Restart backend after changing
```

## Performance Optimization

### Backend Optimization
```python
# Enable database connection pooling
SQLALCHEMY_ENGINE_OPTIONS = {
    "pool_size": 10,
    "pool_recycle": 3600,
    "pool_pre_ping": True,
}
```

### Frontend Optimization
```bash
# Build for production
cd frontend
npm run build

# Output in dist/ folder
# Deploy to CDN for best performance
```

## Security Best Practices

1. **Never commit .env files**
   ```bash
   # Add to .gitignore
   echo ".env" >> .gitignore
   ```

2. **Use environment variables**
   - Don't hardcode API keys
   - Use .env files locally
   - Use platform secrets in production

3. **Database security**
   - Use strong passwords
   - Enable SSL for database connections
   - Regular backups

4. **API security**
   - Implement rate limiting
   - Add API key authentication
   - Validate all inputs

## Next Steps

1. ✅ Completed: Basic setup
2. Create your first hero and mission
3. Customize story content
4. Deploy to production
5. Monitor usage and performance

---

**Need help?** Check the troubleshooting section or create a GitHub issue.
