import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", image: "" });
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return toast.error("Name must be at least 2 characters");
    if (form.password.length < 6) return toast.error("Password must be at least 6 characters");
    if (!/[A-Z]/.test(form.password)) return toast.error("Password must contain an uppercase letter");
    if (!/[a-z]/.test(form.password)) return toast.error("Password must contain a lowercase letter");
    if (form.image && !/^https?:\/\//.test(form.image)) return toast.error("Please enter a valid image URL");

    setSubmitting(true);
    try {
      await register(form.name, form.email, form.password, form.image);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="rounded-2xl border border-ink-600 bg-ink-900 p-8">
          <h1 className="font-display text-2xl font-extrabold text-fog-200 text-center">Create Account</h1>
          <p className="mt-1 text-sm text-fog-400 text-center">Join IronPulse and start training</p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-fog-500 mb-1.5">Name</label>
              <input type="text" required value={form.name} onChange={update("name")} className="w-full rounded-lg border border-ink-600 bg-ink-800 px-4 py-3 text-sm text-fog-200 placeholder:text-fog-500 focus:outline-none focus:border-volt" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-fog-500 mb-1.5">Email</label>
              <input type="email" required value={form.email} onChange={update("email")} className="w-full rounded-lg border border-ink-600 bg-ink-800 px-4 py-3 text-sm text-fog-200 placeholder:text-fog-500 focus:outline-none focus:border-volt" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-fog-500 mb-1.5">Profile Image URL</label>
              <input type="url" value={form.image} onChange={update("image")} className="w-full rounded-lg border border-ink-600 bg-ink-800 px-4 py-3 text-sm text-fog-200 placeholder:text-fog-500 focus:outline-none focus:border-volt" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-fog-500 mb-1.5">Password</label>
              <input type="password" required value={form.password} onChange={update("password")} className="w-full rounded-lg border border-ink-600 bg-ink-800 px-4 py-3 text-sm text-fog-200 placeholder:text-fog-500 focus:outline-none focus:border-volt" placeholder="Min 6 chars, 1 uppercase, 1 lowercase" />
            </div>
            <button type="submit" disabled={submitting} className="w-full rounded-full bg-volt px-5 py-3 text-sm font-bold text-ink-950 hover:brightness-110 transition disabled:opacity-50">
              {submitting ? "Creating account..." : "Register"}
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-fog-400">
            Already have an account? <Link to="/login" className="font-medium text-volt hover:underline">Login</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
