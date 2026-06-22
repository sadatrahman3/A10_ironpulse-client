import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

export default function TrainerMyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      api.get(`/forum/author/${user.id}`).then((r) => setPosts(r.data)).catch(() => {}).finally(() => setLoading(false));
    } else { setLoading(false); }
  }, []);

  const handleDelete = async (id) => {
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
      <h1 className="font-display text-2xl font-extrabold text-fog-200 mb-6">My Forum Posts</h1>
      {posts.length === 0 ? (
        <p className="text-fog-400">No posts yet. <Link to="/dashboard/trainer/add-post" className="text-volt hover:underline">Create one</Link></p>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post._id} className="flex items-center gap-4 rounded-xl border border-ink-600 bg-ink-900 p-4">
              <img src={post.image} alt="" className="h-16 w-20 rounded-lg object-cover shrink-0" onError={(e) => e.target.style.display = "none"} />
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-sm font-bold text-fog-200 truncate">{post.title}</h3>
                <p className="text-xs text-fog-500 mt-0.5">{post.likeCount} likes · {post.dislikeCount} dislikes</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Link to={`/forum/${post._id}`} className="text-xs font-medium text-sky hover:underline">View</Link>
                <button onClick={() => handleDelete(post._id)} className="text-xs font-medium text-rose hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
