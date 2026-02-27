"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Partner {
  id: string;
  name: string;
  category: string;
  status: string;
}

const TOTAL_SEATS = 10;

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch("/api/partners").then((r) => r.json()).then(setPartners);
  }, []);

  const openSeats = TOTAL_SEATS - partners.length;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data: Record<string, string> = {};
    formData.forEach((val, key) => { data[key] = val as string; });

    await fetch("/api/partner-applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen bg-black">
      <nav className="fixed top-0 z-50 w-full border-b border-zinc-900 bg-black/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/"><Image src="/logo.webp" alt="WingMann" width={763} height={78} className="h-6 w-auto select-none" draggable={false} /></Link>
          <div className="flex items-center gap-6">
            <Link href="/operator" className="text-xs tracking-widest uppercase text-zinc-500 transition hover:text-[#4db8ff]">Operator</Link>
            <Link href="/shows" className="text-xs tracking-widest uppercase text-zinc-500 transition hover:text-[#4db8ff]">Shows</Link>
            <Link href="/book" className="text-xs tracking-widest uppercase text-white bg-[#1a8fff]/15 px-4 py-2 transition hover:bg-[#1a8fff]/25">Book</Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6 pt-32 pb-24">
        <div className="mb-16">
          <h1 className="text-2xl sm:text-3xl font-light text-white tracking-tight mb-3">Founding Partners</h1>
          <p className="text-sm text-zinc-500 max-w-lg">A curated network of businesses represented by WingMann operators at events. We&apos;re selecting {TOTAL_SEATS} founding partner companies for our inaugural deployment.</p>
        </div>

        {/* Partner Slots */}
        <div className="mb-16">
          <h2 className="text-[10px] tracking-[0.35em] uppercase text-zinc-500 mb-6">Partner Registry &middot; {TOTAL_SEATS} Founding Seats</h2>
          <div className="border border-zinc-800">
            <div className="grid grid-cols-3 gap-4 px-6 py-3 border-b border-zinc-800 bg-zinc-900/30">
              <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-600">Partner</p>
              <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-600">Category</p>
              <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-600">Status</p>
            </div>
            {partners.map((partner) => (
              <div key={partner.id} className="grid grid-cols-3 gap-4 px-6 py-4 border-b border-zinc-800/50 last:border-0">
                <p className="text-sm text-white">{partner.name}</p>
                <p className="text-sm text-zinc-500">{partner.category}</p>
                <p className="text-sm">
                  <span className="inline-flex items-center gap-1.5 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {partner.status}
                  </span>
                </p>
              </div>
            ))}
            {openSeats > 0 && (
              <div className="grid grid-cols-3 gap-4 px-6 py-4 bg-white/[0.02]">
                <p className="text-sm text-zinc-600">Available</p>
                <p className="text-sm text-zinc-600">—</p>
                <p className="text-sm text-zinc-600">{openSeats} of {TOTAL_SEATS} seats remaining</p>
              </div>
            )}
          </div>
        </div>

        {/* What Partners Get */}
        <div className="mb-16">
          <h2 className="text-[10px] tracking-[0.35em] uppercase text-zinc-500 mb-8">What Founding Partners Get</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: "Event Representation", desc: "A certified WingMann represents your brand at trade shows and events. Strategic, not scripted." },
              { title: "Qualified Introductions", desc: "Your WingMann identifies prospects through natural conversation and makes organic introductions." },
              { title: "Registered Attribution", desc: "Every introduction is logged, timestamped, and acknowledged. No ambiguity on who opened the door." },
              { title: "Performance Alignment", desc: "Commission-based model means your WingMann is incentivized to close, not just connect." },
            ].map((item) => (
              <div key={item.title} className="border border-zinc-800 p-6">
                <h3 className="text-sm uppercase tracking-wider text-white mb-2">{item.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Commission Structure */}
        <div className="border border-zinc-800 p-8 sm:p-12 mb-16">
          <h2 className="text-[10px] tracking-[0.35em] uppercase text-zinc-500 mb-6">Commission Structure</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-baseline border-b border-zinc-800/50 pb-4"><span className="text-sm text-zinc-400">Commission Rate</span><span className="text-sm text-white">3% on direct closes</span></div>
            <div className="flex justify-between items-baseline border-b border-zinc-800/50 pb-4"><span className="text-sm text-zinc-400">Attribution Window</span><span className="text-sm text-white">90 days from registered introduction</span></div>
            <div className="flex justify-between items-baseline border-b border-zinc-800/50 pb-4"><span className="text-sm text-zinc-400">Revenue Base</span><span className="text-sm text-white">First 12 months gross</span></div>
            <div className="flex justify-between items-baseline"><span className="text-sm text-zinc-400">Structure</span><span className="text-sm text-white">Single-layer only. No cascading.</span></div>
          </div>
        </div>

        {/* Apply CTA */}
        {!showForm && !submitted && (
          <div className="text-center border border-zinc-800 p-12">
            <h2 className="text-xl font-light text-white mb-3">{openSeats} Founding {openSeats === 1 ? "Seat" : "Seats"} Remaining</h2>
            <p className="text-sm text-zinc-500 max-w-md mx-auto mb-8">We&apos;re selectively onboarding founding partner companies. If your business benefits from strategic event-based introductions, we&apos;d like to hear from you.</p>
            <button onClick={() => setShowForm(true)} className="px-8 py-3 text-sm tracking-wider uppercase font-medium text-white bg-[#1a8fff] transition-all duration-300 hover:bg-[#4db8ff] hover:shadow-[0_0_30px_rgba(26,143,255,0.25)]">Apply for Founding Partner</button>
          </div>
        )}

        {/* Application Form */}
        {showForm && !submitted && (
          <div className="border border-zinc-800 p-8 sm:p-12">
            <h2 className="text-[10px] tracking-[0.35em] uppercase text-zinc-500 mb-8">Founding Partner Application</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="block text-xs text-zinc-500 mb-2">Your Name</label><input name="name" type="text" required className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-700 focus:border-zinc-500 focus:outline-none transition" placeholder="Full name" /></div>
                <div><label className="block text-xs text-zinc-500 mb-2">Company Name</label><input name="company" type="text" required className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-700 focus:border-zinc-500 focus:outline-none transition" placeholder="Company" /></div>
                <div><label className="block text-xs text-zinc-500 mb-2">Industry</label><input name="industry" type="text" required className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-700 focus:border-zinc-500 focus:outline-none transition" placeholder="e.g., SaaS, Telecom, Ecommerce" /></div>
                <div><label className="block text-xs text-zinc-500 mb-2">Email</label><input name="email" type="email" required className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-700 focus:border-zinc-500 focus:outline-none transition" placeholder="you@company.com" /></div>
              </div>
              <div><label className="block text-xs text-zinc-500 mb-2">What does your company do and who is your ideal customer?</label><textarea name="description" rows={3} required className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-700 focus:border-zinc-500 focus:outline-none transition resize-none" placeholder="Brief description of your business and target customer" /></div>
              <div><label className="block text-xs text-zinc-500 mb-2">What events or trade shows does your industry attend?</label><textarea name="events" rows={2} className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-700 focus:border-zinc-500 focus:outline-none transition resize-none" placeholder="List any relevant events" /></div>
              <button type="submit" className="px-12 py-4 text-sm tracking-wider uppercase font-medium text-white bg-[#1a8fff] transition-all duration-300 hover:bg-[#4db8ff]">Submit Application</button>
            </form>
          </div>
        )}

        {/* Success */}
        {submitted && (
          <div className="border border-zinc-800 p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-xl font-light text-white mb-3">Application Received</h2>
            <p className="text-sm text-zinc-500 max-w-md mx-auto">We review all founding partner applications personally. Expect a response within 48 hours.</p>
          </div>
        )}
      </main>

      <footer className="border-t border-zinc-900 py-8">
        <div className="mx-auto max-w-6xl px-6 flex items-center justify-between">
          <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-700">WingMann Network</p>
          <Image src="/w-logo.png" alt="W" width={200} height={200} className="w-32 h-auto opacity-30" />
          <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-700">Never Enter Alone</p>
        </div>
      </footer>
    </div>
  );
}
