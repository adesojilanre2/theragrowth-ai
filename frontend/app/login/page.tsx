"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Logging in...");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <main style={styles.page}>
      <form onSubmit={handleLogin} style={styles.card}>
        <p style={styles.badge}>TheraGrowth AI</p>
        <h1 style={styles.title}>Dashboard Login</h1>
        <p style={styles.subtitle}>Log in to your practice growth workspace.</p>

        <input style={styles.input} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input style={styles.input} placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button style={styles.button}>Login</button>

        {message && <p style={styles.message}>{message}</p>}

        <p>
          No account yet? <a href="/signup">Create account</a>
        </p>
      </form>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f4f7fb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  card: {
    width: "100%",
    maxWidth: 440,
    background: "#fff",
    borderRadius: 28,
    padding: 44,
    boxShadow: "0 25px 80px rgba(0,0,0,.12)",
  },
  badge: {
    display: "inline-block",
    background: "#eef3ff",
    padding: "10px 18px",
    borderRadius: 999,
    fontWeight: 900,
  },
  title: {
    fontSize: 46,
    lineHeight: 1,
    margin: "20px 0 10px",
  },
  subtitle: {
    color: "#263b58",
    fontSize: 18,
  },
  input: {
    width: "100%",
    padding: 18,
    marginTop: 16,
    borderRadius: 14,
    border: "1px solid #dce3f1",
    fontSize: 16,
  },
  button: {
    width: "100%",
    marginTop: 24,
    padding: 18,
    background: "#071333",
    color: "#fff",
    border: "none",
    borderRadius: 14,
    fontWeight: 900,
    fontSize: 16,
    cursor: "pointer",
  },
  message: {
    color: "#b8860b",
    fontWeight: 800,
  },
};