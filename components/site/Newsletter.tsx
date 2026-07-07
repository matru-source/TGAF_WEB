"use client";
import { useState } from "react";

export default function Newsletter() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") || "");
    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      setMsg("You're on the list - thank you!");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
      setMsg("Couldn't subscribe right now. Please try again.");
    }
  }

  return (
    <div className="newsletter">
      <div className="nl-copy">
        <h3>Stay in the loop</h3>
        <p>New products, market updates and partnership news - straight to your inbox.</p>
      </div>
      <form className="nl-form" onSubmit={onSubmit}>
        <input type="email" name="email" placeholder="you@email.com" required aria-label="Email address" />
        <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
          {status === "ok" ? "Subscribed ✓" : status === "sending" ? "…" : "Subscribe"}
        </button>
        {(status === "ok" || status === "error") && (
          <span className={`nl-note ${status === "ok" ? "ok" : "err"}`}>{msg}</span>
        )}
      </form>
    </div>
  );
}
