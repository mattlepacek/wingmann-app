import Image from "next/image";
import Link from "next/link";

const stats = [
  { label: "Events Deployed", value: "47" },
  { label: "Introductions Made", value: "312" },
  { label: "Deals Closed", value: "28" },
  { label: "Partner Brands", value: "10" },
];

const specialties = [
  "Trade Shows",
  "Corporate Events",
  "Private Networking",
  "Strategic Introductions",
  "SaaS & Telecom",
  "Channel Partnerships",
];

export default function OperatorProfile() {
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
            <Link
              href="/book"
              className="text-xs tracking-widest uppercase text-white bg-[#1a8fff]/15 px-4 py-2 transition hover:bg-[#1a8fff]/25"
            >
              Book
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6 pt-32 pb-24">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-16">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-zinc-900 border border-zinc-800 overflow-hidden">
              <Image
                src="/robmann.png"
                alt="Robbie Mann"
                width={320}
                height={320}
                className="w-full h-full object-cover object-[center_15%]"
              />
            </div>
            {/* Availability dot */}
            <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-emerald-500 border-2 border-black" />
          </div>

          {/* Info */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
                Robbie Mann
              </h1>
              <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 mt-2">
                Certified WingMann &middot; Field Operator
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs text-emerald-400 tracking-wider uppercase">
                Available for Deployment
              </span>
            </div>

            <p className="max-w-lg text-sm text-zinc-400 leading-relaxed">
              Professional relationship operator specializing in strategic introductions,
              event-based deal acceleration, and channel partnership development. Deployed
              across trade shows, corporate events, and private networking engagements.
            </p>

            <Link
              href="/book"
              className="mt-2 inline-block px-8 py-3 text-sm tracking-wider uppercase font-medium text-white bg-[#1a8fff] transition-all duration-300 hover:bg-[#4db8ff] hover:shadow-[0_0_30px_rgba(26,143,255,0.25)]"
            >
              Book This Operator
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-zinc-800 border border-zinc-800 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-black p-6 text-center">
              <p className="text-2xl sm:text-3xl font-light text-white">{stat.value}</p>
              <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-500 mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Deployment Specialties */}
        <div className="mb-16">
          <h2 className="text-[10px] tracking-[0.35em] uppercase text-zinc-500 mb-6">
            Deployment Specialties
          </h2>
          <div className="flex flex-wrap gap-3">
            {specialties.map((s) => (
              <span
                key={s}
                className="px-4 py-2 text-xs tracking-wider uppercase text-zinc-400 border border-zinc-800 transition hover:border-[#1a8fff]/30 hover:text-[#4db8ff]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-[10px] tracking-[0.35em] uppercase text-zinc-500 mb-8">
            How Deployment Works
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Book",
                desc: "Select your event type, date, and deployment mode. Flat rate or performance-based.",
              },
              {
                step: "02",
                title: "Deploy",
                desc: "Your WingMann arrives, reads the room, and initiates strategic conversations on your behalf.",
              },
              {
                step: "03",
                title: "Connect",
                desc: "Introductions are logged, attributed, and tracked. Deals close, pipeline grows.",
              },
            ].map((item) => (
              <div key={item.step} className="group">
                <p className="text-xs text-zinc-700 font-mono mb-3">{item.step}</p>
                <h3 className="text-sm uppercase tracking-wider text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Preview */}
        <div className="border border-zinc-800 p-8 sm:p-12">
          <h2 className="text-[10px] tracking-[0.35em] uppercase text-zinc-500 mb-8">
            Engagement Models
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm uppercase tracking-wider text-white mb-1">Flat Rate</h3>
              <p className="text-3xl font-light text-white mb-2">
                $150<span className="text-sm text-zinc-500">/hr</span>
              </p>
              <p className="text-xs text-zinc-500">
                Or $1,200/day for full event deployment. No commission. Clean and simple.
              </p>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-wider text-white mb-1">Performance</h3>
              <p className="text-3xl font-light text-white mb-2">
                3<span className="text-sm text-zinc-500">% commission</span>
              </p>
              <p className="text-xs text-zinc-500">
                Reduced hourly rate + 3% on closed deals within 90-day attribution window.
                First 12 months gross. Minimum earn guarantee.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-zinc-800">
            <Link
              href="/book"
              className="inline-block px-8 py-3 text-sm tracking-wider uppercase font-medium text-white bg-[#1a8fff] transition-all duration-300 hover:bg-[#4db8ff] hover:shadow-[0_0_20px_rgba(26,143,255,0.25)]"
            >
              Book Now
            </Link>
          </div>
        </div>
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
