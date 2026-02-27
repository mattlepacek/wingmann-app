import { NextResponse } from "next/server";
import { appendJSON } from "@/lib/data";

export async function POST(req: Request) {
  const body = await req.json();
  const offer = await appendJSON("booth-offers.json", {
    ...body,
    createdAt: new Date().toISOString(),
    status: "pending",
  });
  return NextResponse.json(offer, { status: 201 });
}
