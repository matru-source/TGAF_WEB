import { VALUE_PROPS } from "@/lib/data";
import { Icon, type IconName } from "./icons";

const DELAY = ["", "d1", "d2", "d3"];

export default function ValueProps() {
  return (
    <section className="section section--cream2">
      <div className="container">
        <div className="section-head center reveal">
          <span className="eyebrow center">Why Naija families trust Goodearth</span>
          <h2>Correct peppe, every single time</h2>
          <p className="muted">Quality you can see, smell and taste - at a price that works for every home.</p>
        </div>
        <div className="vp-grid">
          {VALUE_PROPS.map((v, i) => (
            <div className={`vp-card reveal ${DELAY[i]}`} key={v.title}>
              <div className="vp-icon"><Icon name={v.icon as IconName} size={26} /></div>
              <h3>{v.title}</h3>
              <p>{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
