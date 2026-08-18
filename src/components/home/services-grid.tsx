"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Globe2, Megaphone, Search } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/lib/site-data";

const icons = {
  "web-design": Globe2,
  "social-media": Megaphone,
  seo: Search,
};

export function ServicesGrid() {
  return (
    <section className="section-shell">
      <SectionHeading
        eyebrow="Core Services"
        title="Built for growth across every digital channel"
        description="Interactive service systems designed to attract, convert, and compound results."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {services.map((service, index) => {
          const Icon = icons[service.slug as keyof typeof icons];
          return (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-6"
            >
              <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-400/15 blur-2xl" />
              </div>
              <div className="relative">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-cyan-400/15 text-cyan-200">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-2xl text-white">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {service.summary}
                </p>
                <ul className="mt-5 space-y-2 text-sm text-slate-300">
                  {service.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                      {point}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/services"
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-cyan-200 transition group-hover:gap-2"
                >
                  Explore service
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
