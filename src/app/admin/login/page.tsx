"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Login failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0c] px-4 py-12 text-white">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-white/10 bg-[#121418] p-8 shadow-2xl">
        <div className="text-center">
          <Link href="/" className="inline-block transition hover:opacity-80">
            <Image
              src="/images/logo.png"
              alt="TUQO"
              width={130}
              height={40}
              className="mx-auto h-10 w-auto"
              priority
            />
          </Link>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d31820]" />
            <h2 className="text-xl font-bold uppercase tracking-wider text-white">
              Admin Portal
            </h2>
          </div>
          <p className="mt-1 text-xs text-gray-400">
            Log in to manage equipment catalogs, categories, and banners
          </p>
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-center text-xs font-semibold text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
              Admin Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@tuqo.in"
              required
              className="mt-1.5 block w-full rounded-xl border border-white/10 bg-[#181a20] px-4 py-3 text-sm text-white placeholder-gray-500 transition focus:border-[#d31820] focus:outline-none focus:ring-1 focus:ring-[#d31820]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              className="mt-1.5 block w-full rounded-xl border border-white/10 bg-[#181a20] px-4 py-3 text-sm text-white placeholder-gray-500 transition focus:border-[#d31820] focus:outline-none focus:ring-1 focus:ring-[#d31820]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#d31820] py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-red-900/30 transition hover:bg-[#b0141b] disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Sign In to Dashboard"}
          </button>
        </form>

        <div className="border-t border-white/5 pt-4 text-center">
          <Link
            href="/"
            className="text-xs text-gray-400 transition hover:text-[#d31820]"
          >
            &larr; Back to Tuqo Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
