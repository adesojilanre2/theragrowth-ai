"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Lead = {
  id: string;
  therapist_slug: string;
  full_name: string;
  email: string;
  phone: string;
  insurance_provider: string;
  support_needed: string;
  status: string;
  follow_up_note: string;
  next_action: string;
  priority: string;
  follow_up_date: string;
  created_at: string;
  last_updated_at: string;
};

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [savingId, setSavingId] = useState("");

  useEffect(() => {
    loadLeads();
  }, []);

  async function loadLeads() {
    const { data, error } = await supabase
      .from("therapist_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    else setLeads(data || []);

    setLoading(false);
  }

  function updateLocalLead(id: string, field: keyof Lead, value: string) {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, [field]: value } : lead))
    );
  }

  async function updateLeadStatus(id: string, status: string) {
    const updatedAt = new Date().toISOString();

    const { error } = await supabase
      .from("therapist_leads")
      .update({ status, last_updated_at: updatedAt })
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Status update failed.");
      return;
    }

    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === id ? { ...lead, status, last_updated_at: updatedAt } : lead
      )
    );
  }

  async function saveLeadTracking(lead: Lead) {
    setSavingId(lead.id);
    const updatedAt = new Date().toISOString();

    const { error } = await supabase
      .from("therapist_leads")
      .update({
        follow_up_note: lead.follow_up_note || "",
        next_action: lead.next_action || "",
        priority: lead.priority || "warm",
        follow_up_date: lead.follow_up_date || null,
        last_updated_at: updatedAt,
      })
      .eq("id", lead.id);

    if (error) {
      console.error(error);
      alert("Tracking failed to save.");
      setSavingId("");
      return;
    }

    setLeads((prev) =>
      prev.map((item) =>
        item.id === lead.id ? { ...item, last_updated_at: updatedAt } : item
      )
    );

    setSavingId("");
  }

  function getFollowUpLabel(date?: string) {
    if (!date) return null;

    const today = new Date();
    const followDate = new Date(date + "T00:00:00");

    today.setHours(0, 0, 0, 0);

    if (followDate < today) return "Overdue";
    if (followDate.getTime() === today.getTime()) return "Due Today";

    return "Upcoming";
  }

  function formatFollowUpDate(date?: string) {
    if (!date) return "";
    const parsed = new Date(date + "T00:00:00");
    return parsed.toLocaleDateString();
  }

  function matchesSearch(lead: Lead) {
    const query = search.toLowerCase().trim();

    if (!query) return true;

    return (
      lead.full_name?.toLowerCase().includes(query) ||
      lead.email?.toLowerCase().includes(query) ||
      lead.phone?.toLowerCase().includes(query) ||
      lead.insurance_provider?.toLowerCase().includes(query) ||
      lead.support_needed?.toLowerCase().includes(query) ||
      lead.follow_up_note?.toLowerCase().includes(query) ||
      lead.next_action?.toLowerCase().includes(query)
    );
  }

  const totalLeads = leads.length;
  const newLeads = leads.filter((lead) => lead.status === "new").length;
  const contactedLeads = leads.filter((lead) => lead.status === "contacted").length;
  const bookedLeads = leads.filter((lead) => lead.status === "booked").length;
  const notFitLeads = leads.filter((lead) => lead.status === "not_a_fit").length;
  const overdueLeads = leads.filter(
    (lead) => getFollowUpLabel(lead.follow_up_date) === "Overdue"
  ).length;

  const filteredLeads = leads.filter((lead) => {
    const statusMatch = filter === "all" || lead.status === filter;
    return statusMatch && matchesSearch(lead);
  });

  const filters = [
    { key: "all", label: "all", count: totalLeads },
    { key: "new", label: "new", count: newLeads },
    { key: "contacted", label: "contacted", count: contactedLeads },
    { key: "booked", label: "booked", count: bookedLeads },
    { key: "not_a_fit", label: "not a fit", count: notFitLeads },
  ];

  return (
    <main style={pageStyle}>
      <section style={containerStyle}>
        <div style={headerCardStyle}>
          <div style={pillStyle}>TheraGrowth AI</div>

          <h1 style={titleStyle}>Lead Dashboard</h1>

          <p style={subtitleStyle}>
            Manage therapist leads, follow-up notes, priority, next action, and
            booking pipeline.
          </p>

          <div style={statsGridStyle}>
            <StatCard title="Total Leads" value={String(totalLeads)} />
            <StatCard title="New Leads" value={String(newLeads)} />
            <StatCard title="Booked" value={String(bookedLeads)} />
            <StatCard title="Overdue" value={String(overdueLeads)} />
          </div>
        </div>

        <div style={sectionCardStyle}>
          <h2 style={sectionTitleStyle}>Consultation Requests</h2>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, phone, insurance, support need, notes..."
            style={searchInputStyle}
          />

          <div style={filterWrapStyle}>
            {filters.map((item) => (
              <button
                key={item.key}
                onClick={() => setFilter(item.key)}
                style={{
                  ...filterButtonStyle,
                  background: filter === item.key ? "#07112f" : "#eef3ff",
                  color: filter === item.key ? "white" : "#07112f",
                }}
              >
                {item.label} ({item.count})
              </button>
            ))}
          </div>

          <p style={resultTextStyle}>
            Showing {filteredLeads.length} of {totalLeads} lead
            {totalLeads === 1 ? "" : "s"}
          </p>

          {loading ? (
            <p>Loading leads...</p>
          ) : filteredLeads.length === 0 ? (
            <p>No leads found.</p>
          ) : (
            <div style={{ display: "grid", gap: "22px" }}>
              {filteredLeads.map((lead) => {
                const followUpLabel = getFollowUpLabel(lead.follow_up_date);

                return (
                  <div key={lead.id} style={leadCardStyle}>
                    <div style={leadTopRowStyle}>
                      <div>
                        <h3 style={leadNameStyle}>
                          {lead.full_name || "Unnamed Lead"}
                        </h3>
                        <p style={mutedTextStyle}>
                          Therapist: {lead.therapist_slug}
                        </p>
                      </div>

                      <div style={badgeWrapStyle}>
                        <div style={statusBadgeStyle}>
                          {lead.status ? lead.status.replace("_", " ") : "new"}
                        </div>

                        <div
                          style={{
                            ...priorityBadgeStyle,
                            background:
                              lead.priority === "hot"
                                ? "#fee2e2"
                                : lead.priority === "cold"
                                ? "#e0f2fe"
                                : "#fef3c7",
                            color:
                              lead.priority === "hot"
                                ? "#991b1b"
                                : lead.priority === "cold"
                                ? "#075985"
                                : "#92400e",
                          }}
                        >
                          {(lead.priority || "warm").toUpperCase()}
                        </div>

                        {lead.follow_up_date && (
                          <div style={dateBadgeStyle}>
                            Follow-up: {formatFollowUpDate(lead.follow_up_date)}
                          </div>
                        )}

                        {followUpLabel && (
                          <div
                            style={{
                              ...dueBadgeStyle,
                              background:
                                followUpLabel === "Overdue"
                                  ? "#fee2e2"
                                  : followUpLabel === "Due Today"
                                  ? "#dcfce7"
                                  : "#eef3ff",
                              color:
                                followUpLabel === "Overdue"
                                  ? "#991b1b"
                                  : followUpLabel === "Due Today"
                                  ? "#166534"
                                  : "#1e3a8a",
                            }}
                          >
                            {followUpLabel}
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={infoGridStyle}>
                      <InfoBox title="Email" value={lead.email} />
                      <InfoBox title="Phone" value={lead.phone} />
                      <InfoBox title="Insurance" value={lead.insurance_provider} />
                    </div>

                    <div style={supportBoxStyle}>
                      <strong>Support Needed:</strong>
                      <p style={supportTextStyle}>
                        {lead.support_needed || "No message provided."}
                      </p>
                    </div>

                    <div style={crmGridStyle}>
                      <div>
                        <label style={labelStyle}>Priority</label>
                        <select
                          value={lead.priority || "warm"}
                          onChange={(e) =>
                            updateLocalLead(lead.id, "priority", e.target.value)
                          }
                          style={inputStyle}
                        >
                          <option value="hot">Hot</option>
                          <option value="warm">Warm</option>
                          <option value="cold">Cold</option>
                        </select>
                      </div>

                      <div>
                        <label style={labelStyle}>Follow-up Date</label>
                        <input
                          type="date"
                          value={lead.follow_up_date || ""}
                          onChange={(e) =>
                            updateLocalLead(
                              lead.id,
                              "follow_up_date",
                              e.target.value
                            )
                          }
                          style={inputStyle}
                        />
                      </div>
                    </div>

                    <div style={crmGridStyle}>
                      <div>
                        <label style={labelStyle}>Follow-up Note</label>
                        <textarea
                          value={lead.follow_up_note || ""}
                          onChange={(e) =>
                            updateLocalLead(
                              lead.id,
                              "follow_up_note",
                              e.target.value
                            )
                          }
                          placeholder="Example: Called client, left voicemail, asked for insurance card..."
                          rows={4}
                          style={textAreaStyle}
                        />
                      </div>

                      <div>
                        <label style={labelStyle}>Next Action</label>
                        <textarea
                          value={lead.next_action || ""}
                          onChange={(e) =>
                            updateLocalLead(
                              lead.id,
                              "next_action",
                              e.target.value
                            )
                          }
                          placeholder="Example: Follow up tomorrow, send intake form, verify insurance..."
                          rows={4}
                          style={textAreaStyle}
                        />
                      </div>
                    </div>

                    <div style={actionRowStyle}>
                      <button
                        onClick={() => saveLeadTracking(lead)}
                        style={saveButtonStyle}
                      >
                        {savingId === lead.id ? "Saving..." : "Save Tracking"}
                      </button>

                      <button
                        onClick={() => updateLeadStatus(lead.id, "contacted")}
                        style={secondaryActionStyle}
                      >
                        Mark Contacted
                      </button>

                      <button
                        onClick={() => updateLeadStatus(lead.id, "booked")}
                        style={secondaryActionStyle}
                      >
                        Mark Booked
                      </button>

                      <button
                        onClick={() => updateLeadStatus(lead.id, "not_a_fit")}
                        style={dangerActionStyle}
                      >
                        Mark Not a Fit
                      </button>
                    </div>

                    <p style={dateTextStyle}>
                      Submitted: {new Date(lead.created_at).toLocaleString()}
                    </p>

                    {lead.last_updated_at && (
                      <p style={dateTextStyle}>
                        Last updated:{" "}
                        {new Date(lead.last_updated_at).toLocaleString()}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div style={statCardStyle}>
      <div style={{ fontSize: "16px", opacity: 0.9 }}>{title}</div>
      <div style={statValueStyle}>{value}</div>
    </div>
  );
}

function InfoBox({ title, value }: { title: string; value?: string }) {
  return (
    <div style={infoBoxStyle}>
      <div style={infoTitleStyle}>{title}</div>
      <div>{value || "-"}</div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f4f6fb",
  padding: "60px 24px",
  fontFamily: "Arial, sans-serif",
  color: "#07112f",
} as const;

const containerStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "grid",
  gap: "32px",
} as const;

const headerCardStyle = {
  background: "white",
  borderRadius: "28px",
  padding: "42px",
} as const;

const pillStyle = {
  display: "inline-block",
  background: "#eef3ff",
  padding: "10px 18px",
  borderRadius: "999px",
  fontWeight: 700,
  marginBottom: "20px",
} as const;

const titleStyle = {
  fontSize: "64px",
  lineHeight: "1",
  margin: 0,
  fontWeight: 900,
} as const;

const subtitleStyle = {
  fontSize: "18px",
  marginTop: "18px",
  color: "#334155",
} as const;

const statsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: "18px",
  marginTop: "32px",
} as const;

const statCardStyle = {
  background: "#07112f",
  color: "white",
  borderRadius: "22px",
  padding: "28px",
} as const;

const statValueStyle = {
  fontSize: "50px",
  fontWeight: 900,
  marginTop: "12px",
} as const;

const sectionCardStyle = {
  background: "white",
  borderRadius: "28px",
  padding: "36px",
} as const;

const sectionTitleStyle = {
  fontSize: "34px",
  marginTop: 0,
  marginBottom: "20px",
  fontWeight: 900,
} as const;

const searchInputStyle = {
  width: "100%",
  border: "1px solid #dbe4ff",
  borderRadius: "18px",
  padding: "16px 18px",
  fontSize: "16px",
  outline: "none",
  marginBottom: "18px",
} as const;

const filterWrapStyle = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  marginBottom: "12px",
} as const;

const filterButtonStyle = {
  border: "none",
  padding: "10px 16px",
  borderRadius: "999px",
  fontWeight: 800,
  cursor: "pointer",
} as const;

const resultTextStyle = {
  color: "#64748b",
  fontWeight: 700,
  marginBottom: "24px",
} as const;

const leadCardStyle = {
  border: "1px solid #dbe4ff",
  borderRadius: "22px",
  padding: "24px",
} as const;

const leadTopRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: "20px",
  flexWrap: "wrap",
} as const;

const leadNameStyle = {
  margin: 0,
  fontSize: "24px",
  fontWeight: 900,
} as const;

const mutedTextStyle = {
  marginTop: "8px",
  color: "#64748b",
} as const;

const badgeWrapStyle = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  alignItems: "center",
} as const;

const statusBadgeStyle = {
  background: "#dcfce7",
  color: "#166534",
  padding: "10px 16px",
  borderRadius: "999px",
  fontWeight: 900,
  height: "fit-content",
  textTransform: "capitalize",
} as const;

const priorityBadgeStyle = {
  padding: "10px 16px",
  borderRadius: "999px",
  fontWeight: 900,
  height: "fit-content",
} as const;

const dateBadgeStyle = {
  padding: "10px 16px",
  borderRadius: "999px",
  background: "#eef2ff",
  color: "#1e3a8a",
  fontWeight: 900,
  height: "fit-content",
} as const;

const dueBadgeStyle = {
  padding: "10px 16px",
  borderRadius: "999px",
  fontWeight: 900,
  height: "fit-content",
} as const;

const infoGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: "14px",
  marginTop: "22px",
} as const;

const infoBoxStyle = {
  border: "1px solid #dbe4ff",
  borderRadius: "18px",
  padding: "18px",
} as const;

const infoTitleStyle = {
  fontWeight: 800,
  marginBottom: "10px",
  color: "#475569",
} as const;

const supportBoxStyle = {
  marginTop: "18px",
  background: "#f8fafc",
  borderRadius: "18px",
  padding: "18px",
} as const;

const supportTextStyle = {
  marginTop: "10px",
  marginBottom: 0,
  color: "#334155",
} as const;

const crmGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
  gap: "16px",
  marginTop: "18px",
} as const;

const labelStyle = {
  display: "block",
  fontWeight: 900,
  marginBottom: "8px",
} as const;

const inputStyle = {
  width: "100%",
  border: "1px solid #dbe4ff",
  borderRadius: "16px",
  padding: "14px",
  fontSize: "15px",
  outline: "none",
  background: "white",
} as const;

const textAreaStyle = {
  width: "100%",
  border: "1px solid #dbe4ff",
  borderRadius: "16px",
  padding: "14px",
  fontSize: "15px",
  outline: "none",
} as const;

const actionRowStyle = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  marginTop: "18px",
} as const;

const saveButtonStyle = {
  background: "#07112f",
  color: "white",
  border: "none",
  padding: "12px 18px",
  borderRadius: "14px",
  fontWeight: 900,
  cursor: "pointer",
} as const;

const secondaryActionStyle = {
  background: "#eef3ff",
  color: "#07112f",
  border: "none",
  padding: "12px 18px",
  borderRadius: "14px",
  fontWeight: 900,
  cursor: "pointer",
} as const;

const dangerActionStyle = {
  background: "#fee2e2",
  color: "#991b1b",
  border: "none",
  padding: "12px 18px",
  borderRadius: "14px",
  fontWeight: 900,
  cursor: "pointer",
} as const;

const dateTextStyle = {
  marginTop: "14px",
  fontSize: "14px",
  color: "#94a3b8",
} as const;