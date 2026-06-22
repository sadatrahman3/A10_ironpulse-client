import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import Spinner from "../components/Spinner";

export default function Forum() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPosts = async (p = 1) => {
    setLoading(true);
    try {
      const { data } = await api.get("/forum", { params: { page: p, limit: 6 } });
      setPosts(data.posts);
      setTotalPages(data.totalPages);
      setPage(p);
    } catch { setPosts([]); }
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-extrabold text-fog-200">Community Forum</h1>
        <p className="mt-1 text-sm text-fog-400">Insights, tips, and discussions from trainers and admins</p>
      </div>

      {loading ? <Spinner size="lg" /> : posts.length === 0 ? (
        <div className="text-center py-16 text-fog-400">No posts yet.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post._id} to={`/forum/${post._id}`} className="group block overflow-hidden rounded-xl border border-ink-600 bg-ink-900 transition-colors hover:border-ink-500">
                <div className="aspect-[16/10] overflow-hidden bg-ink-800">
                  <img src={post.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => e.target.style.display = "none"} />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-fog-200 line-clamp-2 group-hover:text-volt transition-colors">{post.title}</h3>
                  <p className="mt-2 text-sm text-fog-400 line-clamp-2">{post.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={post.authorImage || "https://i.pravatar.cc/80?img=33"} alt="" className="h-6 w-6 rounded-full object-cover" />
                      <span className="text-xs text-fog-500">{post.authorName}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-fog-500">
                      <span className="flex items-center gap-1">👍 {post.likeCount}</span>
                      <span className="flex items-center gap-1">👎 {post.dislikeCount}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => fetchPosts(p)} className={`min-h-[44px] min-w-[44px] rounded-full text-sm font-medium transition ${p === page ? "bg-volt text-ink-950" : "border border-ink-600 bg-ink-900 text-fog-300 hover:border-ink-500"}`}>{p}</button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
