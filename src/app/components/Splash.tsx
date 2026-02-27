"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Splash() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(!pathname.startsWith("/admin"));
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    if (!visible) return;
    const exitTimer = setTimeout(() => setAnimating(false), 1400);
    const removeTimer = setTimeout(() => setVisible(false), 2000);
    return () => { clearTimeout(exitTimer); clearTimeout(removeTimer); };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-500 ${
        animating ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Radial glow behind logo */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[#1a8fff]/10 blur-[100px] splash-glow" />

      {/* W logo with deep zoom */}
      <div className="splash-zoom">
        <Image
          src="/w-logo.png"
          alt="W"
          width={400}
          height={400}
          priority
          className="w-32 h-auto select-none drop-shadow-[0_0_40px_rgba(26,143,255,0.3)]"
          draggable={false}
        />
      </div>
    </div>
  );
}
