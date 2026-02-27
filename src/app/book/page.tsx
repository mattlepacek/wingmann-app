"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const eventTypes = [
  { id: "tradeshow", label: "Trade Show", desc: "Full-day booth deployment with strategic introductions" },
  { id: "corporate", label: "Corporate Event", desc: "After-work events, conferences, and industry mixers" },
  { id: "private", label: "Private Networking", desc: "Exclusive gatherings and high-value introductions" },
  { id: "adhoc", label: "Ad-Hoc Backup", desc: "On-demand deployment — you need a WingMann now" },
];

const pricingModels = [
  { id: "flat", label: "Flat Rate", price: "$150/hr or $1,200/day", desc: "No commission. Clean and simple." },
  { id: "performance", label: "Performance", price: "Reduced rate + 3%", desc: "Commission on closed deals within 90-day window." },
];

export default function BookPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedPricing, setSelectedPricing] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data: Record<string, string> = {};
    formData.forEach((val, key) => { data[key] = val as string; });
    data.eventType = selectedType || "";
    data.pricingModel = selectedPricing || "";

    await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen bg-black">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-zinc-900 bg-black/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/">
            <Image
              src="/logo.webp"
              alt="WingMann"
              width={763}
              height={78}
              className="h-6 w-auto select-none"
              draggable={false}
            />
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/operator"
              className="text-xs tracking-widest uppercase text-zinc-500 transition hover:text-[#4db8ff]"
            >
              Operator
            </Link>
            <Link
              href="/shows"
              className="text-xs tracking-widest uppercase text-zinc-500 transition hover:text-[#4db8ff]"
            >
              Shows
            </Link>
            <Link
              href="/partners"
              className="text-xs tracking-widest uppercase text-zinc-500 transition hover:text-[#4db8ff]"
            >
              Partners
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6 pt-32 pb-24">
        <div className="mb-12">
          <h1 className="text-2xl sm:text-3xl font-light text-white tracking-tight mb-3">
            Book a WingMann
          </h1>
          <p className="text-sm text-zinc-500">
            Deploy a professional relationship operator at your next event.
          </p>
        </div>

        {submitted ? (
          <div className="border border-zinc-800 p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-light text-white mb-3">Deployment Request Received</h2>
            <p className="text-sm text-zinc-500 max-w-md mx-auto">
              We&apos;ll confirm your booking within 24 hours. Your WingMann will be briefed
              on your objectives before deployment.
            </p>
            <Link
              href="/"
              className="inline-block mt-8 px-8 py-3 text-sm tracking-wider uppercase font-medium text-zinc-400 border border-zinc-800 transition hover:border-zinc-600 hover:text-zinc-200"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Event Type */}
            <div>
              <h2 className="text-[10px] tracking-[0.35em] uppercase text-zinc-500 mb-6">
                Deployment Type
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {eventTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type.id)}
                    className={`text-left p-5 border transition-all duration-200 ${
                      selectedType === type.id
                        ? "border-[#1a8fff]/50 bg-[#1a8fff]/5"
                        : "border-zinc-800 hover:border-zinc-600"
                    }`}
                  >
                    <p className="text-sm text-white mb-1">{type.label}</p>
                    <p className="text-xs text-zinc-500">{type.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Pricing Model */}
            <div>
              <h2 className="text-[10px] tracking-[0.35em] uppercase text-zinc-500 mb-6">
                Engagement Model
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {pricingModels.map((model) => (
                  <button
                    key={model.id}
                    type="button"
                    onClick={() => setSelectedPricing(model.id)}
                    className={`text-left p-5 border transition-all duration-200 ${
                      selectedPricing === model.id
                        ? "border-[#1a8fff]/50 bg-[#1a8fff]/5"
                        : "border-zinc-800 hover:border-zinc-600"
                    }`}
                  >
                    <p className="text-sm text-white mb-1">{model.label}</p>
                    <p className="text-lg font-light text-white">{model.price}</p>
                    <p className="text-xs text-zinc-500 mt-1">{model.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Event Details */}
            <div>
              <h2 className="text-[10px] tracking-[0.35em] uppercase text-zinc-500 mb-6">
                Event Details
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-500 mb-2">Event Name</label>
                  <input
                    name="eventName"
                    type="text"
                    required
                    className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-700 focus:border-zinc-500 focus:outline-none transition"
                    placeholder="e.g., SaaStr Annual 2026"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-2">Location</label>
                  <input
                    name="location"
                    type="text"
                    required
                    className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-700 focus:border-zinc-500 focus:outline-none transition"
                    placeholder="City, Venue"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-2">Date</label>
                  <input
                    name="date"
                    type="date"
                    required
                    className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm text-white focus:border-zinc-500 focus:outline-none transition [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-2">Duration</label>
                  <select name="duration" className="w-full bg-black border border-zinc-800 px-4 py-3 text-sm text-white focus:border-zinc-500 focus:outline-none transition">
                    <option>2 hours</option>
                    <option>4 hours (half day)</option>
                    <option>Full day</option>
                    <option>2-day event</option>
                    <option>3+ day event</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-[10px] tracking-[0.35em] uppercase text-zinc-500 mb-6">
                Your Information
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-500 mb-2">Name</label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-700 focus:border-zinc-500 focus:outline-none transition"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-2">Company</label>
                  <input
                    name="company"
                    type="text"
                    required
                    className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-700 focus:border-zinc-500 focus:outline-none transition"
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-2">Email</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-700 focus:border-zinc-500 focus:outline-none transition"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-2">Phone</label>
                  <input
                    name="phone"
                    type="tel"
                    className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-700 focus:border-zinc-500 focus:outline-none transition"
                    placeholder="Optional"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-xs text-zinc-500 mb-2">
                  Objectives / What are you looking to achieve?
                </label>
                <textarea
                  name="objectives"
                  rows={3}
                  className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-700 focus:border-zinc-500 focus:outline-none transition resize-none"
                  placeholder="Who do you want to meet? What deals are you trying to close?"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                type="submit"
                className="w-full sm:w-auto px-12 py-4 text-sm tracking-wider uppercase font-medium text-white bg-[#1a8fff] transition-all duration-300 hover:bg-[#4db8ff] hover:shadow-[0_0_20px_rgba(26,143,255,0.25)]"
              >
                Request Deployment
              </button>
              <p className="text-[11px] text-zinc-600">
                We&apos;ll confirm availability within 24 hours.
              </p>
            </div>
          </form>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8">
        <div className="mx-auto max-w-6xl px-6 flex items-center justify-between">
          <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-700">
            WingMann Network
          </p>
          <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-700">
            Never Enter Alone
          </p>
        </div>
      </footer>
    </div>
  );
}
