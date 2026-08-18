import { MeetingForm } from "@/components/forms/meeting-form";
import { SectionHeading } from "@/components/ui/section-heading";

export function BookAppointmentSection() {
  return (
    <section id="book-appointment" className="section-shell scroll-mt-24">
      <SectionHeading
        align="center"
        eyebrow="Book a Meeting"
        title="Schedule your appointment online"
        description="Choose a date and time, enter your details, and confirm. David receives an email as soon as your meeting is registered."
      />
      <div className="mx-auto mt-10 max-w-4xl">
        <MeetingForm source="Homepage Booking" />
      </div>
    </section>
  );
}
