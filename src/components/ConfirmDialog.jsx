import { useState, useCallback } from "react";

export function useConfirmDialog() {
  const [dialog, setDialog] = useState({ open: false, title: "", message: "", onConfirm: null });

  const confirm = useCallback((title, message) => {
    return new Promise((resolve) => {
      setDialog({
        open: true,
        title,
        message,
        onConfirm: () => { setDialog({ open: false, title: "", message: "", onConfirm: null }); resolve(true); },
        onCancel: () => { setDialog({ open: false, title: "", message: "", onConfirm: null }); resolve(false); },
      });
    });
  }, []);

  return { dialog, confirm };
}

export default function ConfirmDialog({ dialog }) {
  if (!dialog.open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-2xl border border-ink-500 bg-ink-900 p-6 pop">
        <h3 className="font-display text-lg font-bold text-fog-200">{dialog.title}</h3>
        <p className="mt-2 text-sm text-fog-400">{dialog.message}</p>
        <div className="mt-6 flex gap-3">
          <button onClick={dialog.onConfirm} className="flex-1 rounded-full bg-volt px-4 py-2.5 text-sm font-bold text-ink-950 hover:brightness-110 transition">Confirm</button>
          <button onClick={dialog.onCancel} className="flex-1 rounded-full border border-ink-600 bg-ink-800 px-4 py-2.5 text-sm font-medium text-fog-300 hover:text-fog-200 transition">Cancel</button>
        </div>
      </div>
    </div>
  );
}
