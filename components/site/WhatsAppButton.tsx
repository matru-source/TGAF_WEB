import { WHATSAPP } from "@/lib/data";
import { BrandIcon } from "./icons";

export default function WhatsAppButton() {
  return (
    <a
      className="whatsapp-fab"
      href={WHATSAPP.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <BrandIcon name="whatsapp" size={28} />
    </a>
  );
}
