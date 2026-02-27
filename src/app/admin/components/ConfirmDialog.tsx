"use client";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  destructive?: boolean;
}

export default function ConfirmDialog({
  open, title, message, onConfirm, onCancel, confirmLabel = "Confirm", destructive,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="fixed inset-0 bg-black/70" onClick={onCancel} />
      <div className="relative w-full max-w-sm bg-zinc-950 border border-zinc-800 p-6">
        <h3 className="text-sm font-light text-white mb-2">{title}</h3>
        <p className="text-xs text-zinc-500 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-xs tracking-wider uppercase text-zinc-500 border border-zinc-800 hover:border-zinc-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-xs tracking-wider uppercase font-medium transition ${
              destructive
                ? "text-white bg-red-600 hover:bg-red-700"
                : "text-black bg-white hover:bg-zinc-200"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
