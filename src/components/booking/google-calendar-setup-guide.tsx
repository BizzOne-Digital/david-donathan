"use client";

import { AlertTriangle, Calendar, ExternalLink } from "lucide-react";
import { googleCalendarConfig } from "@/lib/google-calendar-config";

export function GoogleCalendarSetupGuide({ error }: { error?: string }) {
  return (
    <div className="flex min-h-[520px] flex-col items-center justify-center rounded-3xl border border-dashed border-cyan-300/30 bg-[#0a1829] px-6 py-12 text-center">
      <Calendar className="mb-4 h-10 w-10 text-cyan-300" />
      <h3 className="font-display text-2xl text-white">
        Google Calendar not configured
      </h3>

      {error && (
        <div className="mt-4 flex max-w-xl items-start gap-3 rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-left text-sm text-amber-100">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
        In Google Calendar → Appointment schedule → <strong>Share</strong>,
        copy the <strong>booking page link</strong> (short{" "}
        <code className="text-cyan-200">calendar.app.google/...</code> works
        best).
      </p>

      <pre className="mt-4 w-full max-w-2xl overflow-x-auto rounded-xl border border-white/10 bg-[#07111f] px-4 py-3 text-left text-xs text-cyan-100">
        {`GOOGLE_APPOINTMENT_URL=https://calendar.app.google/YOUR_CODE`}
      </pre>

      <p className="mt-4 max-w-xl text-sm text-slate-400">
        Add to Vercel → Settings → Environment Variables →{" "}
        <strong>Redeploy</strong>
      </p>

      <a
        href={googleCalendarConfig.setupUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary mt-6"
      >
        Google Calendar setup guide
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  );
}
