import { useState, useEffect } from "react";
import api from "../../api";
import Spinner from "../../components/Spinner";

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { api.get("/transactions").then((r) => setTransactions(r.data)).catch(() => {}).finally(() => setLoading(false)); }, []);

  if (loading) return <Spinner size="lg" />;

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-fog-200 mb-6">Transactions</h1>
      {transactions.length === 0 ? <p className="text-fog-400">No transactions yet.</p> : (
        <div className="overflow-x-auto rounded-xl border border-ink-600">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-ink-600 bg-ink-900">
              <th className="px-4 py-3 text-left font-semibold text-fog-400">User Email</th>
              <th className="px-4 py-3 text-left font-semibold text-fog-400">Class</th>
              <th className="px-4 py-3 text-left font-semibold text-fog-400">Amount</th>
              <th className="px-4 py-3 text-left font-semibold text-fog-400">Transaction ID</th>
              <th className="px-4 py-3 text-left font-semibold text-fog-400">Date</th>
            </tr></thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t._id} className="border-b border-ink-600 last:border-0 hover:bg-ink-850">
                  <td className="px-4 py-3 text-fog-200">{t.userEmail}</td>
                  <td className="px-4 py-3 text-fog-400">{t.className}</td>
                  <td className="px-4 py-3 text-fog-200 font-semibold">${t.amount}</td>
                  <td className="px-4 py-3 text-fog-500 font-mono text-xs">{t.transactionId}</td>
                  <td className="px-4 py-3 text-fog-400">{new Date(t.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
