import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { HiMenu, HiX } from "react-icons/hi";
import { FiSun, FiMoon } from "react-icons/fi";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
    setMobileOpen(false);
  };

  const dashboardPath = user ? `/dashboard/${user.role}` : "/login";

  const navLinks = (
    <>
      <Link to="/" className="rounded-md px-3 py-2 text-sm font-medium text-fog-400 hover:text-fog-200 hover:bg-ink-800 transition-colors" onClick={() => setMobileOpen(false)}>Home</Link>
      <Link to="/classes" className="rounded-md px-3 py-2 text-sm font-medium text-fog-400 hover:text-fog-200 hover:bg-ink-800 transition-colors" onClick={() => setMobileOpen(false)}>All Classes</Link>
      <Link to="/forum" className="rounded-md px-3 py-2 text-sm font-medium text-fog-400 hover:text-fog-200 hover:bg-ink-800 transition-colors" onClick={() => setMobileOpen(false)}>Community Forum</Link>
      {user && <Link to={dashboardPath} className="rounded-md px-3 py-2 text-sm font-medium text-fog-400 hover:text-fog-200 hover:bg-ink-800 transition-colors" onClick={() => setMobileOpen(false)}>Dashboard</Link>}
    </>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-ink-600 bg-ink-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <svg width="26" height="26" viewBox="0 0 28 28" fill="none" className="text-volt"><path d="M2 14h5l2.5-7 4 14 3-9 2 2h7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span className="font-display text-lg font-extrabold tracking-tight text-fog-200">Iron<span className="text-volt">Pulse</span></span>
        </Link>

        <nav className="ml-4 hidden md:flex items-center gap-1">{navLinks}</nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <button onClick={toggle} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-ink-600 bg-ink-900 p-2.5 text-fog-300 hover:text-fog-200 hover:border-ink-500 transition-colors" aria-label="Toggle theme">
            {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <img src={user.image || "https://i.pravatar.cc/80?img=33"} alt="" className="h-8 w-8 rounded-full object-cover" />
              <button onClick={handleLogout} className="rounded-full bg-ink-800 px-4 py-2 text-sm font-medium text-fog-300 hover:text-fog-200 hover:bg-ink-700 transition-colors">Logout</button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="rounded-full bg-ink-800 px-4 py-2 text-sm font-medium text-fog-300 hover:text-fog-200 hover:bg-ink-700 transition-colors">Login</Link>
              <Link to="/register" className="rounded-full bg-volt px-4 py-2 text-sm font-semibold text-ink-950 hover:brightness-110 transition">Register</Link>
            </div>
          )}

          <button className="md:hidden flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-ink-600 bg-ink-900 p-2.5 text-fog-300" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <HiX size={18} /> : <HiMenu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-ink-600 bg-ink-950 px-4 py-3">
          <nav className="flex flex-col gap-1">{navLinks}</nav>
        </div>
      )}
    </header>
  );
}
