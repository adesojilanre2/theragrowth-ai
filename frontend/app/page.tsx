"use client";

import React, { useState } from "react";

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
        headers: {
          "Content-Type": "application/json",
        },
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
          budget: "Free Audit Only",
          challenge: "",
        });
      } else {
        setMessage(`❌ ${data.message || "Something went wrong."}`);
      }
    } catch {
      setMessage("❌ Server error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={page}>
      <header style={header}>
        <div style={brandWrap}>
          <div style={logo}>TG</div>
          <div>
            <h1 style={brand}>TheraGrowth AI</h1>
            <p style={tagline}>SaaS Growth System for Therapists</p>
          </div>
        </div>

        <nav style={nav}>
          <a href="#services" style={navLink}>Services</a>
          <a href="#pricing" style={navLink}>SaaS Pricing</a>
          <a href="#signup" style={navLink}>Signup</a>
          <a href="#dashboard" style={navLink}>Dashboard</a>
          <a href="#audit" style={auditNav}>Free Audit</a>
        </nav>
      </header>

      <section style={hero}>
        <div>
          <p style={eyebrow}>AI CHAT • FOLLOW-UP • CLIENT ACQUISITION SYSTEM</p>
          <h2 style={heroTitle}>
            Turn Your Therapy Website Into a Private-Pay Client Machine
          </h2>
          <p style={heroText}>
            TheraGrowth AI helps therapists capture leads, follow up faster,
            track inquiries, and convert more website visitors into booked consultations.
          </p>
          <a href="#audit" style={primaryButton}>Request Free Audit</a>
        </div>

        <div style={heroCard}>
          <div style={logo}>TG</div>
          <h3 style={heroCardTitle}>
            A complete client acquisition engine for private practices.
          </h3>
          <ul style={heroList}>
            <li>Lead capture system</li>
            <li>Client inquiry tracking</li>
            <li>AI follow-up support</li>
            <li>Monthly SaaS plans</li>
            <li>Stripe payment links</li>
          </ul>
          <a href="#pricing" style={primaryButton}>Start Monthly SaaS</a>
        </div>
      </section>

      <section id="services" style={section}>
        <p style={eyebrow}>SERVICES</p>
        <h2 style={sectionTitle}>What TheraGrowth AI Builds</h2>

        <div style={grid3}>
          <div style={card}>
            <h3>Website Conversion Audit</h3>
            <p>
              We review the therapist website, offer, calls-to-action, speed,
              trust signals, and booking flow.
            </p>
          </div>

          <div style={card}>
            <h3>AI Chat Lead Capture</h3>
            <p>
              Website visitors can ask questions and submit inquiries directly
              into the lead system.
            </p>
          </div>

          <div style={card}>
            <h3>Client Follow-Up System</h3>
            <p>
              Track every inquiry, next action, lead status, and follow-up date
              so no client is forgotten.
            </p>
          </div>
        </div>
      </section>

      <section id="pricing" style={darkSection}>
        <p style={eyebrow}>SAAS PRICING</p>
        <h2 style={darkTitle}>Simple Monthly Growth Plans</h2>

        <div style={pricingGrid}>
          <div style={priceCard}>
            <h3>Starter</h3>
            <h2>$99/mo</h2>
            <p>Capture and convert more private-pay client inquiries automatically.</p>

            <ul style={list}>
              <li>Lead capture system</li>
              <li>Client inquiry tracking</li>
              <li>Follow-up support</li>
              <li>Practice growth audit included</li>
            </ul>

            <a
              href="https://buy.stripe.com/8x28wR8eVd12beV4df2sM06"
              target="_blank"
              rel="noopener noreferrer"
              style={payButton}
            >
              Start Starter Plan
            </a>
          </div>

          <div style={{ ...priceCard, border: "2px solid #c7962b" }}>
            <p style={badge}>MOST POPULAR</p>
            <h3>Growth</h3>
            <h2>$299/mo</h2>
            <p>Scale your practice with a complete client acquisition system.</p>

            <ul style={list}>
              <li>Everything in Starter</li>
              <li>AI follow-up support</li>
              <li>Lead conversion tracking</li>
              <li>Monthly growth optimization</li>
            </ul>

            <a
              href="https://buy.stripe.com/3cI6oJdzff9a1ElfVX2sM09"
              target="_blank"
              rel="noopener noreferrer"
              style={payButton}
            >
              Start Growth Plan
            </a>
          </div>

          <div style={priceCard}>
            <h3>Done-With-You</h3>
            <h2>$750+</h2>
            <p>We help build and optimize your full client acquisition system.</p>

            <ul style={list}>
              <li>Website funnel optimization</li>
              <li>Lead capture setup</li>
              <li>Follow-up system setup</li>
              <li>1:1 implementation support</li>
            </ul>

            <a
              href="https://buy.stripe.com/dRmaEZ8eVf9a82JfVX2sM0a"
              target="_blank"
              rel="noopener noreferrer"
              style={payButton}
            >
              Get Done-With-You Setup
            </a>
          </div>
        </div>
      </section>

      <section id="signup" style={section}>
        <p style={eyebrow}>SIGNUP</p>
        <h2 style={sectionTitle}>How Clients Start</h2>

        <div style={grid3}>
          <div style={card}>
            <h3>1. Submit Audit</h3>
            <p>The therapist sends website and practice details.</p>
          </div>

          <div style={card}>
            <h3>2. Receive Growth Review</h3>
            <p>You review their site and explain where leads are being lost.</p>
          </div>

          <div style={card}>
            <h3>3. Sell the System</h3>
            <p>Offer SaaS, setup, or monthly growth support.</p>
          </div>
        </div>
      </section>

      <section id="dashboard" style={dashboardSection}>
        <p style={eyebrow}>DASHBOARD</p>
        <h2 style={sectionTitle}>TheraGrowth Client Acquisition Dashboard</h2>

        <div style={grid3}>
          <div style={card}>
            <h3>New Leads</h3>
            <h2>0</h2>
          </div>

          <div style={card}>
            <h3>Follow-Ups Due</h3>
            <h2>0</h2>
          </div>

          <div style={card}>
            <h3>Booked Calls</h3>
            <h2>0</h2>
          </div>
        </div>
      </section>

      <section id="audit" style={auditSection}>
        <div>
          <p style={eyebrow}>FREE AUDIT</p>
          <h2 style={auditTitle}>Request Your Free Practice Growth Audit</h2>
          <p style={heroText}>
            Submit your practice details and we’ll review your website, funnel,
            and client acquisition system.
          </p>
        </div>

        <form onSubmit={handleAuditSubmit} style={formStyle}>
          <input
            name="name"
            value={form.name}
            onChange={updateField}
            placeholder="Full Name"
            required
            style={input}
          />

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={updateField}
            placeholder="Business Email"
            required
            style={input}
          />

          <input
            name="phone"
            value={form.phone}
            onChange={updateField}
            placeholder="Phone Number"
            style={input}
          />

          <input
            name="practice"
            value={form.practice}
            onChange={updateField}
            placeholder="Therapy Niche"
            required
            style={input}
          />

          <input
            name="website"
            value={form.website}
            onChange={updateField}
            placeholder="Website URL"
            style={input}
          />

          <select
            name="budget"
            value={form.budget}
            onChange={updateField}
            style={input}
          >
            <option>Free Audit Only</option>
            <option>$99/mo Starter</option>
            <option>$299/mo Growth</option>
            <option>$750+ Done-With-You</option>
          </select>

          <textarea
            name="challenge"
            value={form.challenge}
            onChange={updateField}
            placeholder="What do you need help with?"
            required
            style={textarea}
          />

          <button type="submit" disabled={loading} style={submitBtn}>
            {loading ? "Submitting..." : "Submit Free Audit Request"}
          </button>

          {message && <p style={messageStyle}>{message}</p>}
        </form>
      </section>

      <footer style={footer}>
        <strong>TheraGrowth AI</strong>
        <p>
          Helping therapists get more private-pay clients through SaaS, AI chat,
          follow-up, and growth systems.
        </p>

        <p style={{ marginTop: 16 }}>
          <a
            href="https://instagram.com/theragrowth.ai"
            target="_blank"
            rel="noopener noreferrer"
            style={footerLink}
          >
            Instagram: @theragrowth.ai
          </a>
        </p>

        <p>
          Email:{" "}
          <a href="mailto:hello@theragrowth-ai.com" style={footerLink}>
            hello@theragrowth-ai.com
          </a>
        </p>
      </footer>
    </main>
  );
}

