import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="text-7xl font-display font-extrabold text-ink-600">404</div>
      <h1 className="mt-4 text-2xl font-display font-bold text-fog-200">Page Not Found</h1>
      <p className="mt-2 max-w-sm text-fog-400">The page you are looking for does not exist or has been moved.</p>
      <Link to="/" className="mt-6 rounded-full bg-volt px-6 py-3 text-sm font-semibold text-ink-950 hover:brightness-110 transition">Back to Home</Link>
    </div>
  );
}
