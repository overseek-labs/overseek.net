import { ScrollProgress } from "@/components/scroll-progress";
import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
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
