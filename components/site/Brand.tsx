import Link from "next/link";

export default function Brand({ variant = "default" }: { variant?: "default" | "invert" }) {
  const src = variant === "invert" ? "/img/logo-light.png" : "/img/logo.png";
  return (
    <Link href="/" className="brand" aria-label="Good Earth Foods - home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="brand-logo" src={src} alt="Good Earth Foods" width={98} height={66} />
    </Link>
  );
}
