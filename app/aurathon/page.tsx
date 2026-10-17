"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, Trophy, Users } from "lucide-react";
import { useCmsContent } from "@/components/use-cms-content";

function lines(value: string) {
  return value.split("\n").map((line) => line.trim()).filter(Boolean);
}

function pair(value: string) {
  const separator = value.indexOf("|");
  return separator < 0
    ? [value.trim(), ""]
    : [value.slice(0, separator).trim(), value.slice(separator + 1).trim()];
}

export default function AurathonPage() {
  const { content } = useCmsContent();
  const editions = [...content.aurathonEditions].sort((left, right) => Number(right.year) - Number(left.year));
  const currentEdition = editions[0];

  return (
    <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <section className="grid items-center gap-10 pb-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ffb347]">AURATHON</div>
          {currentEdition ? (
            <>
              <h1 className="mt-4 text-5xl font-black tracking-[-0.05em] text-white sm:text-6xl">
                {currentEdition.subtitle || currentEdition.title}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200">{currentEdition.description}</p>
            </>
          ) : (
            <>
              <h1 className="mt-4 text-5xl font-black tracking-[-0.05em] text-white sm:text-6xl">Build what the future needs.</h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200">A new AURATHON edition will be announced soon.</p>
            </>
          )}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/join" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ffb347] to-[#f16b54] px-6 py-3 text-sm font-semibold text-slate-950">
              Register interest <ArrowRight size={16} />
            </Link>
            <Link href="/gallery" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white">
              View media archive
            </Link>
          </div>
        </div>

        {currentEdition ? (
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,#0d2134,#112234,#0a1d2d)] p-6 shadow-[0_25px_80px_rgba(11,25,40,0.6)]">
            {currentEdition.image ? <Image unoptimized fill sizes="(max-width: 1024px) 100vw, 45vw" src={currentEdition.image} alt={`${currentEdition.title} artwork`} className="object-cover opacity-25" /> : null}
            <div className="relative rounded-[24px] border border-white/10 bg-slate-950/50 p-5 backdrop-blur-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb347]">{currentEdition.year} edition · current</div>
              <div className="mt-4 text-4xl font-black text-white">{currentEdition.title}</div>
              <div className="mt-6 space-y-4 text-sm text-slate-200">
                {lines(currentEdition.stats).map((stat, index) => {
                  const [value, label] = pair(stat);
                  const icons = [CalendarDays, Users, CheckCircle2, Trophy];
                  const Icon = icons[index % icons.length];
                  return <div key={`${value}-${label}`} className="flex items-center gap-3"><Icon size={18} className="text-[#ffb347]" /> {value}{label ? ` ${label}` : ""}</div>;
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-[32px] border border-dashed border-white/10 p-10 text-center text-slate-300">
            Create an edition in the admin preview to feature it here.
          </div>
        )}
      </section>

      {currentEdition ? (
        <>
          <section className="mb-20 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[30px] border border-white/10 bg-white/5 p-8">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ffb347]">Theme & tracks</div>
              <h2 className="mt-3 text-3xl font-black text-white">Ideas with real technical depth.</h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {lines(currentEdition.tracks).map((track) => (
                  <span key={track} className="rounded-full border border-white/10 bg-slate-950/30 px-3 py-2 text-sm text-slate-200">{track}</span>
                ))}
              </div>
            </div>
            <div className="rounded-[30px] border border-white/10 bg-white/5 p-8">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ffb347]">Sponsors</div>
              <div className="mt-6 flex flex-wrap gap-3">
                {lines(currentEdition.sponsors).map((sponsor) => (
                  <span key={sponsor} className="rounded-full border border-[#ffb347]/25 bg-[#ffb347]/10 px-4 py-2 text-sm font-medium text-[#ffdca8]">{sponsor}</span>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-20 rounded-[32px] border border-white/10 bg-[#091b2a] p-8 sm:p-10">
            <div className="mb-8">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ffb347]">Winners · {currentEdition.year}</div>
              <h2 className="mt-3 text-3xl font-black text-white sm:text-5xl">Historic champions</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {lines(currentEdition.winners).map((winner) => {
                const [placement, team] = pair(winner);
                return (
                  <div key={`${placement}-${team}`} className="rounded-[24px] border border-white/10 bg-white/5 p-6 text-center">
                    <div className="text-xs uppercase tracking-[0.2em] text-[#ffb347]">{placement}</div>
                    <div className="mt-4 text-2xl font-black text-white">{team}</div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mb-20">
            <div className="mb-8">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ffb347]">FAQs</div>
              <h2 className="mt-3 text-3xl font-black text-white sm:text-5xl">What to know before joining.</h2>
            </div>
            <div className="space-y-4">
              {lines(currentEdition.faqs).map((faq) => {
                const [question, answer] = pair(faq);
                return (
                  <div key={question} className="rounded-[24px] border border-white/10 bg-white/5 p-6">
                    <h3 className="text-xl font-bold text-white">{question}</h3>
                    <p className="mt-2 text-slate-200">{answer}</p>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      ) : null}

      {editions.length > 1 ? (
        <section className="mb-16">
          <div className="mb-8">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ffb347]">Past editions</div>
            <h2 className="mt-3 text-3xl font-black text-white sm:text-5xl">The AURATHON archive.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {editions.slice(1).map((edition) => (
              <article key={edition.id} className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-6">
                {edition.image ? <Image unoptimized fill sizes="(max-width: 768px) 100vw, 50vw" src={edition.image} alt="" className="object-cover opacity-10" /> : null}
                <div className="relative">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ffb347]">{edition.year} edition · archive</div>
                  <h3 className="mt-3 text-2xl font-black text-white">{edition.title}</h3>
                  <p className="mt-3 leading-7 text-slate-200">{edition.history || edition.description}</p>
                  {lines(edition.winners).length ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {lines(edition.winners).map((winner) => {
                        const [place, team] = pair(winner);
                        return <span key={`${place}-${team}`} className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-1.5 text-xs text-slate-200">{place}: {team}</span>;
                      })}
                    </div>
                  ) : null}
                  <details className="mt-5 rounded-2xl border border-white/10 bg-slate-950/35 p-4">
                    <summary className="cursor-pointer text-sm font-semibold text-[#ffdca8]">Explore {edition.year} edition details</summary>
                    <div className="mt-4 grid gap-5 sm:grid-cols-2">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Statistics</h4>
                        <ul className="mt-2 space-y-1 text-sm text-slate-200">{lines(edition.stats).map((stat) => <li key={stat}>{pair(stat).join(" ")}</li>)}</ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Tracks</h4>
                        <ul className="mt-2 space-y-1 text-sm text-slate-200">{lines(edition.tracks).map((track) => <li key={track}>{track}</li>)}</ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Sponsors</h4>
                        <ul className="mt-2 space-y-1 text-sm text-slate-200">{lines(edition.sponsors).map((sponsor) => <li key={sponsor}>{sponsor}</li>)}</ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">FAQs</h4>
                        <ul className="mt-2 space-y-2 text-sm text-slate-200">{lines(edition.faqs).map((faq) => {
                          const [question, answer] = pair(faq);
                          return <li key={question}><strong>{question}</strong><br />{answer}</li>;
                        })}</ul>
                      </div>
                    </div>
                  </details>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
