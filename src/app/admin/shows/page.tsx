"use client";

import { useEffect, useState } from "react";
import type { TradeShow, BoothType } from "@/lib/types";
import DataTable, { Column } from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import Modal from "../components/Modal";
import FormField from "../components/FormField";
import ConfirmDialog from "../components/ConfirmDialog";

const emptyShow: Omit<TradeShow, "id"> = {
  name: "", dates: "", location: "", venue: "", industry: "",
  boothType: "dedicated", status: "pending", description: "", expectedAttendance: "",
};

export default function AdminShowsPage() {
  const [shows, setShows] = useState<TradeShow[]>([]);
  const [editing, setEditing] = useState<TradeShow | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyShow);
  const [deleteTarget, setDeleteTarget] = useState<TradeShow | null>(null);

  const load = () => fetch("/api/admin/shows").then((r) => r.json()).then(setShows);
  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setForm(emptyShow);
    setCreating(true);
  };

  const openEdit = (show: TradeShow) => {
    setForm(show);
    setEditing(show);
  };

  const save = async () => {
    if (editing) {
      await fetch(`/api/admin/shows/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("/api/admin/shows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setEditing(null);
    setCreating(false);
    load();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await fetch(`/api/admin/shows/${deleteTarget.id}`, { method: "DELETE" });
    setDeleteTarget(null);
    load();
  };

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const columns: Column<TradeShow>[] = [
    { key: "name", label: "Name", render: (s) => <span className="text-white">{s.name}</span> },
    { key: "dates", label: "Dates" },
    { key: "location", label: "Location" },
    { key: "boothType", label: "Booth Type", render: (s) => <span className="uppercase text-[10px] tracking-wider">{s.boothType}</span> },
    { key: "status", label: "Status", render: (s) => <StatusBadge status={s.status} /> },
    {
      key: "actions", label: "", render: (s) => (
        <button
          onClick={(e) => { e.stopPropagation(); setDeleteTarget(s); }}
          className="text-[10px] text-zinc-600 hover:text-red-400 uppercase tracking-wider transition"
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-light text-white tracking-wider">Trade Shows</h1>
        <button onClick={openCreate} className="px-4 py-2 text-xs tracking-wider uppercase font-medium text-black bg-white hover:bg-zinc-200 transition">
          Add Show
        </button>
      </div>

      <DataTable columns={columns} data={shows} onRowClick={openEdit} />

      <Modal open={creating || !!editing} onClose={() => { setCreating(false); setEditing(null); }} title={editing ? "Edit Show" : "New Show"}>
        <div className="space-y-4">
          <FormField label="Name" name="name" value={form.name} onChange={(v) => set("name", v)} required placeholder="Show name" />
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Dates" name="dates" value={form.dates} onChange={(v) => set("dates", v)} required placeholder="e.g., Mar 10-12, 2026" />
            <FormField label="Location" name="location" value={form.location} onChange={(v) => set("location", v)} required placeholder="City, State" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Venue" name="venue" value={form.venue} onChange={(v) => set("venue", v)} placeholder="Venue name" />
            <FormField label="Industry" name="industry" value={form.industry} onChange={(v) => set("industry", v)} placeholder="e.g., SaaS" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-zinc-500 mb-2">Booth Type</label>
              <select
                value={form.boothType}
                onChange={(e) => set("boothType", e.target.value)}
                className="w-full bg-black border border-zinc-800 px-4 py-3 text-sm text-white focus:border-zinc-500 focus:outline-none transition"
              >
                <option value="dedicated">Dedicated</option>
                <option value="partner">Partner</option>
                <option value="roaming">Roaming</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-2">Status</label>
              <select
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
                className="w-full bg-black border border-zinc-800 px-4 py-3 text-sm text-white focus:border-zinc-500 focus:outline-none transition"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          {form.boothType === "partner" && (
            <FormField label="Partner Booth" name="partnerBooth" value={form.partnerBooth || ""} onChange={(v) => set("partnerBooth", v)} placeholder="Partner company name" />
          )}
          <FormField label="Expected Attendance" name="expectedAttendance" value={form.expectedAttendance || ""} onChange={(v) => set("expectedAttendance", v)} placeholder="e.g., 15,000+" />
          <FormField label="Description" name="description" value={form.description} onChange={(v) => set("description", v)} textarea placeholder="Show description" />

          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => { setCreating(false); setEditing(null); }} className="px-4 py-2 text-xs tracking-wider uppercase text-zinc-500 border border-zinc-800 hover:border-zinc-600 transition">
              Cancel
            </button>
            <button onClick={save} className="px-4 py-2 text-xs tracking-wider uppercase font-medium text-black bg-white hover:bg-zinc-200 transition">
              {editing ? "Save" : "Create"}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Show"
        message={`Delete "${deleteTarget?.name}"? This cannot be undone.`}
        confirmLabel="Delete"
        destructive
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
