import { useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";

export default function TrainerAddPost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/forum", { title, image, description });
      toast.success("Post published!");
      setTitle(""); setImage(""); setDescription("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to post");
    } finally { setSubmitting(false); }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-fog-200 mb-6">Add Forum Post</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl rounded-xl border border-ink-600 bg-ink-900 p-6 space-y-4">
        <div><label className="block text-xs font-semibold uppercase tracking-wider text-fog-500 mb-1.5">Title</label><input required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg border border-ink-600 bg-ink-800 px-4 py-3 text-sm text-fog-200 focus:outline-none focus:border-volt" /></div>
        <div><label className="block text-xs font-semibold uppercase tracking-wider text-fog-500 mb-1.5">Image URL</label><input required value={image} onChange={(e) => setImage(e.target.value)} className="w-full rounded-lg border border-ink-600 bg-ink-800 px-4 py-3 text-sm text-fog-200 focus:outline-none focus:border-volt" /></div>
        <div><label className="block text-xs font-semibold uppercase tracking-wider text-fog-500 mb-1.5">Description</label><textarea rows={6} required value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded-lg border border-ink-600 bg-ink-800 px-4 py-3 text-sm text-fog-200 focus:outline-none focus:border-volt" /></div>
        <button type="submit" disabled={submitting} className="w-full rounded-full bg-volt px-5 py-3 text-sm font-bold text-ink-950 hover:brightness-110 transition disabled:opacity-50">{submitting ? "Publishing..." : "Publish Post"}</button>
      </form>
    </div>
  );
}
