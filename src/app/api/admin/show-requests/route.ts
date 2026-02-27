import { NextResponse } from "next/server";
import { readJSON } from "@/lib/data";
import type { ShowRequest } from "@/lib/types";

export async function GET() {
  const requests = await readJSON<ShowRequest[]>("show-requests.json");
  return NextResponse.json(requests);
}
