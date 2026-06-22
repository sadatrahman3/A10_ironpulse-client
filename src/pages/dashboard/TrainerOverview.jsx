import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api";

export default function TrainerOverview() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ classes: 0, students: 0 });

  useEffect(() => {
    api.get("/classes/trainer/me").then((r) => setStats((s) => ({ ...s, classes: r.data.length }))).catch(() => {});
    api.get("/bookings/trainer").then((r) => {
      const uniqueStudents = new Set(r.data.map((b) => b.userId));
      setStats((s) => ({ ...s, students: uniqueStudents.size }));
    }).catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-fog-200 mb-6">Trainer Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="rounded-xl border border-ink-600 bg-ink-900 p-6">
          <p className="text-sm text-fog-500">Total Classes Created</p>
          <p className="mt-2 font-display text-3xl font-extrabold text-volt">{stats.classes}</p>
        </div>
        <div className="rounded-xl border border-ink-600 bg-ink-900 p-6">
          <p className="text-sm text-fog-500">Total Students Enrolled</p>
          <p className="mt-2 font-display text-3xl font-extrabold text-teal">{stats.students}</p>
        </div>
      </div>
      <div className="rounded-xl border border-ink-600 bg-ink-900 p-6">
        <h2 className="font-display text-lg font-bold text-fog-200 mb-4">Profile</h2>
        <div className="flex items-center gap-4">
          <img src={user?.image || "https://i.pravatar.cc/80?img=33"} alt="" className="h-16 w-16 rounded-full object-cover" />
          <div>
            <p className="font-semibold text-fog-200">{user?.name}</p>
            <p className="text-sm text-fog-400">{user?.email}</p>
            <span className="inline-block mt-1 rounded-full bg-volt/20 px-2 py-0.5 text-[10px] font-bold uppercase text-volt">Trainer</span>
          </div>
        </div>
      </div>
    </div>
  );
}
