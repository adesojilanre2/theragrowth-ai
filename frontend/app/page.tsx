"use client";

import React, { useState } from "react";

type AuditForm = {
  name: string;
  email: string;
  phone: string;
  practice: string;
  website: string;
  budget: string;
  challenge: string;
};

export default function HomePage() {
  const [form, setForm] = useState<AuditForm>({
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
    } catch (error) {
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
            <strong>TheraGrowth AI</strong>
            <p style={tagline}>SaaS Growth System for Therapists</p>
          </div>
        </div>

        <nav style={nav}>
          <a href="#services" style={navLink}>Services</a>
          <a href="#pricing" style={navLink}>SaaS Pricing</a>
          <a href="#signup" style={navLink}>Signup</a>
          <a href="#dashboard" style={navLink}>Dashboard</a>
          <a href="#audit" style={auditButton}>Free Audit</a>
        </nav>
      </header>

      <section style={hero}>
        <div>
          <p style={eyebrow}>AI CHAT • CRM • FOLLOW-UP • SAAS DASHBOARD</p>
          <h1 style={heroTitle}>
            Turn Your Therapy Website Into a Private-Pay Client Machine
          </h1>
          <p style={heroText}>
            TheraGrowth AI helps therapists capture leads, follow up faster,
            track inquiries, and convert more website visitors into booked
            consultations.
          </p>
          <a href="#audit" style={primaryButton}>Request Free Audit</a>
        </div>

        <div style={heroCard}>
          <div style={logoSmall}>TG</div>
          <h2 style={cardTitle}>
            A complete client acquisition engine for private practices.
          </h2>
          <ul style={list}>
            <li>Lead capture dashboard</li>
            <li>CRM pipeline tracking</li>
            <li>AI follow-up writer</li>
            <li>Monthly SaaS plans</li>
            <li>Stripe subscription billing</li>
          </ul>
          <a href="#pricing" style={darkButton}>Start Monthly SaaS</a>
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
            <h3>CRM Follow-Up System</h3>
            <p>
              Track every inquiry, next action, lead status, and follow-up date
              so no client is forgotten.
            </p>
          </div>
        </div>
      </section>

      <section id="pricing" style={darkSection}>
        <p style={eyebrowGold}>SAAS PRICING</p>
        <h2 style={darkTitle}>Simple Monthly Growth Plans</h2>

        <div style={grid3}>
          <div style={priceCard}>
            <h3>Starter</h3>
            <h2>$99/mo</h2>
            <p>Lead capture + basic CRM.</p>
          </div>

          <div style={priceCard}>
            <h3>Growth</h3>
            <h2>$299/mo</h2>
            <p>CRM + AI follow-up + audit support.</p>
          </div>

          <div style={priceCard}>
            <h3>Done-With-You</h3>
            <h2>$750+</h2>
            <p>Website optimization + full growth system setup.</p>
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

      <section id="dashboard" style={sectionSoft}>
        <p style={eyebrow}>DASHBOARD</p>
        <h2 style={sectionTitle}>TheraGrowth CRM Dashboard</h2>

        <div style={dashboardBox}>
          <div style={statCard}>
            <h3>New Leads</h3>
            <strong>0</strong>
          </div>

          <div style={statCard}>
            <h3>Follow-Ups Due</h3>
            <strong>0</strong>
          </div>

          <div style={statCard}>
            <h3>Booked Calls</h3>
            <strong>0</strong>
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
            style={input}
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={updateField}
            required
          />

          <input
            style={input}
            name="email"
            type="email"
            placeholder="Business Email"
            value={form.email}
            onChange={updateField}
            required
          />

          <input
            style={input}
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={updateField}
          />

          <input
            style={input}
            name="practice"
            placeholder="Therapy Niche"
            value={form.practice}
            onChange={updateField}
          />

          <input
            style={input}
            name="website"
            placeholder="Website URL"
            value={form.website}
            onChange={updateField}
          />

          <select
            style={input}
            name="budget"
            value={form.budget}
            onChange={updateField}
          >
            <option>Free Audit Only</option>
            <option>$99/mo SaaS</option>
            <option>$299/mo Growth Plan</option>
            <option>$750+ Done-With-You Setup</option>
          </select>

          <textarea
            style={textarea}
            name="challenge"
            placeholder="What do you need help with?"
            value={form.challenge}
            onChange={updateField}
          />

          <button type="submit" style={submitButton} disabled={loading}>
            {loading ? "Submitting..." : "Submit Free Audit Request"}
          </button>

          {message && <p style={messageStyle}>{message}</p>}
        </form>
      </section>

      <footer style={footer}>
        <strong>TheraGrowth AI</strong>
        <p>
          Helping therapists get more private-pay clients through SaaS, AI chat,
          CRM, follow-up, and growth systems.
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

        <p style={{ marginTop: 8 }}>
          Email:{" "}
          <a href="mailto:hello@theragrowth-ai.com" style={footerLink}>
            hello@theragrowth-ai.com
          </a>
        </p>
      </footer>
    </main>
  );
}

const gold = "#c7962b";
const cream = "#fffaf2";
const black = "#111";
const border = "#d7c4a8";

const page: React.CSSProperties = {
  background: cream,
  color: black,
  fontFamily: "Arial, sans-serif",
};

const header: React.CSSProperties = {
  position: "sticky",
  top: 0,
  zIndex: 50,
  background: cream,
  borderBottom: `1px solid ${border}`,
  padding: "24px 6%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const brandWrap: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 14,
};

const logo: React.CSSProperties = {
  width: 64,
  height: 64,
  borderRadius: "50%",
  background: black,
  color: gold,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Georgia, serif",
  fontSize: 28,
  fontWeight: 900,
};

const logoSmall: React.CSSProperties = {
  width: 72,
  height: 72,
  borderRadius: "50%",
  background: black,
  color: gold,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Georgia, serif",
  fontSize: 30,
  fontWeight: 900,
  marginBottom: 24,
};

const tagline: React.CSSProperties = {
  margin: 0,
  color: "#555",
};

const nav: React.CSSProperties = {
  display: "flex",
  gap: 24,
  alignItems: "center",
  flexWrap: "wrap",
};

const navLink: React.CSSProperties = {
  color: black,
  fontWeight: 900,
  textDecoration: "none",
};

const auditButton: React.CSSProperties = {
  color: black,
  border: `1px solid ${border}`,
  borderRadius: 999,
  padding: "14px 24px",
  fontWeight: 900,
  textDecoration: "none",
};

const hero: React.CSSProperties = {
  padding: "100px 6%",
  display: "grid",
  gridTemplateColumns: "1.2fr 0.8fr",
  gap: 60,
  alignItems: "center",
};

const eyebrow: React.CSSProperties = {
  color: gold,
  fontWeight: 900,
  letterSpacing: 4,
};

const eyebrowGold: React.CSSProperties = {
  color: gold,
  fontWeight: 900,
  letterSpacing: 4,
};

const heroTitle: React.CSSProperties = {
  fontFamily: "Georgia, serif",
  fontSize: 82,
  lineHeight: 1,
  margin: "20px 0",
};

const heroText: React.CSSProperties = {
  fontSize: 20,
  lineHeight: 1.7,
  maxWidth: 760,
};

const heroCard: React.CSSProperties = {
  background: "#fffaf5",
  border: `1px solid ${border}`,
  borderRadius: 28,
  padding: 42,
};

const cardTitle: React.CSSProperties = {
  fontFamily: "Georgia, serif",
  fontSize: 34,
  lineHeight: 1.15,
};

const list: React.CSSProperties = {
  lineHeight: 2,
  fontSize: 17,
};

const primaryButton: React.CSSProperties = {
  display: "inline-block",
  marginTop: 24,
  background: black,
  color: "white",
  padding: "18px 28px",
  borderRadius: 14,
  textDecoration: "none",
  fontWeight: 900,
};

const darkButton: React.CSSProperties = {
  display: "inline-block",
  marginTop: 20,
  background: black,
  color: "white",
  padding: "16px 24px",
  borderRadius: 14,
  textDecoration: "none",
  fontWeight: 900,
};

const section: React.CSSProperties = {
  padding: "80px 6%",
};

const sectionSoft: React.CSSProperties = {
  padding: "80px 6%",
  background: "#fff5e6",
};

const sectionTitle: React.CSSProperties = {
  fontFamily: "Georgia, serif",
  fontSize: 54,
  margin: "10px 0 30px",
};

const grid3: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 24,
};

