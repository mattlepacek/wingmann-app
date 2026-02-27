import { NextResponse } from "next/server";
import { readJSON } from "@/lib/data";

export async function GET() {
  const partners = await readJSON("partners.json");
  return NextResponse.json(partners);
}
