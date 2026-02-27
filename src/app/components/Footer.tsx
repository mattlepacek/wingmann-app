import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 py-8 bg-black">
      <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-700">
          WingMann Network
        </p>
        <Image
          src="/w-logo.png"
          alt="W"
          width={200}
          height={200}
          className="w-24 sm:w-32 h-auto opacity-30"
        />
        <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-700">
          Never Enter Alone
        </p>
      </div>
    </footer>
  );
}
