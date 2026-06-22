import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../api";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

export default function ForumPostDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [userVote, setUserVote] = useState(null);
  const [replyTo, setReplyTo] = useState(null);

  useEffect(() => {
    api.get(`/forum/${id}`).then((r) => setPost(r.data)).catch(() => toast.error("Post not found")).finally(() => setLoading(false));
    api.get(`/comments/${id}`).then((r) => setComments(r.data)).catch(() => {});
    if (user) api.get(`/forum/${id}/vote`).then((r) => setUserVote(r.data.vote)).catch(() => {});
  }, [id, user]);

  const handleVote = async (type) => {
    if (!user) return toast.error("Please login to vote");
    try {
      const { data } = await api.post(`/forum/${id}/vote`, { type });
      setPost(data.post);
      setUserVote(userVote === type ? null : type);
    } catch (err) { toast.error(err.response?.data?.message || "Vote failed"); }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      const { data } = await api.post(`/comments/${id}`, { content: commentText, parentCommentId: replyTo });
      setComments([...comments, data]);
      setCommentText("");
      setReplyTo(null);
      toast.success("Comment posted!");
    } catch (err) { toast.error(err.response?.data?.message || "Failed to post comment"); }
  };

  const handleDeleteComment = async (commentId) => {
    if (!confirm("Delete this comment?")) return;
    try {
      await api.delete(`/comments/${commentId}`);
      setComments(comments.filter((c) => c._id !== commentId));
      toast.success("Comment deleted");
    } catch (err) { toast.error(err.response?.data?.message || "Failed to delete"); }
  };

  const handleEditComment = async (commentId, newContent) => {
    try {
      const { data } = await api.put(`/comments/${commentId}`, { content: newContent });
      setComments(comments.map((c) => (c._id === commentId ? data : c)));
    } catch (err) { toast.error(err.response?.data?.message || "Failed to edit"); }
  };

  if (loading) return <div className="py-20"><Spinner size="lg" /></div>;
  if (!post) return <div className="py-20 text-center text-fog-400">Post not found.</div>;

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      <article className="rounded-2xl border border-ink-600 bg-ink-900 overflow-hidden">
        <img src={post.image} alt="" className="w-full aspect-[21/9] object-cover" onError={(e) => e.target.style.display = "none"} />
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <img src={post.authorImage || "https://i.pravatar.cc/80?img=33"} alt="" className="h-10 w-10 rounded-full object-cover" />
            <div>
              <p className="text-sm font-semibold text-fog-200">{post.authorName}</p>
              <p className="text-xs text-fog-500 capitalize">{post.authorRole}</p>
            </div>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-fog-200">{post.title}</h1>
          <div className="mt-4 text-fog-300 whitespace-pre-line leading-relaxed">{post.description}</div>

          <div className="mt-6 flex items-center gap-4 border-t border-ink-600 pt-4">
            <button onClick={() => handleVote("like")} className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${userVote === "like" ? "border-teal bg-teal/10 text-teal" : "border-ink-600 bg-ink-800 text-fog-400 hover:text-fog-200"}`}>
              👍 {post.likeCount}
            </button>
            <button onClick={() => handleVote("dislike")} className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${userVote === "dislike" ? "border-rose bg-rose/10 text-rose" : "border-ink-600 bg-ink-800 text-fog-400 hover:text-fog-200"}`}>
              👎 {post.dislikeCount}
            </button>
          </div>
        </div>
      </article>

      {/* Comments */}
      <section className="mt-8">
        <h2 className="font-display text-lg font-bold text-fog-200 mb-4">Comments ({comments.length})</h2>

        {user ? (
          <form onSubmit={handleComment} className="mb-6">
            {replyTo && (
              <div className="mb-2 flex items-center gap-2 text-xs text-fog-500">
                Replying to a comment <button type="button" onClick={() => setReplyTo(null)} className="text-volt hover:underline">Cancel</button>
              </div>
            )}
            <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} rows={3} required className="w-full rounded-lg border border-ink-600 bg-ink-800 px-4 py-3 text-sm text-fog-200 placeholder:text-fog-500 focus:outline-none focus:border-volt" placeholder="Write a comment..." />
            <button type="submit" className="mt-2 rounded-full bg-volt px-5 py-2.5 text-sm font-semibold text-ink-950 hover:brightness-110 transition">Post Comment</button>
          </form>
        ) : (
          <p className="mb-6 text-sm text-fog-500"><Link to={`/login?redirect=${encodeURIComponent(`/forum/${id}`)}`} className="text-volt hover:underline">Login</Link> to post a comment.</p>
        )}

        <div className="space-y-4">
          {comments.filter((c) => !c.parentCommentId).map((comment) => (
            <CommentCard key={comment._id} comment={comment} user={user} comments={comments} onDelete={handleDeleteComment} onEdit={handleEditComment} onReply={setReplyTo} />
          ))}
        </div>
      </section>
    </div>
  );
}

function CommentCard({ comment, user, comments, onDelete, onEdit, onReply }) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(comment.content);
  const replies = comments.filter((c) => c.parentCommentId === comment._id);

  return (
    <div className="rounded-lg border border-ink-600 bg-ink-900 p-4">
      <div className="flex items-center gap-2 mb-2">
        <img src={comment.userImage || "https://i.pravatar.cc/80?img=33"} alt="" className="h-6 w-6 rounded-full object-cover" />
        <span className="text-sm font-medium text-fog-200">{comment.userName}</span>
        <span className="text-xs text-fog-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
      </div>
      {editing ? (
        <div>
          <textarea value={editText} onChange={(e) => setEditText(e.target.value)} rows={2} className="w-full rounded border border-ink-600 bg-ink-800 px-3 py-2 text-sm text-fog-200 focus:outline-none focus:border-volt" />
          <div className="mt-2 flex gap-2">
            <button onClick={() => { onEdit(comment._id, editText); setEditing(false); }} className="text-xs font-medium text-volt hover:underline">Save</button>
            <button onClick={() => { setEditing(false); setEditText(comment.content); }} className="text-xs text-fog-500 hover:text-fog-300">Cancel</button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-fog-300">{comment.content}</p>
      )}
      {user && !editing && (
        <div className="mt-2 flex gap-3 text-xs">
          <button onClick={() => onReply(comment._id)} className="text-fog-500 hover:text-fog-300">Reply</button>
          {user.id === comment.userId && <button onClick={() => setEditing(true)} className="text-fog-500 hover:text-fog-300">Edit</button>}
          {(user.id === comment.userId || user.role === "admin") && <button onClick={() => onDelete(comment._id)} className="text-rose/70 hover:text-rose">Delete</button>}
        </div>
      )}
      {replies.length > 0 && (
        <div className="mt-3 ml-4 space-y-3 border-l-2 border-ink-600 pl-3">
          {replies.map((reply) => (
            <CommentCard key={reply._id} comment={reply} user={user} comments={comments} onDelete={onDelete} onEdit={onEdit} onReply={onReply} />
          ))}
        </div>
      )}
    </div>
  );
}
