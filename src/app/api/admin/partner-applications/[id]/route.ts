import { NextResponse } from "next/server";
import { readJSON, updateJSON, deleteJSON, appendJSON } from "@/lib/data";
import type { PartnerApplication, Partner } from "@/lib/types";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();

  // Handle "Approve" action — creates a partner entry
  if (body._action === "approve") {
    const apps = await readJSON<PartnerApplication[]>("partner-applications.json");
    const app = apps.find((a) => a.id === id);
    if (!app) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const partner = await appendJSON<Partner>("partners.json", {
      name: app.company,
      category: app.industry,
      status: "Active",
      email: app.email,
      company: app.company,
      description: app.description,
    });

    await updateJSON<PartnerApplication>("partner-applications.json", id, { status: "approved" });
    return NextResponse.json({ partner, approved: true });
  }

  const updated = await updateJSON<PartnerApplication>("partner-applications.json", id, body);
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deleted = await deleteJSON<PartnerApplication>("partner-applications.json", id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
