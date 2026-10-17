import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const departments = [
  {
    name: "Artificial Intelligence & Machine Learning",
    description: "Explore generative AI, machine learning, computer vision and applied research.",
    tone: "ember",
  },
  {
    name: "Cybersecurity",
    description: "Learn to build safer systems through security research and responsible practice.",
    tone: "tide",
  },
  {
    name: "Data Science",
    description: "Turn real-world data into meaningful insight, models and useful products.",
    tone: "ember",
  },
  {
    name: "Research & Innovation",
    description: "Take ideas from early questions to experiments, prototypes and projects.",
    tone: "tide",
  },
];

const events = [
  { title: "AURA Orientation", detail: "Meet the society and find your place in the community." },
  { title: "DSA War Room", detail: "Build confidence through focused, competitive problem solving." },
  { title: "Generative AI Workshop", detail: "Explore LLMs, RAG pipelines and practical AI applications." },
];

const aurathonStats = [
  { value: "120+", label: "colleges" },
  { value: "22", label: "states" },
  { value: "278", label: "teams" },
  { value: "20", label: "finalists" },
];

export default function HomePage() {
  return (
    <>
      <section className="relative flex min-h-[92svh] items-center overflow-hidden px-6 pb-16 pt-28">
        <div className="grid-lines pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="animate-blob-a absolute -left-[12%] top-[14%] h-[28rem] w-[28rem] rounded-full bg-ember opacity-25 blur-3xl sm:h-[34rem] sm:w-[34rem]" />
          <div className="animate-blob-b absolute -right-[12%] top-[22%] h-[30rem] w-[30rem] rounded-full bg-tide-grad opacity-30 blur-3xl sm:h-[36rem] sm:w-[36rem]" />
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="eyebrow mb-6 max-w-2xl leading-6">
              Association for Unleashing Research and Advancement · GTBIT
            </p>
            <h1 className="font-display text-5xl font-medium leading-[1.02] tracking-[-0.065em] sm:text-7xl lg:text-8xl">
              <span className="block">Explore.</span>
              <span className="block">Build.</span>
              <span className="text-aura block">Innovate.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl">
              A student-run platform for research, emerging technology and hands-on collaboration — where ideas from the classroom become real-world work.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 rounded-full bg-ember px-6 py-3.5 font-semibold text-background shadow-ember transition-transform hover:-translate-y-0.5"
              >
                Explore AURA
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/aurathon"
                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3.5 font-semibold transition-colors hover:bg-secondary"
              >
                Discover AURATHON <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>

          <div className="relative mx-auto hidden aspect-square w-full max-w-md lg:block">
            <div className="absolute inset-0 rounded-full border border-border" />
            <div className="absolute inset-8 rounded-full border border-dashed border-border" />
            <div className="absolute inset-16 rounded-full border border-border/50" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="relative grid aspect-square w-[58%] place-items-center rounded-full bg-surface/70 p-8 shadow-[0_0_100px_color-mix(in_oklab,var(--tide)_20%,transparent)]">
                <Image
                  src="/aura-logo.png"
                  alt="AURA — Association for Unleashing Research and Advancement"
                  width={320}
                  height={320}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
            <span className="absolute left-[9%] top-[24%] h-2.5 w-2.5 rounded-full bg-ember shadow-[0_0_20px_var(--ember)]" />
            <span className="absolute bottom-[16%] right-[13%] h-2.5 w-2.5 rounded-full bg-tide shadow-[0_0_20px_var(--tide)]" />
          </div>
        </div>
      </section>

      <section className="px-6 py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow">01 — Our objective</p>
            <h2 className="mt-4 max-w-lg text-3xl font-medium leading-tight sm:text-5xl">
              Beyond the classroom.
            </h2>
          </div>
          <div>
            <p className="text-2xl leading-snug text-foreground sm:text-3xl">
              AURA gives students the space to explore, develop and apply technical knowledge through research, collaboration and hands-on learning.
            </p>
            <Link
              href="/about"
              className="group mt-7 inline-flex items-center gap-2 font-semibold text-gold"
            >
              Read our mission
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">02 — Departments</p>
              <h2 className="mt-4 text-3xl font-medium sm:text-5xl">Technical domains</h2>
            </div>
            <Link
              href="/departments"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              All departments <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="divide-y divide-border border-y border-border">
            {departments.map((department, index) => (
              <Link
                key={department.name}
                href="/departments"
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-7 sm:gap-6 sm:py-8"
              >
                <span className="font-mono text-sm text-muted-foreground">
                  0{index + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-medium transition-colors group-hover:text-gold sm:text-2xl lg:text-3xl">
                    {department.name}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                    {department.description}
                  </p>
                </div>
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-background transition-transform group-hover:-rotate-45 sm:h-12 sm:w-12 ${
                    department.tone === "ember" ? "bg-ember" : "bg-tide-grad"
                  }`}
                >
                  <ArrowRight size={19} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 sm:py-28">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-border bg-surface p-7 sm:p-12 lg:p-14">
          <div className="pointer-events-none absolute inset-0 bg-aura opacity-[0.08]" />
          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="eyebrow">Flagship · National-level ideathon</p>
              <h2 className="mt-4 text-5xl font-medium sm:text-7xl">
                AURA<span className="text-aura">THON</span>
              </h2>
              <p className="mt-6 max-w-xl leading-7 text-muted-foreground">
                AURATHON brings students together to shape bold ideas into thoughtful solutions for real-world challenges.
              </p>
              <Link
                href="/aurathon"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-ember px-6 py-3 font-semibold text-background transition-transform hover:-translate-y-0.5"
              >
                Explore AURATHON <ArrowRight size={18} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border">
              {aurathonStats.map((stat) => (
                <div key={stat.label} className="bg-surface p-5 sm:p-6">
                  <p className="font-display text-3xl font-medium sm:text-4xl">{stat.value}</p>
                  <p className="mt-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {stat.label} · 2025
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">03 — Gather, learn, create</p>
              <h2 className="mt-4 text-3xl font-medium sm:text-5xl">Learning in motion.</h2>
            </div>
            <Link
              href="/events"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              All events <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {events.map((event, index) => (
              <Link
                key={event.title}
                href="/events"
                className="group rounded-2xl border border-border bg-white/[0.02] p-6 transition-colors hover:bg-white/[0.05] sm:p-7"
              >
                <span className="font-mono text-xs text-gold">0{index + 1} / EVENT</span>
                <h3 className="mt-8 text-xl font-medium transition-colors group-hover:text-gold sm:text-2xl">
                  {event.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{event.detail}</p>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">
                  Discover <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-8 sm:p-12">
            <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-tide-grad opacity-20 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="eyebrow">Be part of what comes next</p>
                <h2 className="mt-4 max-w-2xl text-3xl font-medium sm:text-5xl">
                  Have a question worth exploring?
                </h2>
                <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
                  Find your people, build something meaningful, and grow with a community that learns by doing.
                </p>
              </div>
              <Link
                href="/join"
                className="group inline-flex w-fit items-center gap-2 rounded-full bg-ember px-6 py-3.5 font-semibold text-background shadow-ember transition-transform hover:-translate-y-0.5"
              >
                Join AURA
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
