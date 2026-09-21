import { MARQUEE } from "@/lib/data";

export default function Marquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((t, i) => (
          <span className="marquee-item" key={i}>
            {t}
            <span className="dot">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}
