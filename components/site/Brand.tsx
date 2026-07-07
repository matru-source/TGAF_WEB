import Link from "next/link";

export default function Brand({ variant = "default" }: { variant?: "default" | "invert" }) {
  const src = variant === "invert" ? "/img/logo-light.png" : "/img/logo.png";
  return (
    <Link href="/" className="brand" aria-label="Goodearth Agriventures - home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="brand-logo" src={src} alt="Goodearth Agriventures" width={120} height={46} />
    </Link>
  );
}
