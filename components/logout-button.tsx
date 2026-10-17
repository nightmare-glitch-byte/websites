"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [error, setError] = useState("");

  const logout = async () => {
    setError("");
    try {
      const response = await fetch("/api/auth/session", { method: "DELETE" });
      if (!response.ok) throw new Error("Could not log out. Please try again.");
      router.replace("/login");
      router.refresh();
    } catch (logoutError) {
      setError(logoutError instanceof Error ? logoutError.message : "Could not log out.");
    }
  };

  return (
    <div>
      <button type="button" onClick={logout} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white">
        Log out
      </button>
      {error ? <p role="alert" className="mt-2 text-xs text-red-200">{error}</p> : null}
    </div>
  );
}
