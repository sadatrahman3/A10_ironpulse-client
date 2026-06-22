import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api";
import Spinner from "../components/Spinner";
import SEO from "../components/SEO";
import { toast } from "react-toastify";

export default function Payment() {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [cls, setCls] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    api.get(`/classes/${classId}`)
      .then((r) => setCls(r.data))
      .catch(() => { toast.error("Class not found"); navigate("/classes"); })
      .finally(() => setLoading(false));
  }, [classId, navigate]);

  const handlePay = async () => {
    if (!cls) return;
    setProcessing(true);
    try {
      const { data } = await api.post("/payments/create-checkout-session", {
        classId: cls._id,
        className: cls.name,
        trainerName: cls.trainerName,
        price: cls.price,
        image: cls.image,
      });
      window.location.href = data.url;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to initiate payment");
      setProcessing(false);
    }
  };

  if (loading) return <div className="py-20"><Spinner size="lg" /></div>;
  if (!cls) return null;

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8">
      <SEO title="Checkout" description={`Complete your booking for ${cls.name}`} />
      <Link to={`/classes/${classId}`} className="inline-flex items-center gap-1 text-sm text-fog-500 hover:text-fog-300 mb-6">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5m7-7-7 7 7 7"/></svg>
        Back to Class
      </Link>

      <div className="rounded-2xl border border-ink-600 bg-ink-900 overflow-hidden">
        <div className="aspect-[21/9] overflow-hidden bg-ink-800">
          <img src={cls.image} alt="" className="h-full w-full object-cover" onError={(e) => e.target.style.display = "none"} />
        </div>
        <div className="p-6 sm:p-8">
          <h1 className="font-display text-2xl font-extrabold text-fog-200">Complete Your Booking</h1>
          <p className="mt-1 text-sm text-fog-400">Review your booking details below</p>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between border-b border-ink-600 pb-3">
              <span className="text-fog-400">Class</span>
              <span className="font-semibold text-fog-200">{cls.name}</span>
            </div>
            <div className="flex items-center justify-between border-b border-ink-600 pb-3">
              <span className="text-fog-400">Trainer</span>
              <div className="flex items-center gap-2">
                <img src={cls.trainerImage || "https://i.pravatar.cc/80?img=33"} alt="" className="h-6 w-6 rounded-full object-cover" />
                <span className="font-semibold text-fog-200">{cls.trainerName}</span>
              </div>
            </div>
            <div className="flex items-center justify-between border-b border-ink-600 pb-3">
              <span className="text-fog-400">Category</span>
              <span className="text-fog-200">{cls.category}</span>
            </div>
            <div className="flex items-center justify-between border-b border-ink-600 pb-3">
              <span className="text-fog-400">Schedule</span>
              <span className="text-fog-200">{cls.schedule}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-fog-400">Total Amount</span>
              <span className="font-display text-2xl font-extrabold text-volt">${cls.price}</span>
            </div>
          </div>

          <button
            onClick={handlePay}
            disabled={processing}
            className="mt-8 w-full rounded-full bg-volt px-6 py-3.5 text-sm font-bold text-ink-950 hover:brightness-110 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {processing ? (
              <>Processing...</>
            ) : (
              <>Pay ${cls.price} with Stripe</>
            )}
          </button>

          <p className="mt-3 text-center text-xs text-fog-500">Secure payment powered by Stripe</p>
        </div>
      </div>
    </div>
  );
}
