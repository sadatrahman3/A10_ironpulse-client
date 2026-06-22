import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

export default function UserFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/favorites/user").then((r) => setFavorites(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const removeFav = async (classId) => {
    try {
      await api.delete(`/favorites/${classId}`);
      setFavorites(favorites.filter((c) => c._id !== classId));
      toast.success("Removed from favorites");
    } catch (err) { toast.error(err.response?.data?.message || "Failed"); }
  };

  if (loading) return <Spinner size="lg" />;

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-fog-200 mb-6">My Favorites</h1>
      {favorites.length === 0 ? (
        <p className="text-fog-400">No favorites yet. <Link to="/classes" className="text-volt hover:underline">Browse classes</Link></p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((cls) => (
            <div key={cls._id} className="rounded-xl border border-ink-600 bg-ink-900 overflow-hidden">
              <img src={cls.image} alt="" className="w-full aspect-[16/10] object-cover" onError={(e) => e.target.style.display = "none"} />
              <div className="p-4">
                <h3 className="font-display font-bold text-fog-200">{cls.name}</h3>
                <p className="text-sm text-fog-400 mt-1">{cls.category} · ${cls.price}</p>
                <div className="mt-3 flex gap-2">
                  <Link to={`/classes/${cls._id}`} className="flex-1 text-center rounded-full bg-volt px-4 py-2 text-sm font-semibold text-ink-950 hover:brightness-110">View</Link>
                  <button onClick={() => removeFav(cls._id)} className="rounded-full border border-rose/40 bg-rose/10 px-4 py-2 text-sm font-medium text-rose hover:bg-rose/20 transition">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
