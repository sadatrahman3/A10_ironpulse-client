import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api";

export default function AdminOverview() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ users: 0, classes: 0, bookings: 0 });

  useEffect(() => {
    api.get("/users").then((r) => setStats((s) => ({ ...s, users: r.data.length }))).catch(() => {});
    api.get("/classes/admin/all").then((r) => setStats((s) => ({ ...s, classes: r.data.length }))).catch(() => {});
    api.get("/transactions").then((r) => setStats((s) => ({ ...s, bookings: r.data.length }))).catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-fog-200 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="rounded-xl border border-ink-600 bg-ink-900 p-6"><p className="text-sm text-fog-500">Total Users</p><p className="mt-2 font-display text-3xl font-extrabold text-volt">{stats.users}</p></div>
        <div className="rounded-xl border border-ink-600 bg-ink-900 p-6"><p className="text-sm text-fog-500">Total Classes</p><p className="mt-2 font-display text-3xl font-extrabold text-teal">{stats.classes}</p></div>
        <div className="rounded-xl border border-ink-600 bg-ink-900 p-6"><p className="text-sm text-fog-500">Total Bookings</p><p className="mt-2 font-display text-3xl font-extrabold text-amber">{stats.bookings}</p></div>
      </div>
      <div className="rounded-xl border border-ink-600 bg-ink-900 p-6">
        <h2 className="font-display text-lg font-bold text-fog-200 mb-4">Admin Profile</h2>
        <div className="flex items-center gap-4">
          <img src={user?.image || "https://i.pravatar.cc/80?img=12"} alt="" className="h-16 w-16 rounded-full object-cover" />
          <div>
            <p className="font-semibold text-fog-200">{user?.name}</p>
            <p className="text-sm text-fog-400">{user?.email}</p>
            <span className="inline-block mt-1 rounded-full bg-rose/20 px-2 py-0.5 text-[10px] font-bold uppercase text-rose">Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
}
