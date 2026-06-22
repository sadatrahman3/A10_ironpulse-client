import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api";
import { toast } from "react-toastify";

export default function ApplyTrainer() {
  const { user, refreshUser } = useAuth();
  const [experience, setExperience] = useState("");
  const [specialty, setSpecialty] = useState("Yoga");
  const [submitting, setSubmitting] = useState(false);
  const [application, setApplication] = useState(null);

  useEffect(() => {
    api.get("/trainer-applications/my").then((r) => { if (r.data) setApplication(r.data); }).catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { data } = await api.post("/trainer-applications", { experience: parseInt(experience), specialty });
      setApplication(data);
      await refreshUser();
      toast.success("Application submitted!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit");
    } finally { setSubmitting(false); }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-fog-200 mb-6">Apply as Trainer</h1>

      {application ? (
        <div className="rounded-xl border border-ink-600 bg-ink-900 p-6">
          <p className="text-sm text-fog-400">Application Status:</p>
          <p className={`mt-1 font-display text-lg font-bold ${application.status === "approved" ? "text-teal" : application.status === "rejected" ? "text-rose" : "text-amber"}`}>{application.status.charAt(0).toUpperCase() + application.status.slice(1)}</p>
          {application.status === "rejected" && application.feedback && (
            <p className="mt-2 text-sm text-fog-500">Admin Feedback: {application.feedback}</p>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-md rounded-xl border border-ink-600 bg-ink-900 p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-fog-500 mb-1.5">Years of Experience</label>
            <input type="number" min="1" max="50" required value={experience} onChange={(e) => setExperience(e.target.value)} className="w-full rounded-lg border border-ink-600 bg-ink-800 px-4 py-3 text-sm text-fog-200 focus:outline-none focus:border-volt" placeholder="e.g. 3" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-fog-500 mb-1.5">Specialty</label>
            <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} className="w-full rounded-lg border border-ink-600 bg-ink-800 px-4 py-3 text-sm text-fog-200 focus:outline-none focus:border-volt">
              <option value="Yoga">Yoga</option>
              <option value="Cardio">Cardio</option>
              <option value="Weights">Weights</option>
              <option value="CrossFit">CrossFit</option>
              <option value="Pilates">Pilates</option>
              <option value="Boxing">Boxing</option>
              <option value="Meditation">Meditation</option>
            </select>
          </div>
          <button type="submit" disabled={submitting} className="w-full rounded-full bg-volt px-5 py-3 text-sm font-bold text-ink-950 hover:brightness-110 transition disabled:opacity-50">
            {submitting ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      )}
    </div>
  );
}
