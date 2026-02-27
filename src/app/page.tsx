import Image from "next/image";
import Link from "next/link";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="relative bg-black overflow-hidden">
      {/* ── Hero Section ── */}
      <div className="relative flex min-h-screen flex-col items-center justify-center">
        {/* Blue-tinted radial glow behind logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1a8fff]/[0.03] rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#1a8fff]/[0.05] rounded-full blur-[100px]" />

        <main className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
          {/* Logo */}
          <div className="animate-fade-up">
            <Image
              src="/logo.webp"
              alt="WingMann"
              width={763}
              height={78}
              priority
              className="w-[320px] sm:w-[420px] md:w-[520px] h-auto select-none"
              draggable={false}
            />
          </div>

          {/* Divider */}
          <div className="animate-fade-up-delay-1 w-48 h-px line-gradient" />

          {/* Hero Line */}
          <h1 className="animate-fade-up-delay-1 text-sm sm:text-base tracking-[0.35em] uppercase text-zinc-400 font-light">
            Professional Relationship Operators
          </h1>

          {/* Sub-copy */}
          <p className="animate-fade-up-delay-2 max-w-md text-zinc-600 text-sm leading-relaxed">
            We deploy high-level connectors at events to accelerate deals
            through strategic introductions. Your advantage in any room.
          </p>

          {/* Nav links */}
          <div className="animate-fade-up-delay-2 flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            <Link href="/operator" className="text-[11px] tracking-[0.25em] uppercase text-zinc-600 transition hover:text-[#4db8ff]">
              Operator
            </Link>
            <span className="text-zinc-800 hidden sm:inline">|</span>
            <Link href="/shows" className="text-[11px] tracking-[0.25em] uppercase text-zinc-600 transition hover:text-[#4db8ff]">
              Trade Shows
            </Link>
            <span className="text-zinc-800 hidden sm:inline">|</span>
            <Link href="/partners" className="text-[11px] tracking-[0.25em] uppercase text-zinc-600 transition hover:text-[#4db8ff]">
              Partners
            </Link>
          </div>

          {/* CTAs */}
          <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 w-full sm:w-auto px-4 sm:px-0">
            <Link
              href="/partners"
              className="group relative px-8 py-3 text-sm tracking-wider uppercase font-medium text-white bg-[#1a8fff] rounded-none transition-all duration-300 hover:bg-[#4db8ff] hover:shadow-[0_0_30px_rgba(26,143,255,0.3)]"
            >
              Become a Founding Partner
            </Link>
            <Link
              href="/book"
              className="px-8 py-3 text-sm tracking-wider uppercase font-medium text-zinc-400 border border-zinc-800 rounded-none transition-all duration-300 hover:border-[#1a8fff]/50 hover:text-[#4db8ff]"
            >
              Book a WingMann
            </Link>
          </div>
        </main>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 animate-fade-up-delay-3 flex flex-col items-center gap-3">
          <p className="text-[11px] tracking-[0.3em] uppercase text-zinc-700">
            Scroll
          </p>
          <div className="w-px h-6 bg-gradient-to-b from-zinc-700 to-transparent" />
        </div>
      </div>

      {/* ── Deployed Hero Image Section ── */}
      <div className="relative h-[70vh] sm:h-[80vh] overflow-hidden">
        {/* Dark gradient overlays for blending */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute inset-0 z-10 bg-black/40" />

        <Image
          src="/deployed-hero.png"
          alt="WingMann deployed at trade show"
          fill
          className="object-cover object-top"
        />

      </div>

      {/* ── What Is WingMann ── */}
      <section className="relative bg-black py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">

          {/* Section header */}
          <div className="text-center mb-20">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#1a8fff]/60 mb-4">The Concept</p>
            <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight mb-6">
              What is a WingMann?
            </h2>
            <div className="w-32 h-px line-gradient mx-auto mb-8" />
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-zinc-500 leading-relaxed">
              A WingMann is a professional relationship operator — a high-charisma connector
              deployed at trade shows, conferences, and corporate events to start conversations,
              make introductions, and accelerate deals on your behalf.
            </p>
          </div>

          {/* The Problem / Solution */}
          <div className="grid sm:grid-cols-2 gap-px bg-zinc-800 border border-zinc-800 mb-20">
            <div className="bg-black p-8 sm:p-10">
              <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-600 mb-4">The Problem</p>
              <p className="text-sm text-zinc-400 leading-relaxed">
                You spend $5,000+ on a trade show booth. Your team stands behind a table,
                waiting for people to walk up. Most attendees walk right past. The ROI is
                unclear. The connections are shallow. The follow-ups go cold.
              </p>
            </div>
            <div className="bg-black p-8 sm:p-10">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#1a8fff]/60 mb-4">The WingMann Way</p>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Instead of a branded booth, you deploy a WingMann. They work the floor,
                start real conversations, make warm introductions, and create relationships
                that lead to revenue — all without a single sales pitch.
              </p>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-20">
            <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-600 mb-10 text-center">How It Works</p>
            <div className="grid sm:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800">
              <div className="bg-black p-8">
                <div className="w-6 h-px bg-[#1a8fff]/40 mb-5" />
                <h3 className="text-sm uppercase tracking-wider text-white mb-3">Book or Deploy</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Schedule a WingMann for an upcoming trade show, or request one on-demand
                  for tonight&apos;s corporate mixer. Flat rate or performance-based.
                </p>
              </div>
              <div className="bg-black p-8">
                <div className="w-6 h-px bg-[#1a8fff]/40 mb-5" />
                <h3 className="text-sm uppercase tracking-wider text-white mb-3">Strategic Presence</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Your WingMann arrives, reads the room, and initiates organic conversations.
                  From a dedicated lounge to roaming the floor — they adapt to the environment.
                </p>
              </div>
              <div className="bg-black p-8">
                <div className="w-6 h-px bg-[#1a8fff]/40 mb-5" />
                <h3 className="text-sm uppercase tracking-wider text-white mb-3">Connections That Close</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Every introduction is logged and attributed. Deals start with a handshake
                  and close with a contract. You get warm pipeline, not cold leads.
                </p>
              </div>
            </div>
          </div>

          {/* Deployment Modes */}
          <div className="mb-20">
            <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-600 mb-10 text-center">Deployment Modes</p>
            <div className="grid sm:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800">
              <div className="bg-black p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-white" />
                  <h3 className="text-xs uppercase tracking-wider text-white">WingMann Lounge</h3>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Our own booth — but it&apos;s not branded for any single company. It&apos;s a conversation
                  hub. Coffee, comfortable seats, no badge scanning. People walk up because
                  they&apos;re curious, and leave with connections.
                </p>
              </div>
              <div className="bg-black p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#1a8fff]" />
                  <h3 className="text-xs uppercase tracking-wider text-[#4db8ff]">Partner Booth</h3>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Embedded inside a partner&apos;s existing booth. Your WingMann works from their space,
                  extending conversations and making warm introductions that benefit both brands.
                </p>
              </div>
              <div className="bg-black p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <h3 className="text-xs uppercase tracking-wider text-amber-400">Roaming</h3>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  No fixed booth. Your WingMann works the entire floor — maximum coverage,
                  organic introductions, and the kind of conversations that only happen
                  when someone confident walks up first.
                </p>
              </div>
            </div>
          </div>

          {/* Who It's For */}
          <div className="mb-20">
            <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-600 mb-10 text-center">Who It&apos;s For</p>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  title: "Companies Without a Booth",
                  desc: "You want presence at a trade show but don't want to spend $5K+ on a booth. Deploy a WingMann to represent your brand through real conversations instead.",
                },
                {
                  title: "Founders Who Need Reach",
                  desc: "You're running multiple businesses and can't be at every event. A WingMann carries your brands into rooms you can't be in — and the introductions are tracked.",
                },
                {
                  title: "Teams That Need Confidence",
                  desc: "Your team is at an after-work event or corporate mixer but nobody's making moves. A WingMann breaks the ice, starts conversations, and creates momentum.",
                },
                {
                  title: "Partners Who Want More Pipeline",
                  desc: "Become a founding partner and get a dedicated WingMann representing your brand at events. Commission-based, performance-aligned, fully attributed.",
                },
              ].map((item) => (
                <div key={item.title} className="border border-zinc-800 p-6 sm:p-8 transition hover:border-[#1a8fff]/20">
                  <h3 className="text-sm uppercase tracking-wider text-white mb-3">{item.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center border border-zinc-800 p-8 sm:p-16">
            <h2 className="text-xl sm:text-2xl font-light text-white tracking-tight mb-4">
              Your Advantage in Any Room
            </h2>
            <p className="text-sm text-zinc-500 max-w-lg mx-auto mb-8">
              Whether it&apos;s a 40,000-person trade show or a private networking dinner,
              a WingMann gives you strategic presence without the overhead.
              Confidence, deployed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book"
                className="px-8 py-3 text-sm tracking-wider uppercase font-medium text-white bg-[#1a8fff] transition-all duration-300 hover:bg-[#4db8ff] hover:shadow-[0_0_30px_rgba(26,143,255,0.3)]"
              >
                Book a WingMann
              </Link>
              <Link
                href="/partners"
                className="px-8 py-3 text-sm tracking-wider uppercase font-medium text-zinc-400 border border-zinc-800 transition-all duration-300 hover:border-[#1a8fff]/50 hover:text-[#4db8ff]"
              >
                Become a Partner
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}
