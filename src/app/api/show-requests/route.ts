import { NextResponse } from "next/server";
import { appendJSON } from "@/lib/data";

export async function POST(req: Request) {
  const body = await req.json();
  const request = await appendJSON("show-requests.json", {
    ...body,
    createdAt: new Date().toISOString(),
    status: "pending",
  });
  return NextResponse.json(request, { status: 201 });
}
