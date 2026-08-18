"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { painPoints } from "@/lib/site-data";

export function PainSolutionSection() {
  return (
    <section className="section-shell">
      <SectionHeading
        eyebrow="Pain Point vs Solution"
        title="Where growth stalls — and how we unlock it"
        description="Clear diagnosis. Clear fix. No generic marketing fluff."
      />
      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {painPoints.map((item, index) => (
          <motion.div
            key={item.problem}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="grid overflow-hidden rounded-3xl border border-white/10"
          >
            <div className="bg-rose-500/10 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-200">
                Challenge
              </p>
              <h3 className="mt-2 font-display text-2xl text-white">
                {item.problem}
              </h3>
            </div>
            <div className="bg-emerald-500/10 p-6">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">
                Solution <ArrowRight className="h-3.5 w-3.5" />
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-200">
                {item.solution}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
