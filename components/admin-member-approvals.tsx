"use client";

import { useEffect, useState } from "react";
import { Check, Clock3, UserRoundX } from "lucide-react";

type MemberRequest = {
  id: string;
  fullName: string;
  username: string;
  email: string;
  createdAt: number;
  status: "pending" | "approved" | "rejected";
};

export function AdminMemberApprovals() {
  const [members, setMembers] = useState<MemberRequest[]>([]);
  const [error, setError] = useState("");
  const [pending, setPending] = useState("");

  useEffect(() => {
    let active = true;
    fetch("/api/admin/members", { cache: "no-store" })
      .then(async (response) => {
        const body = await response.json();
        if (!response.ok) throw new Error(body.error || "Could not load member registrations.");
        if (active) setMembers(body.members as MemberRequest[]);
      })
      .catch((loadError: unknown) => {
        if (active) setError(loadError instanceof Error ? loadError.message : "Could not load member registrations.");
      });
    return () => { active = false; };
  }, []);

  const decide = async (member: MemberRequest, status: "approved" | "rejected") => {
    setPending(member.id);
    setError("");
    try {
      const response = await fetch("/api/admin/members", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: member.id, status }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Could not update member approval.");
      setMembers((current) => current.map((item) => item.id === member.id ? { ...item, status } : item));
    } catch (decisionError) {
      setError(decisionError instanceof Error ? decisionError.message : "Could not update member approval.");
    } finally {
      setPending("");
    }
  };

  const requests = members.filter((member) => member.status === "pending");

  return (
    <section className="mt-10 rounded-[30px] border border-white/10 bg-[#091b2a] p-5 sm:p-7">
      <div className="mb-6 flex items-center gap-3 text-[#ffb347]">
        <Clock3 size={20} />
        <div>
          <h2 className="text-xl font-black text-white">Member registrations</h2>
          <p className="mt-1 text-sm text-slate-300">{requests.length} registration{requests.length === 1 ? "" : "s"} awaiting approval</p>
        </div>
      </div>
      {error ? <p role="alert" className="mb-4 rounded-xl border border-red-300/20 bg-red-300/10 p-3 text-sm text-red-200">{error}</p> : null}
      <div className="space-y-3">
        {requests.map((member) => (
          <article key={member.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-950/30 p-4">
            <div>
              <h3 className="font-bold text-white">{member.fullName}</h3>
              <p className="mt-1 text-sm text-slate-300">@{member.username} · {member.email}</p>
              <p className="mt-1 text-xs text-slate-400">Registered {new Date(member.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-2">
              <button type="button" disabled={Boolean(pending)} onClick={() => decide(member, "approved")} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ffb347] to-[#2ec5c4] px-4 py-2 text-sm font-bold text-slate-950 disabled:opacity-50">
                <Check size={15} /> Approve
              </button>
              <button type="button" disabled={Boolean(pending)} onClick={() => decide(member, "rejected")} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 disabled:opacity-50">
                <UserRoundX size={15} /> Reject
              </button>
            </div>
          </article>
        ))}
        {requests.length === 0 && !error ? <p className="rounded-2xl border border-dashed border-white/10 p-5 text-sm text-slate-400">No pending registrations.</p> : null}
      </div>
      {members.some((member) => member.status !== "pending") ? (
        <details className="mt-5">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300">Previously reviewed members</summary>
          <ul className="mt-3 space-y-2">
            {members.filter((member) => member.status !== "pending").map((member) => (
              <li key={member.id} className="rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-300">
                {member.fullName} (@{member.username}) · {member.status}
              </li>
            ))}
          </ul>
        </details>
      ) : null}
    </section>
  );
}
