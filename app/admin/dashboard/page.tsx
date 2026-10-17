import { ArrowRight, BarChart3, ShieldCheck, Users } from "lucide-react";

const stats = [
  { label: "Approved members", value: "320" },
  { label: "Pending requests", value: "18" },
  { label: "Active projects", value: "27" },
  { label: "Open tasks", value: "63" },
];

const recent = [
  "Orientation program content approved",
  "AI/ML department review scheduled",
  "AURATHON sponsor list updated",
  "New membership applications received",
];

export default function AdminDashboardPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <section className="mb-10">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ffb347]">Leadership dashboard</div>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl">Society overview.</h1>
      </section>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value }) => (
          <div key={label} className="rounded-[26px] border border-white/10 bg-white/5 p-5">
            <div className="text-sm text-slate-300">{label}</div>
            <div className="mt-5 text-3xl font-black text-white">{value}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[30px] border border-white/10 bg-white/5 p-6">
          <div className="mb-6 flex items-center gap-3 text-[#ffb347]">
            <BarChart3 size={20} />
            <h2 className="text-xl font-black text-white">Operational snapshot</h2>
          </div>

          <div className="space-y-4">
            {[
              { title: "Department membership", value: "AI/ML 96 • Cybersecurity 42 • Data Science 65" },
              { title: "Upcoming events", value: "Generative AI talk • Review meeting • Orientation follow-up" },
              { title: "Tasks awaiting review", value: "12 submissions across departments" },
            ].map((item) => (
              <div key={item.title} className="rounded-[22px] border border-white/10 bg-slate-950/30 p-4">
                <div className="text-xs uppercase tracking-[0.16em] text-slate-400">{item.title}</div>
                <div className="mt-2 text-base font-medium text-slate-100">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[30px] border border-white/10 bg-[#091b2a] p-6">
            <div className="mb-4 flex items-center gap-3 text-[#ffb347]">
              <Users size={20} />
              <h2 className="text-xl font-black text-white">Recent activity</h2>
            </div>
            <ul className="space-y-3 text-slate-200">
              {recent.map((item) => (
                <li key={item} className="rounded-[16px] border border-white/10 bg-white/5 px-3 py-2 text-sm">{item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-white/5 p-6">
            <div className="mb-4 flex items-center gap-3 text-[#ffb347]">
              <ShieldCheck size={20} />
              <h2 className="text-xl font-black text-white">Access control</h2>
            </div>
            <p className="text-slate-200">Permissions remain scoped to each role, department and approved operational area.</p>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <button type="button" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ffb347] to-[#f16b54] px-6 py-3 text-sm font-semibold text-slate-950">
          Publish update <ArrowRight size={16} />
        </button>
      </div>
    </main>
  );
}
