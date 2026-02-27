import { NextResponse } from "next/server";
import { readJSON, appendJSON } from "@/lib/data";
import type { Partner } from "@/lib/types";

export async function GET() {
  const partners = await readJSON<Partner[]>("partners.json");
  return NextResponse.json(partners);
}

export async function POST(req: Request) {
  const body = await req.json();
  const partner = await appendJSON<Partner>("partners.json", {
    ...body,
    createdAt: new Date().toISOString(),
  });
  return NextResponse.json(partner, { status: 201 });
}
