"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { LeadForm } from "@/components/forms/lead-form";
import { useLeadModal } from "@/components/providers/lead-modal-provider";

export function LeadModal() {
  const { open, prefill, closeModal } = useLeadModal();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!open) {
      setSuccess(false);
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, closeModal]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close modal overlay"
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={closeModal}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-modal-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28 }}
            className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0c1c33] p-6 shadow-2xl shadow-cyan-950/40 md:p-8"
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 rounded-full p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {success ? (
              <div className="flex flex-col items-center py-10 text-center">
                <CheckCircle2 className="mb-4 h-12 w-12 text-emerald-400" />
                <h2 className="font-display text-2xl text-white">
                  Thank you! David will reach out within 24 hours.
                </h2>
                <p className="mt-3 max-w-md text-slate-300">
                  Your request is in. Watch your inbox for a confirmation email.
                </p>
                <button type="button" onClick={closeModal} className="btn-primary mt-8">
                  Close
                </button>
              </div>
            ) : (
              <>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  Free Proposal
                </p>
                <h2
                  id="lead-modal-title"
                  className="mt-2 font-display text-3xl text-white"
                >
                  Tell us where you want to grow
                </h2>
                <p className="mt-2 text-slate-300">
                  Share a few details and we&apos;ll prepare a tailored next step.
                </p>
                <div className="mt-6">
                  <LeadForm
                    compact
                    source={prefill.source || "Hero Modal"}
                    defaultService={prefill.service}
                    defaultPackage={prefill.packageName}
                    defaultAddOns={prefill.addOns}
                    defaultMessage={prefill.message}
                    onSuccess={() => setSuccess(true)}
                  />
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
