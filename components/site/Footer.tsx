import Link from "next/link";
import Brand from "./Brand";
import Newsletter from "./Newsletter";
import { BrandIcon } from "./icons";
import { BRAND, SOCIALS } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <Newsletter />
        <div className="footer-top">
          <div>
            <Brand />
            <p style={{ marginTop: "14px" }}>
              Farm-to-fork chilli, turmeric and ginger - grown by Nigerian hands, processed to
              world-class standards.
            </p>
            <div className="socials">
              {SOCIALS.map((s) => (
                <a key={s.name} href={s.href} aria-label={s.name} target="_blank" rel="noopener noreferrer">
                  <BrandIcon name={s.icon} size={18} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/awards">Awards &amp; Recognition</Link></li>
              <li><Link href="/leadership">Leadership</Link></li>
              <li><Link href="/gallery">Company Gallery</Link></li>
              <li><Link href="/sustainability">Sustainability &amp; ESG</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/news">News &amp; Media</Link></li>
            </ul>
          </div>
          <div>
            <h4>Capabilities</h4>
            <ul>
              <li><Link href="/farm-to-fork">Farm-to-Fork</Link></li>
              <li><Link href="/manufacturing">Manufacturing</Link></li>
              <li><Link href="/quality">Quality &amp; Certifications</Link></li>
              <li><Link href="/products">Products</Link></li>
              <li><Link href="/presence">Markets &amp; Presence</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href={`mailto:${BRAND.email}`}>Email us</a></li>
              <li><a href={BRAND.website} target="_blank" rel="noopener noreferrer">Website</a></li>
              <li><Link href="/contact">Ikorodu, Lagos</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="credit">
            Designed &amp; Developed by{" "}
            <a href="https://www.nexusinfotech.co/" target="_blank" rel="noopener noreferrer">
              Nexus Infotech
            </a>
          </span>
          <span>
            © {year} {BRAND.legal} · Goodearth Foods. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
