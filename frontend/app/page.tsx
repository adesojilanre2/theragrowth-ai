"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

const stripeLinks = {
  audit: "https://buy.stripe.com/4gM3cxbr7f9aer739b2sM03",
  starter: "https://buy.stripe.com/aFabJ32UB4uw2IpfVX2sM04",
  full: "https://buy.stripe.com/7sY28teDjd12fvbeRT2sM05",
};

export default function Home() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    practice_name: "",
    website_url: "",
    budget_range: "",
    main_goal: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitLead = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Submitting...");

    const { error } = await supabase.from("leads").insert([form]);

    if (error) {
      console.error(error);
      setStatus("Something went wrong. Please try again.");
      return;
    }

    setStatus("Success. We received your request.");
    setForm({
      full_name: "",
      email: "",
      phone: "",
      practice_name: "",
      website_url: "",
      budget_range: "",
      main_goal: "",
    });
  };

  return (
    <main style={page}>
      <header style={header}>
        <a href="/" style={brand}>
          <div style={logo}>TG</div>
          <div>
            <strong>TheraGrowth AI</strong>
            <p style={small}>SaaS Growth System for Therapists</p>
          </div>
        </a>

        <nav style={nav}>
          <a href="#services" style={navLink}>Services</a>
          <a href="/pricing" style={navLink}>SaaS Pricing</a>
          <a href="/signup" style={navLink}>Signup</a>
          <a href="/dashboard" style={navLink}>Dashboard</a>
          <a href="#audit" style={navButton}>Free Audit</a>
        </nav>
      </header>

      <section style={hero}>
        <div>
          <p style={eyebrow}>AI Chat • CRM • Follow-Up • SaaS Dashboard</p>
          <h1 style={h1}>Turn Your Therapy Website Into a Private-Pay Client Machine</h1>
          <p style={lead}>
            TheraGrowth AI helps therapists capture leads, follow up faster, track inquiries,
            and convert more website visitors into booked consultations.
          </p>

          <div style={buttons}>
            <a href="/pricing" style={primaryButton}>See SaaS Plans</a>
            <a href="#audit" style={secondaryButton}>Request Free Audit</a>
          </div>
        </div>

        <div style={heroCard}>
          <div style={logoLarge}>TG</div>
          <h2 style={cardTitle}>A complete client acquisition engine for private practices.</h2>
          <ul style={list}>
            <li>Lead capture dashboard</li>
            <li>CRM pipeline tracking</li>
            <li>AI follow-up writer</li>
            <li>Monthly SaaS plans</li>
            <li>Stripe subscription billing</li>
          </ul>
          <a href="/pricing" style={primaryButton}>Start Monthly SaaS</a>
        </div>
      </section>

      <section id="services" style={darkSection}>
        <p style={eyebrow}>Services</p>
        <h2 style={h2White}>What We Build For Therapists</h2>

        <div style={grid}>
          <Card title="TheraGrowth OS SaaS" text="Monthly software for lead tracking, CRM, AI follow-up, chatbot support, and practice growth analytics." />
          <Card title="CRM + Follow-Up" text="Track new leads, contacted leads, booked audits, proposals, won clients, and follow-up reminders." />
          <Card title="AI Follow-Up Writer" text="Generate warm replies, no-response follow-ups, consultation reminders, and reactivation messages." />
          <Card title="Website Conversion" text="Improve homepage copy, calls-to-action, forms, trust signals, and private-pay positioning." />
          <Card title="AI Chat Support" text="Help website visitors ask questions and move toward booking or submitting an inquiry." />
          <Card title="Growth Dashboard" text="See leads, revenue, conversion status, growth score, and next actions in one dashboard." />
        </div>
      </section>

      <section style={section}>
        <p style={eyebrow}>Monthly SaaS</p>
        <h2 style={h2}>Choose Your TheraGrowth OS Plan</h2>
        <p style={lead}>
          Start with monthly software. Upgrade later when you need more automation, support,
          and growth tracking.
        </p>

        <div style={pricingGrid}>
          <Plan title="Starter" price="$99/mo" text="Lead dashboard, CRM pipeline, basic AI follow-up writer, monthly growth score." />
          <Plan title="Growth" price="$199/mo" text="Chatbot widget, advanced lead automation, follow-up sequences, analytics, priority support." featured />
          <Plan title="Pro" price="$399/mo" text="Multi-user access, team lead routing, revenue reporting, VIP support, monthly strategy review." />
        </div>

        <a href="/pricing" style={primaryButton}>Go To SaaS Pricing Page</a>
      </section>

      <section style={section}>
        <p style={eyebrow}>Done-For-You Setup</p>
        <h2 style={h2}>Need Help Setting It Up?</h2>

        <div style={pricingGrid}>
          <Service title="Growth Audit" price="$300" link={stripeLinks.audit} />
          <Service title="Starter Setup" price="$750" link={stripeLinks.starter} featured />
          <Service title="Full Growth Machine" price="$1,500" link={stripeLinks.full} />
        </div>
      </section>

      <section id="audit" style={auditSection}>
        <div>
          <p style={eyebrow}>Free Audit</p>
          <h2 style={h2}>Request Your Free Practice Growth Audit</h2>
          <p style={lead}>
            Submit your practice details and we’ll review your website, funnel, and client
            acquisition system.
          </p>
        </div>

        <form onSubmit={submitLead} style={formStyle}>
          <input style={input} name="full_name" placeholder="Full name" value={form.full_name} onChange={handleChange} required />
          <input style={input} name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required />
          <input style={input} name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
          <input style={input} name="practice_name" placeholder="Practice name" value={form.practice_name} onChange={handleChange} />
          <input style={input} name="website_url" placeholder="Website URL" value={form.website_url} onChange={handleChange} />

          <select style={input} name="budget_range" value={form.budget_range} onChange={handleChange}>
            <option value="">Budget range</option>
            <option value="$99/mo SaaS">$99/mo SaaS</option>
            <option value="$199/mo SaaS">$199/mo SaaS</option>
            <option value="$399/mo SaaS">$399/mo SaaS</option>
            <option value="$300 Audit">$300 Audit</option>
            <option value="$750 Setup">$750 Setup</option>
            <option value="$1500 Full Build">$1500 Full Build</option>
          </select>

          <textarea style={textarea} name="main_goal" placeholder="What is your biggest growth challenge?" value={form.main_goal} onChange={handleChange} />

          <button style={submitButton} type="submit">Submit Free Audit Request</button>
          {status && <p style={statusText}>{status}</p>}
        </form>
      </section>

      <footer style={footer}>
        <div style={logoFooter}>TG</div>
        <div>
          <strong>TheraGrowth AI</strong>
          <p style={footerText}>
            Helping therapists get more private-pay clients through SaaS, AI chat, CRM,
            follow-up, and growth systems.
          </p>
          <a href="https://www.instagram.com/theragrowth.ai/" target="_blank" style={footerLink}>
            Follow us on Instagram @theragrowth.ai
          </a>
        </div>
      </footer>
    </main>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div style={darkCard}>
      <h3 style={goldTitle}>{title}</h3>
      <p style={whiteText}>{text}</p>
    </div>
  );
}

