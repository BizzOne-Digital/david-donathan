"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { testimonials } from "@/lib/site-data";

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const item = testimonials[index];

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#0d213f] to-[#082f3a] p-8 md:p-12">
      <Quote className="mb-6 h-10 w-10 text-cyan-300/70" />
      <AnimatePresence mode="wait">
        <motion.div
          key={item.name}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
        >
          <p className="max-w-3xl font-display text-2xl leading-relaxed text-white md:text-3xl">
            “{item.quote}”
          </p>
          <div className="mt-8">
            <p className="font-semibold text-cyan-200">{item.name}</p>
            <p className="text-sm text-slate-400">{item.role}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex gap-2">
        {testimonials.map((t, i) => (
          <button
            key={t.name}
            type="button"
            aria-label={`Show testimonial from ${t.name}`}
            onClick={() => setIndex(i)}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? "w-8 bg-cyan-300" : "w-2.5 bg-white/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
