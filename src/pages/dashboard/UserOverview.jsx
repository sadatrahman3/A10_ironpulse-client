import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api";

export default function UserOverview() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ bookings: 0, favorites: 0 });

  useEffect(() => {
    api.get("/bookings/user").then((r) => setStats((s) => ({ ...s, bookings: r.data.length }))).catch(() => {});
    api.get("/favorites/user").then((r) => setStats((s) => ({ ...s, favorites: r.data.length }))).catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-fog-200 mb-6">My Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="rounded-xl border border-ink-600 bg-ink-900 p-6">
          <p className="text-sm text-fog-500">Total Booked Classes</p>
          <p className="mt-2 font-display text-3xl font-extrabold text-volt">{stats.bookings}</p>
        </div>
        <div className="rounded-xl border border-ink-600 bg-ink-900 p-6">
          <p className="text-sm text-fog-500">Total Favorites</p>
          <p className="mt-2 font-display text-3xl font-extrabold text-rose">{stats.favorites}</p>
        </div>
      </div>
      <div className="rounded-xl border border-ink-600 bg-ink-900 p-6">
        <h2 className="font-display text-lg font-bold text-fog-200 mb-4">Profile Details</h2>
        <div className="flex items-center gap-4">
          <img src={user?.image || "https://i.pravatar.cc/80?img=33"} alt="" className="h-16 w-16 rounded-full object-cover" />
          <div>
            <p className="font-semibold text-fog-200">{user?.name}</p>
            <p className="text-sm text-fog-400">{user?.email}</p>
            <span className="inline-block mt-1 rounded-full bg-teal/20 px-2 py-0.5 text-[10px] font-bold uppercase text-teal">{user?.role}</span>
          </div>
        </div>
        {user?.trainerApplicationStatus && user.trainerApplicationStatus !== "none" && (
          <div className="mt-4 rounded-lg border border-ink-600 bg-ink-850 p-4">
            <p className="text-sm text-fog-400">Trainer Application: <span className={`font-semibold ${user.trainerApplicationStatus === "approved" ? "text-teal" : user.trainerApplicationStatus === "rejected" ? "text-rose" : "text-amber"}`}>{user.trainerApplicationStatus}</span></p>
            {user.trainerApplicationStatus === "rejected" && user.trainerFeedback && (
              <p className="mt-1 text-sm text-fog-500">Feedback: {user.trainerFeedback}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
