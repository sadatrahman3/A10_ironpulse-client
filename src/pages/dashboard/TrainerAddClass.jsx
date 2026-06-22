import { useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";

export default function TrainerAddClass() {
  const [form, setForm] = useState({ name: "", image: "", category: "Yoga", difficulty: "Beginner", duration: "", schedule: "", price: "", description: "" });
  const [submitting, setSubmitting] = useState(false);

  const update = (f) => (e) => setForm({ ...form, [f]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/classes", { ...form, price: parseFloat(form.price) });
      toast.success("Class submitted for approval!");
      setForm({ name: "", image: "", category: "Yoga", difficulty: "Beginner", duration: "", schedule: "", price: "", description: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add class");
    } finally { setSubmitting(false); }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-fog-200 mb-6">Add Class</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl rounded-xl border border-ink-600 bg-ink-900 p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="block text-xs font-semibold uppercase tracking-wider text-fog-500 mb-1.5">Class Name</label><input required value={form.name} onChange={update("name")} className="w-full rounded-lg border border-ink-600 bg-ink-800 px-4 py-3 text-sm text-fog-200 focus:outline-none focus:border-volt" /></div>
          <div><label className="block text-xs font-semibold uppercase tracking-wider text-fog-500 mb-1.5">Image URL</label><input required value={form.image} onChange={update("image")} className="w-full rounded-lg border border-ink-600 bg-ink-800 px-4 py-3 text-sm text-fog-200 focus:outline-none focus:border-volt" /></div>
          <div><label className="block text-xs font-semibold uppercase tracking-wider text-fog-500 mb-1.5">Category</label>
            <select value={form.category} onChange={update("category")} className="w-full rounded-lg border border-ink-600 bg-ink-800 px-4 py-3 text-sm text-fog-200 focus:outline-none focus:border-volt">
              <option>Yoga</option><option>Cardio</option><option>Weights</option>
            </select>
          </div>
          <div><label className="block text-xs font-semibold uppercase tracking-wider text-fog-500 mb-1.5">Difficulty</label>
            <select value={form.difficulty} onChange={update("difficulty")} className="w-full rounded-lg border border-ink-600 bg-ink-800 px-4 py-3 text-sm text-fog-200 focus:outline-none focus:border-volt">
              <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
            </select>
          </div>
          <div><label className="block text-xs font-semibold uppercase tracking-wider text-fog-500 mb-1.5">Duration</label><input required value={form.duration} onChange={update("duration")} placeholder="e.g. 60 min" className="w-full rounded-lg border border-ink-600 bg-ink-800 px-4 py-3 text-sm text-fog-200 focus:outline-none focus:border-volt" /></div>
          <div><label className="block text-xs font-semibold uppercase tracking-wider text-fog-500 mb-1.5">Schedule</label><input required value={form.schedule} onChange={update("schedule")} placeholder="e.g. Mon, Wed - 7:00 AM" className="w-full rounded-lg border border-ink-600 bg-ink-800 px-4 py-3 text-sm text-fog-200 focus:outline-none focus:border-volt" /></div>
          <div><label className="block text-xs font-semibold uppercase tracking-wider text-fog-500 mb-1.5">Price ($)</label><input type="number" min="1" required value={form.price} onChange={update("price")} className="w-full rounded-lg border border-ink-600 bg-ink-800 px-4 py-3 text-sm text-fog-200 focus:outline-none focus:border-volt" /></div>
        </div>
        <div><label className="block text-xs font-semibold uppercase tracking-wider text-fog-500 mb-1.5">Description</label><textarea rows={4} required value={form.description} onChange={update("description")} className="w-full rounded-lg border border-ink-600 bg-ink-800 px-4 py-3 text-sm text-fog-200 focus:outline-none focus:border-volt" /></div>
        <button type="submit" disabled={submitting} className="w-full rounded-full bg-volt px-5 py-3 text-sm font-bold text-ink-950 hover:brightness-110 transition disabled:opacity-50">{submitting ? "Adding..." : "Add Class"}</button>
      </form>
    </div>
  );
}
