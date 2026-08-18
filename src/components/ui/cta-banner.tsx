"use client";

import Link from "next/link";
import { useLeadModal } from "@/components/providers/lead-modal-provider";

export function CtaBanner({
  title = "Ready to Turn Clicks into Clients?",
  description = "Book a meeting online or send your project details — David responds within 24 hours.",
  source = "CTA Banner",
}: {
  title?: string;
  description?: string;
  source?: string;
}) {
  const { openModal } = useLeadModal();

  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_80%_60%,rgba(20,184,166,0.16),transparent_40%),linear-gradient(135deg,#07111f,#0a2740)]" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold text-white md:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-slate-300">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/book" className="btn-primary">
            Book a Meeting
          </Link>
          <button
            type="button"
            onClick={() => openModal({ source })}
            className="btn-secondary"
          >
            Get a Free Proposal
          </button>
        </div>
      </div>
    </section>
  );
}