function Plan({ title, price, text, featured }: { title: string; price: string; text: string; featured?: boolean }) {
  return (
    <div style={featured ? planFeatured : planCard}>
      <h3 style={planTitle}>{title}</h3>
      <p style={priceText}>{price}</p>
      <p style={planText}>{text}</p>
      <a href="/pricing" style={featured ? lightButton : primaryButton}>Start {title}</a>
    </div>
  );
}

function Service({ title, price, link, featured }: { title: string; price: string; link: string; featured?: boolean }) {
  return (
    <div style={featured ? planFeatured : planCard}>
      <h3 style={planTitle}>{title}</h3>
      <p style={priceText}>{price}</p>
      <p style={planText}>Done-for-you service package to support your growth system.</p>
      <a href={link} target="_blank" style={featured ? lightButton : primaryButton}>Pay Now</a>
    </div>
  );
}

const gold = "#b8892e";
const black = "#111";
const cream = "#f7f1e8";
const soft = "#fffaf2";

const page = { background: cream, color: black, fontFamily: "Arial, sans-serif" } as const;
const header = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 6%", borderBottom: "1px solid #dfcfb7", background: "rgba(247,241,232,.96)", position: "sticky", top: 0, zIndex: 50 } as const;
const brand = { display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: black } as const;
const logo = { width: 56, height: 56, borderRadius: "50%", background: black, color: gold, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 900 } as const;
const small = { margin: 0, color: "#6b5b48", fontSize: 13 } as const;
const nav = { display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" } as const;
const navLink = { color: black, textDecoration: "none", fontWeight: 900 } as const;
const navButton = { ...navLink, border: "1px solid #d8c4a6", borderRadius: 999, padding: "12px 18px" } as const;

const hero = { minHeight: "78vh", display: "grid", gridTemplateColumns: "1.35fr .9fr", gap: 46, alignItems: "center", padding: "90px 6%" } as const;
const eyebrow = { color: gold, textTransform: "uppercase", letterSpacing: 3, fontWeight: 900, fontSize: 14 } as const;
const h1 = { fontFamily: "Georgia, serif", fontSize: "clamp(54px, 7vw, 98px)", lineHeight: .95, margin: "14px 0 22px" } as const;
const h2 = { fontFamily: "Georgia, serif", fontSize: "clamp(42px, 6vw, 72px)", lineHeight: 1, margin: "12px 0 24px" } as const;
const h2White = { ...h2, color: "white" } as const;
const lead = { fontSize: 20, lineHeight: 1.7, color: "#2f281f", maxWidth: 900 } as const;
const buttons = { display: "flex", gap: 14, flexWrap: "wrap", marginTop: 28 } as const;
const primaryButton = { display: "inline-block", background: black, color: "white", textDecoration: "none", padding: "16px 24px", borderRadius: 16, fontWeight: 900 } as const;
const secondaryButton = { display: "inline-block", background: "#eadfce", color: black, textDecoration: "none", padding: "16px 24px", borderRadius: 16, fontWeight: 900 } as const;
const lightButton = { display: "inline-block", background: "white", color: black, textDecoration: "none", padding: "16px 24px", borderRadius: 16, fontWeight: 900 } as const;

const heroCard = { background: soft, border: "1px solid #dfcaa8", borderRadius: 30, padding: 42, boxShadow: "0 30px 80px rgba(0,0,0,.08)" } as const;
const logoLarge = { ...logo, width: 72, height: 72, fontSize: 32, marginBottom: 26 } as const;
const cardTitle = { fontFamily: "Georgia, serif", fontSize: 36, lineHeight: 1.05 } as const;
const list = { lineHeight: 2, fontSize: 17 } as const;

const darkSection = { background: black, color: "white", padding: "90px 6%" } as const;
const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 22, marginTop: 34 } as const;
const darkCard = { background: "#1b1b1b", border: "1px solid #3a3228", borderRadius: 24, padding: 30 } as const;
const goldTitle = { color: gold, fontSize: 26 } as const;
const whiteText = { lineHeight: 1.7, fontSize: 17 } as const;

