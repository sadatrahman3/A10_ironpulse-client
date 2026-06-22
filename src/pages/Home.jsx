import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api";
import ClassCard from "../components/ClassCard";
import TrainerBanner from "../components/TrainerBanner";
import Spinner from "../components/Spinner";
import SEO from "../components/SEO";
import { toast } from "react-toastify";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/classes/featured").then((r) => setFeatured(r.data)).catch(() => {}),
      api.get("/forum/latest").then((r) => setPosts(r.data)).catch(() => {}),
    ]).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-20"><Spinner size="lg" /></div>;

  return (
    <div>
      <SEO title="Home" description="Discover expert-led fitness classes, book your spot, and join the IronPulse community." />
      <section className="relative overflow-hidden border-b border-ink-600">
        <div className="absolute inset-0 bg-gradient-to-br from-volt/5 via-transparent to-teal/5" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-fog-500 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-volt animate-pulse" />
              Live Schedule Available
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-fog-200 leading-[1.1]">
              Train with<br /><span className="text-volt">Intent.</span>
            </h1>
            <p className="mt-4 text-lg text-fog-400 max-w-lg">Discover expert-led fitness classes, book your spot, and join a community that pushes you to be your best.</p>
            <Link to="/classes" className="mt-8 inline-flex items-center gap-2 rounded-full bg-volt px-6 py-3.5 text-sm font-bold text-ink-950 hover:brightness-110 transition">
              Explore Classes
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-ink-600 bg-ink-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { label: "Classes", value: "8+" },
            { label: "Expert Trainers", value: "3+" },
            { label: "Happy Members", value: "200+" },
            { label: "Bookings", value: "300+" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} className="text-center">
              <div className="font-display text-3xl font-extrabold text-volt">{s.value}</div>
              <div className="mt-1 text-sm text-fog-500">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl font-extrabold text-fog-200">Featured Classes</h2>
            <p className="mt-1 text-sm text-fog-400">Most booked sessions this week</p>
          </div>
          <Link to="/classes" className="text-sm font-medium text-volt hover:underline">View all</Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.slice(0, 6).map((cls, i) => (
            <motion.div key={cls._id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}>
              <ClassCard cls={cls} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl font-extrabold text-fog-200">Latest from the Community</h2>
            <p className="mt-1 text-sm text-fog-400">Insights and tips from our trainers and admins</p>
          </div>
          <Link to="/forum" className="text-sm font-medium text-volt hover:underline">View all</Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post, i) => (
            <motion.div key={post._id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}>
              <Link to={`/forum/${post._id}`} className="group block overflow-hidden rounded-xl border border-ink-600 bg-ink-900 transition-colors hover:border-ink-500">
                <div className="aspect-[16/10] overflow-hidden bg-ink-800">
                  <img src={post.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => e.target.style.display = "none"} />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-sm font-bold text-fog-200 line-clamp-2 group-hover:text-volt transition-colors">{post.title}</h3>
                  <p className="mt-1 text-xs text-fog-500 line-clamp-2">{post.description}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <img src={post.authorImage || "https://i.pravatar.cc/80?img=33"} alt="" className="h-5 w-5 rounded-full object-cover" />
                    <span className="text-xs text-fog-500">{post.authorName}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-display text-2xl font-extrabold text-fog-200 text-center mb-8">Why IronPulse?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { title: "Expert Trainers", desc: "Learn from certified professionals with years of experience in their disciplines.", icon: "💪" },
            { title: "Flexible Scheduling", desc: "Book classes that fit your schedule. Morning, evening, or weekend — we have you covered.", icon: "📅" },
            { title: "Community Driven", desc: "Join a supportive community. Share tips, ask questions, and grow together.", icon: "🤝" },
          ].map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} className="rounded-xl border border-ink-600 bg-ink-900 p-6 text-center">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-display text-lg font-bold text-fog-200">{item.title}</h3>
              <p className="mt-2 text-sm text-fog-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-2xl border border-ink-600 bg-gradient-to-br from-volt/10 via-ink-900 to-ink-900 p-8 sm:p-12 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-fog-200">Ready to Start Training?</h2>
          <p className="mt-3 text-fog-400 max-w-lg mx-auto">Browse our classes, pick your favorite, and book your first session today.</p>
          <Link to="/register" className="mt-6 inline-flex rounded-full bg-volt px-8 py-3.5 text-sm font-bold text-ink-950 hover:brightness-110 transition">Get Started Free</Link>
        </div>
      </section>
    </div>
  );
}
