"use client";

import Link from "next/link";
import { ArrowRight, BrainCircuit, Database, ShieldCheck, Sparkles } from "lucide-react";
import { useCmsContent } from "@/components/use-cms-content";

export default function DepartmentsPage() {
  const { content } = useCmsContent();
  const icons = [BrainCircuit, ShieldCheck, Database, Sparkles];

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
        {content.departments.map(({ id, name, description, focus }, index) => {
          const Icon = icons[index % icons.length];
          return (
          <div key={id} className="grid gap-6 rounded-[30px] border border-white/10 bg-white/5 p-6 lg:grid-cols-[0.4fr_1fr_0.6fr] lg:items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ffb347] to-[#2ec5c4] text-slate-950">
              <Icon size={28} />
            </div>

            <div>
              <h2 className="text-2xl font-black text-white">{name}</h2>
              <p className="mt-3 text-slate-200">{description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {focus.split("\n").filter(Boolean).map((item) => (
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
          );
        })}
        {content.departments.length === 0 ? <p className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-slate-300">Departments will appear here.</p> : null}
      </section>
    </main>
  );
}
