"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      setError("Invalid password.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f4f6fb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
        color: "#07112f",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "100%",
          maxWidth: "440px",
          background: "white",
          padding: "42px",
          borderRadius: "28px",
          boxShadow: "0 20px 60px rgba(7, 17, 47, 0.08)",
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "#eef3ff",
            padding: "10px 18px",
            borderRadius: "999px",
            fontWeight: 800,
            marginBottom: "18px",
          }}
        >
          TheraGrowth AI
        </div>

        <h1
          style={{
            fontSize: "42px",
            margin: 0,
            fontWeight: 900,
          }}
        >
          Dashboard Login
        </h1>

        <p style={{ color: "#475569", marginTop: "12px" }}>
          Enter your admin password to access the CRM dashboard.
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          style={{
            width: "100%",
            marginTop: "24px",
            padding: "16px",
            borderRadius: "16px",
            border: "1px solid #dbe4ff",
            fontSize: "16px",
            outline: "none",
          }}
        />

        {error && (
          <p style={{ color: "#991b1b", fontWeight: 800, marginTop: "14px" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            marginTop: "22px",
            background: "#07112f",
            color: "white",
            border: "none",
            padding: "16px",
            borderRadius: "16px",
            fontWeight: 900,
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );
}