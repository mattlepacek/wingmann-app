import { NextResponse } from "next/server";
import { appendJSON } from "@/lib/data";

export async function POST(req: Request) {
  const body = await req.json();
  const booking = await appendJSON("bookings.json", {
    ...body,
    createdAt: new Date().toISOString(),
    status: "pending",
  });
  return NextResponse.json(booking, { status: 201 });
}
