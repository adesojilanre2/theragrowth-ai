import os
from datetime import datetime
from typing import List, Optional

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

load_dotenv()

try:
    from openai import OpenAI
except Exception:
    OpenAI = None

try:
    import stripe
except Exception:
    stripe = None

app = FastAPI(title="TheraGrowth AI API", version="0.1.0")

origins = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory demo storage. Replace with Supabase/Postgres before real production use.
LEADS = []
CONTENT_HISTORY = []

class ContentRequest(BaseModel):
    specialty: str = Field(..., min_length=3, max_length=160)
    city: str = Field(..., min_length=2, max_length=120)
    tone: str = Field(default="warm, professional, ethical", max_length=120)
    audience: str = Field(default="adults seeking telehealth therapy", max_length=160)
    platform: str = Field(default="Instagram, blog, and Psychology Today", max_length=120)

class ContentResponse(BaseModel):
    content: str
    created_at: str

class LeadRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(default=None, max_length=40)
    need: str = Field(..., min_length=3, max_length=280)
    source: str = Field(default="website", max_length=80)

class CheckoutRequest(BaseModel):
    email: EmailStr

@app.get("/")
def home():
    return {"message": "TheraGrowth AI API is running", "status": "ok"}

@app.post("/generate-content", response_model=ContentResponse)
def generate_content(payload: ContentRequest):
    system_prompt = """
You are a marketing assistant for licensed mental health therapists.
You create ethical, non-clinical marketing content.
Rules:
- Do not diagnose, treat, or give emergency/crisis instructions as a replacement for care.
- Do not guarantee outcomes.
- Do not create fake testimonials.
- Use warm, professional language.
- Include a clear call-to-action for a free consultation.
- Add a compliance reminder at the end.
""".strip()

    user_prompt = f"""
Create a 30-day marketing pack for a therapist.
Specialty: {payload.specialty}
Location/market: {payload.city}
Tone: {payload.tone}
Audience: {payload.audience}
Platforms: {payload.platform}

Return:
1. 10 social post ideas with captions
2. 5 short reel/video scripts
3. 5 blog titles with SEO keywords
4. 3 Psychology Today profile headlines
5. 3 consultation call-to-action messages
6. Compliance reminder
""".strip()

    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key or OpenAI is None:
        content = f"""DEMO CONTENT PACK\n\nSpecialty: {payload.specialty}\nMarket: {payload.city}\nTone: {payload.tone}\n\n1. Social post: Feeling overwhelmed before work? Here are 3 grounding steps to help you pause and reset.\n2. Reel script: \"You are not broken. Stress can be a signal that your nervous system needs support.\"\n3. Blog title: How Telehealth Therapy Can Help Busy Professionals Manage Anxiety\n4. Psychology Today headline: Compassionate {payload.specialty.title()} in {payload.city}\n5. CTA: Book a free 15-minute consultation to see if we may be a good fit.\n\nCompliance reminder: This content is educational marketing only and does not diagnose, treat, or guarantee results."""
    else:
        client = OpenAI(api_key=api_key)
        response = client.responses.create(
            model="gpt-4.1-mini",
            input=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
        )
        content = response.output_text

    item = {"content": content, "created_at": datetime.utcnow().isoformat()}
    CONTENT_HISTORY.append(item)
    return item

@app.post("/capture-lead")
def capture_lead(payload: LeadRequest):
    lead = payload.model_dump()
    lead["created_at"] = datetime.utcnow().isoformat()
    lead["status"] = "new"
    LEADS.append(lead)
    return {"message": "Lead captured", "lead": lead}

@app.get("/leads")
def get_leads():
    return {"leads": LEADS}

@app.get("/dashboard-stats")
def dashboard_stats():
    return {
        "total_leads": len(LEADS),
        "content_packs_created": len(CONTENT_HISTORY),
        "new_leads": len([l for l in LEADS if l.get("status") == "new"]),
        "conversion_rate_demo": "Add real analytics after deployment",
    }

@app.post("/create-checkout")
def create_checkout(payload: CheckoutRequest):
    if stripe is None:
        raise HTTPException(status_code=500, detail="Stripe package is not installed")
    secret_key = os.getenv("STRIPE_SECRET_KEY")
    price_id = os.getenv("STRIPE_PRICE_ID")
    frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
    if not secret_key or not price_id:
        raise HTTPException(status_code=400, detail="Stripe is not configured yet")
    stripe.api_key = secret_key
    session = stripe.checkout.Session.create(
        mode="subscription",
        customer_email=payload.email,
        line_items=[{"price": price_id, "quantity": 1}],
        success_url=f"{frontend_url}/?checkout=success",
        cancel_url=f"{frontend_url}/?checkout=cancelled",
    )
    return {"url": session.url}
