"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarClock, CheckCircle2, Mail, Phone } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { MeetingForm } from "@/components/forms/meeting-form";
import { FadeIn, SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site-data";

export default function ContactPage() {
  const [success, setSuccess] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_40%),linear-gradient(180deg,#050d18,#071320)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
              Contact Us
            </p>
            <h1 className="mt-3 max-w-4xl font-display text-4xl font-semibold text-white md:text-6xl">
              Let&apos;s talk about your next growth move
            </h1>
            <p className="mt-5 max-w-3xl text-lg text-slate-300">
              Book a meeting on the calendar below, call, email, or send a
              project brief. David is emailed when a meeting is scheduled.
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <Link
              href="/book"
              className="rounded-3xl border border-cyan-300/25 bg-cyan-400/10 p-6 transition hover:border-cyan-300/50"
            >
              <CalendarClock className="h-6 w-6 text-cyan-300" />
              <p className="mt-4 text-sm uppercase tracking-[0.14em] text-slate-400">
                Book online
              </p>
              <p className="mt-1 font-display text-2xl text-white">
                Schedule Meeting
              </p>
            </Link>
            <a
              href={siteConfig.phoneHref}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan-300/30"
            >
              <Phone className="h-6 w-6 text-cyan-300" />
              <p className="mt-4 text-sm uppercase tracking-[0.14em] text-slate-400">
                Phone
              </p>
              <p className="mt-1 font-display text-2xl text-white">
                {siteConfig.phone}
              </p>
            </a>
            <a
              href={siteConfig.emailHref}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan-300/30"
            >
              <Mail className="h-6 w-6 text-cyan-300" />
              <p className="mt-4 text-sm uppercase tracking-[0.14em] text-slate-400">
                Email
              </p>
              <p className="mt-1 font-display text-2xl text-white">
                {siteConfig.email}
              </p>
            </a>
          </div>
        </div>
      </section>

      <section id="book" className="section-shell pt-8">
        <SectionHeading
          eyebrow="Schedule Online"
          title="Book your meeting"
          description="Pick a date and time, then confirm. David receives an email notification immediately."
        />
        <div className="mx-auto mt-10 max-w-4xl">
          <MeetingForm source="Contact Page" />
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="Lead Capture"
            title="Prefer to send details first?"
            description="Share your goals and preferred services. David will follow up within 24 hours."
          />
          <div className="rounded-3xl border border-white/10 bg-[#0a1829] p-6 md:p-8">
            {success ? (
              <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
                <CheckCircle2 className="mb-4 h-12 w-12 text-emerald-400" />
                <h3 className="font-display text-2xl text-white">
                  Thank you! David will reach out within 24 hours.
                </h3>
                <p className="mt-3 text-slate-300">
                  Check your inbox for an automated confirmation.
                </p>
                <button
                  type="button"
                  className="btn-secondary mt-8"
                  onClick={() => setSuccess(false)}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <LeadForm
                source="Contact Page"
                onSuccess={() => setSuccess(true)}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
