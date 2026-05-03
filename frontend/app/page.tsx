"use client";

import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    practice: "",
    website: "",
    budget: "",
    challenge: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function updateField(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleAuditSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("✅ Request submitted successfully.");
        setForm({
          name: "",
          email: "",
          phone: "",
          practice: "",
          website: "",
          budget: "",
          challenge: "",
        });
      } else {
        setMessage("❌ " + (data.message || "Something went wrong."));
      }
    } catch {
      setMessage("❌ Something went wrong. Please try again.");
    }

    setLoading(false);
  }

  return (
    <main style={{ background: "#f8f4ea", color: "#111", minHeight: "100vh" }}>
      <header style={header}>
        <div style={brand}>
          <div style={logo}>TG</div>
          <div>
            <strong>TheraGrowth AI</strong>
            <p style={{ margin: 0, color: "#777" }}>SaaS Growth System for Therapists</p>
          </div>
        </div>

        <nav style={nav}>
          <a href="#services">Services</a>
          <Link href="/pricing">SaaS Pricing</Link>
          <Link href="/signup">Signup</Link>
          <Link href="/dashboard">Dashboard</Link>
          <a href="#audit" style={auditBtn}>Free Audit</a>
        </nav>
      </header>

      <section style={hero}>
        <div>
          <p style={goldText}>AI CHAT • CRM • FOLLOW-UP • SAAS DASHBOARD</p>
          <h1 style={heroTitle}>
            Turn Your Therapy Website Into a Private-Pay Client Machine
          </h1>
          <p style={heroSub}>
            TheraGrowth AI helps therapists capture leads, follow up faster, track inquiries,
            and convert more website visitors into booked consultations.
          </p>
          <a href="#audit" style={blackBtn}>Request Free Audit</a>
        </div>

        <div style={heroCard}>
          <div style={logo}>TG</div>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 36 }}>
            A complete client acquisition engine for private practices.
          </h2>
          <ul style={{ lineHeight: 2 }}>
            <li>Lead capture dashboard</li>
            <li>CRM pipeline tracking</li>
            <li>AI follow-up writer</li>
            <li>Monthly SaaS plans</li>
            <li>Stripe subscription billing</li>
          </ul>
          <Link href="/pricing" style={blackBtn}>Start Monthly SaaS</Link>
        </div>
      </section>

      <section id="services" style={section}>
        <p style={goldText}>SERVICES</p>
        <h2 style={sectionTitle}>What TheraGrowth AI Builds</h2>

        <div style={grid3}>
          <Card title="Website Audit" text="We review the therapy website, CTA, mobile layout, trust signals, and lead capture flow." />
          <Card title="AI Chat + Lead Capture" text="We help therapists turn visitors into inquiries using chat, forms, and structured follow-up." />
          <Card title="CRM + Follow-Up System" text="We organize leads, next actions, follow-up dates, and sales pipeline visibility." />
        </div>
      </section>

      <section style={darkSection}>
        <p style={goldText}>SAAS PRICING</p>
        <h2 style={{ ...sectionTitle, color: "white" }}>Simple Monthly Growth Plans</h2>

        <div style={grid3}>
          <Price title="Starter" price="$99/mo" text="Lead capture + CRM foundation." />
          <Price title="Growth" price="$299/mo" text="Website audit, follow-up system, and monthly optimization." />
          <Price title="Full Service" price="$999/mo" text="Done-for-you website, funnel, CRM, and outreach support." />
        </div>

        <div style={{ marginTop: 30 }}>
          <Link href="/pricing" style={whiteBtn}>View Pricing Page</Link>
        </div>
      </section>

      <section id="audit" style={auditSection}>
        <div>
          <p style={goldText}>FREE AUDIT</p>
          <h2 style={auditTitle}>Request Your Free Practice Growth Audit</h2>
          <p style={heroSub}>
            Submit your practice details and we’ll review your website, funnel, and client acquisition system.
          </p>
        </div>

        <form onSubmit={handleAuditSubmit} style={formStyle}>
          <input name="name" placeholder="Full Name" value={form.name} onChange={updateField} required style={input} />
          <input name="email" type="email" placeholder="Business Email" value={form.email} onChange={updateField} required style={input} />
          <input name="phone" placeholder="Phone Number" value={form.phone} onChange={updateField} required style={input} />
          <input name="practice" placeholder="Therapy Niche" value={form.practice} onChange={updateField} required style={input} />
          <input name="website" placeholder="Website URL" value={form.website} onChange={updateField} style={input} />

          <select name="budget" value={form.budget} onChange={updateField} style={input}>
            <option value="">Select service interest</option>
            <option value="Free Audit Only">Free Audit Only</option>
            <option value="$99/mo SaaS">$99/mo SaaS</option>
            <option value="$299/mo Growth">$299/mo Growth</option>
            <option value="$999/mo Full Service">$999/mo Full Service</option>
          </select>

          <textarea name="challenge" placeholder="What do you need help with?" value={form.challenge} onChange={updateField} rows={6} style={input} />

          <button type="submit" disabled={loading} style={submitBtn}>
            {loading ? "Submitting..." : "Submit Free Audit Request"}
          </button>

          {message && <p style={{ fontWeight: 800, color: message.includes("✅") ? "green" : "#b8860b" }}>{message}</p>}
        </form>
      </section>

      <footer style={footer}>
        <strong>TheraGrowth AI</strong>
        <p>Helping therapists get more private-pay clients through SaaS, AI chat, CRM, follow-up, and growth systems.</p>
      </footer>
    </main>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div style={card}>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function Price({ title, price, text }: { title: string; price: string; text: string }) {
  return (
    <div style={priceCard}>
      <h3>{title}</h3>
      <h2 style={{ color: "#c7962b", fontSize: 42 }}>{price}</h2>
      <p>{text}</p>
    </div>
  );
}