const card: React.CSSProperties = {
  background: "white",
  border: `1px solid ${border}`,
  borderRadius: 24,
  padding: 30,
  fontSize: 17,
  lineHeight: 1.7,
};

const darkSection: React.CSSProperties = {
  padding: "80px 6%",
  background: black,
  color: "white",
};

const darkTitle: React.CSSProperties = {
  fontFamily: "Georgia, serif",
  fontSize: 54,
};

const priceCard: React.CSSProperties = {
  background: "#1b1b1b",
  border: "1px solid #333",
  borderRadius: 24,
  padding: 30,
};

const dashboardBox: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 24,
};

const statCard: React.CSSProperties = {
  background: "white",
  border: `1px solid ${border}`,
  borderRadius: 24,
  padding: 30,
};

const auditSection: React.CSSProperties = {
  padding: "100px 6%",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 60,
  alignItems: "start",
};

const auditTitle: React.CSSProperties = {
  fontFamily: "Georgia, serif",
  fontSize: 64,
  lineHeight: 1.05,
  margin: "10px 0",
};

const formStyle: React.CSSProperties = {
  display: "grid",
  gap: 16,
};

const input: React.CSSProperties = {
  width: "100%",
  padding: 18,
  borderRadius: 14,
  border: `1px solid ${border}`,
  fontSize: 16,
  background: "white",
};

const textarea: React.CSSProperties = {
  width: "100%",
  padding: 18,
  borderRadius: 14,
  border: `1px solid ${border}`,
  fontSize: 16,
  minHeight: 150,
  background: "white",
};

const submitButton: React.CSSProperties = {
  background: black,
  color: "white",
  border: "none",
  padding: 20,
  borderRadius: 14,
  fontWeight: 900,
  fontSize: 18,
  cursor: "pointer",
};

const messageStyle: React.CSSProperties = {
  fontWeight: 900,
  color: gold,
};

const footer: React.CSSProperties = {
  background: black,
  color: "white",
  padding: "40px 6%",
};

const footerLink: React.CSSProperties = {
  color: gold,
  fontWeight: 900,
};