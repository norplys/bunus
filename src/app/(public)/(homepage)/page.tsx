import { HeroSection } from "@/components/homepage/hero-section";
import { OurDeals } from "@/components/homepage/our-deals";
import { SmoothTextCarousel } from "@/components/homepage/smooth-text-carousel";
import { OurLocation } from "@/components/homepage/our-location";
import { Testimony } from "@/components/homepage/testimony";
import { Contact } from "@/components/homepage/contact";

export default function Home() {
  return (
    <main className="md:mt-20 mt-14">
      <HeroSection />
      <OurDeals />
      <SmoothTextCarousel />
      <OurLocation />
      <Testimony />
      <Contact />
    </main>
  );
}
