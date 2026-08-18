"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLeadModal } from "@/components/providers/lead-modal-provider";

export function HeroSection() {
  const { openModal } = useLeadModal();

  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-16">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,211,238,0.22),transparent_45%),radial-gradient(ellipse_at_bottom_left,rgba(13,148,136,0.18),transparent_40%),linear-gradient(160deg,#050d18_0%,#0a1a2f_45%,#082a35_100%)]" />
        <div className="hero-grid absolute inset-0 opacity-40" />
        <motion.div
          className="absolute -right-24 top-24 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl"
          animate={{ y: [0, 24, 0], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-teal-500/15 blur-3xl"
          animate={{ y: [0, -18, 0], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
            <Sparkles className="h-3.5 w-3.5" />
            David Donathan Media
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            Transforming Clicks Into Clients
            <span className="mt-3 block text-2xl font-medium text-cyan-200 sm:text-3xl lg:text-4xl">
              Full-Service Digital Marketing, Web Design &amp; SEO
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
            Scaling brands through custom web development, high-impact social
            media management, and data-driven SEO.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/book" className="btn-primary">
              Book a Meeting
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => openModal({ source: "Home Hero" })}
              className="btn-secondary"
            >
              Get a Free Proposal
            </button>
            <Link href="/pricing" className="btn-secondary">
              View Packages
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
