const colors: Record<string, string> = {
  confirmed: "border-emerald-500/30 text-emerald-400",
  active: "border-emerald-500/30 text-emerald-400",
  Active: "border-emerald-500/30 text-emerald-400",
  approved: "border-emerald-500/30 text-emerald-400",
  completed: "border-blue-500/30 text-blue-400",
  pending: "border-amber-500/30 text-amber-400",
  cancelled: "border-red-500/30 text-red-400",
  rejected: "border-red-500/30 text-red-400",
};

export default function StatusBadge({ status }: { status: string }) {
  const cls = colors[status] || "border-zinc-700 text-zinc-500";
  return (
    <span className={`inline-block text-[10px] tracking-wider uppercase px-2 py-0.5 border ${cls}`}>
      {status}
    </span>
  );
}
