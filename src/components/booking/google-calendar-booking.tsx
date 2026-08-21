"use client";

import { Calendar, Clock, ExternalLink, Mail } from "lucide-react";
import {
  DEFAULT_BOOKING_URL,
  DEFAULT_EMBED_URL,
} from "@/lib/google-calendar-config";

type GoogleCalendarBookingProps = {
  bookingUrl: string;
  embedUrl: string;
  usedFallback?: boolean;
};

export function GoogleCalendarBooking({
  bookingUrl = DEFAULT_BOOKING_URL,
  embedUrl = DEFAULT_EMBED_URL,
  usedFallback,
}: GoogleCalendarBookingProps) {
  const safeBooking = bookingUrl.includes("AcZssZ2Vnk87")
    ? DEFAULT_BOOKING_URL
    : bookingUrl;
  const safeEmbed = embedUrl.includes("AcZssZ2Vnk87")
    ? DEFAULT_EMBED_URL
    : embedUrl;

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0a1829] shadow-2xl shadow-cyan-950/20">
      <div className="border-b border-white/10 bg-gradient-to-r from-[#0d213f] to-[#082a35] px-6 py-8 sm:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#4285F4]/15">
              <Calendar className="h-7 w-7 text-[#4285F4]" />
            </div>
            <div>
              <h2 className="font-display text-2xl text-white sm:text-3xl">
                Book your meeting with David
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-300">
                Pick a date and time below. When you confirm, David gets a
                Google Calendar notification and you receive an email invite.
              </p>
            </div>
          </div>
          <a
            href={safeBooking}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary shrink-0"
          >
            Open in new tab
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {usedFallback && (
          <p className="mt-4 rounded-xl border border-amber-400/20 bg-amber-500/10 px-4 py-3 text-xs text-amber-100">
            David&apos;s previous calendar link was invalid on Google. Using
            the active booking schedule instead.
          </p>
        )}
      </div>

      <div className="grid gap-6 px-6 py-8 sm:grid-cols-3 sm:px-10">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <Clock className="h-5 w-5 text-cyan-300" />
          <p className="mt-3 text-sm font-medium text-white">Pick a time</p>
          <p className="mt-1 text-xs text-slate-400">Choose from available slots.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <Mail className="h-5 w-5 text-cyan-300" />
          <p className="mt-3 text-sm font-medium text-white">Instant confirm</p>
          <p className="mt-1 text-xs text-slate-400">Calendar invite by email.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <Calendar className="h-5 w-5 text-cyan-300" />
          <p className="mt-3 text-sm font-medium text-white">David notified</p>
          <p className="mt-1 text-xs text-slate-400">Added to his calendar.</p>
        </div>
      </div>

      <div className="border-t border-white/10 bg-white">
        <iframe
          title="Book a meeting with David Donathan Media"
          src={safeEmbed}
          className="h-[720px] w-full border-0"
          loading="lazy"
          allow="clipboard-read; clipboard-write"
        />
      </div>

      <div className="flex flex-col items-center border-t border-white/10 bg-[#071320] px-6 py-8">
        <a
          href={safeBooking}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Book in Google Calendar
          <ExternalLink className="h-4 w-4" />
        </a>
        <p className="mt-4 text-center text-xs text-slate-500">
          Calendar not loading? Click the button to book in a new tab.
        </p>
      </div>
    </div>
  );
}
