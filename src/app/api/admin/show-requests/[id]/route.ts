import { NextResponse } from "next/server";
import { readJSON, updateJSON, deleteJSON, appendJSON } from "@/lib/data";
import type { ShowRequest, TradeShow } from "@/lib/types";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();

  // Handle "Convert to Show" action
  if (body._action === "convert") {
    const requests = await readJSON<ShowRequest[]>("show-requests.json");
    const request = requests.find((r) => r.id === id);
    if (!request) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const show = await appendJSON<TradeShow>("shows.json", {
      name: request.showName,
      dates: request.dates,
      location: request.location,
      venue: "",
      industry: request.industry,
      boothType: (request.deploymentMode as TradeShow["boothType"]) || "dedicated",
      status: "pending",
      description: request.objectives || "",
    });

    await updateJSON<ShowRequest>("show-requests.json", id, { status: "approved" });
    return NextResponse.json({ show, converted: true });
  }

  const updated = await updateJSON<ShowRequest>("show-requests.json", id, body);
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deleted = await deleteJSON<ShowRequest>("show-requests.json", id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
