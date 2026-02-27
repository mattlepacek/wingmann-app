export type BoothType = "dedicated" | "partner" | "roaming";

export interface TradeShow {
  id: string;
  name: string;
  dates: string;
  location: string;
  venue: string;
  industry: string;
  boothType: BoothType;
  partnerBooth?: string;
  status: "confirmed" | "pending" | "completed";
  description: string;
  expectedAttendance?: string;
  createdAt?: string;
}

export interface Partner {
  id: string;
  name: string;
  category: string;
  status: string;
  email?: string;
  company?: string;
  description?: string;
  createdAt?: string;
}

export interface Booking {
  id: string;
  eventType: string;
  pricingModel: string;
  eventName: string;
  location: string;
  date: string;
  duration: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  objectives?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

export interface ShowRequest {
  id: string;
  showName: string;
  industry: string;
  dates: string;
  location: string;
  name: string;
  email: string;
  deploymentMode?: string;
  objectives?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface BoothOffer {
  id: string;
  company: string;
  name: string;
  email: string;
  tradeShow: string;
  boothDetails?: string;
  description: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface PartnerApplication {
  id: string;
  name: string;
  company: string;
  industry: string;
  email: string;
  description: string;
  events?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}
