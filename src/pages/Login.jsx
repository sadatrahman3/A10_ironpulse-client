import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(email, password);
      toast.success("Logged in successfully!");
      navigate(redirect, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="rounded-2xl border border-ink-600 bg-ink-900 p-8">
          <h1 className="font-display text-2xl font-extrabold text-fog-200 text-center">Welcome Back</h1>
          <p className="mt-1 text-sm text-fog-400 text-center">Sign in to your IronPulse account</p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-fog-500 mb-1.5">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-ink-600 bg-ink-800 px-4 py-3 text-sm text-fog-200 placeholder:text-fog-500 focus:outline-none focus:border-volt" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-fog-500 mb-1.5">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg border border-ink-600 bg-ink-800 px-4 py-3 text-sm text-fog-200 placeholder:text-fog-500 focus:outline-none focus:border-volt pr-12" placeholder="Min 6 characters" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-fog-500 hover:text-fog-300 text-xs">{showPassword ? "Hide" : "Show"}</button>
              </div>
            </div>
            <button type="submit" disabled={submitting} className="w-full rounded-full bg-volt px-5 py-3 text-sm font-bold text-ink-950 hover:brightness-110 transition disabled:opacity-50">
              {submitting ? "Signing in..." : "Login"}
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-fog-400">
            Don't have an account? <Link to="/register" className="font-medium text-volt hover:underline">Register</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
