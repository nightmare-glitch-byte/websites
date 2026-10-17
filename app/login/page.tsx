import Link from "next/link";
import { ArrowRight, LockKeyhole } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-8 rounded-[36px] border border-white/10 bg-[#091b2a] p-6 shadow-[0_30px_80px_rgba(7,16,24,0.5)] lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
        <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,179,71,0.12),rgba(46,197,196,0.12),rgba(7,18,30,0.9))] p-6 sm:p-8">
          <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ffb347] to-[#2ec5c4] text-slate-950">
            <LockKeyhole size={26} />
          </div>
          <h1 className="text-4xl font-black tracking-[-0.05em] text-white">Member Login</h1>
          <p className="mt-4 text-slate-200">
            Access protected team spaces, task boards, leadership tools, and project collaboration features as an approved member.
          </p>
          <div className="mt-8 space-y-3 text-sm text-slate-300">
            <div>• Secure approval-based onboarding</div>
            <div>• Role-based access to dashboards</div>
            <div>• Department-specific workspaces</div>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 sm:p-8">
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Email or username</label>
              <input className="w-full rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-white placeholder:text-slate-400" placeholder="member@aura.edu" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Password</label>
              <input type="password" className="w-full rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-white placeholder:text-slate-400" placeholder="••••••••" />
            </div>
            <div className="flex items-center justify-between text-sm text-slate-300">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4" /> Remember me
              </label>
              <Link href="/login" className="text-[#8feaf0]">Need help?</Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link href="/member/dashboard" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ffb347] to-[#f16b54] px-6 py-3 text-sm font-semibold text-slate-950">
                Member dashboard <ArrowRight size={16} />
              </Link>
              <Link href="/admin/dashboard" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white">
                Admin view
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
