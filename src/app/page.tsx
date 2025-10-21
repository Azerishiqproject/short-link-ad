import { redirect } from "next/navigation";
import Script from "next/script";
import Hero from "@/components/ui/Hero";
import Features from "@/components/ui/Features";
import Stats from "@/components/ui/Stats";
import LinkPanel from "@/components/ui/LinkPanel";
import Platforms from "@/components/ui/Platforms";
import Pricing from "@/components/ui/Pricing";
import Testimonials from "@/components/ui/Testimonials";
import FAQ from "@/components/ui/FAQ";
import Contact from "@/components/ui/Contact";
import FooterSection from "@/components/ui/FooterSection";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const tParam = sp?.t;
  const token = Array.isArray(tParam) ? tParam[0] : tParam;
  if (token) {
    redirect(`/adview?t=${encodeURIComponent(token)}`);
  }
  return (
    <div className="min-h-[calc(100vh-56px)]" id="top">
      <Script src="https://publisher.linkvertise.com/cdn/linkvertise.js" strategy="afterInteractive" />
      <Script id="linkvertise-init" strategy="afterInteractive">{`
        linkvertise(1415315, { whitelist: ["glorta.com","glorta.link","localhost","127.0.0.1"], blacklist: [] });
      `}</Script>
      <Hero />
      <Features />
      <Stats />
      <LinkPanel />
      <Platforms />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Contact />
      <FooterSection />
    </div>
  );
}
