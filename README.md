# TheraGrowth AI MVP

A starter SaaS prototype for therapists and private practices. This MVP focuses on marketing and lead generation, not diagnosis, treatment, or clinical decision-making.

## Features
- FastAPI backend
- Next.js frontend
- AI content generator endpoint
- Website lead capture form
- Lead inbox
- Dashboard stats
- Stripe checkout placeholder
- Environment templates

## 1. Run backend

```bash
cd backend
python -m venv .venv
# Windows PowerShell: .venv\Scripts\Activate.ps1
# Mac/Linux: source .venv/bin/activate
pip install -r requirements.txt
copy .env.example .env  # Windows
# cp .env.example .env  # Mac/Linux
uvicorn main:app --reload --port 8000
```

Backend runs at: http://localhost:8000

## 2. Run frontend

Open another terminal:

```bash
cd frontend
npm install
copy .env.local.example .env.local  # Windows
# cp .env.local.example .env.local  # Mac/Linux
npm run dev
```

Frontend runs at: http://localhost:3000

## 3. Add real AI

Put your OpenAI API key in `backend/.env`:

```env
OPENAI_API_KEY=your_key_here
```

Without the key, the backend returns demo content.

## 4. Add Stripe later

Create a Stripe recurring price and add:

```env
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_PRICE_ID=price_your_id
```

## 5. Compliance notes

Do not store clinical notes, diagnoses, treatment data, therapy session content, or protected health information in this MVP. Before handling PHI, work with a qualified healthcare privacy attorney and implement HIPAA/security controls.
