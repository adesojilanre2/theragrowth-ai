"use client";

import React, { useEffect, useMemo, useState } from "react";

type Lead = {
  id: string;
  created_at?: string;
  name?: string;
  email?: string;
  phone?: string;
  practice?: string;
  website?: string;
  challenge?: string;
  source?: string;
  status?: string;
  priority?: string;
  notes?: string;
  follow_up_date?: string;
};

const STATUS_OPTIONS = ["New", "Contacted", "Follow-Up", "Booked", "Not Fit"];
const PRIORITY_OPTIONS = ["Hot", "Warm", "Cold"];

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadLeads() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/leads", { cache: "no-store" });
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Failed to load leads.");
        setLeads([]);
        return;
      }

      setLeads(Array.isArray(data.leads) ? data.leads : []);
    } catch {
      setError("Could not connect to leads API.");
      setLeads([]);
    } finally {
      setLoading(false);
    }
  }

  async function updateLead(id: string, updates: Partial<Lead>) {
    try {
      await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updates }),
      });

      await loadLeads();
    } catch {
      setError("Could not update lead.");
    }
  }

  useEffect(() => {
    loadLeads();
  }, []);

  const stats = useMemo(() => {
    return {
      total: leads.length,
      new: leads.filter((l) => normalize(l.status) === "new").length,
      warm: leads.filter((l) => normalize(l.priority) === "warm").length,
      booked: leads.filter((l) => normalize(l.status) === "booked").length,
      websites: leads.filter((l) => Boolean(l.website)).length,
    };
  }, [leads]);

  return (
    <main style={styles.page}>
      <section style={styles.header}>
        <div>
          <p style={styles.label}>TheraGrowth OS</p>
          <h1 style={styles.title}>Client Acquisition Dashboard</h1>
          <p style={styles.subtitle}>
            Track audit requests, chatbot leads, follow-ups, booked calls, and
            website opportunities.
          </p>
        </div>

        <div style={styles.headerActions}>
          <a href="/" style={styles.homeButton}>
            Back to Website
          </a>
          <button onClick={loadLeads} style={styles.refreshButton}>
            {loading ? "Refreshing..." : "Refresh Leads"}
          </button>
        </div>
      </section>

      {error && <div style={styles.errorBox}>{error}</div>}

      <section style={styles.statsGrid}>
        <StatCard title="Total Leads" value={stats.total} />
        <StatCard title="New Leads" value={stats.new} />
        <StatCard title="Warm Leads" value={stats.warm} />
        <StatCard title="Booked Calls" value={stats.booked} />
        <StatCard title="Websites Captured" value={stats.websites} />
      </section>

      <section style={styles.tableCard}>
        <div style={styles.tableHeader}>
          <div>
            <h2 style={styles.sectionTitle}>Lead CRM</h2>
            <p style={styles.sectionText}>
              Manage every therapist inquiry from audit request to booked call.
            </p>
          </div>
        </div>

        {leads.length === 0 ? (
          <p style={styles.emptyText}>
            No leads yet. Submit a test Free Audit form from the homepage.
          </p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Created</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Phone</th>
                  <th style={styles.th}>Practice</th>
                  <th style={styles.th}>Website</th>
                  <th style={styles.th}>Challenge</th>
                  <th style={styles.th}>Source</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Priority</th>
                  <th style={styles.th}>Follow Up</th>
                  <th style={styles.th}>Notes</th>
                </tr>
              </thead>

              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td style={styles.td}>{formatDate(lead.created_at)}</td>
                    <td style={styles.td}>{lead.name || "-"}</td>
                    <td style={styles.td}>{lead.email || "-"}</td>
                    <td style={styles.td}>{lead.phone || "-"}</td>
                    <td style={styles.td}>{lead.practice || "-"}</td>

                    <td style={styles.td}>
                      {lead.website ? (
                        <a
                          href={safeUrl(lead.website)}
                          target="_blank"
                          rel="noreferrer"
                          style={styles.link}
                        >
                          Visit Site
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td style={styles.td}>
                      <div style={styles.challenge}>
                        {lead.challenge || "-"}
                      </div>
                    </td>

                    <td style={styles.td}>{lead.source || "Free Audit"}</td>

                    <td style={styles.td}>
                      <select
                        value={lead.status || "New"}
                        onChange={(e) =>
                          updateLead(lead.id, { status: e.target.value })
                        }
                        style={styles.select}
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status}>{status}</option>
                        ))}
                      </select>
                    </td>

                    <td style={styles.td}>
                      <select
                        value={lead.priority || "Warm"}
                        onChange={(e) =>
                          updateLead(lead.id, { priority: e.target.value })
                        }
                        style={styles.select}
                      >
                        {PRIORITY_OPTIONS.map((priority) => (
                          <option key={priority}>{priority}</option>
                        ))}
                      </select>
                    </td>

                    <td style={styles.td}>
                      <input
                        type="date"
                        defaultValue={lead.follow_up_date || ""}
                        onChange={(e) =>
                          updateLead(lead.id, {
                            follow_up_date: e.target.value,
                          })
                        }
                        style={styles.input}
                      />
                    </td>

                    <td style={styles.td}>
                      <textarea
                        defaultValue={lead.notes || ""}
                        placeholder="Add notes..."
                        onBlur={(e) =>
                          updateLead(lead.id, { notes: e.target.value })
                        }
                        style={styles.notes}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div style={styles.statCard}>
      <p style={styles.statLabel}>{title}</p>
      <h3 style={styles.statValue}>{value}</h3>
    </div>
  );
}

