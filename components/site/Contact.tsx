"use client";
import { useState } from "react";
import { BRAND, CONTACTS } from "@/lib/data";
import { Icon } from "./icons";

const INTERESTS = [
  "Consumer products (B2C)",
  "Bulk supply (B2B)",
  "Distribution partnership",
  "Export enquiry",
  "Other",
];

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [note, setNote] = useState("We'll get back to you within 2 business days.");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type: "contact" }),
      });
      if (!res.ok) throw new Error("failed");
      const first = String(data.name || "there").split(" ")[0];
      setStatus("ok");
      setNote(`Thank you, ${first}! Your enquiry has been received - we'll reply within 2 business days.`);
      form.reset();
    } catch {
      setStatus("error");
      setNote("Something went wrong. Please email us directly at " + BRAND.email + ".");
    }
  }

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Send a message</span>
          <h2>Let&apos;s spice up Nigeria&apos;s food industry, together</h2>
        </div>
        <div className="contact-grid">
          <div className="contact-info reveal">
            <div className="row">
              <div className="ico"><Icon name="pin" size={19} /></div>
              <div>
                <div className="k">Address</div>
                <div className="v">{BRAND.address}</div>
              </div>
            </div>
            <div className="row">
              <div className="ico"><Icon name="mail" size={19} /></div>
              <div>
                <div className="k">Email</div>
                <a className="v" href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
              </div>
            </div>
            <div className="people">
              {CONTACTS.map((c) => (
                <div className="p" key={c.name}>
                  <div className="nm">{c.name}</div>
                  <div className="rl">{c.role}</div>
                </div>
              ))}
            </div>
          </div>

          <form className="form reveal d1" onSubmit={onSubmit} noValidate>
            <div className="two">
              <div className="field">
                <label htmlFor="name">Full name</label>
                <input id="name" name="name" type="text" placeholder="Your name" required />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="you@company.com" required />
              </div>
            </div>
            <div className="two">
              <div className="field">
                <label htmlFor="company">Company (optional)</label>
                <input id="company" name="company" type="text" placeholder="Company name" />
              </div>
              <div className="field">
                <label htmlFor="interest">I&apos;m interested in</label>
                <select id="interest" name="interest" defaultValue={INTERESTS[0]}>
                  {INTERESTS.map((i) => (
                    <option key={i}>{i}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" placeholder="Tell us what you need…" required />
            </div>
            <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
              {status === "ok" ? "Sent ✓" : status === "sending" ? "Sending…" : "Send enquiry"}{" "}
              {status === "idle" && <span className="arr">→</span>}
            </button>
            <p className="note" style={status === "ok" ? { color: "var(--farm)" } : status === "error" ? { color: "var(--chilli)" } : undefined}>
              {note}
            </p>
          </form>
        </div>

        <div className="cta-band reveal" style={{ marginTop: "clamp(34px,5vw,60px)" }}>
          <h2>Join our hands to grow together</h2>
          <p>Whether you cook for a family or supply a nation, Goodearth is your farm-to-fork spice partner.</p>
          <a href={`mailto:${BRAND.email}`} className="btn btn-light">
            Become a partner <span className="arr">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
