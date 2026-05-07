import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}
