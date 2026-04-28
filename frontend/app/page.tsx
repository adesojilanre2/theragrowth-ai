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

    setSuccess("Your request was submitted. We will follow up shortly.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <div>
          <p style={styles.badge}>AI Growth Engine for Therapists</p>

          <h1 style={styles.h1}>
            Get More Therapy Clients Without Posting Every Day.
          </h1>

          <p style={styles.heroText}>
            TheraGrowth AI helps therapists, counselors, LCSWs, telehealth
            clinicians, and private practices attract leads, automate follow-up,
            and grow with a professional online system.
          </p>

          <div style={styles.buttonRow}>
            <a href="#book-call" style={styles.primaryBtn}>
              Book Free Strategy Call
            </a>
            <a href="#pricing" style={styles.secondaryBtn}>
              See Pricing
            </a>
          </div>

          <p style={styles.trust}>
            Built for Therapists • Private Practices • Telehealth • Ethical Marketing
          </p>
        </div>

        <div style={styles.heroCard}>
          <h2 style={styles.h2Small}>What We Help You Do</h2>
          <ul style={styles.list}>
            <li>Capture more website inquiries</li>
            <li>Improve follow-up with potential clients</li>
            <li>Create content ideas without daily stress</li>
            <li>Look more professional online</li>
            <li>Turn visitors into booked consultations</li>
          </ul>
        </div>
      </section>

      <section style={styles.grid3}>
        <Card
          title="For Solo Therapists"
          text="Turn your website into a client inquiry system instead of just an online brochure."
        />
        <Card
          title="For Telehealth Practices"
          text="Capture leads from anywhere and follow up faster with a simple growth funnel."
        />
        <Card
          title="For New Private Practices"
          text="Launch with a professional online presence and a clear client acquisition system."
        />
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>Most Great Therapists Struggle With Marketing</h2>
        <p style={styles.paragraph}>
          You help people heal, but websites, SEO, social media, lead follow-up,
          and online positioning often get ignored. That means lost inquiries,
          inconsistent referrals, and unnecessary stress trying to grow your practice.
        </p>
      </section>

      <section style={styles.grid2}>
        <div style={styles.card}>
          <h2 style={styles.h2}>We Handle Growth So You Can Focus on Clients</h2>
          <ul style={styles.checkList}>
            <li>✔ Lead capture website tools</li>
            <li>✔ AI content ideas for social media</li>
            <li>✔ Better inquiry follow-up</li>
            <li>✔ Professional online positioning</li>
            <li>✔ Scalable monthly growth system</li>
          </ul>
        </div>

        <div style={styles.cardDark}>
          <h2>Founding Client Offer</h2>
          <p style={styles.darkText}>
            We are onboarding pilot therapists now. Founding members get discounted
            setup, direct support, and early access to new growth features.
          </p>
          <a href="#book-call" style={styles.lightBtn}>
            Claim Founding Member Spot
          </a>
        </div>
      </section>

      <section id="pricing" style={styles.pricing}>
        <h2 style={styles.h2}>Simple Pricing</h2>
        <p style={styles.paragraph}>
          Start lean. Upgrade as your practice grows.
        </p>

        <div style={styles.grid3NoMargin}>
          <Price
            name="Starter"
            price="$99/mo"
            text="Lead capture, basic growth support, and monthly updates."
          />
          <Price
            name="Growth"
            price="$299/mo"
            text="Lead generation support, content help, and conversion improvement."
            featured
          />
          <Price
            name="Premium"
            price="$799/mo"
            text="Done-for-you growth partner service for serious private practices."
          />
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>What This Can Replace</h2>
        <div style={styles.grid3NoMargin}>
          <Card title="Manual Posting" text="Stop wondering what to post every day." />
          <Card title="Weak Website Forms" text="Capture inquiries in a structured system." />
          <Card title="Missed Follow-Ups" text="Know who reached out and what they need." />
        </div>
      </section>

      <section id="book-call" style={styles.grid2}>
        <div style={styles.card}>
          <h2 style={styles.h2}>Book a Free 15-Minute Growth Call</h2>
          <p style={styles.paragraph}>
            Tell us about your practice and we’ll show how TheraGrowth AI can help
            you attract more ideal clients.
          </p>

          <input
            style={styles.input}
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            style={styles.input}
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            style={styles.input}
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <textarea
            style={styles.textarea}
            placeholder="Tell us about your practice and what you need help with."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />

          <button onClick={submitLead} style={styles.primaryBtn}>
            {loading ? "Submitting..." : "Request Free Growth Call"}
          </button>

          <p style={styles.success}>{success}</p>
        </div>

        <div style={styles.cardDark}>
          <h2>Important Compliance Note</h2>
          <p style={styles.darkText}>
            TheraGrowth AI is a marketing and business operations tool. It does
            not provide therapy, diagnosis, crisis counseling, emergency support,
            or clinical treatment recommendations.
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

function Price({
  name,
  price,
  text,
  featured,
}: {
  name: string;
  price: string;
  text: string;
  featured?: boolean;
}) {
  return (
    <div style={featured ? styles.priceFeatured : styles.card}>
      {featured && <p style={styles.featuredBadge}>Most Popular</p>}
      <h3>{name}</h3>
      <h2 style={styles.price}>{price}</h2>
      <p style={styles.paragraph}>{text}</p>
      <a href="#book-call" style={featured ? styles.lightBtn : styles.primaryBtn}>
        Get Started
      </a>
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
    gridTemplateColumns: "1.45fr 1fr",
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
    fontSize: "60px",
    lineHeight: "1.05",
    margin: "0 0 20px",
    maxWidth: "820px",
  },
  heroText: {
    fontSize: "21px",
    lineHeight: "1.6",
    color: "#334155",
  },
  trust: {
    marginTop: "26px",
    color: "#475569",
    fontWeight: 700,
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
    marginTop: "12px",
  },
  secondaryBtn: {
    background: "#eef2ff",
    color: "#08122d",
    padding: "15px 24px",
    borderRadius: "14px",
    textDecoration: "none",
    fontWeight: 700,
  },
  lightBtn: {
    background: "white",
    color: "#08122d",
    padding: "15px 24px",
    borderRadius: "14px",
    textDecoration: "none",
    fontWeight: 700,
    display: "inline-block",
    marginTop: "18px",
  },
  heroCard: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "24px",
    padding: "30px",
  },
  h2Small: {
    fontSize: "28px",
  },
  grid3: {
    maxWidth: "1180px",
    margin: "0 auto 32px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "24px",
  },
  grid3NoMargin: {
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
  priceFeatured: {
    background: "#08122d",
    color: "white",
    borderRadius: "26px",
    padding: "32px",
    border: "1px solid #08122d",
  },
  featuredBadge: {
    display: "inline-block",
    background: "#e8eefc",
    color: "#08122d",
    padding: "8px 14px",
    borderRadius: "999px",
    fontWeight: 700,
  },
  h2: {
    fontSize: "32px",
    marginTop: 0,
  },
  paragraph: {
    color: "#475569",
    lineHeight: "1.7",
    fontSize: "17px",
  },
  darkText: {
    color: "#dbeafe",
    lineHeight: "1.7",
    fontSize: "17px",
  },
  list: {
    lineHeight: "2",
    color: "#334155",
    fontSize: "17px",
  },
  checkList: {
    lineHeight: "2.1",
    color: "#334155",
    fontSize: "18px",
    listStyle: "none",
    paddingLeft: 0,
  },
  pricing: {
    maxWidth: "1180px",
    margin: "0 auto 32px",
    background: "white",
    borderRadius: "26px",
    padding: "36px",
  },
  price: {
    fontSize: "46px",
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
    height: "150px",
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