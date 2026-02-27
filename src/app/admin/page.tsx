"use client";

import { useEffect, useState } from "react";
import StatCard from "./components/StatCard";
import StatusBadge from "./components/StatusBadge";

interface Stats {
  counts: {
    shows: number;
    partners: number;
    pendingBookings: number;
    pendingApplications: number;
    pendingRequests: number;
    pendingOffers: number;
  };
  recent: { type: string; id: string; label: string; status: string; createdAt: string }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats").then((r) => r.json()).then(setStats);
  }, []);

  if (!stats) return <div className="text-zinc-600 text-sm">Loading...</div>;

  return (
    <div>
      <h1 className="text-xl font-light text-white tracking-wider mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        <StatCard label="Trade Shows" value={stats.counts.shows} />
        <StatCard label="Partners" value={stats.counts.partners} />
        <StatCard label="Pending Bookings" value={stats.counts.pendingBookings} accent="text-amber-400" />
        <StatCard label="Pending Applications" value={stats.counts.pendingApplications} accent="text-amber-400" />
        <StatCard label="Pending Requests" value={stats.counts.pendingRequests} accent="text-amber-400" />
        <StatCard label="Pending Offers" value={stats.counts.pendingOffers} accent="text-amber-400" />
      </div>

      <div>
        <h2 className="text-[10px] tracking-[0.35em] uppercase text-zinc-500 mb-4">Recent Submissions</h2>
        <div className="border border-zinc-800">
          {stats.recent.length === 0 && (
            <p className="px-4 py-8 text-center text-xs text-zinc-600">No submissions yet</p>
          )}
          {stats.recent.map((item) => (
            <div key={`${item.type}-${item.id}`} className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/50 last:border-0">
              <div className="flex items-center gap-3">
                <span className="text-[10px] tracking-wider uppercase text-zinc-600 w-32">{item.type.replace("-", " ")}</span>
                <span className="text-sm text-zinc-400">{item.label}</span>
              </div>
              <div className="flex items-center gap-4">
                <StatusBadge status={item.status} />
                <span className="text-[10px] text-zinc-700">{new Date(item.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
