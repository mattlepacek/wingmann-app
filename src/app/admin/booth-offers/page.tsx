"use client";

import { useEffect, useState } from "react";
import type { BoothOffer } from "@/lib/types";
import DataTable, { Column } from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";

export default function AdminBoothOffersPage() {
  const [offers, setOffers] = useState<BoothOffer[]>([]);
  const [selected, setSelected] = useState<BoothOffer | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<BoothOffer | null>(null);

  const load = () => fetch("/api/admin/booth-offers").then((r) => r.json()).then(setOffers);
  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/booth-offers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setSelected(null);
    load();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await fetch(`/api/admin/booth-offers/${deleteTarget.id}`, { method: "DELETE" });
    setDeleteTarget(null);
    load();
  };

  const columns: Column<BoothOffer>[] = [
    { key: "company", label: "Company", render: (o) => <span className="text-white">{o.company}</span> },
    { key: "name", label: "Contact" },
    { key: "tradeShow", label: "Trade Show" },
    { key: "status", label: "Status", render: (o) => <StatusBadge status={o.status} /> },
    {
      key: "actions", label: "", render: (o) => (
        <button
          onClick={(e) => { e.stopPropagation(); setDeleteTarget(o); }}
          className="text-[10px] text-zinc-600 hover:text-red-400 uppercase tracking-wider transition"
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-xl font-light text-white tracking-wider mb-8">Booth Offers</h1>

      <DataTable columns={columns} data={offers} onRowClick={setSelected} />

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Booth Offer Details">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-zinc-600">Company:</span> <span className="text-white">{selected.company}</span></div>
              <div><span className="text-zinc-600">Contact:</span> <span className="text-zinc-400">{selected.name}</span></div>
              <div><span className="text-zinc-600">Email:</span> <span className="text-zinc-400">{selected.email}</span></div>
              <div><span className="text-zinc-600">Trade Show:</span> <span className="text-zinc-400">{selected.tradeShow}</span></div>
              {selected.boothDetails && <div className="col-span-2"><span className="text-zinc-600">Booth Details:</span> <span className="text-zinc-400">{selected.boothDetails}</span></div>}
            </div>
            <div>
              <span className="text-xs text-zinc-600">Description:</span>
              <p className="text-sm text-zinc-400 mt-1">{selected.description}</p>
            </div>
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
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Booth Offer"
        message={`Delete offer from "${deleteTarget?.company}"? This cannot be undone.`}
        confirmLabel="Delete"
        destructive
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
