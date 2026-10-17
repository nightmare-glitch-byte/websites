"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCmsContent } from "@/components/use-cms-content";

export default function EventsPage() {
  const { content } = useCmsContent();

  return (
    <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <section className="mb-16 text-center">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ffb347]">Events & history</div>
        <h1 className="mt-4 text-5xl font-black tracking-[-0.05em] text-white sm:text-6xl">
          Verified milestones and member experiences.
        </h1>
      </section>

      <section className="space-y-6">
        {content.events.map((event) => (
          <div key={event.id} className="rounded-[30px] border border-white/10 bg-white/5 p-6 lg:p-8">
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
        {content.events.length === 0 ? <p className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-slate-300">New events will appear here.</p> : null}
      </section>

      <div className="mt-16 flex justify-center">
        <Link href="/aurathon" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ffb347] to-[#f16b54] px-6 py-3 text-sm font-semibold text-slate-950">
          Explore AURATHON <ArrowRight size={16} />
        </Link>
      </div>
    </main>
  );
}
