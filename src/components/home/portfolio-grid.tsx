"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { portfolio } from "@/lib/site-data";

export function PortfolioGrid() {
  return (
    <section className="section-shell">
      <SectionHeading
        eyebrow="Featured Work"
        title="Results-focused projects across industries"
        description="Selected engagements spanning web design, social systems, and SEO."
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {portfolio.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            className="group relative min-h-[240px] overflow-hidden rounded-3xl border border-white/10"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${
                [
                  "from-cyan-700/40 via-slate-900 to-slate-950",
                  "from-teal-700/40 via-slate-900 to-slate-950",
                  "from-sky-700/40 via-slate-900 to-slate-950",
                  "from-emerald-700/35 via-slate-900 to-slate-950",
                ][index % 4]
              }`}
            />
            <div className="hero-grid absolute inset-0 opacity-30" />
            <div className="relative flex h-full flex-col justify-end p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
                {item.category}
              </p>
              <h3 className="mt-2 font-display text-2xl text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-slate-300">{item.result}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
