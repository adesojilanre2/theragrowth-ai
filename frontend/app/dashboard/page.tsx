export default function DashboardPage() {
  const leads = [
    {
      name: "Test Lead",
      email: "adesojilanre2@yahoo.com",
      phone: "5555555555",
      niche: "Anxiety Therapy",
      plan: "$99/mo SaaS",
      status: "New Lead",
      nextAction: "Send audit reply",
    },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "#f8f4ea", padding: "50px 8%" }}>
      <h1 style={{ fontFamily: "Georgia, serif", fontSize: 64, marginBottom: 10 }}>
        TheraGrowth CRM Dashboard
      </h1>

      <p style={{ fontSize: 20, marginBottom: 30 }}>
        Track audit requests, follow-ups, and therapist leads.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
          marginBottom: 40,
        }}
      >
        <Card title="New Leads" value="1" />
        <Card title="Follow-Ups Due" value="1" />
        <Card title="Booked Calls" value="0" />
        <Card title="Potential MRR" value="$99" />
      </div>

      <section
        style={{
          background: "white",
          border: "1px solid #d7c4a8",
          borderRadius: 24,
          padding: 30,
        }}
      >
        <h2 style={{ fontSize: 32, marginBottom: 20 }}>Lead Pipeline</h2>

        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 16 }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>
              <th style={th}>Name</th>
              <th style={th}>Email</th>
              <th style={th}>Phone</th>
              <th style={th}>Niche</th>
              <th style={th}>Plan</th>
              <th style={th}>Status</th>
              <th style={th}>Next Action</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                <td style={td}>{lead.name}</td>
                <td style={td}>{lead.email}</td>
                <td style={td}>{lead.phone}</td>
                <td style={td}>{lead.niche}</td>
                <td style={td}>{lead.plan}</td>
                <td style={td}>
                  <span
                    style={{
                      background: "#111",
                      color: "white",
                      padding: "6px 12px",
                      borderRadius: 999,
                      fontWeight: 700,
                    }}
                  >
                    {lead.status}
                  </span>
                </td>
                <td style={td}>{lead.nextAction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div
      style={{
        background: "#111",
        color: "white",
        borderRadius: 22,
        padding: 26,
      }}
    >
      <p style={{ color: "#c7962b", fontWeight: 800 }}>{title}</p>
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: 48 }}>{value}</h2>
    </div>
  );
}

const th = {
  padding: "14px 10px",
  fontWeight: 900,
} as const;

const td = {
  padding: "16px 10px",
} as const;