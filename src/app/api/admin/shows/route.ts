import { NextResponse } from "next/server";
import { readJSON, appendJSON } from "@/lib/data";
import type { TradeShow } from "@/lib/types";

export async function GET() {
  const shows = await readJSON<TradeShow[]>("shows.json");
  return NextResponse.json(shows);
}

export async function POST(req: Request) {
  const body = await req.json();
  const show = await appendJSON<TradeShow>("shows.json", {
    ...body,
    createdAt: new Date().toISOString(),
  });
  return NextResponse.json(show, { status: 201 });
}
