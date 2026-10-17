"use client";

import Image from "next/image";
import { Award, Users } from "lucide-react";
import { useCmsContent } from "@/components/use-cms-content";

export default function TeamPage() {
  const { content } = useCmsContent();

  return (
    <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <section className="mb-16 text-center">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ffb347]">Team</div>
        <h1 className="mt-4 text-5xl font-black tracking-[-0.05em] text-white sm:text-6xl">
          People shaping the AURA experience.
        </h1>
      </section>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {content.team.map((member) => (
          <div key={member.id} className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <div className="relative mb-5 flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#ffb347] to-[#2ec5c4] text-slate-950">
              {member.image ? (
                <Image unoptimized fill sizes="80px" src={member.image} alt={member.name} className="object-cover" />
              ) : (
                <Users size={24} />
              )}
            </div>
            <div className="text-xs uppercase tracking-[0.18em] text-[#ffb347]">{member.role}</div>
            <h2 className="mt-3 text-2xl font-black text-white">{member.name}</h2>
            <p className="mt-3 text-slate-200">{member.detail}</p>
          </div>
        ))}
        {content.team.length === 0 ? <p className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-slate-300">Team profiles will appear here.</p> : null}
      </div>

      <section className="mt-20 rounded-[32px] border border-white/10 bg-[#091b2a] p-8 sm:p-10">
        <div className="flex items-center gap-3 text-[#ffb347]">
          <Award size={24} />
          <span className="text-sm font-semibold uppercase tracking-[0.2em]">Leadership</span>
        </div>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">
          {content.about.teamIntro}
        </p>
      </section>
    </main>
  );
}
