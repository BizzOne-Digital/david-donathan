"use client";

import Script from "next/script";
import { Calendar, Clock, ExternalLink, Mail } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";

declare global {
  interface Window {
    calendar?: {
      schedulingButton: {
        load: (options: {
          url: string;
          color?: string;
          label?: string;
          target: Element;
        }) => void;
      };
    };
  }
}

type GoogleCalendarBookingProps = {
  bookingUrl: string;
};

export function GoogleCalendarBooking({ bookingUrl }: GoogleCalendarBookingProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const scriptReady = useRef(false);

  const loadSchedulingButton = useCallback(() => {
    if (!buttonRef.current || !window.calendar?.schedulingButton) return;
    buttonRef.current.innerHTML = "";
    window.calendar.schedulingButton.load({
      url: bookingUrl,
      color: "#0891b2",
      label: "Book an appointment",
      target: buttonRef.current,
    });
  }, [bookingUrl]);

  useEffect(() => {
    if (scriptReady.current) loadSchedulingButton();
  }, [loadSchedulingButton]);

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0a1829] shadow-2xl shadow-cyan-950/20">
      <link
        rel="stylesheet"
        href="https://calendar.google.com/calendar/scheduling-button-script.css"
      />

      <Script
        src="https://calendar.google.com/calendar/scheduling-button-script.js"
        strategy="afterInteractive"
        onLoad={() => {
          scriptReady.current = true;
          loadSchedulingButton();
        }}
      />

      <div className="border-b border-white/10 bg-gradient-to-r from-[#0d213f] to-[#082a35] px-6 py-8 sm:px-10">
        <div className="flex items-start gap-4">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#4285F4]/15">
            <Calendar className="h-7 w-7 text-[#4285F4]" />
          </div>
          <div>
            <h2 className="font-display text-2xl text-white sm:text-3xl">
              Book your meeting with David
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-300">
              Use Google Calendar to pick a date and time. When you confirm,
              David receives a notification and you get a calendar invite by
              email.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 px-6 py-10 sm:grid-cols-3 sm:px-10">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <Clock className="h-5 w-5 text-cyan-300" />
          <p className="mt-3 text-sm font-medium text-white">Pick a time</p>
          <p className="mt-1 text-xs text-slate-400">
            See real availability and choose what works for you.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <Mail className="h-5 w-5 text-cyan-300" />
          <p className="mt-3 text-sm font-medium text-white">Instant confirm</p>
          <p className="mt-1 text-xs text-slate-400">
            Google sends you and David a calendar invite.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <Calendar className="h-5 w-5 text-cyan-300" />
          <p className="mt-3 text-sm font-medium text-white">No phone tag</p>
          <p className="mt-1 text-xs text-slate-400">
            Book online in under a minute.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center border-t border-white/10 bg-[#071320] px-6 py-12 sm:px-10">
        <p className="mb-8 max-w-md text-center text-sm text-slate-300">
          Click the button below to open Google Calendar and complete your
          booking.
        </p>

        <div ref={buttonRef} className="min-h-[52px]" />

        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-8"
        >
          Open Google Calendar booking
          <ExternalLink className="h-4 w-4" />
        </a>

        <p className="mt-6 text-center text-xs text-slate-500">
          Opens in a new tab — powered by Google Calendar
        </p>
      </div>
    </div>
  );
}
