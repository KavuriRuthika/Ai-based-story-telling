# ⚡ Quick Start Guide

## 5-Minute Setup

### Prerequisites
- Python 3.9+
- Node.js 18+
- OpenAI API Key

### Step 1: Environment Setup

```bash
# Clone and navigate to project
cd kathaquest

# Copy environment template
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:
```env
OPENAI_API_KEY=sk-your-key-here
```

### Step 2: Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start backend
uvicorn app.main:app --reload
```

✅ Backend running at `http://localhost:8000`

### Step 3: Frontend Setup

In a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Start frontend
npm run dev
```

✅ Frontend running at `http://localhost:5173`

## Usage

1. Open browser to `http://localhost:5173`
2. Click "Create Hero"
3. Enter hero details and select character type
4. Choose world and mission
5. Enjoy the adaptive story!

## API Documentation

Visit `http://localhost:8000/docs` for interactive API docs

## Troubleshooting

**Backend won't start:**
```bash
# Clear pip cache and reinstall
pip cache purge
pip install -r requirements.txt
```

**Frontend port conflict:**
```bash
npm run dev -- --port 3000
```

**API calls failing:**
- Check backend is running on port 8000
- Verify `.env` file has OPENAI_API_KEY
- Ensure CORS_ORIGINS includes frontend URL

## Next Steps

1. Customize worlds and missions
2. Add more story scenes
3. Implement additional learning metrics
4. Deploy to cloud (AWS, GCP, Azure)

---

For full documentation, see [README.md](README.md)
