"use client";
import { useState } from "react";
import { CAREER_VALUES, JOB_OPENINGS, EXPAT_LEADERS } from "@/lib/data";
import { Icon, type IconName } from "./icons";

export default function Careers() {
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [note, setNote] = useState("Attach your CV link in the message. We review every application.");

  function applyFor(title: string) {
    setRole(title);
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      type: "career",
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      company: String(fd.get("phone") || ""),
      interest: `Career: ${fd.get("role") || "General application"}`,
      message: String(fd.get("message") || ""),
    };
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      setNote("Thank you - your application has been received. We'll be in touch.");
      e.currentTarget.reset();
      setRole("");
    } catch {
      setStatus("error");
      setNote("Something went wrong. Please email us your CV directly.");
    }
  }

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Why work with us</span>
            <h2>Build a career with purpose</h2>
            <p className="muted">Join a scaling Nigerian company doing world-class work - from farm to fork.</p>
          </div>
          <div className="feature-grid">
            {CAREER_VALUES.map((v, i) => (
              <div className={`feature-card reveal ${["", "d1", "d2"][i]}`} key={v.title}>
                <div className="feature-icon"><Icon name={v.icon as IconName} size={24} /></div>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </div>
            ))}
          </div>

          {/* Nigerian Operational Workforce Banner */}
          <div className="careers-team-banner reveal">
            <div className="careers-team-img-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/team-workforce.jpg"
                alt="Goodearth Foods operations and manufacturing team at the Ikorodu facility"
                loading="lazy"
              />
              <div className="careers-team-overlay-tag">
                <span className="dot" />
                <span>Nigerian Operational Workforce · Manufacturing Plant, Ikorodu</span>
              </div>
            </div>
            <div className="careers-team-content">
              <div className="careers-team-info">
                <h3>A dedicated team building Africa&apos;s spice future</h3>
                <p>
                  From our state-of-the-art milling facility in Ikorodu to our partner farm gates across 17+ Nigerian
                  states, our local people drive every milestone. We provide safe, automated workplaces, structured skills
                  development, and real room for young Nigerian talent and women to grow into leadership.
                </p>
              </div>
              <div className="careers-team-stats">
                <div className="careers-stat-box">
                  <div className="careers-stat-num">100+</div>
                  <div className="careers-stat-label">Full-time operational, quality &amp; field staff in Nigeria</div>
                </div>
                <div className="careers-stat-box">
                  <div className="careers-stat-num">Equal</div>
                  <div className="careers-stat-label">Room for youth and women to build long-term careers</div>
                </div>
              </div>
            </div>
          </div>

          {/* Expatriate Leadership & Mentorship Grid */}
          <div className="careers-expat-section reveal">
            <div className="section-head text-center" style={{ maxWidth: 740, margin: "0 auto 36px" }}>
              <span className="eyebrow">Leadership &amp; Mentorship</span>
              <h2>Expatriate Leadership &amp; Management</h2>
              <p className="muted">
                Decades of international experience guiding technology investments, industrial governance, and continuous on-the-job mentorship for our workforce.
              </p>
            </div>

            <div className="careers-expat-grid">
              {EXPAT_LEADERS.map((leader, i) => (
                <div className={`careers-expat-card reveal ${["", "d1", "d2"][i]}`} key={leader.name}>
                  <div className="careers-expat-img-wrap">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={leader.photo} alt={leader.name} loading="lazy" />
                  </div>
                  <div className="careers-expat-body">
                    <div className="careers-expat-role">{leader.role}</div>
                    <h4>{leader.name}</h4>
                    <p className="careers-expat-bio">{leader.bio}</p>
                    <div className="careers-expat-meta">
                      <Icon name="award" size={15} />
                      <span>{leader.highlight}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--cream2">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Open roles</span>
            <h2>Current openings</h2>
          </div>
          <div className="jobs-list">
            {JOB_OPENINGS.map((j) => (
              <div className="job-row reveal" key={j.title}>
                <div>
                  <div className="jt">{j.title}</div>
                  <div className="jm">
                    <span><Icon name="briefcase" size={14} /> {j.dept}</span>
                    <span><Icon name="pin" size={14} /> {j.location}</span>
                    <span>{j.type}</span>
                  </div>
                </div>
                <button className="abtn abtn-primary" type="button" onClick={() => applyFor(j.title)}>
                  Apply
                </button>
              </div>
            ))}
          </div>
          <p className="muted reveal" style={{ marginTop: "18px" }}>
            Don&apos;t see your role? Send a general application below.
          </p>
        </div>
      </section>

      <section className="section" id="apply">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Apply</span>
            <h2>Send your application</h2>
          </div>
          <form className="form reveal" onSubmit={onSubmit} style={{ maxWidth: 720 }} noValidate>
            <div className="two">
              <div className="field"><label htmlFor="c-name">Full name</label><input id="c-name" name="name" required placeholder="Your name" /></div>
              <div className="field"><label htmlFor="c-email">Email</label><input id="c-email" name="email" type="email" required placeholder="you@email.com" /></div>
            </div>
            <div className="two">
              <div className="field"><label htmlFor="c-phone">Phone</label><input id="c-phone" name="phone" placeholder="+234…" /></div>
              <div className="field"><label htmlFor="c-role">Role</label><input id="c-role" name="role" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role you're applying for" /></div>
            </div>
            <div className="field"><label htmlFor="c-msg">Message (include a link to your CV)</label><textarea id="c-msg" name="message" required placeholder="Tell us about yourself and paste a CV link…" /></div>
            <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
              {status === "ok" ? "Submitted ✓" : status === "sending" ? "Submitting…" : "Submit application"}
            </button>
            <p className="note" style={status === "ok" ? { color: "var(--farm)" } : status === "error" ? { color: "var(--chilli)" } : undefined}>{note}</p>
          </form>
        </div>
      </section>
    </>
  );
}
