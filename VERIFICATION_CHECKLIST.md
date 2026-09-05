# ✅ KathaQuest Verification Checklist

Use this checklist to verify your KathaQuest installation and setup.

## Prerequisites Check

- [ ] Python 3.9+ installed (`python --version`)
- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm 8+ installed (`npm --version`)
- [ ] Git installed (`git --version`)
- [ ] OpenAI API key obtained (https://platform.openai.com/api-keys)

## Backend Setup Verification

### Installation
- [ ] Virtual environment created (`venv` folder exists)
- [ ] Virtual environment activated (see `(venv)` in terminal)
- [ ] Requirements installed (`pip list | grep fastapi`)
- [ ] `.env` file exists with `OPENAI_API_KEY`
- [ ] Database file created (`backend/kathaquest.db` exists)

### Server Startup
- [ ] Backend server starts without errors: `uvicorn app.main:app --reload`
- [ ] Server accessible at `http://localhost:8000`
- [ ] Health check works: `http://localhost:8000/health`
- [ ] API docs accessible: `http://localhost:8000/docs`
- [ ] ReDoc works: `http://localhost:8000/redoc`

### API Endpoints
- [ ] Test heroes endpoint (POST) - creates hero
- [ ] Test heroes endpoint (GET) - retrieves hero
- [ ] Test story generate endpoint
- [ ] Test missions endpoint
- [ ] All endpoints return correct status codes

## Frontend Setup Verification

### Installation
- [ ] `frontend/node_modules` folder exists
- [ ] `package.json` includes required dependencies
- [ ] `.env` file exists with `VITE_API_URL`
- [ ] All imports resolve correctly

### Server Startup
- [ ] Frontend server starts: `npm run dev`
- [ ] Server accessible at `http://localhost:5173`
- [ ] No console errors when loading
- [ ] Hot reload works (edit a file, page updates)
- [ ] Navigation works between routes

### Components
- [ ] Navbar displays correctly
- [ ] Home page loads
- [ ] Create Hero page accessible
- [ ] Navigation links work
- [ ] Language selector functional

## Integration Verification

### Full Stack Test
- [ ] Frontend loads at `http://localhost:5173`
- [ ] Backend API available at `http://localhost:8000/api`
- [ ] API call succeeds from frontend
- [ ] No CORS errors in browser console
- [ ] Network requests show in browser DevTools

### Data Flow
- [ ] Create hero form submits
- [ ] Hero data saved in backend
- [ ] Can retrieve hero from API
- [ ] Hero context updates in frontend
- [ ] Navigation after hero creation works

### Error Handling
- [ ] Invalid hero data shows error
- [ ] Missing API key shows helpful message
- [ ] Network errors handled gracefully
- [ ] Console shows meaningful error messages

## Performance Check

### Backend Performance
- [ ] API responses < 2 seconds
- [ ] Database queries complete quickly
- [ ] No memory leaks visible
- [ ] Terminal shows request logs

### Frontend Performance
- [ ] Page loads < 1 second
- [ ] Navigation < 500ms
- [ ] No layout shifts
- [ ] Smooth animations

## Database Verification

### Tables Exist
- [ ] `heroes` table created
- [ ] `stories` table created
- [ ] `learning_profiles` table created
- [ ] `missions` table created
- [ ] `worlds` table created (with data)

### Data Integrity
- [ ] Can insert hero records
- [ ] Foreign keys work correctly
- [ ] Indexes are present
- [ ] Default values apply

## Security Check

### Configuration
- [ ] `.env` file in `.gitignore`
- [ ] `OPENAI_API_KEY` not in version control
- [ ] CORS origins properly configured
- [ ] Debug mode off in production

### API Security
- [ ] Input validation working
- [ ] Invalid data rejected
- [ ] Error messages don't leak system info

## File Structure Verification

### Backend Structure
- [ ] `backend/app/main.py` exists
- [ ] `backend/app/models/` folder with models
- [ ] `backend/app/routes/` folder with routes
- [ ] `backend/app/services/` folder with services
- [ ] `backend/requirements.txt` populated
- [ ] `backend/.env` configured

### Frontend Structure
- [ ] `frontend/src/pages/` folder with pages
- [ ] `frontend/src/components/` folder with components
- [ ] `frontend/src/services/` folder with services
- [ ] `frontend/src/context/` folder with context
- [ ] `frontend/package.json` configured
- [ ] `frontend/.env` configured

### Documentation
- [ ] `README.md` exists
- [ ] `QUICKSTART.md` exists
- [ ] `SETUP.md` exists
- [ ] `.env.example` exists
- [ ] `.gitignore` configured

## Testing Scenarios

### Scenario 1: Create and Load Hero
1. [ ] Open http://localhost:5173
2. [ ] Click "Create Hero"
3. [ ] Fill in hero details
4. [ ] Submit form
5. [ ] Verify hero created in backend DB
6. [ ] Verify hero loaded on next page

### Scenario 2: Generate Story
1. [ ] Navigate to story page
2. [ ] Click generate story
3. [ ] Verify API call succeeds
4. [ ] Verify story content displays
5. [ ] Verify story image loads
6. [ ] Verify choices appear

### Scenario 3: Language Selection
1. [ ] Click language selector in navbar
2. [ ] Select different language
3. [ ] Verify selection persists
4. [ ] Verify new stories in selected language

### Scenario 4: Navigation
1. [ ] Test all routes in router
2. [ ] Verify back/forward buttons work
3. [ ] Verify hero data persists across pages
4. [ ] Verify language selection persists

## Troubleshooting Checklist

If something doesn't work:

### Backend Issues
- [ ] Is backend server running? Check for "Uvicorn running" message
- [ ] Is virtual environment activated? Check for `(venv)` in terminal
- [ ] Is OpenAI API key correct? Test in Python REPL
- [ ] Is database created? Check for `kathaquest.db` file
- [ ] Are all dependencies installed? Run `pip install -r requirements.txt` again

### Frontend Issues
- [ ] Is frontend server running? Check for "Local:" in terminal
- [ ] Are all node modules installed? Run `npm install` again
- [ ] Is API URL correct? Check `.env` file
- [ ] Are there console errors? Open DevTools (F12) and check
- [ ] Is backend running? Can you access `http://localhost:8000`?

### CORS Issues
- [ ] Backend CORS origins include frontend URL (http://localhost:5173)
- [ ] Backend is running before frontend makes requests
- [ ] No typos in CORS configuration

### API Issues
- [ ] Test endpoint with curl or Postman
- [ ] Check backend logs for errors
- [ ] Verify request format matches API spec
- [ ] Check response status codes

## Final Sign-Off

When all checkboxes are complete:

- [ ] I have verified all prerequisites
- [ ] I have verified backend setup
- [ ] I have verified frontend setup
- [ ] I have verified integration
- [ ] I have tested all scenarios
- [ ] I am ready to start development

**Status**: ✅ **Ready to Go!**

---

## Quick Reference Commands

### Backend
```bash
cd backend
source venv/bin/activate  # macOS/Linux: venv\Scripts\activate on Windows
uvicorn app.main:app --reload
# Access: http://localhost:8000
# Docs: http://localhost:8000/docs
```

### Frontend
```bash
cd frontend
npm run dev
# Access: http://localhost:5173
```

### Database
```bash
# SQLite (simple)
sqlite3 backend/kathaquest.db

# Create tables (if needed)
sqlite3 backend/kathaquest.db < database/schema.sql
```

### Testing API
```bash
# Get list of missions
curl http://localhost:8000/api/missions

# Create hero
curl -X POST http://localhost:8000/api/heroes \
  -H "Content-Type: application/json" \
  -d '{"name":"Arjun","age":8,"language":"en","character_type":"wizard"}'
```

---

**Document Version**: 1.0
**Last Updated**: 2024
**Status**: Ready for Development
