import { NextResponse } from "next/server";
import { sendMeetingEmails } from "@/lib/email";
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

    const result = await sendMeetingEmails(parsed.data);

    return NextResponse.json({
      success: true,
      message:
        "Your meeting is scheduled! Check your email for confirmation. David has been notified.",
      result,
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
