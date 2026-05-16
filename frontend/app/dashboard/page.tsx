"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

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
  owner_email?: string;
};

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [ownerEmail, setOwnerEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function getUserEmail() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) {
      window.location.href = "/login";
      return "";
    }

    setOwnerEmail(user.email);
    return user.email;
  }

  async function loadLeads() {
    setLoading(true);
    setMessage("");

    const email = ownerEmail || (await getUserEmail());

    if (!email) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/leads?owner_email=${encodeURIComponent(email)}`);
      const data = await res.json();
      setLeads(data.leads || []);
    } catch {
      setMessage("Could not load leads.");
    }

    setLoading(false);
  }

  async function updateLead(id: string, updates: Partial<Lead>) {
    if (!ownerEmail) return;

    await fetch("/api/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        owner_email: ownerEmail,
        ...updates,
      }),
    });

    loadLeads();
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  useEffect(() => {
    loadLeads();
  }, []);

  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "New").length;
  const warmLeads = leads.filter((l) => l.priority === "Warm").length;
  const bookedLeads = leads.filter((l) => l.status === "Booked").length;
  const followUpsDue = leads.filter((l) => {
    if (!l.follow_up_date) return false;
    return new Date(l.follow_up_date) <= new Date();
  }).length;

  return (
    <main style={styles.page}>
      <section style={styles.header}>
        <p style={styles.label}>TheraGrowth OS</p>
        <h1 style={styles.title}>Client Acquisition Dashboard</h1>
        <p style={styles.subtitle}>
          Logged in as <b>{ownerEmail}</b>. Manage your audit leads, follow-ups,
          and booked calls.
        </p>

        <div style={styles.buttonRow}>
          <a href="/" style={styles.secondaryButton}>Back to Website</a>
          <button onClick={loadLeads} style={styles.primaryButton}>
            {loading ? "Refreshing..." : "Refresh Leads"}
          </button>
          <button onClick={logout} style={styles.secondaryButton}>Logout</button>
        </div>

        {message && <p style={styles.error}>{message}</p>}
      </section>

      <section style={styles.statsGrid}>
        <StatCard title="Total Leads" value={totalLeads} />
        <StatCard title="New Leads" value={newLeads} />
        <StatCard title="Warm Leads" value={warmLeads} />
        <StatCard title="Booked Calls" value={bookedLeads} />
        <StatCard title="Follow-Ups Due" value={followUpsDue} />
      </section>

      <section style={styles.crmCard}>
        <h2 style={styles.sectionTitle}>Lead CRM</h2>
        <p style={styles.crmSubtitle}>
          Update status, priority, notes, and follow-up dates.
        </p>

        {leads.length === 0 ? (
          <p>No leads yet. Submit a free audit form while logged in.</p>
        ) : (
          <div style={styles.tableWrap}>
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
                    <td style={styles.td}>
                      {lead.created_at
                        ? new Date(lead.created_at).toLocaleDateString()
                        : "-"}
                    </td>
                    <td style={styles.td}>{lead.name || "-"}</td>
                    <td style={styles.td}>{lead.email || "-"}</td>
                    <td style={styles.td}>{lead.phone || "-"}</td>
                    <td style={styles.td}>{lead.practice || "-"}</td>
                    <td style={styles.td}>
                      {lead.website ? (
                        <a href={lead.website} target="_blank">
                          Visit
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td style={styles.td}>{lead.challenge || "-"}</td>
                    <td style={styles.td}>{lead.source || "-"}</td>

                    <td style={styles.td}>
                      <select
                        value={lead.status || "New"}
                        onChange={(e) =>
                          updateLead(lead.id, { status: e.target.value })
                        }
                        style={styles.select}
                      >
                        <option>New</option>
                        <option>Contacted</option>
                        <option>Booked</option>
                        <option>Not Fit</option>
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
                        <option>Hot</option>
                        <option>Warm</option>
                        <option>Cold</option>
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

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f7f0e7",
    padding: "70px 7%",
    color: "#111",
  },
  header: {
    marginBottom: 70,
  },
  label: {
    color: "#b88700",
    fontWeight: 900,
    letterSpacing: 6,
    textTransform: "uppercase",
  },
  title: {
    fontFamily: "Georgia, serif",
    fontSize: 62,
    margin: "10px 0",
    lineHeight: 1,
  },
  subtitle: {
    fontSize: 21,
    color: "#08234a",
    maxWidth: 780,
    lineHeight: 1.5,
  },
  buttonRow: {
    display: "flex",
    gap: 14,
    marginTop: 24,
    flexWrap: "wrap",
  },
  primaryButton: {
    background: "#111",
    color: "#fff",
    border: "none",
    borderRadius: 14,
    padding: "17px 24px",
    fontWeight: 900,
    cursor: "pointer",
  },
  secondaryButton: {
    background: "#fffaf3",
    color: "#111",
    border: "1px solid #decba8",
    borderRadius: 14,
    padding: "17px 24px",
    fontWeight: 900,
    textDecoration: "none",
    cursor: "pointer",
  },
  error: {
    color: "crimson",
    fontWeight: 800,
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 22,
    marginBottom: 50,
  },
  statCard: {
    background: "#fff",
    border: "1px solid #decba8",
    borderRadius: 22,
    padding: 28,
    boxShadow: "0 15px 35px rgba(0,0,0,0.05)",
  },
  statLabel: {
    color: "#b88700",
    fontWeight: 900,
    letterSpacing: 5,
    textTransform: "uppercase",
  },
  statValue: {
    fontFamily: "Georgia, serif",
    fontSize: 54,
    margin: "20px 0 0",
  },
  crmCard: {
    background: "#fff",
    border: "1px solid #decba8",
    borderRadius: 24,
    padding: 30,
  },
  sectionTitle: {
    fontFamily: "Georgia, serif",
    fontSize: 44,
    margin: 0,
  },
  crmSubtitle: {
    color: "#08234a",
    fontSize: 17,
  },
  tableWrap: {
    overflowX: "auto",
    marginTop: 24,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: 1200,
  },
  th: {
    background: "#111",
    color: "#fff",
    padding: 14,
    textAlign: "left",
    fontSize: 14,
  },
  td: {
    padding: 14,
    borderBottom: "1px solid #eee",
    verticalAlign: "top",
  },
  select: {
    padding: 10,
    borderRadius: 10,
    border: "1px solid #decba8",
    background: "#fff",
  },
  input: {
    padding: 10,
    borderRadius: 10,
    border: "1px solid #decba8",
  },
  notes: {
    width: 180,
    minHeight: 70,
    borderRadius: 10,
    border: "1px solid #decba8",
    padding: 10,
  },
};