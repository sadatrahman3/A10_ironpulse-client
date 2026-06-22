import { useState, useEffect } from "react";
import api from "../../api";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

export default function AdminManageClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { api.get("/classes/admin/all").then((r) => setClasses(r.data)).catch(() => {}).finally(() => setLoading(false)); }, []);

  const updateStatus = async (id, status) => {
    try {
      const { data } = await api.patch(`/classes/${id}/status`, { status });
      setClasses(classes.map((c) => (c._id === id ? data : c)));
      toast.success(`Class ${status}`);
    } catch (err) { toast.error(err.response?.data?.message || "Failed"); }
  };

  const deleteClass = async (id) => {
    if (!confirm("Delete this class?")) return;
    try {
      await api.delete(`/classes/${id}`);
      setClasses(classes.filter((c) => c._id !== id));
      toast.success("Class deleted");
    } catch (err) { toast.error(err.response?.data?.message || "Failed"); }
  };

  if (loading) return <Spinner size="lg" />;

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-fog-200 mb-6">Manage Classes</h1>
      <div className="overflow-x-auto rounded-xl border border-ink-600">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-ink-600 bg-ink-900">
            <th className="px-4 py-3 text-left font-semibold text-fog-400">Class</th>
            <th className="px-4 py-3 text-left font-semibold text-fog-400">Trainer</th>
            <th className="px-4 py-3 text-left font-semibold text-fog-400">Status</th>
            <th className="px-4 py-3 text-left font-semibold text-fog-400">Actions</th>
          </tr></thead>
          <tbody>
            {classes.map((c) => (
              <tr key={c._id} className="border-b border-ink-600 last:border-0 hover:bg-ink-850">
                <td className="px-4 py-3 text-fog-200 font-medium">{c.name}</td>
                <td className="px-4 py-3 text-fog-400">{c.trainerName}</td>
                <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${c.status === "approved" ? "bg-teal/20 text-teal" : c.status === "rejected" ? "bg-rose/20 text-rose" : "bg-amber/20 text-amber"}`}>{c.status}</span></td>
                <td className="px-4 py-3 flex gap-2 flex-wrap">
                  {c.status !== "approved" && <button onClick={() => updateStatus(c._id, "approved")} className="text-xs font-medium text-teal hover:underline">Approve</button>}
                  {c.status !== "rejected" && <button onClick={() => updateStatus(c._id, "rejected")} className="text-xs font-medium text-amber hover:underline">Reject</button>}
                  <button onClick={() => deleteClass(c._id)} className="text-xs font-medium text-rose hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
