import { NextResponse } from "next/server";
import { readJSON } from "@/lib/data";
import type { TradeShow, Partner, Booking, ShowRequest, BoothOffer, PartnerApplication } from "@/lib/types";

export async function GET() {
  const [shows, partners, bookings, showRequests, boothOffers, partnerApplications] = await Promise.all([
    readJSON<TradeShow[]>("shows.json"),
    readJSON<Partner[]>("partners.json"),
    readJSON<Booking[]>("bookings.json"),
    readJSON<ShowRequest[]>("show-requests.json"),
    readJSON<BoothOffer[]>("booth-offers.json"),
    readJSON<PartnerApplication[]>("partner-applications.json"),
  ]);

  // Gather recent submissions across all stores
  const allItems = [
    ...bookings.map((b) => ({ type: "booking" as const, id: b.id, label: `Booking: ${b.eventName}`, status: b.status, createdAt: b.createdAt })),
    ...showRequests.map((r) => ({ type: "show-request" as const, id: r.id, label: `Show Request: ${r.showName}`, status: r.status, createdAt: r.createdAt })),
    ...boothOffers.map((o) => ({ type: "booth-offer" as const, id: o.id, label: `Booth Offer: ${o.company}`, status: o.status, createdAt: o.createdAt })),
    ...partnerApplications.map((a) => ({ type: "partner-application" as const, id: a.id, label: `Application: ${a.company}`, status: a.status, createdAt: a.createdAt })),
  ];

  allItems.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return NextResponse.json({
    counts: {
      shows: shows.length,
      partners: partners.length,
      pendingBookings: bookings.filter((b) => b.status === "pending").length,
      pendingApplications: partnerApplications.filter((a) => a.status === "pending").length,
      pendingRequests: showRequests.filter((r) => r.status === "pending").length,
      pendingOffers: boothOffers.filter((o) => o.status === "pending").length,
    },
    recent: allItems.slice(0, 10),
  });
}
