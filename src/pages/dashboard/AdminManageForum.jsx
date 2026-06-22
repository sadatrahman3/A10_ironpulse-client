import { useState, useEffect } from "react";
import api from "../../api";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

export default function AdminManageForum() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { api.get("/forum/admin/all").then((r) => setPosts(r.data)).catch(() => {}).finally(() => setLoading(false)); }, []);

  const deletePost = async (id) => {
    if (!confirm("Delete this post?")) return;
    try {
      await api.delete(`/forum/${id}`);
      setPosts(posts.filter((p) => p._id !== id));
      toast.success("Post deleted");
    } catch (err) { toast.error(err.response?.data?.message || "Failed"); }
  };

  if (loading) return <Spinner size="lg" />;

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-fog-200 mb-6">Manage Forum</h1>
      {posts.length === 0 ? <p className="text-fog-400">No posts.</p> : (
        <div className="overflow-x-auto rounded-xl border border-ink-600">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-ink-600 bg-ink-900">
              <th className="px-4 py-3 text-left font-semibold text-fog-400">Title</th>
              <th className="px-4 py-3 text-left font-semibold text-fog-400">Author</th>
              <th className="px-4 py-3 text-left font-semibold text-fog-400">Likes</th>
              <th className="px-4 py-3 text-left font-semibold text-fog-400">Action</th>
            </tr></thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p._id} className="border-b border-ink-600 last:border-0 hover:bg-ink-850">
                  <td className="px-4 py-3 text-fog-200 font-medium">{p.title}</td>
                  <td className="px-4 py-3 text-fog-400">{p.authorName}</td>
                  <td className="px-4 py-3 text-fog-400">{p.likeCount}</td>
                  <td className="px-4 py-3"><button onClick={() => deletePost(p._id)} className="text-xs font-medium text-rose hover:underline">Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
