"use client";

import { useEffect, useState } from "react";
import type { Booking } from "@/lib/types";
import DataTable, { Column } from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selected, setSelected] = useState<Booking | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Booking | null>(null);

  const load = () => fetch("/api/admin/bookings").then((r) => r.json()).then(setBookings);
  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/bookings/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setSelected(null);
    load();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await fetch(`/api/admin/bookings/${deleteTarget.id}`, { method: "DELETE" });
    setDeleteTarget(null);
    load();
  };

  const statusOptions = ["pending", "confirmed", "completed", "cancelled"];

  const columns: Column<Booking>[] = [
    { key: "eventName", label: "Event", render: (b) => <span className="text-white">{b.eventName}</span> },
    { key: "name", label: "Contact" },
    { key: "company", label: "Company" },
    { key: "date", label: "Date" },
    { key: "status", label: "Status", render: (b) => <StatusBadge status={b.status} /> },
    {
      key: "actions", label: "", render: (b) => (
        <button
          onClick={(e) => { e.stopPropagation(); setDeleteTarget(b); }}
          className="text-[10px] text-zinc-600 hover:text-red-400 uppercase tracking-wider transition"
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-xl font-light text-white tracking-wider mb-8">Bookings</h1>

      <DataTable columns={columns} data={bookings} onRowClick={setSelected} />

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Booking Details">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-zinc-600">Event:</span> <span className="text-white">{selected.eventName}</span></div>
              <div><span className="text-zinc-600">Type:</span> <span className="text-zinc-400">{selected.eventType}</span></div>
              <div><span className="text-zinc-600">Location:</span> <span className="text-zinc-400">{selected.location}</span></div>
              <div><span className="text-zinc-600">Date:</span> <span className="text-zinc-400">{selected.date}</span></div>
              <div><span className="text-zinc-600">Duration:</span> <span className="text-zinc-400">{selected.duration}</span></div>
              <div><span className="text-zinc-600">Pricing:</span> <span className="text-zinc-400">{selected.pricingModel}</span></div>
              <div><span className="text-zinc-600">Contact:</span> <span className="text-zinc-400">{selected.name}</span></div>
              <div><span className="text-zinc-600">Email:</span> <span className="text-zinc-400">{selected.email}</span></div>
              <div><span className="text-zinc-600">Company:</span> <span className="text-zinc-400">{selected.company}</span></div>
              {selected.phone && <div><span className="text-zinc-600">Phone:</span> <span className="text-zinc-400">{selected.phone}</span></div>}
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
                {statusOptions.map((s) => (
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
        title="Delete Booking"
        message={`Delete booking for "${deleteTarget?.eventName}"? This cannot be undone.`}
        confirmLabel="Delete"
        destructive
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
