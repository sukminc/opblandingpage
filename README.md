# onepercentbetter.poker

**GTO Defends. We Exploit.**

Data-driven poker exploit quantification platform. Parses GGPoker hand histories, quantifies GTO deviations, and surfaces the exact exploit strategies that maximize bb/100 edge.

## Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 16 (App Router), Tailwind CSS, Lucide React |
| Backend | FastAPI, SQLAlchemy, SQLite, Pandas/NumPy |
| Deployment | Vercel (frontend), any ASGI host (backend) |

## Quick Start

### Backend
```bash
cd backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
# API → http://localhost:8000
# Docs → http://localhost:8000/docs
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# UI → http://localhost:3000
```

## Structure
```
backend/
  app/
    main.py       # FastAPI routes
    parser.py     # GGPoker hand history parser
    analytics.py  # Positional stats & exploit signals
    models.py     # SQLAlchemy ORM models
    db.py         # DB engine & session
  tests/
frontend/
  app/
    page.tsx      # Landing page
    components/   # Navbar, Hero, About, Roadmap, FundingCTA, Footer
    layout.tsx
testdata/         # GGPoker .txt files (git-ignored)
```

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/health` | Service health check |
| POST | `/ingest` | Upload GGPoker .txt hand history |
| GET | `/tournaments` | List all tournaments |
| PATCH | `/tournaments/{id}` | Update result/finish position |
| GET | `/analytics/signals` | Top-level exploit edge metrics |
| GET | `/analytics/positional` | Stats broken down by position |
| GET | `/analytics/pnl` | Cumulative P&L over time |

## Tests
```bash
cd backend
PYTHONPATH=. pytest -v
```

---

© 2026 onepercentbetter.poker
