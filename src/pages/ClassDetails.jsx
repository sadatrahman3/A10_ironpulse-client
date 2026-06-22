import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../api";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const DIFF_STYLE = {
  Beginner: { dot: "bg-teal", text: "text-teal", ring: "border-teal/40 bg-teal/10" },
  Intermediate: { dot: "bg-amber", text: "text-amber", ring: "border-amber/40 bg-amber/10" },
  Advanced: { dot: "bg-rose", text: "text-rose", ring: "border-rose/40 bg-rose/10" },
};

export default function ClassDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cls, setCls] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasBooked, setHasBooked] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    api.get(`/classes/${id}`).then((r) => setCls(r.data)).catch(() => toast.error("Class not found")).finally(() => setLoading(false));
    if (user) {
      api.get(`/bookings/check/${id}`).then((r) => setHasBooked(r.data.hasBooked)).catch(() => {});
      api.get(`/favorites/check/${id}`).then((r) => setIsFav(r.data.isFavorite)).catch(() => {});
    }
  }, [id, user]);

  const handleBook = async () => {
    if (!user) return navigate(`/login?redirect=${encodeURIComponent(`/classes/${id}`)}`);
    if (user.role !== "user") return toast.error("Only regular users can book classes");
    if (hasBooked) return toast.error("You have already booked this class");
    try {
      setBooking(true);
      const { data } = await api.post("/payments/create-checkout-session", {
        classId: cls._id, className: cls.name, trainerName: cls.trainerName, price: cls.price, image: cls.image,
      });
      window.location.href = data.url;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to initiate payment");
      setBooking(false);
    }
  };

  const toggleFav = async () => {
    if (!user) return navigate(`/login?redirect=${encodeURIComponent(`/classes/${id}`)}`);
    try {
      if (isFav) {
        await api.delete(`/favorites/${id}`);
        setIsFav(false);
        toast.success("Removed from favorites");
      } else {
        await api.post("/favorites", { classId: id });
        setIsFav(true);
        toast.success("Added to favorites!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed");
    }
  };

  if (loading) return <div className="py-20"><Spinner size="lg" /></div>;
  if (!cls) return <div className="py-20 text-center text-fog-400">Class not found.</div>;

  const d = DIFF_STYLE[cls.difficulty] || DIFF_STYLE.Beginner;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="overflow-hidden rounded-2xl border border-ink-600 bg-ink-900">
        <div className="relative aspect-[21/9] overflow-hidden bg-ink-800">
          <img src={cls.image} alt="" className="h-full w-full object-cover" onError={(e) => e.target.style.display = "none"} />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 to-transparent" />
        </div>
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="rounded-full border border-ink-500/60 bg-ink-800 px-3 py-1 text-xs font-semibold text-fog-200">{cls.category}</span>
            <span className={`inline-flex items-center gap-1.5 rounded-full border ${d.ring} px-3 py-1 text-xs font-semibold ${d.text}`}><span className={`h-1.5 w-1.5 rounded-full ${d.dot}`} />{cls.difficulty}</span>
          </div>
          <h1 className="font-display text-3xl font-extrabold text-fog-200">{cls.name}</h1>
          <p className="mt-2 text-fog-400">{cls.description}</p>

          <dl className="mt-6 grid grid-cols-2 gap-4 rounded-lg border border-ink-600 bg-ink-850 p-4 text-sm">
            <div><dt className="text-fog-500">Schedule</dt><dd className="mt-1 font-medium text-fog-200">{cls.schedule}</dd></div>
            <div><dt className="text-fog-500">Duration</dt><dd className="mt-1 font-medium text-fog-200">{cls.duration}</dd></div>
            <div><dt className="text-fog-500">Price</dt><dd className="mt-1 font-display font-extrabold text-volt text-lg">${cls.price}</dd></div>
            <div><dt className="text-fog-500">Bookings</dt><dd className="mt-1 font-medium text-fog-200">{cls.bookingCount}</dd></div>
          </dl>

          <div className="mt-6 flex items-center gap-3">
            <img src={cls.trainerImage || "https://i.pravatar.cc/80?img=33"} alt="" className="h-10 w-10 rounded-full object-cover" />
            <div>
              <p className="text-sm font-semibold text-fog-200">{cls.trainerName}</p>
              <p className="text-xs text-fog-500">Trainer</p>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <button onClick={handleBook} disabled={hasBooked || booking} className="flex-1 rounded-full bg-volt px-6 py-3.5 text-sm font-bold text-ink-950 hover:brightness-110 transition disabled:opacity-50">
              {hasBooked ? "Already Booked" : booking ? "Processing..." : `Pay & Book · $${cls.price}`}
            </button>
            <button onClick={toggleFav} className={`flex min-h-[48px] min-w-[48px] items-center justify-center rounded-full border px-4 py-3 transition ${isFav ? "border-rose/40 bg-rose/10 text-rose" : "border-ink-600 bg-ink-800 text-fog-300 hover:text-fog-200"}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill={isFav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M12 21s-7.5-4.6-10-9.3C.6 8.4 2 5 5.2 5c2 0 3.3 1.2 4 2.3C9.9 6.2 11.2 5 13.2 5 16.4 5 17.8 8.4 16.4 11.7 13.9 16.4 12 21 12 21Z"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
