"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { metrics, partners } from "@/lib/site-data";

export function MetricsBanner() {
  return (
    <section className="relative border-y border-white/10 bg-[#071320]/80 py-14 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="text-center lg:text-left"
            >
              <AnimatedCounter value={metric.value} suffix={metric.suffix} />
              <p className="mt-2 text-sm uppercase tracking-[0.14em] text-slate-400">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Platform partners &amp; stack expertise
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {partners.map((partner) => (
              <span
                key={partner}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-slate-200"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
