interface StatCardProps {
  label: string;
  value: number;
  accent?: string;
}

export default function StatCard({ label, value, accent }: StatCardProps) {
  return (
    <div className="border border-zinc-800 p-5">
      <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-600 mb-2">{label}</p>
      <p className={`text-2xl font-light ${accent || "text-white"}`}>{value}</p>
    </div>
  );
}
