"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function AdminLogin() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error((await response.json()).error || "Unable to sign in.");
      window.location.href = "/admin/dashboard";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#171513] px-5 text-[#f5f0e6]">
      <div className="w-full max-w-md">
        <Link href="/" className="serif tracking-[.2em]">EMBER & IVORY</Link>
        <p className="mt-16 text-xs uppercase tracking-[.3em] text-[#d9a57d]">Staff Portal</p>
        <h1 className="serif mt-4 text-5xl">Sign in.</h1>
        <form onSubmit={submit} className="mt-10 grid gap-5">
          <input name="email" required type="email" autoComplete="email" placeholder="Email" className="border border-white/15 bg-white/5 px-4 py-4 outline-none" />
          <input name="password" required type="password" autoComplete="current-password" placeholder="Password" className="border border-white/15 bg-white/5 px-4 py-4 outline-none" />
          {error && <p className="text-sm text-[#f0a07a]">{error}</p>}
          <button disabled={loading} className="bg-[#b9572b] px-5 py-4 text-xs uppercase tracking-[.18em] disabled:opacity-50">
            {loading ? "Signing in…" : "Continue"}
          </button>
        </form>
      </div>
    </main>
  );
}
