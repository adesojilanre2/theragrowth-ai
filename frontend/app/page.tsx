"use client";
import { supabase } from "../lib/supabase";
import React, { useState } from "react";
import ChatWidget from "../components/ChatWidget";

const STRIPE_STARTER = "https://buy.stripe.com/8x28wR8eVd12beV4df2sM06";
const STRIPE_GROWTH = "https://buy.stripe.com/3cl6oJdzff9a1ElFVX2sM09";
const STRIPE_DONE_WITH_YOU = "https://buy.stripe.com/dRmaEZ8eVf9a82JfVX2sM0a";

export default function HomePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    practice: "",
    website: "",
    budget: "Free Audit Only",
    challenge: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleAuditSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const res = await fetch("/api/audit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        user_id: user?.id || null,
        owner_email: user?.email || null,
        source: "free_audit",
      }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      setMessage("❌ Submission failed. Please try again.");
      setLoading(false);
      return;
    }

    setMessage("✅ Request submitted successfully.");

    setForm({
      name: "",
      email: "",
      phone: "",
      practice: "",
      website: "",
      budget: "Free Audit Only",
      challenge: "",
    });
  } catch {
    setMessage("❌ Something went wrong. Please try again.");
  }

  setLoading(false);
}

  return (
    <main style={styles.main}>
      <header style={styles.header}>
        <a href="#top" style={styles.brand}>
          <div style={styles.logo}>TG</div>
          <div>
            <strong>TheraGrowth AI</strong>
            <p style={styles.smallText}>Client Acquisition System for Therapists</p>
          </div>
        </a>

        <nav style={styles.nav}>
          <a href="#services">Services</a>
          <a href="#pricing">Pricing</a>
          <a href="#process">Process</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/signup">Signup</a>
          <a href="/login">Login</a>
          <a href="#audit" style={styles.outlineButton}>Free Audit</a>
        </nav>
      </header>

      <section id="top" style={styles.hero}>
        <div>
          <p style={styles.goldLabel}>AI CHAT • FOLLOW-UP • CLIENT ACQUISITION SYSTEM</p>
          <h1 style={styles.h1}>Turn Your Therapy Website Into a Private-Pay Client Machine</h1>
          <p style={styles.lead}>
            TheraGrowth AI helps therapists capture leads, follow up faster, track inquiries,
            and convert more website visitors into booked consultations.
          </p>

          <div style={styles.buttonRow}>
            <a href="#audit" style={styles.blackButton}>Request Free Audit</a>
            <a href="#pricing" style={styles.lightButton}>View Growth Plans</a>
          </div>
        </div>

        <div style={styles.heroCard}>
          <div style={styles.logo}>TG</div>
          <h2 style={styles.h2}>A complete client acquisition engine for private practices.</h2>
          <p>Lead capture system</p>
          <p>Client inquiry tracking</p>
          <p>AI follow-up support</p>
          <p>Monthly growth plans</p>
          <p>Stripe subscription billing</p>
          <a href={STRIPE_GROWTH} target="_blank" rel="noopener noreferrer" style={styles.blackButton}>
            Start Monthly SaaS
          </a>
        </div>
      </section>

      <section id="services" style={styles.section}>
        <p style={styles.goldLabel}>SERVICES</p>
        <h2 style={styles.h2}>What TheraGrowth AI Builds</h2>

        <div style={styles.grid3}>
          <div style={styles.card}>
            <h3>Website Conversion Audit</h3>
            <p>We review your therapist website, offer, calls-to-action, trust signals, speed, and booking flow.</p>
          </div>

          <div style={styles.card}>
            <h3>AI Chat Lead Capture</h3>
            <p>Website visitors can ask questions and submit inquiries directly into your lead system.</p>
          </div>

          <div style={styles.card}>
            <h3>Follow-Up System</h3>
            <p>Track every inquiry, next action, lead status, and follow-up date so no potential client is forgotten.</p>
          </div>
        </div>
      </section>

      <section id="pricing" style={styles.darkSection}>
        <p style={styles.goldLabel}>SAAS PRICING</p>
        <h2 style={styles.h2Light}>Simple Monthly Growth Plans</h2>

        <div style={styles.grid3}>
          <div style={styles.darkCard}>
            <h3>Starter</h3>
            <h2>$99/mo</h2>
            <p>Start getting more private-pay client inquiries from your website.</p>
            <ul>
              <li>Capture new client inquiries automatically</li>
              <li>Track every potential client in one place</li>
              <li>Never miss a follow-up opportunity</li>
              <li>Practice growth audit included</li>
            </ul>
            <a href={STRIPE_STARTER} target="_blank" rel="noopener noreferrer" style={styles.goldButton}>
              Start Starter Plan
            </a>
          </div>

          <div style={styles.darkCard}>
            <p style={styles.goldLabel}>MOST POPULAR</p>
            <h3>Growth</h3>
            <h2>$299/mo</h2>
            <p>Turn more website visitors into booked therapy sessions.</p>
            <ul>
              <li>Everything in Starter</li>
              <li>AI-assisted follow-up support</li>
              <li>Convert more inquiries into paying clients</li>
              <li>Ongoing growth optimization</li>
            </ul>
            <a href={STRIPE_GROWTH} target="_blank" rel="noopener noreferrer" style={styles.goldButton}>
              Start Growth Plan
            </a>
          </div>

          <div style={styles.darkCard}>
            <h3>Done-With-You</h3>
            <h2>$750+</h2>
            <p>We help you build a complete client acquisition system.</p>
            <ul>
              <li>Optimize your website to convert visitors</li>
              <li>Set up your lead capture system</li>
              <li>Install a follow-up process that books clients</li>
              <li>1:1 support to grow your practice</li>
            </ul>
            <a href={STRIPE_DONE_WITH_YOU} target="_blank" rel="noopener noreferrer" style={styles.goldButton}>
              Get Done-With-You Setup
            </a>
          </div>
        </div>
      </section>

      <section id="process" style={styles.section}>
        <p style={styles.goldLabel}>PROCESS</p>
        <h2 style={styles.h2}>How Clients Start</h2>

        <div style={styles.grid3}>
          <div style={styles.card}>
            <h3>1. Submit Audit</h3>
            <p>The therapist sends website and practice details.</p>
          </div>

          <div style={styles.card}>
            <h3>2. Receive Growth Review</h3>
            <p>You review their site and explain where leads are being lost.</p>
          </div>

          <div style={styles.card}>
            <h3>3. Sell the System</h3>
            <p>Offer SaaS, setup, or monthly growth support.</p>
          </div>
        </div>
      </section>

      <section id="mini-dashboard" style={styles.dashboard}>
        <h2 style={styles.h2}>TheraGrowth Client Acquisition Dashboard</h2>

        <div style={styles.grid3}>
          <div style={styles.card}>
            <h3>New Leads</h3>
            <strong style={styles.bigNumber}>0</strong>
          </div>

          <div style={styles.card}>
            <h3>Follow-Ups Due</h3>
            <strong style={styles.bigNumber}>0</strong>
          </div>

          <div style={styles.card}>
            <h3>Booked Calls</h3>
            <strong style={styles.bigNumber}>0</strong>
          </div>
        </div>
      </section>

      <section id="audit" style={styles.auditSection}>
        <div>
          <p style={styles.goldLabel}>FREE AUDIT</p>
          <h2 style={styles.h2}>Request Your Free Practice Growth Audit</h2>
          <p style={styles.lead}>
            Submit your practice details and we will review your website, funnel, and client acquisition system.
          </p>
        </div>

        <form onSubmit={handleAuditSubmit} style={styles.form}>
          <input name="name" placeholder="Full Name" value={form.name} onChange={updateField} required style={styles.input} />
          <input name="email" type="email" placeholder="Business Email" value={form.email} onChange={updateField} required style={styles.input} />
          <input name="phone" placeholder="Phone Number" value={form.phone} onChange={updateField} style={styles.input} />
          <input name="practice" placeholder="Therapy Niche" value={form.practice} onChange={updateField} style={styles.input} />
          <input name="website" placeholder="Website URL" value={form.website} onChange={updateField} style={styles.input} />

          <select name="budget" value={form.budget} onChange={updateField} style={styles.input}>
            <option>Free Audit Only</option>
            <option>Starter - $99/mo</option>
            <option>Growth - $299/mo</option>
            <option>Done-With-You - $750+</option>
          </select>

          <textarea
            name="challenge"
            placeholder="What do you need help with?"
            value={form.challenge}
            onChange={updateField}
            style={styles.textarea}
          />

          <button type="submit" disabled={loading} style={styles.submitButton}>
            {loading ? "Submitting..." : "Submit Free Audit Request"}
          </button>

          {message && <p style={message.includes("✅") ? styles.success : styles.error}>{message}</p>}
        </form>
      </section>

      <footer style={styles.footer}>
        <h3>TheraGrowth AI</h3>
        <p>Helping therapists get more private-pay clients through SaaS, AI chat, follow-up, and growth systems.</p>
        <p><strong>Instagram:</strong> @theragrowth.ai</p>
        <p><strong>Email:</strong> hello@theragrowth-ai.com</p>
      </footer>

      <ChatWidget />
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    background: "#fbf5e9",
    color: "#111111",
    fontFamily: "Arial, Helvetica, sans-serif",
    minHeight: "100vh",
  },
  header: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    background: "rgba(251,245,233,0.96)",
    borderBottom: "1px solid #decba8",
    padding: "22px 7%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    flexWrap: "wrap",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    textDecoration: "none",
    color: "#111111",
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    background: "#0f0f0f",
    color: "#d6a72c",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Georgia, serif",
    fontWeight: 800,
    fontSize: 24,
  },
  smallText: {
    margin: 0,
    color: "#555555",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: 22,
    flexWrap: "wrap",
    fontWeight: 700,
  },
  outlineButton: {
    border: "1px solid #d7c4a8",
    borderRadius: 999,
    padding: "13px 24px",
    textDecoration: "none",
    color: "#111111",
  },
  hero: {
    maxWidth: 1180,
    margin: "0 auto",
    padding: "90px 6%",
    display: "grid",
    gridTemplateColumns: "1.35fr 0.85fr",
    gap: 50,
    alignItems: "center",
  },
  goldLabel: {
    color: "#b88900",
    fontWeight: 900,
    letterSpacing: 5,
    fontSize: 13,
  },
  h1: {
    fontFamily: "Georgia, serif",
    fontSize: 68,
    lineHeight: 0.98,
    margin: "28px 0",
  },
  h2: {
    fontFamily: "Georgia, serif",
    fontSize: 48,
    lineHeight: 1.05,
    margin: "12px 0 24px",
  },
  h2Light: {
    fontFamily: "Georgia, serif",
    fontSize: 48,
    color: "#ffffff",
  },
  lead: {
    fontSize: 20,
    lineHeight: 1.7,
    color: "#0b315c",
  },
  buttonRow: {
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
    marginTop: 28,
  },
  blackButton: {
    display: "inline-block",
    background: "#111111",
    color: "#ffffff",
    padding: "18px 28px",
    borderRadius: 14,
    textDecoration: "none",
    fontWeight: 900,
  },
  lightButton: {
    display: "inline-block",
    border: "1px solid #decba8",
    color: "#111111",
    padding: "18px 28px",
    borderRadius: 14,
    textDecoration: "none",
    fontWeight: 900,
  },
  heroCard: {
    background: "#ffffff",
    border: "1px solid #decba8",
    borderRadius: 28,
    padding: 40,
    boxShadow: "0 20px 60px rgba(0,0,0,0.06)",
  },
  section: {
    maxWidth: 1180,
    margin: "0 auto",
    padding: "80px 6%",
  },
  darkSection: {
    background: "#111111",
    color: "#ffffff",
    padding: "80px 7%",
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 24,
  },
  card: {
    background: "#ffffff",
    border: "1px solid #decba8",
    borderRadius: 24,
    padding: 30,
  },
  darkCard: {
    background: "#1b1b1b",
    border: "1px solid #333333",
    borderRadius: 24,
    padding: 30,
  },
  goldButton: {
    display: "inline-block",
    marginTop: 20,
    background: "#d6a72c",
    color: "#111111",
    padding: "15px 22px",
    borderRadius: 14,
    textDecoration: "none",
    fontWeight: 900,
  },
  dashboard: {
    background: "#fff3df",
    padding: "80px 7%",
  },
  bigNumber: {
    display: "block",
    fontFamily: "Georgia, serif",
    fontSize: 48,
  },
  auditSection: {
    maxWidth: 1180,
    margin: "0 auto",
    padding: "80px 6%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 40,
  },
  form: {
    background: "#ffffff",
    border: "1px solid #decba8",
    borderRadius: 28,
    padding: 32,
  },
  input: {
    width: "100%",
    padding: 18,
    borderRadius: 14,
    border: "1px solid #d7c4a8",
    marginBottom: 14,
    fontSize: 16,
  },
  textarea: {
    width: "100%",
    minHeight: 150,
    padding: 18,
    borderRadius: 14,
    border: "1px solid #d7c4a8",
    marginBottom: 14,
    fontSize: 16,
  },
  submitButton: {
    width: "100%",
    background: "#111111",
    color: "#ffffff",
    padding: 18,
    borderRadius: 14,
    border: "none",
    fontWeight: 900,
    fontSize: 16,
    cursor: "pointer",
  },
  success: {
    color: "green",
    fontWeight: 800,
  },
  error: {
    color: "crimson",
    fontWeight: 800,
  },
  footer: {
    background: "#111111",
    color: "#ffffff",
    padding: "50px 7%",
  },
};