const header = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "28px 6%", borderBottom: "1px solid #dfcaa8", position: "sticky", top: 0, background: "#f8f4ea", zIndex: 10 } as const;
const brand = { display: "flex", gap: 14, alignItems: "center" } as const;
const logo = { width: 56, height: 56, borderRadius: "50%", background: "#111", color: "#c7962b", display: "grid", placeItems: "center", fontFamily: "Georgia, serif", fontWeight: 900, fontSize: 24 } as const;
const nav = { display: "flex", gap: 24, alignItems: "center", fontWeight: 900 } as const;
const auditBtn = { border: "1px solid #d7c4a8", padding: "14px 22px", borderRadius: 999, textDecoration: "none", color: "#111" } as const;
const hero = { display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 60, padding: "100px 6%", alignItems: "center" } as const;
const goldText = { color: "#b8860b", letterSpacing: 4, fontWeight: 900 } as const;
const heroTitle = { fontFamily: "Georgia, serif", fontSize: 78, lineHeight: 1, margin: "20px 0" } as const;
const heroSub = { fontSize: 21, lineHeight: 1.7, maxWidth: 680 } as const;
const heroCard = { background: "#fffaf2", border: "1px solid #d7c4a8", borderRadius: 28, padding: 42, boxShadow: "0 30px 70px rgba(0,0,0,.08)" } as const;
const blackBtn = { display: "inline-block", background: "#111", color: "white", padding: "16px 24px", borderRadius: 14, textDecoration: "none", fontWeight: 900 } as const;
const section = { padding: "80px 6%" } as const;
const sectionTitle = { fontFamily: "Georgia, serif", fontSize: 54, margin: "10px 0 30px" } as const;
const grid3 = { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 } as const;
const card = { background: "white", border: "1px solid #d7c4a8", borderRadius: 24, padding: 30, fontSize: 18, lineHeight: 1.6 } as const;
const darkSection = { background: "#111", color: "white", padding: "80px 6%" } as const;
const priceCard = { background: "#1b1b1b", border: "1px solid #333", borderRadius: 24, padding: 30, fontSize: 18 } as const;
const whiteBtn = { display: "inline-block", background: "white", color: "#111", padding: "16px 24px", borderRadius: 14, textDecoration: "none", fontWeight: 900 } as const;
const auditSection = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, padding: "100px 6%" } as const;
const auditTitle = { fontFamily: "Georgia, serif", fontSize: 64, lineHeight: 1.05, margin: "10px 0" } as const;
const formStyle = { display: "grid", gap: 16 } as const;
const input = { width: "100%", padding: 18, borderRadius: 14, border: "1px solid #d7c4a8", fontSize: 17, background: "white" } as const;
const submitBtn = { background: "#111", color: "white", border: "none", padding: 18, borderRadius: 14, fontWeight: 900, fontSize: 18, cursor: "pointer" } as const;
const footer = { background: "#111", color: "white", padding: "40px 6%" } as const;