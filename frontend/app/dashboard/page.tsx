"use client";

import { useEffect, useState } from "react";

type Lead = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  practice?: string;
  website?: string;
  challenge?: string;
  source?: string;
  status?: string;
  priority?: string;
  notes?: string;
  follow_up_date?: string;
  created_at?: string;
};

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadLeads() {
    setLoading(true);

    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      setLeads(data.leads || []);
    } catch {
      setLeads([]);
    }

    setLoading(false);
  }

  async function updateLead(
    id: string,
    updates: Partial<Lead>
  ) {
    await fetch("/api/leads", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        ...updates,
      }),
    });

    loadLeads();
  }

  useEffect(() => {
    loadLeads();
  }, []);

  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "New").length;
  const bookedLeads = leads.filter((l) => l.status === "Booked").length;
  const warmLeads = leads.filter((l) => l.priority === "Warm").length;

  return (
    <main style={styles.page}>
      <section style={styles.header}>
        <div>
          <p style={styles.label}>TheraGrowth OS</p>
          <h1 style={styles.title}>Client Acquisition Dashboard</h1>
          <p style={styles.subtitle}>
            Track audit requests, chatbot leads, follow-ups, and booked clients.
          </p>
        </div>

        <button onClick={loadLeads} style={styles.refreshButton}>
          {loading ? "Refreshing..." : "Refresh Leads"}
        </button>
      </section>

      <section style={styles.statsGrid}>
        <StatCard title="Total Leads" value={totalLeads} />
        <StatCard title="New Leads" value={newLeads} />
        <StatCard title="Booked" value={bookedLeads} />
        <StatCard title="Warm" value={warmLeads} />
      </section>

      <section style={styles.tableCard}>
        <h2 style={styles.sectionTitle}>Lead Pipeline</h2>

        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Website</th>
                <th style={styles.th}>Source</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Priority</th>
                <th style={styles.th}>Notes</th>
                <th style={styles.th}>Follow Up</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td style={styles.td}>{lead.name}</td>
                  <td style={styles.td}>{lead.email}</td>
                  <td style={styles.td}>
                    {lead.website ? (
                      <a href={lead.website} target="_blank">
                        Visit
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td style={styles.td}>{lead.source || "-"}</td>

                  <td style={styles.td}>
                    <select
                      value={lead.status || "New"}
                      onChange={(e) =>
                        updateLead(lead.id, {
                          status: e.target.value,
                        })
                      }
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
                        updateLead(lead.id, {
                          priority: e.target.value,
                        })
                      }
                    >
                      <option>Hot</option>
                      <option>Warm</option>
                      <option>Cold</option>
                    </select>
                  </td>

                  <td style={styles.td}>
                    <textarea
                      defaultValue={lead.notes || ""}
                      placeholder="Add notes..."
                      onBlur={(e) =>
                        updateLead(lead.id, {
                          notes: e.target.value,
                        })
                      }
                      style={styles.notes}
                    />
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
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
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
    padding: "50px",
    background: "#f7f0e7",
    fontFamily: "Inter, sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
    flexWrap: "wrap",
    gap: 20,
  },

  label: {
    color: "#b8860b",
    fontWeight: 800,
    letterSpacing: 2,
    textTransform: "uppercase",
  },

  title: {
    fontSize: 52,
    fontWeight: 900,
    margin: 0,
  },

  subtitle: {
    fontSize: 20,
    color: "#555",
  },

  refreshButton: {
    background: "#111",
    color: "#fff",
    border: "none",
    padding: "16px 22px",
    borderRadius: 14,
    cursor: "pointer",
    fontWeight: 700,
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: 20,
    marginBottom: 40,
  },

  statCard: {
    background: "#fff",
    padding: 24,
    borderRadius: 20,
    border: "1px solid #ddd",
  },

  statLabel: {
    color: "#b8860b",
    fontWeight: 800,
    letterSpacing: 2,
    textTransform: "uppercase",
  },

  statValue: {
    fontSize: 42,
    marginTop: 12,
  },

  tableCard: {
    background: "#fff",
    borderRadius: 20,
    padding: 24,
    border: "1px solid #ddd",
  },

  sectionTitle: {
    fontSize: 34,
    fontWeight: 900,
    marginBottom: 24,
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    background: "#111",
    color: "#fff",
    padding: 14,
    textAlign: "left",
  },

  td: {
    padding: 12,
    borderBottom: "1px solid #eee",
    verticalAlign: "top",
  },

  notes: {
    width: 200,
    minHeight: 80,
  },
};