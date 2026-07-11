import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import BackToTop from "@/components/site/BackToTop";
import ScrollProgress from "@/components/site/ScrollProgress";
import SiteEffects from "@/components/site/SiteEffects";
import WhatsAppButton from "@/components/site/WhatsAppButton";
import PageTransition from "@/components/site/PageTransition";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageTransition />
      <ScrollProgress />
      <Header />
      <main id="top">{children}</main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
      <SiteEffects />
    </>
  );
}
