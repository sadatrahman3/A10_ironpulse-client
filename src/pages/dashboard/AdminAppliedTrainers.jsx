import { useState, useEffect } from "react";
import api from "../../api";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

export default function AdminAppliedTrainers() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => { api.get("/trainer-applications/pending").then((r) => setApplications(r.data)).catch(() => {}).finally(() => setLoading(false)); }, []);

  const handleApprove = async (id) => {
    try {
      await api.patch(`/trainer-applications/${id}/approve`, { feedback });
      setApplications(applications.filter((a) => a._id !== id));
      setSelected(null); setFeedback("");
      toast.success("Application approved!");
    } catch (err) { toast.error(err.response?.data?.message || "Failed"); }
  };

  const handleReject = async (id) => {
    if (!feedback.trim()) return toast.error("Feedback is required for rejection");
    try {
      await api.patch(`/trainer-applications/${id}/reject`, { feedback });
      setApplications(applications.filter((a) => a._id !== id));
      setSelected(null); setFeedback("");
      toast.success("Application rejected");
    } catch (err) { toast.error(err.response?.data?.message || "Failed"); }
  };

  if (loading) return <Spinner size="lg" />;

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-fog-200 mb-6">Applied Trainers</h1>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-ink-500 bg-ink-900 p-6">
            <h2 className="font-display text-lg font-bold text-fog-200 mb-4">{selected.userName}</h2>
            <div className="space-y-2 text-sm text-fog-400 mb-4">
              <p>Email: {selected.userEmail}</p>
              <p>Experience: {selected.experience} years</p>
              <p>Specialty: {selected.specialty}</p>
              <p>Applied: {new Date(selected.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-fog-500 mb-1.5">Feedback</label>
              <textarea rows={3} value={feedback} onChange={(e) => setFeedback(e.target.value)} className="w-full rounded-lg border border-ink-600 bg-ink-800 px-4 py-3 text-sm text-fog-200 focus:outline-none focus:border-volt" placeholder="Admin feedback..." />
            </div>
            <div className="flex gap-3">
              <button onClick={() => handleApprove(selected._id)} className="flex-1 rounded-full bg-teal px-4 py-2.5 text-sm font-bold text-ink-950 hover:brightness-110">Approve</button>
              <button onClick={() => handleReject(selected._id)} className="flex-1 rounded-full bg-rose px-4 py-2.5 text-sm font-bold text-white hover:brightness-110">Reject</button>
            </div>
            <button onClick={() => { setSelected(null); setFeedback(""); }} className="mt-3 w-full rounded-full border border-ink-600 bg-ink-800 px-4 py-2.5 text-sm text-fog-300 hover:text-fog-200">Cancel</button>
          </div>
        </div>
      )}

      {applications.length === 0 ? <p className="text-fog-400">No pending applications.</p> : (
        <div className="overflow-x-auto rounded-xl border border-ink-600">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-ink-600 bg-ink-900">
              <th className="px-4 py-3 text-left font-semibold text-fog-400">Name</th>
              <th className="px-4 py-3 text-left font-semibold text-fog-400">Email</th>
              <th className="px-4 py-3 text-left font-semibold text-fog-400">Experience</th>
              <th className="px-4 py-3 text-left font-semibold text-fog-400">Specialty</th>
              <th className="px-4 py-3 text-left font-semibold text-fog-400">Action</th>
            </tr></thead>
            <tbody>
              {applications.map((a) => (
                <tr key={a._id} className="border-b border-ink-600 last:border-0 hover:bg-ink-850">
                  <td className="px-4 py-3 text-fog-200">{a.userName}</td>
                  <td className="px-4 py-3 text-fog-400">{a.userEmail}</td>
                  <td className="px-4 py-3 text-fog-400">{a.experience} yrs</td>
                  <td className="px-4 py-3 text-fog-400">{a.specialty}</td>
                  <td className="px-4 py-3"><button onClick={() => setSelected(a)} className="text-xs font-medium text-volt hover:underline">Details</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
