import Image from "next/image";
import Link from "next/link";

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
          <div className="animate-fade-up-delay-2 flex items-center gap-6">
            <Link href="/operator" className="text-[11px] tracking-[0.25em] uppercase text-zinc-600 transition hover:text-[#4db8ff]">
              Operator
            </Link>
            <span className="text-zinc-800">|</span>
            <Link href="/shows" className="text-[11px] tracking-[0.25em] uppercase text-zinc-600 transition hover:text-[#4db8ff]">
              Trade Shows
            </Link>
            <span className="text-zinc-800">|</span>
            <Link href="/partners" className="text-[11px] tracking-[0.25em] uppercase text-zinc-600 transition hover:text-[#4db8ff]">
              Partners
            </Link>
          </div>

          {/* CTAs */}
          <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4 mt-4">
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
        <div className="absolute bottom-8 animate-fade-up-delay-3">
          <p className="text-[11px] tracking-[0.3em] uppercase text-zinc-700">
            Never Enter Alone
          </p>
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

      {/* ── Footer ── */}
      <footer className="border-t border-zinc-900 py-8 bg-black">
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
