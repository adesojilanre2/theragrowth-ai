"use client";

import { useState } from "react";

export default function HomePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    practice: "",
    website: "",
    budget: "$99/mo SaaS",
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
          budget: "$99/mo SaaS",
          challenge: "",
        });
      } else {
        setMessage("❌ " + (data.message || "Something went wrong."));
      }
    } catch (error) {
      setMessage("❌ Server error.");
    }

    setLoading(false);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8f4ea",
        padding: "60px 8%",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "50px",
          alignItems: "start",
        }}
      >
        {/* LEFT SIDE */}
        <div>
          <p
            style={{
              color: "#b88a1b",
              fontWeight: 700,
              letterSpacing: 2,
              fontSize: 14,
            }}
          >
            FREE AUDIT
          </p>

          <h1
            style={{
              fontSize: 72,
              lineHeight: 1,
              margin: "10px 0 20px",
              fontFamily: "Georgia, serif",
            }}
          >
            Request Your
            <br />
            Free Practice
            <br />
            Growth Audit
          </h1>

          <p style={{ fontSize: 22, lineHeight: 1.6, maxWidth: 560 }}>
            Submit your practice details and we’ll review your website,
            funnel, and client acquisition system.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div>
          <form
            onSubmit={handleAuditSubmit}
            style={{
              display: "grid",
              gap: 16,
            }}
          >
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={updateField}
              required
              style={inputStyle}
            />

            <input
              name="email"
              type="email"
              placeholder="Business Email"
              value={form.email}
              onChange={updateField}
              required
              style={inputStyle}
            />

            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={updateField}
              required
              style={inputStyle}
            />

            <input
              name="practice"
              placeholder="Therapy Niche"
              value={form.practice}
              onChange={updateField}
              required
              style={inputStyle}
            />

            <input
              name="website"
              placeholder="Website URL"
              value={form.website}
              onChange={updateField}
              style={inputStyle}
            />

            <select
              name="budget"
              value={form.budget}
              onChange={updateField}
              style={inputStyle}
            >
              <option>$99/mo SaaS</option>
              <option>$299/mo Growth</option>
              <option>$999/mo Full Service</option>
            </select>

            <textarea
              name="challenge"
              placeholder="What do you need help with?"
              value={form.challenge}
              onChange={updateField}
              rows={5}
              style={inputStyle}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                background: "black",
                color: "white",
                border: "none",
                padding: 18,
                borderRadius: 14,
                fontWeight: 800,
                fontSize: 20,
                cursor: "pointer",
              }}
            >
              {loading ? "Submitting..." : "Submit Free Audit Request"}
            </button>

            {message && (
              <p
                style={{
                  marginTop: 8,
                  fontWeight: 700,
                  color: message.includes("✅") ? "green" : "#b8860b",
                }}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: 18,
  borderRadius: 14,
  border: "1px solid #d6c29a",
  background: "#fff",
  fontSize: 17,
} as const;