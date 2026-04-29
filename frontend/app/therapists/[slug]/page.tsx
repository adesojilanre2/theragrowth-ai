"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function TherapistWebsitePage() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    insurance_provider: "",
    support_needed: "",
  });

  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("Submitting...");

    const { error } = await supabase.from("therapist_leads").insert([
      {
        therapist_slug: "jovonna-hale",
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        insurance_provider: form.insurance_provider,
        support_needed: form.support_needed,
        status: "new",
        priority: "warm",
      },
    ]);

    if (error) {
      console.error(error);
      setStatus("Something went wrong. Please try again.");
      return;
    }

    setStatus("Request submitted successfully.");
    setForm({
      full_name: "",
      email: "",
      phone: "",
      insurance_provider: "",
      support_needed: "",
    });
  }

  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <div>
          <div style={pillStyle}>Private Practice Therapy</div>

          <h1 style={titleStyle}>
            Therapy for Anxiety, Trauma, Stress, and Life Transitions
          </h1>

          <p style={subtitleStyle}>
            Work directly with Jovonna Hale, LCSW, LICSW through a private,
            professional therapy experience serving Colorado and Washington.
          </p>

          <div style={buttonRowStyle}>
            <a href="#consultation" style={primaryButtonStyle}>
              Request Consultation
            </a>

            <a href="#insurance" style={secondaryButtonStyle}>
              Verify Insurance
            </a>
          </div>
        </div>

        <div style={profileCardStyle}>
          <h2 style={{ fontSize: "32px", margin: 0 }}>
            Jovonna Hale, LCSW, LICSW
          </h2>

          <p style={{ color: "#475569", lineHeight: 1.7 }}>
            A calm, professional therapy experience designed to reduce
            third-party platform dependence and make getting started simple.
          </p>

          <div style={miniCardStyle}>
            <strong>AI Assistant Available</strong>
            <p style={{ marginBottom: 0, color: "#475569" }}>
              Ask about therapy services, insurance, booking, and availability.
            </p>
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Specialties</h2>

        <div style={gridStyle}>
          {[
            "Anxiety therapy",
            "Trauma support",
            "Stress and burnout",
            "Life transitions",
            "Relationship challenges",
            "Emotional wellness",
          ].map((item) => (
            <div key={item} style={featureCardStyle}>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section id="insurance" style={darkSectionStyle}>
        <h2 style={{ ...sectionTitleStyle, color: "white" }}>
          Insurance & Intake
        </h2>

        <p style={{ color: "#cbd5e1", fontSize: "18px", lineHeight: 1.7 }}>
          Submit insurance details and care needs so eligibility, benefits, and
          next steps can be reviewed before scheduling.
        </p>

        <div style={gridStyle}>
          <div style={darkMiniCardStyle}>Insurance screening available</div>
          <div style={darkMiniCardStyle}>Private pay options</div>
          <div style={darkMiniCardStyle}>Eligibility verification support</div>
        </div>
      </section>

      <section id="consultation" style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Request a Consultation</h2>

        <p style={subtitleStyle}>
          Complete the form below and the request will appear inside the secure
          TheraGrowth AI dashboard.
        </p>

        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            style={inputStyle}
            placeholder="Full name"
            value={form.full_name}
            onChange={(e) =>
              setForm({ ...form, full_name: e.target.value })
            }
            required
          />

          <input
            style={inputStyle}
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            style={inputStyle}
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            style={inputStyle}
            placeholder="Insurance provider"
            value={form.insurance_provider}
            onChange={(e) =>
              setForm({ ...form, insurance_provider: e.target.value })
            }
          />

          <textarea
            style={textareaStyle}
            placeholder="What support are you looking for?"
            value={form.support_needed}
            onChange={(e) =>
              setForm({ ...form, support_needed: e.target.value })
            }
            required
          />

          <button type="submit" style={submitButtonStyle}>
            Submit Request
          </button>
        </form>

        {status && (
          <p style={{ marginTop: "18px", fontWeight: 900, color: "#166534" }}>
            {status}
          </p>
        )}
      </section>

      <section style={footerStyle}>
        <strong>Compliance Note:</strong> This website supports practice growth,
        inquiry management, and intake coordination. It does not provide therapy,
        diagnosis, emergency support, or clinical treatment recommendations.
      </section>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f4f6fb",
  padding: "60px 24px",
  fontFamily: "Arial, sans-serif",
  color: "#07112f",
} as const;

const heroStyle = {
  maxWidth: "1180px",
  margin: "0 auto",
  background: "white",
  borderRadius: "32px",
  padding: "56px",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "48px",
  alignItems: "center",
} as const;

const pillStyle = {
  display: "inline-block",
  background: "#eef3ff",
  padding: "12px 22px",
  borderRadius: "999px",
  fontWeight: 900,
  marginBottom: "28px",
} as const;

const titleStyle = {
  fontSize: "56px",
  lineHeight: "1.05",
  margin: 0,
  fontWeight: 900,
} as const;

const subtitleStyle = {
  fontSize: "19px",
  lineHeight: 1.7,
  color: "#334155",
} as const;

const buttonRowStyle = {
  display: "flex",
  gap: "16px",
  flexWrap: "wrap",
  marginTop: "30px",
} as const;

const primaryButtonStyle = {
  background: "#07112f",
  color: "white",
  padding: "16px 24px",
  borderRadius: "16px",
  textDecoration: "none",
  fontWeight: 900,
} as const;

const secondaryButtonStyle = {
  background: "#eef3ff",
  color: "#07112f",
  padding: "16px 24px",
  borderRadius: "16px",
  textDecoration: "none",
  fontWeight: 900,
} as const;

const profileCardStyle = {
  background: "#f8fafc",
  border: "1px solid #dbe4ff",
  borderRadius: "28px",
  padding: "36px",
} as const;

const miniCardStyle = {
  background: "white",
  borderRadius: "20px",
  padding: "22px",
  marginTop: "24px",
} as const;

const sectionStyle = {
  maxWidth: "1180px",
  margin: "32px auto 0",
  background: "white",
  borderRadius: "32px",
  padding: "46px",
} as const;

const sectionTitleStyle = {
  fontSize: "40px",
  marginTop: 0,
  fontWeight: 900,
} as const;

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
  gap: "18px",
  marginTop: "24px",
} as const;

const featureCardStyle = {
  border: "1px solid #dbe4ff",
  borderRadius: "18px",
  padding: "22px",
  fontWeight: 900,
} as const;

const darkSectionStyle = {
  maxWidth: "1180px",
  margin: "32px auto 0",
  background: "#07112f",
  color: "white",
  borderRadius: "32px",
  padding: "46px",
} as const;

const darkMiniCardStyle = {
  background: "#1e2b55",
  padding: "22px",
  borderRadius: "18px",
  fontWeight: 900,
} as const;

const formStyle = {
  display: "grid",
  gap: "16px",
  marginTop: "26px",
} as const;

const inputStyle = {
  width: "100%",
  padding: "18px 20px",
  border: "1px solid #dbe4ff",
  borderRadius: "16px",
  fontSize: "16px",
  outline: "none",
} as const;

const textareaStyle = {
  width: "100%",
  minHeight: "150px",
  padding: "18px 20px",
  border: "1px solid #dbe4ff",
  borderRadius: "16px",
  fontSize: "16px",
  outline: "none",
} as const;

const submitButtonStyle = {
  background: "#07112f",
  color: "white",
  border: "none",
  padding: "18px",
  borderRadius: "16px",
  fontWeight: 900,
  fontSize: "16px",
  cursor: "pointer",
} as const;

const footerStyle = {
  maxWidth: "1180px",
  margin: "32px auto 0",
  background: "#07112f",
  color: "white",
  borderRadius: "24px",
  padding: "28px",
  lineHeight: 1.7,
} as const;