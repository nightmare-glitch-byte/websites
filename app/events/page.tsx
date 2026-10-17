import Link from "next/link";
import { ArrowRight } from "lucide-react";

const events = [
  {
    title: "AURA Orientation Program",
    date: "28 August 2025",
    location: "Edusat Lab, second floor, opposite Room 26",
    summary: "Introduced freshers to AURA’s mission, research domains, collaboration opportunities, and the culture of technical learning.",
  },
  {
    title: "DSA War Room",
    date: "12 September 2025",
    location: "GTBIT",
    summary: "A competitive coding challenge focused on Data Structures and Algorithms, analytical thinking, coding efficiency, and problem-solving under pressure.",
  },
  {
    title: "AURATHON 2025 — An Innovative Ideathon",
    date: "National-level event",
    location: "Department of Computer Science and Engineering, GTBIT",
    summary: "AURATHON 2025 saw 120+ colleges across 22 states, with 278 teams and approximately 779 participants registering and 20 teams shortlisted for the final round.",
  },
  {
    title: "Internal GitHub Session",
    date: "Session-based workshop",
    location: "AURA internal circle",
    summary: "Members focused on repository workflows, commits, branching strategies, version control, and collaborative development practices.",
  },
  {
    title: "Internal DSA Guidance Session",
    date: "Session-based guidance",
    location: "AURA internal circle",
    summary: "A structured practice-oriented session on consistency, logical thinking, coding efficiency, and structured problem solving.",
  },
  {
    title: "30-Day Generative AI Workshop",
    date: "Workshop series",
    location: "AURA technology hub",
    summary: "Members explored LLMs, RAG pipelines, chatbot development, and practical applications of generative AI.",
  },
  {
    title: "Brainstorming and Guidance Session",
    date: "Ongoing academic support",
    location: "AURA internal mentoring",
    summary: "Personal, academic, and professional development conversations focused on growth, planning, and motivation.",
  },
  {
    title: "Generative AI Speaker Session",
    date: "2 March 2026",
    location: "GTBIT",
    summary: "An expert session featuring Dr. Sarabjot Singh on the changing market and corporate trends driven by AI and the power of Generative AI.",
  },
];

export default function EventsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <section className="mb-16 text-center">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ffb347]">Events & history</div>
        <h1 className="mt-4 text-5xl font-black tracking-[-0.05em] text-white sm:text-6xl">
          Verified milestones and member experiences.
        </h1>
      </section>

      <section className="space-y-6">
        {events.map((event) => (
          <div key={event.title} className="rounded-[30px] border border-white/10 bg-white/5 p-6 lg:p-8">
            <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
              <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,179,71,0.12),rgba(46,197,196,0.12),rgba(7,18,30,0.9))] p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ffb347]">Event</div>
                <div className="mt-4 text-2xl font-black text-white">{event.date}</div>
                <div className="mt-2 text-sm uppercase tracking-[0.12em] text-slate-300">{event.location}</div>
              </div>

              <div>
                <h2 className="text-2xl font-black text-white">{event.title}</h2>
                <p className="mt-3 text-base leading-7 text-slate-200">{event.summary}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      <div className="mt-16 flex justify-center">
        <Link href="/aurathon" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ffb347] to-[#f16b54] px-6 py-3 text-sm font-semibold text-slate-950">
          Explore AURATHON <ArrowRight size={16} />
        </Link>
      </div>
    </main>
  );
}
