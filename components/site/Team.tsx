import { getTeam } from "@/lib/queries";

const DELAY = ["", "d1", "d2", "d3"];

export default async function Team() {
  const team = await getTeam();

  return (
    <section className="section">
      <div className="container">
        <div className="section-head center reveal">
          <span className="eyebrow center">Leadership</span>
          <h2>Meet the team</h2>
        </div>
        <div className="team-grid">
          {team.map((m, i) => (
            <article className={`member reveal ${DELAY[i % DELAY.length]}`} key={m.id}>
              {m.photo ? (
                <div className="member-photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.photo} alt={m.name} loading="lazy" />
                </div>
              ) : (
                <div className="avatar">{m.initials}</div>
              )}
              <h3>{m.name}</h3>
              <div className="role">{m.role}</div>
              {m.bullets && m.bullets.length > 0 ? (
                <ul className="member-bullets">
                  {m.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              ) : (
                <p>{m.bio}</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
