import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { FiHome, FiBookOpen, FiHeart, FiUserPlus, FiPlusSquare, FiList, FiUsers, FiCheckSquare, FiCreditCard, FiMessageSquare, FiSettings, FiMenu, FiX } from "react-icons/fi";

const sidebarLinks = {
  user: [
    { to: "/dashboard/user", icon: FiHome, label: "Overview", end: true },
    { to: "/dashboard/user/bookings", icon: FiBookOpen, label: "Booked Classes" },
    { to: "/dashboard/user/favorites", icon: FiHeart, label: "Favorite Classes" },
    { to: "/dashboard/user/apply", icon: FiUserPlus, label: "Apply as Trainer" },
  ],
  trainer: [
    { to: "/dashboard/trainer", icon: FiHome, label: "Overview", end: true },
    { to: "/dashboard/trainer/add-class", icon: FiPlusSquare, label: "Add Class" },
    { to: "/dashboard/trainer/my-classes", icon: FiList, label: "My Classes" },
    { to: "/dashboard/trainer/add-post", icon: FiMessageSquare, label: "Add Forum Post" },
    { to: "/dashboard/trainer/my-posts", icon: FiList, label: "My Forum Posts" },
  ],
  admin: [
    { to: "/dashboard/admin", icon: FiHome, label: "Overview", end: true },
    { to: "/dashboard/admin/users", icon: FiUsers, label: "Manage Users" },
    { to: "/dashboard/admin/applied-trainers", icon: FiUserPlus, label: "Applied Trainers" },
    { to: "/dashboard/admin/trainers", icon: FiUsers, label: "Manage Trainers" },
    { to: "/dashboard/admin/classes", icon: FiCheckSquare, label: "Manage Classes" },
    { to: "/dashboard/admin/add-post", icon: FiMessageSquare, label: "Add Forum Post" },
    { to: "/dashboard/admin/transactions", icon: FiCreditCard, label: "Transactions" },
    { to: "/dashboard/admin/forum", icon: FiSettings, label: "Manage Forum" },
  ],
};

export default function DashboardLayout() {
  const { user } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = sidebarLinks[user?.role] || sidebarLinks.user;

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-volt text-ink-950 shadow-lg shadow-volt/20">
        {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>

      {mobileOpen && <div className="lg:hidden fixed inset-0 z-40 bg-ink-950/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />}

      <aside className={`${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 shrink-0 flex flex-col border-r border-ink-600 bg-ink-900 p-4 transition-transform duration-200`}>
        <div className="mb-6 flex items-center gap-3 px-3">
          <img src={user?.image || "https://i.pravatar.cc/80?img=33"} alt="" className="h-10 w-10 rounded-full object-cover" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-fog-200 truncate">{user?.name}</p>
            <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${user?.role === "admin" ? "bg-rose/20 text-rose" : user?.role === "trainer" ? "bg-volt/20 text-volt" : "bg-teal/20 text-teal"}`}>{user?.role}</span>
          </div>
        </div>
        <nav className="flex flex-col gap-1">
          {links.map(({ to, icon: Icon, label, end }) => {
            const active = end ? location.pathname === to : location.pathname.startsWith(to);
            return (
              <Link key={to} to={to} onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${active ? "bg-volt text-ink-950" : "text-fog-400 hover:text-fog-200 hover:bg-ink-800"}`}>
                <Icon size={18} />{label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}
