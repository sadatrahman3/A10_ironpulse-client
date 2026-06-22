import { useState, useEffect } from "react";
import api from "../../api";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

export default function AdminManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { api.get("/users").then((r) => setUsers(r.data)).catch(() => {}).finally(() => setLoading(false)); }, []);

  const toggleBlock = async (id, currentStatus) => {
    const newStatus = currentStatus === "blocked" ? "active" : "blocked";
    try {
      await api.patch(`/users/${id}/status`, { status: newStatus });
      setUsers(users.map((u) => (u.id === id ? { ...u, status: newStatus } : u)));
      toast.success(`User ${newStatus === "blocked" ? "blocked" : "unblocked"}`);
    } catch (err) { toast.error(err.response?.data?.message || "Failed"); }
  };

  const makeAdmin = async (id) => {
    if (!confirm("Make this user an admin?")) return;
    try {
      await api.patch(`/users/${id}/role`, { role: "admin" });
      setUsers(users.map((u) => (u.id === id ? { ...u, role: "admin" } : u)));
      toast.success("User promoted to admin");
    } catch (err) { toast.error(err.response?.data?.message || "Failed"); }
  };

  if (loading) return <Spinner size="lg" />;

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-fog-200 mb-6">Manage Users</h1>
      <div className="overflow-x-auto rounded-xl border border-ink-600">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-ink-600 bg-ink-900">
            <th className="px-4 py-3 text-left font-semibold text-fog-400">Name</th>
            <th className="px-4 py-3 text-left font-semibold text-fog-400">Email</th>
            <th className="px-4 py-3 text-left font-semibold text-fog-400">Role</th>
            <th className="px-4 py-3 text-left font-semibold text-fog-400">Status</th>
            <th className="px-4 py-3 text-left font-semibold text-fog-400">Actions</th>
          </tr></thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-ink-600 last:border-0 hover:bg-ink-850">
                <td className="px-4 py-3 text-fog-200 font-medium">{u.name}</td>
                <td className="px-4 py-3 text-fog-400">{u.email}</td>
                <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${u.role === "admin" ? "bg-rose/20 text-rose" : u.role === "trainer" ? "bg-volt/20 text-volt" : "bg-teal/20 text-teal"}`}>{u.role}</span></td>
                <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${u.status === "blocked" ? "bg-rose/20 text-rose" : "bg-teal/20 text-teal"}`}>{u.status}</span></td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => toggleBlock(u.id, u.status)} className={`text-xs font-medium ${u.status === "blocked" ? "text-teal hover:underline" : "text-rose hover:underline"}`}>{u.status === "blocked" ? "Unblock" : "Block"}</button>
                  {u.role === "user" && <button onClick={() => makeAdmin(u.id)} className="text-xs font-medium text-amber hover:underline">Make Admin</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
