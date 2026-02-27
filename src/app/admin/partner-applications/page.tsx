"use client";

import { useEffect, useState } from "react";
import type { PartnerApplication } from "@/lib/types";
import DataTable, { Column } from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";

export default function AdminPartnerApplicationsPage() {
  const [applications, setApplications] = useState<PartnerApplication[]>([]);
  const [selected, setSelected] = useState<PartnerApplication | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<PartnerApplication | null>(null);
  const [approving, setApproving] = useState(false);

  const load = () => fetch("/api/admin/partner-applications").then((r) => r.json()).then(setApplications);
  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/partner-applications/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setSelected(null);
    load();
  };

  const approveApplication = async (id: string) => {
    setApproving(true);
    await fetch(`/api/admin/partner-applications/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _action: "approve" }),
    });
    setApproving(false);
    setSelected(null);
    load();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await fetch(`/api/admin/partner-applications/${deleteTarget.id}`, { method: "DELETE" });
    setDeleteTarget(null);
    load();
  };

  const columns: Column<PartnerApplication>[] = [
    { key: "company", label: "Company", render: (a) => <span className="text-white">{a.company}</span> },
    { key: "name", label: "Contact" },
    { key: "industry", label: "Industry" },
    { key: "status", label: "Status", render: (a) => <StatusBadge status={a.status} /> },
    {
      key: "actions", label: "", render: (a) => (
        <button
          onClick={(e) => { e.stopPropagation(); setDeleteTarget(a); }}
          className="text-[10px] text-zinc-600 hover:text-red-400 uppercase tracking-wider transition"
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-xl font-light text-white tracking-wider mb-8">Partner Applications</h1>

      <DataTable columns={columns} data={applications} onRowClick={setSelected} />

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Application Details">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-zinc-600">Name:</span> <span className="text-white">{selected.name}</span></div>
              <div><span className="text-zinc-600">Company:</span> <span className="text-zinc-400">{selected.company}</span></div>
              <div><span className="text-zinc-600">Industry:</span> <span className="text-zinc-400">{selected.industry}</span></div>
              <div><span className="text-zinc-600">Email:</span> <span className="text-zinc-400">{selected.email}</span></div>
            </div>
            <div>
              <span className="text-xs text-zinc-600">Description:</span>
              <p className="text-sm text-zinc-400 mt-1">{selected.description}</p>
            </div>
            {selected.events && (
              <div>
                <span className="text-xs text-zinc-600">Events:</span>
                <p className="text-sm text-zinc-400 mt-1">{selected.events}</p>
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
              <div className="border-t border-zinc-800 pt-4 flex gap-3">
                <button
                  onClick={() => approveApplication(selected.id)}
                  disabled={approving}
                  className="px-4 py-2 text-xs tracking-wider uppercase font-medium text-black bg-emerald-500 hover:bg-emerald-600 transition disabled:opacity-50"
                >
                  {approving ? "Approving..." : "Approve & Create Partner"}
                </button>
                <button
                  onClick={() => updateStatus(selected.id, "rejected")}
                  className="px-4 py-2 text-xs tracking-wider uppercase font-medium text-white bg-red-600 hover:bg-red-700 transition"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Application"
        message={`Delete application from "${deleteTarget?.company}"? This cannot be undone.`}
        confirmLabel="Delete"
        destructive
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