const section = { padding: "85px 6%" } as const;
const pricingGrid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 22, marginTop: 30 } as const;
const planCard = { background: soft, border: "1px solid #dfcaa8", borderRadius: 28, padding: 32 } as const;
const planFeatured = { ...planCard, background: black, color: "white", boxShadow: "0 30px 80px rgba(0,0,0,.18)" } as const;
const planTitle = { fontSize: 28, lineHeight: 1.1 } as const;
const priceText = { fontFamily: "Georgia, serif", color: gold, fontSize: 48, fontWeight: 900, margin: "12px 0" } as const;
const planText = { fontSize: 17, lineHeight: 1.7, marginBottom: 24 } as const;

const auditSection = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, padding: "90px 6%", background: "#fffaf2" } as const;
const formStyle = { display: "grid", gap: 14 } as const;
const input = { width: "100%", padding: 17, borderRadius: 14, border: "1px solid #d7c4a8", background: "#fffaf5", fontSize: 16, boxSizing: "border-box" } as const;
const textarea = { ...input, minHeight: 130 } as const;
const submitButton = { background: black, color: "white", border: "none", padding: 18, borderRadius: 16, fontWeight: 900, fontSize: 16, cursor: "pointer" } as const;
const statusText = { color: gold, fontWeight: 900 } as const;

const footer = { display: "flex", gap: 20, alignItems: "center", background: black, color: "white", padding: "36px 6%" } as const;
const logoFooter = { ...logo, background: "white", color: gold } as const;
const footerText = { color: "#e8dfd0" } as const;
const footerLink = { color: gold, fontWeight: 900, textDecoration: "none" } as const;