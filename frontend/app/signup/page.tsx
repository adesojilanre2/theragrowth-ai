"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function SignupPage() {
  const [form, setForm] = useState({
    practice_name: "",
    owner_name: "",
    email: "",
    password: "",
    phone: "",
    website: "",
    city: "",
    state: "",
    niche: "",
  });

  const [message, setMessage] = useState("");

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Creating account...");

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    const userId = data.user?.id;

    if (userId) {
      await supabase.from("therapist_profiles").insert({
        id: userId,
        practice_name: form.practice_name,
        owner_name: form.owner_name,
        email: form.email,
        phone: form.phone,
        website: form.website,
        city: form.city,
        state: form.state,
        niche: form.niche,
      });
    }

    setMessage("Account created. You can now log in.");
    window.location.href = "/login";
  }

  return (
    <main style={styles.page}>
      <form onSubmit={handleSignup} style={styles.card}>
        <div style={styles.logo}>TG</div>

        <p style={styles.label}>TheraGrowth OS</p>
        <h1 style={styles.title}>Create Your Practice Growth Account</h1>
        <p style={styles.subtitle}>
          Start your SaaS workspace for lead tracking, AI follow-up, CRM, and practice growth.
        </p>

        <input style={styles.input} placeholder="Practice name" value={form.practice_name} onChange={(e) => update("practice_name", e.target.value)} required />
        <input style={styles.input} placeholder="Owner name" value={form.owner_name} onChange={(e) => update("owner_name", e.target.value)} required />
        <input style={styles.input} placeholder="Owner email" value={form.email} onChange={(e) => update("email", e.target.value)} required />
        <input style={styles.input} placeholder="Password" type="password" value={form.password} onChange={(e) => update("password", e.target.value)} required />
        <input style={styles.input} placeholder="Phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
        <input style={styles.input} placeholder="Website URL" value={form.website} onChange={(e) => update("website", e.target.value)} />
        <input style={styles.input} placeholder="City" value={form.city} onChange={(e) => update("city", e.target.value)} />
        <input style={styles.input} placeholder="State" value={form.state} onChange={(e) => update("state", e.target.value)} />

        <select style={styles.input} value={form.niche} onChange={(e) => update("niche", e.target.value)}>
          <option value="">Select therapy niche</option>
          <option>Anxiety Therapy</option>
          <option>Couples Therapy</option>
          <option>Trauma Therapy</option>
          <option>Child / Teen Therapy</option>
          <option>Private Pay Practice</option>
        </select>

        <button style={styles.button}>Create Practice Account</button>

        {message && <p style={styles.message}>{message}</p>}

        <p>
          Already created an account? <a href="/login">Go to login</a>
        </p>
      </form>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f7f0e7",
    display: "flex",
    justifyContent: "center",
    padding: 40,
  },
  card: {
    width: "100%",
    maxWidth: 760,
    background: "#fffaf3",
    border: "1px solid #decba8",
    borderRadius: 28,
    padding: 40,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: "50%",
    background: "#111",
    color: "#d4a017",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
    fontSize: 28,
  },
  label: {
    color: "#b8860b",
    fontWeight: 900,
    letterSpacing: 4,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 56,
    lineHeight: 1,
    margin: "10px 0",
  },
  subtitle: {
    fontSize: 18,
    color: "#263b58",
    marginBottom: 28,
  },
  input: {
    width: "100%",
    padding: 18,
    marginBottom: 16,
    borderRadius: 14,
    border: "1px solid #decba8",
    fontSize: 16,
  },
  button: {
    width: "100%",
    background: "#111",
    color: "#fff",
    padding: 18,
    borderRadius: 14,
    border: "none",
    fontWeight: 900,
    fontSize: 16,
    cursor: "pointer",
  },
  message: {
    fontWeight: 800,
    color: "green",
  },
};