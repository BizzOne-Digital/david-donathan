import { google } from "googleapis";
import type { MeetingFormValues } from "./validations";
import { formatMeetingDateTime } from "./validations";
import { googleCalendarConfig, isGoogleCalendarApiConfigured } from "./google-calendar-config";

function getOAuthClient() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  const oauth2 = new google.auth.OAuth2(clientId, clientSecret);
  oauth2.setCredentials({ refresh_token: refreshToken });
  return oauth2;
}

export async function createGoogleCalendarEvent(data: MeetingFormValues) {
  if (!isGoogleCalendarApiConfigured()) {
    return null;
  }

  const auth = getOAuthClient();
  if (!auth) return null;

  const calendar = google.calendar({ version: "v3", auth });
  const duration = Number(data.duration);
  const timezone = googleCalendarConfig.timezone;
  const startLocal = `${data.date}T${data.time}:00`;
  const start = new Date(startLocal);
  const end = new Date(start.getTime() + duration * 60 * 1000);

  const meetingLabel =
    duration === 15 ? "15 Minute Consultation" : "30 Minute Strategy Call";

  const response = await calendar.events.insert({
    calendarId: googleCalendarConfig.calendarId,
    sendUpdates: "all",
    conferenceDataVersion: 1,
    requestBody: {
      summary: `${meetingLabel} — ${data.fullName}`,
      description: [
        "Booked via David Donathan Media website.",
        "",
        `Client: ${data.fullName}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        `Scheduled: ${formatMeetingDateTime(data.date, data.time)}`,
        data.notes ? `Notes: ${data.notes}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
      start: {
        dateTime: start.toISOString(),
        timeZone: timezone,
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: timezone,
      },
      attendees: [
        { email: data.email, displayName: data.fullName },
        {
          email: googleCalendarConfig.clientEmail,
          displayName: "David Donathan",
          organizer: true,
        },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 30 },
        ],
      },
    },
  });

  return response.data;
}