const page = {
  background: "#fffaf2",
  color: "#111",
  minHeight: "100vh",
  fontFamily: "Arial, sans-serif",
} as const;

const header = {
  position: "sticky",
  top: 0,
  zIndex: 10,
  background: "#fffaf2",
  borderBottom: "1px solid #d7c4a8",
  padding: "28px 6%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 24,
} as const;

const brandWrap = {
  display: "flex",
  alignItems: "center",
  gap: 14,
} as const;

const logo = {
  width: 70,
  height: 70,
  borderRadius: "50%",
  background: "#111",
  color: "#c7962b",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Georgia, serif",
  fontSize: 28,
  fontWeight: 900,
} as const;

const brand = {
  margin: 0,
  fontSize: 20,
  fontWeight: 900,
} as const;

const tagline = {
  margin: 0,
  color: "#555",
  fontSize: 16,
} as const;

const nav = {
  display: "flex",
  gap: 26,
  alignItems: "center",
  flexWrap: "wrap",
} as const;

const navLink = {
  color: "#111",
  fontWeight: 900,
  textDecoration: "none",
} as const;

const auditNav = {
  color: "#111",
  fontWeight: 900,
  textDecoration: "none",
  border: "1px solid #d7c4a8",
  borderRadius: 30,
  padding: "14px 24px",
} as const;

