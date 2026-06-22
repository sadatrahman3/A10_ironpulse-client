import { useState } from "react";
import api from "../../api";
import { uploadToImgBB } from "../../utils/upload";
import { toast } from "react-toastify";

export default function AdminAddPost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleImageSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setUploading(true);
    try {
      const url = await uploadToImgBB(file);
      setImage(url);
      toast.success("Image uploaded!");
    } catch (err) {
      toast.error(err.message);
      setImageFile(null);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return toast.error("Please upload an image first");
    setSubmitting(true);
    try {
      await api.post("/forum", { title, image, description });
      toast.success("Post published!");
      setTitle(""); setImage(""); setImageFile(null); setDescription("");
    } catch (err) { toast.error(err.response?.data?.message || "Failed"); }
    finally { setSubmitting(false); }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-fog-200 mb-6">Add Forum Post (Admin)</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl rounded-xl border border-ink-600 bg-ink-900 p-6 space-y-4">
        <div><label className="block text-xs font-semibold uppercase tracking-wider text-fog-500 mb-1.5">Title</label><input required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg border border-ink-600 bg-ink-800 px-4 py-3 text-sm text-fog-200 focus:outline-none focus:border-volt" /></div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-fog-500 mb-1.5">Image (Upload to ImgBB)</label>
          <input type="file" accept="image/*" onChange={handleImageSelect} className="w-full rounded-lg border border-ink-600 bg-ink-800 px-4 py-3 text-sm text-fog-200 file:mr-3 file:rounded file:border-0 file:bg-ink-700 file:px-3 file:py-1 file:text-sm file:text-fog-200 focus:outline-none focus:border-volt" />
          {uploading && <p className="mt-1 text-xs text-fog-500">Uploading image...</p>}
          {image && !uploading && <p className="mt-1 text-xs text-teal">Image uploaded ✓</p>}
          {!uploading && !image && <p className="mt-1 text-xs text-fog-500">Or paste an image URL below</p>}
          <input type="url" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." className="mt-1 w-full rounded-lg border border-ink-600 bg-ink-800 px-4 py-2.5 text-sm text-fog-200 placeholder:text-fog-500 focus:outline-none focus:border-volt" />
        </div>
        <div><label className="block text-xs font-semibold uppercase tracking-wider text-fog-500 mb-1.5">Description</label><textarea rows={6} required value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded-lg border border-ink-600 bg-ink-800 px-4 py-3 text-sm text-fog-200 focus:outline-none focus:border-volt" /></div>
        <button type="submit" disabled={submitting || uploading} className="w-full rounded-full bg-volt px-5 py-3 text-sm font-bold text-ink-950 hover:brightness-110 transition disabled:opacity-50">{submitting ? "Publishing..." : "Publish Post"}</button>
      </form>
    </div>
  );
}
