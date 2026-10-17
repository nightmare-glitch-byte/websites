import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, Trophy, Users } from "lucide-react";

const tracks = [
  "AI & ML Solutions",
  "Cybersecurity & Privacy",
  "Data Products & Analytics",
  "Societal Impact & Social Innovation",
  "Web & App Prototypes",
];

const winners = [
  { placement: "1st", team: "Team Meta" },
  { placement: "2nd", team: "Team Zod" },
  { placement: "3rd", team: "Team Code Sutra" },
];

const sponsors = ["Unstop", ".XYZ", "Legal Terminus", "Interview Buddy", "BrightPath"];

const faqs = [
  { question: "Who can participate?", answer: "AURATHON is open to students from recognized institutions, with teams encouraged to field creative and technically grounded ideas." },
  { question: "What are the tracks?", answer: "The event covers multiple technology and impact domains, including AI/ML, cybersecurity, data-driven products, and socially relevant solutions." },
  { question: "How does the finalist journey work?", answer: "Registrations are followed by review, shortlist selection, and a final round in which shortlisted teams pitch and present their ideas." },
];

export default function AurathonPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <section className="grid items-center gap-10 pb-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ffb347]">AURATHON</div>
          <h1 className="mt-4 text-5xl font-black tracking-[-0.05em] text-white sm:text-6xl">
            Build what the future needs.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200">
            AURATHON is AURA’s flagship ideathon, bringing together bright minds, engineers, and future innovators to solve meaningful problems through technology and bold ideas.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/join" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ffb347] to-[#f16b54] px-6 py-3 text-sm font-semibold text-slate-950">
              Register interest <ArrowRight size={16} />
            </Link>
            <Link href="/gallery" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white">
              View media archive
            </Link>
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,#0d2134,#112234,#0a1d2d)] p-6 shadow-[0_25px_80px_rgba(11,25,40,0.6)]">
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb347]">2025 edition</div>
            <div className="mt-4 text-4xl font-black text-white">AURATHON 2025</div>
            <div className="mt-6 space-y-4 text-sm text-slate-200">
              <div className="flex items-center gap-3"><CalendarDays size={18} className="text-[#ffb347]" /> National-level ideathon</div>
              <div className="flex items-center gap-3"><Users size={18} className="text-[#ffb347]" /> 120+ colleges • 22 states</div>
              <div className="flex items-center gap-3"><CheckCircle2 size={18} className="text-[#ffb347]" /> 278 teams • ~779 participants</div>
              <div className="flex items-center gap-3"><Trophy size={18} className="text-[#ffb347]" /> 20 shortlisted finalists</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-20 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[30px] border border-white/10 bg-white/5 p-8">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ffb347]">Theme & tracks</div>
          <h2 className="mt-3 text-3xl font-black text-white">Ideas with real technical depth.</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {tracks.map((track) => (
              <span key={track} className="rounded-full border border-white/10 bg-slate-950/30 px-3 py-2 text-sm text-slate-200">
                {track}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-[30px] border border-white/10 bg-white/5 p-8">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ffb347]">Sponsors</div>
          <div className="mt-6 flex flex-wrap gap-3">
            {sponsors.map((sponsor) => (
              <span key={sponsor} className="rounded-full border border-[#ffb347]/25 bg-[#ffb347]/10 px-4 py-2 text-sm font-medium text-[#ffdca8]">
                {sponsor}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-20 rounded-[32px] border border-white/10 bg-[#091b2a] p-8 sm:p-10">
        <div className="mb-8">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ffb347]">Winners</div>
          <h2 className="mt-3 text-3xl font-black text-white sm:text-5xl">Historic champions</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {winners.map((winner) => (
            <div key={winner.team} className="rounded-[24px] border border-white/10 bg-white/5 p-6 text-center">
              <div className="text-xs uppercase tracking-[0.2em] text-[#ffb347]">{winner.placement}</div>
              <div className="mt-4 text-2xl font-black text-white">{winner.team}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-20">
        <div className="mb-8">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ffb347]">FAQs</div>
          <h2 className="mt-3 text-3xl font-black text-white sm:text-5xl">What to know before joining.</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((item) => (
            <div key={item.question} className="rounded-[24px] border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-bold text-white">{item.question}</h3>
              <p className="mt-2 text-slate-200">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
