"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, CheckCircle2 } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { FadeIn, SectionHeading } from "@/components/ui/section-heading";
import { useLeadModal } from "@/components/providers/lead-modal-provider";
import { addOns, pricingPackages } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export default function PricingPage() {
  const { openModal } = useLeadModal();
  const [selectedPackage, setSelectedPackage] = useState("standard");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [showInlineForm, setShowInlineForm] = useState(false);
  const [success, setSuccess] = useState(false);

  const packageMeta = pricingPackages.find((p) => p.id === selectedPackage);

  const addOnLabels = useMemo(
    () =>
      addOns
        .filter((item) => selectedAddOns.includes(item.id))
        .map((item) => item.label),
    [selectedAddOns]
  );

  const enquiryMessage = useMemo(() => {
    const parts = [
      `I'm interested in the ${packageMeta?.name || "selected"} package.`,
    ];
    if (addOnLabels.length) {
      parts.push(`Add-ons: ${addOnLabels.join(", ")}.`);
    }
    parts.push("Please send pricing details and next steps.");
    return parts.join(" ");
  }, [packageMeta?.name, addOnLabels]);

  function toggleAddOn(id: string) {
    setSelectedAddOns((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function handleEnquire() {
    setSuccess(false);
    setShowInlineForm(true);
    openModal({
      source: "Pricing Select & Enquire",
      packageName: packageMeta?.name,
      addOns: addOnLabels,
      service: "All",
      message: enquiryMessage,
    });
  }

  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_45%),linear-gradient(180deg,#050d18,#071320)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
              Pricing
            </p>
            <h1 className="mt-3 max-w-4xl font-display text-4xl font-semibold text-white md:text-6xl">
              Clear packages. Flexible add-ons. Fast proposals.
            </h1>
            <p className="mt-5 max-w-3xl text-lg text-slate-300">
              Start with the Standard tier or book a strategy call for a custom
              enterprise roadmap.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-shell pt-6">
        <div className="grid gap-5 lg:grid-cols-2">
          {pricingPackages.map((pkg) => (
            <button
              key={pkg.id}
              type="button"
              onClick={() => setSelectedPackage(pkg.id)}
              className={cn(
                "rounded-3xl border p-7 text-left transition",
                selectedPackage === pkg.id
                  ? "border-cyan-300/50 bg-cyan-400/10 shadow-[0_0_0_1px_rgba(103,232,249,0.25)]"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20",
                pkg.highlighted && "relative"
              )}
            >
              {pkg.highlighted && (
                <span className="absolute right-5 top-5 rounded-full bg-cyan-300 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-950">
                  Most Popular
                </span>
              )}
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-200">
                {pkg.name}
              </p>
              <div className="mt-4 flex items-end gap-1">
                <span className="font-display text-5xl font-semibold text-white">
                  {pkg.price}
                </span>
                {pkg.period && (
                  <span className="pb-1 text-slate-400">{pkg.period}</span>
                )}
              </div>
              <p className="mt-3 text-sm text-slate-300">{pkg.description}</p>
              <ul className="mt-6 space-y-3">
                {pkg.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-slate-200"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                    {feature}
                  </li>
                ))}
              </ul>
              {"cta" in pkg && pkg.cta && (
                <Link
                  href="/book"
                  onClick={(e) => e.stopPropagation()}
                  className="mt-6 inline-flex text-sm font-semibold text-cyan-200 underline-offset-4 hover:underline"
                >
                  {pkg.cta} →
                </Link>
              )}
            </button>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-[#0a1829] p-6 md:p-8">
          <h2 className="font-display text-2xl text-white">
            Interactive add-on selection
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Check any extras to include them in your enquiry.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {addOns.map((item) => {
              const checked = selectedAddOns.includes(item.id);
              return (
                <label
                  key={item.id}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-4 transition",
                    checked
                      ? "border-cyan-300/40 bg-cyan-400/10"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20"
                  )}
                >
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 accent-cyan-400"
                    checked={checked}
                    onChange={() => toggleAddOn(item.id)}
                  />
                  <span>
                    <span className="block font-medium text-white">
                      {item.label}
                    </span>
                    <span className="text-sm text-slate-400">{item.price}</span>
                  </span>
                </label>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleEnquire}
            className="btn-primary mt-8"
          >
            Select &amp; Enquire
          </button>
        </div>
      </section>

      {showInlineForm && (
        <section className="section-shell pt-0">
          <div className="rounded-3xl border border-white/10 bg-[#0a1829] p-6 md:p-8">
            <SectionHeading
              eyebrow="Package Enquiry"
              title="Confirm your details"
              description="Your package and add-ons are prefilled. Submit to notify David instantly."
            />
            <div className="mt-8">
              {success ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <CheckCircle2 className="mb-4 h-12 w-12 text-emerald-400" />
                  <h3 className="font-display text-2xl text-white">
                    Thank you! David will reach out within 24 hours.
                  </h3>
                </div>
              ) : (
                <LeadForm
                  source="Pricing Page Form"
                  defaultService="All"
                  defaultPackage={packageMeta?.name}
                  defaultAddOns={addOnLabels}
                  defaultMessage={enquiryMessage}
                  onSuccess={() => setSuccess(true)}
                />
              )}
            </div>
          </div>
        </section>
      )}

      <section className="section-shell">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Straight answers before you book."
        />
        <div className="mx-auto mt-10 max-w-3xl">
          <FaqAccordion />
        </div>
      </section>
    </>
  );
}
