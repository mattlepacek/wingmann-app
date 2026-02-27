import { NextResponse } from "next/server";
import { readJSON } from "@/lib/data";
import type { Booking } from "@/lib/types";

export async function GET() {
  const bookings = await readJSON<Booking[]>("bookings.json");
  return NextResponse.json(bookings);
}
