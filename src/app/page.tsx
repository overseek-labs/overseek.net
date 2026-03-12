import { ScrollProgress } from "@/components/scroll-progress";
import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Automation } from "@/components/automation";
import { About } from "@/components/about";
import { Work } from "@/components/work";
import { LogoMarquee } from "@/components/logo-marquee";
import { Technologies } from "@/components/technologies";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <ScrollProgress />
      <Navigation />
      <Hero />
      <Services />
      <Automation />
      <About />
      <Work />
      <LogoMarquee />
      <Technologies />
      <Contact />
      <Footer />
      <ThemeSwitcher />
    </main>
  );
}
