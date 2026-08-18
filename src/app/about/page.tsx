"use client";

import { motion } from "framer-motion";
import { CtaBanner } from "@/components/ui/cta-banner";
import { FadeIn, SectionHeading } from "@/components/ui/section-heading";
import { framework, siteConfig } from "@/lib/site-data";

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_40%),linear-gradient(180deg,#050d18,#071320)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
              About Us
            </p>
            <h1 className="mt-3 max-w-4xl font-display text-4xl font-semibold text-white md:text-6xl">
              Agency mission &amp; leadership
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">
              {siteConfig.name} helps businesses grow with confidence — handling
              the technical and marketing complexity so owners can focus on
              running their company.
            </p>
          </FadeIn>

          <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <FadeIn className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                Leadership
              </p>
              <h2 className="mt-3 font-display text-3xl text-white">
                David Donathan
              </h2>
              <p className="mt-4 text-slate-300 leading-relaxed">
                Founder and digital strategist with decades of hands-on experience
                building websites, managing social growth, and improving search
                visibility for businesses around the world. Since {siteConfig.founded},
                David has delivered practical, results-first digital solutions —
                from boutique launches to multi-page corporate builds.
              </p>
              <p className="mt-4 text-slate-300 leading-relaxed">
                The agency operates bilingual (English &amp; Spanish) and focuses
                on clear communication, measurable outcomes, and long-term
                partnerships.
              </p>
            </FadeIn>

            <FadeIn
              delay={0.1}
              className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-teal-700/10 p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
                Mission
              </p>
              <h2 className="mt-3 font-display text-3xl text-white">
                If opportunity doesn&apos;t knock, build a door.
              </h2>
              <p className="mt-4 text-slate-200 leading-relaxed">
                We exist to give every business a high-performing digital
                presence — websites that convert, social systems that engage, and
                SEO that compounds over time.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <SectionHeading
          eyebrow="Operating Framework"
          title="Assess · Plan · Build · Measure"
          description="A structured methodology inspired by high-performing agency systems."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {framework.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-3xl border border-white/10 bg-[#0a1829] p-6"
            >
              <p className="font-display text-4xl text-cyan-300/80">{item.step}</p>
              <h3 className="mt-3 font-display text-2xl text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <CtaBanner
        title="Let’s build your next growth chapter"
        description="Share your goals and we’ll map the right Assess → Measure path for your brand."
        source="About CTA"
      />
    </>
  );
}
