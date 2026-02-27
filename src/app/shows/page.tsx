"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

type BoothType = "dedicated" | "partner" | "roaming";

interface TradeShow {
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
}

const boothTypeLabels: Record<BoothType, { label: string; desc: string; color: string }> = {
  dedicated: {
    label: "WingMann Lounge",
    desc: "Our own booth — the most comfortable place in the room. Coffee, charging, no badge scanning.",
    color: "text-white",
  },
  partner: {
    label: "Partner Booth",
    desc: "Embedded with a network partner's booth. Extended conversations and warm introductions.",
    color: "text-blue-400",
  },
  roaming: {
    label: "Roaming",
    desc: "No fixed booth. WingMann works the floor — maximum coverage, organic introductions.",
    color: "text-amber-400",
  },
};

const filterOptions: { value: BoothType | "all"; label: string }[] = [
  { value: "all", label: "All Shows" },
  { value: "dedicated", label: "WingMann Lounge" },
  { value: "partner", label: "Partner Booth" },
  { value: "roaming", label: "Roaming" },
];

export default function ShowsPage() {
  const [shows, setShows] = useState<TradeShow[]>([]);
  const [filter, setFilter] = useState<BoothType | "all">("all");
  const [activeForm, setActiveForm] = useState<"request" | "partner" | null>(null);
  const [submitted, setSubmitted] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/shows").then((r) => r.json()).then(setShows);
  }, []);

  const filtered = filter === "all" ? shows : shows.filter((s) => s.boothType === filter);

  const handleSubmit = (formType: string, endpoint: string) => async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data: Record<string, string> = {};
    formData.forEach((val, key) => { data[key] = val as string; });

    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSubmitted(formType);
  };

  return (
    <div className="relative min-h-screen bg-black">
      <Nav links={[
        { href: "/operator", label: "Operator" },
        { href: "/partners", label: "Partners" },
        { href: "/book", label: "Book", highlight: true },
      ]} />

      <main className="mx-auto max-w-6xl px-6 pt-32 pb-24">
        <div className="mb-12">
          <h1 className="text-2xl sm:text-3xl font-light text-white tracking-tight mb-3">Trade Shows &amp; Events</h1>
          <p className="text-sm text-zinc-500 max-w-xl">Where WingMann is deployed. Find us at upcoming events, request deployment at your trade show, or offer your booth as a network partner.</p>
        </div>

        {/* Deployment Modes */}
        <div className="grid sm:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800 mb-12">
          {(["dedicated", "partner", "roaming"] as BoothType[]).map((type) => {
            const info = boothTypeLabels[type];
            return (
              <div key={type} className="bg-black p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2 h-2 rounded-full ${type === "dedicated" ? "bg-white" : type === "partner" ? "bg-blue-400" : "bg-amber-400"}`} />
                  <h3 className={`text-xs uppercase tracking-wider ${info.color}`}>{info.label}</h3>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">{info.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {filterOptions.map((opt) => (
            <button key={opt.value} onClick={() => setFilter(opt.value)} className={`px-4 py-2 text-xs tracking-wider uppercase transition-all duration-200 border ${filter === opt.value ? "border-[#1a8fff]/50 text-[#4db8ff] bg-[#1a8fff]/5" : "border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"}`}>
              {opt.label}
            </button>
          ))}
          <span className="text-xs text-zinc-700 ml-2">{filtered.length} {filtered.length === 1 ? "show" : "shows"}</span>
        </div>

        {/* Show Listings */}
        <div className="space-y-4 mb-16">
          {filtered.map((show) => {
            const typeInfo = boothTypeLabels[show.boothType];
            return (
              <div key={show.id} className="border border-zinc-800 p-6 sm:p-8 transition hover:border-[#1a8fff]/20">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-light text-white">{show.name}</h3>
                      <span className={`text-[10px] tracking-wider uppercase px-2 py-0.5 border ${show.status === "confirmed" ? "border-emerald-500/30 text-emerald-400" : show.status === "pending" ? "border-amber-500/30 text-amber-400" : "border-zinc-700 text-zinc-500"}`}>{show.status}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
                      <span>{show.dates}</span>
                      <span className="text-zinc-700">|</span>
                      <span>{show.location}</span>
                      <span className="text-zinc-700">|</span>
                      <span>{show.venue}</span>
                      {show.expectedAttendance && (<><span className="text-zinc-700">|</span><span>{show.expectedAttendance} expected</span></>)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`w-2 h-2 rounded-full ${show.boothType === "dedicated" ? "bg-white" : show.boothType === "partner" ? "bg-blue-400" : "bg-amber-400"}`} />
                    <span className={`text-xs tracking-wider uppercase ${typeInfo.color}`}>{typeInfo.label}</span>
                  </div>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-3">{show.description}</p>
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-[10px] tracking-wider uppercase text-zinc-600 border border-zinc-800 px-3 py-1">{show.industry}</span>
                  {show.partnerBooth && (<span className="text-xs text-zinc-500">Booth partner: <span className="text-blue-400">{show.partnerBooth}</span></span>)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Two CTAs */}
        <div className="grid sm:grid-cols-2 gap-4 mb-16">
          <div className="border border-zinc-800 p-8 text-center">
            <h3 className="text-sm uppercase tracking-wider text-white mb-2">Need a WingMann?</h3>
            <p className="text-xs text-zinc-500 mb-6 leading-relaxed">Have a trade show coming up? Request a WingMann deployment — dedicated booth or roaming.</p>
            <button onClick={() => { setActiveForm("request"); setSubmitted(null); }} className="px-6 py-3 text-xs tracking-wider uppercase font-medium text-white bg-[#1a8fff] transition hover:bg-[#4db8ff] hover:shadow-[0_0_20px_rgba(26,143,255,0.25)]">Request Deployment</button>
          </div>
          <div className="border border-zinc-800 p-8 text-center">
            <h3 className="text-sm uppercase tracking-wider text-white mb-2">Share Your Booth</h3>
            <p className="text-xs text-zinc-500 mb-6 leading-relaxed">Already have a booth? Let WingMann tap in for extended conversations and warm introductions.</p>
            <button onClick={() => { setActiveForm("partner"); setSubmitted(null); }} className="px-6 py-3 text-xs tracking-wider uppercase font-medium text-zinc-400 border border-zinc-800 transition hover:border-[#1a8fff]/40 hover:text-[#4db8ff]">Offer Booth Access</button>
          </div>
        </div>

        {/* Request Deployment Form */}
        {activeForm === "request" && !submitted && (
          <div className="border border-zinc-800 p-8 sm:p-12 mb-16">
            <h2 className="text-[10px] tracking-[0.35em] uppercase text-zinc-500 mb-8">Request WingMann Deployment</h2>
            <form onSubmit={handleSubmit("request", "/api/show-requests")} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="block text-xs text-zinc-500 mb-2">Trade Show Name</label><input name="showName" type="text" required className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-700 focus:border-zinc-500 focus:outline-none transition" placeholder="e.g., CES 2026" /></div>
                <div><label className="block text-xs text-zinc-500 mb-2">Industry</label><input name="industry" type="text" required className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-700 focus:border-zinc-500 focus:outline-none transition" placeholder="e.g., SaaS, Telecom" /></div>
                <div><label className="block text-xs text-zinc-500 mb-2">Dates</label><input name="dates" type="text" required className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-700 focus:border-zinc-500 focus:outline-none transition" placeholder="e.g., Mar 10-12, 2026" /></div>
                <div><label className="block text-xs text-zinc-500 mb-2">Location / Venue</label><input name="location" type="text" required className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-700 focus:border-zinc-500 focus:outline-none transition" placeholder="City, Venue" /></div>
                <div><label className="block text-xs text-zinc-500 mb-2">Your Name</label><input name="name" type="text" required className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-700 focus:border-zinc-500 focus:outline-none transition" placeholder="Full name" /></div>
                <div><label className="block text-xs text-zinc-500 mb-2">Email</label><input name="email" type="email" required className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-700 focus:border-zinc-500 focus:outline-none transition" placeholder="you@company.com" /></div>
              </div>
              <div>
                <label className="block text-xs text-zinc-500 mb-2">Preferred Deployment Mode</label>
                <div className="flex flex-wrap gap-3">
                  {(["dedicated", "partner", "roaming"] as BoothType[]).map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer text-sm text-zinc-400"><input type="radio" name="deploymentMode" value={type} className="accent-white" />{boothTypeLabels[type].label}</label>
                  ))}
                </div>
              </div>
              <div><label className="block text-xs text-zinc-500 mb-2">What are you hoping to achieve?</label><textarea name="objectives" rows={3} className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-700 focus:border-zinc-500 focus:outline-none transition resize-none" placeholder="Who do you want to connect with? What deals are you trying to accelerate?" /></div>
              <button type="submit" className="px-12 py-4 text-sm tracking-wider uppercase font-medium text-white bg-[#1a8fff] transition hover:bg-[#4db8ff]">Submit Request</button>
            </form>
          </div>
        )}

        {/* Offer Booth Form */}
        {activeForm === "partner" && !submitted && (
          <div className="border border-zinc-800 p-8 sm:p-12 mb-16">
            <h2 className="text-[10px] tracking-[0.35em] uppercase text-zinc-500 mb-8">Offer Booth Access to WingMann</h2>
            <p className="text-sm text-zinc-500 mb-8 max-w-lg">You already have a booth at a trade show. Let a WingMann operator work from your space — making introductions, starting conversations, and accelerating deals for both of us.</p>
            <form onSubmit={handleSubmit("partner", "/api/booth-offers")} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="block text-xs text-zinc-500 mb-2">Company Name</label><input name="company" type="text" required className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-700 focus:border-zinc-500 focus:outline-none transition" placeholder="Your company" /></div>
                <div><label className="block text-xs text-zinc-500 mb-2">Your Name</label><input name="name" type="text" required className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-700 focus:border-zinc-500 focus:outline-none transition" placeholder="Full name" /></div>
                <div><label className="block text-xs text-zinc-500 mb-2">Email</label><input name="email" type="email" required className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-700 focus:border-zinc-500 focus:outline-none transition" placeholder="you@company.com" /></div>
                <div><label className="block text-xs text-zinc-500 mb-2">Trade Show</label><input name="tradeShow" type="text" required className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-700 focus:border-zinc-500 focus:outline-none transition" placeholder="Show name, dates" /></div>
              </div>
              <div><label className="block text-xs text-zinc-500 mb-2">Booth Size &amp; Location</label><input name="boothDetails" type="text" className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-700 focus:border-zinc-500 focus:outline-none transition" placeholder="e.g., 10x10 corner booth, Hall B" /></div>
              <div><label className="block text-xs text-zinc-500 mb-2">What does your company do? Who is your ideal introduction?</label><textarea name="description" rows={3} required className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-700 focus:border-zinc-500 focus:outline-none transition resize-none" placeholder="Brief description — helps us match the right WingMann operator" /></div>
              <button type="submit" className="px-12 py-4 text-sm tracking-wider uppercase font-medium text-white bg-[#1a8fff] transition hover:bg-[#4db8ff]">Offer Booth Access</button>
            </form>
          </div>
        )}

        {/* Success */}
        {submitted && (
          <div className="border border-zinc-800 p-12 text-center mb-16">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-xl font-light text-white mb-3">{submitted === "request" ? "Deployment Request Received" : "Booth Partnership Request Received"}</h2>
            <p className="text-sm text-zinc-500 max-w-md mx-auto">{submitted === "request" ? "We'll review your trade show and confirm deployment availability within 48 hours." : "We'll reach out to discuss how WingMann can work from your booth. Expect a response within 48 hours."}</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
