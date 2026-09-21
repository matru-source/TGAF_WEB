import type { StatItem } from "@/lib/queries";

const DELAY = ["", "d1", "d2", "d1", "d2", "d3"];

export default function StatsStrip({ stats }: { stats: StatItem[] }) {
  return (
    <section className="stats-strip" aria-label="Our traction">
      <div className="container">
        <div className="stats-row">
          {stats.map((s, i) => (
            <div className={`stat reveal ${DELAY[i % DELAY.length]}`} key={s.key}>
              <div className="n" data-count={s.value} data-suffix={s.suffix || ""}>
                0
              </div>
              <div className="l">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
