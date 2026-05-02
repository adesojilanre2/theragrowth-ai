"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Lead = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  source: string;
  service_interest: string;
  message: string;
  status: string;
  priority: string;
  estimated_value: number;
  created_at: string;
};

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadLeads() {
    const { data, error } = await supabase
      .from("saas_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setLeads(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadLeads();
  }, []);

  const totalLeads = leads.length;
  const booked = leads.filter((l) => l.status === "booked").length;
  const newLeads = leads.filter((l) => l.status === "new").length;
  const estimatedRevenue = leads.reduce(
    (sum, lead) => sum + Number(lead.estimated_value || 0),
    0
  );

  return (
    <main style={page}>
      <aside style={sidebar}>
        <div style={logo}>TG</div>
        <h2>TheraGrowth OS</h2>
        <p style={muted}>AI Growth Dashboard</p>

        <nav style={nav}>
          <a style={navItem}>Dashboard</a>
          <a style={navItem}>Leads</a>
          <a style={navItem}>AI Follow-Up</a>
          <a style={navItem}>Chatbot</a>
          <a style={navItem}>Revenue</a>
          <a style={navItem}>Settings</a>
        </nav>
      </aside>

      <section style={content}>
        <div style={topbar}>
          <div>
            <p style={eyebrow}>Practice Growth Command Center</p>
            <h1 style={h1}>Dashboard</h1>
          </div>
          <button style={button}>Add Lead</button>
        </div>

        <div style={statsGrid}>
          <Stat title="Total Leads" value={totalLeads.toString()} />
          <Stat title="New Leads" value={newLeads.toString()} />
          <Stat title="Booked Consults" value={booked.toString()} />
          <Stat title="Estimated Revenue" value={`$${estimatedRevenue}`} />
        </div>

        <section style={card}>
          <div style={sectionHeader}>
            <h2>Lead Pipeline</h2>
            <p style={muted}>Track every inquiry from first contact to booked consultation.</p>
          </div>

          {loading ? (
            <p>Loading leads...</p>
          ) : leads.length === 0 ? (
            <div style={emptyBox}>
              <h3>No SaaS leads yet</h3>
              <p>
                Your TheraGrowth OS database is ready. Leads from chatbot,
                forms, and intake systems will appear here.
              </p>
            </div>
          ) : (
            <div style={table}>
              <div style={tableHead}>
                <span>Name</span>
                <span>Email</span>
                <span>Status</span>
                <span>Priority</span>
                <span>Source</span>
                <span>Value</span>
              </div>

              {leads.map((lead) => (
                <div key={lead.id} style={tableRow}>
                  <span>{lead.full_name || "Unknown"}</span>
                  <span>{lead.email || "-"}</span>
                  <span style={pill}>{lead.status || "new"} </span>
                  <span>{lead.priority || "warm"}</span>
                  <span>{lead.source || "website"}</span>
                  <span>${lead.estimated_value || 0}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section style={grid2}>
          <div style={card}>
            <h2>AI Follow-Up Writer</h2>
            <p style={muted}>
              Generate warm replies, no-response follow-ups, and consultation reminders.
            </p>
            <button style={button}>Open AI Writer</button>
          </div>

          <div style={card}>
            <h2>Growth Score</h2>
            <p style={score}>72%</p>
            <p style={muted}>
              Based on lead response speed, follow-up activity, website clarity, and inquiry volume.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div style={statCard}>
      <p style={muted}>{title}</p>
      <h2 style={statValue}>{value}</h2>
    </div>
  );
}

const gold = "#b8892e";
const black = "#111111";
const cream = "#f7f1e8";
const soft = "#fffaf2";

const page = {
  minHeight: "100vh",
  display: "grid",
  gridTemplateColumns: "280px 1fr",
  background: cream,
  color: black,
  fontFamily: "Arial, sans-serif",
} as const;

const sidebar = {
  background: black,
  color: "white",
  padding: 28,
  minHeight: "100vh",
} as const;

const logo = {
  width: 64,
  height: 64,
  borderRadius: "50%",
  background: gold,
  color: black,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Georgia, serif",
  fontSize: 28,
  fontWeight: 900,
  marginBottom: 20,
} as const;

const nav = {
  display: "grid",
  gap: 12,
  marginTop: 35,
} as const;

const navItem = {
  padding: "14px 16px",
  borderRadius: 14,
  background: "#1d1d1d",
  color: "white",
  fontWeight: 800,
} as const;

const content = {
  padding: 40,
} as const;

const topbar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 30,
} as const;

const eyebrow = {
  color: gold,
  textTransform: "uppercase",
  letterSpacing: 2,
  fontWeight: 900,
} as const;

const h1 = {
  fontFamily: "Georgia, serif",
  fontSize: 60,
  margin: 0,
} as const;

const button = {
  background: black,
  color: "white",
  border: "none",
  borderRadius: 14,
  padding: "15px 22px",
  fontWeight: 900,
  cursor: "pointer",
} as const;

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: 18,
  marginBottom: 28,
} as const;

const statCard = {
  background: soft,
  border: "1px solid #e1cfb3",
  borderRadius: 24,
  padding: 24,
} as const;

const statValue = {
  fontFamily: "Georgia, serif",
  fontSize: 42,
  color: gold,
  margin: "8px 0 0",
} as const;

const card = {
  background: soft,
  border: "1px solid #e1cfb3",
  borderRadius: 28,
  padding: 28,
  marginBottom: 24,
} as const;

const sectionHeader = {
  marginBottom: 20,
} as const;

const muted = {
  color: "#6b5b48",
  lineHeight: 1.6,
} as const;

const emptyBox = {
  border: "1px dashed #d7c4a8",
  borderRadius: 20,
  padding: 30,
  background: "#fff8ed",
} as const;

const table = {
  display: "grid",
  gap: 10,
} as const;

const tableHead = {
  display: "grid",
  gridTemplateColumns: "1.2fr 1.5fr 1fr 1fr 1fr 1fr",
  fontWeight: 900,
  padding: 14,
  background: "#eadfce",
  borderRadius: 14,
} as const;

const tableRow = {
  display: "grid",
  gridTemplateColumns: "1.2fr 1.5fr 1fr 1fr 1fr 1fr",
  padding: 14,
  background: "white",
  borderRadius: 14,
  alignItems: "center",
} as const;

const pill = {
  background: black,
  color: "white",
  borderRadius: 999,
  padding: "6px 10px",
  width: "fit-content",
  fontWeight: 800,
} as const;

const grid2 = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 24,
} as const;

const score = {
  fontFamily: "Georgia, serif",
  color: gold,
  fontSize: 70,
  fontWeight: 900,
  margin: "10px 0",
} as const;