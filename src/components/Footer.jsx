import { Link } from "react-router-dom";
import { FiTwitter, FiInstagram, FiYoutube } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="border-t border-ink-600 mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <svg width="22" height="22" viewBox="0 0 28 28" fill="none" className="text-volt"><path d="M2 14h5l2.5-7 4 14 3-9 2 2h7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span className="font-display text-lg font-extrabold text-fog-200">Iron<span className="text-volt">Pulse</span></span>
            </Link>
            <p className="text-sm text-fog-500 leading-relaxed">Your ultimate fitness community. Discover classes, connect with trainers, and train with intent.</p>
          </div>
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-fog-400 mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link to="/classes" className="text-sm text-fog-500 hover:text-fog-300 transition-colors">All Classes</Link>
              <Link to="/forum" className="text-sm text-fog-500 hover:text-fog-300 transition-colors">Community Forum</Link>
              <Link to="/login" className="text-sm text-fog-500 hover:text-fog-300 transition-colors">Login</Link>
              <Link to="/register" className="text-sm text-fog-500 hover:text-fog-300 transition-colors">Register</Link>
            </div>
          </div>
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-fog-400 mb-4">Contact</h3>
            <div className="flex flex-col gap-2 text-sm text-fog-500">
              <span>support@ironpulse.com</span>
              <span>+1 (555) 123-4567</span>
              <span>123 Fitness Ave, Gym City</span>
            </div>
          </div>
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-fog-400 mb-4">Follow Us</h3>
            <div className="flex items-center gap-3">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-600 bg-ink-900 text-fog-400 hover:text-fog-200 hover:border-ink-500 transition-colors" aria-label="X (Twitter)"><FiTwitter size={16} /></a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-600 bg-ink-900 text-fog-400 hover:text-fog-200 hover:border-ink-500 transition-colors" aria-label="Instagram"><FiInstagram size={16} /></a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-600 bg-ink-900 text-fog-400 hover:text-fog-200 hover:border-ink-500 transition-colors" aria-label="YouTube"><FiYoutube size={16} /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-ink-600 pt-6 text-xs text-fog-500">
          <span>&copy; {new Date().getFullYear()} IronPulse. All rights reserved.</span>
          <span>Train with intent.</span>
        </div>
      </div>
    </footer>
  );
}
