"use client";

import { useState } from "react";
import { CheckCircle2, Globe2, Megaphone, Search } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { FadeIn, SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/lib/site-data";

const icons = [Globe2, Megaphone, Search];

export default function ServicesPage() {
  const [success, setSuccess] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.16),transparent_35%),linear-gradient(180deg,#050d18,#071320)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
              Services
            </p>
            <h1 className="mt-3 max-w-4xl font-display text-4xl font-semibold text-white md:text-6xl">
              Full-service digital marketing built for conversion
            </h1>
            <p className="mt-5 max-w-3xl text-lg text-slate-300">
              Whether you need a new website, social engine, or SEO system —
              every engagement is designed around measurable business outcomes.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-shell pt-8">
        <div className="grid gap-6">
          {services.map((service, index) => {
            const Icon = icons[index];
            return (
              <FadeIn
                key={service.slug}
                delay={index * 0.05}
                className="grid gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:grid-cols-[auto_1fr] md:p-8"
              >
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-cyan-400/15 text-cyan-200">
                  <Icon className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="font-display text-3xl text-white">
                    {service.title}
                  </h2>
                  <p className="mt-3 max-w-3xl text-slate-300">
                    {service.summary}
                  </p>
                  <ul className="mt-5 grid gap-2 sm:grid-cols-3">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-sm text-slate-200"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      <section id="quote" className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Request Custom Quote"
            title="Tell us what you need built"
            description="Submit this form and we’ll reply with a tailored proposal based on your goals and scope."
          />
          <div className="rounded-3xl border border-white/10 bg-[#0a1829] p-6 md:p-8">
            {success ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
                <CheckCircle2 className="mb-4 h-12 w-12 text-emerald-400" />
                <h3 className="font-display text-2xl text-white">
                  Thank you! David will reach out within 24 hours.
                </h3>
                <p className="mt-3 text-slate-300">
                  A confirmation email is on its way to your inbox.
                </p>
                <button
                  type="button"
                  className="btn-secondary mt-8"
                  onClick={() => setSuccess(false)}
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <LeadForm
                source="Services Quote Form"
                onSuccess={() => setSuccess(true)}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
