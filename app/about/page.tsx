import Link from "next/link";
import { ArrowRight, BookOpen, Lightbulb, Rocket, Users, Workflow } from "lucide-react";

const pillars = [
  { title: "Research and curiosity", description: "We help students question assumptions, investigate ideas, and explore emerging technologies with depth.", icon: Lightbulb },
  { title: "Learning by doing", description: "From workshops to hackathons, members gain real-world skill through project-based participation.", icon: Workflow },
  { title: "Leadership and collaboration", description: "AURA cultivates teamwork, communication, ownership, and confidence through shared responsibility.", icon: Users },
  { title: "Innovation and growth", description: "We connect academic learning with industry-relevant thinking, practical execution, and professional growth.", icon: Rocket },
];

const timeline = [
  { year: "2025", title: "AURA orientation", detail: "Freshers are introduced to AURA’s mission, research culture, and collaborative opportunities." },
  { year: "2025", title: "DSA War Room", detail: "Students sharpen problem-solving and coding efficiency in a competitive learning environment." },
  { year: "2025", title: "AURATHON 2025", detail: "A national ideathon bringing students from 120+ colleges and 22 states across India." },
  { year: "2026", title: "AI speaker session", detail: "Generative AI trends and industry shifts were discussed through a focused technical talk." },
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <section className="mb-16 grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ffb347]">About AURA</div>
          <h1 className="mt-4 text-5xl font-black tracking-[-0.05em] text-white sm:text-6xl">
            Building the next generation of builders.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
            AURA — Association for Unleashing Research and Advancement — is committed to empowering students with a
            platform to explore, develop, and apply technical knowledge beyond the classroom.
          </p>
        </div>

        <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,179,71,0.12),rgba(46,197,196,0.12),rgba(7,18,30,0.9))] p-7">
          <div className="flex items-center gap-3 text-[#ffb347]">
            <BookOpen size={24} />
            <span className="text-sm font-semibold uppercase tracking-[0.2em]">Objective</span>
          </div>
          <p className="mt-5 text-base leading-8 text-slate-100">
            The objective of AURA is to provide students with a platform to explore, develop, and apply their technical
            knowledge beyond the classroom. The society promotes innovation, research, problem-solving, and collaboration
            through workshops, competitions, projects, and knowledge-sharing sessions.
          </p>
        </div>
      </section>

      <section className="mb-20">
        <div className="mb-8 text-center">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ffb347]">Our pillars</div>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
            A culture of curiosity, creativity and technical excellence.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map(({ title, description, icon: Icon }) => (
            <div key={title} className="rounded-[28px] border border-white/10 bg-white/5 p-6">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ffb347] to-[#2ec5c4] text-slate-950">
                <Icon size={22} />
              </div>
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-20 rounded-[32px] border border-white/10 bg-[#091b2a] p-8 sm:p-10">
        <div className="mb-8">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ffb347]">Vision & values</div>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
            Growing beyond classrooms.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-bold text-white">Vision</h3>
            <p className="mt-4 text-slate-200">
              To create a student-first ecosystem where research, innovation, and collaborative learning become a habit,
              not a one-off opportunity.
            </p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-bold text-white">Values</h3>
            <p className="mt-4 text-slate-200">
              Curiosity, creativity, leadership, accountability, inclusivity, and the courage to turn ideas into action.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-8">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ffb347]">Timeline</div>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
            Key moments in AURA’s journey.
          </h2>
        </div>

        <div className="space-y-4">
          {timeline.map((item) => (
            <div key={item.title} className="grid gap-4 rounded-[26px] border border-white/10 bg-white/5 p-5 md:grid-cols-[120px_1fr] md:items-start">
              <div className="text-2xl font-black text-[#ffb347]">{item.year}</div>
              <div>
                <div className="text-xl font-bold text-white">{item.title}</div>
                <p className="mt-2 text-slate-300">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-16 flex justify-center">
        <Link href="/join" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ffb347] to-[#f16b54] px-6 py-3 text-sm font-semibold text-slate-950">
          Become a member <ArrowRight size={16} />
        </Link>
      </div>
    </main>
  );
}
