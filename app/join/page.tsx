import { ArrowRight, CheckCircle2 } from "lucide-react";

const benefits = [
  "Access to workshops, projects and technical sessions",
  "Mentorship from peers and senior leads",
  "Department and collaboration opportunities",
  "Participation in events, research and community initiatives",
];

export default function JoinPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <section className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ffb347]">Join AURA</div>
          <h1 className="mt-4 text-5xl font-black tracking-[-0.05em] text-white sm:text-6xl">
            Become part of the research and innovation culture.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200">
            AURA is open to students who want to learn, build, collaborate, and contribute to a culture of curiosity and technical impact.
          </p>

          <div className="mt-8 space-y-4">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3 rounded-[20px] border border-white/10 bg-white/5 p-4">
                <CheckCircle2 className="mt-0.5 text-[#ffb347]" size={20} />
                <span className="text-slate-200">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[30px] border border-white/10 bg-[#091b2a] p-6 shadow-[0_25px_80px_rgba(7,17,28,0.55)]">
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Full name</label>
              <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-400" placeholder="Your name" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Email</label>
              <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-400" placeholder="name@example.com" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Department interest</label>
              <select className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none">
                <option className="bg-slate-900">AI/ML</option>
                <option className="bg-slate-900">Cybersecurity</option>
                <option className="bg-slate-900">Data Science</option>
                <option className="bg-slate-900">Research & Innovation</option>
              </select>
            </div>
            <button type="button" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ffb347] to-[#f16b54] px-6 py-3 text-sm font-semibold text-slate-950">
              Submit application <ArrowRight size={16} />
            </button>
            <p className="text-center text-xs text-slate-400">Applications are reviewed by authorized leads and administrators.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
