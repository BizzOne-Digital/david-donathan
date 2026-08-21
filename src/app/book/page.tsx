import type { Metadata } from "next";
import { GoogleCalendarBooking } from "@/components/booking/google-calendar-booking";
import { GoogleCalendarSetupGuide } from "@/components/booking/google-calendar-setup-guide";
import { getResolvedAppointmentConfig } from "@/lib/google-calendar-config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Book a Meeting",
  description:
    "Schedule a consultation with David Donathan Media using Google Calendar.",
};

export default function BookPage() {
  const config = getResolvedAppointmentConfig();

  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_40%),linear-gradient(180deg,#050d18,#071320)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
            Book a Meeting
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold text-white md:text-6xl">
            Schedule with Google Calendar
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-300">
            Choose an available time below. Google Calendar confirms your booking
            instantly — David is notified and you receive a calendar invite by
            email.
          </p>
        </div>
      </section>

      <section className="section-shell pt-4">
        <div className="mx-auto max-w-5xl">
          {config.valid ? (
            <GoogleCalendarBooking
              bookingUrl={config.bookingUrl}
              embedUrl={config.embedUrl}
              usedFallback={config.usedFallback}
            />
          ) : (
            <GoogleCalendarSetupGuide error={config.reason} />
          )}
        </div>
      </section>
    </>
  );
}
