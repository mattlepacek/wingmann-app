import { NextResponse } from "next/server";
import { readJSON } from "@/lib/data";
import type { PartnerApplication } from "@/lib/types";

export async function GET() {
  const apps = await readJSON<PartnerApplication[]>("partner-applications.json");
  return NextResponse.json(apps);
}
