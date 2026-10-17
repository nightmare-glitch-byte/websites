import { Award, Users } from "lucide-react";

const team = [
  { name: "President", role: "Society leadership", detail: "Driving vision, strategy, and growth across the society." },
  { name: "Vice President", role: "Operations", detail: "Coordinating initiatives, partner engagement, and strategic execution." },
  { name: "General Secretary", role: "Community management", detail: "Ensuring smooth internal coordination, communication, and operations." },
  { name: "AI/ML Lead", role: "Department leadership", detail: "Guiding research, projects, and technical learning within AI and ML." },
  { name: "Cybersecurity Lead", role: "Department leadership", detail: "Mentoring security-focused learning and research initiatives." },
  { name: "Data Science Lead", role: "Department leadership", detail: "Supporting analytical and applied data science thinking across events and projects." },
];

export default function TeamPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <section className="mb-16 text-center">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ffb347]">Team</div>
        <h1 className="mt-4 text-5xl font-black tracking-[-0.05em] text-white sm:text-6xl">
          People shaping the AURA experience.
        </h1>
      </section>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {team.map((member) => (
          <div key={member.name} className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ffb347] to-[#2ec5c4] text-slate-950">
              <Users size={24} />
            </div>
            <div className="text-xs uppercase tracking-[0.18em] text-[#ffb347]">{member.role}</div>
            <h2 className="mt-3 text-2xl font-black text-white">{member.name}</h2>
            <p className="mt-3 text-slate-200">{member.detail}</p>
          </div>
        ))}
      </div>

      <section className="mt-20 rounded-[32px] border border-white/10 bg-[#091b2a] p-8 sm:p-10">
        <div className="flex items-center gap-3 text-[#ffb347]">
          <Award size={24} />
          <span className="text-sm font-semibold uppercase tracking-[0.2em]">Leadership</span>
        </div>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">
          The team combines research-minded leadership, project coordination, mentoring, and event execution to ensure the society remains active, inclusive, and ambitious.
        </p>
      </section>
    </main>
  );
}
