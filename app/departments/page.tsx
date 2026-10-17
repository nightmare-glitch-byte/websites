import Link from "next/link";
import { ArrowRight, BrainCircuit, Database, ShieldCheck, Sparkles } from "lucide-react";

const departments = [
  {
    name: "Artificial Intelligence and Machine Learning",
    description: "Explore LLMs, generative AI, computer vision, data-driven applications and applied research in AI.",
    focus: ["LLMs and model reasoning", "RAG pipelines", "Applied ML systems", "Research-driven experimentation"],
    icon: BrainCircuit,
  },
  {
    name: "Cybersecurity",
    description: "Develop awareness around digital safety, secure systems, ethical hacking, and resilient technical design.",
    focus: ["Network analysis", "Threat modeling", "Security tools", "Secure development practices"],
    icon: ShieldCheck,
  },
  {
    name: "Data Science",
    description: "Study real-world data analysis, insight generation, predictive modeling, and data communication.",
    focus: ["Analytics and dashboards", "Data storytelling", "Predictive models", "Experiment design"],
    icon: Database,
  },
  {
    name: "Research & Innovation",
    description: "Support project ideation, prototype development, interdisciplinary experiments and collaborative problem solving.",
    focus: ["Ideation sprints", "Prototype building", "Interdisciplinary projects", "Knowledge sharing"],
    icon: Sparkles,
  },
];

export default function DepartmentsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <section className="mb-16 text-center">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ffb347]">Departments</div>
        <h1 className="mt-4 text-5xl font-black tracking-[-0.05em] text-white sm:text-6xl">
          Where technology and curiosity intersect.
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-200">
          AURA’s departments provide focused spaces for members to learn, build, and contribute within specialized domains
          while staying connected to the broader society mission.
        </p>
      </section>

      <section className="grid gap-6">
        {departments.map(({ name, description, focus, icon: Icon }) => (
          <div key={name} className="grid gap-6 rounded-[30px] border border-white/10 bg-white/5 p-6 lg:grid-cols-[0.4fr_1fr_0.6fr] lg:items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ffb347] to-[#2ec5c4] text-slate-950">
              <Icon size={28} />
            </div>

            <div>
              <h2 className="text-2xl font-black text-white">{name}</h2>
              <p className="mt-3 text-slate-200">{description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {focus.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-slate-950/30 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.08em] text-slate-200">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-start lg:justify-end">
              <Link href="/join" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white">
                Join department <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
