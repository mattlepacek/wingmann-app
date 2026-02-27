"use client";

export interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T extends { id: string }> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
}

export default function DataTable<T extends { id: string }>({
  columns, data, onRowClick,
}: DataTableProps<T>) {
  return (
    <div className="border border-zinc-800 overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-900/30">
            {columns.map((col) => (
              <th key={col.key} className="text-left px-4 py-3 text-[10px] tracking-[0.25em] uppercase text-zinc-600 font-normal">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-xs text-zinc-600">
                No data
              </td>
            </tr>
          )}
          {data.map((item) => (
            <tr
              key={item.id}
              onClick={() => onRowClick?.(item)}
              className={`border-b border-zinc-800/50 last:border-0 transition ${
                onRowClick ? "cursor-pointer hover:bg-white/[0.02]" : ""
              }`}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-sm text-zinc-400">
                  {col.render
                    ? col.render(item)
                    : String((item as Record<string, unknown>)[col.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