const hero = {
  display: "grid",
  gridTemplateColumns: "1.3fr .8fr",
  gap: 60,
  padding: "100px 6%",
  alignItems: "center",
} as const;

const eyebrow = {
  color: "#c7962b",
  fontWeight: 900,
  letterSpacing: 5,
  fontSize: 16,
} as const;

const heroTitle = {
  fontFamily: "Georgia, serif",
  fontSize: 76,
  lineHeight: 1,
  margin: "20px 0",
} as const;

const heroText = {
  fontSize: 20,
  lineHeight: 1.7,
  color: "#23344d",
} as const;

const primaryButton = {
  display: "inline-block",
  marginTop: 20,
  background: "#111",
  color: "white",
  padding: "18px 28px",
  borderRadius: 14,
  textDecoration: "none",
  fontWeight: 900,
} as const;

const heroCard = {
  background: "white",
  border: "1px solid #d7c4a8",
  borderRadius: 28,
  padding: 42,
} as const;

const heroCardTitle = {
  fontFamily: "Georgia, serif",
  fontSize: 34,
  lineHeight: 1.1,
} as const;

const heroList = {
  lineHeight: 2,
  fontSize: 17,
} as const;

const section = {
  padding: "90px 6%",
} as const;

const sectionTitle = {
  fontFamily: "Georgia, serif",
  fontSize: 56,
  lineHeight: 1.1,
} as const;

const grid3 = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 24,
  marginTop: 34,
} as const;

const card = {
  background: "white",
  border: "1px solid #d7c4a8",
  borderRadius: 24,
  padding: 32,
  fontSize: 18,
  lineHeight: 1.6,
} as const;

const darkSection = {
  background: "#111",
  color: "white",
  padding: "90px 6%",
} as const;

const darkTitle = {
  fontFamily: "Georgia, serif",
  fontSize: 56,
  lineHeight: 1.1,
  color: "white",
} as const;

const pricingGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 24,
  marginTop: 40,
} as const;

const priceCard = {
  background: "#1b1b1b",
  border: "1px solid #333",
  borderRadius: 24,
  padding: 32,
  color: "white",
} as const;

const list = {
  lineHeight: 1.9,
  marginTop: 18,
  marginBottom: 28,
} as const;

const payButton = {
  display: "inline-block",
  background: "#c7962b",
  color: "black",
  padding: "14px 22px",
  borderRadius: 14,
  fontWeight: 900,
  textDecoration: "none",
} as const;

const badge = {
  color: "#c7962b",
  fontWeight: 900,
  letterSpacing: 2,
  marginBottom: 12,
} as const;

const dashboardSection = {
  padding: "90px 6%",
  background: "#fff2df",
} as const;

const auditSection = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 60,
  padding: "100px 6%",
} as const;

const auditTitle = {
  fontFamily: "Georgia, serif",
  fontSize: 60,
  lineHeight: 1.05,
} as const;

const formStyle = {
  display: "grid",
  gap: 16,
} as const;

const input = {
  width: "100%",
  padding: 18,
  borderRadius: 14,
  border: "1px solid #d7c4a8",
  fontSize: 16,
} as const;

const textarea = {
  width: "100%",
  padding: 18,
  borderRadius: 14,
  border: "1px solid #d7c4a8",
  fontSize: 16,
  minHeight: 150,
} as const;

const submitBtn = {
  background: "#111",
  color: "white",
  border: "none",
  padding: 20,
  borderRadius: 14,
  fontWeight: 900,
  fontSize: 18,
  cursor: "pointer",
} as const;

const messageStyle = {
  color: "#b88716",
  fontWeight: 900,
  fontSize: 18,
} as const;

const footer = {
  background: "#111",
  color: "white",
  padding: "42px 6%",
  lineHeight: 1.8,
} as const;

const footerLink = {
  color: "#c7962b",
  fontWeight: 900,
} as const;