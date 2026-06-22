import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../api";
import Spinner from "../components/Spinner";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    const classId = searchParams.get("class_id");
    if (!sessionId || !classId || !user) { setStatus("error"); return; }

    const confirmPayment = async () => {
      try {
        const { data: session } = await api.get(`/payments/session/${sessionId}`);
        if (session.payment_status === "paid") {
          try {
            await api.post("/payments/confirm", { sessionId, classId });
          } catch (e) {
            if (e.response?.status !== 409) throw e;
          }
          try {
            await api.post("/bookings", { classId, transactionId: sessionId, amount: session.amount_total / 100 });
          } catch (e) {
            if (e.response?.status !== 409) throw e;
          }
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    };
    confirmPayment();
  }, [searchParams, user]);

  if (status === "loading") return <div className="flex min-h-[60vh] items-center justify-center"><Spinner size="lg" /></div>;

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      {status === "success" ? (
        <>
          <div className="text-6xl mb-4">✅</div>
          <h1 className="font-display text-2xl font-extrabold text-fog-200">Payment Successful!</h1>
          <p className="mt-2 text-fog-400">Your class has been booked. See you there!</p>
        </>
      ) : (
        <>
          <div className="text-6xl mb-4">❌</div>
          <h1 className="font-display text-2xl font-extrabold text-fog-200">Payment Failed</h1>
          <p className="mt-2 text-fog-400">Something went wrong. Please try again.</p>
        </>
      )}
      <div className="mt-6 flex gap-3">
        <Link to="/dashboard/user/bookings" className="rounded-full bg-volt px-6 py-3 text-sm font-bold text-ink-950 hover:brightness-110 transition">View Bookings</Link>
        <Link to="/classes" className="rounded-full border border-ink-600 bg-ink-900 px-6 py-3 text-sm font-medium text-fog-300 hover:text-fog-200 transition">Browse Classes</Link>
      </div>
    </div>
  );
}
