import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import Spinner from "../../components/Spinner";

export default function UserBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/bookings/user").then((r) => setBookings(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner size="lg" />;

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-fog-200 mb-6">My Bookings</h1>
      {bookings.length === 0 ? (
        <p className="text-fog-400">You have no bookings yet. <Link to="/classes" className="text-volt hover:underline">Browse classes</Link></p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-ink-600">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-ink-600 bg-ink-900">
              <th className="px-4 py-3 text-left font-semibold text-fog-400">Class</th>
              <th className="px-4 py-3 text-left font-semibold text-fog-400">Trainer</th>
              <th className="px-4 py-3 text-left font-semibold text-fog-400">Schedule</th>
              <th className="px-4 py-3 text-left font-semibold text-fog-400">Amount</th>
              <th className="px-4 py-3 text-left font-semibold text-fog-400">Action</th>
            </tr></thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="border-b border-ink-600 last:border-0 hover:bg-ink-850">
                  <td className="px-4 py-3 text-fog-200 font-medium">{b.className}</td>
                  <td className="px-4 py-3 text-fog-400">{b.trainerName}</td>
                  <td className="px-4 py-3 text-fog-400">{b.schedule}</td>
                  <td className="px-4 py-3 text-fog-200 font-semibold">${b.amount}</td>
                  <td className="px-4 py-3"><Link to={`/classes/${b.classId}`} className="text-volt text-sm hover:underline">View Details</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
