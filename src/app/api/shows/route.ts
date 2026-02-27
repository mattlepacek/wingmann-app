import { NextResponse } from "next/server";
import { readJSON } from "@/lib/data";

export async function GET() {
  const shows = await readJSON("shows.json");
  return NextResponse.json(shows);
}
