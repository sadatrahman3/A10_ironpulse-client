import { Link } from "react-router-dom";

export default function EmptyState({ title = "Nothing here yet", description, action, actionLabel = "Go back" }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-ink-500 bg-ink-900/40 px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-ink-500 bg-ink-800 text-fog-500">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/></svg>
      </div>
      <h3 className="mt-4 font-display text-lg font-bold text-fog-200">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-fog-400">{description}</p>}
      <div className="mt-5">
        {action ? action : <Link to="/" className="min-h-[44px] rounded-full bg-volt px-5 py-2.5 text-sm font-semibold text-ink-950 hover:brightness-110 inline-flex">{actionLabel}</Link>}
      </div>
    </div>
  );
}
