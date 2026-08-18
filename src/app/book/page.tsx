import type { Metadata } from "next";
import { MeetingForm } from "@/components/forms/meeting-form";

export const metadata: Metadata = {
  title: "Book a Meeting",
  description:
    "Schedule a consultation with David Donathan Media. Pick a date and time — David is notified instantly by email.",
};

export default function BookPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_40%),linear-gradient(180deg,#050d18,#071320)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
            Book a Meeting
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold text-white md:text-6xl">
            Register your meeting with David
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-300">
            Select a date and time below. When you confirm, David gets an email
            notification that a meeting has been scheduled.
          </p>
        </div>
      </section>

      <section className="section-shell pt-4">
        <div className="mx-auto max-w-4xl">
          <MeetingForm source="Book Page" />
        </div>
      </section>
    </>
  );
}
