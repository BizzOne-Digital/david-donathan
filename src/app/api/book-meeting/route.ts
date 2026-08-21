import { NextResponse } from "next/server";
import { createGoogleCalendarEvent } from "@/lib/google-calendar";
import { sendMeetingEmails } from "@/lib/email";
import { isGoogleCalendarApiConfigured } from "@/lib/google-calendar-config";
import { meetingFormSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = meetingFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please check the booking form and try again.",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    let calendarEventId: string | undefined;

    if (isGoogleCalendarApiConfigured()) {
      const event = await createGoogleCalendarEvent(parsed.data);
      calendarEventId = event?.id ?? undefined;
    }

    const emailResult = await sendMeetingEmails(parsed.data);

    return NextResponse.json({
      success: true,
      message: calendarEventId
        ? "Your meeting is on Google Calendar! Check your email for the invite. David has been notified."
        : "Your meeting is scheduled! Check your email for confirmation. David has been notified.",
      result: { ...emailResult, calendarEventId },
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to schedule your meeting right now.";

    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 500 }
    );
  }
}
