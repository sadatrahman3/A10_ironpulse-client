import { Link } from "react-router-dom";

export default function PaymentCancel() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="text-6xl mb-4">🚫</div>
      <h1 className="font-display text-2xl font-extrabold text-fog-200">Payment Cancelled</h1>
      <p className="mt-2 text-fog-400">Your payment was not processed. No charges were made.</p>
      <div className="mt-6 flex gap-3">
        <Link to="/classes" className="rounded-full bg-volt px-6 py-3 text-sm font-bold text-ink-950 hover:brightness-110 transition">Browse Classes</Link>
        <Link to="/" className="rounded-full border border-ink-600 bg-ink-900 px-6 py-3 text-sm font-medium text-fog-300 hover:text-fog-200 transition">Go Home</Link>
      </div>
    </div>
  );
}
