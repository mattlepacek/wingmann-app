"use client";

import { useEffect, useState } from "react";
import type { ShowRequest } from "@/lib/types";
import DataTable, { Column } from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";

export default function AdminShowRequestsPage() {
  const [requests, setRequests] = useState<ShowRequest[]>([]);
  const [selected, setSelected] = useState<ShowRequest | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ShowRequest | null>(null);
  const [converting, setConverting] = useState(false);

  const load = () => fetch("/api/admin/show-requests").then((r) => r.json()).then(setRequests);
  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/show-requests/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setSelected(null);
    load();
  };

  const convertToShow = async (id: string) => {
    setConverting(true);
    await fetch(`/api/admin/show-requests/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _action: "convert" }),
    });
    setConverting(false);
    setSelected(null);
    load();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await fetch(`/api/admin/show-requests/${deleteTarget.id}`, { method: "DELETE" });
    setDeleteTarget(null);
    load();
  };

  const columns: Column<ShowRequest>[] = [
    { key: "showName", label: "Show", render: (r) => <span className="text-white">{r.showName}</span> },
    { key: "name", label: "Requester" },
    { key: "industry", label: "Industry" },
    { key: "dates", label: "Dates" },
    { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
    {
      key: "actions", label: "", render: (r) => (
        <button
          onClick={(e) => { e.stopPropagation(); setDeleteTarget(r); }}
          className="text-[10px] text-zinc-600 hover:text-red-400 uppercase tracking-wider transition"
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-xl font-light text-white tracking-wider mb-8">Show Requests</h1>

      <DataTable columns={columns} data={requests} onRowClick={setSelected} />

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Show Request Details">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-zinc-600">Show:</span> <span className="text-white">{selected.showName}</span></div>
              <div><span className="text-zinc-600">Industry:</span> <span className="text-zinc-400">{selected.industry}</span></div>
              <div><span className="text-zinc-600">Dates:</span> <span className="text-zinc-400">{selected.dates}</span></div>
              <div><span className="text-zinc-600">Location:</span> <span className="text-zinc-400">{selected.location}</span></div>
              <div><span className="text-zinc-600">Contact:</span> <span className="text-zinc-400">{selected.name}</span></div>
              <div><span className="text-zinc-600">Email:</span> <span className="text-zinc-400">{selected.email}</span></div>
              {selected.deploymentMode && <div><span className="text-zinc-600">Mode:</span> <span className="text-zinc-400">{selected.deploymentMode}</span></div>}
            </div>
            {selected.objectives && (
              <div>
                <span className="text-xs text-zinc-600">Objectives:</span>
                <p className="text-sm text-zinc-400 mt-1">{selected.objectives}</p>
              </div>
            )}
            <div className="text-xs text-zinc-700">Submitted: {new Date(selected.createdAt).toLocaleString()}</div>

            <div className="border-t border-zinc-800 pt-4">
              <label className="block text-xs text-zinc-500 mb-2">Update Status</label>
              <div className="flex flex-wrap gap-2">
                {(["pending", "approved", "rejected"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(selected.id, s)}
                    className={`px-3 py-1.5 text-[10px] tracking-wider uppercase border transition ${
                      selected.status === s
                        ? "border-white text-white bg-white/5"
                        : "border-zinc-800 text-zinc-500 hover:border-zinc-600"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {selected.status === "pending" && (
              <div className="border-t border-zinc-800 pt-4">
                <button
                  onClick={() => convertToShow(selected.id)}
                  disabled={converting}
                  className="px-4 py-2 text-xs tracking-wider uppercase font-medium text-black bg-emerald-500 hover:bg-emerald-600 transition disabled:opacity-50"
                >
                  {converting ? "Converting..." : "Convert to Show"}
                </button>
                <p className="text-[10px] text-zinc-600 mt-2">Creates a new show entry and marks this request as approved.</p>
              </div>
            )}
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Show Request"
        message={`Delete request for "${deleteTarget?.showName}"? This cannot be undone.`}
        confirmLabel="Delete"
        destructive
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
