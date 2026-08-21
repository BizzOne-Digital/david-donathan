"use client";

import { AlertTriangle, Calendar, ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";
import {
  googleCalendarConfig,
  validateGoogleAppointmentUrl,
} from "@/lib/google-calendar-config";

function SetupGuide({ error }: { error?: string }) {
  return (
    <div className="flex min-h-[520px] flex-col items-center justify-center rounded-3xl border border-dashed border-cyan-300/30 bg-[#0a1829] px-6 py-12 text-center">
      <Calendar className="mb-4 h-10 w-10 text-cyan-300" />
      <h3 className="font-display text-2xl text-white">
        Connect Google Calendar
      </h3>

      {error && (
        <div className="mt-4 flex max-w-xl items-start gap-3 rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-left text-sm text-amber-100">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
        Google gives you HTML like this — copy only the{" "}
        <strong className="text-white">src=</strong> link from the{" "}
        <strong className="text-white">&lt;iframe&gt;</strong> tag:
      </p>

      <pre className="mt-4 w-full max-w-2xl overflow-x-auto rounded-xl border border-white/10 bg-[#07111f] px-4 py-3 text-left text-xs text-slate-300">
        {`<iframe src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0..."
  style="border: 0" width="100%" height="600" frameborder="0"></iframe>`}
      </pre>

      <p className="mt-4 max-w-xl text-sm text-slate-400">
        Do <strong className="text-rose-300">not</strong> paste the{" "}
        <code className="text-rose-200">scheduling-button-script.css</code> line
        — that causes the 403 error.
      </p>

      <ol className="mt-6 max-w-lg space-y-2 text-left text-sm text-slate-300">
        <li>1. Google Calendar → <strong>Create</strong> → <strong>Appointment schedule</strong></li>
        <li>2. Open the schedule → <strong>Share</strong> → <strong>Website embed</strong></li>
        <li>3. Copy the URL inside <strong>src=&quot;...&quot;</strong> on the iframe line</li>
        <li>4. Paste into <code className="text-cyan-200">.env.local</code> and restart the server</li>
      </ol>

      <pre className="mt-4 w-full max-w-2xl overflow-x-auto rounded-xl border border-white/10 bg-[#07111f] px-4 py-3 text-left text-xs text-cyan-100">
        {`NEXT_PUBLIC_GOOGLE_APPOINTMENT_URL=https://calendar.google.com/calendar/appointments/schedules/YOUR_ID`}
      </pre>

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

export function GoogleAppointmentEmbed() {
  const [loaded, setLoaded] = useState(false);

  const validation = useMemo(
    () => validateGoogleAppointmentUrl(googleCalendarConfig.appointmentUrl),
    []
  );

  if (!validation.valid) {
    return <SetupGuide error={validation.reason} />;
  }

  const embedUrl = validation.embedUrl;

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl shadow-cyan-950/20">
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <Calendar className="h-4 w-4 text-[#4285F4]" />
          Google Calendar — Book with David Donathan
        </div>
        <a
          href={embedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-[#4285F4] hover:underline"
        >
          Open in Google Calendar
        </a>
      </div>

      {!loaded && (
        <div className="flex h-[720px] items-center justify-center bg-white text-sm text-slate-500">
          Loading Google Calendar…
        </div>
      )}

      <iframe
        title="Book a meeting with David Donathan Media"
        src={embedUrl}
        className={`w-full border-0 ${loaded ? "block" : "hidden"}`}
        style={{ minHeight: 720 }}
        onLoad={() => setLoaded(true)}
        allow="clipboard-read; clipboard-write"
      />

      <div className="border-t border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-600">
        <p className="font-medium text-slate-800">
          Seeing &quot;Appointment not found&quot;?
        </p>
        <p className="mt-1">
          That message comes from Google — the embed works, but this booking link
          is invalid or not public. In Google Calendar, open your appointment
          schedule → <strong>Share</strong> → turn on the booking page → copy a
          fresh <strong>Website embed</strong> URL into{" "}
          <code className="text-xs">.env.local</code>, then restart the server.
        </p>
      </div>
    </div>
  );
}
