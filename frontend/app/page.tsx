"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const submitLead = async () => {
    setLoading(true);
    setSuccess("");

    const { error } = await supabase.from("leads").insert([form]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setSuccess("Lead submitted successfully. We will follow up shortly.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <div>
          <p style={styles.badge}>AI Growth Engine for Therapists</p>
          <h1 style={styles.h1}>
            Help therapists get more clients without posting every day.
          </h1>
          <p style={styles.heroText}>
            TheraGrowth AI helps solo therapists, LCSWs, counselors, telehealth
            clinicians, and private practices capture leads, automate marketing,
            and grow with a professional online system.
          </p>

          <div style={styles.buttonRow}>
            <a href="#lead-form" style={styles.primaryBtn}>Book a Demo</a>
            <a href="#pricing" style={styles.secondaryBtn}>View Pricing</a>
          </div>
        </div>

        <div style={styles.heroCard}>
          <h2>What it does</h2>
          <ul style={styles.list}>
            <li>Captures website leads</li>
            <li>Stores inquiries in Supabase</li>
            <li>Creates AI marketing content</li>
            <li>Supports therapist growth campaigns</li>
            <li>Prepares for Stripe subscriptions</li>
          </ul>
        </div>
      </section>

      <section style={styles.grid3}>
        <Card title="For Solo Therapists" text="A simple system to turn website visitors into consultation requests." />
        <Card title="For Telehealth Practices" text="Capture leads from anywhere and follow up faster." />
        <Card title="For Your Friend’s Practice" text="Use this as a live demo and first pilot client case study." />
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>The Problem</h2>
        <p style={styles.paragraph}>
          Many therapists are excellent clinicians but struggle with marketing,
          websites, lead follow-up, social media, and converting visitors into
          booked consultations. TheraGrowth AI gives them a business growth
          system without forcing them to become marketers.
        </p>
      </section>

      <section style={styles.grid2}>
        <div style={styles.card}>
          <h2 style={styles.h2}>Solution</h2>
          <ul style={styles.list}>
            <li>Professional website positioning</li>
            <li>Lead capture form</li>
            <li>AI content generation</li>
            <li>Pricing and subscription model</li>
            <li>Future CRM dashboard</li>
          </ul>
        </div>

        <div style={styles.card}>
          <h2 style={styles.h2}>Revenue Model</h2>
          <p style={styles.paragraph}>
            Start with service packages for therapists, then convert common
            features into SaaS subscriptions.
          </p>
          <ul style={styles.list}>
            <li>$49/month Starter</li>
            <li>$99/month Growth</li>
            <li>$299/month Pro</li>
            <li>$500–$2,000 setup services</li>
          </ul>
        </div>
      </section>

      <section id="pricing" style={styles.pricing}>
        <h2 style={styles.h2}>Pricing</h2>
        <div style={styles.grid3}>
          <Price name="Starter" price="$49/mo" text="Lead capture + simple content tools." />
          <Price name="Growth" price="$99/mo" text="Dashboard, analytics, and content packs." />
          <Price name="Pro" price="$299/mo" text="Automation, premium support, and practice growth tools." />
        </div>
      </section>

      <section id="lead-form" style={styles.grid2}>
        <div style={styles.card}>
          <h2 style={styles.h2}>Demo Lead Capture</h2>
          <p style={styles.paragraph}>
            This is the live form that proves the platform works. Every submitted
            lead is saved into your Supabase database.
          </p>

          <input style={styles.input} placeholder="Client name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input style={styles.input} placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input style={styles.input} placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <textarea style={styles.textarea} placeholder="What support are you looking for?" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />

          <button onClick={submitLead} style={styles.primaryBtn}>
            {loading ? "Submitting..." : "Submit Lead"}
          </button>

          <p style={styles.success}>{success}</p>
        </div>

        <div style={styles.cardDark}>
          <h2>Important Compliance Note</h2>
          <p>
            TheraGrowth AI is a marketing and business operations tool. It does
            not provide therapy, diagnosis, crisis counseling, or emergency
            medical support.
          </p>
        </div>
      </section>
    </main>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      <p style={styles.paragraph}>{text}</p>
    </div>
  );
}

function Price({ name, price, text }: { name: string; price: string; text: string }) {
  return (
    <div style={styles.card}>
      <h3>{name}</h3>
      <h2 style={styles.price}>{price}</h2>
      <p style={styles.paragraph}>{text}</p>
    </div>
  );
}

const styles: Record<string, any> = {
  page: {
    background: "#f5f7fb",
    minHeight: "100vh",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
    color: "#08122d",
  },
  hero: {
    maxWidth: "1180px",
    margin: "0 auto 32px",
    background: "white",
    borderRadius: "32px",
    padding: "60px",
    display: "grid",
    gridTemplateColumns: "1.5fr 1fr",
    gap: "40px",
    boxShadow: "0 24px 60px rgba(8,18,45,0.08)",
  },
  badge: {
    display: "inline-block",
    background: "#e8eefc",
    padding: "10px 18px",
    borderRadius: "999px",
    fontWeight: 700,
    marginBottom: "18px",
  },
  h1: {
    fontSize: "58px",
    lineHeight: "1.05",
    margin: "0 0 20px",
    maxWidth: "820px",
  },
  heroText: {
    fontSize: "21px",
    lineHeight: "1.6",
    color: "#334155",
  },
  buttonRow: {
    display: "flex",
    gap: "14px",
    marginTop: "30px",
    flexWrap: "wrap",
  },
  primaryBtn: {
    background: "#08122d",
    color: "white",
    padding: "15px 24px",
    borderRadius: "14px",
    border: "none",
    textDecoration: "none",
    fontWeight: 700,
    cursor: "pointer",
    display: "inline-block",
  },
  secondaryBtn: {
    background: "#eef2ff",
    color: "#08122d",
    padding: "15px 24px",
    borderRadius: "14px",
    textDecoration: "none",
    fontWeight: 700,
  },
  heroCard: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "24px",
    padding: "28px",
  },
  grid3: {
    maxWidth: "1180px",
    margin: "0 auto 32px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "24px",
  },
  grid2: {
    maxWidth: "1180px",
    margin: "0 auto 32px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
  },
  section: {
    maxWidth: "1180px",
    margin: "0 auto 32px",
    background: "white",
    borderRadius: "26px",
    padding: "36px",
  },
  card: {
    background: "white",
    borderRadius: "26px",
    padding: "32px",
    border: "1px solid #e5e7eb",
  },
  cardDark: {
    background: "#08122d",
    color: "white",
    borderRadius: "26px",
    padding: "32px",
  },
  h2: {
    fontSize: "30px",
    marginTop: 0,
  },
  paragraph: {
    color: "#475569",
    lineHeight: "1.7",
    fontSize: "17px",
  },
  list: {
    lineHeight: "2",
    color: "#334155",
    fontSize: "17px",
  },
  pricing: {
    maxWidth: "1180px",
    margin: "0 auto 32px",
  },
  price: {
    fontSize: "42px",
    margin: "10px 0",
  },
  input: {
    width: "100%",
    padding: "15px",
    marginTop: "14px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    fontSize: "16px",
  },
  textarea: {
    width: "100%",
    height: "140px",
    padding: "15px",
    marginTop: "14px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    fontSize: "16px",
  },
  success: {
    color: "green",
    fontWeight: 700,
    marginTop: "14px",
  },
};