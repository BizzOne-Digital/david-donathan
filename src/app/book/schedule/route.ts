import { NextResponse } from "next/server";
import {
  DEFAULT_BOOKING_URL,
  getResolvedAppointmentConfig,
} from "@/lib/google-calendar-config";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const config = getResolvedAppointmentConfig();
  const origin = new URL(request.url).origin;

  if (!config.valid) {
    return NextResponse.redirect(`${origin}/book`);
  }

  const url = config.bookingUrl.includes("AcZssZ2Vnk87")
    ? DEFAULT_BOOKING_URL
    : config.bookingUrl;

  return NextResponse.redirect(url, 302);
}
