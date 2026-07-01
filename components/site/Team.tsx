import { TEAM } from "@/lib/data";

const DELAY = ["", "d1", "d2", "d3"];

export default function Team() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head center reveal">
          <span className="eyebrow center">Leadership</span>
          <h2>Meet the team</h2>
        </div>
        <div className="team-grid">
          {TEAM.map((m, i) => (
            <article className={`member reveal ${DELAY[i]}`} key={m.name}>
              <div className="avatar">{m.initials}</div>
              <h3>{m.name}</h3>
              <div className="role">{m.role}</div>
              <p>{m.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
