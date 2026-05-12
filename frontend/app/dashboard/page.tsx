"use client";

import { useEffect, useState } from "react";

type Lead = {
  id: string;
  name: string | null;
  email: string | null;
  website: string | null;
  phone: string | null;
  practice_type: string | null;
  main_challenge: string | null;
  status: string | null;
  priority: string | null;
  created_at: string;
};

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadLeads() {
    setLoading(true);

    try {
      const response = await fetch("/api/leads");
      const data = await response.json();
      setLeads(data.leads || []);
    } catch {
      setLeads([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLeads();
  }, []);

  return (
    <main className="min-h-screen bg-[#f7f0e6] px-6 py-10 text-[#111111] md:px-[6%]">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <h1 className="text-5xl font-black">TheraGrowth Dashboard</h1>
            <p className="mt-3 text-lg text-[#5f5a52]">
              Chatbot leads, website audit requests, and therapist growth pipeline.
            </p>
          </div>

          <button
            onClick={loadLeads}
            className="rounded-full bg-[#111111] px-6 py-4 font-black text-white"
          >
            Refresh Leads
          </button>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-4">
          <StatCard title="Total Leads" value={leads.length} />
          <StatCard
            title="New"
            value={leads.filter((lead) => lead.status === "New").length}
          />
          <StatCard
            title="Warm"
            value={leads.filter((lead) => lead.priority === "Warm").length}
          />
          <StatCard
            title="Websites Captured"
            value={leads.filter((lead) => lead.website).length}
          />
        </div>

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-[#e0caa8] bg-white shadow-xl">
          <div className="border-b border-[#eadcc6] p-6">
            <h2 className="text-3xl font-black">Lead Pipeline</h2>
          </div>

          {loading ? (
            <p className="p-6">Loading leads...</p>
          ) : leads.length === 0 ? (
            <p className="p-6">
              No leads yet. Test your chatbot on the homepage and submit your email
              and website.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">
                <thead className="bg-[#111111] text-white">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Website</th>
                    <th className="p-4">Challenge</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Priority</th>
                    <th className="p-4">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-[#eadcc6]">
                      <td className="p-4 font-bold">{lead.name || "Unknown"}</td>
                      <td className="p-4">{lead.email || "-"}</td>
                      <td className="p-4">
                        {lead.website ? (
                          <a
                            href={
                              lead.website.startsWith("http")
                                ? lead.website
                                : `https://${lead.website}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-[#b5851d] underline"
                          >
                            Open
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="max-w-sm p-4">{lead.main_challenge || "-"}</td>
                      <td className="p-4">
                        <span className="rounded-full bg-[#f7f0e6] px-3 py-2 text-sm font-black">
                          {lead.status || "New"}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="rounded-full bg-[#111111] px-3 py-2 text-sm font-black text-white">
                          {lead.priority || "Warm"}
                        </span>
                      </td>
                      <td className="p-4 text-sm">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-[2rem] border border-[#e0caa8] bg-white p-6 shadow-sm">
      <p className="text-sm font-black uppercase tracking-[0.2em] text-[#b5851d]">
        {title}
      </p>
      <p className="mt-3 text-4xl font-black">{value}</p>
    </div>
  );
}