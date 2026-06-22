import { useState, useEffect, useCallback } from "react";
import api from "../api";
import ClassCard from "../components/ClassCard";
import Spinner from "../components/Spinner";
import { ClassCardSkeleton } from "../components/Skeletons";
import SEO from "../components/SEO";

export default function AllClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchClasses = useCallback(async (p = 1, q = "", cat = "") => {
    setLoading(true);
    try {
      const params = { page: p, limit: 9 };
      if (q) params.search = q;
      if (cat) params.category = cat;
      const { data } = await api.get("/classes", { params });
      setClasses(data.classes);
      setTotalPages(data.totalPages);
      setTotal(data.totalItems);
      setPage(p);
    } catch { setClasses([]); }
    setLoading(false);
  }, []);

  useEffect(() => { fetchClasses(); }, [fetchClasses]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchClasses(1, search, category);
  };

  const handleCategory = (cat) => {
    const next = category === cat ? "" : cat;
    setCategory(next);
    fetchClasses(1, search, next);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <SEO title="All Classes" description="Browse all available fitness classes at IronPulse." />
      <div className="mb-8">
        <h1 className="font-display text-3xl font-extrabold text-fog-200">All Classes</h1>
        <p className="mt-1 text-sm text-fog-400">Browse and book fitness sessions</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <form onSubmit={handleSearch} className="flex gap-2 flex-1">
          <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by class name..." className="flex-1 rounded-lg border border-ink-600 bg-ink-900 px-4 py-2.5 text-sm text-fog-200 placeholder:text-fog-500 focus:outline-none focus:border-volt" />
          <button type="submit" className="rounded-lg bg-volt px-4 py-2.5 text-sm font-semibold text-ink-950 hover:brightness-110">Search</button>
        </form>
        <div className="flex gap-2 flex-wrap">
          {["Yoga", "Cardio", "Weights"].map((cat) => (
            <button key={cat} onClick={() => handleCategory(cat)} className={`rounded-full border px-4 py-2 text-sm font-medium transition ${category === cat ? "border-volt bg-volt text-ink-950" : "border-ink-600 bg-ink-900 text-fog-300 hover:border-ink-500"}`}>{cat}</button>
          ))}
        </div>
      </div>

      <p className="text-sm text-fog-500 mb-4">{total} classes found</p>

      {loading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <ClassCardSkeleton key={i} />)}
        </div>
      ) : classes.length === 0 ? (
        <div className="text-center py-16 text-fog-400">No classes found matching your search.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {classes.map((cls) => <ClassCard key={cls._id} cls={cls} />)}
          </div>
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => fetchClasses(p, search, category)} className={`min-h-[44px] min-w-[44px] rounded-full text-sm font-medium transition ${p === page ? "bg-volt text-ink-950" : "border border-ink-600 bg-ink-900 text-fog-300 hover:border-ink-500"}`}>{p}</button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
