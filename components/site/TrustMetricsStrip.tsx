import Link from "next/link";

interface TrustMetric {
  count: number;
  suffix?: string;
  noComma?: boolean;
  badge: string;
  title: string;
  subtitle: string;
  href: string;
  linkLabel: string;
  icon: "trophy" | "shield" | "package" | "factory";
}

const TRUST_METRICS: TrustMetric[] = [
  {
    count: 2025,
    noComma: true,
    badge: "National Recognition",
    title: "Edge Award Winner",
    subtitle: "Outstanding Indigenous Naija Spice of the Year (13th Marketing Edge Awards)",
    href: "/awards",
    linkLabel: "View Award & Press",
    icon: "trophy",
  },
  {
    count: 7,
    suffix: "+",
    badge: "Regulatory Trust",
    title: "Accredited Certifications",
    subtitle: "NAFDAC, SON, US FDA, Halal, FSSC 22000, MAN & NEPC standards",
    href: "/quality",
    linkLabel: "View Accreditations",
    icon: "shield",
  },
  {
    count: 15,
    suffix: "+",
    badge: "Market Portfolio",
    title: "Commercial SKUs",
    subtitle: "15g retail sachets, family pouches & bulk institutional packs",
    href: "/products",
    linkLabel: "Explore Product Range",
    icon: "package",
  },
  {
    count: 3000,
    suffix: " MT",
    badge: "Annual Capacity",
    title: "Annual Plant Capacity",
    subtitle: "US$12M automated milling & steam sterilization facility at Ikorodu",
    href: "/manufacturing",
    linkLabel: "Inspect Ikorodu Plant",
    icon: "factory",
  },
];

function MetricIcon({ type }: { type: TrustMetric["icon"] }) {
  switch (type) {
    case "trophy":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.45 1-1 1H7v4h10v-4h-2c-.55 0-1-.45-1-1v-2.34" />
          <path d="M6 4h12v7a6 6 0 0 1-12 0V4Z" />
        </svg>
      );
    case "shield":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "package":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="m7.5 4.27 9 5.15" />
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path d="m3.3 7 8.7 5 8.7-5" />
          <path d="M12 22V12" />
        </svg>
      );
    case "factory":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
          <path d="M17 18h1" />
          <path d="M12 18h1" />
          <path d="M7 18h1" />
        </svg>
      );
  }
}

export default function TrustMetricsStrip() {
  return (
    <section className="trust-metrics-section" aria-label="Certifications, Awards & Scale">
      <div className="container">
        {/* Header Eyebrow */}
        <div className="trust-metrics-head reveal">
          <div className="trust-metrics-eyebrow">
            <span className="gold-bullet">★</span>
            <span>Credibility &amp; Scale Metrics</span>
            <span className="gold-bullet">★</span>
          </div>
          <h2 className="trust-metrics-title">
            Certified Quality. Awarded Excellence. Built for Scale.
          </h2>
          <p className="trust-metrics-sub">
            From our US$12M automated factory in Ikorodu to national FMCG honours and rigorous food-safety accreditations, our numbers speak to our commitment.
          </p>
        </div>

        {/* 4 Stat Cards Grid */}
        <div className="trust-metrics-grid">
          {TRUST_METRICS.map((m, i) => (
            <Link
              href={m.href}
              key={m.title}
              className={`trust-card reveal d${(i % 3) + 1}`}
              aria-label={`${m.count}${m.suffix || ""} ${m.title} - ${m.linkLabel}`}
            >
              <div className="trust-card-top">
                <span className="trust-card-badge">{m.badge}</span>
                <span className="trust-card-icon">
                  <MetricIcon type={m.icon} />
                </span>
              </div>

              <div className="trust-card-number-row">
                <div
                  className="trust-number"
                  data-count={m.count}
                  data-suffix={m.suffix || ""}
                  data-no-comma={m.noComma ? "true" : undefined}
                >
                  0
                </div>
              </div>

              <h3 className="trust-card-title">{m.title}</h3>
              <p className="trust-card-desc">{m.subtitle}</p>

              <div className="trust-card-action">
                <span>{m.linkLabel}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
