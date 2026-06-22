import { useState, useEffect } from "react";
import api from "../../api";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

export default function AdminManageTrainers() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { api.get("/users/trainers").then((r) => setTrainers(r.data)).catch(() => {}).finally(() => setLoading(false)); }, []);

  const demote = async (id) => {
    if (!confirm("Demote this trainer to user?")) return;
    try {
      await api.patch(`/users/${id}/demote`);
      setTrainers(trainers.filter((t) => t.id !== id));
      toast.success("Trainer demoted");
    } catch (err) { toast.error(err.response?.data?.message || "Failed"); }
  };

  if (loading) return <Spinner size="lg" />;

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-fog-200 mb-6">Manage Trainers</h1>
      {trainers.length === 0 ? <p className="text-fog-400">No trainers found.</p> : (
        <div className="overflow-x-auto rounded-xl border border-ink-600">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-ink-600 bg-ink-900">
              <th className="px-4 py-3 text-left font-semibold text-fog-400">Name</th>
              <th className="px-4 py-3 text-left font-semibold text-fog-400">Email</th>
              <th className="px-4 py-3 text-left font-semibold text-fog-400">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-fog-400">Action</th>
            </tr></thead>
            <tbody>
              {trainers.map((t) => (
                <tr key={t.id} className="border-b border-ink-600 last:border-0 hover:bg-ink-850">
                  <td className="px-4 py-3 text-fog-200">{t.name}</td>
                  <td className="px-4 py-3 text-fog-400">{t.email}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${t.status === "blocked" ? "bg-rose/20 text-rose" : "bg-teal/20 text-teal"}`}>{t.status}</span></td>
                  <td className="px-4 py-3"><button onClick={() => demote(t.id)} className="text-xs font-medium text-rose hover:underline">Demote to User</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
