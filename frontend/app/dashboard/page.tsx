"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

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

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  async function getToken() {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token || "";
  }

  async function loadLeads() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    setUserEmail(user.email || "");

    const token = await getToken();

    const res = await fetch("/api/leads", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setLeads(data.leads || []);
    setLoading(false);
  }

  async function updateLead(id: string, updates: Partial<Lead>) {
    const token = await getToken();

    await fetch("/api/leads", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, ...updates }),
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
  const newLeads = leads.filter((lead) => (lead.status || "New") === "New").length;
  const warmLeads = leads.filter((lead) => (lead.priority || "Warm") === "Warm").length;
  const bookedLeads = leads.filter((lead) => lead.status === "Booked").length;
  const websitesCaptured = leads.filter((lead) => lead.website && lead.website !== "-").length;

  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <div>
          <p style={styles.label}>TheraGrowth OS</p>
          <h1 style={styles.title}>Client Acquisition Dashboard</h1>
          <p style={styles.subtitle}>
            Logged in as <b>{userEmail}</b>. Track only your own practice leads,
            follow-ups, booked calls, and website opportunities.
          </p>
        </div>

        <div style={styles.actions}>
          <a href="/" style={styles.lightButton}>Back to Website</a>
          <button onClick={loadLeads} style={styles.darkButton}>
            {loading ? "Refreshing..." : "Refresh Leads"}
          </button>
          <button onClick={logout} style={styles.lightButton}>Logout</button>
        </div>
      </section>

      <section style={styles.statsGrid}>
        <StatCard title="Total Leads" value={totalLeads} />
        <StatCard title="New Leads" value={newLeads} />
        <StatCard title="Warm Leads" value={warmLeads} />
        <StatCard title="Booked Calls" value={bookedLeads} />
        <StatCard title="Websites Captured" value={websitesCaptured} />
      </section>

      <section style={styles.crmCard}>
        <h2 style={styles.sectionTitle}>Lead CRM</h2>
        <p style={styles.sectionText}>
          Manage every therapist inquiry from audit request to booked call.
        </p>

        {leads.length === 0 ? (
          <div style={styles.emptyBox}>
            No private leads yet for this account. Submit a test audit form or chatbot inquiry.
          </div>
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
                        <a href={lead.website} target="_blank" rel="noreferrer">
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
                        <option>Follow-Up</option>
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
    background: "#f8f1e8",
    color: "#071a33",
    padding: "70px 7%",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  hero: {
    display: "flex",
    justifyContent: "space-between",
    gap: 30,
    alignItems: "flex-start",
    flexWrap: "wrap",
    marginBottom: 60,
  },
  label: {
    color: "#b88700",
    textTransform: "uppercase",
    letterSpacing: 5,
    fontWeight: 900,
    marginBottom: 14,
  },
  title: {
    fontFamily: "Georgia, serif",
    fontSize: 58,
    lineHeight: 1,
    color: "#111",
    margin: 0,
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 1.6,
    maxWidth: 760,
    marginTop: 18,
  },
  actions: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
  },
  darkButton: {
    background: "#111",
    color: "#fff",
    border: "none",
    borderRadius: 14,
    padding: "16px 24px",
    fontWeight: 900,
    cursor: "pointer",
  },
  lightButton: {
    background: "#fffaf2",
    color: "#111",
    border: "1px solid #decba8",
    borderRadius: 14,
    padding: "16px 24px",
    fontWeight: 900,
    textDecoration: "none",
    cursor: "pointer",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: 20,
    marginBottom: 50,
  },
  statCard: {
    background: "#fff",
    border: "1px solid #decba8",
    borderRadius: 20,
    padding: 28,
    boxShadow: "0 18px 45px rgba(0,0,0,0.06)",
  },
  statLabel: {
    color: "#b88700",
    textTransform: "uppercase",
    letterSpacing: 4,
    fontWeight: 900,
    fontSize: 14,
  },
  statValue: {
    fontFamily: "Georgia, serif",
    fontSize: 54,
    margin: "20px 0 0",
    color: "#111",
  },
  crmCard: {
    background: "#fff",
    border: "1px solid #decba8",
    borderRadius: 24,
    padding: 30,
    boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
  },
  sectionTitle: {
    fontFamily: "Georgia, serif",
    fontSize: 44,
    margin: 0,
    color: "#111",
  },
  sectionText: {
    fontSize: 18,
    marginBottom: 24,
  },
  emptyBox: {
    padding: 24,
    background: "#fffaf2",
    border: "1px solid #decba8",
    borderRadius: 18,
    fontSize: 18,
  },
  tableWrap: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: 1300,
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
    fontSize: 15,
  },
  select: {
    padding: 10,
    borderRadius: 10,
    border: "1px solid #decba8",
    background: "#fff",
    fontWeight: 700,
  },
  input: {
    padding: 10,
    borderRadius: 10,
    border: "1px solid #decba8",
  },
  notes: {
    width: 180,
    minHeight: 70,
    borderRadius: 12,
    border: "1px solid #decba8",
    padding: 10,
  },
};