import { NextResponse } from "next/server";
import { readJSON } from "@/lib/data";
import type { BoothOffer } from "@/lib/types";

export async function GET() {
  const offers = await readJSON<BoothOffer[]>("booth-offers.json");
  return NextResponse.json(offers);
}
