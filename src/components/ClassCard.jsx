import { Link } from "react-router-dom";

const DIFF_STYLE = {
  Beginner: { dot: "bg-teal", text: "text-teal", ring: "border-teal/40 bg-teal/10" },
  Intermediate: { dot: "bg-amber", text: "text-amber", ring: "border-amber/40 bg-amber/10" },
  Advanced: { dot: "bg-rose", text: "text-rose", ring: "border-rose/40 bg-rose/10" },
};

export default function ClassCard({ cls }) {
  const d = DIFF_STYLE[cls.difficulty] || DIFF_STYLE.Beginner;
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-ink-600 bg-ink-900 transition-colors hover:border-ink-500">
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-800">
        <img src={cls.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => e.target.style.display = "none"} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-full border border-ink-500/60 bg-ink-950/70 px-2.5 py-1 text-xs font-semibold text-fog-200 backdrop-blur-sm">{cls.category}</span>
        <span className={`absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border ${d.ring} px-2.5 py-1 text-xs font-semibold ${d.text} backdrop-blur-sm`}>
          <span className={`h-1.5 w-1.5 rounded-full ${d.dot}`} />{cls.difficulty}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-fog-200">{cls.name}</h3>
        <p className="mt-1 text-sm text-fog-400">{cls.schedule} &middot; {cls.duration}</p>
        <p className="mt-2 line-clamp-2 text-sm text-fog-400">{cls.description}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-3 border-t border-ink-600">
          <div className="flex items-center gap-2">
            <img src={cls.trainerImage || "https://i.pravatar.cc/80?img=33"} alt="" className="h-6 w-6 rounded-full object-cover" />
            <span className="text-xs text-fog-400">{cls.trainerName}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-display text-lg font-extrabold text-fog-200">${cls.price}</span>
            <Link to={`/classes/${cls._id}`} className="rounded-full bg-volt px-4 py-2 text-sm font-semibold text-ink-950 hover:brightness-110 transition">View Details</Link>
          </div>
        </div>
      </div>
    </article>
  );
}
