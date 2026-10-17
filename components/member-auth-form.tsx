"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";

type Mode = "login" | "register";

export function MemberAuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setMessage("");
    setError("");
    setBusy(true);

    const formData = new FormData(form);
    const password = String(formData.get("password") || "");
    if (mode === "register" && password !== String(formData.get("confirmPassword") || "")) {
      setError("The passwords do not match.");
      setBusy(false);
      return;
    }

    const payload = mode === "login"
      ? { identity: formData.get("identity"), password }
      : {
          fullName: formData.get("fullName"),
          username: formData.get("username"),
          email: formData.get("email"),
          password,
        };

    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "The request could not be completed.");
      if (mode === "register") {
        setMessage(result.message);
        form.reset();
        return;
      }

      router.replace(result.user.role === "admin" ? "/admin/dashboard" : "/member/dashboard");
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "The request could not be completed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-8 rounded-[36px] border border-white/10 bg-[#091b2a] p-6 shadow-[0_30px_80px_rgba(7,16,24,0.5)] lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
        <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,179,71,0.12),rgba(46,197,196,0.12),rgba(7,18,30,0.9))] p-6 sm:p-8">
          <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ffb347] to-[#2ec5c4] text-slate-950">
            <LockKeyhole size={26} />
          </div>
          <h1 className="text-4xl font-black tracking-[-0.05em] text-white">{mode === "login" ? "Members login" : "Join AURA"}</h1>
          <p className="mt-4 text-slate-200">
            {mode === "login"
              ? "Sign in with your approved member or administrator account."
              : "Create a member account. An administrator must approve your registration before you can sign in."}
          </p>
          <div className="mt-8 space-y-3 text-sm text-slate-300">
            <div>• Passwords are stored as salted hashes</div>
            <div>• Member accounts require admin approval</div>
            <div>• Local accounts and content persist between restarts</div>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-4 rounded-[28px] border border-white/10 bg-white/5 p-6 sm:p-8">
          {mode === "register" ? (
            <>
              <label className="block text-sm font-medium text-slate-300">
                Full name
                <input name="fullName" required minLength={2} maxLength={100} autoComplete="name" className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-white" />
              </label>
              <label className="block text-sm font-medium text-slate-300">
                Username
                <input name="username" required minLength={3} maxLength={30} pattern="[A-Za-z0-9_.\-]+" autoComplete="username" className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-white" />
              </label>
              <label className="block text-sm font-medium text-slate-300">
                Email
                <input name="email" type="email" required maxLength={254} autoComplete="email" className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-white" />
              </label>
            </>
          ) : (
            <label className="block text-sm font-medium text-slate-300">
              Username or email
              <input name="identity" required autoComplete="username" className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-white" placeholder="Your username or email" />
            </label>
          )}

          <label className="block text-sm font-medium text-slate-300">
            Password{mode === "register" ? " (at least 12 characters)" : ""}
            <input name="password" type="password" required minLength={mode === "register" ? 12 : undefined} maxLength={128} autoComplete={mode === "login" ? "current-password" : "new-password"} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-white" />
          </label>
          {mode === "register" ? (
            <label className="block text-sm font-medium text-slate-300">
              Confirm password
              <input name="confirmPassword" type="password" required minLength={12} maxLength={128} autoComplete="new-password" className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-white" />
            </label>
          ) : null}

          {error ? <p role="alert" className="rounded-xl border border-red-300/20 bg-red-300/10 p-3 text-sm text-red-200">{error}</p> : null}
          {message ? <p role="status" className="rounded-xl border border-emerald-300/20 bg-emerald-300/10 p-3 text-sm text-emerald-100">{message}</p> : null}

          <button type="submit" disabled={busy} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ffb347] to-[#f16b54] px-6 py-3 text-sm font-semibold text-slate-950 disabled:opacity-60">
            {mode === "login" ? "Sign in" : "Submit registration"} <ArrowRight size={16} />
          </button>

          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-300">
            <button type="button" onClick={() => { setMode(mode === "login" ? "register" : "login"); setMessage(""); setError(""); }} className="text-[#8feaf0]">
              {mode === "login" ? "New member? Register" : "Already registered? Sign in"}
            </button>
            <Link href="/join" className="text-slate-300 hover:text-white">About membership</Link>
          </div>
          {mode === "login" ? (
            <p className="text-xs leading-5 text-slate-400">
              First-time local setup: create the administrator account from a terminal with <code>npm run admin:create</code>.
            </p>
          ) : null}
          <p className="inline-flex items-center gap-2 text-xs text-slate-400"><ShieldCheck size={14} /> Accounts are stored in this website&apos;s local database.</p>
        </form>
      </div>
    </main>
  );
}
