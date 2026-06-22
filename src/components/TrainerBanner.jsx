import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function TrainerBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-ink-600 bg-gradient-to-br from-ink-900 via-ink-900 to-volt/5 p-8 sm:p-10">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-1">
            <h2 className="font-display text-xl sm:text-2xl font-extrabold text-fog-200">Become a Trainer</h2>
            <p className="mt-2 text-sm text-fog-400 max-w-md">Share your expertise with the IronPulse community. Create classes, build your following, and inspire others to reach their fitness goals.</p>
            <Link to="/dashboard/user/apply" className="mt-4 inline-flex rounded-full bg-volt px-5 py-2.5 text-sm font-semibold text-ink-950 hover:brightness-110 transition">Apply Now</Link>
          </div>
          <div className="shrink-0 text-6xl">🏋️</div>
        </div>
      </motion.div>
    </section>
  );
}
