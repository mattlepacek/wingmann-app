"use client";

import { useEffect, useState } from "react";
import type { Partner } from "@/lib/types";
import DataTable, { Column } from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import Modal from "../components/Modal";
import FormField from "../components/FormField";
import ConfirmDialog from "../components/ConfirmDialog";

const emptyPartner: Omit<Partner, "id"> = {
  name: "", category: "", status: "Active", email: "", company: "", description: "",
};

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [editing, setEditing] = useState<Partner | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyPartner);
  const [deleteTarget, setDeleteTarget] = useState<Partner | null>(null);

  const load = () => fetch("/api/admin/partners").then((r) => r.json()).then(setPartners);
  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(emptyPartner); setCreating(true); };

  const openEdit = (p: Partner) => { setForm(p); setEditing(p); };

  const save = async () => {
    if (editing) {
      await fetch(`/api/admin/partners/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("/api/admin/partners", {
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
    await fetch(`/api/admin/partners/${deleteTarget.id}`, { method: "DELETE" });
    setDeleteTarget(null);
    load();
  };

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const columns: Column<Partner>[] = [
    { key: "name", label: "Name", render: (p) => <span className="text-white">{p.name}</span> },
    { key: "category", label: "Category" },
    { key: "status", label: "Status", render: (p) => <StatusBadge status={p.status} /> },
    { key: "email", label: "Email", render: (p) => <span className="text-zinc-500">{p.email || "—"}</span> },
    {
      key: "actions", label: "", render: (p) => (
        <button
          onClick={(e) => { e.stopPropagation(); setDeleteTarget(p); }}
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
        <h1 className="text-xl font-light text-white tracking-wider">Partners</h1>
        <button onClick={openCreate} className="px-4 py-2 text-xs tracking-wider uppercase font-medium text-black bg-white hover:bg-zinc-200 transition">
          Add Partner
        </button>
      </div>

      <DataTable columns={columns} data={partners} onRowClick={openEdit} />

      <Modal open={creating || !!editing} onClose={() => { setCreating(false); setEditing(null); }} title={editing ? "Edit Partner" : "New Partner"}>
        <div className="space-y-4">
          <FormField label="Name" name="name" value={form.name} onChange={(v) => set("name", v)} required placeholder="Partner name" />
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Category" name="category" value={form.category} onChange={(v) => set("category", v)} required placeholder="e.g., SaaS, Telecom" />
            <div>
              <label className="block text-xs text-zinc-500 mb-2">Status</label>
              <select
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
                className="w-full bg-black border border-zinc-800 px-4 py-3 text-sm text-white focus:border-zinc-500 focus:outline-none transition"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
          <FormField label="Email" name="email" type="email" value={form.email || ""} onChange={(v) => set("email", v)} placeholder="contact@company.com" />
          <FormField label="Company" name="company" value={form.company || ""} onChange={(v) => set("company", v)} placeholder="Company name" />
          <FormField label="Description" name="description" value={form.description || ""} onChange={(v) => set("description", v)} textarea placeholder="Brief description" />

          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => { setCreating(false); setEditing(null); }} className="px-4 py-2 text-xs tracking-wider uppercase text-zinc-500 border border-zinc-800 hover:border-zinc-600 transition">Cancel</button>
            <button onClick={save} className="px-4 py-2 text-xs tracking-wider uppercase font-medium text-black bg-white hover:bg-zinc-200 transition">{editing ? "Save" : "Create"}</button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Partner"
        message={`Delete "${deleteTarget?.name}"? This cannot be undone.`}
        confirmLabel="Delete"
        destructive
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
