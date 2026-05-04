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

  const stripeStarter = "https://buy.stripe.com/8x28wR8eVd12beV4df2sM06";
  const stripeGrowth = "https://buy.stripe.com/3cI6oJdzff9a1ElfVX2sM09";
  const stripeDoneWithYou = "https://buy.stripe.com/dRmaEZ8eVf9a82JfVX2sM0a";

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
        <a href="#" style={brand}>
          <div style={logo}>TG</div>
          <div>
            <strong>TheraGrowth AI</strong>
            <p style={tagline}>SaaS Growth System for Therapists</p>
          </div>
        </a>

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
          <p style={eyebrow}>AI CHAT • FOLLOW-UP • CLIENT ACQUISITION SYSTEM</p>
          <h1 style={heroTitle}>
            Turn Your Therapy Website Into a Private-Pay Client Machine
          </h1>
          <p style={heroText}>
            TheraGrowth AI helps therapists capture leads, follow up faster, track inquiries,
            and convert more website visitors into booked consultations.
          </p>
          <a href="#audit" style={primaryButton}>Request Free Audit</a>
        </div>

        <div style={heroCard}>
          <div style={logo}>TG</div>
          <h2 style={cardTitle}>
            A complete client acquisition engine for private practices.
          </h2>
          <ul style={list}>
            <li>Lead capture system</li>
            <li>Client inquiry tracking</li>
            <li>AI follow-up support</li>
            <li>Monthly growth plans</li>
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
              We review your therapist website, offer, calls-to-action, trust signals,
              speed, and booking flow.
            </p>
          </div>

          <div style={card}>
            <h3>AI Chat Lead Capture</h3>
            <p>
              Website visitors can ask questions and submit inquiries directly into your
              lead system.
            </p>
          </div>

          <div style={card}>
            <h3>Follow-Up System</h3>
            <p>
              Track every inquiry, next action, lead status, and follow-up date so no
              potential client is forgotten.
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
            <p style={muted}>Start getting more private-pay client inquiries from your website.</p>
            <ul style={whiteList}>
              <li>Capture new client inquiries automatically</li>
              <li>Track every potential client in one place</li>
              <li>Never miss a follow-up opportunity</li>
              <li>Includes practice growth audit</li>
            </ul>
            <a href={stripeStarter} target="_blank" style={goldButton}>
              Start Starter Plan
            </a>
          </div>

          <div style={featuredCard}>
            <p style={popular}>MOST POPULAR</p>
            <h3>Growth</h3>
            <h2>$299/mo</h2>
            <p style={muted}>Turn more website visitors into booked therapy sessions.</p>
            <ul style={whiteList}>
              <li>Everything in Starter</li>
              <li>AI-assisted follow-up support</li>
              <li>Convert more inquiries into paying clients</li>
              <li>Ongoing growth optimization</li>
            </ul>
            <a href={stripeGrowth} target="_blank" style={goldButton}>
              Start Growth Plan
            </a>
          </div>

          <div style={priceCard}>
            <h3>Done-With-You</h3>
            <h2>$750+</h2>
            <p style={muted}>We help you build a complete client acquisition system.</p>
            <ul style={whiteList}>
              <li>Optimize your website to convert visitors</li>
              <li>Set up your lead capture system</li>
              <li>Install a follow-up process that books clients</li>
              <li>1:1 support to grow your practice</li>
            </ul>
            <a href={stripeDoneWithYou} target="_blank" style={goldButton}>
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
            Submit your practice details and we’ll review your website, funnel, and
            client acquisition system.
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
            <option>$99/mo Starter</option>
            <option>$299/mo Growth</option>
            <option>$750+ Done-With-You</option>
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

          {message && <p style={statusMessage}>{message}</p>}
        </form>
      </section>

      <footer style={footer}>
        <strong>TheraGrowth AI</strong>
        <p>
          Helping therapists get more private-pay clients through SaaS, AI chat,
          follow-up, and growth systems.
        </p>

        <p>
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
  fontFamily: "Arial, sans-serif",
};

const header = {
  position: "sticky" as const,
  top: 0,
  zIndex: 10,
  background: "#fffaf2",
  borderBottom: "1px solid #d7c4a8",
  padding: "22px 6%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const brand = {
  display: "flex",
  alignItems: "center",
  gap: 14,
  textDecoration: "none",
  color: "#111",
};