function normalize(value?: string) {
  return (value || "").trim().toLowerCase();
}

function formatDate(date?: string) {
  if (!date) return "-";
  return new Date(date).toLocaleDateString();
}

function safeUrl(url: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `https://${url}`;
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f8f1e6",
    padding: "60px 7%",
    color: "#111",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 24,
    flexWrap: "wrap",
    marginBottom: 40,
  },
  label: {
    color: "#b88708",
    fontWeight: 900,
    letterSpacing: 5,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  title: {
    fontFamily: "Georgia, serif",
    fontSize: 58,
    lineHeight: 1,
    margin: 0,
  },
  subtitle: {
    fontSize: 21,
    color: "#17375e",
    maxWidth: 760,
    lineHeight: 1.6,
  },
  headerActions: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
  },
  homeButton: {
    background: "#fff",
    color: "#111",
    border: "1px solid #dec8a5",
    padding: "16px 22px",
    borderRadius: 16,
    textDecoration: "none",
    fontWeight: 900,
  },
  refreshButton: {
    background: "#111",
    color: "#fff",
    border: "none",
    padding: "16px 24px",
    borderRadius: 16,
    cursor: "pointer",
    fontWeight: 900,
    fontSize: 16,
  },
  errorBox: {
    background: "#ffecec",
    color: "#9b111e",
    padding: 16,
    borderRadius: 14,
    marginBottom: 24,
    fontWeight: 800,
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 20,
    marginBottom: 42,
  },
  statCard: {
    background: "#fff",
    padding: 28,
    borderRadius: 24,
    border: "1px solid #dec8a5",
    boxShadow: "0 14px 30px rgba(0,0,0,0.05)",
  },
  statLabel: {
    color: "#b88708",
    fontWeight: 900,
    letterSpacing: 4,
    textTransform: "uppercase",
    fontSize: 13,
  },
  statValue: {
    fontFamily: "Georgia, serif",
    fontSize: 52,
    margin: "10px 0 0",
  },
  tableCard: {
    background: "#fff",
    borderRadius: 28,
    padding: 28,
    border: "1px solid #dec8a5",
    boxShadow: "0 20px 45px rgba(0,0,0,0.07)",
  },
  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: "Georgia, serif",
    fontSize: 42,
    margin: 0,
  },
  sectionText: {
    color: "#17375e",
    fontSize: 17,
  },
  emptyText: {
    fontSize: 18,
    color: "#333",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: 1250,
  },
  th: {
    background: "#111",
    color: "#fff",
    padding: 14,
    textAlign: "left",
    fontSize: 14,
    whiteSpace: "nowrap",
  },
  td: {
    padding: 14,
    borderBottom: "1px solid #eee",
    verticalAlign: "top",
    fontSize: 15,
  },
  link: {
    color: "#b88708",
    fontWeight: 900,
  },
  select: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid #dec8a5",
    background: "#fff",
    fontWeight: 700,
  },
  input: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid #dec8a5",
  },
  notes: {
    width: 220,
    minHeight: 80,
    borderRadius: 12,
    border: "1px solid #dec8a5",
    padding: 10,
  },
  challenge: {
    maxWidth: 260,
    lineHeight: 1.5,
  },
};