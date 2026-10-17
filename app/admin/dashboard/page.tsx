import Link from "next/link";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import { AdminContentManager } from "@/components/admin-content-manager";
import { AdminMemberApprovals } from "@/components/admin-member-approvals";
import { LogoutButton } from "@/components/logout-button";
import { getCurrentUser } from "@/lib/auth";

export const instant = false;

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<main className="mx-auto max-w-7xl px-4 py-16 text-slate-300">Loading dashboard…</main>}>
      <AdminDashboardContent />
    </Suspense>
  );
}

async function AdminDashboardContent() {
  await connection();
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") redirect("/login?next=%2Fadmin%2Fdashboard");

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Link href="/login" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white">
        <ArrowLeft size={16} /> Members login
      </Link>

      <section className="mt-8 rounded-[30px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,179,71,0.12),rgba(46,197,196,0.12),rgba(7,18,30,0.9))] p-6 sm:p-9">
        <div className="flex items-center gap-3 text-[#ffb347]">
          <LayoutDashboard size={20} />
          <span className="text-xs font-semibold uppercase tracking-[0.2em]">AURA site editor</span>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-slate-300">Signed in as {user.fullName} (@{user.username})</p>
          <LogoutButton />
        </div>
        <h1 className="mt-4 text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl">Manage your website.</h1>
        <p className="mt-4 max-w-3xl leading-7 text-slate-200">
          Update public site copy, leadership, departments, events, AURATHON editions, and the media gallery from one place.
        </p>
        <div className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-200/10 p-4 text-sm leading-6 text-[#ffe2b8]">
          Member accounts and site content are stored in PostgreSQL; uploaded images are stored in the private object-storage bucket. Back up both services to preserve website data.
        </div>
      </section>

      <AdminMemberApprovals />
      <AdminContentManager />
    </main>
  );
}