const logo = {
  width: 58,
  height: 58,
  borderRadius: "50%",
  background: "#111",
  color: "#d4a72c",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Georgia, serif",
  fontSize: 28,
  fontWeight: 900,
};

const tagline = {
  margin: 0,
  color: "#444",
};

const nav = {
  display: "flex",
  gap: 26,
  alignItems: "center",
};

const navLink = {
  color: "#111",
  fontWeight: 900,
  textDecoration: "none",
};

const auditButton = {
  color: "#111",
  fontWeight: 900,
  textDecoration: "none",
  border: "1px solid #d7c4a8",
  padding: "14px 24px",
  borderRadius: 999,
};

const hero = {
  display: "grid",
  gridTemplateColumns: "1.4fr 1fr",
  gap: 60,
  padding: "90px 6%",
  alignItems: "center",
};

const eyebrow = {
  color: "#b88918",
  letterSpacing: 6,
  fontWeight: 900,
};

const heroTitle = {
  fontFamily: "Georgia, serif",
  fontSize: 74,
  lineHeight: 1.05,
  margin: "14px 0",
};

const heroText = {
  fontSize: 20,
  lineHeight: 1.7,
  color: "#24344d",
};

const primaryButton = {
  display: "inline-block",
  marginTop: 24,
  background: "#111",
  color: "white",
  padding: "18px 28px",
  borderRadius: 14,
  textDecoration: "none",
  fontWeight: 900,
};

const heroCard = {
  background: "white",
  border: "1px solid #d7c4a8",
  borderRadius: 28,
  padding: 42,
};

const cardTitle = {
  fontFamily: "Georgia, serif",
  fontSize: 34,
};

const list = {
  lineHeight: 2,
  fontSize: 17,
};

const darkButton = {
  display: "inline-block",
  background: "#111",
  color: "white",
  padding: "16px 24px",
  borderRadius: 14,
  textDecoration: "none",
  fontWeight: 900,
};

const section = {
  padding: "85px 6%",
};

const dashboardSection = {
  padding: "85px 6%",
  background: "#fff4e3",
};

const sectionTitle = {
  fontFamily: "Georgia, serif",
  fontSize: 54,
};

const grid3 = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 24,
};

const card = {
  background: "white",
  border: "1px solid #d7c4a8",
  borderRadius: 24,
  padding: 30,
  fontSize: 17,
  lineHeight: 1.7,
};

const darkSection = {
  background: "#111",
  color: "white",
  padding: "85px 6%",
};

const darkTitle = {
  fontFamily: "Georgia, serif",
  fontSize: 54,
};

const pricingGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 24,
};

const priceCard = {
  background: "#1b1b1b",
  border: "1px solid #333",
  borderRadius: 24,
  padding: 34,
};

const featuredCard = {
  background: "#1b1b1b",
  border: "1px solid #d4a72c",
  borderRadius: 24,
  padding: 34,
};

const popular = {
  color: "#d4a72c",
  letterSpacing: 5,
  fontWeight: 900,
};

const muted = {
  color: "#6f7f99",
  lineHeight: 1.7,
};

const whiteList = {
  lineHeight: 2,
  color: "white",
};

const goldButton = {
  display: "inline-block",
  marginTop: 18,
  background: "#d4a72c",
  color: "#111",
  padding: "16px 24px",
  borderRadius: 14,
  textDecoration: "none",
  fontWeight: 900,
};

const auditSection = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 60,
  padding: "90px 6%",
};

const auditTitle = {
  fontFamily: "Georgia, serif",
  fontSize: 60,
  lineHeight: 1.1,
};

const formStyle = {
  display: "grid",
  gap: 16,
};

const input = {
  width: "100%",
  padding: 18,
  borderRadius: 14,
  border: "1px solid #d7c4a8",
  fontSize: 16,
  background: "white",
};

const textarea = {
  width: "100%",
  padding: 18,
  borderRadius: 14,
  border: "1px solid #d7c4a8",
  fontSize: 16,
  minHeight: 150,
  background: "white",
};

const submitButton = {
  background: "#111",
  color: "white",
  border: "none",
  padding: 18,
  borderRadius: 14,
  fontWeight: 900,
  fontSize: 18,
  cursor: "pointer",
};

const statusMessage = {
  color: "#b88918",
  fontWeight: 900,
  fontSize: 18,
};

const footer = {
  background: "#111",
  color: "white",
  padding: "45px 6%",
  lineHeight: 1.8,
};

const footerLink = {
  color: "#d4a72c",
  fontWeight: 900,
};