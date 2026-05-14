"use client";

import React, { useEffect, useState } from "react";

type Lead = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  practice: string;
  website: string;
  budget: string;
  challenge: string;
  source: string;
  status: string;
  priority: string;
  follow_up_date: string | null;
  notes: string | null;
};

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadLeads() {
    setLoading(true);
    const res = await fetch("/api/leads", { cache: "no-store" });
    const data = await res.json();
    setLeads(data.leads || []);
    setLoading(false);
  }

  async function updateLead(id: string, updates: Partial<Lead>) {
    const current = leads.find((lead) => lead.id === id);
    if (!current) return;

    const updatedLead = { ...current, ...updates };

    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? updatedLead : lead))
    );

    await fetch("/api/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedLead),
    });
  }

  useEffect(() => {
    loadLeads();
  }, []);

  const newLeads = leads.filter((lead) => lead.status === "New").length;
  const followUps = leads.filter((lead) => lead.follow_up_date).length;
  const booked = leads.filter((lead) => lead.status === "Booked").length;

  return (
    <main style={styles.page}>
      <section style={styles.header}>
        <div>
          <p style={styles.label}>TheraGrowth OS</p>
          <h1 style={styles.title}>Client Acquisition Dashboard</h1>
          <p style={styles.subtitle}>
            Track free audit requests, website leads, follow-ups, and booked calls.
          </p>
        </div>

        <a href="/" style={styles.homeButton}>Back to Website</a>
      </section>

      <section style={styles.statsGrid}>
        <StatCard title="New Leads" value={newLeads} />
        <StatCard title="Follow-Ups Due" value={followUps} />
        <StatCard title="Booked Calls" value={booked} />
        <StatCard title="Total Leads" value={leads.length} />
      </section>

      <section style={styles.panel}>
        <div style={styles.panelHeader}>
          <h2 style={styles.sectionTitle}>Lead CRM</h2>
          <button onClick={loadLeads} style={styles.refreshButton}>
            Refresh
          </button>
        </div>

        {loading ? (
          <p>Loading leads...</p>
        ) : leads.length === 0 ? (
          <p>No leads yet. Submit a test free audit form from the homepage.</p>
        ) : (
          <div style={styles.leadList}>
            {leads.map((lead) => (
              <div key={lead.id} style={styles.leadCard}>
                <div style={styles.leadTop}>
                  <div>
                    <h3 style={styles.leadName}>
                      {lead.name || "Unnamed Lead"}
                    </h3>
                    <p style={styles.smallText}>
                      {lead.email || "No email"} · {lead.phone || "No phone"}
                    </p>
                    <p style={styles.smallText}>
                      {new Date(lead.created_at).toLocaleString()}
                    </p>
                  </div>

                  <div style={styles.badges}>
                    <span style={styles.badge}>{lead.status}</span>
                    <span style={styles.badgeGold}>{lead.priority}</span>
                  </div>
                </div>

                <div style={styles.detailsGrid}>
                  <Info label="Practice/Niche" value={lead.practice} />
                  <Info label="Website" value={lead.website} />
                  <Info label="Budget" value={lead.budget} />
                  <Info label="Source" value={lead.source} />
                </div>

                <div>
                  <p style={styles.infoLabel}>Challenge</p>
                  <p style={styles.challenge}>
                    {lead.challenge || "No challenge submitted."}
                  </p>
                </div>

                <div style={styles.controlsGrid}>
                  <label style={styles.fieldLabel}>
                    Status
                    <select
                      value={lead.status || "New"}
                      onChange={(e) =>
                        updateLead(lead.id, { status: e.target.value })
                      }
                      style={styles.input}
                    >
                      <option>New</option>
                      <option>Contacted</option>
                      <option>Booked</option>
                      <option>Not Fit</option>
                    </select>
                  </label>

                  <label style={styles.fieldLabel}>
                    Priority
                    <select
                      value={lead.priority || "Warm"}
                      onChange={(e) =>
                        updateLead(lead.id, { priority: e.target.value })
                      }
                      style={styles.input}
                    >
                      <option>Hot</option>
                      <option>Warm</option>
                      <option>Cold</option>
                    </select>
                  </label>

                  <label style={styles.fieldLabel}>
                    Follow-Up Date
                    <input
                      type="date"
                      value={lead.follow_up_date || ""}
                      onChange={(e) =>
                        updateLead(lead.id, { follow_up_date: e.target.value })
                      }
                      style={styles.input}
                    />
                  </label>
                </div>

                <label style={styles.fieldLabel}>
                  Notes
                  <textarea
                    value={lead.notes || ""}
                    onChange={(e) =>
                      updateLead(lead.id, { notes: e.target.value })
                    }
                    placeholder="Add call notes, next steps, objections, or follow-up plan..."
                    style={styles.textarea}
                  />
                </label>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div style={styles.statCard}>
      <p style={styles.statTitle}>{title}</p>
      <p style={styles.statValue}>{value}</p>
    </div>
  );
}

function Info({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p style={styles.infoLabel}>{label}</p>
      <p style={styles.infoValue}>{value || "—"}</p>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#fbf5e9",
    color: "#111111",
    padding: "50px 7%",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    gap: 24,
    alignItems: "center",
    marginBottom: 32,
  },
  label: {
    color: "#bd8d14",
    textTransform: "uppercase",
    fontWeight: 900,
    letterSpacing: 4,
  },
  title: {
    fontFamily: "Georgia, serif",
    fontSize: 56,
    lineHeight: 1,
    margin: "10px 0",
  },
  subtitle: {
    fontSize: 20,
    color: "#263b58",
    maxWidth: 760,
  },
  homeButton: {
    background: "#111111",
    color: "white",
    padding: "16px 22px",
    borderRadius: 14,
    textDecoration: "none",
    fontWeight: 900,
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 20,
    marginBottom: 32,
  },
  statCard: {
    background: "white",
    border: "1px solid #decba8",
    borderRadius: 24,
    padding: 28,
  },
  statTitle: {
    fontWeight: 900,
    fontSize: 18,
  },
  statValue: {
    fontFamily: "Georgia, serif",
    fontSize: 56,
    fontWeight: 900,
    margin: 0,
  },
  panel: {
    background: "white",
    border: "1px solid #decba8",
    borderRadius: 28,
    padding: 28,
  },
  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: "Georgia, serif",
    fontSize: 38,
    margin: 0,
  },
  refreshButton: {
    background: "#111111",
    color: "white",
    border: "none",
    borderRadius: 12,
    padding: "12px 18px",
    fontWeight: 900,
    cursor: "pointer",
  },
  leadList: {
    display: "grid",
    gap: 22,
  },
  leadCard: {
    border: "1px solid #decba8",
    borderRadius: 22,
    padding: 24,
    background: "#fffdf8",
  },
  leadTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: 20,
    marginBottom: 20,
  },
  leadName: {
    fontSize: 26,
    margin: 0,
  },
  smallText: {
    color: "#52627a",
    margin: "6px 0",
  },
  badges: {
    display: "flex",
    gap: 8,
    alignItems: "flex-start",
  },
  badge: {
    background: "#111111",
    color: "white",
    padding: "8px 12px",
    borderRadius: 999,
    fontWeight: 800,
  },
  badgeGold: {
    background: "#d6a72c",
    color: "#111111",
    padding: "8px 12px",
    borderRadius: 999,
    fontWeight: 900,
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 16,
    marginBottom: 18,
  },
  infoLabel: {
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    color: "#bd8d14",
    fontWeight: 900,
    marginBottom: 6,
  },
  infoValue: {
    fontWeight: 700,
    color: "#263b58",
    wordBreak: "break-word",
  },
  challenge: {
    background: "#fbf5e9",
    padding: 16,
    borderRadius: 14,
    color: "#263b58",
  },
  controlsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 16,
    marginTop: 18,
  },
  fieldLabel: {
    display: "grid",
    gap: 8,
    fontWeight: 900,
    color: "#111111",
  },
  input: {
    width: "100%",
    padding: 14,
    border: "1px solid #d7c4a8",
    borderRadius: 12,
    fontSize: 16,
    background: "white",
  },
  textarea: {
    width: "100%",
    minHeight: 100,
    padding: 14,
    border: "1px solid #d7c4a8",
    borderRadius: 12,
    fontSize: 16,
    marginTop: 8,
  },
};