import { NextResponse } from "next/server";
import { appendJSON } from "@/lib/data";

export async function POST(req: Request) {
  const body = await req.json();
  const application = await appendJSON("partner-applications.json", {
    ...body,
    createdAt: new Date().toISOString(),
    status: "pending",
  });
  return NextResponse.json(application, { status: 201 });
}
