"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Brand from "@/components/site/Brand";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/admin";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Login failed.");
        setLoading(false);
        return;
      }
      router.push(next);
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <Brand />
        <h1 style={{ marginTop: "18px" }}>Admin sign-in</h1>
        <p className="sub">Manage products, enquiries and site content.</p>
        {error && <div className="alert alert-err">{error}</div>}
        <form className="aform" onSubmit={onSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="admin@goodearthfoods.com" required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="••••••••" required />
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"} <span className="arr">→</span>
          </button>
        </form>
      </div>
    </div>
  );
}
