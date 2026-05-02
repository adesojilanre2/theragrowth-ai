"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function SignupPage() {
  const [form, setForm] = useState({
    practice_name: "",
    owner_name: "",
    owner_email: "",
    phone: "",
    website_url: "",
    city: "",
    state: "",
    niche: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Creating your TheraGrowth OS account...");

    const { error } = await supabase.from("practices").insert([
      {
        practice_name: form.practice_name,
        owner_name: form.owner_name,
        owner_email: form.owner_email,
        phone: form.phone,
        website_url: form.website_url,
        city: form.city,
        state: form.state,
        niche: form.niche,
        plan: "starter",
        status: "active",
      },
    ]);

    if (error) {
      console.error(error);
      setStatus("Something went wrong. Please try again.");
      return;
    }

    setStatus("Success. Your TheraGrowth OS account has been created.");

    setForm({
      practice_name: "",
      owner_name: "",
      owner_email: "",
      phone: "",
      website_url: "",
      city: "",
      state: "",
      niche: "",
    });
  };

  return (
    <main style={page}>
      <section style={card}>
        <div style={logo}>TG</div>

        <p style={eyebrow}>TheraGrowth OS</p>
        <h1 style={h1}>Create Your Practice Growth Account</h1>

        <p style={lead}>
          Start your SaaS workspace for lead tracking, AI follow-up, CRM, chatbot
          settings, and practice growth analytics.
        </p>

        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            style={input}
            name="practice_name"
            placeholder="Practice name"
            value={form.practice_name}
            onChange={handleChange}
            required
          />

          <input
            style={input}
            name="owner_name"
            placeholder="Owner name"
            value={form.owner_name}
            onChange={handleChange}
            required
          />

          <input
            style={input}
            type="email"
            name="owner_email"
            placeholder="Owner email"
            value={form.owner_email}
            onChange={handleChange}
            required
          />

          <input
            style={input}
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
          />

          <input
            style={input}
            name="website_url"
            placeholder="Website URL"
            value={form.website_url}
            onChange={handleChange}
          />

          <div style={twoCol}>
            <input
              style={input}
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
            />

            <input
              style={input}
              name="state"
              placeholder="State"
              value={form.state}
              onChange={handleChange}
            />
          </div>

          <select
            style={input}
            name="niche"
            value={form.niche}
            onChange={handleChange}
          >
            <option value="">Select therapy niche</option>
            <option value="Anxiety Therapy">Anxiety Therapy</option>
            <option value="Trauma Therapy">Trauma Therapy</option>
            <option value="Couples Therapy">Couples Therapy</option>
            <option value="Child Therapy">Child Therapy</option>
            <option value="EMDR Therapy">EMDR Therapy</option>
            <option value="Private-Pay Psychology">
              Private-Pay Psychology
            </option>
            <option value="General Private Practice">
              General Private Practice
            </option>
          </select>

          <button style={button} type="submit">
            Create Practice Account
          </button>

          {status && <p style={statusStyle}>{status}</p>}
        </form>

        <p style={bottomText}>
          Already created an account? Go to{" "}
          <a style={link} href="/dashboard">
            dashboard
          </a>
        </p>
      </section>
    </main>
  );
}

const gold = "#b8892e";
const black = "#111111";
const cream = "#f7f1e8";
const soft = "#fffaf2";

const page = {
  minHeight: "100vh",
  background: cream,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 30,
  fontFamily: "Arial, sans-serif",
} as const;

const card = {
  width: "100%",
  maxWidth: 760,
  background: soft,
  border: "1px solid #e1cfb3",
  borderRadius: 32,
  padding: 40,
  boxShadow: "0 24px 70px rgba(0,0,0,.08)",
} as const;

const logo = {
  width: 70,
  height: 70,
  borderRadius: "50%",
  background: black,
  color: gold,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Georgia, serif",
  fontSize: 30,
  fontWeight: 900,
  marginBottom: 20,
} as const;

const eyebrow = {
  color: gold,
  fontWeight: 900,
  letterSpacing: 2,
  textTransform: "uppercase",
} as const;

const h1 = {
  fontFamily: "Georgia, serif",
  fontSize: "clamp(38px, 6vw, 64px)",
  lineHeight: 1,
  margin: "10px 0 18px",
} as const;

const lead = {
  color: "#3d3328",
  fontSize: 18,
  lineHeight: 1.6,
  marginBottom: 26,
} as const;

const formStyle = {
  display: "grid",
  gap: 14,
} as const;

const twoCol = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 14,
} as const;

const input = {
  width: "100%",
  padding: 17,
  borderRadius: 14,
  border: "1px solid #d7c4a8",
  background: "#fffaf5",
  fontSize: 16,
  boxSizing: "border-box",
} as const;

const button = {
  background: black,
  color: "white",
  border: "none",
  padding: 18,
  borderRadius: 16,
  fontWeight: 900,
  fontSize: 16,
  cursor: "pointer",
  marginTop: 6,
} as const;

const statusStyle = {
  fontWeight: 900,
  color: gold,
} as const;

const bottomText = {
  marginTop: 22,
  color: "#6b5b48",
} as const;

const link = {
  color: black,
  fontWeight: 900,
} as const;