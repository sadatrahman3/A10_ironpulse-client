import { useState, useEffect } from "react";
import api from "../../api";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

export default function TrainerMyClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editClass, setEditClass] = useState(null);
  const [students, setStudents] = useState(null);

  useEffect(() => {
    api.get("/classes/trainer/me").then((r) => setClasses(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this class?")) return;
    try {
      await api.delete(`/classes/${id}`);
      setClasses(classes.filter((c) => c._id !== id));
      toast.success("Class deleted");
    } catch (err) { toast.error(err.response?.data?.message || "Failed"); }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put(`/classes/${editClass._id}`, editClass);
      setClasses(classes.map((c) => (c._id === data._id ? data : c)));
      setEditClass(null);
      toast.success("Class updated!");
    } catch (err) { toast.error(err.response?.data?.message || "Failed"); }
  };

  const showStudents = async (classId) => {
    try {
      const { data } = await api.get(`/bookings/class/${classId}/students`);
      setStudents(data);
    } catch { setStudents([]); }
  };

  if (loading) return <Spinner size="lg" />;

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-fog-200 mb-6">My Classes</h1>

      {editClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/80 backdrop-blur-sm p-4">
          <form onSubmit={handleUpdate} className="w-full max-w-lg rounded-2xl border border-ink-500 bg-ink-900 p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="font-display text-lg font-bold text-fog-200">Update Class</h2>
            <input value={editClass.name} onChange={(e) => setEditClass({ ...editClass, name: e.target.value })} className="w-full rounded-lg border border-ink-600 bg-ink-800 px-4 py-3 text-sm text-fog-200 focus:outline-none focus:border-volt" placeholder="Class name" />
            <textarea value={editClass.description} onChange={(e) => setEditClass({ ...editClass, description: e.target.value })} rows={3} className="w-full rounded-lg border border-ink-600 bg-ink-800 px-4 py-3 text-sm text-fog-200 focus:outline-none focus:border-volt" />
            <div className="flex gap-3">
              <button type="submit" className="flex-1 rounded-full bg-volt px-4 py-2.5 text-sm font-bold text-ink-950 hover:brightness-110">Save</button>
              <button type="button" onClick={() => setEditClass(null)} className="flex-1 rounded-full border border-ink-600 bg-ink-800 px-4 py-2.5 text-sm text-fog-300 hover:text-fog-200">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {students !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-ink-500 bg-ink-900 p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="font-display text-lg font-bold text-fog-200 mb-4">Students ({students.length})</h2>
            {students.length === 0 ? <p className="text-fog-400">No students yet.</p> : students.map((s) => (
              <div key={s._id} className="flex items-center gap-3 border-b border-ink-600 py-2 last:border-0">
                <span className="text-sm text-fog-200">{s.userName || "Unknown"}</span>
                <span className="text-xs text-fog-500">{s.userEmail}</span>
              </div>
            ))}
            <button onClick={() => setStudents(null)} className="mt-4 w-full rounded-full border border-ink-600 bg-ink-800 px-4 py-2.5 text-sm text-fog-300 hover:text-fog-200">Close</button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-ink-600">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-ink-600 bg-ink-900">
            <th className="px-4 py-3 text-left font-semibold text-fog-400">Class</th>
            <th className="px-4 py-3 text-left font-semibold text-fog-400">Status</th>
            <th className="px-4 py-3 text-left font-semibold text-fog-400">Bookings</th>
            <th className="px-4 py-3 text-left font-semibold text-fog-400">Actions</th>
          </tr></thead>
          <tbody>
            {classes.map((c) => (
              <tr key={c._id} className="border-b border-ink-600 last:border-0 hover:bg-ink-850">
                <td className="px-4 py-3 text-fog-200 font-medium">{c.name}</td>
                <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${c.status === "approved" ? "bg-teal/20 text-teal" : c.status === "rejected" ? "bg-rose/20 text-rose" : "bg-amber/20 text-amber"}`}>{c.status}</span></td>
                <td className="px-4 py-3 text-fog-400">{c.bookingCount}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => setEditClass(c)} className="text-xs font-medium text-sky hover:underline">Update</button>
                  <button onClick={() => handleDelete(c._id)} className="text-xs font-medium text-rose hover:underline">Delete</button>
                  <button onClick={() => showStudents(c._id)} className="text-xs font-medium text-volt hover:underline">Students</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
