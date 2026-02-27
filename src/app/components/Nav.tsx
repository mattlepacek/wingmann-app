"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface NavLink {
  href: string;
  label: string;
  highlight?: boolean;
}

export default function Nav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
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

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                link.highlight
                  ? "text-xs tracking-widest uppercase text-white bg-[#1a8fff]/15 px-4 py-2 transition hover:bg-[#1a8fff]/25"
                  : "text-xs tracking-widest uppercase text-zinc-500 transition hover:text-[#4db8ff]"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-px bg-zinc-400 transition-all duration-300 ${
              open ? "rotate-45 translate-y-[3.5px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-zinc-400 transition-all duration-300 ${
              open ? "-rotate-45 -translate-y-[3.5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className={`sm:hidden fixed inset-0 top-16 bg-black/95 backdrop-blur-md transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center gap-8 pt-16">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                link.highlight
                  ? "text-sm tracking-[0.3em] uppercase text-white bg-[#1a8fff]/15 px-6 py-3 transition hover:bg-[#1a8fff]/25"
                  : "text-sm tracking-[0.3em] uppercase text-zinc-400 transition hover:text-[#4db8ff]"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
