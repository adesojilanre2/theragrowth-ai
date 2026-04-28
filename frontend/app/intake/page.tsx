"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type TherapistProfile = {
  id: string;
  practice_name: string;
  owner_name: string;
  email: string;
  phone: string;
  website_url: string;
  city: string;
  state: string;
  specialty: string;
  ideal_client: string;
  telehealth: boolean;
  current_leads_per_month: number;
  goals: string;
  created_at: string;
};

export default function DashboardPage() {
  const [profiles, setProfiles] = useState<TherapistProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProfiles = async () => {
    const { data, error } = await supabase
      .from("therapist_profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
    } else {
      setProfiles(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadProfiles();
  }, []);

  return (
    <main style={styles.page}>
      <section style={styles.header}>
        <div>
          <p style={styles.badge}>TheraGrowth AI Factory</p>
          <h1 style={styles.h1}>Admin Dashboard</h1>
          <p style={styles.text}>
            View therapist onboarding submissions and manage your sales pipeline.
          </p>
        </div>

        <div style={styles.statBox}>
          <p style={styles.statLabel}>Total Therapist Profiles</p>
          <h2 style={styles.statNumber}>{profiles.length}</h2>
        </div>
      </section>

      <section style={styles.card}>
        <h2 style={styles.h2}>Therapist Submissions</h2>

        {loading ? (
          <p>Loading...</p>
        ) : profiles.length === 0 ? (
          <p style={styles.text}>No therapist profiles yet.</p>
        ) : (
          <div style={styles.list}>
            {profiles.map((profile) => (
              <div key={profile.id} style={styles.profileCard}>
                <div style={styles.profileHeader}>
                  <div>
                    <h3 style={styles.profileTitle}>
                      {profile.practice_name || "Unnamed Practice"}
                    </h3>
                    <p style={styles.text}>
                      {profile.owner_name} • {profile.city}, {profile.state}
                    </p>
                  </div>

                  <span style={styles.status}>New Lead</span>
                </div>

                <div style={styles.grid}>
                  <Info label="Email" value={profile.email} />
                  <Info label="Phone" value={profile.phone} />
                  <Info label="Website" value={profile.website_url} />
                  <Info label="Specialty" value={profile.specialty} />
                  <Info label="Ideal Client" value={profile.ideal_client} />
                  <Info
                    label="Current Leads / Month"
                    value={String(profile.current_leads_per_month ?? 0)}
                  />
                  <Info
                    label="Telehealth"
                    value={profile.telehealth ? "Yes" : "No"}
                  />
                  <Info
                    label="Submitted"
                    value={new Date(profile.created_at).toLocaleString()}
                  />
                </div>

                <div style={styles.goalsBox}>
                  <strong>Growth Goals / Challenges</strong>
                  <p>{profile.goals || "No goals entered."}</p>
                </div>

                <div style={styles.buttonRow}>
                  <a href={`mailto:${profile.email}`} style={styles.primaryBtn}>
                    Email Lead
                  </a>
                  <a href={`tel:${profile.phone}`} style={styles.secondaryBtn}>
                    Call Lead
                  </a>
                  <a href={profile.website_url} target="_blank" style={styles.secondaryBtn}>
                    Visit Website
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function Info({ label, value }: { label: string; value?: string }) {
  return (
    <div style={styles.infoBox}>
      <p style={styles.infoLabel}>{label}</p>
      <p style={styles.infoValue}>{value || "Not provided"}</p>
    </div>
  );
}

const styles: Record<string, any> = {
  page: {
    minHeight: "100vh",
    background: "#f5f7fb",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
    color: "#08122d",
  },
  header: {
    maxWidth: "1180px",
    margin: "0 auto 28px",
    background: "white",
    borderRadius: "30px",
    padding: "42px",
    display: "flex",
    justifyContent: "space-between",
    gap: "24px",
    boxShadow: "0 24px 60px rgba(8,18,45,0.08)",
  },
  badge: {
    display: "inline-block",
    background: "#e8eefc",
    padding: "10px 18px",
    borderRadius: "999px",
    fontWeight: 700,
  },
  h1: {
    fontSize: "48px",
    marginBottom: "10px",
  },
  h2: {
    fontSize: "30px",
    marginTop: 0,
  },
  text: {
    color: "#475569",
    fontSize: "16px",
    lineHeight: "1.6",
  },
  statBox: {
    minWidth: "240px",
    background: "#08122d",
    color: "white",
    borderRadius: "24px",
    padding: "26px",
  },
  statLabel: {
    color: "#dbeafe",
    margin: 0,
  },
  statNumber: {
    fontSize: "48px",
    margin: "10px 0 0",
  },
  card: {
    maxWidth: "1180px",
    margin: "0 auto",
    background: "white",
    borderRadius: "30px",
    padding: "36px",
  },
  list: {
    display: "grid",
    gap: "22px",
  },
  profileCard: {
    border: "1px solid #e5e7eb",
    borderRadius: "24px",
    padding: "26px",
    background: "#ffffff",
  },
  profileHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    alignItems: "flex-start",
  },
  profileTitle: {
    fontSize: "24px",
    margin: "0 0 6px",
  },
  status: {
    background: "#dcfce7",
    color: "#166534",
    padding: "8px 14px",
    borderRadius: "999px",
    fontWeight: 700,
    whiteSpace: "nowrap",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "14px",
    marginTop: "22px",
  },
  infoBox: {
    background: "#f8fafc",
    borderRadius: "16px",
    padding: "14px",
    border: "1px solid #e2e8f0",
  },
  infoLabel: {
    color: "#64748b",
    fontSize: "13px",
    margin: "0 0 6px",
    fontWeight: 700,
  },
  infoValue: {
    color: "#08122d",
    margin: 0,
    wordBreak: "break-word",
  },
  goalsBox: {
    marginTop: "20px",
    padding: "18px",
    borderRadius: "18px",
    background: "#f8fafc",
    color: "#334155",
    lineHeight: "1.6",
  },
  buttonRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "18px",
  },
  primaryBtn: {
    background: "#08122d",
    color: "white",
    padding: "12px 18px",
    borderRadius: "12px",
    textDecoration: "none",
    fontWeight: 700,
  },
  secondaryBtn: {
    background: "#eef2ff",
    color: "#08122d",
    padding: "12px 18px",
    borderRadius: "12px",
    textDecoration: "none",
    fontWeight: 700,
  },
};