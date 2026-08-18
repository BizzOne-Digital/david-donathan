import { MetricsBanner } from "@/components/home/metrics-banner";
import { HeroSection } from "@/components/home/hero-section";
import { PainSolutionSection } from "@/components/home/pain-solution-section";
import { PortfolioGrid } from "@/components/home/portfolio-grid";
import { ServicesGrid } from "@/components/home/services-grid";
import { CtaBanner } from "@/components/ui/cta-banner";
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel";
import { SectionHeading } from "@/components/ui/section-heading";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MetricsBanner />
      <ServicesGrid />
      <PainSolutionSection />
      <PortfolioGrid />
      <section className="section-shell">
        <SectionHeading
          eyebrow="Client Stories"
          title="Loved by customers across the world"
          description="Real feedback from businesses David has helped grow."
        />
        <div className="mt-10">
          <TestimonialCarousel />
        </div>
      </section>
      <CtaBanner source="Home Final CTA" />
    </>
  );
}
